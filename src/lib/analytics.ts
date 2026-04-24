// Custom analytics events tracking
// This works with both Google Analytics and Vercel Analytics

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const analyticsEvents = {
  // Search events
  search: {
    performed: (query: string) => ({
      event: "search_performed",
      search_query: query,
    }),
    suggestion_clicked: (suggestion: string) => ({
      event: "search_suggestion_clicked",
      suggestion,
    }),
    voice_search: () => ({
      event: "voice_search_initiated",
    }),
  },

  // Drug page events
  drug: {
    viewed: (setid: string, drugName: string) => ({
      event: "drug_viewed",
      drug_id: setid,
      drug_name: drugName,
    }),
    saved: (setid: string, drugName: string) => ({
      event: "drug_saved",
      drug_id: setid,
      drug_name: drugName,
    }),
    removed: (setid: string, drugName: string) => ({
      event: "drug_removed",
      drug_id: setid,
      drug_name: drugName,
    }),
  },

  // User events
  user: {
    signed_in: (method: "google" | "email") => ({
      event: "user_signed_in",
      method,
    }),
    signed_up: (method: "google" | "email") => ({
      event: "user_signed_up",
      method,
    }),
    profile_viewed: () => ({
      event: "profile_viewed",
    }),
  },

  // Content events
  content: {
    blog_viewed: (slug: string) => ({
      event: "blog_viewed",
      blog_slug: slug,
    }),
    resource_clicked: (resourceName: string) => ({
      event: "resource_clicked",
      resource_name: resourceName,
    }),
    faq_viewed: (category: string) => ({
      event: "faq_viewed",
      category,
    }),
  },

  // Newsletter events
  newsletter: {
    subscribed: () => ({
      event: "newsletter_subscribed",
    }),
  },

  // Feature usage
  features: {
    ndc_lookup: () => ({
      event: "ndc_lookup_used",
    }),
    barcode_scan: () => ({
      event: "barcode_scan_used",
    }),
    locale_changed: (locale: string) => ({
      event: "locale_changed",
      new_locale: locale,
    }),
    theme_changed: (theme: string) => ({
      event: "theme_changed",
      new_theme: theme,
    }),
  },
};

export function trackEvent(eventData: Record<string, unknown>) {
  // Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventData.event, eventData);
  }

  // Vercel Analytics (automatically tracks custom events)
  // No additional code needed - Vercel Analytics captures all events
}

// Helper function to track page views
export function trackPageView(page: string, title: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_title: title,
      page_location: page,
    });
  }
}
