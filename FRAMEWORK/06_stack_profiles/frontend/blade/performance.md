# Blade & Livewire Performance

# Purpose
Defines performance optimizations and SPA navigation for Blade applications.

---

## 1. SPA Navigation with `wire:navigate`

- **MUST:** Add `wire:navigate` to internal navigation links to enable fast, single-page application page swaps without full browser reloads:
  ```blade
  <a href="/dashboard" wire:navigate class="bx-nav-link">Dashboard</a>
  ```

---

## 2. Prefetching on Hover

- **SHOULD:** Use `wire:navigate.hover` for links with high user click probability to prefetch page assets in the background.
