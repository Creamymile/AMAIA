# AMAIA — Execution Plan

> Detailed Implementation Tasks for Solo Builder
> Version 1.0 — March 2026

---

## 1. Milestones

| # | Milestone | Duration | What's Shippable |
|---|---|---|---|
| M1 | Project Foundation | 3–4 days | Next.js app running, database connected, deployed to Vercel, auth working |
| M2 | Database & Data Layer | 2–3 days | Full Prisma schema, migrations, seed data, service layer foundation |
| M3 | Seller Onboarding & Listings | 4–5 days | Sellers can register, create store, create service + product listings |
| M4 | Public Marketplace | 3–4 days | Browse, search, filter, listing detail pages, seller stores, categories |
| M5 | Cart & Checkout | 3–4 days | Cart, Stripe Checkout, Stripe Connect, webhook handler, order creation |
| M6 | Digital Product Delivery | 2–3 days | Secure file upload, download tokens, signed URLs, digital library |
| M7 | Service Order Workflow | 3–4 days | Full order lifecycle, delivery, accept/revise, auto-complete, messaging |
| M8 | Reviews & Notifications | 2–3 days | Review system, email notifications, in-app notification bell |
| M9 | Buyer Dashboard | 2–3 days | Orders, downloads, messages, settings |
| M10 | Seller Dashboard | 2–3 days | Orders, earnings, listing management, store settings |
| M11 | Admin Dashboard | 3–4 days | Moderation, disputes, users, categories, transactions, audit log |
| M12 | Polish & Launch | 3–4 days | Responsive fixes, error states, SEO, cron jobs, testing, deploy |

**Total: ~35–45 days of focused building**

---

## 2. Build Order & Rationale

```
M1 → M2 → M3 → M4 → M5 → M6 → M7 → M8 → M9 → M10 → M11 → M12
```

**Why this order:**

1. **M1 Foundation first** — everything depends on the app shell, auth, and deployment pipeline. Deploying to Vercel on day 1 catches environment issues immediately.

2. **M2 Database next** — every feature reads/writes data. Having the full schema and Prisma client ready means no blocking when building features.

3. **M3 Sellers before buyers** — a marketplace needs supply. Sellers creating listings is the prerequisite for the buyer experience.

4. **M4 Public marketplace** — now that listings exist, build the browsing/discovery experience. This is the first thing a visitor sees.

5. **M5 Checkout** — connects supply (listings) to demand (buyers). First revenue flows here.

6. **M6 Digital delivery before service workflow** — digital products are simpler (instant delivery). Getting end-to-end purchase → download working first is a quick win.

7. **M7 Service orders** — more complex workflow (state machine, messaging, delivery). Built on top of the order system from M5.

8. **M8 Reviews & notifications** — trust layer (reviews) and communication layer (notifications). These enhance features already built.

9. **M9–M10 Dashboards** — buyer and seller dashboards aggregate features from M5–M8 into coherent management interfaces.

10. **M11 Admin** — admin tools are needed for moderation and disputes, but only matter once there's content to moderate.

11. **M12 Polish** — responsive fixes, edge cases, and launch prep. Always last because you discover issues during feature building.

---

## 3. Atomic Tasks by Milestone

---

### M1: Project Foundation

#### M1-01: Initialize Next.js Project

**Purpose:** Create the base application with all core tooling configured.
**Dependencies:** None
**Files involved:**
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `tailwind.config.ts`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `.env.local`, `.env.example`
- `.gitignore`

**Implementation notes:**
- `npx create-next-app@latest amaia --typescript --tailwind --eslint --app --src-dir`
- Add strict TypeScript config: `"strict": true` in tsconfig
- Configure path aliases: `@/` → `src/`
- Install core dependencies: `prisma`, `@prisma/client`, `next-auth`, `zod`, `stripe`, `@aws-sdk/client-s3`, `resend`
- Install dev dependencies: `prettier`, `prettier-plugin-tailwindcss`
- Create `.env.example` with all expected env vars (no values)
- Create `.env.local` from example with development values

**Definition of done:** `pnpm dev` starts the app at localhost:3000, TypeScript compiles with zero errors, Tailwind styles render.

---

#### M1-02: Set Up shadcn/ui

**Purpose:** Install the component library and establish the design system.
**Dependencies:** M1-01
**Files involved:**
- `components.json`
- `src/lib/utils.ts` (cn helper)
- `src/components/ui/*`
- `tailwind.config.ts` (theme extensions)

**Implementation notes:**
- `npx shadcn-ui@latest init`
- Choose: New York style, Zinc base color, CSS variables
- Install initial components: `button`, `card`, `input`, `label`, `badge`, `avatar`, `dialog`, `dropdown-menu`, `select`, `separator`, `sheet`, `skeleton`, `toast`, `tabs`, `textarea`, `tooltip`
- Configure custom theme colors in tailwind.config.ts for AMAIA brand (clean, modern, premium feel)

**Definition of done:** A test page renders shadcn/ui Button and Card correctly with brand colors.

---

#### M1-03: Set Up Prisma & PostgreSQL

**Purpose:** Database connection and ORM ready for schema development.
**Dependencies:** M1-01
**Files involved:**
- `prisma/schema.prisma`
- `src/lib/db.ts`
- `.env.local` (DATABASE_URL)

**Implementation notes:**
- `npx prisma init`
- Set up PostgreSQL (Neon recommended for serverless — free tier, zero config)
- Configure DATABASE_URL in .env.local
- Create `src/lib/db.ts` with Prisma singleton pattern (avoid multiple clients in dev)
- Test connection with `npx prisma db pull` (should connect without error)

**Definition of done:** `npx prisma db push` succeeds, Prisma Studio opens without error.

---

#### M1-04: Configure Auth.js (NextAuth v5)

**Purpose:** Working authentication with email/password and Google OAuth.
**Dependencies:** M1-01, M1-03
**Files involved:**
- `src/lib/auth.ts` (Auth.js config)
- `src/lib/auth-utils.ts` (session helpers)
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/middleware.ts`
- `prisma/schema.prisma` (User, Account, Session, VerificationToken tables)
- `.env.local` (AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)

**Implementation notes:**
- Install: `next-auth@beta @auth/prisma-adapter`
- Configure providers: Credentials (email + bcrypt password), Google OAuth
- Use Prisma adapter for session/account storage
- Session strategy: JWT
- Extend session type to include `role` field
- Create `getSession()` helper that returns typed session
- Create `assertRole(session, role)` helper that throws on mismatch
- Set up Google OAuth credentials in Google Cloud Console
- Create middleware.ts with route protection matchers

**Definition of done:** User can register with email/password, log in, log out. Google OAuth redirects work. Protected routes redirect to /login. Session includes userId and role.

---

#### M1-05: Build Auth Pages

**Purpose:** Login, register, forgot password, and reset password UI.
**Dependencies:** M1-02, M1-04
**Files involved:**
- `src/app/(auth)/layout.tsx`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`
- `src/app/(auth)/forgot-password/page.tsx`
- `src/app/(auth)/reset-password/page.tsx`
- `src/app/(auth)/verify-email/page.tsx`
- `src/modules/auth/actions/auth.actions.ts`
- `src/modules/auth/schemas/auth.schemas.ts`

**Implementation notes:**
- Auth layout: centered card with AMAIA logo, minimal background
- Login: email + password form, "Sign in with Google" button, links to register and forgot password
- Register: name + email + password + terms checkbox, "Sign up with Google"
- Use React Hook Form + Zod for client validation
- Server actions for: register, login (credentials), forgot-password (send email), reset-password (validate token + update)
- Email verification: generate token on register, send via Resend, /verify-email validates and marks emailVerified

**Definition of done:** Full auth cycle works: register → verify email → login → access dashboard → logout. Google OAuth flow works. Password reset flow works.

---

#### M1-06: Build Root Layout & Global Components

