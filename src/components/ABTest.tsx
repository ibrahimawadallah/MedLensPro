/**
 * ABTest Component
 * Wraps content to show different variants based on A/B test assignment
 *
 * Usage:
 * <ABTest testName="hero_cta_button" userId={user?.id}>
 *   <ABTest.Variant variant="A">
 *     <Button>Search medications</Button>
 *   </ABTest.Variant>
 *   <ABTest.Variant variant="B">
 *     <Button variant="primary" size="large">Start Searching Now</Button>
 *   </ABTest.Variant>
 *   <ABTest.Variant variant="C">
 *     <Button icon={<SearchIcon />}>Find Your Medicine</Button>
 *   </ABTest.Variant>
 *   <ABTest.Variant variant="D">
 *     <Button>Try It Free</Button>
 *   </ABTest.Variant>
 * </ABTest>
 */

'use client';

import { useEffect, useState } from 'react';
import { getVariant, Variant } from '@/lib/ab-testing';

interface ABTestProps {
  testName: string;
  userId?: string;
  children: React.ReactNode;
  trackImpression?: boolean;
}

interface VariantProps {
  variant: Variant;
  children: React.ReactNode;
}

export function ABTest({ testName, userId, children, trackImpression = true }: ABTestProps) {
  const [assignedVariant, setAssignedVariant] = useState<Variant>('A');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setAssignedVariant(getVariant(testName, userId));
    setIsMounted(true);

    if (trackImpression) {
      // Track impression after component mounts
      setTimeout(() => {
        const variant = getVariant(testName, userId);
        // Only track if we have analytics available
        if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'ab_test_impression', {
            test_name: testName,
            variant,
          });
        }
      }, 100);
    }
  }, [testName, userId, trackImpression]);

  if (!isMounted) {
    // Return nothing during SSR to prevent hydration mismatch
    return null;
  }

  // Find the matching variant child
  const childrenArray = Array.isArray(children) ? children : [children];
  const matchingChild = childrenArray.find(
    (child: { type?: typeof VariantComponent; props?: { variant?: Variant } }) =>
      child?.type === VariantComponent && child.props?.variant === assignedVariant
  );

  return matchingChild || null;
}

function VariantComponent({ children }: VariantProps) {
  return <>{children}</>;
}

ABTest.Variant = VariantComponent;
