# Shared Components - Landing Pages

Biblioteca centralizada de componentes reutilizáveis para todas as landing pages.

## Componentes Disponíveis

### GoogleMap
Componente para exibir mapa do Google com localização da empresa.

```tsx
import { GoogleMap } from '@landing-pages/shared-components';

<GoogleMap
  latitude={-23.5505}
  longitude={-46.6333}
  title="Nossa localização"
  height="400px"
  zoom={15}
/>
```

**Props:**
- `latitude` (number) - Latitude da localização
- `longitude` (number) - Longitude da localização
- `title` (string) - Título do mapa (acessibilidade)
- `height?` (string) - Altura do iframe (padrão: "400px")
- `zoom?` (number) - Nível de zoom (padrão: 15)

---

### GoogleReviews
Componente para exibir avaliações do Google My Business.

```tsx
import { GoogleReviews } from '@landing-pages/shared-components';

const reviews = [
  {
    author: "João Silva",
    rating: 5,
    text: "Ótimo atendimento!",
    date: "2 meses atrás"
  },
  // ... mais reviews
];

<GoogleReviews 
  reviews={reviews}
  maxReviews={3}
  showRating={true}
/>
```

**Props:**
- `reviews` (Review[]) - Array de avaliações
- `maxReviews?` (number) - Quantas avaliações exibir (padrão: 3)
- `showRating?` (boolean) - Mostrar nota média (padrão: true)

**Interface Review:**
```tsx
{
  author: string;      // Nome do autor
  rating: number;      // 1-5 estrelas
  text: string;        // Texto da avaliação
  date?: string;       // Data da avaliação
}
```

---

### ContactForm
Componente de formulário de contato com envio para webhook.

```tsx
import { ContactForm } from '@landing-pages/shared-components';

<ContactForm
  fields={[
    { 
      name: 'nome', 
      type: 'text', 
      label: 'Seu nome',
      placeholder: 'João Silva',
      required: true 
    },
    { 
      name: 'email', 
      type: 'email', 
      label: 'E-mail',
      placeholder: 'seu@email.com',
      required: true 
    },
    { 
      name: 'telefone', 
      type: 'phone', 
      label: 'Telefone',
      placeholder: '(11) 99999-9999',
      required: false 
    },
    { 
      name: 'mensagem', 
      type: 'textarea', 
      label: 'Mensagem',
      placeholder: 'Sua mensagem aqui',
      required: false 
    },
  ]}
  webhookUrl="https://seu-webhook.com/forms"
  redirectUrl="/obrigado"
  buttonText="Solicitar Contato"
  title="Entre em contato"
  description="Preencha o formulário abaixo"
  onSuccess={(data) => console.log('Enviado:', data)}
  onError={(error) => console.error('Erro:', error)}
/>
```

**Props:**
- `fields` (FormField[]) - Array de campos do formulário
- `webhookUrl` (string) - URL do webhook para receber dados
- `redirectUrl` (string) - URL para redirecionar após envio
- `buttonText?` (string) - Texto do botão (padrão: "Enviar")
- `title?` (string) - Título do formulário
- `description?` (string) - Descrição do formulário
- `onSuccess?` (callback) - Chamado após envio bem-sucedido
- `onError?` (callback) - Chamado em caso de erro

**Interface FormField:**
```tsx
{
  name: string;                                    // Nome do campo (HTML name)
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select';
  label: string;                                   // Label exibido
  placeholder: string;                             // Placeholder
  required: boolean;                               // Campo obrigatório
  options?: { value: string; label: string }[];    // Para campos select
}
```

---

## Como usar em uma LP

1. **Instale em seu package.json:**
```json
{
  "dependencies": {
    "@landing-pages/shared-components": "file:../../shared-components"
  }
}
```

2. **Execute npm install:**
```bash
npm install
```

3. **Importe e use:**
```tsx
import { GoogleMap, GoogleReviews, ContactForm } from '@landing-pages/shared-components';

export function Mapa() {
  return <GoogleMap latitude={-23.5505} longitude={-46.6333} title="Localização" />;
}
```

---

## Estrutura de Pastas

```
shared-components/
├── src/
│   ├── components/
│   │   ├── GoogleMap.tsx
│   │   ├── GoogleReviews.tsx
│   │   ├── ContactForm.tsx
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── package.json
└── README.md
```

---

## Atualizações e Manutenção

Quando você atualizar um componente em `shared-components/`:

1. Faça as mudanças no arquivo
2. Cada LP que usa o componente verá a atualização automaticamente (via symlink do npm)

Para forçar atualizar:
```bash
npm install
```
