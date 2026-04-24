/**
 * ABTestConfig Component
 * Injects AB test configurations into window object for client-side access
 */

'use client';

import { useEffect } from 'react';
import { TESTS } from '@/lib/ab-testing';

export function ABTestConfig() {
  useEffect(() => {
    // Inject test configurations into window object
    if (typeof window !== 'undefined') {
      (window as unknown as { AB_TESTS?: typeof TESTS }).AB_TESTS = TESTS;
    }
  }, []);

  return null;
}
