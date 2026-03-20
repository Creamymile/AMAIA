# AMAIA — Product Requirements Document (PRD)

> Digital Services & Digital Products Marketplace
> Version 1.0 — March 2026

---

## 1. Product Summary

AMAIA is a two-sided digital marketplace connecting sellers (freelancers, creators, digital product makers) with buyers (solopreneurs, small businesses, professionals) in the AI, automation, and digital productivity space.

**Sellers** list two types of offerings:
- **Digital services** — custom work delivered by the seller (e.g., "I'll build your Zapier automation," "I'll design your landing page")
- **Digital products** — downloadable files delivered instantly (e.g., prompt packs, Notion templates, UI kits, ebooks)

**Buyers** browse, compare, purchase, and manage orders/downloads through a unified marketplace experience.

**Admins** moderate listings, resolve disputes, verify sellers, and monitor platform health.

The platform earns revenue through a 12% transaction commission on every sale.

---

## 2. Problem Statement

### For Buyers
Finding quality AI/automation/digital services is fragmented. Buyers currently piece together solutions from Twitter DMs, Gumroad, Fiverr, and random landing pages. There is no single trusted destination specifically for AI-era digital services and products where they can compare options, verify seller quality, and get buyer protection.

### For Sellers
AI/automation freelancers and digital product creators face a lose-lose choice:
- **Generalist platforms** (Fiverr, Upwork): 20% commissions, poor discoverability in AI categories, commoditized pricing pressure
- **Self-hosted stores** (Gumroad, Lemonsqueezy): zero discovery, sellers must drive all their own traffic
- **Social selling** (Twitter, LinkedIn): no infrastructure for payments, delivery, or dispute resolution

### For the Market
The AI tools and automation market is growing rapidly, but the marketplace layer hasn't kept up. There's a clear gap for a focused, premium marketplace that understands this niche and serves it well.

---

## 3. Business Goal

**Primary goal:** Build a functioning two-sided marketplace that generates revenue through transaction commissions by the end of a 10-week MVP build.

**Measurable targets for first 6 months post-launch:**
- 100+ active sellers with published listings
- 500+ registered buyers
- 50+ completed transactions per month
- $5,000+ in monthly GMV (Gross Merchandise Value)
- Positive unit economics: revenue from commissions covers hosting/infrastructure costs

**Strategic goal:** Establish AMAIA as the go-to marketplace for AI, automation, and digital productivity services and products — positioned between Fiverr (too broad, high commission) and Gumroad (no discovery).

---

## 4. User Personas

### Buyer: "Maya — The Solopreneur"

**Demographics:** 28–45, runs a small online business, non-technical but tech-curious
**Context:** Knows she needs AI automation for her business but doesn't have time to learn tools herself. Has been burned by hiring random freelancers on Fiverr where quality is inconsistent.
**Goals:**
- Find a reliable specialist to automate her email workflows
- Download ready-made Notion templates for her business operations
- Pay a clear price with no surprise costs
- Get buyer protection if something goes wrong
**Pain points:**
- Doesn't know how to evaluate AI service quality
- Overwhelmed by options on general marketplaces
- Worried about paying and getting nothing in return
**What she needs from AMAIA:**
- Curated, niche-specific listings (not 10 million random gigs)
- Verified sellers with reviews from similar buyers
- Clear package pricing (not hourly bidding)
- Simple checkout and secure file delivery
- A way to communicate with the seller about her specific needs

### Seller: "Jordan — The AI Automation Freelancer"

**Demographics:** 24–40, technical, builds AI automations and chatbots
**Context:** Currently gets clients through Twitter and word of mouth. Has tried Fiverr but hates the 20% commission and race-to-the-bottom pricing. Wants a platform that values quality over volume.
**Goals:**
- Build a professional presence in a focused marketplace
- List both services (custom automation work) and digital products (pre-built templates)
- Get discovered by buyers who actually need what he builds
- Earn more by keeping a higher percentage of each sale
**Pain points:**
- Fiverr takes 20% and attracts price-sensitive buyers
- No single platform lets him sell both services and digital products
- Building and marketing his own website takes time away from client work
**What he needs from AMAIA:**
- Lower commission than competitors
- Professional store page that showcases his portfolio
- Easy listing creation for both services and products
- Reliable payment processing and payout system
- Buyer messaging for requirement gathering

### Admin: "Sam — The Platform Operator"

**Demographics:** The founder (you) or a future ops hire
**Context:** Needs to keep the marketplace quality high, resolve issues quickly, and understand platform health without spending all day in dashboards.
**Goals:**
- Approve quality listings and reject spam/violations
- Resolve buyer-seller disputes fairly and quickly
- Monitor platform health metrics (users, orders, revenue)
- Manage category taxonomy as the market evolves
**Pain points:**
- Manual review doesn't scale, so the first 3 listings per seller need review, then auto-publish
- Disputes are stressful and high-stakes — need clear evidence and resolution tools
**What they need from AMAIA:**
- Moderation queue with clear approve/reject workflow
- Dispute center with full order history and evidence
- Audit trail for all admin actions
- Overview dashboard that surfaces what needs attention

---

## 5. Key Use Cases

### UC-1: Buying a Digital Product

**Actor:** Buyer
**Trigger:** Buyer wants a Notion template for project management
**Flow:**
1. Buyer searches "notion template project management" or browses Templates category
2. Browses listing cards with thumbnails, prices, and ratings
3. Clicks a listing to view detail: description, preview images, file format info, reviews
4. Clicks "Buy Now" → redirected to login if not authenticated
5. Proceeds to cart → checkout via Stripe
6. Payment succeeds → download links available immediately
7. Downloads files from confirmation page or from /dashboard/downloads
8. Optionally leaves a review after 24 hours

**Postconditions:** Buyer has the files. Seller's earnings updated. Platform commission captured. Download tokens created with expiry and count limits.

