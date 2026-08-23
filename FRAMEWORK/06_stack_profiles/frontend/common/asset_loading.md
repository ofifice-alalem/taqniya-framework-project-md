# Asset Optimization, Image Loading & Production Builds

# Purpose
This document establishes standards for asset delivery, image optimization, tree-shaking, and production bundle hygiene.

---

## 1. Image Optimization & Lazy Loading

- **MUST:** All content images located outside the initial viewport MUST use native lazy loading (`loading="lazy"`).
- **MUST:** Specify explicit `width` and `height` (or aspect-ratio styles) on image containers to eliminate layout shifts.
- **SHOULD:** Serve modern, highly compressed image formats (`WebP`, `AVIF`) where supported.

---

## 2. Tree Shaking & Dead Code Elimination

- **MUST:** Use named ES module imports (e.g., `import { format } from 'date-fns'`, `import { UserIcon } from 'lucide-react'`) instead of importing entire library barrels (`import * as Icons from 'lucide'`).
- **MUST NOT:** Introduce bloated dependencies for trivial operations easily accomplished via native JavaScript APIs.

---

## 3. Production Build & Tooling

- **MUST:** Ensure production builds enable minification, dead code elimination, CSS purging, and content-hash asset versioning (`app.[hash].js`).
