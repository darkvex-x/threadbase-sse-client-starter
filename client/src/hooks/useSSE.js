// hooks/useSSE.js
import { useEffect } from "react";
import { useAuth } from "../auth/AuthContext.jsx";

export function useSSE(url, onMessage) {
  const { user } = useAuth();

  useEffect(() => {
    // 2.a. NULL GUARD — if there is no user, return early
    if (!user) {
      return;
    }

    // 2.b. Create EventSource
    const source = new EventSource(url, { withCredentials: true });

    // 2.c. Handle onmessage
    source.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        onMessage(parsed);
      } catch (err) {
        console.error("Failed to parse SSE event data:", err);
      }
    };

    // 2.d. Handle onerror
    source.onerror = (err) => {
      console.error("SSE connection error:", err);
    };

    // 2.e. Cleanup
    return () => {
      source.close();
    };
  }, [url, user, onMessage]);
}
