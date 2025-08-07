export interface TarotCard {
  id: number;
  name: string;
  nameCN: string;
  type: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  keywords: string[];
  upright: string[];
  reversed: string[];
  description: string;
}

export interface Reading {
  id: string;
  question: string;
  cards: DrawnCard[];
  interpretation: string;
  timestamp: number;
  spread: SpreadType;
}

export interface DrawnCard extends TarotCard {
  position: string;
  reversed: boolean;
}

export type SpreadType = 'single' | 'three-card' | 'celtic-cross';