# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js application using the Pages Router, TypeScript, and Tailwind CSS v4. The project appears to be an ALX frontend development learning project focused on routing and component architecture.

## Common Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint
```

### Testing
No test framework is currently configured in this project.

## Project Architecture

### Routing Pattern
This project uses **Next.js Pages Router** (not App Router). All routes are file-based in the `pages/` directory:
- `pages/index.tsx` - Home page with navigation buttons
- `pages/_app.tsx` - App-level wrapper (imports global styles)
- `pages/_document.tsx` - Custom document structure
- `pages/404.tsx` - Custom 404 page
- `pages/api/` - API routes

**Important**: When adding new pages, create files directly in `pages/` directory (e.g., `pages/about.tsx` → `/about` route). For nested routes, use directories (e.g., `pages/blog/[id].tsx`).

### Component Organization

```
components/
├── common/          # Reusable UI components (Button, etc.)
└── layouts/         # Layout components (Header, Footer, Layout)
```

- **Common components**: Shared UI elements like `Button` that are used across multiple pages
- **Layout components**: `Layout` component wraps pages with `Header` and `Footer`. Use when you need consistent page structure.

### Type Definitions

All TypeScript interfaces are centralized in `interface/index.tsx` (not a typical `.ts` file):
- `PageRouteProps` - For page routing parameters
- `LayoutProps` - For layout component children
- `ButtonProps` - For button component properties

**When adding new types**: Add them to `interface/index.tsx` and export them for use throughout the app.

### Path Aliases

The project uses `@/*` as a path alias pointing to the root directory:
```typescript
import Button from "@/components/common/Button";
import { PageRouteProps } from "@/interface";
```

Always use `@/` imports rather than relative paths (e.g., `../../`) for cleaner, more maintainable code.

### Styling

- **Framework**: Tailwind CSS v4 (using PostCSS plugin)
- **Global styles**: `styles/globals.css` (imported in `_app.tsx`)
- **Approach**: Utility-first with inline Tailwind classes

**Note**: The Button component has dynamic color classes that may not work as expected with Tailwind's purging. Tailwind needs full class names at build time. The current pattern:
```typescript
className={`${backgroundColorClass} hover:${backgroundColorClass}/50`}
```
should use safelist or complete class names like `hover:bg-blue-500/50` instead of template interpolation for hover states.

### Routing Approach

The app uses **imperative routing** with `useRouter`:
```typescript
const router = useRouter();
router.push(pageRoute, undefined, { shallow: false });
```

Pages referenced in the home page (but not yet created):
- `/generate-text-ai`
- `/text-to-image`
- `/counter-app`

## Configuration

- **TypeScript**: Strict mode enabled, target ES2017
- **ESLint**: Uses Next.js config with TypeScript support
- **Next.js**: React Strict Mode enabled
- **React version**: 19.2.0 (latest)

## Development Notes

### Adding New Pages
1. Create `.tsx` file in `pages/` directory
2. Import and use `Layout` component if you need Header/Footer
3. Add route button to home page if needed for navigation

### Creating New Components
1. Place in `components/common/` (UI elements) or `components/layouts/` (layout pieces)
2. Define props interface in `interface/index.tsx`
3. Import component using `@/` path alias
4. Use TypeScript for props typing

### Working with Tailwind
- Use Tailwind v4 syntax (newer PostCSS-based version)
- Avoid dynamic class construction with template literals for pseudo-states
- For dynamic colors, use complete class names or safelist configuration