**Purpose:** Navigation header, footer, and layout structure that all pages use.
**Dependencies:** M1-02, M1-04
**Files involved:**
- `src/app/layout.tsx` (root)
- `src/components/layout/header.tsx`
- `src/components/layout/footer.tsx`
- `src/components/layout/mobile-nav.tsx`
- `src/lib/constants.ts`

**Implementation notes:**
- Root layout: HTML lang, font (Inter or Geist), ToastProvider, SessionProvider
- Header: logo, nav links (Explore, Categories, How It Works), search bar (placeholder), auth buttons (Login/Register or user menu), seller CTA "Start Selling"
- Mobile nav: sheet/drawer triggered by hamburger
- Footer: logo, link columns (Platform, Sellers, Support, Legal), social links, copyright
- Wrap auth state: show different nav items based on session/role

**Definition of done:** Header and footer render on all pages. Mobile nav works. Auth state reflected in UI (login buttons vs user menu).

---

#### M1-07: Deploy to Vercel

**Purpose:** CI/CD pipeline from day 1. Catch deployment issues immediately.
**Dependencies:** M1-01 through M1-06
**Files involved:**
- `vercel.json` (if needed)
- Vercel dashboard configuration

**Implementation notes:**
- Connect GitHub repo to Vercel
- Set all environment variables in Vercel (database URL, auth secrets, Stripe keys, etc.)
- Verify build succeeds
- Verify auth flows work in production
- Set up preview deployments on PRs

**Definition of done:** Production URL accessible. Auth works. Database connected. Preview deployments on branches.

---

### M2: Database & Data Layer

#### M2-01: Define Complete Prisma Schema

**Purpose:** All database tables, relationships, indexes, and enums defined.
**Dependencies:** M1-03
**Files involved:**
- `prisma/schema.prisma`

**Implementation notes:**
- Define all models from the Product Spec Section 9:
  - User, Account, Session, VerificationToken (Auth.js)
  - SellerProfile
  - Category (self-referencing for subcategories)
  - Tag, ListingTag (many-to-many)
  - Listing, ServicePackage, ListingImage, DigitalProductFile
  - CartItem
  - Order, OrderItem, OrderMessage, OrderDeliverable
  - DownloadToken
  - Payment
  - Review
  - Notification
  - Payout
  - Dispute
  - AdminLog
- Define all enums: Role, UserStatus, ListingType, ListingStatus, PackageTier, OrderStatus, OrderItemStatus, PaymentStatus, PayoutStatus, DisputeStatus, NotificationType
- Add indexes: all foreign keys, slugs, status columns, email, createdAt where used for sorting
- Add unique constraints: User.email, SellerProfile.slug, Listing.slug, Tag.slug, Review.orderItemId, DownloadToken.token

**Definition of done:** `npx prisma migrate dev` creates all tables. `npx prisma generate` produces type-safe client. Prisma Studio shows all models.

---

#### M2-02: Create Database Seed Script

**Purpose:** Populate categories, admin user, and test data for development.
**Dependencies:** M2-01
**Files involved:**
- `prisma/seed.ts`
- `package.json` (prisma.seed config)

**Implementation notes:**
- Seed categories from the taxonomy in Product Spec (AI & Automation, Prompt Engineering, Web & Landing Pages, Design & Creative, Digital Products subcategories)
- Create admin user (email from env var, hashed password, role: ADMIN)
- Create 2–3 test sellers with profiles
- Create 5–10 test listings (mix of services and products)
- Create a few test reviews
- Use `upsert` to make seed idempotent

**Definition of done:** `npx prisma db seed` runs without error, creates all seed data, re-running is idempotent.

---

#### M2-03: Create Shared Utilities & Error Handling

**Purpose:** Foundation code used by all modules.
**Dependencies:** M1-01
**Files involved:**
- `src/lib/utils.ts` (extend with marketplace helpers)
- `src/lib/errors.ts`
- `src/lib/constants.ts`
- `src/lib/validators.ts`
- `src/types/global.d.ts`
- `src/types/next-auth.d.ts`

**Implementation notes:**
- `utils.ts`: `cn()`, `formatCurrency()`, `formatDate()`, `generateSlug()`, `generateOrderNumber()`
- `errors.ts`: Custom error classes — `AppError`, `NotFoundError`, `UnauthorizedError`, `ForbiddenError`, `ValidationError`. Each has statusCode and user-safe message.
- `constants.ts`: Commission rate (0.12), clearance periods, file size limits, pagination defaults
- `validators.ts`: Shared Zod schemas — `paginationSchema`, `idSchema`, `slugSchema`
- `next-auth.d.ts`: Extend Session and JWT types to include `role` and `userId`

**Definition of done:** All utilities importable, TypeScript compiles, custom errors work with proper instanceof checks.

---

### M3: Seller Onboarding & Listings

#### M3-01: Seller Registration & Profile Setup

**Purpose:** Buyers can become sellers by completing onboarding.
**Dependencies:** M1-04, M1-05, M2-01
**Files involved:**
- `src/app/(auth)/register/seller/page.tsx`
- `src/modules/users/services/seller-profile.service.ts`
- `src/modules/users/actions/seller.actions.ts`
- `src/modules/users/schemas/user.schemas.ts`

**Implementation notes:**
- Multi-step form (client-side wizard with state, server action per step):
  - Step 1: Store name, bio, avatar upload, primary category → create SellerProfile
  - Step 2: Stripe Connect (see M3-02)
  - Step 3: Create first listing (link to listing creation)
- On final step: update User.role to SELLER
- Avatar upload: presigned S3 URL flow (can reuse M6 upload infrastructure, or use simple base64 for MVP)
- Validate store slug uniqueness
- Seller profile service: `createSellerProfile()`, `updateSellerProfile()`, `getSellerBySlug()`

**Definition of done:** Buyer can navigate onboarding steps, save seller profile, role upgrades to SELLER, store page accessible at /seller/[slug].

---

#### M3-02: Stripe Connect Integration

**Purpose:** Sellers can connect their bank account to receive payouts.
**Dependencies:** M3-01
**Files involved:**
- `src/lib/stripe.ts`
- `src/modules/payments/services/stripe.service.ts`
- `src/modules/payments/actions/payment.actions.ts`

**Implementation notes:**
- Create Stripe client in `src/lib/stripe.ts`
- `createConnectAccount()`: call `stripe.accounts.create({ type: 'express' })`, store account ID on SellerProfile
- `createConnectOnboardingLink()`: call `stripe.accountLinks.create()` with return/refresh URLs
- Onboarding step: button "Connect with Stripe" → redirect to Stripe Express onboarding → return to seller dashboard
- Handle return URL: check if onboarding is complete (`stripe.accounts.retrieve()`, check `charges_enabled`)
- Store `stripeOnboarded: true` when complete
- **Test mode:** Use Stripe test mode with test bank numbers

**Definition of done:** Seller clicks Connect → Stripe Express flow → returns → stripeAccountId and stripeOnboarded saved. Dashboard shows connected status.

---

#### M3-03: Service Listing Creation

**Purpose:** Sellers can create service listings with packages.
**Dependencies:** M2-01, M3-01
**Files involved:**
- `src/app/(seller)/seller/dashboard/listings/new/page.tsx`
- `src/modules/listings/services/listing.service.ts`
- `src/modules/listings/actions/listing.actions.ts`
- `src/modules/listings/schemas/listing.schemas.ts`
- `src/components/listings/listing-form.tsx`
- `src/components/listings/package-selector.tsx`

**Implementation notes:**
- Multi-step form or long scrollable form (prefer multi-step for mobile):
  1. Type selection (Service)
  2. Basic info: title, category (dropdown from DB), subcategory, tags (combobox), description (rich text — use a simple textarea for MVP, upgrade to Tiptap or similar later)
  3. Images: upload up to 6 (use presigned URL flow or simple upload)
  4. Packages: builder component for 1–3 tiers. Per tier: name, description, price (number input), delivery days, revisions, features (dynamic list with add/remove)
  5. Add-ons: optional list of name + price
  6. FAQ: optional Q&A pairs
  7. Preview
