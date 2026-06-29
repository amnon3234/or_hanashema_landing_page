# אור הנשמה — Landing Page (React)

React + TypeScript rebuild of the אור הנשמה hub landing page, split into reusable
components with a Storybook design system. RTL Hebrew.

> Colors are placeholder neutral defaults — the brand palette is applied in a later step.
> Swap the values in `src/design-system/tokens.css` without touching component CSS.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server for the landing page |
| `npm run build` | Type-check + production build |
| `npm run storybook` | Storybook component explorer + design tokens |
| `npm run build-storybook` | Static Storybook build |
| `npm run remotion` | Remotion Studio (video — next step) |

## Structure

```
src/
  components/        reusable UI (each: .tsx + .css + .stories.tsx)
  design-system/     tokens.css (CSS vars) + tokens.ts (docs)
  data/content.ts    page content
  remotion/          video compositions (scaffold for next step)
  stories/           design-system token stories
  App.tsx            page composition
```
