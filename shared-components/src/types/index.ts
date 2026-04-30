export interface GoogleMapProps {
  latitude: number;
  longitude: number;
  title: string;
  height?: string;
  zoom?: number;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date?: string;
}

export interface GoogleReviewsProps {
  reviews: Review[];
  maxReviews?: number;
  showRating?: boolean;
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'currency';
  placeholder: string;
  label: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

export interface ContactFormProps {
  fields: FormField[];
  webhookUrl: string;
  redirectUrl: string;
  buttonText?: string;
  title?: string;
  description?: string;
  companyId?: string;
  source?: string;
  onSuccess?: (data: Record<string, any>) => void;
  onError?: (error: Error) => void;
}
