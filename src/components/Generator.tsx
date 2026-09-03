import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { TargetedEvent } from 'preact';
import { QR_TYPES, getType } from '../lib/payloads';
import { defaultValues, type FieldDef, type FieldValues } from '../lib/types';
import {
  DEFAULT_OPTIONS,
  EC_LEVELS,
  MAX_BYTES,
  MIN_SCANNABLE_CONTRAST,
  SIZES,
  byteLength,
  contrastRatio,
  drawToCanvas,
  isInverted,
  toPngDataUrl,
  toSvg,
  type EcLevel,
  type QrOptions,
  type QrSize,
} from '../lib/qr';
import { format, getUi, type Lang, type UiStrings } from '../lib/i18n';
import StylePanel from './StylePanel';
import { presetFor } from '../lib/presets';

interface Props {
  lang?: Lang;
  /** Preselected content type — type pages pass their own id. */
  type?: string;
}

/** Preview resolution in device pixels; downloads re-render at full size. */
const PREVIEW_PX = 512;
const DEBOUNCE_MS = 150;

const HEX = /^#[0-9a-f]{6}$/i;

function truthy(value: string): boolean {
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

export default function Generator({ lang = 'en', type: initialType = 'url' }: Props) {
  const ui = getUi(lang);

  const [typeId, setTypeId] = useState(() => getType(initialType).id);
  const [forms, setForms] = useState<Record<string, FieldValues>>(() => {
    const initial: Record<string, FieldValues> = {};
    for (const t of QR_TYPES) initial[t.id] = defaultValues(t);
    return initial;
  });
  const [options, setOptions] = useState<QrOptions>(DEFAULT_OPTIONS);
  const [showOptions, setShowOptions] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const type = getType(typeId);
  const values = forms[typeId] ?? defaultValues(type);

  /** Prefill from the query string. Never triggers a download. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.size === 0) return;

    const requested = params.get('type');
    const target = requested && QR_TYPES.some((t) => t.id === requested) ? requested : typeId;

    const next: FieldValues = { ...(forms[target] ?? defaultValues(getType(target))) };
    let touched = false;
    for (const field of getType(target).fields) {
      const keys = [field.name, ...(field.aliases ?? [])];
      const key = keys.find((k) => params.has(k));
      if (!key) continue;
      const value = params.get(key) ?? '';
      next[field.name] = field.kind === 'checkbox' ? truthy(value) : value;
      touched = true;
    }

    if (target !== typeId) setTypeId(target);
    if (touched) setForms((current) => ({ ...current, [target]: next }));
    // Appearance is deliberately not prefillable: a link should not get to
    // decide the colours of someone else's code.
  }, []);

  const data = useMemo(() => type.build(values), [type, values]);
  const isEmpty = data.length === 0;
  const previewData = isEmpty ? type.build(type.example) : data;

  const used = byteLength(data);
  const max = MAX_BYTES[options.ec];
  const tooLong = used > max;

  const contrast = contrastRatio(options.foreground, options.background);
  const lowContrast = contrast < MIN_SCANNABLE_CONTRAST;
  const inverted = !lowContrast && isInverted(options.foreground, options.background);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    setCopyState('idle');
  }, [data, options]);

  useEffect(() => {
    if (tooLong) return;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;
      try {
        drawToCanvas(canvas, previewData, options, PREVIEW_PX);
        setRenderError(null);
      } catch (error: unknown) {
        setRenderError(error instanceof Error ? error.message : String(error));
      }
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [previewData, options, tooLong]);

  const setValue = useCallback(
    (name: string, value: string | boolean) => {
      setForms((current) => ({
        ...current,
        [typeId]: { ...(current[typeId] ?? {}), [name]: value },
      }));
    },
    [typeId],
  );

  const clear = useCallback(() => {
    setForms((current) => ({ ...current, [typeId]: defaultValues(getType(typeId)) }));
  }, [typeId]);

  const download = useCallback(
    (kind: 'png' | 'svg') => {
      const href =
        kind === 'png'
          ? toPngDataUrl(data, options)
          : `data:image/svg+xml;charset=utf-8,${encodeURIComponent(toSvg(data, options))}`;
      const link = document.createElement('a');
      link.href = href;
      link.download = `qr-${typeId}.${kind}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    [data, options, typeId],
  );

  const copyPng = useCallback(() => {
    // The ClipboardItem has to be constructed synchronously inside the click
    // handler for Safari to accept it, so we hand it the pending blob.
    if (typeof ClipboardItem === 'undefined' || !navigator.clipboard?.write) {
      setCopyState('error');
      return;
    }
    const blob = fetch(toPngDataUrl(data, options)).then((response) => response.blob());
    navigator.clipboard
      .write([new ClipboardItem({ 'image/png': blob })])
      .then(() => setCopyState('copied'))
      .catch(() => setCopyState('error'));
  }, [data, options]);

  const disabled = isEmpty || tooLong || renderError !== null;

  const preset = presetFor(options.modules, options.eyes);
  const styleName =
    preset?.id === 'classic' && !options.logo && !options.eyeColor
      ? null
      : preset
        ? (ui.presets[preset.id] ?? preset.id)
        : ui.custom;

  return (
    <div class="rounded-block bg-surface p-4 sm:p-6 md:p-8">
      <fieldset class="mb-6">
        <legend class="sr-only">{ui.contentType}</legend>
        <div class="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
          {QR_TYPES.map((t) => (
            <label key={t.id} class="chip" data-active={t.id === typeId}>
              <input
                type="radio"
                name="qr-type"
                class="sr-only"
                checked={t.id === typeId}
                onChange={() => setTypeId(t.id)}
              />
              {ui.types[t.id] ?? t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div class="grid gap-8 md:grid-cols-[minmax(0,1fr)_19rem] md:gap-10 lg:grid-cols-[minmax(0,1fr)_21rem]">
      <div class="min-w-0">

        <div class="grid gap-4 sm:grid-cols-2">
          {type.fields.map((field) => (
            <Field
              key={`${typeId}.${field.name}`}
              typeId={typeId}
              field={field}
              value={values[field.name] ?? ''}
              label={ui.fields[`${typeId}.${field.name}`] ?? field.label}
              ui={ui}
              onInput={setValue}
            />
          ))}
        </div>

        <div class="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <button
            type="button"
            class="flex items-center gap-2 text-sm"
            aria-expanded={showOptions}
            aria-controls="qr-appearance"
            onClick={() => setShowOptions((v) => !v)}
          >
            <Chevron open={showOptions} />
            <span class="font-medium">{ui.optionsHeading}</span>
            <span class="flex items-center gap-1.5 text-muted" aria-hidden="true">
              <Swatch colour={options.foreground} />
              <Swatch colour={options.background} />
            </span>
            <span class="text-muted">
              {styleName ? `${styleName}, ` : ''}
              {format(ui.sizeShort, { size: options.size })}, {format(ui.ecShort, { ec: options.ec })}
            </span>
          </button>
          {!isEmpty && (
            <button type="button" class="link text-sm text-muted" onClick={clear}>
              {ui.reset}
            </button>
          )}
        </div>

        <div id="qr-appearance" hidden={!showOptions}>
          <Options ui={ui} options={options} onChange={setOptions} />
        </div>

        {!isEmpty && (
          <details class="mt-6 text-sm">
            <summary class="link cursor-pointer text-muted">
              {ui.payloadHeading}
              <span class="ml-2 font-mono text-xs">
                {format(ui.bytesUsed, { used, max })}
              </span>
            </summary>
            <pre class="mt-3 overflow-x-auto rounded-field bg-surface p-3 font-mono text-xs leading-relaxed break-all whitespace-pre-wrap">
              {data}
            </pre>
          </details>
        )}
      </div>

      <div class="md:sticky md:top-6 md:self-start">
        <div
          class="rounded-card p-5 shadow-card"
          style={{ background: options.background }}
        >
          {tooLong || renderError ? (
            <p
              class="flex min-h-64 items-center rounded-field bg-paper p-4 text-small text-danger"
              role="alert"
            >
              {tooLong ? format(ui.tooLong, { used, max, ec: options.ec }) : renderError}
            </p>
          ) : (
            <canvas
              ref={canvasRef}
              width={PREVIEW_PX}
              height={PREVIEW_PX}
              role="img"
              aria-label={ui.preview}
              class={`mx-auto h-auto w-full ${isEmpty ? 'opacity-30' : ''}`}
              style={{ transition: 'opacity 150ms ease' }}
            />
          )}
        </div>

        <div class="mt-4 grid gap-2">
          <button type="button" disabled={disabled} onClick={() => download('png')} class="btn btn-primary">
            {ui.downloadPng}
          </button>
          <div class="grid grid-cols-2 gap-2">
            <button type="button" disabled={disabled} onClick={() => download('svg')} class="btn btn-secondary">
              {ui.downloadSvg}
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={copyPng}
              class={`btn btn-secondary ${copyState === 'copied' ? 'text-signal' : ''}`}
            >
              {copyState === 'copied' ? ui.copied : ui.copyPng}
            </button>
          </div>
        </div>

        <p class="mt-3 text-center text-small text-muted">{ui.noUpload}</p>

        <div class="mt-3 grid gap-2 text-small" aria-live="polite">
          {isEmpty && <p class="text-center text-muted">{ui.exampleNotice}</p>}
          {copyState === 'error' && (
            <p class="rounded-field bg-danger-surface p-3 text-danger" role="alert">
              {ui.copyUnsupported}
            </p>
          )}
          {lowContrast && <p class="rounded-field bg-danger-surface p-3 text-danger">{ui.contrastWarning}</p>}
          {inverted && <p class="rounded-field bg-warn-surface p-3 text-warn">{ui.invertedWarning}</p>}
        </div>
      </div>
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
      class="shrink-0"
      style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 120ms ease' }}
    >
      <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" />
    </svg>
  );
}

function Swatch({ colour }: { colour: string }) {
  return (
    <span
      class="inline-block h-3.5 w-3.5 rounded-xs border border-line"
      style={{ background: colour }}
    />
  );
}

interface FieldProps {
  typeId: string;
  field: FieldDef;
  value: string | boolean;
  label: string;
  ui: UiStrings;
  onInput: (name: string, value: string | boolean) => void;
}

function Field({ typeId, field, value, label, ui, onInput }: FieldProps) {
  const id = `f-${typeId}-${field.name}`;
  const describedBy = field.help ? `${id}-help` : undefined;
  const wide = field.kind === 'textarea' || !field.half;
  const [revealed, setRevealed] = useState(false);

  const shared = {
    id,
    name: field.name,
    'aria-describedby': describedBy,
    class: `field${field.primary ? ' field-lg' : ''}`,
  };

  const handle = (event: TargetedEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = event.currentTarget;
    onInput(
      field.name,
      target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value,
    );
  };

  const help = field.help && (
    <p id={describedBy} class="mt-1.5 text-sm text-muted">
      {field.help}
    </p>
  );

  if (field.kind === 'checkbox') {
    return (
      <div class={wide ? 'sm:col-span-2' : ''}>
        <label class="flex items-center gap-2.5 text-sm">
          <input
            id={id}
            name={field.name}
            type="checkbox"
            checked={value === true}
            aria-describedby={describedBy}
            onChange={handle}
            class="h-4 w-4 accent-ink"
          />
          {label}
        </label>
        {help}
      </div>
    );
  }

  return (
    <div class={wide ? 'sm:col-span-2' : ''}>
      <label for={id} class="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {field.kind === 'textarea' ? (
        <textarea {...shared} rows={field.rows ?? 3} value={String(value)} placeholder={field.placeholder} onInput={handle} />
      ) : field.kind === 'select' ? (
        <select {...shared} value={String(value)} onChange={handle}>
          {(field.options ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div class="relative">
          <input
            {...shared}
            type={field.kind === 'password' ? (revealed ? 'text' : 'password') : field.kind}
            value={String(value)}
            placeholder={field.placeholder}
            inputMode={field.inputMode}
            autocomplete={field.kind === 'password' ? 'off' : field.autocomplete}
            spellcheck={field.kind === 'password' ? false : undefined}
            onInput={handle}
            class={`${shared.class}${field.kind === 'password' ? ' pr-16' : ''}`}
          />
          {field.kind === 'password' && (
            <button
              type="button"
              class="link absolute inset-y-0 right-0 px-3 text-sm text-muted"
              aria-pressed={revealed}
              onClick={() => setRevealed((v) => !v)}
            >
              {revealed ? ui.hide : ui.show}
            </button>
          )}
        </div>
      )}
      {help}
    </div>
  );
}

interface OptionsProps {
  ui: UiStrings;
  options: QrOptions;
  onChange: (next: QrOptions) => void;
}

function Options({ ui, options, onChange }: OptionsProps) {
  const set = <K extends keyof QrOptions>(key: K, value: QrOptions[K]) =>
    onChange({ ...options, [key]: value });

  return (
    <fieldset class="mt-4 grid gap-5 rounded-card border border-line p-4 sm:grid-cols-2">
      <legend class="sr-only">{ui.optionsHeading}</legend>

      <StylePanel ui={ui} options={options} onChange={onChange} />

      <ColourField label={ui.foreground} value={options.foreground} onChange={(v) => set('foreground', v)} />
      <ColourField label={ui.background} value={options.background} onChange={(v) => set('background', v)} />

      <div>
        <label for="qr-size" class="mb-1.5 block text-sm font-medium">
          {ui.size}
        </label>
        <select
          id="qr-size"
          class="field"
          value={String(options.size)}
          onChange={(e) => set('size', Number(e.currentTarget.value) as QrSize)}
        >
          {SIZES.map((size) => (
            <option key={size} value={size}>
              {size} × {size} px
            </option>
          ))}
        </select>
      </div>

      <div>
        <label for="qr-ec" class="mb-1.5 block text-sm font-medium">
          {ui.errorCorrection}
        </label>
        <select id="qr-ec" class="field" value={options.ec} onChange={(e) => set('ec', e.currentTarget.value as EcLevel)}>
          {EC_LEVELS.map((level) => (
            <option key={level} value={level}>
              {ui.ecOption[level]}
            </option>
          ))}
        </select>
      </div>

      <div class="sm:col-span-2">
        <label for="qr-margin" class="mb-1.5 flex justify-between text-sm font-medium">
          <span>{ui.margin}</span>
          <span class="font-mono text-muted">{options.margin}</span>
        </label>
        <input
          id="qr-margin"
          type="range"
          min={0}
          max={10}
          step={1}
          value={options.margin}
          class="w-full accent-ink"
          onInput={(e) => set('margin', Number(e.currentTarget.value))}
        />
      </div>
    </fieldset>
  );
}

function ColourField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `c-${label.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <div>
      <label for={id} class="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <div class="flex gap-2">
        <input
          id={id}
          type="color"
          value={value}
          class="h-11 w-12 shrink-0 cursor-pointer rounded-field border border-line bg-paper p-1"
          onInput={(e) => onChange(e.currentTarget.value)}
        />
        <input
          type="text"
          value={value}
          aria-label={`${label} (hex)`}
          spellcheck={false}
          class="field font-mono text-sm uppercase"
          onInput={(e) => {
            const next = e.currentTarget.value.trim();
            if (HEX.test(next)) onChange(next);
          }}
        />
      </div>
    </div>
  );
}
