# AI Development Rules

This document outlines the technical stack and provides rules for the AI assistant to follow when developing this application. The goal is to maintain code quality, consistency, and simplicity.

## Tech Stack

This project is built with a modern, type-safe, and efficient stack:

-   **Framework**: React with TypeScript for building a type-safe user interface.
-   **Build Tool**: Vite for fast development and optimized builds.
-   **Styling**: Tailwind CSS for utility-first styling.
-   **UI Components**: shadcn/ui, a collection of beautifully designed, accessible, and customizable components built on top of Radix UI and Tailwind CSS.
-   **Routing**: React Router for all client-side navigation and routing logic.
-   **Icons**: Lucide React for a comprehensive and consistent set of icons.
-   **Server State**: TanStack Query (React Query) for fetching, caching, and managing server state.
-   **Forms**: React Hook Form for performant form state management and Zod for schema-based validation.
-   **Notifications**: Sonner and the default shadcn/ui Toaster for displaying non-intrusive notifications.

## Library Usage Rules

To ensure consistency, please adhere to the following rules:

1.  **UI Components**:
    -   **ALWAYS** use components from the `shadcn/ui` library (`@/components/ui/...`) when a suitable component exists (e.g., `Button`, `Card`, `Input`, `Dialog`).
    -   Do not create custom components that replicate the functionality of existing `shadcn/ui` components.
    -   New, custom components should be created for specific application logic and placed in `src/components/`.

2.  **Styling**:
    -   **ALWAYS** use Tailwind CSS utility classes for styling.
    -   Use the `cn` utility function from `@/lib/utils.ts` to conditionally apply or merge Tailwind classes.
    -   Avoid writing custom CSS in `.css` files. The existing `index.css` is for global styles and theme variables only.
    -   Do not use inline `style` attributes unless for dynamic values that cannot be handled by Tailwind classes (e.g., animation delays).

3.  **Routing**:
    -   All routes **MUST** be defined in `src/App.tsx`.
    -   Use the `<NavLink>` or `<Link>` components from `react-router-dom` for internal navigation. Do not use standard `<a>` tags for client-side routes.

4.  **Icons**:
    -   **ALWAYS** use icons from the `lucide-react` library. This ensures visual consistency.

5.  **State Management**:
    -   For server state (API data), **ALWAYS** use `@tanstack/react-query`.
    -   For local component state, use React's built-in hooks (`useState`, `useReducer`).
    -   Do not introduce global state management libraries (like Redux or Zustand) without explicit instruction.

6.  **Forms**:
    -   For all forms, **ALWAYS** use `react-hook-form` for state management and `zod` for validation.

7.  **File Structure**:
    -   **Pages**: Place page-level components in `src/pages/`.
    -   **Reusable Components**: Place general-purpose components in `src/components/`.
    -   **Layout Components**: Place layout-specific components (e.g., `Header`) in `src/components/layout/`.
    -   **Custom Hooks**: Place custom hooks in `src/hooks/`.
    -   **Utilities**: Place utility functions in `src/lib/`.