- Zod schema validates the full listing payload
- Server action: `createListing()` — creates Listing + ServicePackages + ListingImages + Tags in a transaction
- Auto-generate slug from title (append random suffix if duplicate)
- Set status: DRAFT (if saved) or PENDING_REVIEW (if submitted and <3 approved listings) or ACTIVE (if 3+ approved)

**Definition of done:** Seller creates a service listing with at least 1 package. Listing appears in seller's listing management. Listing detail page renders with package comparison.

---

#### M3-04: Digital Product Listing Creation

**Purpose:** Sellers can create product listings with file uploads.
**Dependencies:** M2-01, M3-01
**Files involved:**
- Same form infrastructure as M3-03 (shared listing-form, different steps for product type)
- `src/components/shared/file-upload.tsx`
- `src/modules/uploads/services/s3.service.ts`
- `src/modules/uploads/actions/upload.actions.ts`

**Implementation notes:**
- Reuse listing form with type=PRODUCT branch:
  1. Type selection (Product)
  2. Basic info (same as service)
  3. Images (same as service)
  4. Pricing & files: single price input + file upload
  5. File format description textarea
  6. FAQ (same)
  7. Preview
- File upload component: drag & drop zone, progress bar, file name + size display
- S3 presigned upload flow:
  1. Client calls server action `getPresignedUploadUrl(fileName, fileType, fileSize)`
  2. Server validates size/type, generates presigned POST URL
  3. Client uploads directly to S3
  4. Client sends S3 key back to server action
  5. Server creates DigitalProductFile record
- Store files in private S3 bucket: `products/{sellerId}/{listingId}/{filename}`
- Server action: `createListing()` handles both types

**Definition of done:** Seller creates a product listing with uploaded file(s). Files stored in S3. Listing detail page shows file info (format, size) but no download link for non-purchasers.

---

#### M3-05: Listing Management (CRUD)

**Purpose:** Sellers can view, edit, pause, and delete their listings.
**Dependencies:** M3-03, M3-04
**Files involved:**
- `src/app/(seller)/seller/dashboard/listings/page.tsx`
- `src/app/(seller)/seller/dashboard/listings/[id]/edit/page.tsx`
- `src/modules/listings/actions/listing.actions.ts` (updateListing, deleteListing, toggleListingStatus)

**Implementation notes:**
- Listings page: table/card list with columns: title, type badge, status badge, price/range, orders, rating, actions
- Filter tabs: All / Active / Draft / Pending / Paused / Rejected
- Actions per listing: Edit, Pause/Activate toggle, Delete (confirm dialog)
- Edit page: same form as create, pre-populated with existing data
- Delete: soft delete (or hard delete if no orders reference it)
- Pause: set status to PAUSED (hidden from marketplace but data preserved)
- Reactivate: set status back to ACTIVE

**Definition of done:** Seller can see all their listings, edit any listing, pause/activate, and delete. Status changes reflected immediately.

---

#### M3-06: Seller Dashboard Layout

**Purpose:** Dashboard shell with sidebar navigation for sellers.
**Dependencies:** M1-02, M1-06
**Files involved:**
- `src/app/(seller)/layout.tsx`
- `src/components/layout/sidebar.tsx`
- `src/components/layout/dashboard-shell.tsx`
- `src/app/(seller)/seller/dashboard/page.tsx`

**Implementation notes:**
- Dashboard shell: sidebar (desktop) / bottom nav (mobile) + main content area
- Sidebar links: Overview, Listings, Orders, Earnings, Messages, Reviews, Store, Settings
- Active link highlighting based on current path
- Overview page: placeholder cards for earnings, active orders, recent activity (data wired in M10)
- Responsive: sidebar collapses to hamburger on tablet, bottom nav on mobile

**Definition of done:** Seller dashboard renders with navigation. All links navigate correctly. Responsive on mobile/tablet/desktop.

---

### M4: Public Marketplace

#### M4-01: Category Service & Data

**Purpose:** Category data accessible for browse pages and dropdowns.
**Dependencies:** M2-01, M2-02
**Files involved:**
- `src/modules/listings/services/category.service.ts`
- `src/modules/listings/actions/category.actions.ts`

**Implementation notes:**
- `getAllCategories()`: fetch all active categories with subcategories (tree structure)
- `getCategoryBySlug()`: fetch single category with subcategories and listing count
- `getCategoryTree()`: hierarchical format for navigation/dropdowns
- Cache category data aggressively (ISR or in-memory, changes rarely)

**Definition of done:** Categories fetchable in tree format. Dropdowns in listing forms use live category data.

---

#### M4-02: Browse / Explore Page

**Purpose:** Buyers can browse all listings with filters and search.
**Dependencies:** M2-01, M3-03, M3-04, M4-01
**Files involved:**
- `src/app/(public)/explore/page.tsx`
- `src/modules/listings/services/search.service.ts`
- `src/components/listings/listing-grid.tsx`
- `src/components/listings/listing-card.tsx`
- `src/components/listings/listing-filters.tsx`
- `src/components/shared/pagination.tsx`
- `src/components/shared/search-bar.tsx`

**Implementation notes:**
- Server Component page — reads search params for filters/sort/page
- Search service: `searchListings({ query, type, categoryId, minPrice, maxPrice, minRating, sort, page, limit })`
- PostgreSQL query with WHERE clauses, ORDER BY, LIMIT/OFFSET
- For keyword search: use PostgreSQL `ILIKE` for MVP (or `to_tsvector`/`to_tsquery` if needed)
- Listing card: thumbnail (first image), title, seller name + avatar, price or "From $X" (min package price), rating stars + count, type badge (Service/Product)
- Filter UI: top bar or sidebar with: type toggle, category dropdown, price range inputs, rating selector, sort dropdown
- Filters update URL search params (no client state — shareable URLs)
- Pagination component: page numbers + prev/next
- 20 items per page

**Definition of done:** /explore renders listing grid. Search by keyword works. All filters work. Sort works. Pagination works. URL reflects filter state.

---

#### M4-03: Listing Detail Page — Service

**Purpose:** Full detail view of a service listing with packages.
**Dependencies:** M3-03, M4-02
**Files involved:**
- `src/app/(public)/listing/[slug]/page.tsx`
- `src/modules/listings/services/listing.service.ts`
- `src/components/listings/listing-gallery.tsx`
- `src/components/listings/package-selector.tsx`

**Implementation notes:**
- Server Component — fetch listing by slug with related data (seller, packages, images, reviews)
- Generate dynamic metadata (title, description, OG image)
- Gallery: image carousel with thumbnails (shadcn/ui carousel or simple implementation)
- Package comparison: table or card layout showing all 3 tiers side by side
- Package selector: click a package → highlight, show add-ons → "Continue" button (stores selection, links to cart flow)
- Seller card: avatar, name, rating, bio snippet, "View Store" link
- Reviews section: average rating bar, individual review cards with seller responses
- FAQ: accordion component
- Related listings: 4 listings from same category (simple query)

**Definition of done:** Listing detail page renders all data. Package selection works. Gallery navigates. Reviews display. SEO meta tags present.

---

#### M4-04: Listing Detail Page — Product

**Purpose:** Full detail view of a digital product listing.
**Dependencies:** M3-04, M4-02
**Files involved:**
- Same page file as M4-03 (one [slug] route, conditional rendering based on listing type)

**Implementation notes:**
- Same structure as service but:
  - Single price instead of package table
  - "Buy Now" + "Add to Cart" buttons instead of package selector
  - File format info section (what buyer receives)
  - No delivery time info
- Share the same page component, branch on listing.type

**Definition of done:** Product listings render with price, buy buttons, file info. Service listings render with packages. Both from same route.

---

#### M4-05: Seller Store Page

**Purpose:** Public page showing a seller's profile and all their listings.
**Dependencies:** M3-01, M4-02
**Files involved:**
- `src/app/(public)/seller/[username]/page.tsx`

**Implementation notes:**
- Fetch SellerProfile by slug with listings and aggregate reviews
- Display: banner, avatar, store name, bio, stats (rating, reviews, completed orders), portfolio links
- Listings grid: all active listings by this seller
- Tab filter: All / Services / Products
- Dynamic meta tags for SEO

