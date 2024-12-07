"use client";

import { CoverLetter } from "@/components/helpers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIInstructions } from "@/lib/data";
import { extractInterviewData } from "@/lib/helpers";
import { useInterviewSession } from "@/store/useInterviewSession";
import { ResultsType } from "@/types/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FileText, Star, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Question {
  question: string;
  answer: string;
  feedback: string;
  score: number;
}

interface InterviewResults {
  questions: Question[];
  overallScore: number;
  overallFeedback: string;
}

const mockResults: InterviewResults = {
  questions: [
    {
      question: "Tell us about yourself",
      answer: "I am a software engineer with 5 years of experience...",
      feedback: "Good introduction, covered key points clearly and concisely.",
      score: 85,
    },
    {
      question: "What are your strengths?",
      answer: "My key strengths include problem-solving...",
      feedback:
        "Strong examples provided, could elaborate more on specific achievements.",
      score: 75,
    },
    {
      question: "Why do you want to work here?",
      answer: "I'm passionate about the company's mission...",
      feedback: "Showed good research and alignment with company values.",
      score: 90,
    },
  ],
  overallScore: 83,
  overallFeedback:
    "Strong interview performance overall. Demonstrated good communication skills and relevant experience. Areas for improvement include providing more specific examples and quantifiable achievements.",
};


export default function ResultsPage() {
  const [results, setResults] = useState<ResultsType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isClientReady, setIsClientReady] = useState(false);

  const store = useInterviewSession();

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  const API_KEY = process.env.GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: AIInstructions,
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const getResults = async () => {
    try {
      if (!store) return null;
      setIsLoading(true);
      const chatSession = await model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {
                text: "You are an AI interviewer that provides job interview questions based on the provided job description.",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: `Job Description: ${
                  store.information.jobDescription
                } \n\n Questions: ${JSON.stringify(store.questions)}`,
              },
            ],
          },
        ],
      });

      const response = await chatSession.sendMessage(
        `Please evaluate the whole interview session and provide detailed feedback in the json format only, do not include any extra words, json objects will have the fields: question, answer, score, feedback, correctAnswer (optional). and give the overall score in terms of percentage between 0-100. Also give an overall feedback summary in the same json data, just provide the json data and noting else in the response. The answers with respect to the questions are provided in the json format also keep the fieldnames same everytime, overallFeedbackSummary, overallScore, interviewFeedback[{question, answer, feedback, correctAnswer, score}]. ANSWERS: ${JSON.stringify(
          store.answers
        )}`
      );

      const jsonResponse = extractInterviewData(response.response.text());

      setResults(jsonResponse);
    } catch (error) {
      console.error("Error fetching results:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isClientReady || typeof window === "undefined" || !store) return;

    const fetchQuestions = async () => {
      await getResults();
    };

    store && fetchQuestions();
  }, [isClientReady]);

  return (
    <>
      {isLoading ? (
        <div className="container mx-auto p-6 flex justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="container mx-auto p-6 space-y-6">
            {/* Overall Score Section */}
            <Card className="border-green-200">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold">
                  Interview Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                  <span className="text-4xl font-bold">
                    {results && results.overallScore}%
                  </span>
                </div>
                <Progress
                  value={results && results.overallScore}
                  className="w-full h-2"
                />
              </CardContent>
            </Card>

            {/* Overall Feedback Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Overall Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {results && results.overallFeedbackSummary}
                </p>
              </CardContent>
            </Card>

            {/* Detailed Questions Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Detailed Review</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-6">
                    {results &&
                      results.interviewFeedback.map((q, i) => (
                        <div
                          key={i}
                          className="space-y-3 pb-4 border-b last:border-0"
                        >
                          <h3 className="font-semibold text-lg">
                            {q.question}
                          </h3>
                          <div className="pl-4 border-l-2 border-gray-200">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Your Answer:
                            </p>
                            <p className="mt-1">{q.answer}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <ThumbsUp className="w-4 h-4 text-green-500" />
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {q.feedback}
                              </p>
                            </div>
                            <span className="text-sm font-semibold">
                              {q.score}%
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="flex-1 max-w-md" size="lg">
                <FileText className="w-4 h-4 mr-2" />
                Evaluate Resume
              </Button>
              <CoverLetter
                jobDescription={store?.information.jobDescription || ""}
                results={results}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
