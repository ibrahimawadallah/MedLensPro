import { describe, it, expect, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

// Import after mocking localStorage
import {
  loadMyMeds,
  saveMyMeds,
  addMyMed,
  removeMyMed,
  isMyMed,
  pushRecentSearch,
  getRecentSearches,
} from './storage';

describe('Storage functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('loadMyMeds', () => {
    it('returns empty array when no meds saved', () => {
      expect(loadMyMeds()).toEqual([]);
    });

    it('loads saved meds from localStorage', () => {
      const testMeds = [
        {
          setid: 'test1',
          title: 'Test Drug',
          genericName: 'Generic',
          productName: 'Product',
          manufacturer: 'Manufacturer',
          ndc: '12345',
          savedAt: '2024-01-01',
        },
      ];
      localStorage.setItem('medlens.myMeds.v1', JSON.stringify(testMeds));
      expect(loadMyMeds()).toEqual(testMeds);
    });

    it('handles corrupted data gracefully', () => {
      localStorage.setItem('medlens.myMeds.v1', 'invalid json');
      expect(loadMyMeds()).toEqual([]);
    });
  });

  describe('saveMyMeds', () => {
    it('saves meds to localStorage', () => {
      const testMeds = [
        {
          setid: 'test1',
          title: 'Test Drug',
          genericName: 'Generic',
          productName: 'Product',
          manufacturer: 'Manufacturer',
          ndc: '12345',
          savedAt: '2024-01-01',
        },
      ];
      saveMyMeds(testMeds);
      expect(localStorage.getItem('medlens.myMeds.v1')).toBe(JSON.stringify(testMeds));
    });
  });

  describe('addMyMed', () => {
    it('adds a new med to the list', () => {
      const med = {
        setid: 'test1',
        title: 'Test Drug',
        genericName: 'Generic',
        productName: 'Product',
        manufacturer: 'Manufacturer',
        ndc: '12345',
        savedAt: '2024-01-01',
      };
      const result = addMyMed(med);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(med);
    });

    it('removes duplicate meds by setid', () => {
      const med1 = {
        setid: 'test1',
        title: 'Test Drug 1',
        genericName: 'Generic',
        productName: 'Product',
        manufacturer: 'Manufacturer',
        ndc: '12345',
        savedAt: '2024-01-01',
      };
      const med2 = {
        setid: 'test1',
        title: 'Test Drug 2',
        genericName: 'Generic',
        productName: 'Product',
        manufacturer: 'Manufacturer',
        ndc: '12345',
        savedAt: '2024-01-02',
      };
      addMyMed(med1);
      const result = addMyMed(med2);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Test Drug 2');
    });

    it('limits to 200 meds', () => {
      const meds = Array.from({ length: 201 }, (_, i) => ({
        setid: `test${i}`,
        title: `Drug ${i}`,
        genericName: 'Generic',
        productName: 'Product',
        manufacturer: 'Manufacturer',
        ndc: '12345',
        savedAt: '2024-01-01',
      }));
      meds.forEach((med) => addMyMed(med));
      const result = loadMyMeds();
      expect(result).toHaveLength(200);
    });
  });

  describe('removeMyMed', () => {
    it('removes a med by setid', () => {
      const med1 = {
        setid: 'test1',
        title: 'Test Drug 1',
        genericName: 'Generic',
        productName: 'Product',
        manufacturer: 'Manufacturer',
        ndc: '12345',
        savedAt: '2024-01-01',
      };
      const med2 = {
        setid: 'test2',
        title: 'Test Drug 2',
        genericName: 'Generic',
        productName: 'Product',
        manufacturer: 'Manufacturer',
        ndc: '12345',
        savedAt: '2024-01-01',
      };
      addMyMed(med1);
      addMyMed(med2);
      const result = removeMyMed('test1');
      expect(result).toHaveLength(1);
      expect(result[0].setid).toBe('test2');
    });
  });

  describe('isMyMed', () => {
    it('returns true if med is saved', () => {
      const med = {
        setid: 'test1',
        title: 'Test Drug',
        genericName: 'Generic',
        productName: 'Product',
        manufacturer: 'Manufacturer',
        ndc: '12345',
        savedAt: '2024-01-01',
      };
      addMyMed(med);
      expect(isMyMed('test1')).toBe(true);
    });

    it('returns false if med is not saved', () => {
      expect(isMyMed('test1')).toBe(false);
    });
  });

  describe('Recent searches', () => {
    it('saves recent searches', () => {
      pushRecentSearch('aspirin');
      expect(getRecentSearches()).toEqual(['aspirin']);
    });

    it('limits to 8 recent searches', () => {
      for (let i = 0; i < 10; i++) {
        pushRecentSearch(`search${i}`);
      }
      const result = getRecentSearches();
      expect(result).toHaveLength(8);
    });

    it('moves existing search to front', () => {
      pushRecentSearch('aspirin');
      pushRecentSearch('ibuprofen');
      pushRecentSearch('aspirin');
      const result = getRecentSearches();
      expect(result[0]).toBe('aspirin');
      expect(result[1]).toBe('ibuprofen');
    });

    it('removes duplicates', () => {
      pushRecentSearch('aspirin');
      pushRecentSearch('aspirin');
      const result = getRecentSearches();
      expect(result).toHaveLength(1);
    });
  });
});