**Definition of done:** /seller/[username] renders seller profile with all their listings. Stats display correctly.

---

#### M4-06: Category Pages

**Purpose:** Browse listings filtered by category.
**Dependencies:** M4-01, M4-02
**Files involved:**
- `src/app/(public)/category/[slug]/page.tsx`

**Implementation notes:**
- Fetch category by slug, get subcategories
- Reuse listing grid component from M4-02 with category pre-filtered
- Subcategory tabs at top
- Category description header
- Same filter/sort functionality as explore

**Definition of done:** /category/[slug] shows category name, description, subcategory tabs, filtered listing grid.

---

#### M4-07: Homepage

**Purpose:** Landing page that drives browsing and seller signups.
**Dependencies:** M4-01, M4-02
**Files involved:**
- `src/app/page.tsx`

**Implementation notes:**
- Hero section: headline, subtitle, search bar, CTA buttons ("Browse Marketplace" + "Start Selling")
- Featured categories: 6–8 category cards with icons (link to /category/[slug])
- "How it works" section: 3 steps for buyers, 3 for sellers
- Popular listings: fetch top 8 listings by orderCount or rating (Server Component)
- Seller CTA: banner encouraging sellers to join
- Trust signals: "Secure payments", "Verified sellers", "Buyer protection"

**Definition of done:** Homepage renders all sections. Links work. Popular listings are real data. Responsive on all breakpoints.

---

#### M4-08: Static Pages

**Purpose:** About, How It Works, FAQ, Terms, Privacy, Contact, Pricing.
**Dependencies:** M1-06
**Files involved:**
- `src/app/(public)/about/page.tsx`
- `src/app/(public)/how-it-works/page.tsx`
- `src/app/(public)/faq/page.tsx`
- `src/app/(public)/terms/page.tsx`
- `src/app/(public)/privacy/page.tsx`
- `src/app/(public)/contact/page.tsx`
- `src/app/(public)/pricing/page.tsx`

**Implementation notes:**
- Mostly static content — hardcoded in the component (no CMS for MVP)
- FAQ: accordion component
- Contact: form that sends email via Resend (or saves to DB)
- Pricing: commission table, seller benefits
- Terms/Privacy: legal text (generate with AI, have a lawyer review before real launch)

**Definition of done:** All pages render with content. Contact form submits. Meta tags present.

---

### M5: Cart & Checkout

#### M5-01: Cart System

**Purpose:** Users can add items to cart, view cart, modify cart.
**Dependencies:** M2-01, M4-03, M4-04
**Files involved:**
- `src/modules/orders/services/cart.service.ts`
- `src/modules/orders/actions/cart.actions.ts`
- `src/modules/orders/schemas/order.schemas.ts`
- `src/app/cart/page.tsx`

**Implementation notes:**
- Server actions: `addToCart()`, `removeFromCart()`, `getCart()`, `clearCart()`
- Cart stored in database (CartItem table) — persists across sessions
- `addToCart()` input: listingId, packageId (optional), addOns (optional JSON)
- Validate: listing is ACTIVE, package belongs to listing, user is authenticated
- Prevent duplicates (same listing + package)
- Cart page: list of items with thumbnail, title, type, package name, add-ons, price, remove button
- Summary: subtotal, total
- Buttons: "Continue Shopping" (→ /explore), "Proceed to Checkout"
- Cart count in header (fetched via server component or lightweight API)

**Definition of done:** Add to cart works from listing pages. Cart page shows items with correct prices. Remove works. Cart persists across sessions.

---

#### M5-02: Stripe Checkout Integration

**Purpose:** Buyers can pay for cart items via Stripe.
**Dependencies:** M5-01, M3-02
**Files involved:**
- `src/modules/payments/services/checkout.service.ts`
- `src/modules/payments/actions/payment.actions.ts`
- `src/app/checkout/page.tsx`
- `src/app/checkout/success/page.tsx`

**Implementation notes:**
- Checkout page: order summary (read from cart), "Pay Now" button
- Server action `createCheckoutSession()`:
  1. Fetch cart items with listing and seller data
  2. Validate all listings still active, sellers still onboarded
  3. Group items by seller (Stripe Connect requires per-seller transfers)
  4. Create Stripe Checkout Session:
     - `mode: 'payment'`
     - `line_items`: map from cart items
     - `payment_intent_data.application_fee_amount`: commission per seller
     - `payment_intent_data.transfer_data.destination`: seller's Stripe account
     - For multi-seller carts: use separate payment intents or Stripe's multi-party payment flow
     - `success_url`, `cancel_url`
     - `metadata`: JSON with cart item IDs, buyer ID
  5. Return Stripe Checkout URL
  6. Client redirects to Stripe

**Important design decision for multi-seller carts:**
For MVP, simplify by creating one Stripe Checkout Session per seller. If cart has items from 3 sellers, create 3 sessions. Or, limit cart to single-seller items for MVP. The simplest path: **one checkout session per seller**, buyer checks out one seller at a time.

Alternative: use Stripe Checkout with `line_items` and handle splits via `transfer_group`. This is more complex but better UX. Decide based on time budget.

**Simplest MVP approach:** Single-seller cart. If buyer adds item from a different seller, warn and offer to clear cart. This avoids multi-party payment complexity entirely. Can expand later.

- Success page: confirmation message, order number, download buttons (products) or "seller notified" message (services)

**Definition of done:** Buyer can check out cart items via Stripe. Payment succeeds in test mode. Redirect to success page.

---

#### M5-03: Stripe Webhook Handler

**Purpose:** Process Stripe events to create orders and trigger delivery.
**Dependencies:** M5-02
**Files involved:**
- `src/app/api/webhooks/stripe/route.ts`
- `src/modules/payments/webhooks/stripe.handler.ts`
- `src/modules/orders/services/order.service.ts`

**Implementation notes:**
- Route handler: POST /api/webhooks/stripe
- Verify webhook signature using `stripe.webhooks.constructEvent()`
- Handle `checkout.session.completed`:
  1. Extract metadata (cart item IDs, buyer ID)
  2. Create Order record (orderNumber, buyerId, totalAmount, platformFee, stripeSessionId)
  3. Create OrderItem records per cart item:
     - For products: status = COMPLETED
     - For services: status = PENDING
  4. Create Payment record (amount, status: SUCCEEDED, stripePaymentId)
  5. For products: generate DownloadTokens (call M6 service)
  6. For services: notify seller
  7. Clear buyer's cart
  8. Send confirmation email to buyer
  9. Create notifications
- Handle `payment_intent.payment_failed`: log failure, update payment status
- Idempotency: check if Order already exists for this session ID before creating

**Definition of done:** Webhook receives Stripe events, creates orders and payments in database. Products get download tokens. Services get PENDING status. Duplicate webhooks are handled safely.

---

#### M5-04: Order Confirmation Page

**Purpose:** Post-checkout page showing order details and next steps.
**Dependencies:** M5-02, M5-03
**Files involved:**
- `src/app/checkout/success/page.tsx`

