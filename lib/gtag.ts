export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

type EventArgs = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

export const pageview = (url: string) => {
  if (!GA_ID) return;
  if (typeof window === 'undefined') return;
  // @ts-ignore
  window.gtag && window.gtag('config', GA_ID, { page_path: url });
};

export const event = ({ action, category, label, value }: EventArgs) => {
  if (!GA_ID) return;
  if (typeof window === 'undefined') return;
  // @ts-ignore
  window.gtag && window.gtag('event', action, { event_category: category, event_label: label, value });
};
