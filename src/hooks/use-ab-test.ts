/**
 * React hook for A/B testing
 * Usage: const { variant, trackImpression, trackConversion } = useABTest('test_name');
 */

'use client';

import { useEffect, useState } from 'react';
import { getVariant, trackTestImpression, trackTestConversion, Variant } from '@/lib/ab-testing';

interface UseABTestReturn {
  variant: Variant;
  trackImpression: () => void;
  trackConversion: (conversionType: string) => void;
  isTestEnabled: boolean;
}

export function useABTest(testName: string, userId?: string): UseABTestReturn {
  const [variant, setVariant] = useState<Variant>('A');
  const [isTestEnabled, setIsTestEnabled] = useState(false);

  useEffect(() => {
    // Get variant on mount
    const assignedVariant = getVariant(testName, userId);
    setVariant(assignedVariant);

    // Check if test is enabled
    const testConfig = (window as unknown as { AB_TESTS?: Record<string, { enabled: boolean }> }).AB_TESTS?.[testName];
    setIsTestEnabled(testConfig?.enabled || false);
  }, [testName, userId]);

  const trackImpression = () => {
    if (isTestEnabled) {
      trackTestImpression(testName, variant);
    }
  };

  const trackConversion = (conversionType: string) => {
    if (isTestEnabled) {
      trackTestConversion(testName, variant, conversionType);
    }
  };

  return {
    variant,
    trackImpression,
    trackConversion,
    isTestEnabled,
  };
}
