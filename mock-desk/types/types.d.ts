export interface JobInformation {
  position: string;
  jobDescription: string;
  techStack: string;
  resume: string;
  clerkId: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
}

export interface Answer {
  questionId: string;
  answer: string;
}

export interface InterviewSession {
  information: JobInformation;
  questions: Question[];
  answers: Answer[];
}

export type UseInterviewSession = InterviewSession & {
  setValues: (values: Partial<InterviewSession>) => void;
};

export interface ResultsType {
  overallScore: number;
  overallFeedbackSummary: string;
  interviewFeedback: {
    question: string;
    answer: string;
    score: number;
    feedback: string;
    correctAnswer?: string;
  }[];
}
