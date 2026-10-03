export type Language = 'uz' | 'en' | 'ru';

export type SectionType = 
  | 'home' 
  | 'theory' 
  | 'games' 
  | 'cases' 
  | 'test' 
  | 'evaluation' 
  | 'teacher' 
  | 'proverbs' 
  | 'glossary';

export interface StudentProfile {
  id: string;
  name: string;
  grade: string;
  stars: number;
  totalScore: number;
  completedLessons: string[];
  completedGames: string[];
  completedCases: string[];
  badges: string[];
  lastActive: string;
  testAttempts: TestAttempt[];
}

export interface TestAttempt {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: number; // 2, 3, 4, 5
  timeSpentSeconds: number;
  topicBreakdown: Record<string, { correct: number; total: number }>;
}

export type QuestionType = 
  | 'single' 
  | 'multiple' 
  | 'true_false' 
  | 'fill_blank' 
  | 'sentence_tap' 
  | 'match';

export interface Question {
  id: string;
  topic: string; // e.g. 'definition', 'types', 'asliy_nisbiy', 'degrees', 'formation', 'structure', 'syntax'
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  questionUz: string;
  questionEn: string;
  questionRu: string;
  optionsUz?: string[];
  optionsEn?: string[];
  optionsRu?: string[];
  correctAnswer: any; // index, string, array of indices, pairs
  explanationUz: string;
  explanationEn: string;
  explanationRu: string;
  sentenceWords?: string[]; // for sentence_tap
  matchingPairs?: { left: string; right: string }[];
}

export interface QuickQuestion {
  id: string;
  questionUz: string;
  optionsUz: string[];
  correctIdx: number;
  explanationUz: string;
}

export interface TheoryChapter {
  id: string;
  titleUz: string;
  titleEn: string;
  titleRu: string;
  icon: string;
  summaryUz: string;
  summaryEn: string;
  summaryRu: string;
  quickQuestions: QuickQuestion[];
}

export interface CaseStudy {
  id: string;
  titleUz: string;
  titleEn: string;
  titleRu: string;
  roleUz: string;
  roleEn: string;
  roleRu: string;
  storyUz: string;
  taskUz: string;
  type: 'select' | 'open' | 'sort' | 'correction';
  optionsUz?: { id: string; text: string; isCorrect: boolean; feedback: string }[];
  keywordsExpected?: string[];
  sampleAnswerUz?: string;
  interactiveData?: any;
  explanationUz: string;
}

export interface Badge {
  id: string;
  titleUz: string;
  titleEn: string;
  titleRu: string;
  descUz: string;
  descEn: string;
  descRu: string;
  icon: string;
  requirement: string;
}

export interface GlossaryTerm {
  termUz: string;
  termEn: string;
  termRu: string;
  defUz: string;
  defEn: string;
  defRu: string;
  examplesUz: string;
}

export interface ProverbItem {
  id: string;
  text: string;
  adjectives: string[];
  meaningUz: string;
}
