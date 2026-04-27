/**
 * A/B Testing Framework
 * Simple client-side A/B testing with localStorage persistence
 */

export type Variant = 'A' | 'B' | 'C' | 'D';

export interface TestConfig {
  name: string;
  variants: {
    [key in Variant]?: {
      weight?: number; // Probability weight (default: equal)
      description?: string;
    };
  };
  enabled: boolean;
}

export interface TestResult {
  testName: string;
  variant: Variant;
  timestamp: number;
}

// Test configurations
export const TESTS: Record<string, TestConfig> = {
  hero_cta_button: {
    name: 'Hero CTA Button Test',
    variants: {
      A: { weight: 25, description: 'Current: "Search medications" (secondary)' },
      B: { weight: 25, description: 'Variant B: "Start Searching Now" (primary, larger)' },
      C: { weight: 25, description: 'Variant C: "Find Your Medicine" (with icon)' },
      D: { weight: 25, description: 'Variant D: "Try It Free" (emphasize free)' },
    },
    enabled: false, // Set to true to enable
  },
  hero_copy: {
    name: 'Hero Copy Test',
    variants: {
      A: { weight: 25, description: 'Current: "Plain-language drug info"' },
      B: { weight: 25, description: 'Variant B: "Understand Your Medications in 30 Seconds"' },
      C: { weight: 25, description: 'Variant C: "FDA-Approved Drug Information in Arabic & English"' },
      D: { weight: 25, description: 'Variant D: "Your Personal Medication Safety Guide"' },
    },
    enabled: false,
  },
  search_suggestions: {
    name: 'Search Suggestions Test',
    variants: {
      A: { weight: 33, description: 'Current: Show on focus with popular searches' },
      B: { weight: 33, description: 'Variant B: Show on typing with autocomplete' },
      C: { weight: 34, description: 'Variant C: Show recent searches + popular' },
    },
    enabled: false,
  },
  drug_page_cta: {
    name: 'Drug Page CTA Test',
    variants: {
      A: { weight: 33, description: 'Current: At top of page' },
      B: { weight: 33, description: 'Variant B: Sticky at bottom of screen' },
      C: { weight: 34, description: 'Variant C: Both top and bottom' },
    },
    enabled: false,
  },
  signup_trigger: {
    name: 'Sign-up Trigger Test',
    variants: {
      A: { weight: 25, description: 'Current: Sign-up button in header' },
      B: { weight: 25, description: 'Variant B: Prompt after adding to "My Meds"' },
      C: { weight: 25, description: 'Variant C: Prompt after 3rd search' },
      D: { weight: 25, description: 'Variant D: Prompt after 1 minute on site' },
    },
    enabled: false,
  },
};

/**
 * Get the assigned variant for a test
 * Uses consistent hashing based on user ID or random assignment
 */
export function getVariant(testName: string, userId?: string): Variant {
  const test = TESTS[testName];
  if (!test || !test.enabled) {
    return 'A'; // Default to control variant
  }

  // Check if user already has an assigned variant
  const storageKey = `ab_test_${testName}`;
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return stored as Variant;
    }
  }

  // Calculate weights
  const variants = Object.keys(test.variants) as Variant[];
  const totalWeight = variants.reduce(
    (sum, variant) => sum + (test.variants[variant]?.weight || 1),
    0
  );

  // Generate random number
  let random: number;
  if (userId) {
    // Consistent hash based on user ID
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = ((hash << 5) - hash) + userId.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    random = Math.abs(hash) % totalWeight;
  } else {
    // Random assignment
    random = Math.random() * totalWeight;
  }

  // Select variant based on weight
  let cumulativeWeight = 0;
  for (const variant of variants) {
    cumulativeWeight += test.variants[variant]?.weight || 1;
    if (random < cumulativeWeight) {
      // Store assignment
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, variant);
      }
      return variant;
    }
  }

  return 'A'; // Fallback
}

/**
 * Track a test impression
 */
export function trackTestImpression(testName: string, variant: Variant): void {
  if (typeof window === 'undefined') return;

  const result: TestResult = {
    testName,
    variant,
    timestamp: Date.now(),
  };

  // Store in localStorage for analytics
  const impressions = JSON.parse(localStorage.getItem('ab_test_impressions') || '[]');
  impressions.push(result);
  localStorage.setItem('ab_test_impressions', JSON.stringify(impressions));

  // Send to analytics if available
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'ab_test_impression', {
      test_name: testName,
      variant,
    });
  }
}

/**
 * Track a test conversion
 */
export function trackTestConversion(testName: string, variant: Variant, conversionType: string): void {
  if (typeof window === 'undefined') return;

  const result: TestResult = {
    testName,
    variant,
    timestamp: Date.now(),
  };

  // Store in localStorage for analytics
  const conversions = JSON.parse(localStorage.getItem('ab_test_conversions') || '[]');
  conversions.push({ ...result, conversionType });
  localStorage.setItem('ab_test_conversions', JSON.stringify(conversions));

  // Send to analytics if available
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'ab_test_conversion', {
      test_name: testName,
      variant,
      conversion_type: conversionType,
    });
  }
}

/**
 * Get all test results for analytics
 */
export function getTestResults(): {
  impressions: TestResult[];
  conversions: Array<TestResult & { conversionType: string }>;
} {
  if (typeof window === 'undefined') {
    return { impressions: [], conversions: [] };
  }

  return {
    impressions: JSON.parse(localStorage.getItem('ab_test_impressions') || '[]'),
    conversions: JSON.parse(localStorage.getItem('ab_test_conversions') || '[]'),
  };
}

/**
 * Clear all test data (for testing)
 */
export function clearTestData(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('ab_test_impressions');
  localStorage.removeItem('ab_test_conversions');

  // Clear individual test assignments
  Object.keys(TESTS).forEach((testName) => {
    localStorage.removeItem(`ab_test_${testName}`);
  });
}

/**
 * Calculate test statistics
 */
export function calculateTestStats(testName: string): {
  impressions: { [key in Variant]?: number };
  conversions: { [key in Variant]?: number };
  conversionRates: { [key in Variant]?: number };
} {
  const results = getTestResults();
  const variants = Object.keys(TESTS[testName]?.variants || {}) as Variant[];

  const impressions: { [key in Variant]?: number } = {};
  const conversions: { [key in Variant]?: number } = {};
  const conversionRates: { [key in Variant]?: number } = {};

  variants.forEach((variant) => {
    impressions[variant] = results.impressions.filter(
      (r) => r.testName === testName && r.variant === variant
    ).length;
    conversions[variant] = results.conversions.filter(
      (r) => r.testName === testName && r.variant === variant
    ).length;
    conversionRates[variant] = impressions[variant]
      ? (conversions[variant]! / impressions[variant]!) * 100
      : 0;
  });

  return { impressions, conversions, conversionRates };
}
