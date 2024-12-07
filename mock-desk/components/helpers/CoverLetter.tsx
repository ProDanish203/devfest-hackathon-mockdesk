"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIInstructions } from "@/lib/data";
import { ResultsType } from "@/types/types";

export const CoverLetter = ({
  jobDescription,
  results,
}: {
  jobDescription: string | null;
  results: ResultsType | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);

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

  const generateCoverLetter = async () => {
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
          {
            role: "model",
            parts: [
              {
                text: `Job Description: ${jobDescription}`,
              },
            ],
          },
        ],
      });

      const response = await chatSession.sendMessage(
        `Please create a cover letter for the provided job description, also i am providing you the interview results and score, so make the cover letter in plain text, do notprovide any additional text, just provide the text for cover letter and nothing else, provide the answer in text form only, and do not hallucinate, INTERVIEW_RESULTS: ${JSON.stringify(
          results
        )}`
      );

      const coverLetter = response.response.text();
      setCoverLetter(coverLetter);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!jobDescription || !results) return;
    const fetchData = async () => {
      await generateCoverLetter();
    };

    fetchData();
  }, [jobDescription, results]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex-1 max-w-md w-full" variant="outline" size="lg">
          <Download className="w-4 h-4 mr-2" />
          Create Cover Letter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cover Letter</DialogTitle>
          <div className="min-h-[150px] w-full max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="center">
                <div className="loader"></div>
              </div>
            ) : (
              <div>
                {coverLetter ? (
                  <div className="p-4 bg-gray-100 rounded-lg">
                    {coverLetter}
                  </div>
                ) : (
                  <div className="p-4 bg-gray-100 rounded-lg">
                    Something went wrong. Please try again.
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
