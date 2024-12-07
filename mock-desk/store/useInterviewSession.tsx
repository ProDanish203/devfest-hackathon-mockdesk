import { useEffect, useState } from "react";
import useInterviewSessionStore from "./interview.store";

export function useInterviewSession() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const store = useInterviewSessionStore();

  return isLoaded ? store : null;
}
