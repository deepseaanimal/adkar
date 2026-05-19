import { DEFAULT_INITIATIVES } from './adkar.js';

const STORAGE_KEY = 'adkar_navigator_v1';

export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return { initiatives: JSON.parse(JSON.stringify(DEFAULT_INITIATIVES)) };
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function createBlankAssessment() {
  return {
    name: '',
    role: '',
    lastUpdated: null,
    awareness: { score: 3, notes: '' },
    desire: { score: 3, notes: '' },
    knowledge: { score: 3, notes: '' },
    ability: { score: 3, notes: '' },
    reinforcement: { score: 3, notes: '' },
  };
}