### UC-2: Ordering a Digital Service

**Actor:** Buyer
**Trigger:** Buyer needs a custom Zapier automation built
**Flow:**
1. Buyer finds a service listing for Zapier automation
2. Compares 3 packages (Basic: 3 zaps, Standard: 5 zaps, Premium: 10 zaps)
3. Selects Standard package + "Rush delivery" add-on
4. Proceeds to checkout → pays via Stripe
5. Order created with status PENDING → seller notified
6. Seller accepts order → status IN_PROGRESS
7. Buyer shares requirements via order messaging
8. Seller works on deliverables, communicates progress
9. Seller uploads files and delivers → status DELIVERED
10. Buyer reviews deliverables → accepts delivery → status COMPLETED
11. Funds released to seller after 7-day clearance
12. Both parties prompted to leave reviews

**Alternative flows:**
- Seller declines order → auto-refund
- Buyer requests revision (if revisions remaining) → back to IN_PROGRESS
- Buyer doesn't respond in 5 days → auto-completed
- Buyer disputes → admin reviews and resolves

### UC-3: Seller Onboarding

**Actor:** New user wanting to sell
**Trigger:** Clicks "Start Selling" on homepage
**Flow:**
1. Creates account (or upgrades existing buyer account)
2. Verifies email
3. Completes seller profile: store name, bio, avatar, primary category
4. Connects Stripe account via Stripe Connect Express onboarding
5. Creates first listing (service or product)
6. Listing submitted for admin review (first 3 listings require approval)
7. Admin approves → listing goes live
8. Seller dashboard fully active

**Postconditions:** Seller has a public store page, at least one active listing, and connected payout method.

### UC-4: Managing Digital Downloads

**Actor:** Buyer
**Trigger:** Buyer wants to re-download a previously purchased product
**Flow:**
1. Goes to /dashboard/downloads
2. Sees all purchased digital products with download buttons
3. Clicks download → server validates ownership and generates signed URL
4. File downloads to buyer's device
5. Download count incremented (max 5 per token; new token generated if expired)

**Edge cases:**
- Token expired → new token auto-generated from the same purchase record
- Max downloads reached → buyer contacts support (admin can reset)

### UC-5: Delivering a Service

**Actor:** Seller
**Trigger:** Seller has a new order to fulfill
**Flow:**
1. Seller sees new order notification in dashboard
2. Opens order detail → reviews buyer's requirements in messages
3. Asks clarifying questions via order messaging if needed
4. Works on deliverables offline
5. Uploads completed files via delivery form
6. Clicks "Deliver Order" → status changes to DELIVERED
7. Waits for buyer acceptance (auto-completes after 5 days)
8. If revision requested: reviews feedback, revises, re-delivers
9. Once completed: funds appear in earnings after clearance period

### UC-6: Handling Disputes

**Actor:** Buyer (initiates), Admin (resolves)
**Trigger:** Buyer is unsatisfied with a delivered service
**Flow:**
1. Buyer opens dispute on order with reason and description
2. Order status → DISPUTED
3. Seller notified, can respond with their evidence
4. Admin sees dispute in queue
5. Admin reviews: order details, message history, deliverables, buyer complaint, seller response
6. Admin can message either party for clarification
7. Admin resolves: full refund to buyer / release funds to seller / partial refund
8. Both parties notified of resolution
9. Resolution and reason logged in admin audit trail

### UC-7: Managing Payouts

**Actor:** Seller
**Trigger:** Seller wants to check or withdraw earnings
**Flow:**
1. Seller goes to /seller/dashboard/earnings
2. Sees: available balance, pending balance (in clearance), total earned
3. Pending funds move to available after clearance period (3 days for products, 7 days for services)
4. Payouts handled automatically by Stripe Connect to seller's bank
5. Seller can view payout history with dates and amounts

---

## 6. Functional Requirements

### FR-1: Authentication & Authorization

| ID | Requirement | Priority |
|---|---|---|
| FR-1.1 | Users can register with email/password or Google OAuth | MVP |
| FR-1.2 | Email verification is required before purchasing or selling | MVP |
| FR-1.3 | Users can reset their password via email link | MVP |
| FR-1.4 | Sessions persist via JWT in httpOnly cookies | MVP |
| FR-1.5 | Role-based access: Guest, Buyer, Seller, Admin | MVP |
| FR-1.6 | Middleware protects dashboard routes based on role | MVP |
| FR-1.7 | Buyer accounts can be upgraded to Seller by completing onboarding | MVP |
| FR-1.8 | Admin role is assigned manually in the database (no self-service) | MVP |

### FR-2: User Profiles

| ID | Requirement | Priority |
|---|---|---|
| FR-2.1 | Users have a profile with name, email, and avatar | MVP |
| FR-2.2 | Buyers can update their profile information | MVP |
| FR-2.3 | Sellers have an extended profile: store name, slug, bio, banner, portfolio links | MVP |
| FR-2.4 | Seller store pages are publicly accessible at /seller/[username] | MVP |
| FR-2.5 | Seller profiles display aggregate rating, review count, and completed orders | MVP |

### FR-3: Listing Management

| ID | Requirement | Priority |
|---|---|---|
| FR-3.1 | Sellers can create service listings with title, description, category, tags, images | MVP |
| FR-3.2 | Service listings support 1–3 pricing packages (Basic/Standard/Premium) | MVP |
| FR-3.3 | Each package has: name, description, price, delivery days, revisions, feature checklist | MVP |
| FR-3.4 | Service listings support optional add-ons (name + price) | MVP |
| FR-3.5 | Sellers can create digital product listings with title, description, category, tags, images, price | MVP |
| FR-3.6 | Digital product listings include file upload (up to 500MB) stored securely in S3 | MVP |
| FR-3.7 | Listings can be saved as draft, submitted for review, published, paused, or deleted | MVP |
| FR-3.8 | First 3 listings per seller require admin approval; subsequent listings auto-publish | MVP |
| FR-3.9 | Listings have a URL-friendly slug auto-generated from the title | MVP |
| FR-3.10 | Sellers can edit their listings; changes to active listings require re-review if flagged | MVP |
| FR-3.11 | Gallery supports up to 6 images per listing | MVP |
| FR-3.12 | Listings have optional FAQ sections (question/answer pairs) | MVP |

