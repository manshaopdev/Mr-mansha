import { Lesson } from '../types/typing';

export const LESSONS_DATA: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Lesson 1: Home Row Anchors (F & J)',
    category: 'home-row',
    keysIntroduced: ['f', 'j', ' '],
    targetWpm: 20,
    fingerFocus: 'Left index on F, Right index on J, Thumbs on Space',
    instruction: 'Feel the small tactile bumps on your F and J keys. Keep your hands resting gently here as home base.',
    text: 'f j f j ff jj fff jjj fj fj jf jf ff jj fj jf f j f j ff jj'
  },
  {
    id: 'lesson-2',
    title: 'Lesson 2: Home Row Extension (D & K)',
    category: 'home-row',
    keysIntroduced: ['d', 'k'],
    targetWpm: 22,
    fingerFocus: 'Left middle finger on D, Right middle finger on K',
    instruction: 'Keep your index fingers on F and J while your middle fingers strike D and K.',
    text: 'd k d k dk kd f d j k ff dd jj kk fd jk dk fjdk djfk dk dk'
  },
  {
    id: 'lesson-3',
    title: 'Lesson 3: Complete Home Row (A, S, L, ;)',
    category: 'home-row',
    keysIntroduced: ['a', 's', 'l', ';'],
    targetWpm: 25,
    fingerFocus: 'Left pinky A, Left ring S, Right ring L, Right pinky ;',
    instruction: 'You now command the complete Home Row. All touch typing starts and returns here.',
    text: 'a s d f j k l ; asdf jkl; a s d f j k l ; flask falls lads salads alfalfa dad fall ask'
  },
  {
    id: 'lesson-4',
    title: 'Lesson 4: Top Row Vowels (E & I)',
    category: 'top-row',
    keysIntroduced: ['e', 'i'],
    targetWpm: 28,
    fingerFocus: 'Reach UP with Left middle finger to E, Right middle finger to I',
    instruction: 'E is the most common letter in English. Return your fingers to the home row after each strike.',
    text: 'd e d k i k de ki fee see kid lie like life silk leaf dies feeds likes flies file kid'
  },
  {
    id: 'lesson-5',
    title: 'Lesson 5: Top Row Extension (R, U, T, Y)',
    category: 'top-row',
    keysIntroduced: ['r', 'u', 't', 'y'],
    targetWpm: 30,
    fingerFocus: 'Left index reaches R and T, Right index reaches U and Y',
    instruction: 'Practice rhythmic strikes without looking down at your hands.',
    text: 'f r f j u j f t f j y j try true fury rust duty trail fluid fruit dirty yield utility'
  },
  {
    id: 'lesson-6',
    title: 'Lesson 6: Bottom Row (C, M, V, N)',
    category: 'bottom-row',
    keysIntroduced: ['c', 'm', 'v', 'n'],
    targetWpm: 30,
    fingerFocus: 'Left middle down to C, Left index down to V, Right index down to N & M',
    instruction: 'Curl your fingers slightly to drop down to the bottom row, then snap back to home row.',
    text: 'd c d f v f j n j j m j calm cave vine name mine move vain view climb dynamic frame'
  },
  {
    id: 'lesson-7',
    title: 'Lesson 7: Full Alphabet Mastery',
    category: 'bottom-row',
    keysIntroduced: ['z', 'x', 'b', 'q', 'p', 'w', 'o'],
    targetWpm: 35,
    fingerFocus: 'Coordination across all three rows',
    instruction: 'The quick brown fox jumps over the lazy dog. Type smoothly without pausing.',
    text: 'the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs'
  },
  {
    id: 'lesson-8',
    title: 'Lesson 8: Numbers & Punctuation',
    category: 'numbers',
    keysIntroduced: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', ',', '!', '?'],
    targetWpm: 30,
    fingerFocus: 'Reach up to number row while maintaining home row awareness',
    instruction: 'Accuracy is far more important than raw speed when typing numbers and symbols.',
    text: 'order 124 units at $59 each, total: $7,316. flight 802 departs at 09:45 AM from gate 3.'
  },
  {
    id: 'lesson-9',
    title: 'Lesson 9: Code Syntax (JavaScript & Python)',
    category: 'code',
    keysIntroduced: ['{', '}', '(', ')', ';', '=', '>', '<', '"'],
    targetWpm: 32,
    fingerFocus: 'Programmer speed drill with brackets, semicolons and arrows',
    instruction: 'Practice real-world code constructs used by professional developers.',
    text: 'const speed = (chars, seconds) => Math.round((chars / 5) / (seconds / 60));'
  }
];
