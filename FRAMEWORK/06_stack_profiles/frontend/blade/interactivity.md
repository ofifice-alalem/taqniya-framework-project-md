# Blade Interactivity & Livewire 3

# Purpose
Governs real-time reactive components in Blade using Laravel Livewire 3.

---

## 1. Livewire 3 Component Patterns

- **DOM Morphing:** Use `wire:key` on looped items to assist Morphdom diffing during updates:
  ```blade
  @foreach ($users as $user)
      <tr wire:key="user-{{ $user->id }}">
          <td>{{ $user->name }}</td>
      </tr>
  @endforeach
  ```
- **Optimistic State & Loading Indicators:** Use `wire:loading` and `wire:target` for immediate UI response during server calls.
