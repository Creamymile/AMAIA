# AMAIA — Product Specification Document

> Digital Services & Digital Products Marketplace
> Version 1.0 — March 2026

---

## 1. Product Vision

### What is AMAIA?

AMAIA is a curated digital marketplace where freelancers, creators, and digital sellers offer AI-era services and digital products to businesses, solopreneurs, and professionals who need practical digital solutions — fast.

Unlike horizontal freelance platforms (Fiverr, Upwork) that sprawl across every category, AMAIA focuses on the intersection of **AI, automation, and digital productivity** — the exact categories growing fastest right now but poorly served by generalist platforms.

### Who is it for?

**Sellers:**
- AI automation specialists who build Zapier/Make/n8n workflows
- Prompt engineers selling services or packaged prompt libraries
- Web designers/developers offering landing page and site setup packages
- Chatbot builders (GPT wrappers, Voiceflow, Botpress)
- Digital product creators (Notion templates, spreadsheets, UI kits, ebooks)
- Designers offering editing, branding, and creative services

**Buyers:**
- Solopreneurs and small business owners who need digital solutions but lack technical skills
- Marketing teams looking for automation and AI integration
- Content creators needing templates, tools, and design assets
- Startup founders bootstrapping with done-for-you digital services

### What problem does it solve?

1. **For buyers:** Finding quality AI/automation/digital services is scattered across Twitter DMs, Gumroad, Fiverr, and random landing pages. There's no single trusted destination to compare, purchase, and manage these services.

2. **For sellers:** Existing platforms either take massive commissions (Fiverr at 20%), offer poor discoverability, or require sellers to manage their own storefronts with no built-in trust layer.

3. **For the market:** The AI tools ecosystem is exploding but the marketplace infrastructure hasn't caught up. Someone selling a GPT prompt pack today has to choose between Gumroad (no discovery), Etsy (wrong audience), or Twitter (no infrastructure).

### Value Proposition

- **Buyers get** a curated, trustworthy place to find and purchase digital-era services and products with clear pricing, verified sellers, and buyer protection.
- **Sellers get** a professional storefront with built-in audience, lower commissions than competitors, and tools designed for digital/AI service delivery.
- **The platform** captures the fastest-growing segment of the freelance/creator economy before incumbents adapt.

### Why this niche is strong

- The AI tools market is projected to exceed $300B by 2027. Every business needs AI integration but most can't build it themselves.
- Digital products have zero marginal cost — sellers can sell infinitely, and the platform earns on every transaction.
- Services in this niche are high-value ($50–$5,000+) meaning healthy transaction fees even at lower commission rates.
- The niche is specific enough to build community and trust, but broad enough to support a large marketplace.
- Existing platforms haven't specialized here — Fiverr's "AI Services" category is an afterthought, not a core focus.

---

## 2. Business Model

### Revenue Streams

#### 1. Transaction Commission (Primary — MVP)
| Seller Tier | Commission Rate |
|---|---|
| Standard Seller | 12% |
| Verified Seller | 10% |
| Pro Seller (subscription) | 8% |

This is lower than Fiverr's 20% and competitive enough to attract sellers while sustaining the business.

**On digital products:** Commission applies per sale. Since digital products have zero fulfillment cost, even 12% is attractive to sellers compared to Gumroad's flat fee model — because AMAIA provides discovery.

**On services:** Commission applies to the total order value including any package add-ons.

#### 2. Featured Listings (Phase 2)
- **Spotlight placement:** $15–$50/week to appear in category hero sections or search results
- **Homepage features:** $50–$100/week for premium homepage carousel placement
- This is pure margin revenue and familiar to sellers from Etsy/eBay models

#### 3. Seller Subscription — "AMAIA Pro" (Phase 2)
| Plan | Price | Benefits |
|---|---|---|
| Free | $0 | 12% commission, 5 active listings, basic analytics |
| Pro | $19/mo | 8% commission, unlimited listings, priority support, analytics dashboard, custom store URL |
| Business | $49/mo | 8% commission, team accounts, API access, white-label invoices, bulk upload |

#### 4. Digital Product Transaction Model
- Buyer pays listed price → platform takes commission → seller receives payout
- Instant delivery via secure download links (time-limited, count-limited)
- No recurring fees for buyers — one-time purchases unless seller offers bundles

#### 5. Service Package Model
- Sellers create 1–3 tier packages (Basic / Standard / Premium)
- Optional add-ons and custom quotes
- Milestone-based payments for larger orders (Phase 2)
- Platform holds funds in escrow until delivery is accepted

### MVP Monetization Strategy

**Start with transaction commission only.** 12% flat rate for all sellers.

Rationale:
- Zero barrier to entry for sellers — they only pay when they earn
- Simple to implement — one Stripe Connect integration
- Aligns platform incentives with seller success
- Generates revenue from day one of first transaction
- Avoid subscription complexity until there's enough seller demand to justify tiers

Add featured listings and Pro subscriptions only after reaching ~200 active sellers and proving transaction volume.

---

## 3. User Roles

### Guest (Unauthenticated)

**Goals:** Discover what the platform offers, evaluate if it's worth signing up, find a specific service or product.

**Permissions:**
- Browse all public listings
- View seller profiles and reviews
- Search and filter catalog
- View pricing and packages
- Read platform pages (about, FAQ, how it works)

**Actions:**
- Search, filter, sort listings
- View listing detail pages
- View seller store pages
- Prompted to sign up/login when attempting purchase, messaging, or review

**Dashboard:** None — guests see public pages only.

---

### Buyer (Authenticated, role: BUYER)

**Goals:** Find, compare, and purchase digital services/products. Manage orders, communicate with sellers, leave reviews.

**Permissions:**
- Everything a guest can do
- Add items to cart
- Purchase listings (services and products)
- Send messages to sellers
- Leave reviews on completed orders
- Manage own profile and order history
- Download purchased digital products
- Open disputes on orders
- Save/favorite listings

**Actions:**
- Complete checkout (Stripe)
- Send/receive messages in order threads
- Download digital files from completed purchases
- Request revisions on service orders
- Accept/reject service deliveries
- Rate and review completed orders
- Manage saved listings and purchase history

**Dashboard Needs:**
- Active orders with status tracking
- Purchase history
- Digital product library (all purchased downloads)
- Messages / conversations
- Saved/favorited listings
- Profile settings
- Notifications center

---

### Seller (Authenticated, role: SELLER)

**Goals:** Create and manage listings, fulfill orders, grow reputation, earn money.

**Permissions:**
- Everything a buyer can do (sellers can also buy)
- Create, edit, publish, unpublish, delete own listings
- Set pricing and packages
- Upload digital product files
- Respond to order inquiries
- Deliver service orders
- View earnings and request payouts
- Access seller analytics

**Actions:**
- Complete seller onboarding (profile, store setup, Stripe Connect)
- Create service listings with up to 3 pricing tiers
- Create digital product listings with file uploads
- Manage active orders (accept, deliver, communicate)
- Upload deliverables for service orders
- View and respond to reviews
- Track earnings, pending payouts, and payout history
- Manage store page (bio, banner, portfolio)

**Dashboard Needs:**
- Order management (new, in-progress, delivered, completed, disputed)
- Listing management (draft, active, paused)
- Earnings overview (available, pending, withdrawn)
- Messages / conversations
- Reviews received
- Analytics (views, conversion, revenue — Phase 2)
- Store settings
- Payout settings (Stripe Connect)
- Notifications center

---

### Admin (Authenticated, role: ADMIN)

**Goals:** Ensure platform quality, resolve disputes, moderate content, monitor health.

**Permissions:**
- Full read access to all entities
- Approve/reject seller applications
- Approve/reject/flag listings
- Suspend/ban users
- Resolve disputes (refund, release, split)
- Manage categories and tags
- View platform-wide analytics
- Manage featured listings
- Access admin audit logs

**Actions:**
- Review seller verification queue
- Review flagged/reported listings
- Moderate reviews
- Process disputes (view evidence, communicate, resolve)
- Manage category taxonomy
- View platform revenue and transaction logs
- Manage platform settings and content (FAQ, terms, etc.)
- Ban/suspend users with reason logging

**Dashboard Needs:**
- Overview metrics (users, listings, orders, revenue, disputes)
- Seller verification queue
- Listing moderation queue
- Dispute resolution center
- User management (search, view, suspend, ban)
- Category/tag management
- Transaction logs
- Admin activity audit log
- Platform settings

---

## 4. Marketplace Model

### Service Listings

