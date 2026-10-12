// components/AppShell.jsx
import { useCallback } from "react";
import NavBar from "./NavBar.jsx";
import { useSSE } from "../hooks/useSSE.js";
import { useNotifications } from "../context/NotificationContext.jsx";

export default function AppShell({ children }) {
  // 1. Pull dispatch from useNotifications
  const { dispatch } = useNotifications();

  // 2. Create stable callback using useCallback
  const handleMessage = useCallback(
    (data) => dispatch({ type: "ADD_NOTIFICATION", payload: data }),
    [dispatch]
  );

  // 3. Connect to SSE stream
  useSSE("/api/notifications/stream", handleMessage);

  return (
    <div>
      <NavBar />
      <main style={{ padding: "1.5rem" }}>
        {children}
      </main>
    </div>
  );
}
