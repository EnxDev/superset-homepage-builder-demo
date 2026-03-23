# AGENTS.md — Superset Homepage Builder Demo

## Project Overview

A drag-and-drop homepage builder for Apache Superset, built as a React SPA with Vite. Users can compose customizable widget layouts (dashboards, charts, KPIs, announcements, etc.) with dark/light theme support and localStorage persistence.

**Stack:** React 19, Ant Design 6, Emotion CSS-in-JS, Vite 7, Tailwind CSS 4

---

## Quick Reference

```bash
cd demo-app
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

---

## Architecture

The app follows a modular architecture extracted from a monolith. See [ARCHITECTURE.md](ARCHITECTURE.md) for full details.

```
demo-app/src/
├── config/          # Theme tokens, widget type definitions
├── constants/       # Mock data, initial layout, storage keys
├── context/         # React Context (ThemeContext)
├── hooks/           # useLocalStorage, useDragAndDrop, useHomepageState
├── components/
│   ├── layout/      # DropZone
│   ├── widget/      # WidgetWrapper, WidgetPicker, WidgetRenderer, ConfigModalContent
│   └── widgets/     # 22 widgets organized by category (data, content, analytics, communication, navigation, organization, ai)
├── pages/           # HomepageBuilder.jsx (orchestrator)
└── styles/          # Shared styles
```

**Key entry points:**
- `pages/HomepageBuilder.jsx` — Main orchestrator, composes all hooks and renders layout
- `config/widgetTypes.jsx` — Widget registry (WIDGET_TYPES)
- `components/widget/WidgetRenderer.jsx` — Maps widget type IDs to components

---

## Best Practices

### Code Style & Conventions

- **JSX files use `.jsx` extension**, not `.js` — follow the existing convention
- **Emotion CSS-in-JS** — Use `css` prop with `@emotion/react` for component styles. Do not introduce styled-components or inline style objects
- **Ant Design 6** — Use Ant Design components and design tokens. Do not add competing UI libraries
- **No TypeScript yet** — The project is plain JSX. Do not convert files to TypeScript unless explicitly asked. Type annotations exist in ARCHITECTURE.md for future reference only
- **Barrel exports** — Each directory has an `index.js` re-exporting its modules. Maintain this pattern

### Component Patterns

- **Widgets receive a standard props interface:** `{ config, isEditing, onConfigure }`
- **Widgets are pure display components** — They should not manage global state or call hooks like `useHomepageState` directly
- **State lives in hooks** — `useHomepageState` manages layout state, `useDragAndDrop` manages DnD. Components consume these via props from `HomepageBuilder.jsx`
- **Theme access** — Use `DarkModeContext` from `context/ThemeContext.jsx`. Theme tokens come from `config/theme.js`

### Adding a New Widget

1. Create component in `src/components/widgets/[category]/NewWidget.jsx`
2. Export from the category's `index.js`
3. Register in `src/config/widgetTypes.jsx` (WIDGET_TYPES)
4. Add to component map in `src/components/widget/WidgetRenderer.jsx`

### State Management

- **No external state library** — State is managed via React Context + custom hooks
- **Persistence** — `useLocalStorage` hook handles localStorage. Storage keys are defined in `constants/initialLayout.js` (`STORAGE_KEYS`)
- **Layout structure** — Layout has three regions: `header`, `main`, `sidebar`. Each region contains an array of widget objects

### File Organization

- **Config vs Constants** — `config/` holds behavior configuration (themes, widget definitions). `constants/` holds static data (mock data, default layouts)
- **One widget per file** — Each widget is a standalone file in its category subdirectory
- **Keep HomepageBuilder.jsx as orchestrator** — It was reduced from 2,757 to ~818 lines. Do not re-bloat it. Extract new logic into hooks or components

---

## Coding Guidelines

### Do

- Follow existing patterns — look at a sibling file before creating a new one
- Use Ant Design's `ConfigProvider` and `theme` tokens for theming
- Keep widget components self-contained and focused
- Use `css` template literals from Emotion for dynamic styles
- Maintain barrel exports when adding new files
- Test that both dark and light themes render correctly

### Don't

- Don't add new npm dependencies without explicit approval
- Don't put business logic in widget components — extract to hooks
- Don't use `React.memo` / `useMemo` / `useCallback` prematurely — only optimize when there's a measured performance issue
- Don't hardcode colors — use theme tokens from `config/theme.js`
- Don't store sensitive data in localStorage
- Don't modify the drag-and-drop system without understanding `useDragAndDrop.js` fully

---

## Common Tasks

### Modifying a widget's appearance
→ Find it in `src/components/widgets/[category]/`, edit the Emotion styles

### Changing theme colors
→ Edit `src/config/theme.js` (`getDarkTheme` / `getLightTheme`)

### Adding mock data
→ Add to `src/constants/mockData.js`

### Modifying the layout grid or regions
→ Edit `src/pages/HomepageBuilder.jsx` and `src/hooks/useHomepageState.js`

### Changing widget configuration options
→ Edit the widget's entry in `src/config/widgetTypes.jsx` (defaultConfig) and `src/components/widget/ConfigModalContent.jsx`

---

## Known Constraints

- **No backend** — All data is mocked in `constants/mockData.js`. The app is a frontend-only demo
- **No routing** — Single page app with no router
- **No tests** — No test framework is set up yet
- **localStorage only** — No API persistence; layouts are saved to browser localStorage
- **No i18n** — All strings are hardcoded in English
