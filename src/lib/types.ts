/**
 * Shape of a QR content type. Adding a new type means adding one file in
 * `src/lib/payloads/` that default-exports a `QrTypeDef`, registering it in
 * `payloads/index.ts`, and adding one page under `src/pages/`.
 */

export type FieldKind =
  | 'text'
  | 'textarea'
  | 'url'
  | 'tel'
  | 'email'
  | 'password'
  | 'select'
  | 'checkbox';

export interface SelectOption {
  value: string;
  /** English label. Translations live in `src/lib/i18n.ts`. */
  label: string;
}

export interface FieldDef {
  /** Also the query-string parameter name used for prefill. */
  name: string;
  kind: FieldKind;
  /** English label; `i18n` may override it via the `<typeId>.<name>` key. */
  label: string;
  placeholder?: string;
  /** Short hint rendered under the input. */
  help?: string;
  options?: SelectOption[];
  default?: string | boolean;
  autocomplete?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'url' | 'numeric' | 'decimal';
  rows?: number;
  /** Extra query-string aliases accepted for prefill. */
  aliases?: string[];
  /** Renders the field at half width on wide screens. */
  half?: boolean;
  /** The one big input on single-field types; rendered larger. */
  primary?: boolean;
}

export type FieldValues = Record<string, string | boolean>;

export interface QrTypeDef {
  id: string;
  /** Route of the dedicated landing page for this type. */
  path: string;
  /** English label for the type switcher. */
  label: string;
  fields: FieldDef[];
  /** Pure function: form values in, QR payload string out. Never throws. */
  build: (values: FieldValues) => string;
  /** Values used for the dimmed example QR shown before anyone types. */
  example: FieldValues;
}

/** Reads a field as a trimmed string. */
export function str(values: FieldValues, name: string): string {
  const v = values[name];
  return typeof v === 'string' ? v.trim() : '';
}

/** Reads a field as a raw (untrimmed) string, for message bodies. */
export function raw(values: FieldValues, name: string): string {
  const v = values[name];
  return typeof v === 'string' ? v : '';
}

/** Reads a field as a boolean. */
export function bool(values: FieldValues, name: string): boolean {
  return values[name] === true || values[name] === 'true';
}

/** Builds the default value map for a type's form. */
export function defaultValues(type: QrTypeDef): FieldValues {
  const values: FieldValues = {};
  for (const field of type.fields) {
    values[field.name] = field.default ?? (field.kind === 'checkbox' ? false : '');
  }
  return values;
}
