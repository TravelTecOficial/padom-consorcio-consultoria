import React, { useState, useEffect } from 'react';
import type { ContactFormProps, FormField } from '../types';

// Parâmetros de rastreamento capturados da URL e mantidos na sessão
const TRACKING_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign',
  'utm_term', 'utm_content', 'utm_id',
  'fbclid', 'gclid', 'external_id',
] as const;

const SESSION_PREFIX = 'tt_tracking_';

function captureTrackingParams() {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    TRACKING_KEYS.forEach((key) => {
      const val = params.get(key);
      if (val) sessionStorage.setItem(`${SESSION_PREFIX}${key}`, val);
    });

    if (!sessionStorage.getItem(`${SESSION_PREFIX}external_id`)) {
      const sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(`${SESSION_PREFIX}external_id`, sessionId);
    }
  } catch {
    /* sessionStorage pode estar bloqueado em modo privado */
  }
}

function getTrackingData(): Record<string, string> {
  const tracking: Record<string, string> = {};
  if (typeof window === 'undefined') return tracking;
  try {
    TRACKING_KEYS.forEach((key) => {
      const val = sessionStorage.getItem(`${SESSION_PREFIX}${key}`);
      if (val) tracking[key] = val;
    });
  } catch {
    /* silencioso */
  }
  return tracking;
}

// Limites de tamanho por tipo de campo (cobrem 99% dos casos reais)
const MAX_LENGTH: Record<FormField['type'], number> = {
  text: 60,       // nome completo BR cabe folgado
  email: 80,      // RFC permite mais, prática quase sempre <60
  phone: 15,      // (11) 99999-9999
  currency: 17,   // 999.999.999.999 com pontos
  textarea: 300,  // ~3-4 frases
  select: 0,
};

// Formatação de telefone brasileiro: (11) 99999-9999 ou (11) 9999-9999
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

// Formatação de moeda BR para "valor desejado" (sem centavos): 1500000 -> "1.500.000"
function formatCurrency(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 13);
  if (!digits) return '';
  return parseInt(digits, 10).toLocaleString('pt-BR');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field: FormField, value: string): string | null {
  const trimmed = value.trim();
  if (field.required && !trimmed) return `${field.label} é obrigatório`;
  if (!trimmed) return null;
  if (field.type === 'email' && !EMAIL_REGEX.test(trimmed)) return 'E-mail inválido';
  if (field.type === 'phone' && trimmed.replace(/\D/g, '').length < 10) {
    return 'WhatsApp inválido (mínimo 10 dígitos)';
  }
  if (field.type === 'currency') {
    const digits = trimmed.replace(/\D/g, '');
    if (digits === '' || parseInt(digits, 10) === 0) {
      return 'Informe um valor válido';
    }
  }
  return null;
}

const inputBase =
  'w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 ' +
  'focus:outline-none focus:ring-2 transition';
const inputOk = 'border-gray-200 focus:border-gray-400 focus:ring-gray-100';
const inputError = 'border-red-300 focus:border-red-400 focus:ring-red-100';

export const ContactForm: React.FC<ContactFormProps> = ({
  fields,
  webhookUrl,
  redirectUrl,
  buttonText = 'Enviar',
  title,
  description,
  companyId,
  source,
  onSuccess,
  onError,
}) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    captureTrackingParams();
  }, []);

  const setFieldValue = (field: FormField, raw: string) => {
    let value = raw;
    if (field.type === 'phone') value = formatPhone(raw);
    else if (field.type === 'currency') value = formatCurrency(raw);
    setValues((prev) => ({ ...prev, [field.name]: value }));
    if (errors[field.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field.name];
        return next;
      });
    }
  };

  const handleBlur = (field: FormField) => {
    const err = validateField(field, values[field.name] || '');
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[field.name] = err;
      else delete next[field.name];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
      const err = validateField(f, values[f.name] || '');
      if (err) newErrors[f.name] = err;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      captureTrackingParams();

      const payload = {
        ...values,
        ...(companyId ? { company_id: companyId } : {}),
        ...(source ? { source } : {}),
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
        ...getTrackingData(),
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar: ${response.statusText}`);
      }

      if (onSuccess) onSuccess(payload);
      setSubmitted(true);

      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao enviar formulário';
      setSubmitError(errorMsg);
      if (onError) onError(err instanceof Error ? err : new Error(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          Formulário enviado com sucesso!
        </h3>
        <p className="text-gray-600">Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      )}
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {fields.map((field) => {
          const fieldError = errors[field.name];
          const value = values[field.name] || '';
          const maxLength = MAX_LENGTH[field.type] || undefined;
          const borderClass = fieldError ? inputError : inputOk;

          return (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-0.5">*</span>}
              </label>

              {field.type === 'textarea' ? (
                <>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={value}
                    onChange={(e) => setFieldValue(field, e.target.value)}
                    onBlur={() => handleBlur(field)}
                    placeholder={field.placeholder}
                    maxLength={maxLength}
                    rows={4}
                    className={`${inputBase} ${borderClass} resize-none`}
                  />
                  {maxLength && (
                    <div className="mt-1 text-right text-[11px] text-gray-400 tabular-nums">
                      {value.length}/{maxLength}
                    </div>
                  )}
                </>
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={value}
                  onChange={(e) => setFieldValue(field, e.target.value)}
                  onBlur={() => handleBlur(field)}
                  className={`${inputBase} ${borderClass}`}
                >
                  <option value="">{field.placeholder}</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'currency' ? (
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium pointer-events-none"
                  >
                    R$
                  </span>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={value}
                    onChange={(e) => setFieldValue(field, e.target.value)}
                    onBlur={() => handleBlur(field)}
                    placeholder={field.placeholder}
                    maxLength={maxLength}
                    inputMode="numeric"
                    className={`${inputBase} ${borderClass} pl-10 tabular-nums`}
                  />
                </div>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type === 'phone' ? 'tel' : field.type}
                  value={value}
                  onChange={(e) => setFieldValue(field, e.target.value)}
                  onBlur={() => handleBlur(field)}
                  placeholder={field.placeholder}
                  maxLength={maxLength}
                  inputMode={field.type === 'phone' ? 'tel' : field.type === 'email' ? 'email' : undefined}
                  autoComplete={
                    field.type === 'email' ? 'email'
                      : field.type === 'phone' ? 'tel'
                      : field.name.toLowerCase().includes('nome') ? 'name'
                      : undefined
                  }
                  className={`${inputBase} ${borderClass}`}
                />
              )}

              {fieldError && (
                <p className="mt-1.5 text-xs text-red-600">{fieldError}</p>
              )}
            </div>
          );
        })}

        {submitError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          data-gtm-event="form_submit_click"
          data-gtm-label="Botão Enviar Formulário"
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition duration-200"
        >
          {loading ? 'Enviando...' : buttonText}
        </button>
      </form>
    </div>
  );
};