### FR-4: Browse & Search

| ID | Requirement | Priority |
|---|---|---|
| FR-4.1 | All active listings are browsable at /explore | MVP |
| FR-4.2 | Listings can be filtered by: type (service/product), category, subcategory, price range, minimum rating | MVP |
| FR-4.3 | Listings can be sorted by: newest, price low-high, price high-low, highest rated, most popular | MVP |
| FR-4.4 | Keyword search queries listing titles, descriptions, and tags | MVP |
| FR-4.5 | Category pages show listings filtered by category with category description | MVP |
| FR-4.6 | Listing cards display: thumbnail, title, seller name, price (or "from $X"), average rating, listing type badge | MVP |
| FR-4.7 | Search results paginate at 20 listings per page | MVP |

### FR-5: Shopping Cart

| ID | Requirement | Priority |
|---|---|---|
| FR-5.1 | Authenticated users can add listings to a cart | MVP |
| FR-5.2 | Cart stores: listing, selected package (for services), selected add-ons | MVP |
| FR-5.3 | Users can view, update, and remove cart items | MVP |
| FR-5.4 | Cart persists across sessions (stored in database) | MVP |
| FR-5.5 | Cart shows line item prices and total | MVP |

### FR-6: Checkout & Payments

| ID | Requirement | Priority |
|---|---|---|
| FR-6.1 | Checkout uses Stripe Checkout (hosted or embedded) | MVP |
| FR-6.2 | Platform commission (12%) is applied as Stripe application_fee | MVP |
| FR-6.3 | Payments are routed to seller's Stripe Connect account | MVP |
| FR-6.4 | Stripe webhooks confirm payment and trigger order creation | MVP |
| FR-6.5 | Failed payments display an error and preserve the cart | MVP |
| FR-6.6 | Successful checkout redirects to a confirmation page | MVP |
| FR-6.7 | Payment records are stored in the database with Stripe IDs | MVP |

### FR-7: Order Management

| ID | Requirement | Priority |
|---|---|---|
| FR-7.1 | Orders are created upon successful payment | MVP |
| FR-7.2 | Each order has a human-readable order number (AMAIA-XXXXX) | MVP |
| FR-7.3 | Digital product orders: buyer gets immediate download access | MVP |
| FR-7.4 | Service orders follow the state machine: PENDING → IN_PROGRESS → DELIVERED → COMPLETED | MVP |
| FR-7.5 | Sellers can accept or decline pending service orders | MVP |
| FR-7.6 | Declined orders trigger an automatic refund | MVP |
| FR-7.7 | Sellers who don't respond in 48 hours: order auto-cancelled with refund | MVP |
| FR-7.8 | Sellers deliver by uploading files and clicking "Deliver Order" | MVP |
| FR-7.9 | Buyers can accept delivery or request revision (if revisions remain) | MVP |
| FR-7.10 | Delivered orders with no buyer response auto-complete after 5 days | MVP |
| FR-7.11 | Completed service orders have a 7-day clearance before funds release | MVP |
| FR-7.12 | Completed product orders have a 3-day clearance before funds release | MVP |
| FR-7.13 | Buyers and sellers can view order status and history | MVP |

### FR-8: Digital Product Delivery

| ID | Requirement | Priority |
|---|---|---|
| FR-8.1 | Upon purchase, a download token is generated with 72-hour expiry and 5-download limit | MVP |
| FR-8.2 | Download links use the token to generate S3 signed URLs (15-min expiry) | MVP |
| FR-8.3 | Download count is incremented on each download | MVP |
| FR-8.4 | Buyers can re-access all purchased products from /dashboard/downloads | MVP |
| FR-8.5 | Expired tokens are automatically regenerated when buyer accesses download page | MVP |
| FR-8.6 | Product files are stored in a private S3 bucket — never publicly accessible | MVP |

### FR-9: Messaging

| ID | Requirement | Priority |
|---|---|---|
| FR-9.1 | Each order has a message thread between buyer and seller | MVP |
| FR-9.2 | Messages support text and file attachments | MVP |
| FR-9.3 | System messages are auto-generated for status changes (e.g., "Order accepted," "Delivery submitted") | MVP |
| FR-9.4 | Users see all conversations in /dashboard/messages or /seller/dashboard/messages | MVP |
| FR-9.5 | New messages trigger email notifications | MVP |
| FR-9.6 | Messages are ordered chronologically within a thread | MVP |

### FR-10: Reviews & Ratings

| ID | Requirement | Priority |
|---|---|---|
| FR-10.1 | Buyers can leave a review (1–5 stars + text) after order completion | MVP |
| FR-10.2 | One review per order item | MVP |
| FR-10.3 | Sellers can respond to reviews (one response per review) | MVP |
| FR-10.4 | Reviews are displayed on listing detail pages and seller profiles | MVP |
| FR-10.5 | Aggregate rating is calculated and cached on listings and seller profiles | MVP |
| FR-10.6 | Listings display aggregate rating only after 3+ reviews | MVP |
| FR-10.7 | Reviews cannot be edited after 48 hours | MVP |
| FR-10.8 | Reviews can be reported; admin can hide inappropriate reviews | MVP |

### FR-11: Seller Earnings & Payouts

