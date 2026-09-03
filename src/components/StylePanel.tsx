import { useMemo, useRef, useState } from 'preact/hooks';
import type { UiStrings } from '../lib/i18n';
import { LOGO_FRACTION, type LogoAsset, type QrOptions } from '../lib/qr';
import { EYE_SHAPES, MODULE_SHAPES, crop, geometry, matrix, svg, type EyeShape, type ModuleShape } from '../lib/render';
import { STYLE_PRESETS, presetFor } from '../lib/presets';

interface Props {
  ui: UiStrings;
  options: QrOptions;
  onChange: (next: QrOptions) => void;
}

/** Small enough to embed in an SVG download without making it heavy. */
const LOGO_MAX_BYTES = 1024 * 1024;

const THUMB_DATA = 'https://justgivemetheqr.com';
const THUMB_MATRIX = matrix(THUMB_DATA, 'L');
/** One eye plus a patch of modules is enough to tell the styles apart. */
const THUMB_UNITS = 11;

const HEX = /^#[0-9a-f]{6}$/i;

/** The six presets as live thumbnails, drawn with the user's own colours. */
export function StyleGallery({ ui, options, onChange }: Props) {
  const active = presetFor(options.modules, options.eyes);
  const thumbs = useMemo(
    () =>
      STYLE_PRESETS.map((preset) => ({
        preset,
        svg: svg(
          crop(
            geometry(THUMB_MATRIX, {
              modules: preset.modules,
              eyes: preset.eyes,
              foreground: options.foreground,
              background: options.background,
              eyeColor: options.eyeColor,
              margin: 1,
              logo: 0,
            }),
            THUMB_UNITS,
          ),
        ),
      })),
    [options.foreground, options.background, options.eyeColor],
  );

  return (
    <fieldset>
      <legend class="mb-2 text-sm font-medium">{ui.style}</legend>
      <div class="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {thumbs.map(({ preset, svg: markup }) => (
          <label key={preset.id} class="thumb" data-active={active?.id === preset.id}>
            <input
              type="radio"
              name="qr-style"
              class="sr-only"
              checked={active?.id === preset.id}
              onChange={() => onChange({ ...options, modules: preset.modules, eyes: preset.eyes })}
            />
            <span class="thumb-art" dangerouslySetInnerHTML={{ __html: markup }} />
            <span class="text-xs">{ui.presets[preset.id] ?? preset.id}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Fine-tuning: shapes, eye colour and logo. Lives inside the disclosure. */
export default function StylePanel({ ui, options, onChange }: Props) {
  const set = (patch: Partial<QrOptions>) => onChange({ ...options, ...patch });

  const fileRef = useRef<HTMLInputElement>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const pickLogo = (file: File | undefined) => {
    setLogoError(null);
    if (!file) return;
    if (file.size > LOGO_MAX_BYTES) {
      setLogoError(ui.logoTooBig);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const image = new Image();
      image.onload = () => {
        const logo: LogoAsset = { dataUrl, image };
        // A logo hides modules, so it needs the strongest error correction.
        set({ logo, ec: 'H' });
      };
      image.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    set({ logo: null });
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div class="grid gap-5 sm:col-span-2">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="qr-modules" class="mb-1.5 block text-sm font-medium">
            {ui.moduleShape}
          </label>
          <select
            id="qr-modules"
            class="field"
            value={options.modules}
            onChange={(e) => set({ modules: e.currentTarget.value as ModuleShape })}
          >
            {MODULE_SHAPES.map((shape) => (
              <option key={shape} value={shape}>
                {ui.shapes[shape]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label for="qr-eyes" class="mb-1.5 block text-sm font-medium">
            {ui.eyeShape}
          </label>
          <select id="qr-eyes" class="field" value={options.eyes} onChange={(e) => set({ eyes: e.currentTarget.value as EyeShape })}>
            {EYE_SHAPES.map((shape) => (
              <option key={shape} value={shape}>
                {ui.shapes[shape]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label class="mb-1.5 flex items-center justify-between text-sm font-medium">
            <span>{ui.eyeColor}</span>
            <span class="flex items-center gap-2 font-normal text-muted">
              <input
                type="checkbox"
                class="accent-ink"
                checked={options.eyeColor === null}
                onChange={(e) => set({ eyeColor: e.currentTarget.checked ? null : options.foreground })}
              />
              {ui.eyeColorSame}
            </span>
          </label>
          <div class="flex gap-2">
            <input
              type="color"
              aria-label={ui.eyeColor}
              disabled={options.eyeColor === null}
              value={options.eyeColor ?? options.foreground}
              class="h-11 w-12 shrink-0 cursor-pointer rounded-md border border-line bg-paper p-1 disabled:cursor-not-allowed disabled:opacity-40"
              onInput={(e) => set({ eyeColor: e.currentTarget.value })}
            />
            <input
              type="text"
              aria-label={`${ui.eyeColor} (hex)`}
              disabled={options.eyeColor === null}
              value={options.eyeColor ?? options.foreground}
              spellcheck={false}
              class="field font-mono text-sm uppercase disabled:opacity-40"
              onInput={(e) => {
                const next = e.currentTarget.value.trim();
                if (HEX.test(next)) set({ eyeColor: next });
              }}
            />
          </div>
        </div>

        <div>
          <label for="qr-logo" class="mb-1.5 block text-sm font-medium">
            {ui.logo}
          </label>
          <div class="flex gap-2">
            <label class="btn btn-secondary grow cursor-pointer font-normal">
              <input
                id="qr-logo"
                ref={fileRef}
                type="file"
                accept="image/*"
                class="sr-only"
                onChange={(e) => pickLogo(e.currentTarget.files?.[0])}
              />
              {options.logo ? (
                <img src={options.logo.dataUrl} alt="" class="h-6 w-6 rounded-sm object-contain" />
              ) : null}
              <span>{ui.logoChoose}</span>
            </label>
            {options.logo && (
              <button type="button" class="btn btn-secondary font-normal" onClick={removeLogo}>
                {ui.logoRemove}
              </button>
            )}
          </div>
          <p class="mt-1.5 text-sm text-muted">
            {logoError ?? (options.logo ? (options.ec === 'H' ? ui.logoEcNote : ui.logoEcWarning) : ui.logoHelp)}
          </p>
        </div>
      </div>
    </div>
  );
}

export { LOGO_FRACTION };
