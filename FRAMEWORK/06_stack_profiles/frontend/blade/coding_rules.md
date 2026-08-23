# Blade & Alpine.js Coding Rules

# Purpose
Defines clean coding hygiene, directives, and security standards for Blade templates.

---

## 1. Escaping & Security

- **MUST:** Always use standard `{{ $variable }}` for automatic XSS output escaping.
- **MUST NOT:** Use raw `{!! $unescaped !!}` unless rendering sanitized, validated rich-text HTML.

---

## 2. Alpine.js Client Micro-Reactivity

- **MUST:** Use Alpine.js (`x-data`, `x-show`, `x-on:click`) for ephemeral client-only UI states (e.g., toggling a dropdown, closing an alert):
  ```blade
  <div x-data="{ open: false }" @click.outside="open = false">
      <button @click="open = !open">Options</button>
      <div x-show="open" x-cloak class="bx-dropdown">...</div>
  </div>
  ```