| ID | Requirement | Priority |
|---|---|---|
| FR-11.1 | Sellers connect their bank via Stripe Connect Express during onboarding | MVP |
| FR-11.2 | Earnings dashboard shows: available balance, pending balance, total earned | MVP |
| FR-11.3 | Platform commission is deducted before funds reach seller balance | MVP |
| FR-11.4 | Payouts are handled by Stripe Connect (automatic to seller's bank) | MVP |
| FR-11.5 | Sellers can view payout history with dates, amounts, and status | MVP |

### FR-12: Notifications

| ID | Requirement | Priority |
|---|---|---|
| FR-12.1 | Email notifications sent for: new order, order accepted/declined, delivery, acceptance, revision request, new message, dispute updates, review received, payout | MVP |
| FR-12.2 | In-app notification records stored in database | MVP |
| FR-12.3 | Dashboard shows notification bell with unread count | MVP |
| FR-12.4 | Clicking a notification navigates to the relevant page | MVP |
| FR-12.5 | Users can mark notifications as read | MVP |

### FR-13: Admin Dashboard

| ID | Requirement | Priority |
|---|---|---|
| FR-13.1 | Admin overview shows: total users, active sellers, active listings, orders this month, revenue this month, open disputes | MVP |
| FR-13.2 | User management: search, view profile, suspend, ban with reason | MVP |
| FR-13.3 | Listing moderation: queue of pending/flagged listings, approve/reject with reason | MVP |
| FR-13.4 | Dispute resolution: view evidence, message parties, resolve (refund/release/partial) | MVP |
| FR-13.5 | Category management: CRUD categories and subcategories | MVP |
| FR-13.6 | Transaction log: all payments with buyer, seller, amount, status | MVP |
| FR-13.7 | Audit log: all admin actions with admin ID, action, target, reason, timestamp | MVP |

### FR-14: Public Pages

| ID | Requirement | Priority |
|---|---|---|
| FR-14.1 | Homepage: hero section, featured categories, how it works, featured listings | MVP |
| FR-14.2 | About page | MVP |
| FR-14.3 | How It Works page (for buyers and sellers) | MVP |
| FR-14.4 | FAQ page | MVP |
| FR-14.5 | Terms of Service page | MVP |
| FR-14.6 | Privacy Policy page | MVP |
| FR-14.7 | Contact page with form | MVP |
| FR-14.8 | Seller pricing/commission info page | MVP |

---

## 7. Non-Functional Requirements

### NFR-1: Performance

| ID | Requirement | Target |
|---|---|---|
| NFR-1.1 | Page load time (LCP) | < 2.5 seconds on 4G |
| NFR-1.2 | Time to Interactive (TTI) | < 3.5 seconds on 4G |
| NFR-1.3 | API response time (server actions) | < 500ms for reads, < 1s for writes |
| NFR-1.4 | Search query response time | < 1 second for up to 10,000 listings |
| NFR-1.5 | Image loading | Lazy-loaded, responsive sizes via Next.js Image |
| NFR-1.6 | Database queries | Indexed on all foreign keys, status columns, and slugs |

**Implementation approach:**
- React Server Components for zero-JS initial page loads where possible
- Next.js built-in caching (ISR for listing pages, fetch cache for repeated queries)
- PostgreSQL indexes on all query-critical columns
- Image optimization via Next.js Image component
- Skeleton loading states for all data-dependent UI

### NFR-2: Security

| ID | Requirement |
|---|---|
| NFR-2.1 | All user input validated server-side with Zod schemas before processing |
| NFR-2.2 | SQL injection prevented by Prisma's parameterized queries |
| NFR-2.3 | XSS prevented by React's auto-escaping; rich text sanitized with DOMPurify on server |
| NFR-2.4 | CSRF protection via Next.js Server Actions (built-in) |
| NFR-2.5 | Authentication via Auth.js with httpOnly JWT cookies |
| NFR-2.6 | Authorization checks at server action level for every protected operation |
| NFR-2.7 | Data scoping: users can only access their own resources (enforced in queries) |
| NFR-2.8 | File uploads: presigned URLs, file type validation, private S3 bucket |
| NFR-2.9 | Payment card data never touches our servers (Stripe Checkout handles PCI) |
| NFR-2.10 | Stripe webhooks verified via signature verification |
| NFR-2.11 | Rate limiting on authentication routes |
| NFR-2.12 | Secrets stored in environment variables, never in code |
| NFR-2.13 | Download links use signed URLs with short expiry |

### NFR-3: Accessibility

| ID | Requirement |
|---|---|
| NFR-3.1 | WCAG 2.1 Level AA compliance for all interactive elements |
| NFR-3.2 | Keyboard navigable: all interactive elements reachable via Tab, Enter, Escape |
| NFR-3.3 | Screen reader compatible: proper ARIA labels, semantic HTML, alt text on images |
| NFR-3.4 | Color contrast ratios meet AA standards (4.5:1 for text, 3:1 for large text) |
| NFR-3.5 | Focus indicators visible on all interactive elements |
| NFR-3.6 | Form error messages associated with inputs via aria-describedby |

**Implementation approach:** shadcn/ui components are built on Radix UI primitives which handle most accessibility out of the box. Focus on semantic HTML and proper labeling.

### NFR-4: Responsiveness

| ID | Requirement |
|---|---|
| NFR-4.1 | Mobile-first design: all pages usable at 320px viewport width |
| NFR-4.2 | Breakpoints: mobile (< 640px), tablet (640–1024px), desktop (> 1024px) |
| NFR-4.3 | Touch targets minimum 44x44px on mobile |
| NFR-4.4 | Navigation collapses to mobile menu on small screens |
| NFR-4.5 | Dashboard sidebars collapse to bottom nav or hamburger on mobile |
| NFR-4.6 | Listing grids adapt: 1 column mobile, 2 columns tablet, 3–4 columns desktop |
| NFR-4.7 | Images responsive with appropriate srcset |

### NFR-5: Maintainability

| ID | Requirement |
|---|---|
| NFR-5.1 | TypeScript strict mode enabled — no `any` types in business logic |
| NFR-5.2 | Modular architecture: each domain module has clear boundaries and interfaces |
| NFR-5.3 | Consistent file naming: kebab-case for files, PascalCase for components |
| NFR-5.4 | Zod schemas define the contract between client and server |
| NFR-5.5 | Prisma schema is the single source of truth for database structure |
| NFR-5.6 | Database migrations tracked and versioned via Prisma Migrate |
| NFR-5.7 | Environment configuration via .env with .env.example template |
| NFR-5.8 | Error handling: custom error types with consistent error response format |

### NFR-6: Scalability

| ID | Requirement |
|---|---|
| NFR-6.1 | Architecture supports extraction of modules into separate services if needed |
| NFR-6.2 | Database schema supports 100K+ users, 50K+ listings, 500K+ orders without redesign |
| NFR-6.3 | File storage on S3 — scales independently of application |
| NFR-6.4 | Stateless application — horizontally scalable behind load balancer |
| NFR-6.5 | Search abstracted behind service interface — replaceable with Algolia/Elasticsearch |
| NFR-6.6 | Background tasks designed to be movable to a job queue without refactoring |

### NFR-7: SEO

| ID | Requirement |
|---|---|
| NFR-7.1 | Server-rendered pages for all public content (listings, categories, seller stores) |
| NFR-7.2 | Proper meta tags (title, description, OG image) on all public pages |
| NFR-7.3 | Semantic HTML structure with proper heading hierarchy |
| NFR-7.4 | URL slugs are human-readable and keyword-friendly |
| NFR-7.5 | sitemap.xml generated dynamically from active listings and categories |
| NFR-7.6 | robots.txt configured to allow public pages, block dashboard routes |
| NFR-7.7 | Canonical URLs on all pages |
| NFR-7.8 | Structured data (JSON-LD) for listings: Product/Service schema |

---

## 8. MVP Scope

### Included in MVP

**Core marketplace:**
- User registration, login, email verification (email + Google OAuth)
- Role-based access (Guest, Buyer, Seller, Admin)
- Seller onboarding with Stripe Connect
- Service listing creation with 1–3 pricing packages and add-ons
- Digital product listing creation with secure file upload
- Browse/search with filters (category, type, price, rating, sort)
- Listing detail pages with gallery, packages, reviews
- Seller store pages
- Shopping cart
- Stripe Checkout for payments
- Digital product instant delivery via secure downloads
- Service order lifecycle (pending → in-progress → delivered → completed)
- Buyer-seller messaging per order
- Review and rating system
- Buyer dashboard (orders, downloads, messages, settings)
- Seller dashboard (listings, orders, earnings, messages, store, settings)
- Admin dashboard (overview, users, listings, disputes, categories, transactions, audit log)
- Basic dispute system (open, review, resolve)
- Email notifications for key events
- In-app notification bell with unread count
- Responsive, mobile-first UI
- Public pages (home, about, how it works, FAQ, terms, privacy, contact, pricing)

**Technical:**
- Next.js App Router with TypeScript
- PostgreSQL with Prisma ORM
- Auth.js for authentication
- Stripe + Stripe Connect for payments
- S3 for file storage
- Resend for transactional email
- shadcn/ui + Tailwind CSS for UI
- Deployed on Vercel

### MVP commission model
- Flat 12% on all transactions, all seller tiers

---

## 9. Out of Scope (NOT in MVP)

| Feature | Reason | When |
|---|---|---|
| Featured/promoted listings | Need existing inventory before selling ad placement | Phase 2 |
| Seller subscription tiers (Pro/Business) | Need seller base to justify tiered pricing | Phase 2 |
| Custom offers via messaging | Extension of messaging; core flow works without it | Phase 2 |
| Milestone-based payments | Complex payment flow; simple orders work for MVP | Phase 2 |
| Wishlist/favorites | Engagement feature, not critical path | Phase 2 |
| Seller analytics dashboard | Nice for retention, not needed for launch | Phase 2 |
| Advanced search (autocomplete, full-text) | PostgreSQL basic search is sufficient initially | Phase 2 |
| Social login beyond Google (GitHub, Twitter) | One OAuth provider sufficient for launch | Phase 2 |
| Real-time notifications (WebSocket/SSE) | Email + polling sufficient for MVP volume | Phase 2 |
| Category SEO landing pages | Growth optimization, not launch blocker | Phase 2 |
| Bulk listing management | Efficiency feature for power sellers | Phase 2 |
| AI-powered search/recommendations | High value but high complexity | Phase 3+ |
| Seller team accounts | For agencies; need business tier first | Phase 3+ |
| Public API | Platform play; premature for MVP | Phase 3+ |
| Affiliate/referral program | Growth channel; need proven product first | Phase 3+ |
| Multi-currency support | International expansion | Phase 3+ |
| Mobile app | Web responsive is sufficient; native only when mobile traffic justifies cost | Phase 3+ |
| Video consultations | Service delivery enhancement | Phase 3+ |
| Subscription-based digital products | Recurring revenue model; adds billing complexity | Phase 3+ |
| White-label invoicing | Business tier feature | Phase 3+ |

---

## 10. User Stories

### Authentication & Onboarding

| ID | Role | Story | Priority |
|---|---|---|---|
| US-1.1 | Visitor | As a visitor, I want to create a buyer account with my email or Google so that I can purchase listings | MVP |
| US-1.2 | Visitor | As a visitor, I want to browse all listings without creating an account so that I can evaluate the platform | MVP |
| US-1.3 | User | As a user, I want to verify my email so that my account is activated for purchasing | MVP |
| US-1.4 | User | As a user, I want to reset my password via email so that I can regain access if I forget it | MVP |
| US-1.5 | Buyer | As a buyer, I want to become a seller by completing an onboarding flow so that I can list services and products | MVP |
| US-1.6 | Seller | As a new seller, I want to set up my store profile (name, bio, avatar) so that buyers can learn about me | MVP |
| US-1.7 | Seller | As a new seller, I want to connect my Stripe account so that I can receive payouts | MVP |

### Listing Management

| ID | Role | Story | Priority |
|---|---|---|---|
| US-2.1 | Seller | As a seller, I want to create a service listing with multiple pricing packages so that buyers can choose the option that fits their budget | MVP |
| US-2.2 | Seller | As a seller, I want to create a digital product listing with file upload so that buyers can purchase and download my products | MVP |
| US-2.3 | Seller | As a seller, I want to add images to my listing so that buyers can preview my work | MVP |
| US-2.4 | Seller | As a seller, I want to save listings as drafts so that I can finish them later | MVP |
| US-2.5 | Seller | As a seller, I want to edit, pause, or delete my listings so that I can manage my catalog | MVP |
| US-2.6 | Seller | As a seller, I want to define optional add-ons for my service listings so that buyers can customize their order | MVP |
| US-2.7 | Seller | As a seller, I want to categorize and tag my listings so that they appear in relevant searches | MVP |
| US-2.8 | Seller | As a seller, I want to add FAQ pairs to my listing so that common questions are answered upfront | MVP |

### Browsing & Discovery

| ID | Role | Story | Priority |
|---|---|---|---|
| US-3.1 | Buyer | As a buyer, I want to search for listings by keyword so that I can find what I need | MVP |
| US-3.2 | Buyer | As a buyer, I want to filter listings by type, category, price range, and rating so that I can narrow results | MVP |
| US-3.3 | Buyer | As a buyer, I want to sort listings by newest, price, or rating so that I can prioritize results | MVP |
| US-3.4 | Buyer | As a buyer, I want to browse listings by category so that I can explore a specific area | MVP |
| US-3.5 | Buyer | As a buyer, I want to view a listing's full detail page so that I can understand what I'm buying | MVP |
| US-3.6 | Buyer | As a buyer, I want to visit a seller's store page so that I can see their portfolio and reputation | MVP |

### Cart & Checkout

| ID | Role | Story | Priority |
|---|---|---|---|
| US-4.1 | Buyer | As a buyer, I want to add items to my cart so that I can purchase multiple things at once | MVP |
| US-4.2 | Buyer | As a buyer, I want to select a specific package and add-ons for a service before adding to cart so that my order is accurate | MVP |
| US-4.3 | Buyer | As a buyer, I want to review my cart before checkout so that I can confirm my selections | MVP |
| US-4.4 | Buyer | As a buyer, I want to pay securely via Stripe so that my payment information is safe | MVP |
| US-4.5 | Buyer | As a buyer, I want to see a confirmation page after purchase so that I know my order was successful | MVP |

### Digital Product Delivery

| ID | Role | Story | Priority |
|---|---|---|---|
| US-5.1 | Buyer | As a buyer, I want to download my purchased digital product immediately after payment so that I get instant value | MVP |
| US-5.2 | Buyer | As a buyer, I want to re-download purchased products from my dashboard so that I don't lose access to files | MVP |
| US-5.3 | Buyer | As a buyer, I want to see all my purchased products in a digital library so that I can manage my purchases | MVP |

### Service Order Management

| ID | Role | Story | Priority |
|---|---|---|---|
| US-6.1 | Seller | As a seller, I want to see new orders in my dashboard so that I can start working on them promptly | MVP |
| US-6.2 | Seller | As a seller, I want to accept or decline an order so that I can manage my workload | MVP |
| US-6.3 | Seller | As a seller, I want to deliver my work by uploading files so that the buyer can review the result | MVP |
| US-6.4 | Buyer | As a buyer, I want to accept a delivery so that the order is completed and the seller is paid | MVP |
| US-6.5 | Buyer | As a buyer, I want to request a revision if the delivery doesn't meet expectations so that I get what I paid for | MVP |
| US-6.6 | Buyer | As a buyer, I want to track my order status so that I know where things stand | MVP |
| US-6.7 | Seller | As a seller, I want to track delivery deadlines so that I deliver on time | MVP |

### Messaging

| ID | Role | Story | Priority |
|---|---|---|---|
| US-7.1 | Buyer | As a buyer, I want to message the seller about my order so that I can share requirements and ask questions | MVP |
| US-7.2 | Seller | As a seller, I want to message the buyer so that I can clarify requirements and share updates | MVP |
| US-7.3 | User | As a user, I want to attach files to messages so that I can share relevant documents | MVP |
| US-7.4 | User | As a user, I want to see all my conversations in one place so that I can manage communication | MVP |
| US-7.5 | User | As a user, I want to receive email notifications for new messages so that I don't miss important communication | MVP |

### Reviews & Ratings

| ID | Role | Story | Priority |
|---|---|---|---|
| US-8.1 | Buyer | As a buyer, I want to leave a star rating and written review after an order so that other buyers benefit from my experience | MVP |
| US-8.2 | Buyer | As a buyer, I want to read reviews before purchasing so that I can make an informed decision | MVP |
| US-8.3 | Seller | As a seller, I want to respond to reviews so that I can address feedback publicly | MVP |
| US-8.4 | User | As a user, I want to report a fraudulent review so that the platform stays trustworthy | MVP |

### Earnings & Payouts

| ID | Role | Story | Priority |
|---|---|---|---|
| US-9.1 | Seller | As a seller, I want to see my earnings overview (available, pending, total) so that I know my financial status | MVP |
| US-9.2 | Seller | As a seller, I want to receive automatic payouts to my bank so that I get paid reliably | MVP |
| US-9.3 | Seller | As a seller, I want to view my payout history so that I can track what I've been paid | MVP |

### Disputes

| ID | Role | Story | Priority |
|---|---|---|---|
| US-10.1 | Buyer | As a buyer, I want to open a dispute if I'm unsatisfied so that I can get a resolution | MVP |
| US-10.2 | Admin | As an admin, I want to view dispute details and communication history so that I can make a fair decision | MVP |
| US-10.3 | Admin | As an admin, I want to resolve disputes with refund/release/partial options so that both parties get a clear outcome | MVP |

### Admin

| ID | Role | Story | Priority |
|---|---|---|---|
| US-11.1 | Admin | As an admin, I want to see platform overview metrics so that I understand marketplace health | MVP |
| US-11.2 | Admin | As an admin, I want to approve or reject pending listings so that marketplace quality is maintained | MVP |
| US-11.3 | Admin | As an admin, I want to suspend or ban users with a recorded reason so that I can enforce platform rules | MVP |
| US-11.4 | Admin | As an admin, I want to manage categories and subcategories so that the taxonomy stays organized | MVP |
| US-11.5 | Admin | As an admin, I want to view all transactions so that I can audit financial activity | MVP |
| US-11.6 | Admin | As an admin, I want all my actions logged so that there's an audit trail | MVP |

### Notifications

| ID | Role | Story | Priority |
|---|---|---|---|
| US-12.1 | User | As a user, I want to receive email notifications for important events so that I stay informed | MVP |
| US-12.2 | User | As a user, I want to see a notification bell with unread count in my dashboard so that I know when something needs attention | MVP |
| US-12.3 | User | As a user, I want to click a notification to go to the relevant page so that I can take action quickly | MVP |

---

## 11. Acceptance Criteria

### AC-1: User Registration

```
GIVEN a visitor on the registration page
WHEN they enter a valid email and password, or click "Sign in with Google"
THEN an account is created with role BUYER
AND a verification email is sent
AND they are redirected to the dashboard with a prompt to verify email

GIVEN a user with an unverified email
WHEN they attempt to purchase or create a listing
THEN they see a message asking them to verify their email first

GIVEN a user clicking the verification link
WHEN the token is valid and not expired
THEN their email is marked as verified
AND they can proceed with purchases and selling
```

### AC-2: Seller Onboarding

```
GIVEN a buyer who clicks "Start Selling"
WHEN they complete all onboarding steps (profile, Stripe Connect, first listing)
THEN their role is upgraded to SELLER
AND their store page is publicly visible
AND their first listing is submitted for admin review

GIVEN a seller during Stripe Connect setup
WHEN they complete the Stripe Express onboarding flow
THEN their stripe_account_id is stored
AND stripe_onboarded is set to true
AND they can receive payouts
```

### AC-3: Listing Creation (Service)

```
GIVEN a seller on the create listing page
WHEN they select "Service" and fill in: title, description, category, at least 1 package with price and delivery days
THEN they can save as draft or submit for review

GIVEN a listing submitted for review (seller has <3 approved listings)
WHEN admin has not yet reviewed
THEN the listing status is PENDING_REVIEW and not visible publicly

GIVEN a listing submitted by a seller with 3+ approved listings
WHEN it is submitted
THEN the listing status is ACTIVE and visible publicly immediately

GIVEN a service listing with 3 packages
WHEN a buyer views the listing detail page
THEN they see a comparison table with all 3 packages and can select one
```

### AC-4: Listing Creation (Digital Product)

```
GIVEN a seller creating a digital product listing
WHEN they upload a file (up to 500MB)
THEN the file is uploaded to S3 via presigned URL
AND the file reference is stored in the database
AND the file is not publicly accessible

GIVEN a digital product listing with uploaded files
WHEN the listing is active and a buyer views it
THEN the buyer sees file format information but cannot download without purchasing
```

### AC-5: Search & Browse

```
GIVEN a buyer on the explore page
WHEN they enter a search keyword
THEN results include listings whose title, description, or tags match the keyword

GIVEN a buyer applying filters
WHEN they select type=Product, category="Templates", price=$10-$50, minimum rating=4
THEN only listings matching ALL filters are shown

GIVEN search results
WHEN the buyer changes sort to "Price: Low to High"
THEN results reorder by price ascending
AND pagination resets to page 1
```

### AC-6: Cart & Checkout

```
GIVEN a buyer adding a service listing to cart
WHEN they select the Standard package and a "Rush delivery" add-on
THEN the cart item stores the package ID and add-on details with correct total price

GIVEN a buyer proceeding to checkout with cart items
WHEN they complete Stripe Checkout successfully
THEN orders are created for each cart item
AND cart is cleared
AND buyer is redirected to confirmation page

GIVEN a Stripe Checkout failure
WHEN payment is declined or cancelled
THEN no orders are created
AND cart items are preserved
AND buyer sees an appropriate error message
```

### AC-7: Digital Product Purchase & Download

```
GIVEN a buyer who just purchased a digital product
WHEN they land on the confirmation page
THEN download buttons are immediately available
AND a download link is sent via email

GIVEN a buyer clicking a download button
WHEN the download token is valid (not expired, count not exceeded)
THEN a signed S3 URL is generated
AND the file downloads
AND download count is incremented

GIVEN a buyer visiting /dashboard/downloads
WHEN they view their library
THEN all previously purchased products are listed with download buttons
AND expired tokens are auto-regenerated
```

### AC-8: Service Order Lifecycle

```
GIVEN a new service order (status: PENDING)
WHEN the seller clicks "Accept Order"
THEN status changes to IN_PROGRESS
AND delivery countdown begins based on package delivery days
AND buyer is notified

GIVEN a seller delivering an order
WHEN they upload deliverables and click "Deliver Order"
THEN status changes to DELIVERED
AND buyer is notified
AND deliverables are accessible to the buyer

GIVEN a buyer receiving a delivery
WHEN they click "Accept Delivery"
THEN status changes to COMPLETED
AND funds enter 7-day clearance period
AND both parties are prompted to review

GIVEN a buyer requesting a revision
WHEN revision count is > 0 for the selected package
THEN status returns to IN_PROGRESS
AND revision count is decremented
AND seller is notified

GIVEN a delivered order with no buyer action
WHEN 5 calendar days pass
THEN order auto-completes
AND funds enter clearance
AND both parties are notified
```

### AC-9: Messaging

```
GIVEN a buyer or seller on an order detail page
WHEN they type a message and press send
THEN the message appears in the thread immediately
AND the other party receives an email notification

GIVEN a user sending a message with a file attachment
WHEN the file is uploaded successfully
THEN it appears in the message as a downloadable link
AND the file is stored securely in S3
```

### AC-10: Reviews

```
GIVEN a completed order
WHEN the buyer visits the order page after completion
THEN they see a "Leave Review" prompt

GIVEN a buyer submitting a review
WHEN they provide 1-5 stars and a text comment
THEN the review is saved and visible on the listing page
AND the listing's aggregate rating is recalculated

GIVEN a seller viewing a review on their listing
WHEN they click "Respond"
THEN they can write one response that appears below the review
```

### AC-11: Dispute Resolution

```
GIVEN a buyer opening a dispute
WHEN they provide a reason and description
THEN the order status changes to DISPUTED
AND an admin notification is created
AND the seller is notified

GIVEN an admin resolving a dispute with "Full Refund"
WHEN they submit the resolution
THEN the buyer receives a refund via Stripe
AND the order status reflects the resolution
AND both parties are notified
AND the action is logged in the admin audit trail
```

### AC-12: Admin Listing Moderation

```
GIVEN an admin viewing the moderation queue
WHEN there are pending listings
THEN each listing shows: title, seller, category, type, submitted date

GIVEN an admin reviewing a listing
WHEN they click "Approve"
THEN the listing status changes to ACTIVE
AND it becomes visible publicly
AND the seller is notified

GIVEN an admin rejecting a listing
WHEN they provide a rejection reason and click "Reject"
THEN the listing status changes to REJECTED
AND the seller is notified with the reason
AND the action is logged
```

### AC-13: Seller Earnings

```
GIVEN a completed order past clearance period
WHEN the funds are released
THEN the seller's available balance increases by (order amount - 12% commission)

GIVEN a seller viewing the earnings dashboard
WHEN the page loads
THEN they see: available balance (withdrawable), pending balance (in clearance), total earned (all time)
AND a list of recent transactions with dates and amounts
```

### AC-14: Responsive Design

```
GIVEN any page in the application
WHEN viewed on a mobile device (320px–640px)
THEN all content is readable without horizontal scrolling
AND navigation is accessible via mobile menu
AND touch targets are at least 44x44px
AND listing grids display in a single column

GIVEN the seller or buyer dashboard
WHEN viewed on mobile
THEN the sidebar collapses to a hamburger menu or bottom navigation
AND all dashboard functionality remains accessible
```

---

## 12. Success Metrics

### Business Metrics

| Metric | Definition | MVP Target (6 months) |
|---|---|---|
| **GMV** (Gross Merchandise Value) | Total value of all transactions | $30,000 cumulative |
| **Platform Revenue** | GMV × 12% commission | $3,600 cumulative |
| **Monthly Active Sellers** | Sellers with at least 1 active listing | 100 |
| **Monthly Active Buyers** | Buyers who made at least 1 purchase in the month | 200 |
| **Transactions/Month** | Number of completed orders per month | 50+ by month 6 |
| **Average Order Value (AOV)** | Total GMV / number of orders | $50+ |
| **Seller-to-Buyer Ratio** | Active sellers / active buyers | 1:3 to 1:5 (healthy marketplace) |

### Product Metrics

| Metric | Definition | Target |
|---|---|---|
| **Conversion Rate** | Visitors who view a listing → complete purchase | 2–5% |
| **Listing Activation Rate** | New sellers who publish at least 1 listing within 7 days of signup | 60%+ |
| **Order Completion Rate** | Orders that reach COMPLETED status (not cancelled or disputed) | 90%+ |
| **Dispute Rate** | Orders that result in a dispute | < 5% |
| **Repeat Purchase Rate** | Buyers who make 2+ purchases | 20%+ within 3 months |
| **Time to First Order** | Days from seller's first listing going live to first order | < 30 days |
| **Review Rate** | Completed orders that receive a buyer review | 30%+ |
| **Average Rating** | Mean rating across all reviews | 4.0+ (indicates quality control is working) |

### Technical Metrics

| Metric | Definition | Target |
|---|---|---|
| **Uptime** | Application availability | 99.5%+ |
| **Page Load (LCP)** | Largest Contentful Paint | < 2.5s |
| **Error Rate** | Server-side errors / total requests | < 1% |
| **Checkout Success Rate** | Successful payments / checkout attempts | 95%+ |
| **Download Success Rate** | Successful file downloads / download attempts | 99%+ |

### How to Track (MVP Approach)

- **Business metrics:** Stripe Dashboard for GMV/revenue; simple admin dashboard queries for user/listing/order counts
- **Product metrics:** Database queries exposed in admin dashboard; Stripe for checkout conversion
- **Technical metrics:** Vercel Analytics for performance; Sentry for error tracking
- **Phase 2:** Add PostHog or Mixpanel for detailed product analytics, funnel analysis, and cohort tracking

---

*This PRD is the implementation contract for AMAIA MVP. All acceptance criteria should be verifiable through manual testing at minimum. Automated tests should cover the critical paths: checkout, order lifecycle, and download delivery.*
