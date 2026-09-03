import QRCode from 'qrcode';
import type { EcLevel } from './qr';

/**
 * Styled rendering. `qrcode` only draws plain squares, so we take its module
 * matrix and describe the picture ourselves as a list of shapes in module
 * units. The same geometry feeds the canvas preview, the SVG download and the
 * pixel rasteriser the tests decode with — one source of truth, three outputs.
 */

export type ModuleShape = 'square' | 'rounded' | 'dot';
export type EyeShape = 'square' | 'rounded' | 'circle';

export const MODULE_SHAPES: ModuleShape[] = ['square', 'rounded', 'dot'];
export const EYE_SHAPES: EyeShape[] = ['square', 'rounded', 'circle'];

export interface Matrix {
  size: number;
  get: (row: number, column: number) => boolean;
}

export function matrix(data: string, ec: EcLevel): Matrix {
  const qr = QRCode.create(data, { errorCorrectionLevel: ec });
  return { size: qr.modules.size, get: (row, column) => qr.modules.get(row, column) === 1 };
}

export type Primitive =
  | { kind: 'rect'; x: number; y: number; w: number; h: number; r: number; fill: string }
  | { kind: 'circle'; cx: number; cy: number; r: number; fill: string };

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Geometry {
  /** Side of the whole picture, in module units (modules + quiet zone). */
  units: number;
  primitives: Primitive[];
  background: string;
  /** Where a logo goes, if one was requested. Already cleared to background. */
  logoBox: Box | null;
  /** True when every shape is axis-aligned, so renderers can snap to pixels. */
  crisp: boolean;
}

export interface StyleInput {
  modules: ModuleShape;
  eyes: EyeShape;
  foreground: string;
  background: string;
  /** Finder-pattern colour; null means same as the foreground. */
  eyeColor: string | null;
  /** Quiet-zone width in modules. */
  margin: number;
  /** Logo side as a fraction of the code side, or 0 for none. */
  logo: number;
}

const HEX = /^#[0-9a-f]{6}$/i;

/** Colours reach the renderer from user input; anything odd becomes ink or paper. */
function safeColour(value: string, fallback: string): string {
  return HEX.test(value) ? value.toLowerCase() : fallback;
}

/** Which finder pattern a module belongs to, or null. Finders are 7×7. */
function finderOrigin(size: number, row: number, column: number): [number, number] | null {
  if (row < 7 && column < 7) return [0, 0];
  if (row < 7 && column >= size - 7) return [0, size - 7];
  if (row >= size - 7 && column < 7) return [size - 7, 0];
  return null;
}

/** Corner radius per eye shape for each of the three concentric squares. */
const EYE_RADII: Record<EyeShape, [outer: number, hole: number, centre: number]> = {
  square: [0, 0, 0],
  rounded: [2.1, 1.4, 0.9],
  circle: [3.5, 2.5, 1.5],
};

const MODULE_RADIUS: Record<ModuleShape, number> = { square: 0, rounded: 0.32, dot: 0.42 };

function ring(x: number, y: number, side: number, r: number, shape: EyeShape, fill: string): Primitive {
  if (shape === 'circle') return { kind: 'circle', cx: x + side / 2, cy: y + side / 2, r: side / 2, fill };
  return { kind: 'rect', x, y, w: side, h: side, r, fill };
}

export function geometry(m: Matrix, style: StyleInput): Geometry {
  const margin = Math.max(0, Math.round(style.margin));
  const units = m.size + margin * 2;
  const foreground = safeColour(style.foreground, '#000000');
  const background = safeColour(style.background, '#ffffff');
  const eyeColour = style.eyeColor ? safeColour(style.eyeColor, foreground) : foreground;

  const primitives: Primitive[] = [{ kind: 'rect', x: 0, y: 0, w: units, h: units, r: 0, fill: background }];

  for (let row = 0; row < m.size; row++) {
    for (let column = 0; column < m.size; column++) {
      if (!m.get(row, column) || finderOrigin(m.size, row, column)) continue;
      const x = column + margin;
      const y = row + margin;
      if (style.modules === 'dot') {
        primitives.push({ kind: 'circle', cx: x + 0.5, cy: y + 0.5, r: MODULE_RADIUS.dot, fill: foreground });
      } else {
        primitives.push({ kind: 'rect', x, y, w: 1, h: 1, r: MODULE_RADIUS[style.modules], fill: foreground });
      }
    }
  }

  const [outerR, holeR, centreR] = EYE_RADII[style.eyes];
  for (const [row, column] of [
    [0, 0],
    [0, m.size - 7],
    [m.size - 7, 0],
  ] as const) {
    const x = column + margin;
    const y = row + margin;
    primitives.push(ring(x, y, 7, outerR, style.eyes, eyeColour));
    primitives.push(ring(x + 1, y + 1, 5, holeR, style.eyes, background));
    primitives.push(ring(x + 2, y + 2, 3, centreR, style.eyes, eyeColour));
  }

  let logoBox: Box | null = null;
  if (style.logo > 0) {
    const side = Math.max(3, Math.round(m.size * style.logo));
    const pad = 0.6;
    const x = margin + (m.size - side) / 2;
    const y = x;
    // Clear the area under the logo to background; the image is drawn on top
    // by whichever backend is rendering.
    primitives.push({ kind: 'rect', x: x - pad, y: y - pad, w: side + pad * 2, h: side + pad * 2, r: 0.5, fill: background });
    logoBox = { x, y, w: side, h: side };
  }

  const crisp = style.modules === 'square' && style.eyes === 'square' && style.logo === 0;
  return { units, primitives, background, logoBox, crisp };
}

