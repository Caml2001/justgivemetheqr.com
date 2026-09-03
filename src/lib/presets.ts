import type { EyeShape, ModuleShape } from './render';

export interface StylePreset {
  id: string;
  modules: ModuleShape;
  eyes: EyeShape;
}

/** The gallery. Names live in i18n under `presets.<id>`. */
export const STYLE_PRESETS: StylePreset[] = [
  { id: 'classic', modules: 'square', eyes: 'square' },
  { id: 'rounded', modules: 'rounded', eyes: 'rounded' },
  { id: 'dots', modules: 'dot', eyes: 'circle' },
  { id: 'soft', modules: 'rounded', eyes: 'circle' },
  { id: 'beads', modules: 'dot', eyes: 'square' },
  { id: 'blocks', modules: 'square', eyes: 'rounded' },
];

export function presetFor(modules: ModuleShape, eyes: EyeShape): StylePreset | undefined {
  return STYLE_PRESETS.find((p) => p.modules === modules && p.eyes === eyes);
}
