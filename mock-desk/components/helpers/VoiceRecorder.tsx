"use client";

import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileToBase64, getRandomApiKey } from "@/lib/helpers";

interface VoiceRecorderProps {
  onStop: (transcript: string) => void;
  questionId: string;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onStop,
  questionId,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const API_KEY = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are an speech to text AI that provides the transcript of the provided audio in text format.",
  });

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      const chunks: Blob[] = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        setAudioChunks([]); // Reset for the next recording
        const transcript = await convertToText(audioBlob);
        if (transcript) {
          onStop(transcript);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.log("Error accessing microphone:", error);
      toast.error(
        "Microphone access denied or not supported. Please check your browser settings."
      );
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      mediaRecorder.stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
    }
  };

  const convertToMp3 = async (audioBlob: Blob): Promise<File> => {
    const audioBuffer = await audioBlob.arrayBuffer();
    return new File([audioBuffer], "audio.mp3", { type: "audio/mp3" });
  };

  const convertToText = async (audioBlob: Blob): Promise<string | null> => {
    setIsConverting(true);
    try {
      const audioFile = await convertToMp3(audioBlob);
      const formData = new FormData();
      formData.append("file", audioFile);

      const apikeys = [
        process.env.RAPID_API_KEY1!,
        process.env.RAPID_API_KEY_2!,
        process.env.RAPID_API_KEY_3!,
        process.env.RAPID_API_KEY_4!,
        process.env.RAPID_API_KEY_5!,
        process.env.RAPID_API_KEY_6!,
        process.env.RAPID_API_KEY_7!,
      ];

      const key = getRandomApiKey(apikeys);

      const options = {
        method: "POST",
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": process.env.RAPID_API_HOST!,
        },
        body: formData,
      };
      const url =
        "https://whisper-speech-to-text1.p.rapidapi.com/speech-to-text";

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to process audio");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error("Failed to process audio");
      }
      return data.text;
    } catch (error) {
      console.log("Error converting audio to text:", error);
      toast.error("Failed to process audio. Please try again.");
      return null;
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        size="lg"
        variant={isRecording ? "destructive" : "default"}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className="flex items-center gap-2"
        disabled={isConverting}
      >
        {isRecording ? (
          <>
            <MicOff className="h-5 w-5" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="h-5 w-5" />
            Start Recording
          </>
        )}
      </Button>
    </div>
  );
};

export default VoiceRecorder;
