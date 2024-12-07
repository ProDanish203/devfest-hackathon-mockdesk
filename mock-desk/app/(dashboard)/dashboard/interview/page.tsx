"use client";
import { useState, useEffect } from "react";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractJSON } from "@/lib/helpers";
import { useInterviewSession } from "@/store/useInterviewSession";
import VoiceRecorder from "@/components/helpers/VoiceRecorder";
import { AIInstructions } from "@/lib/data";

interface Question {
  id: string;
  title: string;
  question: string;
}

const InterviewPage = () => {
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isClientReady, setIsClientReady] = useState(false);
  const store = useInterviewSession();

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  useEffect(() => {
    if (!isClientReady) return;

    const fetchQuestions = async () => {
      await getQuestions();
      if (questions.length > 0) {
        setCurrentQuestion(questions[0].id);
      }
    };

    store && fetchQuestions();
  }, [isClientReady]);

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

  if (isClientReady && store && !store.information.position) {
    toast.error("Something went wrong. Please try again.");
    router.push("/dashboard/conduct");
  }

  const getQuestions = async () => {
    if (!store) return null;
    // Fetch the api
    try {
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
        ],
      });

      const response = await chatSession.sendMessage(
        `Please provide interview questions for the following job description: \n\n${store.information.jobDescription}`
      );

      const jsonResponse = extractJSON(response.response.text());
      const questionsWithIds = jsonResponse.map((question: any) => ({
        ...question,
        id: uuidv4(),
      }));

      console.log(questionsWithIds);
      setQuestions(questionsWithIds);
      // Set the questions in the store
      store.setValues({
        ...store,
        questions: questionsWithIds,
      });
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveAnswer = (questionId: string, answer: string) => {
    if (!store) return null;
    // Save the answer in the store
    store.setValues({
      ...store,
      answers: [...store.answers, { questionId, answer }],
    });
  };

  const setCurrentQuestion = (questionId: string) => {
    setCurrentQuestionIndex(questions.findIndex((q) => q.id === questionId));
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex].id);
    }
  };

  const handleRecordStop = (transcript: string) => {
    saveAnswer(questions[currentQuestionIndex].id, transcript);
    moveToNextQuestion();
  };

  const endInterview = () => {
    router.push("/dashboard/results");
  };

  const checkAttemptedQuestion = (questionId: string) => {
    if (!store) return false;
    return store.answers.some((answer) => answer.questionId === questionId);
  };

  if (!isClientReady) {
    return null;
  }

  return (
    <div className="flex max-md:flex-col-reverse min-h-[90vh] bg-background">
      {/* Questions Panel */}
      <div className="w-full md:w-2/4 border-r p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Interview Questions</h2>
        {isLoading ? (
          <div className="mt-10 flex items-center w-[50%] justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          questions &&
          questions.length > 0 && (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={questions[currentQuestionIndex].id}
            >
              {questions &&
                questions.length > 0 &&
                questions.map((question) => (
                  <AccordionItem
                    disabled={checkAttemptedQuestion(question.id)}
                    key={question.id}
                    value={question.id}
                  >
                    <AccordionTrigger
                      className={
                        questions[currentQuestionIndex].id === question.id ||
                        checkAttemptedQuestion(question.id)
                          ? "text-primary"
                          : ""
                      }
                      // onClick={() => setCurrentQuestion(question.id)}
                    >
                      {question.title}
                    </AccordionTrigger>
                    <AccordionContent>{question.question}</AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          )
        )}
      </div>

      {/* Interview Panel */}
      <div className="bg-white sticky top-0 flex-1 md:p-4 py-4 px-2 flex flex-col max-h-[80vh]">
        {/* Webcam View */}
        <div className="flex-1 bg-muted rounded-lg overflow-hidden mb-4 relative">
          {/* <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          /> */}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          {questions && questions.length > 0 && (
            <VoiceRecorder
              onStop={handleRecordStop}
              questionId={questions[currentQuestionIndex].id}
            />
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <Button
              variant="default"
              size="sm"
              onClick={endInterview}
              className="flex items-center gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              End Interview
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