// --- Pixel rasteriser --------------------------------------------------------

function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

function insideRect(p: Extract<Primitive, { kind: 'rect' }>, px: number, py: number): boolean {
  if (px < p.x || py < p.y || px > p.x + p.w || py > p.y + p.h) return false;
  if (p.r <= 0) return true;
  const r = Math.min(p.r, p.w / 2, p.h / 2);
  const dx = Math.max(p.x + r - px, px - (p.x + p.w - r), 0);
  const dy = Math.max(p.y + r - py, py - (p.y + p.h - r), 0);
  return dx * dx + dy * dy <= r * r;
}

export interface Raster {
  width: number;
  /** RGBA, row-major — exactly what jsQR and ImageData want. */
  data: Uint8ClampedArray;
}

/** Paints the geometry at `scale` pixels per module, no anti-aliasing. */
export function rasterize(g: Geometry, scale: number): Raster {
  const width = g.units * scale;
  const data = new Uint8ClampedArray(width * width * 4);

  for (const p of g.primitives) {
    const [r, gr, b] = hexToRgb(p.fill);
    const [x0, y0, x1, y1] =
      p.kind === 'rect'
        ? [p.x, p.y, p.x + p.w, p.y + p.h]
        : [p.cx - p.r, p.cy - p.r, p.cx + p.r, p.cy + p.r];
    const px0 = Math.max(0, Math.floor(x0 * scale));
    const py0 = Math.max(0, Math.floor(y0 * scale));
    const px1 = Math.min(width, Math.ceil(x1 * scale));
    const py1 = Math.min(width, Math.ceil(y1 * scale));

    for (let py = py0; py < py1; py++) {
      const uy = (py + 0.5) / scale;
      for (let px = px0; px < px1; px++) {
        const ux = (px + 0.5) / scale;
        const inside =
          p.kind === 'rect'
            ? insideRect(p, ux, uy)
            : (ux - p.cx) ** 2 + (uy - p.cy) ** 2 <= p.r * p.r;
        if (!inside) continue;
        const i = (py * width + px) * 4;
        data[i] = r;
        data[i + 1] = gr;
        data[i + 2] = b;
        data[i + 3] = 255;
      }
    }
  }

  return { width, data };
}

// --- SVG ----------------------------------------------------------------------

const fmt = (n: number) => String(Math.round(n * 1000) / 1000);

export interface SvgOptions {
  /** Pixel width/height attributes; omitted when undefined. */
  width?: number;
  /** Data URL for the logo image, drawn into `logoBox`. */
  logoHref?: string;
}

export function svg(g: Geometry, options: SvgOptions = {}): string {
  const parts: string[] = [];
  for (const p of g.primitives) {
    if (p.kind === 'circle') {
      parts.push(`<circle cx="${fmt(p.cx)}" cy="${fmt(p.cy)}" r="${fmt(p.r)}" fill="${p.fill}"/>`);
    } else {
      const rx = p.r > 0 ? ` rx="${fmt(Math.min(p.r, p.w / 2, p.h / 2))}"` : '';
      parts.push(`<rect x="${fmt(p.x)}" y="${fmt(p.y)}" width="${fmt(p.w)}" height="${fmt(p.h)}"${rx} fill="${p.fill}"/>`);
    }
  }
  if (g.logoBox && options.logoHref) {
    const { x, y, w, h } = g.logoBox;
    // Data URLs never contain quotes or angle brackets, but the href is user
    // supplied, so it is escaped as an attribute regardless.
    const href = options.logoHref.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    parts.push(
      `<image x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(h)}" preserveAspectRatio="xMidYMid meet" href="${href}"/>`,
    );
  }
  const size = options.width ? ` width="${options.width}" height="${options.width}"` : '';
  const rendering = g.crisp ? ' shape-rendering="crispEdges"' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${g.units} ${g.units}"${size}${rendering}>${parts.join('')}</svg>\n`;
}

// --- Canvas -------------------------------------------------------------------

function roundedPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/** Draws the geometry into a canvas at `px` pixels per side. */
export function paintCanvas(canvas: HTMLCanvasElement, g: Geometry, px: number, logo?: HTMLImageElement | null): void {
  canvas.width = px;
  canvas.height = px;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D is not available in this browser.');
  const s = px / g.units;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, px, px);

  for (const p of g.primitives) {
    ctx.fillStyle = p.fill;
    if (p.kind === 'circle') {
      ctx.beginPath();
      ctx.arc(p.cx * s, p.cy * s, p.r * s, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.r > 0) {
      roundedPath(ctx, p.x * s, p.y * s, p.w * s, p.h * s, p.r * s);
      ctx.fill();
    } else {
      // Snap plain squares to whole pixels so neighbours meet without seams.
      const x0 = Math.round(p.x * s);
      const y0 = Math.round(p.y * s);
      ctx.fillRect(x0, y0, Math.round((p.x + p.w) * s) - x0, Math.round((p.y + p.h) * s) - y0);
    }
  }

  if (g.logoBox && logo && logo.naturalWidth > 0) {
    const { x, y, w, h } = g.logoBox;
    const box = { x: x * s, y: y * s, w: w * s, h: h * s };
    const ratio = Math.min(box.w / logo.naturalWidth, box.h / logo.naturalHeight);
    const dw = logo.naturalWidth * ratio;
    const dh = logo.naturalHeight * ratio;
    ctx.drawImage(logo, box.x + (box.w - dw) / 2, box.y + (box.h - dh) / 2, dw, dh);
  }
}