**Implementation notes:**
- Reads `session_id` from URL search params
- Fetches order by Stripe session ID (may need polling if webhook hasn't processed yet)
- Shows: success message, order number, item summary
- For products: download buttons (links to download endpoint)
- For services: "Your seller has been notified" message, link to order detail
- Links: "View Order", "Continue Browsing", "Go to Digital Library"
- Handle edge case: user refreshes or visits this page later

**Definition of done:** Success page renders after checkout with correct order data. Download buttons work for products.

---

### M6: Digital Product Delivery

#### M6-01: S3 Upload Service

**Purpose:** Centralized service for all file uploads via presigned URLs.
**Dependencies:** M1-01
**Files involved:**
- `src/lib/s3.ts` (S3 client setup)
- `src/modules/uploads/services/s3.service.ts`
- `src/modules/uploads/actions/upload.actions.ts`
- `src/app/api/uploads/presign/route.ts`

**Implementation notes:**
- Configure AWS SDK v3 S3 client in `src/lib/s3.ts`
- S3 bucket: create one bucket with folder structure:
  - `images/listings/{listingId}/` — public-read (or via CloudFront)
  - `images/profiles/{userId}/` — public-read
  - `products/{sellerId}/{listingId}/` — private
  - `deliverables/{orderId}/` — private
  - `messages/{threadId}/` — private
- `getPresignedUploadUrl(bucket, key, contentType, maxSize)`: returns presigned POST URL
- `getPresignedDownloadUrl(bucket, key, expiresIn)`: returns signed GET URL
- `deleteFile(bucket, key)`: delete file
- Server action `requestUploadUrl()`: validates auth, file type, size → returns presigned URL and S3 key

**Definition of done:** Files can be uploaded to S3 via presigned URLs from the browser. Files are retrievable via signed URLs. Private files are not publicly accessible.

---

#### M6-02: Download Token System

**Purpose:** Secure, token-based file download for purchased digital products.
**Dependencies:** M6-01, M5-03
**Files involved:**
- `src/modules/uploads/services/download.service.ts`
- `src/app/api/downloads/[token]/route.ts`

**Implementation notes:**
- `generateDownloadToken(orderItemId, fileId, userId)`:
  - Create DownloadToken: UUID token, maxDownloads=5, expiresAt=now+72hrs
  - Return token
- `validateDownloadToken(token, userId)`:
  - Fetch token record
  - Check: exists, not expired, downloadCount < maxDownloads, userId matches
  - Return file details (s3Key, fileName) or error
- Route handler GET `/api/downloads/[token]`:
  1. Get session → validate authenticated
  2. Validate token (call service)
  3. Increment downloadCount
  4. Generate signed S3 URL (15 min expiry)
  5. Redirect to signed URL (or set Content-Disposition header and proxy/stream)
- `refreshToken(orderItemId, fileId, userId)`:
  - Check if user owns this order item
  - Generate new token (used when old one expired)

**Definition of done:** Purchase creates download tokens. Token URL downloads the file. Expired/exhausted tokens return errors. Tokens refresh from library page.

---

#### M6-03: Digital Library Page

**Purpose:** Buyer's page showing all purchased products with download buttons.
**Dependencies:** M6-02
**Files involved:**
- `src/app/(buyer)/dashboard/downloads/page.tsx`

**Implementation notes:**
- Server Component: fetch all OrderItems where buyerId=currentUser, type=PRODUCT, status=COMPLETED
- Join with Listing (for title, thumbnail), DigitalProductFile (for file info)
- For each file: check for valid DownloadToken. If expired, auto-generate new one.
- Display: grid of purchased products — thumbnail, title, purchase date, file name/size, download button
- Download button: links to `/api/downloads/[token]`
- Search/filter by product name (optional, nice-to-have)

**Definition of done:** Buyer sees all purchased products. Download buttons work. Re-downloads work even after token expiry.

---

### M7: Service Order Workflow

#### M7-01: Order Service & State Machine

**Purpose:** Core order lifecycle logic with proper state transitions.
**Dependencies:** M2-01, M5-03
**Files involved:**
- `src/modules/orders/services/order.service.ts`
- `src/modules/orders/types/order.types.ts`

**Implementation notes:**
- Order service functions:
  - `getOrderById(orderId, userId)` — with authorization check
  - `getOrdersForBuyer(userId, filters)` — paginated
  - `getOrdersForSeller(sellerId, filters)` — paginated
  - `acceptOrder(orderItemId, sellerId)` — PENDING → IN_PROGRESS, set deliveryDueAt
  - `declineOrder(orderItemId, sellerId, reason)` — PENDING → CANCELLED, trigger refund
  - `deliverOrder(orderItemId, sellerId, deliverables, message)` — IN_PROGRESS → DELIVERED
  - `acceptDelivery(orderItemId, buyerId)` — DELIVERED → COMPLETED
  - `requestRevision(orderItemId, buyerId, feedback)` — DELIVERED → IN_PROGRESS (decrement revisions)
  - `autoCompleteOrders()` — batch: DELIVERED + 5 days → COMPLETED
  - `autoCancelOrders()` — batch: PENDING + 48 hours → CANCELLED + refund
- Each state transition validates the current status before changing
- Each transition creates appropriate notifications

**Definition of done:** All state transitions work correctly with validation. Invalid transitions throw errors. Functions are unit-testable.

---

#### M7-02: Order Detail Page — Buyer View

**Purpose:** Buyer can view order details, status, messages, and take actions.
**Dependencies:** M7-01
**Files involved:**
- `src/app/(buyer)/dashboard/orders/[id]/page.tsx`
- `src/components/orders/order-status-badge.tsx`
- `src/components/orders/order-timeline.tsx`

**Implementation notes:**
- Fetch order with items, messages, deliverables
- Header: order number, status badge (color-coded), date
- Item info: listing title (link), package name, add-ons, price
- Status timeline: visual stepper showing order progress
- For DELIVERED orders:
  - Show deliverables (downloadable files)
  - "Accept Delivery" button
  - "Request Revision" button (shows remaining revision count)
  - "Open Dispute" button
- For COMPLETED orders:
  - "Leave Review" button (if not already reviewed)
- Message thread (see M7-04)

**Definition of done:** Order detail page renders all data. Action buttons appear based on status. Status timeline is accurate.

---

#### M7-03: Order Detail Page — Seller View

**Purpose:** Seller can view order details, deliver, and communicate.
**Dependencies:** M7-01
**Files involved:**
- `src/app/(seller)/seller/dashboard/orders/[id]/page.tsx`
- `src/components/orders/delivery-form.tsx`

**Implementation notes:**
- Similar to buyer view but with seller actions:
- For PENDING orders:
  - "Accept Order" button
  - "Decline Order" button (with reason modal)
  - Buyer's requirements (first message)
- For IN_PROGRESS orders:
  - Delivery due date countdown
  - "Deliver Order" button → opens delivery form:
    - File upload (multiple files)
    - Delivery message textarea
    - Submit
- Commission breakdown: order total, platform fee (12%), seller earnings
- Message thread (shared with buyer)

**Definition of done:** Seller can accept/decline orders. Delivery form works with file upload. Commission breakdown accurate.

---

#### M7-04: Order Messaging

**Purpose:** Buyer and seller can communicate within an order.
**Dependencies:** M7-01
**Files involved:**
- `src/modules/messaging/services/message.service.ts`
- `src/modules/messaging/actions/message.actions.ts`
- `src/modules/messaging/schemas/message.schemas.ts`
- Message thread component (embedded in order detail pages)

**Implementation notes:**
- `sendMessage(orderItemId, senderId, body, attachments?)`:
  - Validate sender is buyer or seller of this order
  - Create OrderMessage record
  - Create notification for recipient
  - Send email notification to recipient
- `getMessages(orderItemId, userId)`:
  - Validate user is buyer or seller
  - Fetch messages with sender info, ordered by createdAt
- System messages: created automatically on status changes (read-only, styled differently)
- File attachments: upload to S3, store as JSON array on message
- Message thread UI component:
  - Scrollable message list
  - Sender avatar + name, timestamp
  - File attachment links
  - System messages (centered, muted style)
  - Input: textarea + file attach button + send button
  - Send via server action (form submission)

**Definition of done:** Buyer and seller can exchange messages. Files attach and download. System messages appear on status changes.

---

#### M7-05: Order Listing Pages

**Purpose:** Buyer and seller can see all their orders.
**Dependencies:** M7-01
**Files involved:**
- `src/app/(buyer)/dashboard/orders/page.tsx`
- `src/app/(seller)/seller/dashboard/orders/page.tsx`

**Implementation notes:**
- Both pages: table/list of orders with tabs for status filtering
- Columns: order number, listing title, other party name, status badge, amount, date
- Click row → order detail page
- Pagination
- Buyer page: shows orders as buyer
- Seller page: shows orders received as seller

**Definition of done:** Both pages list orders correctly filtered by user. Tabs filter by status. Pagination works.

---

#### M7-06: Auto-Complete & Auto-Cancel Crons

**Purpose:** Automate order state transitions on timeout.
**Dependencies:** M7-01
**Files involved:**
- `src/app/api/cron/orders/route.ts`
- `vercel.json` (cron configuration)

**Implementation notes:**
- API route: POST /api/cron/orders (secured with CRON_SECRET env var)
- Logic:
  1. Auto-complete: find OrderItems where status=DELIVERED and deliveredAt + 5 days < now → call `autoCompleteOrders()`
  2. Auto-cancel: find OrderItems where status=PENDING and createdAt + 48 hours < now → call `autoCancelOrders()` (includes refund trigger)
- Configure Vercel Cron to run daily (once per day is sufficient for MVP)
- Log all auto-actions

**Definition of done:** Cron runs daily. Delivered orders auto-complete after 5 days. Pending orders auto-cancel after 48 hours with refund.

---

### M8: Reviews & Notifications

#### M8-01: Review System

**Purpose:** Buyers can review completed orders; sellers can respond.
**Dependencies:** M7-01
**Files involved:**
- `src/modules/reviews/services/review.service.ts`
- `src/modules/reviews/actions/review.actions.ts`
- `src/modules/reviews/schemas/review.schemas.ts`
- `src/components/reviews/review-form.tsx`
- `src/components/reviews/review-card.tsx`
- `src/components/reviews/star-rating.tsx`

**Implementation notes:**
- `createReview(orderItemId, buyerId, rating, comment)`:
  - Validate: order is COMPLETED, buyer owns order, no existing review for this order item
  - Create Review record
  - Recalculate and cache aggregate rating on Listing and SellerProfile
  - Notify seller: "You received a new review"
- `respondToReview(reviewId, sellerId, response)`:
  - Validate: seller owns the listing, no existing response
  - Update Review.sellerResponse
- Star rating component: interactive 1–5 star selector for forms, display-only for cards
- Review form: star rating + textarea, shown on order detail page for COMPLETED orders
- Review card: buyer avatar, name, rating stars, text, date, seller response below
- Display on listing detail and seller profile pages
- Aggregate: only show on listing card after 3+ reviews

**Definition of done:** Buyer leaves review → appears on listing and seller profile. Seller responds. Aggregate rating updates. Rating shows on listing cards.

---

#### M8-02: Email Notification System

**Purpose:** Transactional emails for key marketplace events.
**Dependencies:** M1-01
**Files involved:**
- `src/lib/email.ts` (Resend client)
- `src/modules/notifications/services/email.service.ts`
- `src/modules/notifications/templates/*.tsx` (React Email templates)

**Implementation notes:**
- Set up Resend client with API key
- Create email templates using React Email (or plain HTML strings for MVP):
  - `order-confirmation.tsx` — buyer: order placed, items, amounts
  - `order-accepted.tsx` — buyer: seller started working
  - `order-delivered.tsx` — buyer: delivery ready for review
  - `order-completed.tsx` — seller: buyer accepted, funds in clearance
  - `order-cancelled.tsx` — buyer: order cancelled, refund issued
  - `new-message.tsx` — recipient: new message in order thread
  - `review-received.tsx` — seller: new review
  - `dispute-opened.tsx` — seller/admin: dispute filed
  - `dispute-resolved.tsx` — both parties: resolution
  - `listing-approved.tsx` — seller: listing live
  - `listing-rejected.tsx` — seller: listing rejected with reason
  - `welcome.tsx` — new user registration
  - `verify-email.tsx` — email verification link
  - `password-reset.tsx` — password reset link
- `sendEmail(to, template, data)`: render template, send via Resend
- All email sends are fire-and-forget (don't block the action on email delivery)
- Use environment variable for "from" address: `noreply@amaia.com` (or similar)

**Definition of done:** All listed email templates created. Emails send on the correct events. Emails render correctly in clients.

---

#### M8-03: In-App Notification System

**Purpose:** Notification bell with unread count and notification list.
**Dependencies:** M2-01
**Files involved:**
- `src/modules/notifications/services/notification.service.ts`
- `src/modules/notifications/actions/notification.actions.ts`
- Notification bell component (in header)

**Implementation notes:**
- `createNotification(userId, type, title, body, link)`: creates Notification record
- `getNotifications(userId, page, limit)`: paginated, newest first
- `getUnreadCount(userId)`: count where isRead=false
- `markAsRead(notificationId, userId)`: set isRead=true
- `markAllAsRead(userId)`: batch update
- Notification bell in header:
  - Badge with unread count (fetched server-side in layout)
  - Dropdown/popover with recent notifications
  - Each notification: icon by type, title, time ago, link
  - Click → mark as read + navigate to link
  - "Mark all as read" button
  - "View all" link to full notifications page (optional for MVP)
- Call `createNotification()` alongside email sends in all event handlers

**Definition of done:** Bell shows correct unread count. Dropdown lists notifications. Click marks read and navigates. Count updates after actions.

---

### M9: Buyer Dashboard

#### M9-01: Buyer Dashboard Layout & Overview

**Purpose:** Dashboard shell and overview page for buyers.
**Dependencies:** M1-06, M5-03
**Files involved:**
- `src/app/(buyer)/layout.tsx`
- `src/app/(buyer)/dashboard/page.tsx`

**Implementation notes:**
- Dashboard shell: sidebar (desktop) / bottom nav or hamburger (mobile)
- Sidebar links: Overview, Orders, Downloads, Messages, Reviews, Settings
- Overview page:
  - Active orders count + list (latest 5)
  - Recent purchases
  - Quick links (Browse Marketplace, My Downloads)
  - Notification summary

**Definition of done:** Buyer dashboard renders with navigation. Overview shows real data.

---

#### M9-02: Buyer Orders Page

**Purpose:** List all buyer orders with status filters.
**Dependencies:** M7-01, M7-02
**Files involved:**
- `src/app/(buyer)/dashboard/orders/page.tsx`

**Implementation notes:**
- Reuse from M7-05. Wire up with real data.
- Tabs: All, Active (PENDING + IN_PROGRESS + DELIVERED), Completed, Cancelled, Disputed

**Definition of done:** Orders list with tabs, pagination, links to detail.

---

#### M9-03: Buyer Messages Page

**Purpose:** All buyer conversations in one place.
**Dependencies:** M7-04
**Files involved:**
- `src/app/(buyer)/dashboard/messages/page.tsx`
- `src/app/(buyer)/dashboard/messages/[id]/page.tsx`

**Implementation notes:**
- List all order message threads where buyer is participant
- Show: seller name, listing title, last message preview, unread indicator, date
- Click → full conversation thread (same message component as order detail)
- Sort by most recent message

**Definition of done:** Conversation list shows all threads. Click navigates to full thread. Unread indicator works.

---

#### M9-04: Buyer Settings Page

**Purpose:** Profile and account settings.
**Dependencies:** M1-04
**Files involved:**
- `src/app/(buyer)/dashboard/settings/page.tsx`
- `src/modules/users/actions/user.actions.ts`

**Implementation notes:**
- Form: name, email (read-only or with re-verification), avatar upload
- Password change: current password + new password + confirm
- Server actions: `updateProfile()`, `changePassword()`
- Success/error toasts

**Definition of done:** User can update name, avatar, and password.

---

### M10: Seller Dashboard

#### M10-01: Seller Dashboard Overview

**Purpose:** Seller landing page with key metrics and pending actions.
**Dependencies:** M3-06, M7-01
**Files involved:**
- `src/app/(seller)/seller/dashboard/page.tsx`

**Implementation notes:**
- Earnings cards: available balance, pending balance, total earned
  - Fetch from Stripe Connect API or calculate from completed orders
- Active orders count
- Pending actions: orders to accept, deliveries due
- Recent activity feed (latest orders, reviews, messages)
- Quick links: Create Listing, View Orders

**Definition of done:** Overview shows real earnings data, order counts, and pending actions.

---

#### M10-02: Seller Earnings & Payouts Page

**Purpose:** Detailed earnings view and payout history.
**Dependencies:** M5-03, M3-02
**Files involved:**
- `src/app/(seller)/seller/dashboard/earnings/page.tsx`
- `src/app/(seller)/seller/dashboard/earnings/payouts/page.tsx`
- `src/modules/payments/services/payout.service.ts`

**Implementation notes:**
- Earnings page:
  - Balance cards (available, pending, total)
  - Recent transactions table: order #, buyer, amount, commission, net earnings, date, status
  - Calculate from OrderItems where sellerId matches
- Payouts page:
  - Fetch from Stripe Connect API (`stripe.payouts.list()` on connected account)
  - Or track in local Payout table
  - Show: amount, date, status, Stripe reference

**Definition of done:** Earnings display correctly with commission breakdown. Payout history shows past payouts.

---

#### M10-03: Seller Reviews Page

**Purpose:** Seller can see all reviews and respond.
**Dependencies:** M8-01
**Files involved:**
- `src/app/(seller)/seller/dashboard/reviews/page.tsx`

**Implementation notes:**
- List all reviews across seller's listings
- Show: listing name, buyer name, rating, comment, date
- "Respond" button → inline form for seller response
- Aggregate stats at top: average rating, total reviews, rating distribution

**Definition of done:** Reviews list, respond functionality, aggregate stats.

---

#### M10-04: Seller Store Settings

**Purpose:** Seller can edit their public store page.
**Dependencies:** M3-01
**Files involved:**
- `src/app/(seller)/seller/dashboard/store/page.tsx`

**Implementation notes:**
- Form: store name, slug (with availability check), bio (textarea or rich text), banner upload, primary category, portfolio links
- Preview button/link to see public store page
- Server action: `updateSellerProfile()`

**Definition of done:** Seller can update all store fields. Changes reflected on public store page.

---

#### M10-05: Seller Account & Payout Settings

**Purpose:** Account settings and Stripe Connect management.
**Dependencies:** M3-02
**Files involved:**
- `src/app/(seller)/seller/dashboard/settings/page.tsx`
- `src/app/(seller)/seller/dashboard/settings/payouts/page.tsx`

**Implementation notes:**
- Account settings: same as buyer (name, email, avatar, password)
- Payout settings:
  - Stripe Connect status indicator (connected / not connected / needs update)
  - "Update bank details" → redirect to Stripe Express dashboard link (`stripe.accounts.createLoginLink()`)
  - Current payout method summary

**Definition of done:** Settings save. Stripe Connect link works for updating bank details.

---

### M11: Admin Dashboard

#### M11-01: Admin Layout & Overview

**Purpose:** Admin dashboard shell and metrics overview.
**Dependencies:** M1-06, M2-01
**Files involved:**
- `src/app/(admin)/layout.tsx`
- `src/app/(admin)/admin/page.tsx`
- `src/modules/admin/services/analytics.service.ts`

**Implementation notes:**
- Admin layout: sidebar with links (Overview, Users, Listings, Orders, Disputes, Categories, Transactions, Payouts, Settings, Audit Log)
- Overview page: metric cards
  - Total users / new this week
  - Active sellers / pending verification
  - Active listings / pending review
  - Orders this month / revenue this month
  - Open disputes
- Action queues with counts and links:
  - "X listings pending review" → /admin/listings
  - "X open disputes" → /admin/disputes
- Database aggregate queries (consider caching for performance)

**Definition of done:** Admin dashboard renders with real metrics. Navigation works.

---

#### M11-02: User Management

**Purpose:** Admin can search, view, suspend, and ban users.
**Dependencies:** M11-01
**Files involved:**
- `src/app/(admin)/admin/users/page.tsx`
- `src/app/(admin)/admin/users/[id]/page.tsx`
- `src/modules/admin/services/moderation.service.ts`
- `src/modules/admin/actions/moderation.actions.ts`

**Implementation notes:**
- User list: search by name/email, filter by role/status, paginated table
- User detail: full profile, order history, reviews, listings (if seller)
- Actions:
  - Suspend: dialog with reason + duration → set UserStatus.SUSPENDED, create AdminLog
  - Ban: dialog with reason → set UserStatus.BANNED, create AdminLog
  - Unsuspend/Unban: reverse actions
- Suspended users can't login. Banned users can't login and listings are hidden.

**Definition of done:** Admin can search users, view details, suspend/ban with logged reasons.

---

#### M11-03: Listing Moderation

**Purpose:** Admin can review, approve, and reject listings.
**Dependencies:** M11-01, M3-03
**Files involved:**
- `src/app/(admin)/admin/listings/page.tsx`
- `src/app/(admin)/admin/listings/[id]/page.tsx`

**Implementation notes:**
- Listing list: tabs (Pending Review / Flagged / All), table with title, seller, type, category, status, date
- Listing detail: full preview (render as buyer would see), seller info
- Actions:
  - Approve: set status ACTIVE, notify seller, create AdminLog
  - Reject: dialog for reason, set status REJECTED, store reason, notify seller, create AdminLog
  - Request Changes: dialog for notes, set status DRAFT, notify seller

**Definition of done:** Admin sees pending listings, can approve/reject with reasons. Sellers notified. Actions logged.

---

#### M11-04: Dispute Resolution

**Purpose:** Admin can review and resolve buyer-seller disputes.
**Dependencies:** M11-01, M7-01
**Files involved:**
- `src/app/(admin)/admin/disputes/page.tsx`
- `src/app/(admin)/admin/disputes/[id]/page.tsx`
- `src/modules/admin/services/dispute.service.ts`
- `src/modules/admin/actions/dispute.actions.ts`

**Implementation notes:**
- Dispute queue: tabs (Open / Under Review / Resolved), sorted by open date
- Dispute detail:
  - Dispute info: reason, description, date
  - Order details: listing, package, amount
  - Full message thread (read-only)
  - Deliverables (downloadable)
  - Buyer and seller history (past disputes, order count)
- Resolution form:
  - Decision dropdown: Full Refund / Release to Seller / Partial Refund
  - If partial: amount input
  - Admin notes (internal)
  - Message to parties (external)
  - Submit → process resolution:
    - Full refund: trigger Stripe refund, set OrderItem status
    - Release: complete order, start clearance
    - Partial: trigger partial Stripe refund, complete order with remainder
  - Create AdminLog

**Definition of done:** Admin can review disputes with full evidence, resolve with any option, parties notified, funds processed.

---

#### M11-05: Category Management

**Purpose:** Admin can manage the category taxonomy.
**Dependencies:** M11-01, M4-01
**Files involved:**
- `src/app/(admin)/admin/categories/page.tsx`
- `src/modules/admin/actions/moderation.actions.ts`

**Implementation notes:**
- Category tree display with parent-child nesting
- Per category: name, slug, description, icon, active toggle, listing count
- Add category: form with name, slug (auto-generate), description, parent (for subcategory), icon
- Edit category: inline edit or modal
- Delete: only if no listings use it (or soft delete / reassign)
- Reorder: sort order field, drag-to-reorder (nice-to-have, number input for MVP)

**Definition of done:** Admin can add, edit, and toggle categories. New categories available in listing forms.

---

#### M11-06: Transaction Log & Audit Log

**Purpose:** Admin can view all financial transactions and admin actions.
**Dependencies:** M11-01
**Files involved:**
- `src/app/(admin)/admin/transactions/page.tsx`
- `src/app/(admin)/admin/audit-log/page.tsx`

**Implementation notes:**
- Transaction log: paginated table of Payment records with buyer, seller, amount, fee, status, date
- Filter by date range, status
- Audit log: paginated table of AdminLog records with admin name, action, target, details, timestamp
- Filter by admin, action type, date range

**Definition of done:** Both logs render with real data, filters, and pagination.

---

### M12: Polish & Launch

#### M12-01: Responsive Design Audit

**Purpose:** Ensure all pages work on mobile, tablet, and desktop.
**Dependencies:** All previous milestones
**Files involved:** All page and component files

**Implementation notes:**
- Test every page at 320px, 640px, 1024px, 1440px
- Fix: overflow issues, touch targets < 44px, unreadable text, broken layouts
- Dashboard sidebars: verify collapse to mobile nav
- Forms: verify all inputs usable on mobile
- Tables: horizontal scroll or card layout on mobile
- Priority pages: homepage, explore, listing detail, cart, checkout, dashboard overview

**Definition of done:** No layout breaks on any page at any breakpoint. All interactive elements usable on mobile.

---

#### M12-02: Loading & Error States

**Purpose:** Professional UX with skeleton loading and error handling.
**Dependencies:** All previous milestones
**Files involved:**
- `src/components/shared/loading-skeleton.tsx`
- `src/components/shared/empty-state.tsx`
- `src/components/shared/error-boundary.tsx`
- `src/app/not-found.tsx`
- `src/app/error.tsx`
- Various `loading.tsx` files in route segments

**Implementation notes:**
- Create `loading.tsx` files for key routes (dashboard, explore, listing detail) with skeleton placeholders
- Empty states: "No orders yet", "No listings yet", etc. with CTA actions
- 404 page: branded, with search and home link
- Error boundary: generic error page with retry button
- Toast notifications for: success actions, validation errors, network errors

**Definition of done:** Every data-dependent page has a loading skeleton. Empty states guide the user. Errors are caught and displayed gracefully.

---

#### M12-03: SEO Optimization

**Purpose:** Search engine optimization for public pages.
**Dependencies:** M4
**Files involved:**
- `src/app/layout.tsx` (default metadata)
- All public page files (dynamic metadata)
- `src/app/sitemap.ts`
- `src/app/robots.ts`

**Implementation notes:**
- Default metadata in root layout: title template, default description, OG image
- Dynamic metadata per page:
  - Homepage: "AMAIA — Digital Services & Products Marketplace"
  - Listing: "[Listing Title] | AMAIA" with description from listing
  - Category: "[Category Name] — Services & Products | AMAIA"
  - Seller: "[Store Name] on AMAIA"
- `sitemap.ts`: dynamic sitemap from active listings, categories, seller stores
- `robots.ts`: allow public pages, disallow /dashboard, /admin, /api
- Canonical URLs on all pages
- JSON-LD on listing pages (Product or Service schema)

**Definition of done:** All public pages have proper meta tags. Sitemap.xml generates correctly. robots.txt configured.

---

#### M12-04: Security Hardening

**Purpose:** Final security review and hardening.
**Dependencies:** All previous milestones
**Files involved:** Various

**Implementation notes:**
- Verify: every server action validates input with Zod
- Verify: every server action checks authentication and authorization
- Verify: data queries are scoped to user's own data
- Verify: Stripe webhook signature verification working
- Verify: file uploads validate type and size
- Verify: download tokens check user ownership
- Add rate limiting to: /api/auth/*, /api/webhooks/* (use `next-rate-limit` or custom middleware)
- Review: no secrets in client-side code
- Review: no SQL injection vectors (Prisma handles this)
- Test: try accessing another user's order, listing, messages — verify 403

**Definition of done:** No unauthorized data access possible. Rate limiting active on auth routes. All inputs validated.

---

#### M12-05: Cron Jobs Setup

**Purpose:** Configure automated background tasks.
**Dependencies:** M7-06
**Files involved:**
- `vercel.json`
- `src/app/api/cron/orders/route.ts` (already built in M7-06)
- `src/app/api/cron/cleanup/route.ts`

**Implementation notes:**
- Order cron (daily): auto-complete and auto-cancel
- Cleanup cron (daily): delete expired download tokens, delete old cart items (30+ days)
- Secure cron endpoints with CRON_SECRET header check
- Vercel cron config in vercel.json:
  ```json
  { "crons": [
    { "path": "/api/cron/orders", "schedule": "0 */6 * * *" },
    { "path": "/api/cron/cleanup", "schedule": "0 3 * * *" }
  ]}
  ```

**Definition of done:** Crons configured in Vercel. Test manually by hitting endpoints. Verify logic works.

---

#### M12-06: End-to-End Testing

**Purpose:** Verify all critical flows work end-to-end.
**Dependencies:** All previous milestones
**Files involved:** N/A (manual testing)

**Implementation notes:**
Manual testing checklist (test in both desktop and mobile):

1. **Registration flow:** Register email → verify email → login → access dashboard
2. **Google OAuth:** Sign up → auto-verify → access dashboard
3. **Password reset:** Forgot → email → reset → login
4. **Seller onboarding:** Start selling → profile → Stripe Connect → create listing → pending review
5. **Listing creation (service):** All steps, save draft, submit, verify packages
6. **Listing creation (product):** All steps, file upload, verify file stored
7. **Browse & search:** Keywords, filters, sort, pagination, category pages
8. **Purchase product:** Browse → add to cart → checkout → Stripe → download file
9. **Purchase service:** Browse → select package → add-ons → checkout → Stripe → order created
10. **Service fulfillment:** Seller accepts → delivers → buyer accepts → completed
11. **Revision flow:** Seller delivers → buyer requests revision → seller re-delivers → accept
12. **Messaging:** Send messages in order, attach files, receive notifications
13. **Reviews:** Leave review → seller responds → rating updates
14. **Dispute:** Open dispute → admin resolves → funds processed
15. **Admin moderation:** Approve listing → reject listing → suspend user
16. **Payouts:** Verify earnings calculate correctly, Stripe Connect dashboard accessible

**Definition of done:** All 16 flows pass without errors. No broken pages or dead links.

---

#### M12-07: Production Deployment & Launch

**Purpose:** Final deployment and go-live.
**Dependencies:** M12-01 through M12-06
**Files involved:** Vercel configuration, DNS

**Implementation notes:**
- Final Vercel deploy from main branch
- Configure custom domain (if ready)
- Verify all env vars are production values (not test)
- Switch Stripe to live mode (or keep test mode for soft launch)
- Verify cron jobs are running
- Verify email sending works with production domain
- Set up error monitoring (Sentry free tier)
- Create first admin account in production database
- Seed production categories
- Test one real purchase flow end-to-end in production

**Definition of done:** Production site accessible, all features working, monitoring active, ready for first users.

---

## 4. Task Summary by Domain

### Database Tasks
M2-01, M2-02, M2-03

### Auth Tasks
M1-04, M1-05, M12-04 (security hardening)

### Backend Tasks (Services & Actions)
M3-01, M3-02, M4-01, M5-01, M5-02, M5-03, M6-01, M6-02, M7-01, M7-04, M7-06, M8-01, M8-02, M8-03

### Frontend Tasks (Pages & Components)
M1-02, M1-06, M3-03, M3-04, M3-05, M3-06, M4-02, M4-03, M4-04, M4-05, M4-06, M4-07, M4-08, M5-01 (cart page), M5-04, M6-03, M7-02, M7-03, M7-05, M9-01, M9-02, M9-03, M9-04, M10-01, M10-02, M10-03, M10-04, M10-05, M11-01, M11-02, M11-03, M11-04, M11-05, M11-06

### Seller Dashboard Tasks
M3-06, M3-05, M7-03, M7-05 (seller), M10-01, M10-02, M10-03, M10-04, M10-05

### Buyer Dashboard Tasks
M9-01, M9-02, M9-03, M9-04, M6-03, M7-02, M7-05 (buyer)

### Admin Dashboard Tasks
M11-01, M11-02, M11-03, M11-04, M11-05, M11-06

### Payment / Checkout Tasks
M3-02, M5-01, M5-02, M5-03, M5-04, M10-02

### File Delivery Tasks
M6-01, M6-02, M6-03

### Service Fulfillment Tasks
M7-01, M7-02, M7-03, M7-04, M7-05, M7-06

### Testing Tasks
M12-06

### Deployment Tasks
M1-07, M12-05, M12-07

---

*Each task is designed to be picked up independently with clear inputs, outputs, and definition of done. Tasks within a milestone are sequential unless otherwise noted. Tasks across milestones follow the dependency chain in the build order.*
