export interface Question {
  id: string;
  prompt: string;
  type: 'multiple_choice' | 'code_fill' | 'true_false';
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  passingScorePercent: number;
  questions: Question[];
}

export interface AssignmentRubricItem {
  criterion: string;
  points: number;
  description: string;
}

export interface Assignment {
  id: string;
  title: string;
  descriptionMarkdown: string;
  starterCode?: string;
  solutionCode?: string;
  rubric: AssignmentRubricItem[];
  maxScore: number;
}

export interface PracticalExercise {
  id: string;
  title: string;
  instruction: string;
  starterCode: string;
  expectedOutput: string;
  hint: string;
}

export interface LessonResource {
  title: string;
  type: 'pdf' | 'doc' | 'dataset' | 'notebook' | 'github';
  url: string;
  sizeBytes?: number;
}

export interface Lesson {
  id: string;
  slug: string;
  sequenceOrder: number;
  title: string;
  type: 'concept' | 'code' | 'video' | 'interactive';
  durationMinutes: number;
  contentMarkdown: string;
  codeSnippet?: string;
  codeLanguage?: string;
  videoUrl?: string;
  transcript?: string;
  practicalExercise?: PracticalExercise;
  knowledgeCheck?: Question;
  resources?: LessonResource[];
}

export interface Module {
  id: string;
  slug: string;
  sequenceOrder: number;
  title: string;
  description: string;
  durationMinutes: number;
  lessons: Lesson[];
  quiz?: Quiz;
  assignment?: Assignment;
}

export interface Course {
  id: string;
  slug: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  tagline: string;
  overview: string;
  objectives: string[];
  prerequisites: string[];
  estimatedHours: number;
  modulesCount: number;
  lessonsCount: number;
  rating: number;
  published: boolean;
  completionCriteria: string;
  realWorldProject: {
    title: string;
    description: string;
    deliverables: string[];
    rubric: AssignmentRubricItem[];
  };
  references: {
    title: string;
    author: string;
    year: number;
    url?: string;
  }[];
  modules: Module[];
}

export interface LearningPath {
  id: string;
  slug: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  tagline: string;
  description: string;
  targetAudience: string;
  competencies: string[];
  estimatedWeeks: number;
  courseSlugs: string[];
}

