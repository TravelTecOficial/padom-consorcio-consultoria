import React, { useState } from 'react';
import type { ContactFormProps } from '../types';

export const ContactForm: React.FC<ContactFormProps> = ({
  fields,
  webhookUrl,
  redirectUrl,
  buttonText = 'Enviar',
  title,
  description,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const data: Record<string, any> = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Enviar para webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar: ${response.statusText}`);
      }

      // Callback de sucesso
      if (onSuccess) {
        onSuccess(data);
      }

      setSubmitted(true);

      // Redirecionar após 1 segundo
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Erro ao enviar formulário';
      setError(errorMsg);

      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMsg));
      }
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            ) : field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{field.placeholder}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          {loading ? 'Enviando...' : buttonText}
        </button>
      </form>
    </div>
  );
};
