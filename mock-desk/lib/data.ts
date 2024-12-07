import { CoinsIcon, HomeIcon, Layers2Icon } from "lucide-react";

export const navLinks = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/about",
    title: "About",
  },
  {
    path: "/services",
    title: "Services",
  },
  {
    path: "/contact",
    title: "Contact",
  },
];

export const dashboardRoutes = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    href: "/dashboard/conduct",
    label: "Conduct",
    icon: Layers2Icon,
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];

export const dummyHistory = [
  {
    title: "Junior Frontend Developer",
    summary:
      "junior frontend developer with 1 year of experience in building web applications using ReactJs, NextJs, and TailwindCss.",
    tags: ["ReactJs", "NextJs", "TailwindCss"],
  },
  {
    title: "Junior Frontend Developer",
    summary:
      "junior frontend developer with 1 year of experience in building web applications using ReactJs, NextJs, and TailwindCss.",
    tags: ["ReactJs", "NextJs", "TailwindCss"],
  },
  {
    title: "Junior Frontend Developer",
    summary:
      "junior frontend developer with 1 year of experience in building web applications using ReactJs, NextJs, and TailwindCss.",
    tags: ["ReactJs", "NextJs", "TailwindCss"],
  },
  {
    title: "Junior Frontend Developer",
    summary:
      "junior frontend developer with 1 year of experience in building web applications using ReactJs, NextJs, and TailwindCss.",
    tags: ["ReactJs", "NextJs", "TailwindCss"],
  },
  {
    title: "Junior Frontend Developer",
    summary:
      "junior frontend developer with 1 year of experience in building web applications using ReactJs, NextJs, and TailwindCss.",
    tags: ["ReactJs", "NextJs", "TailwindCss"],
  },
];

export const sampleQuestions = [
  {
    id: "q1",
    title: "Tell us about yourself",
    description:
      "Give a brief overview of your background, experience, and what brings you here today.",
  },
  {
    id: "q2",
    title: "What are your strengths?",
    description:
      "Describe your key professional strengths and how they relate to this position.",
  },
  {
    id: "q3",
    title: "Why do you want to work here?",
    description:
      "Explain what attracts you to our company and this specific role.",
  },
];

export const AIInstructions =
  "You are MockAI, an AI mock interviewer on the MockDesk platform. Your role is to simulate realistic job interview experiences for users by asking tailored questions relevant to the job role selected. You should act as a professional interviewer, providing a structured, supportive, and dynamic experience based upon provided ob description. always introduce your self in the beiginning of the consecration BASED ON KEYWORD PROVIDED YOU SHOULD ASK ATLEAST 4-5 question and respnse based on required answers wait for candidate response go step bt step be like an hr. also make sure that i dont want any additional texts except the questions, i just need a json array of questions in the object format that will have the title of the question and the question itself relevant to the job description and thats it,no other extra information, make sure you pass me text as json so i can easily parse it.";
