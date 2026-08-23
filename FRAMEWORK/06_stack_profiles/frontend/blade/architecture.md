# Blade Architecture & Component Structure

# Purpose
Defines directory organization, layouts, and component patterns for Laravel Blade applications.

---

## 1. Directory Structure

```text
resources/views/
├── components/                # Modular Blade components
│   ├── ui/                    # Reusable atomic UI (button.blade.php, card.blade.php, modal.blade.php)
│   ├── forms/                 # Form components (input.blade.php, select.blade.php)
│   └── layouts/               # Layout components (app.blade.php, guest.blade.php)
├── livewire/                  # Livewire full-page and inline components
├── pages/                     # Standard view templates
```

---

## 2. Component Design & Attributes

- **MUST:** Support attribute merging on root elements in Blade components:
  ```blade
  @props(['variant' => 'primary', 'size' => 'md'])
  <button {{ $attributes->merge(['class' => 'bx-btn bx-btn-' . $variant]) }}>
      {{ $slot }}
  </button>
  ```
