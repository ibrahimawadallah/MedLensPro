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

  // Conversion funnel events
  funnel: {
    // Funnel 1: First Search
    landing_page_view: () => ({
      event: "funnel_landing_view",
      funnel_name: "first_search",
    }),
    search_performed: (query: string) => ({
      event: "funnel_search_performed",
      funnel_name: "first_search",
      search_query: query,
    }),
    drug_page_viewed: (drugName: string) => ({
      event: "funnel_drug_viewed",
      funnel_name: "first_search",
      drug_name: drugName,
    }),

    // Funnel 2: My Meds Adoption
    drug_page_viewed_mymeds: (drugName: string) => ({
      event: "funnel_drug_viewed",
      funnel_name: "my_meds_adoption",
      drug_name: drugName,
    }),
    add_to_meds_clicked: (drugName: string) => ({
      event: "funnel_add_clicked",
      funnel_name: "my_meds_adoption",
      drug_name: drugName,
    }),
    my_meds_page_viewed: () => ({
      event: "funnel_mymeds_viewed",
      funnel_name: "my_meds_adoption",
    }),

    // Funnel 3: Sign-up
    signup_started: (trigger: string) => ({
      event: "funnel_signup_started",
      funnel_name: "signup",
      trigger_source: trigger,
    }),
    signup_completed: (method: string) => ({
      event: "funnel_signup_completed",
      funnel_name: "signup",
      signup_method: method,
    }),
    first_login: () => ({
      event: "funnel_first_login",
      funnel_name: "signup",
    }),

    // Partnership funnel
    partnership_landing_viewed: () => ({
      event: "funnel_partnership_viewed",
      funnel_name: "partnership",
    }),
    partnership_form_started: (type: "pharmacy" | "provider" | "content") => ({
      event: "funnel_partnership_form_started",
      funnel_name: "partnership",
      partnership_type: type,
    }),
    partnership_form_submitted: (type: "pharmacy" | "provider" | "content") => ({
      event: "funnel_partnership_submitted",
      funnel_name: "partnership",
      partnership_type: type,
    }),
  },

  // A/B test events
  ab_test: {
    impression: (testName: string, variant: string) => ({
      event: "ab_test_impression",
      test_name: testName,
      variant,
    }),
    conversion: (testName: string, variant: string, conversionType: string) => ({
      event: "ab_test_conversion",
      test_name: testName,
      variant,
      conversion_type: conversionType,
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

// Helper function to track funnel steps
export function trackFunnelStep(funnelName: string, step: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "funnel_step", {
      funnel_name: funnelName,
      funnel_step: step,
      ...data,
    });
  }
}

// Helper function to track conversion
export function trackConversion(funnelName: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      funnel_name: funnelName,
      value,
    });
  }
}
