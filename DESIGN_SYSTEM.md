# Design system — rulebook

Read this before writing or editing any UI code in this repo. It applies
equally to a human contributor and an AI coding tool — if you are an AI
tool reading this, these rules are not suggestions.

## The four layers

```
src/
  styles/
    tokens.css   ← Layer 1: raw values
    theme.css    ← Layer 2: semantic names + dark mode + shadcn bridge
  components/
    ui/          ← Layer 3: Button, Card, Input, Select, Textarea, Modal,
                    Table, Badge, Progress, AppToaster
    layout/      ← Layer 3b: Sidebar, Topbar, UserMenu, AppLayout,
                    AuthLayout, AuthCard
  features/      ← Layer 4: pages. Only import from components/ui and
                    components/layout — never define new colors, spacing,
                    or shadows here.
```

Each layer only knows about the layer directly below it. A page never
touches a raw hex value. A component never touches `tokens.css` directly.

## The one rule that matters most

**Never write a raw hex code, a raw px value, or a bare Tailwind color
utility (`bg-red-600`, `text-gray-500`, `border-gray-300`) anywhere in
`components/` or `features/`.** If the color/spacing/radius you need
doesn't have a token yet, add it to `tokens.css` and map it in
`theme.css` first — then use it. Never skip a layer.

This is not a style preference — it is the difference between one file
controlling how the whole app looks and a hundred files each secretly
disagreeing with each other.

## tokens.css — raw values only

Color ramps (`--brand-50` … `--brand-900`, and the same for `neutral`,
`success`, `warning`, `danger`), spacing (`--space-1` … `--space-16`,
4px base unit), radius, shadow (`--shadow-sm/md/lg/xl`), z-index
(`--z-dropdown/sticky/overlay/modal/toast`), and typography scales.

No semantic names live here. No light/dark logic lives here. A ramp is
just a ramp.

## theme.css — semantic names + dark mode

Maps raw tokens to the names components actually use:
`--color-background`, `--color-surface`, `--color-text-primary`,
`--color-border`, `--color-brand`, `--color-danger`, etc. Tailwind v4
reads the `@theme` block and turns these into utility classes
(`bg-background`, `text-text-primary`, `border-border`, `bg-brand`).

**Dark mode** is class-based (`.dark` on `<html>`), driven by
`src/lib/theme-bootstrap.ts`. It resolves to: manual user choice
(localStorage) if one exists, otherwise the OS preference
(`prefers-color-scheme`). Never write a separate `dark:` variant by
hand in a component — the semantic token already flips underneath you.
If you find yourself writing `dark:bg-neutral-800`, stop: that value
belongs in the `.dark { }` block in `theme.css`, not inline.

**shadcn compatibility bridge**: shadcn-generated components (Badge,
and others built from the shadcn CLI) are written against a fixed
vocabulary — `--primary`, `--secondary`, `--destructive`, `--muted`,
`--foreground`, `--ring`, etc. — that can't be renamed component-side.
`theme.css` maps that vocabulary to our own semantic tokens once. If a
new shadcn component uses a variable not yet in the bridge, add it to
the bridge — don't hardcode a color in the component.

**Global base-layer defaults** (`@layer base` block in `theme.css`):
every element's default `border-color` is `--color-border`, and
`body`'s default text/background color are `--color-text-primary` /
`--color-background`. This exists because bare Tailwind utilities like
`border-b` or an un-classed `<h1>` have no color of their own and will
silently fall back to browser defaults without this. Don't re-solve
this per-component — if you find an element with no explicit color
that looks wrong, the fix is almost always here, not in the component.

## components/ui — the primitives

Button, Card, Input, Select, Textarea, Modal, Table, Badge, Progress,
AppToaster. Each is styled once, using only semantic tokens (or the
shadcn bridge). A page composes these — it never re-styles them with
one-off classes beyond layout (`className="mt-4"` on a `<Card>` is
fine; `className="bg-white"` on a `<Card>` is not).

If a new UI need doesn't fit an existing primitive, build a new one
here first. Don't style a one-off element inline in a feature page.

## components/layout — page scaffolding

Sidebar, Topbar, UserMenu, AppLayout, AuthLayout, AuthCard. These
compose `components/ui` primitives plus semantic tokens directly (a
sidebar isn't a reusable primitive the way a Button is, but it still
never touches raw values).

## Common mistakes already found and fixed once — don't reintroduce them

- **Dead CSS variables**: `bg-[var(--brand)]`, `focus:ring-(--brand)` —
  leftover from before `theme.css` existed. Always use the utility
  class (`bg-brand`), never a raw `var(--...)` reference in a
  component.
- **Hardcoded Tailwind defaults**: `bg-white`, `bg-red-600`,
  `text-gray-500`, `border-gray-300`. These don't respond to dark mode
  and don't match the brand. Always map to the semantic equivalent
  (`bg-surface`, `bg-danger`, `text-text-secondary`, `border-border`).
- **Missing text/background color entirely**: an `<input>` or
  `<select>` with no `bg-*`/`text-*` class silently inherits page
  defaults, which breaks in dark mode. Every interactive control needs
  explicit `bg-surface text-text-primary` (or the semantic equivalent).
- **Arbitrary z-index**: `z-50`, `z-30` instead of `z-modal`,
  `z-sticky`. Arbitrary numbers have no guaranteed ordering against
  each other. Always use the z-index scale.
- **Broken arbitrary-value syntax**: a stray trailing bracket
  (`bg-(--brand)]`) silently applies no style at all. If a color looks
  like it's "not working," check for this before assuming a token is
  missing.
- **Two colors doing one job with no token for the difference**
  (e.g. a hover state distinguishing `secondary` from `outline`
  buttons): prefer adding a real semantic token (`--color-X-hover`) over
  reaching for opacity tricks or an undocumented raw ramp step. Opacity
  (`/80`) is an acceptable shortcut only when a dedicated token would
  be overkill for a single, low-stakes hover state.

## Before adding anything new

1. Does a token already cover this? Check `tokens.css` /
   `theme.css` first.
2. If not, add the raw value to `tokens.css`, map it to a semantic
   name in `theme.css`, then use the semantic name. Never invert this
   order.
3. Does a component already cover this? Check `components/ui` and
   `components/layout` before building something new.
4. If you're an AI tool and unsure which of the above applies, ask —
   don't guess a new pattern into the codebase.
