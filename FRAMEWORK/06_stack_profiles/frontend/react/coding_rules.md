# React Coding Rules & Hook Invariants

# Purpose
Defines TypeScript standards, Hook rules, and clean coding hygiene for React.

---

## 1. Strict Hooks Invariants

- **MUST:** Obey the Rules of Hooks: Never call Hooks inside loops, conditions, or nested functions.
- **MUST:** Exhaustively declare all dependencies in `useEffect`, `useCallback`, and `useMemo` dependency arrays.
- **MUST (Cleanup):** Always return a cleanup function in `useEffect` for event listeners, timers, and WebSocket subscriptions:
  ```tsx
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  ```

---

## 2. Strong Typing with TypeScript

- **MUST:** Explicitly type component Props using interfaces or types:
  ```tsx
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
  }
  ```
- **MUST NOT:** Use `any` for event handlers; use standard React event types (e.g., `React.ChangeEvent<HTMLInputElement>`).
