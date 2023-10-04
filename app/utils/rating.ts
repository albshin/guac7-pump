import { qualifierBaseRating, qualifierTotalNotes } from './qualifierSongs';

export interface ScoreBreakdown {
  perfect: number;
  great: number;
  good: number;
  bad: number;
  miss: number;
  maxCombo: number;
}

export interface SongInfo {
  version: string;
  name: string;
  score: number;
  breakdown: ScoreBreakdown;
}

const scoreWeightXX = {
  perfect: 1.0,
  great: 0.6,
  good: 0.2,
  bad: 0.1,
  miss: 0,
} as const;

const multiplierPerGrade = {
  F: 0,
  AA: 1,
  'AA+': 1.05,
  AAA: 1.1,
  'AAA+': 1.15,
  S: 1.2,
  'S+': 1.26,
  SS: 1.32,
  'SS+': 1.38,
  SSS: 1.44,
  'SSS+': 1.5,
} as const;

export const calculateScore = (info: SongInfo) => {
  if (info?.score) return info.score;
  // XX
  const noteWeights =
    Object.entries(info.breakdown).reduce((acc, [judge, val]) => {
      // Skip maxCombo
      if (judge === 'maxCombo') return acc;
      return acc + scoreWeightXX[judge as keyof typeof scoreWeightXX] * val;
    }, 0) * 0.995;
  const comboPoints = 0.005 * info.breakdown.maxCombo;
  const totalNotes =
    qualifierTotalNotes[info.name as keyof typeof qualifierTotalNotes];
  const score = ((noteWeights + comboPoints) / totalNotes) * 1000000;
  return Math.round(score);
};

export const calculateLetterGrade = (score: number) => {
  if (score >= 995_000) {
    return 'SSS+';
  } else if (score >= 990_000) {
    return 'SSS';
  } else if (score >= 985_000) {
    return 'SS+';
  } else if (score >= 980_000) {
    return 'SS';
  } else if (score >= 975_000) {
    return 'S+';
  } else if (score >= 970_000) {
    return 'S';
  } else if (score >= 960_000) {
    return 'AAA+';
  } else if (score >= 950_000) {
    return 'AAA';
  } else if (score >= 925_000) {
    return 'AA+';
  } else if (score >= 900_000) {
    return 'AA';
  }
  return 'F';
};

export const calculateRating = (info: SongInfo) => {
  const score = calculateScore(info);
  const baseRating =
    qualifierBaseRating[info.name as keyof typeof qualifierBaseRating];
  const letterGrade = calculateLetterGrade(score);
  const multiplier = multiplierPerGrade[letterGrade];
  const rating = baseRating * multiplier;
  return Math.round(rating);
};