A service listing represents work a seller performs for a buyer. Structure:

- **Title** — clear, searchable (e.g., "I will build a custom Zapier automation for your business")
- **Description** — rich text with what's included, process, timeline
- **Category + Subcategory** — single primary category
- **Tags** — up to 5 freeform tags for discoverability
- **Gallery** — up to 6 images/screenshots showcasing past work
- **Packages** — 1 to 3 pricing tiers (see below)
- **Add-ons** — optional extras buyers can add (e.g., "Extra revision: $20", "Rush delivery: $50")
- **FAQ** — seller-defined Q&A pairs
- **Delivery time** — per package, in days

### Digital Product Listings

A digital product listing represents a downloadable item. Structure:

- **Title** — (e.g., "150 ChatGPT Prompts for Real Estate Agents")
- **Description** — rich text with what's included, preview, use cases
- **Category + Subcategory**
- **Tags** — up to 5
- **Gallery** — up to 6 images (previews, mockups, screenshots)
- **Price** — single price point (no tiers for MVP; bundles in Phase 2)
- **Files** — uploaded product files (PDF, ZIP, etc.) stored securely
- **File format info** — what the buyer receives (e.g., "3 PDF files, 1 Notion template link")
- **Instant delivery** — automatic upon payment confirmation

### Packages / Pricing Tiers (Services Only)

| Field | Basic | Standard | Premium |
|---|---|---|---|
| Name | Customizable | Customizable | Customizable |
| Description | What's included | What's included | What's included |
| Price | $X | $Y | $Z |
| Delivery Time | X days | Y days | Z days |
| Revisions | N | N | N |
| Features | Checklist | Checklist | Checklist |

Sellers must create at least 1 package. Maximum 3. This mirrors the proven Fiverr model but with cleaner UX.

### Instant Download Products

- Buyer clicks "Buy Now" → Stripe checkout → payment confirmed → download link generated
- Download links are **time-limited** (72 hours) and **count-limited** (5 downloads)
- Buyer can always re-access downloads from their "Digital Library" dashboard
- Files are stored in S3/Cloudinary with signed URLs — never publicly accessible
- File size limit: 500MB per product (covers ebooks, templates, asset packs)

### Custom Order Inquiry

- Any listing can have a "Contact Seller" option
- Buyers can send a message describing custom needs
- Sellers can respond with a **custom offer**: description, price, delivery time
- Custom offers appear as a special message type the buyer can accept/decline
- Accepted custom offers create an order just like a package purchase

### Seller Verification

**Levels:**

1. **New Seller** — just signed up, completed basic profile. No badge. Listings go through manual review for first 3 listings.
2. **Verified Seller** — identity verified (email + optional ID check), at least 3 completed orders, 4.0+ rating. Gets a verification badge. Lower commission (10%).
3. **Pro Seller** (Phase 2) — invite-only or application-based for top performers. Premium badge, featured placement, lowest commission.

**Verification process (MVP):**
- Email verification (required)
- Profile completeness check (bio, avatar, at least 1 listing)
- First 3 listings require admin approval
- After 3 successful orders + 4.0 rating → auto-upgrade to Verified

### Reviews & Ratings

- Buyers can review after order completion (service delivered + accepted, or digital product purchased)
- **5-star rating** + written review
- Sellers can respond to reviews (one response per review)
- Reviews are public on the listing and seller profile
- Aggregate rating shown on listing cards
- Minimum 3 reviews before aggregate score is displayed
- Reviews cannot be edited after 48 hours
- Fraudulent reviews can be reported and admin-moderated

### Payouts & Earnings

- Platform uses **Stripe Connect** (Express accounts for sellers)
- Funds are held for a **clearance period** after order completion:
  - Digital products: 3 days (short because delivery is instant and verifiable)
  - Services: 7 days (longer to allow for disputes)
