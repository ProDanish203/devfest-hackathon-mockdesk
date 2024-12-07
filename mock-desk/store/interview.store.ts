"use client";
import { UseInterviewSession } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type StateValues = Omit<UseInterviewSession, "setValues">;

const useInterviewSessionStore = create<UseInterviewSession>()(
  persist(
    (set) => ({
      information: {
        position: "",
        jobDescription: "",
        techStack: "",
        resume: "",
        clerkId: "",
      },
      questions: [],
      answers: [],
      setValues: (values: Partial<UseInterviewSession | null>) =>
        set((state) => {
          const newState = { ...state, ...values };

          if (values?.information && typeof window !== "undefined") {
            newState.information = {
              ...state.information,
              ...values.information,
            };
          }

          if (values?.questions && typeof window !== "undefined") {
            newState.questions = values.questions;
          }

          if (values?.answers && typeof window !== "undefined") {
            newState.answers = values.answers;
          }

          return newState;
        }),
    }),
    {
      name: "interview-session-storage",

      storage: {
        getItem: (name) => {
          if (typeof window === "undefined") return null;
          const item =
            typeof window !== "undefined" ? localStorage.getItem(name) : null;
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          if (typeof window !== "undefined") {
            localStorage.setItem(name, JSON.stringify(value));
          }
        },
        removeItem: (name) => {
          if (typeof window !== "undefined") {
            localStorage.removeItem(name);
          }
        },
      },
    }
  )
);

export const getStateValues = (state: UseInterviewSession): StateValues => {
  const { setValues, ...stateValues } = state;
  return stateValues;
};

export default useInterviewSessionStore;
