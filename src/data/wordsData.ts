export const COMMON_WORDS = [
  'the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it', 'that', 'for', 'they', 'with', 'as', 'not',
  'on', 'she', 'at', 'by', 'this', 'we', 'you', 'do', 'but', 'his', 'from', 'they', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about',
  'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
  'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
  'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our',
  'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'world', 'life', 'system', 'program', 'code', 'master', 'focus', 'speed', 'accuracy', 'keyboard', 'screen',
  'practice', 'finger', 'rhythm', 'growth', 'flow', 'create', 'build', 'power', 'future', 'learn', 'stream',
  'energy', 'simple', 'clean', 'light', 'water', 'dream', 'motion', 'swift', 'sharp', 'vision', 'mind', 'effort'
];

export const FAMOUS_QUOTES = [
  {
    author: 'Steve Jobs',
    text: 'The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle.'
  },
  {
    author: 'Alan Kay',
    text: 'The best way to predict the future is to invent it.'
  },
  {
    author: 'Linus Torvalds',
    text: 'Talk is cheap. Show me the code.'
  },
  {
    author: 'Albert Einstein',
    text: 'Creativity is intelligence having fun. Imagination is more important than knowledge.'
  },
  {
    author: 'Marcus Aurelius',
    text: 'You have power over your mind - not outside events. Realize this, and you will find strength.'
  },
  {
    author: 'Martin Fowler',
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'
  },
  {
    author: 'Grace Hopper',
    text: 'The most dangerous phrase in the language is: We\'ve always done it this way.'
  }
];

export const CODE_SNIPPETS = [
  {
    language: 'JavaScript',
    text: 'function calculateWPM(correctChars, elapsedMinutes) {\n  const standardWords = correctChars / 5;\n  return Math.round(standardWords / elapsedMinutes);\n}'
  },
  {
    language: 'Python',
    text: 'def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    return [x for x in arr if x < pivot] + [x for x in arr if x == pivot] + [x for x in arr if x > pivot]'
  },
  {
    language: 'TypeScript',
    text: 'interface KeystrokeEvent {\n  key: string;\n  timestamp: number;\n  isCorrect: boolean;\n  wpmSnapshot: number;\n}'
  },
  {
    language: 'React',
    text: 'export const TypingTrainer = () => {\n  const [wpm, setWpm] = useState(0);\n  const [accuracy, setAccuracy] = useState(100);\n  return <SpeedMeter value={wpm} />;\n};'
  }
];

/**
 * Generate a randomized string of words for typing test
 */
export function generateWords(count: number): string {
  const selected: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * COMMON_WORDS.length);
    selected.push(COMMON_WORDS[randomIndex]);
  }
  return selected.join(' ');
}
