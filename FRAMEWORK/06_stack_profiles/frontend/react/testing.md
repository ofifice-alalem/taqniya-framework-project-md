# React Testing Standards

# Purpose
Defines testing standards for React components and user flows using Vitest and React Testing Library.

---

## 1. Testing Philosophy

- **Test Behavior, Not Implementation Details:** Query elements using user-facing roles and accessible labels (`getByRole`, `getByLabelText`) rather than CSS classes or component internal state.
- **Mock at Network Level:** Use Mock Service Worker (MSW) or network mocks rather than mocking custom hooks.
