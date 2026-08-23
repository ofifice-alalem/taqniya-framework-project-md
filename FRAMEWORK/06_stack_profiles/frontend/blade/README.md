# Laravel Blade Technology Profile

# Purpose
This profile defines implementation patterns, component design, and progressive enhancement practices for **Laravel Blade (Livewire 3 / Alpine.js)** applications under the Taqniya Framework.

---

## 1. Supported Ecosystem & Defaults

- **Server Rendering:** Laravel Blade Component Engine (`<x-ui.button>`)
- **SPA Navigation & Reactivity:** `Laravel Livewire 3` with `wire:navigate`
- **Client Micro-Interactions:** `Alpine.js`
- **Real-Time WebSockets:** `Laravel Reverb` + `Laravel Echo`
- **Bundling & Assets:** `Vite` (Laravel Vite Plugin)
- **Styling:** Tailwind CSS + Taqniya CSS Tokens

---

## 2. Profile Documents

- [`architecture.md`](architecture.md): Blade component hierarchy, view folders, and layouts.
- [`coding_rules.md`](coding_rules.md): Blade directives, component props, and slot hygiene.
- [`interactivity.md`](interactivity.md): Livewire 3 components, Alpine.js states, and DOM morphing.
- [`performance.md`](performance.md): `wire:navigate`, asset prefetching, and progressive enhancement.
