<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# yagneshpateldev.com

Single-page portfolio for Yagnesh Patel, full-stack developer in Gujarat, India.
Next.js 16 (App Router), Tailwind v4, `motion/react`, TypeScript, on Vercel.

```bash
pnpm dev      # next dev
pnpm build    # run before calling anything done
pnpm lint     # eslint
```

## What this site is arguing

It is **not** a résumé. It sells one thing: *you can hand this person a whole
product and get back something live*. Design, build, deploy, handover — one
person, no agency layers, nothing left for someone else to finish.

Two audiences, one page: **founders and agencies** hiring for a project, and
**recruiters** hiring for a role. Never close either door. Projects lead;
full-time stays on offer (the contact form's intent options carry it).

Copy rules that hold everywhere:

- Lead with what the reader gets, not with what he is.
- Evidence before inventory. Shipped work outranks skill lists.
- No em dashes in visible copy. No emoji as decoration or section markers.
- Never invent metrics. Where there's no number, use a true qualifier
  ("Live", "Airline", "Joint build") instead of inventing one.
- Client work was done as an employee. Never imply he held the client
  relationship, and don't lean on the employer's name in sales copy — Experience
  names it factually, which is enough.

## Design system

Tokens live in `app/globals.css` under `@theme`. Every colour has exactly one
job; that discipline is what holds the page together, so don't borrow across
jobs.

| token | hex | job |
|---|---|---|
| `bone` | `#F7F5EF` | canvas |
| `forest` | `#0B3B2E` | headings, dark anchor blocks |
| `deep` | `#0E2A21` | strong body text |
| `moss` | `#5F6F63` | body copy |
| `soft` | `#8A9689` | captions, muted detail |
| `edge` | `#E3DFD1` | hairlines, card borders |
| `signal` | `#FF5A24` | **anything clickable**, plus accent words |
| `signal-hi` | `#E64A16` | signal hover |
| `citrus` | `#FFC12B` | highlight — only legible **on forest** |
| `mint` | `#12B886` | live/verified status only |
| `alert` | `#B3261E` | validation errors, deliberately not signal |

- **Sections strictly alternate `bone` and `white`:** Hero bone, About white,
  Projects bone, Experience white, Activity bone, Skills white, Certifications
  bone, Contact white, Footer forest. Adding or reordering a section means
  flipping everything after it — and a flip is never just the section class,
  because cards, pills and panels inside are `bg-white` on bone sections and
  `bg-bone` on white ones so they stay visible.
- **Every section opens the same way:** a 2px `signal` rule plus a tracked
  uppercase eyebrow, then `text-3xl lg:text-[2.75rem] font-bold
  leading-[1.05] tracking-[-0.03em] text-forest`.
- **Hairline rows beat boxed cards** for lists of uneven length. Boxes force
  equal heights and leave half-empty rectangles — that's why Skills is rows.
- **Numbering encodes real sequence only.** 01–04 on the stages is honest
  because they happen in that order; six parallel certificates get check marks.

## Section order

`Hero → About → Work (Projects) → Experience → Activity → Skills → Certifications → Contact`

Promise → proof → proof → objection-handling → capability → credentials → act.
Certificates are the weakest proof so they sit late. Activity follows Experience
because it defends that claim ("my GitHub is quiet, the work is on a private
GitLab"), and an objection belongs after the claim it defends.

The navbar deliberately carries **three links** (About, Work, Experience) plus
the CTA. The footer is the full index. Don't grow the nav.

## Conventions

- **Motion:** parent `staggerChildren` is fine for an **on-mount** sequence
  (`initial="hidden" animate="visible"`, as the hero does). For **scroll**
  reveals it is not — a parent with `whileInView` plus child variants left a
  whole section stuck at `opacity: 0`. Scroll-revealed elements each carry their
  own `initial` / `whileInView` / `viewport` and an index delay.
- **No external asset CDNs.** Devicon logos were removed; tech tags are
  typographic. Everything is self-hosted or inline.
- **Interactive targets ≥44px**, with a visible `focus-visible` ring in
  `signal`.
- Numbers that could drift are computed, never typed: years from
  `lib/experience.ts`, Activity stats from `data/gitlab-activity.json`,
  credential codes parsed out of the verify URLs.

## Contact form

`components/Contact.tsx` → `POST /api/contact` → Resend.

```
RESEND_API_KEY=…    # .env.local, and Vercel env vars before deploying
CONTACT_TO=…        # inbox that receives enquiries
CONTACT_FROM=…      # optional; defaults to Resend's test sender
```

The route revalidates server-side, sets `replyTo` to the visitor, rate-limits
per IP, and answers 200 to honeypot hits so bots learn nothing. The email
template is table-based with inline styles — Gmail strips `<head>` styles and
Outlook renders with Word, so no flexbox, no classes, no media queries.

Resend's test sender lands in spam until the domain is verified; `CONTACT_FROM`
is the only change needed once it is.

## Gotchas already paid for

- `next/image`: `priority` is **deprecated in 16** — use `preload`.
- Icons must be `app/icon.svg` and `app/apple-icon.tsx`. The `favicon`
  convention only accepts `.ico`, so renaming stops the link tag being emitted.
  iOS ignores SVG for home-screen icons, hence the generated PNG.
- **File-based metadata overrides the `metadata` object** — never configure
  icons in both places.
- `lucide-react` here is v1: `AlertCircle` is now `CircleAlert`, `CheckCircle2`
  is gone. Grep `node_modules/lucide-react/dist/lucide-react.d.ts` before
  importing an icon you haven't used yet.
- Import from `motion/react`. `framer-motion` was removed.