- After clearance, funds move to seller's "Available Balance"
- Sellers can withdraw to their connected Stripe account
- Minimum withdrawal: $10
- Payout schedule: on-demand or automatic weekly (seller's choice)
- Platform commission is deducted before funds reach seller's available balance

---

## 5. Core Features

### MVP (Launch)

| Feature | Why MVP |
|---|---|
| User registration/login (email + Google OAuth) | Core functionality — no users, no platform |
| Role-based access (Guest, Buyer, Seller, Admin) | Security and UX foundation |
| Seller onboarding flow | Sellers need to exist before buyers have value |
| Service listing creation (with packages) | Core product — this is what people buy |
| Digital product listing creation (with file upload) | Second core product type |
| Category and tag system | Discoverability — useless marketplace without it |
| Search with filters (category, price, rating, type) | Buyers need to find what they want |
| Listing detail pages | Where purchase decisions happen |
| Seller store/profile pages | Trust building, portfolio showcase |
| Shopping cart | Buyers may want multiple items |
| Stripe checkout (one-time payments) | Revenue — the whole point |
| Stripe Connect seller payouts | Sellers won't list without getting paid |
| Digital product instant delivery (secure downloads) | Core digital product experience |
| Service order management (accept, deliver, complete) | Core service workflow |
| Order status tracking | Both sides need visibility |
| Buyer-seller messaging (per-order) | Communication is essential for services |
| Review and rating system | Trust and quality signals |
| Buyer dashboard (orders, downloads, messages) | Buyer home base |
| Seller dashboard (orders, listings, earnings) | Seller home base |
| Admin dashboard (users, listings, orders, disputes) | Platform management |
| Basic dispute system (open, admin review, resolve) | Buyer protection = trust |
| Email notifications (order updates, messages) | Users need to know things happened |
| Responsive, mobile-first UI | Non-negotiable in 2026 |
| Public pages (home, about, how it works, FAQ) | Marketing and SEO entry points |

### Phase 2 (Post-Launch, Month 2–4)

| Feature | Why Phase 2 |
|---|---|
| Featured/promoted listings | Revenue stream #2 — needs existing inventory |
| Seller Pro subscription tiers | Revenue stream #3 — needs seller base |
| Advanced search (full-text, autocomplete) | Enhancement, not blocker |
| Seller analytics dashboard | Nice for retention, not critical for launch |
| Custom offers via messaging | Extension of messaging system |
| Milestone-based payments for large orders | Complexity — MVP orders are simpler |
| Wishlist/favorites for buyers | Engagement feature |
| Seller verification badges | Needs order history to be meaningful |
| Category landing pages (SEO) | Growth/SEO optimization |
| Social login expansion (GitHub, Twitter) | Convenience, not critical |
| In-app notification center | Email is sufficient for MVP |
| Order revision requests | Process refinement |
| Bulk listing management for sellers | Efficiency — needs seller feedback first |

### Nice-to-Have (Month 4+)

| Feature | Notes |
|---|---|
| AI-powered search and recommendations | High value but high complexity |
| Seller team accounts | For agencies — need business tier |
| API for sellers (listing management) | Power seller feature |
| Affiliate/referral program | Growth channel |
| Multi-currency support | International expansion |
| Video consultations (integrated) | Service delivery enhancement |
| Subscription-based digital products | Recurring revenue model |
| Seller badges and gamification | Community engagement |
| Public API for integrations | Platform play |
| Mobile app (React Native) | When mobile traffic justifies it |
| Escrow with milestone splits | Complex payment flows |
| White-label invoicing | Business tier feature |

---

## 6. Sitemap

### Public Pages
```
/                                   → Homepage (hero, featured, categories, how it works)
/explore                            → Browse all listings (search, filter, sort)
/explore?type=service               → Browse services
/explore?type=product               → Browse digital products
/category/[slug]                    → Category page
/category/[slug]/[subcategory]      → Subcategory page
/listing/[slug]                     → Listing detail page
/seller/[username]                  → Seller store/profile page
/about                              → About AMAIA
/how-it-works                       → How it works (buyers + sellers)
/pricing                            → Seller pricing/commission info
/faq                                → Frequently asked questions
/terms                              → Terms of service
/privacy                            → Privacy policy
/contact                            → Contact form
/blog                               → Blog/resources (Phase 2)
/blog/[slug]                        → Blog post (Phase 2)
```

### Auth Pages
```
/login                              → Email + OAuth login
/register                           → Buyer registration
/register/seller                    → Seller registration
/forgot-password                    → Password reset request
/reset-password                     → Password reset form
/verify-email                       → Email verification callback
```

### Buyer Dashboard
```
/dashboard                          → Buyer overview (recent orders, quick links)
/dashboard/orders                   → All orders (filterable by status)
/dashboard/orders/[id]              → Order detail (status, messages, deliverables)
/dashboard/downloads                → Digital product library
/dashboard/messages                 → All conversations
/dashboard/messages/[id]            → Conversation thread
/dashboard/reviews                  → Reviews I've left
/dashboard/favorites                → Saved listings (Phase 2)
/dashboard/settings                 → Profile settings
/dashboard/settings/notifications   → Notification preferences
```

### Seller Dashboard
```
/seller/dashboard                   → Seller overview (earnings, active orders, stats)
/seller/dashboard/listings          → All my listings (draft, active, paused)
/seller/dashboard/listings/new      → Create new listing
/seller/dashboard/listings/[id]/edit → Edit listing
/seller/dashboard/orders            → All orders received
/seller/dashboard/orders/[id]       → Order detail (deliver, communicate)
/seller/dashboard/earnings          → Earnings overview
/seller/dashboard/earnings/payouts  → Payout history
/seller/dashboard/messages          → All conversations
/seller/dashboard/messages/[id]     → Conversation thread
/seller/dashboard/reviews           → Reviews received
/seller/dashboard/analytics         → Analytics (Phase 2)
/seller/dashboard/store             → Store settings (bio, banner, URL)
/seller/dashboard/settings          → Account settings
/seller/dashboard/settings/payouts  → Stripe Connect setup
```

### Admin Dashboard
```
/admin                              → Admin overview (metrics, queues)
/admin/users                        → User management (search, filter)
/admin/users/[id]                   → User detail (profile, orders, actions)
/admin/listings                     → Listing moderation (pending, flagged)
/admin/listings/[id]                → Listing review (approve, reject, flag)
/admin/orders                       → All platform orders
/admin/orders/[id]                  → Order detail
/admin/disputes                     → Dispute queue
/admin/disputes/[id]                → Dispute detail (evidence, resolve)
/admin/categories                   → Category management
/admin/transactions                 → Transaction log
/admin/payouts                      → Payout monitoring
/admin/settings                     → Platform settings
/admin/audit-log                    → Admin activity log
```

---

## 7. User Flows

### 7.1 Buyer Browsing & Purchase Flow (Digital Product)

```
1. Buyer lands on homepage (or search engine → category page)
2. Browses categories or uses search bar
3. Applies filters: type=Product, category, price range, rating
4. Views listing cards in grid (thumbnail, title, price, rating, seller)
5. Clicks listing → Listing detail page
   - Views description, preview images, file format info
   - Reads reviews
   - Views seller profile snippet
6. Clicks "Buy Now" or "Add to Cart"
   → If not logged in: redirect to /login with return URL
   → If logged in: item added to cart (toast confirmation)
7. Goes to cart → reviews items → clicks "Checkout"
8. Stripe Checkout session:
   - Confirms payment method
   - Sees order summary (items, platform total)
   - Completes payment
9. Redirect to order confirmation page
   - "Your purchase is complete!"
   - Download button(s) immediately available
   - Download link also sent via email
10. Product appears in /dashboard/downloads permanently
11. After 24 hours: prompted to leave a review
```

### 7.2 Buyer Service Booking / Order Flow

```
1. Buyer finds service listing (via browse/search)
2. Views listing detail page
   - Compares packages (Basic / Standard / Premium)
   - Reviews included features, delivery time, revisions
   - Optionally selects add-ons
3. Selects package → clicks "Continue" → Order summary page
   - Package details, add-ons, total price, estimated delivery
4. Clicks "Place Order" → Stripe Checkout
   - Payment processed, funds held by platform
5. Order created with status: PENDING
   - Seller notified via email + in-app
6. Seller accepts order → status: IN_PROGRESS
   - Buyer sees "Seller is working on your order"
   - Delivery countdown begins
7. Buyer and seller communicate via order message thread
   - Buyer can share requirements, files, clarifications
8. Seller uploads deliverables → clicks "Deliver Order"
   - Status: DELIVERED
   - Buyer notified
9. Buyer reviews deliverables:
   - Option A: "Accept Delivery" → status: COMPLETED
     - Funds released to seller (after clearance period)
     - Buyer prompted to leave review
   - Option B: "Request Revision" (if revisions remaining)
     - Status returns to IN_PROGRESS
     - Seller revises and re-delivers
   - Option C: No response in 5 days → auto-completed
10. If dispute: buyer opens dispute → status: DISPUTED
    - Admin reviews → resolves (refund / release / partial)
```

### 7.3 Seller Onboarding Flow

```
1. User clicks "Start Selling" on homepage or nav
2. Redirect to /register/seller (or upgrade existing buyer account)
3. Step 1: Account basics
   - Name, email, password (or OAuth)
   - Email verification sent
4. Step 2: Seller profile setup
   - Display name / store name
   - Avatar upload
   - Bio / description (what you offer, your expertise)
   - Primary category selection
   - Portfolio links (optional)
5. Step 3: Payout setup
   - Stripe Connect onboarding (Express)
   - Seller connects bank account / card via Stripe's hosted flow
6. Step 4: Create first listing
   - Guided flow to create first service or product listing
   - Required before store goes live
7. Listing submitted for review (first 3 listings require admin approval)
8. Admin approves → listing goes live
9. Seller dashboard is now fully active
```

### 7.4 Seller Listing Creation Flow

```
1. Seller clicks "Create Listing" from dashboard
2. Step 1: Choose type
   - "Service" or "Digital Product"
3A. Service listing:
   - Title
   - Category + subcategory
   - Description (rich text editor)
   - Tags (up to 5)
   - Gallery images (up to 6)
   - Package builder:
     - At least 1 package (Basic)
     - Optional Standard and Premium
     - For each: name, description, price, delivery days, revisions, feature checklist
   - Add-ons (optional): name, price
   - FAQ pairs (optional)
   - Save as draft or submit for review

3B. Digital product listing:
   - Title
   - Category + subcategory
   - Description (rich text editor)
   - Tags (up to 5)
   - Gallery images (up to 6, including previews/mockups)
   - Price
   - File upload (drag & drop, up to 500MB)
   - File format description (what buyer receives)
   - Save as draft or submit for review

4. If seller has <3 approved listings: goes to admin review queue
5. If seller has 3+ approved listings: auto-published (flagged listings still reviewed)
6. Listing appears in seller's listing management page with status indicator
```

### 7.5 Checkout Flow

```
1. Buyer has item(s) in cart
   - Digital products: shows item + price
   - Services: shows package + add-ons + price
2. Cart page: review items, remove items, see totals
3. Click "Proceed to Checkout"
   → If not logged in: redirect to login, then back to checkout
4. Order summary page:
   - Line items with prices
   - Platform fees (hidden from buyer — included in price)
   - Total amount
5. Click "Pay Now" → Stripe Checkout (hosted or embedded)
   - Card payment
   - Stripe handles SCA/3DS if needed
6. On success:
   - Stripe webhook confirms payment
   - Order(s) created in database
   - Digital products: download links generated immediately
   - Services: order status set to PENDING, seller notified
   - Buyer redirected to confirmation page
7. On failure:
   - Error message displayed
   - Cart preserved
   - Buyer can retry
```

### 7.6 Order Delivery Flow (Service)

```
1. Seller sees new order in dashboard (status: PENDING)
2. Seller reviews requirements from buyer's initial message
3. Seller clicks "Accept Order" → status: IN_PROGRESS
   (or "Decline Order" with reason → buyer notified, auto-refund)
4. Seller works on deliverables
   - Can message buyer for clarification
   - Can share work-in-progress if needed
5. Seller uploads deliverables (files, links, text)
6. Seller clicks "Deliver Order" → status: DELIVERED
7. Buyer reviews:
   - Accept → COMPLETED → funds to seller (after clearance)
   - Request revision → back to IN_PROGRESS (decrement revision count)
   - No action in 5 days → auto-COMPLETED
   - Dispute → DISPUTED → admin queue
8. After COMPLETED:
   - Clearance period (7 days)
   - Funds move to seller's available balance
   - Both parties prompted for review
```

### 7.7 Admin Moderation Flow

```
1. Admin logs into /admin
2. Overview dashboard shows:
   - Pending seller verifications: X
   - Listings awaiting review: X
   - Open disputes: X
   - Flagged content: X

3A. Listing moderation:
   - Admin opens listing review queue
   - Views listing details (description, images, pricing)
   - Checks for policy violations (prohibited content, misleading claims)
   - Actions: Approve / Reject (with reason) / Request Changes
   - Seller notified of decision

3B. Dispute resolution:
   - Admin opens dispute detail
   - Views order history, messages, deliverables
   - Views buyer's complaint and seller's response
   - Can message either party for clarification
   - Resolution options:
     - Full refund to buyer (seller keeps nothing)
     - Release funds to seller (buyer's claim denied)
     - Partial refund (split amount)
   - Resolution recorded with reason in audit log

3C. User moderation:
   - Admin searches/browses user list
   - Can view any user's profile, orders, reviews, listings
   - Actions: Warn / Suspend (temporary) / Ban (permanent)
   - All actions logged in audit trail with reason

4. All admin actions are logged with:
   - Admin user ID
   - Action taken
   - Target entity
   - Reason/notes
   - Timestamp
```

---

## 8. Technical Architecture

### Architecture Overview: Modular Monolith

AMAIA is built as a **modular monolith** — a single Next.js application with clearly separated internal modules. Each module owns its domain logic, data access, and API routes, but they all deploy as one unit.

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js Application                    │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │   Auth    │ │ Listings │ │  Orders  │ │ Payments │   │
│  │  Module   │ │  Module  │ │  Module  │ │  Module  │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Messaging│ │ Reviews  │ │  Admin   │ │  Upload  │   │
│  │  Module   │ │  Module  │ │  Module  │ │  Module  │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│  ┌──────────┐ ┌──────────┐                              │
│  │  Users   │ │  Notif.  │                              │
│  │  Module   │ │  Module  │                              │
│  └──────────┘ └──────────┘                              │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │              Shared Kernel (lib/shared)             │  │
│  │  - Prisma client  - Auth utilities  - Types        │  │
│  │  - Validation schemas  - Error handling            │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │    PostgreSQL     │  │   S3 / Cloudinary│             │
│  │    (via Prisma)   │  │   (file storage) │             │
│  └──────────────────┘  └──────────────────┘             │
│                                                          │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │  Stripe Connect  │  │  Email (Resend)  │             │
│  └──────────────────┘  └──────────────────┘             │
└─────────────────────────────────────────────────────────┘
```

### App Layers

```
1. Presentation Layer (React Server Components + Client Components)
   └── Pages, layouts, UI components
   └── Form handling, client-side validation

2. API Layer (Next.js Route Handlers + Server Actions)
   └── Request validation (Zod)
   └── Auth checks
   └── Calls module services

3. Service Layer (per-module business logic)
   └── Domain logic, business rules
   └── Orchestrates data access and external services
   └── Returns typed results

4. Data Access Layer (Prisma)
   └── Database queries
   └── Encapsulated per module

5. Infrastructure Layer
   └── External service clients (Stripe, S3, email)
   └── Shared utilities
```

### Module Boundaries

Each module is a folder under `src/modules/` containing:
- `services/` — business logic functions
- `actions/` — Next.js server actions
- `schemas/` — Zod validation schemas
- `types/` — module-specific TypeScript types
- `utils/` — module-specific helpers

**Module communication rules:**
- Modules communicate through their public service interfaces, never by directly accessing another module's database queries.
- The shared kernel (`lib/`) provides cross-cutting concerns: auth, database client, error types.
- No circular dependencies between modules. Dependency direction: Payments → Orders → Listings → Users.

### Frontend Architecture

- **Next.js App Router** with React Server Components (RSC) as the default
- **Client Components** only where needed: forms, interactive UI, real-time updates
- **shadcn/ui** for all base components — consistent, accessible, customizable
- **Tailwind CSS** for all styling — no CSS modules or styled-components
- **Layout composition:** shared layouts for dashboard shells (buyer, seller, admin) with nested layouts for sub-sections
- **Data fetching:** Server Components fetch data directly via service layer (no API round-trip). Client-side mutations via Server Actions.
- **Forms:** React Hook Form + Zod for client validation, Server Actions for submission
- **State management:** URL search params for filter/sort state, React context only for truly global client state (cart, toast notifications). No Redux or Zustand needed.
- **Optimistic updates:** For actions like favoriting, marking notifications read

### Backend Architecture

- **Next.js Route Handlers** (`app/api/`) for webhook endpoints (Stripe, etc.) and any external API needs
- **Server Actions** for all form submissions and mutations from the UI — these are the primary "API" for the frontend
- **No separate backend.** The modular monolith means business logic lives in `src/modules/` and is called by Server Actions and Route Handlers
- **Prisma ORM** for all database access — type-safe, migration-friendly
- **Zod schemas** validate all inputs at the boundary (server actions, route handlers)

### Auth and RBAC

**Auth.js (NextAuth v5)** handles authentication:
- Providers: Email (magic link or credentials) + Google OAuth
- Session strategy: JWT (stored in httpOnly cookie)
- Session includes: `userId`, `role`, `email`

**RBAC implementation:**
```
Roles: GUEST | BUYER | SELLER | ADMIN

Middleware (middleware.ts):
  - Checks session on every request
  - Protects route groups:
    /dashboard/*    → requires BUYER or SELLER
    /seller/*       → requires SELLER
    /admin/*        → requires ADMIN
  - Redirects unauthorized users to /login

Server Action level:
  - Each action checks role before executing
  - Helper: assertRole(session, 'SELLER') throws if wrong role

Data level:
  - Queries scoped to user's own data (buyer sees own orders, seller sees own listings)
  - Admin queries have no scope restriction
```

**Role transitions:**
- New signup → BUYER (default)
- Buyer completes seller onboarding → SELLER (sellers retain all buyer permissions)
- ADMIN is assigned manually in database (no self-service admin creation)

### Payment Flow

```
PURCHASE:
  Buyer clicks Pay
    → Server Action creates Stripe Checkout Session
      - line_items from cart
      - metadata: orderId, buyerId, sellerId(s)
      - For services: payment_intent_data.capture_method = 'automatic'
      - application_fee_amount = commission percentage
      - transfer_data.destination = seller's Stripe Connect account ID
    → Redirect to Stripe Checkout

  Stripe Checkout completes
    → Stripe sends checkout.session.completed webhook
    → Route Handler /api/webhooks/stripe:
      - Verifies webhook signature
      - Creates/updates Order records
      - For digital products: generates download tokens
      - For services: sets order status to PENDING
      - Sends notification emails

PAYOUTS:
  - Using Stripe Connect Express accounts
  - Stripe handles payout to seller's bank automatically
  - Platform takes commission via application_fee_amount
  - Seller sees earnings after clearance period in dashboard
  - Dashboard reads from Stripe Connect API for balance/payout data
```

### Digital Download Delivery Logic

```
1. Seller uploads file during listing creation
   → File uploaded to S3 (private bucket, no public access)
   → S3 key stored in DigitalProductFile table

2. Buyer completes purchase
   → Server generates a download token (UUID, stored in DB)
   → Token linked to: buyer ID, order ID, file ID
   → Token has: max_downloads (5), expires_at (72 hours)

3. Buyer clicks "Download"
   → GET /api/downloads/[token]
   → Server validates:
     - Token exists and belongs to requesting user
     - Token not expired
     - Download count not exceeded
   → Server generates S3 signed URL (15 min expiry)
   → Redirect to signed URL (or stream through server for extra security)
   → Increment download count

4. Re-download from library:
   → Buyer visits /dashboard/downloads
   → Server generates fresh token if old one expired
   → Same download flow
```

### Service Order Logic

```
State machine:

  PENDING → (seller accepts) → IN_PROGRESS
  PENDING → (seller declines) → CANCELLED (auto-refund)
  PENDING → (48hr no response) → CANCELLED (auto-refund)
  IN_PROGRESS → (seller delivers) → DELIVERED
  DELIVERED → (buyer accepts) → COMPLETED
  DELIVERED → (buyer requests revision, if remaining) → IN_PROGRESS
  DELIVERED → (5 days no response) → COMPLETED (auto-accept)
  COMPLETED → (clearance period) → FUNDS_RELEASED
  ANY → (buyer disputes) → DISPUTED
  DISPUTED → (admin resolves) → REFUNDED | COMPLETED | PARTIAL_REFUND
```

### Notification System

**MVP: Email-only + in-app indicators**

Events that trigger notifications:
- New order placed (→ seller)
- Order accepted/declined (→ buyer)
- Order delivered (→ buyer)
- Delivery accepted (→ seller)
- Revision requested (→ seller)
- New message in order thread (→ other party)
- Dispute opened (→ other party + admin)
- Dispute resolved (→ both parties)
- Payout processed (→ seller)
- Listing approved/rejected (→ seller)
- Review received (→ seller)

**Implementation:**
- `Notification` table in database (userId, type, title, body, link, read, createdAt)
- Server Actions create notification records when events occur
- Email sent via Resend (or similar) for important notifications
- Dashboard shows notification bell with unread count
- Phase 2: real-time via Server-Sent Events or polling

### File Upload Strategy

**Service: S3 (recommended) or Cloudinary**

| File Type | Storage | Max Size | Accepted Formats |
|---|---|---|---|
| Profile avatars | S3/Cloudinary | 5MB | JPG, PNG, WebP |
| Listing gallery images | S3/Cloudinary | 10MB each | JPG, PNG, WebP |
| Digital product files | S3 (private) | 500MB | ZIP, PDF, any |
| Service deliverables | S3 (private) | 200MB | ZIP, PDF, any |
| Store banners | S3/Cloudinary | 10MB | JPG, PNG, WebP |

**Upload flow:**
1. Client requests presigned upload URL from server action
2. Server validates auth, generates S3 presigned POST URL
3. Client uploads directly to S3 (no server bandwidth cost)
4. Client sends back the S3 key to server action
5. Server validates the upload exists and stores reference in DB

**Image optimization:** Use Next.js Image component with S3/Cloudinary loader for automatic resizing and format optimization on public images.

### Background Tasks

**MVP approach: No dedicated queue. Use pragmatic alternatives.**

- **Webhook processing:** Synchronous in route handler (Stripe webhooks are retried on failure)
- **Email sending:** Fire-and-forget from server actions using Resend's async API
- **Auto-completion of orders:** Cron job via Vercel Cron (or similar) — runs daily, checks for delivered orders past the 5-day auto-accept window
- **Download token cleanup:** Cron job — runs daily, expires old tokens
- **Notification creation:** Synchronous in server actions (fast enough for MVP)

**Phase 2:** Add BullMQ + Redis for proper job queues if volume demands it. Jobs to queue: email campaigns, analytics aggregation, bulk operations, report generation.

### Security Boundaries

- **Input validation:** Zod schemas on every server action and route handler — no raw user input reaches business logic
- **SQL injection:** Prisma parameterizes all queries by default
- **XSS:** React auto-escapes output; rich text stored as sanitized HTML (DOMPurify on server)
- **CSRF:** Server Actions have built-in CSRF protection in Next.js
- **Authentication:** Auth.js handles session management; all protected routes check session
- **Authorization:** Role checks at server action level + data scoping (users only access own resources)
- **File uploads:** Presigned URLs prevent direct server upload; file type validation on both client and server; private S3 bucket for sensitive files
- **Payment security:** Never handle card details — Stripe Checkout/Elements handles PCI compliance
- **Webhook verification:** Stripe webhook signature verification on all webhook handlers
- **Rate limiting:** Basic rate limiting on auth routes (next-rate-limit or similar middleware) — expand in Phase 2
- **Secrets management:** Environment variables only, never committed to git
- **Download security:** Signed URLs with expiry; token-based access with user verification

---

## 9. Database Design

### Entity Relationship Overview

```
User (1)──────(1) SellerProfile
  │                    │
  │                    ├──(many) Listing
  │                    │            ├──(many) ServicePackage (if type=SERVICE)
  │                    │            ├──(many) DigitalProductFile (if type=PRODUCT)
  │                    │            ├──(many) ListingImage
  │                    │            ├──(many) ListingTag
  │                    │            └──(many) Review
  │                    │
  │                    └──(many) Payout
  │
  ├──(many) Order (as buyer)
  │           ├──(many) OrderItem
  │           ├──(many) OrderMessage
  │           ├──(many) OrderDeliverable
  │           └──(0-1) Dispute
  │
  ├──(many) Review (as buyer)
  ├──(many) Notification
  ├──(many) CartItem
  └──(many) Favorite (Phase 2)

Category (1)──(many) Listing
Tag (many)──(many) Listing (via ListingTag)
```

### Main Entities

#### User
```
User
  id              String    @id @default(cuid())
  email           String    @unique
  emailVerified   DateTime?
  passwordHash    String?
  name            String
  avatar          String?
  role            Role      (BUYER | SELLER | ADMIN)
  status          UserStatus (ACTIVE | SUSPENDED | BANNED)
  createdAt       DateTime
  updatedAt       DateTime

  → has one SellerProfile (optional)
  → has many Orders (as buyer)
  → has many Reviews (as author)
  → has many CartItems
  → has many Notifications
  → has many Accounts (OAuth - Auth.js)
```

#### SellerProfile
```
SellerProfile
  id              String    @id @default(cuid())
  userId          String    @unique → User
  storeName       String
  slug            String    @unique (URL-friendly store identifier)
  bio             String?
  banner          String?
  category        String?   (primary expertise)
  portfolioLinks  String[]
  verificationStatus  VerificationStatus (UNVERIFIED | VERIFIED | PRO)
  stripeAccountId String?   (Stripe Connect account)
  stripeOnboarded Boolean   @default(false)
  rating          Float?    (aggregate, cached)
  reviewCount     Int       @default(0)
  completedOrders Int       @default(0)
  createdAt       DateTime
  updatedAt       DateTime

  → belongs to User
  → has many Listings
  → has many Payouts
```

#### Listing
```
Listing
  id              String    @id @default(cuid())
  sellerId        String    → SellerProfile
  type            ListingType (SERVICE | PRODUCT)
  title           String
  slug            String    @unique
  description     String    (rich text / HTML)
  categoryId      String    → Category
  status          ListingStatus (DRAFT | PENDING_REVIEW | ACTIVE | PAUSED | REJECTED)
  rejectionReason String?
  price           Decimal?  (for products; services use packages)
  rating          Float?    (aggregate, cached)
  reviewCount     Int       @default(0)
  viewCount       Int       @default(0)
  orderCount      Int       @default(0)
  createdAt       DateTime
  updatedAt       DateTime

  → belongs to SellerProfile
  → belongs to Category
  → has many ServicePackages (if SERVICE)
  → has many DigitalProductFiles (if PRODUCT)
  → has many ListingImages
  → has many ListingTags → Tag
  → has many Reviews
  → has many OrderItems
```

#### ServicePackage
```
ServicePackage
  id              String    @id @default(cuid())
  listingId       String    → Listing
  tier            PackageTier (BASIC | STANDARD | PREMIUM)
  name            String
  description     String
  price           Decimal
  deliveryDays    Int
  revisions       Int
  features        Json      (array of feature strings with included boolean)
  sortOrder       Int
  createdAt       DateTime
  updatedAt       DateTime

  → belongs to Listing
```

#### DigitalProductFile
```
DigitalProductFile
  id              String    @id @default(cuid())
  listingId       String    → Listing
  fileName        String    (original file name)
  fileSize        Int       (bytes)
  fileType        String    (MIME type)
  s3Key           String    (private storage path)
  sortOrder       Int
  createdAt       DateTime

  → belongs to Listing
  → has many DownloadTokens
```

#### Category
```
Category
  id              String    @id @default(cuid())
  name            String
  slug            String    @unique
  description     String?
  icon            String?
  parentId        String?   → Category (self-referencing for subcategories)
  sortOrder       Int
  isActive        Boolean   @default(true)
  createdAt       DateTime

  → has many child Categories
  → has many Listings
```

#### Tag
```
Tag
  id              String    @id @default(cuid())
  name            String    @unique
  slug            String    @unique
  createdAt       DateTime

  → many-to-many with Listing (via ListingTag join)
```

#### Cart / CartItem
```
CartItem
  id              String    @id @default(cuid())
  userId          String    → User
  listingId       String    → Listing
  packageId       String?   → ServicePackage (null for products)
  addOns          Json?     (selected add-on IDs and prices)
  createdAt       DateTime

  → belongs to User
  → belongs to Listing
  → belongs to ServicePackage (optional)
```

#### Order
```
Order
  id              String    @id @default(cuid())
  orderNumber     String    @unique (human-readable: AMAIA-XXXXX)
  buyerId         String    → User
  status          OrderStatus (see state machine above)
  totalAmount     Decimal
  platformFee     Decimal
  stripeSessionId String?
  stripePaymentId String?
  createdAt       DateTime
  updatedAt       DateTime
  completedAt     DateTime?
  cancelledAt     DateTime?

  → belongs to User (buyer)
  → has many OrderItems
  → has one Dispute (optional)
```

#### OrderItem
```
OrderItem
  id              String    @id @default(cuid())
  orderId         String    → Order
  listingId       String    → Listing
  sellerId        String    → SellerProfile
  type            ListingType (SERVICE | PRODUCT)
  packageId       String?   → ServicePackage
  addOns          Json?
  title           String    (snapshot at time of purchase)
  price           Decimal
  platformFee     Decimal
  status          OrderItemStatus
  deliveryDays    Int?      (for services)
  deliveryDueAt   DateTime? (for services)
  deliveredAt     DateTime?
  completedAt     DateTime?
  createdAt       DateTime

  → belongs to Order
  → belongs to Listing
  → belongs to SellerProfile
  → has many OrderMessages
  → has many OrderDeliverables
  → has many DownloadTokens (for products)
```

#### OrderMessage
```
OrderMessage
  id              String    @id @default(cuid())
  orderItemId     String    → OrderItem
  senderId        String    → User
  body            String
  attachments     Json?     (array of {fileName, s3Key, fileSize})
  isSystemMessage Boolean   @default(false) (for automated messages like "Order accepted")
  createdAt       DateTime

  → belongs to OrderItem
  → belongs to User (sender)
```

#### OrderDeliverable
```
OrderDeliverable
  id              String    @id @default(cuid())
  orderItemId     String    → OrderItem
  fileName        String
  fileSize        Int
  fileType        String
  s3Key           String
  message         String?
  createdAt       DateTime

  → belongs to OrderItem
```

#### DownloadToken
```
DownloadToken
  id              String    @id @default(cuid())
  orderItemId     String    → OrderItem
  fileId          String    → DigitalProductFile
  userId          String    → User
  token           String    @unique
  downloadCount   Int       @default(0)
  maxDownloads    Int       @default(5)
  expiresAt       DateTime
  createdAt       DateTime

  → belongs to OrderItem
  → belongs to DigitalProductFile
  → belongs to User
```

#### Payment (transaction log)
```
Payment
  id              String    @id @default(cuid())
  orderId         String    → Order
  stripePaymentId String    @unique
  amount          Decimal
  platformFee     Decimal
  currency        String    @default("usd")
  status          PaymentStatus (PENDING | SUCCEEDED | FAILED | REFUNDED | PARTIAL_REFUND)
  metadata        Json?
  createdAt       DateTime

  → belongs to Order
```

#### Review
```
Review
  id              String    @id @default(cuid())
  listingId       String    → Listing
  orderItemId     String    @unique → OrderItem
  buyerId         String    → User
  rating          Int       (1-5)
  comment         String
  sellerResponse  String?
  respondedAt     DateTime?
  isVisible       Boolean   @default(true) (admin can hide)
  createdAt       DateTime
  updatedAt       DateTime

  → belongs to Listing
  → belongs to OrderItem
  → belongs to User (buyer)
```

#### Notification
```
Notification
  id              String    @id @default(cuid())
  userId          String    → User
  type            NotificationType (ORDER_UPDATE | MESSAGE | REVIEW | PAYOUT | SYSTEM | ...)
  title           String
  body            String
  link            String?   (in-app URL to navigate to)
  isRead          Boolean   @default(false)
  createdAt       DateTime

  → belongs to User
```

#### Payout
```
Payout
  id              String    @id @default(cuid())
  sellerId        String    → SellerProfile
  amount          Decimal
  currency        String    @default("usd")
  stripePayoutId  String?
  status          PayoutStatus (PENDING | PROCESSING | COMPLETED | FAILED)
  createdAt       DateTime
  completedAt     DateTime?

  → belongs to SellerProfile
```

#### Dispute
```
Dispute
  id              String    @id @default(cuid())
  orderId         String    → Order
  orderItemId     String    → OrderItem
  buyerId         String    → User
  sellerId        String    → SellerProfile
  reason          String
  description     String
  status          DisputeStatus (OPEN | UNDER_REVIEW | RESOLVED)
  resolution      String?   (REFUND | RELEASE | PARTIAL_REFUND)
  resolvedBy      String?   → User (admin)
  resolvedAt      DateTime?
  refundAmount    Decimal?
  adminNotes      String?
  createdAt       DateTime
  updatedAt       DateTime

  → belongs to Order
  → belongs to OrderItem
  → belongs to User (buyer)
  → belongs to SellerProfile
```

#### AdminLog
```
AdminLog
  id              String    @id @default(cuid())
  adminId         String    → User
  action          String    (e.g., "LISTING_APPROVED", "USER_BANNED", "DISPUTE_RESOLVED")
  targetType      String    (e.g., "Listing", "User", "Dispute")
  targetId        String
  details         Json?     (reason, metadata)
  createdAt       DateTime

  → belongs to User (admin)
```

---

## 10. Folder Structure

```
amaia/
├── .env.local                      # Environment variables (gitignored)
├── .env.example                    # Template for env vars
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── migrations/                  # Prisma migrations
│   └── seed.ts                     # Seed data (categories, admin user, test data)
│
├── public/
│   ├── images/                     # Static images (logo, icons, placeholders)
│   └── fonts/                      # Custom fonts if any
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout (providers, global styles)
│   │   ├── page.tsx                # Homepage
│   │   ├── globals.css             # Tailwind imports + global styles
│   │   │
│   │   ├── (public)/               # Route group: public pages
│   │   │   ├── explore/
│   │   │   │   └── page.tsx        # Browse listings
│   │   │   ├── listing/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    # Listing detail
│   │   │   ├── seller/
│   │   │   │   └── [username]/
│   │   │   │       └── page.tsx    # Seller store
│   │   │   ├── category/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    # Category page
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── how-it-works/
│   │   │   │   └── page.tsx
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx
│   │   │   ├── faq/
│   │   │   │   └── page.tsx
│   │   │   ├── terms/
│   │   │   │   └── page.tsx
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (auth)/                 # Route group: auth pages
│   │   │   ├── layout.tsx          # Auth layout (centered card)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   ├── page.tsx        # Buyer registration
│   │   │   │   └── seller/
│   │   │   │       └── page.tsx    # Seller onboarding
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   └── verify-email/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (buyer)/                # Route group: buyer dashboard
│   │   │   ├── layout.tsx          # Buyer dashboard shell (sidebar, nav)
│   │   │   └── dashboard/
│   │   │       ├── page.tsx        # Buyer overview
│   │   │       ├── orders/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx
│   │   │       ├── downloads/
│   │   │       │   └── page.tsx
│   │   │       ├── messages/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx
│   │   │       ├── reviews/
│   │   │       │   └── page.tsx
│   │   │       ├── favorites/
│   │   │       │   └── page.tsx
│   │   │       └── settings/
│   │   │           ├── page.tsx
│   │   │           └── notifications/
│   │   │               └── page.tsx
│   │   │
│   │   ├── (seller)/               # Route group: seller dashboard
│   │   │   ├── layout.tsx          # Seller dashboard shell
│   │   │   └── seller/
│   │   │       └── dashboard/
│   │   │           ├── page.tsx    # Seller overview
│   │   │           ├── listings/
│   │   │           │   ├── page.tsx
│   │   │           │   ├── new/
│   │   │           │   │   └── page.tsx
│   │   │           │   └── [id]/
│   │   │           │       └── edit/
│   │   │           │           └── page.tsx
│   │   │           ├── orders/
│   │   │           │   ├── page.tsx
│   │   │           │   └── [id]/
│   │   │           │       └── page.tsx
│   │   │           ├── earnings/
│   │   │           │   ├── page.tsx
│   │   │           │   └── payouts/
│   │   │           │       └── page.tsx
│   │   │           ├── messages/
│   │   │           │   ├── page.tsx
│   │   │           │   └── [id]/
│   │   │           │       └── page.tsx
│   │   │           ├── reviews/
│   │   │           │   └── page.tsx
│   │   │           ├── analytics/
│   │   │           │   └── page.tsx
│   │   │           ├── store/
│   │   │           │   └── page.tsx
│   │   │           └── settings/
│   │   │               ├── page.tsx
│   │   │               └── payouts/
│   │   │                   └── page.tsx
│   │   │
│   │   ├── (admin)/                # Route group: admin dashboard
│   │   │   ├── layout.tsx          # Admin dashboard shell
│   │   │   └── admin/
│   │   │       ├── page.tsx        # Admin overview
│   │   │       ├── users/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx
│   │   │       ├── listings/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx
│   │   │       ├── orders/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx
│   │   │       ├── disputes/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx
│   │   │       ├── categories/
│   │   │       │   └── page.tsx
│   │   │       ├── transactions/
│   │   │       │   └── page.tsx
│   │   │       ├── payouts/
│   │   │       │   └── page.tsx
│   │   │       ├── settings/
│   │   │       │   └── page.tsx
│   │   │       └── audit-log/
│   │   │           └── page.tsx
│   │   │
│   │   ├── cart/
│   │   │   └── page.tsx            # Shopping cart
│   │   ├── checkout/
│   │   │   ├── page.tsx            # Checkout summary
│   │   │   └── success/
│   │   │       └── page.tsx        # Post-checkout confirmation
│   │   │
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts    # Auth.js route handler
│   │       ├── webhooks/
│   │       │   └── stripe/
│   │       │       └── route.ts    # Stripe webhook handler
│   │       ├── uploads/
│   │       │   └── presign/
│   │       │       └── route.ts    # S3 presigned URL generation
│   │       └── downloads/
│   │           └── [token]/
│   │               └── route.ts    # Secure download handler
│   │
│   ├── modules/                    # Domain modules (business logic)
│   │   ├── auth/
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts
│   │   │   ├── actions/
│   │   │   │   └── auth.actions.ts
│   │   │   └── schemas/
│   │   │       └── auth.schemas.ts
│   │   │
│   │   ├── users/
│   │   │   ├── services/
│   │   │   │   ├── user.service.ts
│   │   │   │   └── seller-profile.service.ts
│   │   │   ├── actions/
│   │   │   │   ├── user.actions.ts
│   │   │   │   └── seller.actions.ts
│   │   │   ├── schemas/
│   │   │   │   └── user.schemas.ts
│   │   │   └── types/
│   │   │       └── user.types.ts
│   │   │
│   │   ├── listings/
│   │   │   ├── services/
│   │   │   │   ├── listing.service.ts
│   │   │   │   ├── category.service.ts
│   │   │   │   └── search.service.ts
│   │   │   ├── actions/
│   │   │   │   ├── listing.actions.ts
│   │   │   │   └── category.actions.ts
│   │   │   ├── schemas/
│   │   │   │   └── listing.schemas.ts
│   │   │   └── types/
│   │   │       └── listing.types.ts
│   │   │
│   │   ├── orders/
│   │   │   ├── services/
│   │   │   │   ├── order.service.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   └── delivery.service.ts
│   │   │   ├── actions/
│   │   │   │   ├── order.actions.ts
│   │   │   │   └── cart.actions.ts
│   │   │   ├── schemas/
│   │   │   │   └── order.schemas.ts
│   │   │   └── types/
│   │   │       └── order.types.ts
│   │   │
│   │   ├── payments/
│   │   │   ├── services/
│   │   │   │   ├── stripe.service.ts
│   │   │   │   ├── checkout.service.ts
│   │   │   │   └── payout.service.ts
│   │   │   ├── actions/
│   │   │   │   └── payment.actions.ts
│   │   │   ├── schemas/
│   │   │   │   └── payment.schemas.ts
│   │   │   └── webhooks/
│   │   │       └── stripe.handler.ts
│   │   │
│   │   ├── messaging/
│   │   │   ├── services/
│   │   │   │   └── message.service.ts
│   │   │   ├── actions/
│   │   │   │   └── message.actions.ts
│   │   │   └── schemas/
│   │   │       └── message.schemas.ts
│   │   │
│   │   ├── reviews/
│   │   │   ├── services/
│   │   │   │   └── review.service.ts
│   │   │   ├── actions/
│   │   │   │   └── review.actions.ts
│   │   │   └── schemas/
│   │   │       └── review.schemas.ts
│   │   │
│   │   ├── notifications/
│   │   │   ├── services/
│   │   │   │   ├── notification.service.ts
│   │   │   │   └── email.service.ts
│   │   │   ├── actions/
│   │   │   │   └── notification.actions.ts
│   │   │   └── templates/
│   │   │       ├── order-confirmation.tsx
│   │   │       └── ... (React Email templates)
│   │   │
│   │   ├── uploads/
│   │   │   ├── services/
│   │   │   │   ├── s3.service.ts
│   │   │   │   └── download.service.ts
│   │   │   └── actions/
│   │   │       └── upload.actions.ts
│   │   │
│   │   └── admin/
│   │       ├── services/
│   │       │   ├── moderation.service.ts
│   │       │   ├── dispute.service.ts
│   │       │   └── analytics.service.ts
│   │       ├── actions/
│   │       │   ├── moderation.actions.ts
│   │       │   └── dispute.actions.ts
│   │       └── schemas/
│   │           └── admin.schemas.ts
│   │
│   ├── components/                 # Shared UI components
│   │   ├── ui/                     # shadcn/ui components (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                 # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── dashboard-shell.tsx
│   │   │
│   │   ├── listings/               # Listing-related components
│   │   │   ├── listing-card.tsx
│   │   │   ├── listing-grid.tsx
│   │   │   ├── listing-filters.tsx
│   │   │   ├── package-selector.tsx
│   │   │   ├── listing-gallery.tsx
│   │   │   └── listing-form.tsx
│   │   │
│   │   ├── orders/
│   │   │   ├── order-status-badge.tsx
│   │   │   ├── order-timeline.tsx
│   │   │   └── delivery-form.tsx
│   │   │
│   │   ├── reviews/
│   │   │   ├── review-card.tsx
│   │   │   ├── review-form.tsx
│   │   │   └── star-rating.tsx
│   │   │
│   │   └── shared/                 # Generic shared components
│   │       ├── search-bar.tsx
│   │       ├── pagination.tsx
│   │       ├── file-upload.tsx
│   │       ├── rich-text-editor.tsx
│   │       ├── empty-state.tsx
│   │       ├── loading-skeleton.tsx
│   │       └── error-boundary.tsx
│   │
│   ├── lib/                        # Shared kernel / utilities
│   │   ├── db.ts                   # Prisma client singleton
│   │   ├── auth.ts                 # Auth.js config
│   │   ├── auth-utils.ts           # Session helpers (getSession, assertRole)
│   │   ├── stripe.ts               # Stripe client setup
│   │   ├── s3.ts                   # S3 client setup
│   │   ├── email.ts                # Email client (Resend)
│   │   ├── constants.ts            # App-wide constants
│   │   ├── errors.ts               # Custom error classes
│   │   ├── utils.ts                # Generic helpers (cn, formatCurrency, etc.)
│   │   └── validators.ts           # Shared Zod schemas (pagination, etc.)
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-debounce.ts
│   │   └── use-media-query.ts
│   │
│   └── types/                      # Global TypeScript types
│       ├── next-auth.d.ts          # Auth.js type extensions
│       └── global.d.ts             # Global type declarations
│
├── scripts/
│   └── seed-categories.ts          # Script to seed initial categories
│
├── package.json
├── pnpm-lock.yaml
└── AMAIA-PRODUCT-SPEC.md           # This document
```

---

## 11. Engineering Decisions

### Why Modular Monolith is the Right Choice

1. **Solo builder reality.** Microservices require operational overhead (service discovery, inter-service communication, distributed tracing, multiple deployments) that would consume more time than building features. A modular monolith gives you the clean separation of microservices with the deployment simplicity of a monolith.

2. **Single deployment target.** One Vercel deployment (or one Docker container). One database. One CI/CD pipeline. You can deploy in minutes, not hours.

3. **Refactoring safety.** When modules are in the same codebase, TypeScript catches cross-module breakage at compile time. In microservices, you'd only catch this at runtime (or with extensive contract testing).

4. **Future-proof.** The module boundaries are designed to be extractable. If AMAIA scales to the point where the orders module needs its own service, you can extract `src/modules/orders/` into a separate service because it already has a well-defined interface. But you don't pay that cost until you need it.

5. **Shared database, separate concerns.** All modules share one PostgreSQL database (simplifying transactions and joins) but each module owns its tables and queries. This avoids distributed transaction nightmares while maintaining logical separation.

### What Should NOT Be Overengineered

| Area | Don't Do This | Do This Instead |
|---|---|---|
| **Search** | Elasticsearch or Algolia from day 1 | PostgreSQL full-text search with `tsvector`. Plenty fast for thousands of listings. Add Algolia when search is a proven bottleneck. |
| **Real-time** | WebSocket server, Socket.io | Polling or Server-Sent Events for notifications. Messaging doesn't need to be instant at MVP scale. |
| **Background jobs** | Redis + BullMQ queue system | Vercel Cron for scheduled tasks. Synchronous email sending via Resend. Add queues only when volume demands it. |
| **Caching** | Redis caching layer | Next.js built-in caching (ISR, fetch cache). React Server Components naturally reduce data-fetching overhead. Add Redis when you have traffic-based cache-miss problems. |
| **CDN/Images** | Custom image pipeline | Next.js Image + S3/Cloudinary. Let the framework handle optimization. |
| **Auth** | Custom JWT implementation | Auth.js handles everything. Don't reinvent session management. |
| **Payments** | Custom escrow system | Stripe Connect handles fund holding, payouts, and compliance. Don't build financial infrastructure. |
| **Multi-tenancy** | Database-per-seller isolation | Single database with seller_id scoping. Multi-tenant architecture is unnecessary for a marketplace. |
| **Monitoring** | Datadog, custom dashboards | Vercel Analytics + Sentry for error tracking. Upgrade when scale justifies cost. |
| **Testing** | 100% coverage, E2E for everything | Test critical paths (checkout, order flow, auth). Skip testing obvious CRUD. Add tests as bugs appear. |

### What Should Be Prepared for Scale

| Area | Preparation Now | Scale Trigger |
|---|---|---|
| **Module boundaries** | Enforce clean interfaces between modules. No cross-module Prisma queries. | When a module needs independent scaling/deployment |
| **Database indexes** | Add proper indexes on foreign keys, slugs, status columns, and common query patterns from day 1 | N/A — do it now, it's cheap |
| **File storage abstraction** | Use a thin abstraction over S3 (service layer in uploads module) | When you need to switch providers or add processing |
| **Payment abstraction** | Stripe service layer in payments module, not raw Stripe calls everywhere | When adding additional payment providers |
| **Email templates** | Use React Email for templates — they're portable and testable | When switching email providers |
| **API design** | Server Actions with clean input/output types | When building public API (Phase 2+) — service layer is already API-ready |
| **Category taxonomy** | Self-referencing parent/child in database | When categories get deep or complex |
| **Search interface** | Abstract search behind a service function | When migrating from PostgreSQL to dedicated search engine |

### Tradeoffs for a Solo Builder

1. **Speed over perfection.** Ship a working MVP with known limitations rather than a perfect system that never launches. Example: manual admin approval of listings is fine at 50 sellers. Automated moderation can wait until 500.

2. **Leverage platforms.** Use Vercel for deployment, Stripe for payments, Resend for email, Cloudinary/S3 for files. Every hosted service you use is infrastructure you don't maintain. The cost at MVP scale is minimal ($0–$50/month).

3. **AI-assisted development.** The codebase is structured to maximize AI coding tool effectiveness:
   - Clear module boundaries = clear context windows for AI
   - Consistent file naming = predictable code generation
   - TypeScript + Zod = strong types that AI tools leverage for accurate suggestions
   - shadcn/ui = well-documented components that AI knows how to use

4. **Buy time, not compute.** At MVP scale, compute is nearly free (Vercel free tier, Supabase or Neon for Postgres). Your scarcest resource is time. Every engineering decision should minimize time to first paying customer.

5. **Operational simplicity > architectural purity.** If it's easier to add a column to an existing table than create a new table with a foreign key, do it. Normalize later when you have data and users to justify it.

---

## 12. MVP Build Strategy

### Sprint 1: Foundation (Week 1–2)

**What:** Project setup, database, auth, basic UI shell

- Initialize Next.js project with TypeScript, Tailwind, shadcn/ui
- Set up Prisma with PostgreSQL (Neon or Supabase)
- Implement Auth.js (email + Google OAuth)
- Create database schema and run initial migration
- Build layout components: header, footer, sidebar, dashboard shells
- Create public pages: homepage (static), about, how it works
- Seed database with categories and test data
- Deploy to Vercel (CI/CD from day 1)

**Why first:** Everything depends on auth, database, and basic UI. You can't build features without this foundation. Deploying early means you catch environment issues immediately.

### Sprint 2: Seller Experience (Week 3–4)

**What:** Seller onboarding, listing creation, store pages

- Seller registration/onboarding flow
- Stripe Connect integration (Express onboarding)
- Service listing creation (with package builder)
- Digital product listing creation (with file upload to S3)
- Listing management (CRUD, status management)
- Seller store/profile page (public)
- Seller dashboard shell with listing management

**Why second:** The marketplace needs supply before demand. Sellers creating listings is the prerequisite for everything else. Stripe Connect setup is also a long-lead item (account verification takes time).

### Sprint 3: Buyer Experience (Week 5–6)

**What:** Browsing, search, cart, checkout

- Explore page with listing grid
- Search with filters (category, type, price range, rating)
- Listing detail pages (service with packages, digital product)
- Category pages
- Shopping cart (add, remove, view)
- Stripe Checkout integration
- Order creation on successful payment
- Digital product delivery (download tokens, secure download endpoint)
- Order confirmation page
- Buyer dashboard shell

**Why third:** Now that sellers and listings exist, build the buyer journey end-to-end. The goal is a complete purchase flow — buyer browses, selects, pays, and receives a digital product.

### Sprint 4: Order Management & Communication (Week 7–8)

**What:** Service order workflow, messaging, reviews

- Service order lifecycle (pending → in-progress → delivered → completed)
- Order detail pages (buyer and seller views)
- Order messaging (per-order thread)
- Delivery upload for service orders
- Buyer accept/revision flow
- Review and rating system
- Email notifications for key events (order placed, delivered, completed)
- Buyer dashboard: orders, downloads, messages
- Seller dashboard: orders, earnings, messages

**Why fourth:** This completes the service marketplace flow. Digital products already work from Sprint 3; now services work too. Reviews add the trust layer. This is the minimum viable marketplace.

### Sprint 5: Admin & Polish (Week 9–10)

**What:** Admin dashboard, disputes, polish, launch prep

- Admin dashboard with overview metrics
- User management (search, view, suspend)
- Listing moderation queue (approve, reject)
- Basic dispute system (open, review, resolve)
- Admin audit logging
- Seller verification logic (auto-upgrade after 3 orders + 4.0 rating)
- Auto-completion cron job (orders delivered 5+ days ago)
- Download token cleanup cron job
- Mobile responsiveness polish
- Error handling and edge case fixes
- Performance optimization (loading states, skeletons)
- SEO basics (meta tags, OG images, sitemap.xml)
- Launch!

**Why last:** Admin tools are essential but only needed when real users exist. Disputes are rare at launch. Polish is best done after core features work, because you'll discover UX issues during development that change what needs polishing.

---

### Post-MVP Priority Stack

After launch, priorities are driven by user feedback, but the likely order:

1. **Custom offers via messaging** — sellers want to upsell, buyers want custom work
2. **Favorites/wishlist** — improves buyer engagement and return visits
3. **Seller analytics** — sellers want to understand their performance
4. **Featured listings** — unlocks revenue stream #2
5. **Seller Pro subscription** — unlocks revenue stream #3
6. **Advanced search** — autocomplete, relevance ranking
7. **Category SEO pages** — growth through organic traffic

---

## Appendix: Initial Category Taxonomy

```
AI & Automation
  ├── AI Automation Setup (Zapier, Make, n8n)
  ├── AI Chatbot Development
  ├── AI Integration Services
  ├── Custom GPT / AI Agent Development
  └── AI Consulting

Prompt Engineering
  ├── Custom Prompt Writing
  ├── Prompt Strategy & Consulting
  └── Prompt Testing & Optimization

Web & Landing Pages
  ├── Landing Page Design & Setup
  ├── Website Development
  ├── WordPress / Webflow Setup
  └── Website Maintenance

Design & Creative
  ├── Graphic Design
  ├── UI/UX Design
  ├── Photo & Video Editing
  ├── Branding & Logo Design
  └── Social Media Design

Digital Products — Prompts & AI
  ├── Prompt Packs
  ├── GPT System Prompts
  └── AI Workflow Templates

Digital Products — Templates
  ├── Notion Templates
  ├── Business Spreadsheets
  ├── Automation Templates (Zapier, Make)
  └── Document Templates

Digital Products — Design Assets
  ├── UI Kits
  ├── Icon Packs
  ├── Mockup Templates
  └── Social Media Templates

Digital Products — Knowledge
  ├── Ebooks & Guides
  ├── Online Courses (downloadable)
  └── Checklists & Playbooks
```

---

*This document serves as the single source of truth for AMAIA's product and technical design. It should be updated as decisions evolve during implementation.*
