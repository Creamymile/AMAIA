# AMAIA — Feature Breakdown, Sitemap & User Flows

> Implementation Reference Document
> Version 1.0 — March 2026

---

## 1. Feature Breakdown

### 1.1 Public Marketplace Features

| ID | Feature | Priority | Description |
|---|---|---|---|
| PUB-01 | Homepage | Must-have | Hero section, featured categories grid, "How it works" steps, featured/popular listings carousel, CTA for sellers |
| PUB-02 | Explore / Browse Page | Must-have | Paginated listing grid with search bar, filters (type, category, price, rating), sort options |
| PUB-03 | Listing Detail — Service | Must-have | Title, gallery, description, package comparison table, add-ons, seller card, reviews, FAQ, related listings |
| PUB-04 | Listing Detail — Product | Must-have | Title, gallery, description, price, file format info, seller card, reviews, instant buy button |
| PUB-05 | Seller Store Page | Must-have | Seller bio, banner, stats (rating, reviews, completed orders), all listings by this seller |
| PUB-06 | Category Page | Must-have | Category description, filtered listings grid, subcategory tabs |
| PUB-07 | Search | Must-have | Keyword search across titles, descriptions, tags; results in listing grid format |
| PUB-08 | About Page | Must-have | Platform story, mission, team |
| PUB-09 | How It Works | Must-have | Step-by-step buyer and seller journey explanation |
| PUB-10 | Seller Pricing Page | Must-have | Commission rates, benefits of selling on AMAIA |
| PUB-11 | FAQ Page | Must-have | Categorized Q&A |
| PUB-12 | Terms of Service | Must-have | Legal terms |
| PUB-13 | Privacy Policy | Must-have | Privacy terms |
| PUB-14 | Contact Page | Must-have | Contact form |
| PUB-15 | 404 / Error Pages | Must-have | Branded error pages |
| PUB-16 | SEO Meta Tags | Must-have | Dynamic title, description, OG image per page |
| PUB-17 | Sitemap.xml | Should-have | Auto-generated from listings, categories, sellers |
| PUB-18 | JSON-LD Structured Data | Should-have | Product/Service schema on listing pages |
| PUB-19 | Blog | Nice-to-have | Content marketing and SEO |

### 1.2 Buyer Features

| ID | Feature | Priority | Description |
|---|---|---|---|
| BUY-01 | Registration (email + Google) | Must-have | Create buyer account |
| BUY-02 | Email Verification | Must-have | Verify email before purchasing |
| BUY-03 | Login / Logout | Must-have | Session management |
| BUY-04 | Password Reset | Must-have | Email-based password recovery |
| BUY-05 | Buyer Dashboard Overview | Must-have | Recent orders, quick links, stats |
| BUY-06 | Add to Cart | Must-have | Add listings with selected package/add-ons |
| BUY-07 | Cart Management | Must-have | View, update quantity, remove items, see totals |
| BUY-08 | Stripe Checkout | Must-have | Pay via Stripe hosted checkout |
| BUY-09 | Order Confirmation | Must-have | Post-payment confirmation page with next steps |
| BUY-10 | Order History | Must-have | List all orders with status and date |
| BUY-11 | Order Detail (Service) | Must-have | Status timeline, messages, deliverables, accept/revise/dispute actions |
| BUY-12 | Order Detail (Product) | Must-have | Purchase confirmation, download buttons |
| BUY-13 | Digital Library | Must-have | All purchased products with re-download capability |
| BUY-14 | File Download | Must-have | Secure token-based download with signed S3 URLs |
| BUY-15 | Order Messaging | Must-have | Send/receive messages and attachments in order thread |
| BUY-16 | Accept Delivery | Must-have | Mark service order as complete |
| BUY-17 | Request Revision | Must-have | Send back for revision with feedback |
| BUY-18 | Open Dispute | Must-have | File dispute with reason and description |
| BUY-19 | Leave Review | Must-have | 1–5 stars + text after order completion |
| BUY-20 | Profile Settings | Must-have | Update name, avatar, email, password |
| BUY-21 | Notification Bell | Must-have | Unread count badge, list of notifications |
| BUY-22 | Notification Preferences | Should-have | Toggle email notifications per event type |
| BUY-23 | Favorites / Wishlist | Should-have | Save listings for later |
| BUY-24 | Pre-purchase Messaging | Nice-to-have | Message seller before purchasing |

### 1.3 Seller Features

| ID | Feature | Priority | Description |
|---|---|---|---|
| SEL-01 | Seller Onboarding | Must-have | Multi-step: profile setup → Stripe Connect → first listing |
| SEL-02 | Stripe Connect Setup | Must-have | Connect bank account via Stripe Express |
| SEL-03 | Seller Dashboard Overview | Must-have | Earnings summary, active orders count, recent activity |
| SEL-04 | Create Service Listing | Must-have | Title, description, category, tags, images, packages (1–3), add-ons, FAQ |
| SEL-05 | Create Product Listing | Must-have | Title, description, category, tags, images, price, file upload |
| SEL-06 | Listing Image Upload | Must-have | Up to 6 images per listing via presigned S3 URLs |
| SEL-07 | Product File Upload | Must-have | Up to 500MB via presigned S3 URL, stored privately |
| SEL-08 | Package Builder | Must-have | Define 1–3 tiers with name, description, price, delivery days, revisions, features |
| SEL-09 | Listing Management | Must-have | View all listings, filter by status, edit, pause, delete |
| SEL-10 | Edit Listing | Must-have | Modify any listing field; active listings may require re-review |
| SEL-11 | Save as Draft | Must-have | Save incomplete listings without publishing |
| SEL-12 | Order Management | Must-have | View all received orders, filter by status |
| SEL-13 | Accept / Decline Order | Must-have | Accept to start working; decline with reason triggers refund |
| SEL-14 | Deliver Order | Must-have | Upload deliverables + submit delivery |
| SEL-15 | Order Messaging | Must-have | Communicate with buyer in order thread |
| SEL-16 | Earnings Dashboard | Must-have | Available, pending, and total earnings |
| SEL-17 | Payout History | Must-have | List of payouts with dates, amounts, status |
| SEL-18 | Store Settings | Must-have | Edit store name, slug, bio, banner, portfolio links |
| SEL-19 | Account Settings | Must-have | Profile, password, payout settings |
| SEL-20 | Reviews Received | Must-have | View all reviews, respond to reviews |
| SEL-21 | Notification Bell | Must-have | Same as buyer, seller-specific events |
| SEL-22 | Seller Verification | Should-have | Auto-upgrade to Verified after criteria met (3 orders, 4.0+ rating) |
| SEL-23 | Custom Offers | Should-have | Send custom price/scope offer via messaging |
| SEL-24 | Analytics Dashboard | Should-have | Views, conversion rate, revenue charts |
| SEL-25 | Bulk Listing Actions | Nice-to-have | Pause/activate multiple listings at once |

### 1.4 Admin Features

| ID | Feature | Priority | Description |
|---|---|---|---|
| ADM-01 | Admin Dashboard Overview | Must-have | Key metrics: users, sellers, listings, orders, revenue, open disputes |
| ADM-02 | User Management | Must-have | Search/filter users, view detail, suspend, ban with reason |
| ADM-03 | Listing Moderation Queue | Must-have | Pending and flagged listings; approve, reject with reason |
| ADM-04 | Listing Detail Review | Must-have | Full listing preview with approve/reject actions |
| ADM-05 | Dispute Queue | Must-have | Open disputes sorted by age |
| ADM-06 | Dispute Resolution | Must-have | View full order + evidence, resolve with refund/release/partial |
| ADM-07 | Category Management | Must-have | CRUD categories and subcategories, reorder |
| ADM-08 | Transaction Log | Must-have | All payments with buyer, seller, amount, status, date |
| ADM-09 | Payout Monitoring | Must-have | View all seller payouts and their statuses |
| ADM-10 | Audit Log | Must-have | All admin actions logged with who, what, when, why |
| ADM-11 | Platform Settings | Should-have | Configurable commission rate, clearance periods |
| ADM-12 | Flagged Reviews | Should-have | Review moderation for reported reviews |
| ADM-13 | Featured Listings | Nice-to-have | Curate featured listings for homepage |
| ADM-14 | Email Broadcasts | Nice-to-have | Send platform announcements |

### 1.5 System Features

| ID | Feature | Priority | Description |
|---|---|---|---|
| SYS-01 | Auth.js Integration | Must-have | Email/password + Google OAuth, JWT sessions |
| SYS-02 | Role-Based Middleware | Must-have | Route protection by role (Guest, Buyer, Seller, Admin) |
| SYS-03 | Stripe Checkout Integration | Must-have | Create checkout sessions, handle success/cancel |
| SYS-04 | Stripe Webhook Handler | Must-have | Process checkout.session.completed, verify signatures |
| SYS-05 | Stripe Connect Integration | Must-have | Seller onboarding, application fee, payouts |
| SYS-06 | S3 File Storage | Must-have | Presigned uploads, private bucket, signed downloads |
| SYS-07 | Email Notifications (Resend) | Must-have | Transactional emails for all key events |
| SYS-08 | Download Token System | Must-have | Token generation, validation, expiry, count limiting |
| SYS-09 | Image Optimization | Must-have | Next.js Image with S3/Cloudinary loader |
| SYS-10 | Input Validation (Zod) | Must-have | Server-side validation on all actions and API routes |
| SYS-11 | Order Auto-completion Cron | Must-have | Daily job: auto-complete delivered orders after 5 days |
| SYS-12 | Order Auto-cancellation Cron | Must-have | Daily job: cancel pending orders after 48 hours of no seller response |
| SYS-13 | Token Cleanup Cron | Should-have | Daily job: purge expired download tokens |
| SYS-14 | Rate Limiting | Should-have | Rate limit auth routes and API endpoints |
| SYS-15 | Error Tracking (Sentry) | Should-have | Capture and alert on server errors |
| SYS-16 | Database Seeding | Must-have | Seed categories, admin user, and test data |
| SYS-17 | Notification Storage | Must-have | In-app notification records with read/unread state |

---

## 2. Page-by-Page Sitemap

### Public Pages

```
/                                         Homepage
├── Hero section with search bar
├── Featured categories (6-8 cards)
├── "How It Works" — 3 steps for buyers, 3 for sellers
├── Popular listings carousel
├── Seller CTA banner
└── Footer

/explore                                  Browse All Listings
├── Search bar (top)
├── Filter sidebar/top bar
│   ├── Type: All / Services / Products
│   ├── Category dropdown
│   ├── Price range slider
│   ├── Minimum rating
│   └── Sort: Newest / Price ↑ / Price ↓ / Rating / Popular
├── Results grid (20 per page)
│   └── Listing cards (thumbnail, title, seller, price, rating, type badge)
└── Pagination

/category/[slug]                          Category Page
├── Category header (name, description, icon)
├── Subcategory tabs
├── Listing grid (filtered by category)
├── Filters + sort (same as /explore)
└── Pagination

/listing/[slug]                           Listing Detail — Service
├── Gallery (image carousel)
├── Title + seller badge
├── Package comparison table (Basic / Standard / Premium)
│   ├── Price
│   ├── Description
│   ├── Delivery time
│   ├── Revisions
│   └── Feature checklist
├── Add-ons (checkboxes)
├── "Continue" → select package + add-ons → cart
├── Listing description (rich text)
├── FAQ accordion
├── Seller card (avatar, name, rating, bio, link to store)
├── Reviews section
│   ├── Average rating + distribution
│   └── Individual reviews with seller responses
└── Related listings

/listing/[slug]                           Listing Detail — Product
├── Gallery (preview images / mockups)
├── Title + seller badge
├── Price
├── "Buy Now" button + "Add to Cart" button
├── File format info (what buyer receives)
├── Listing description (rich text)
├── FAQ accordion
├── Seller card
├── Reviews section
└── Related listings

/seller/[username]                        Seller Store Page
├── Banner image
├── Seller info (avatar, name, bio, joined date)
├── Stats (rating, reviews, completed orders)
├── Portfolio links
├── Listings grid (all by this seller)
│   ├── Tab: All / Services / Products
│   └── Listing cards
└── Reviews received (latest)

/about                                    About Page
/how-it-works                             How It Works
/pricing                                  Seller Commission & Pricing Info
/faq                                      FAQ (categorized accordion)
/terms                                    Terms of Service
/privacy                                  Privacy Policy
/contact                                  Contact Form
```

### Auth Pages

```
/login                                    Login
├── Email + password form
├── "Sign in with Google" button
├── Link to /register
└── Link to /forgot-password

/register                                 Buyer Registration
├── Name, email, password form
├── "Sign up with Google" button
├── Link to /login
└── Accept terms checkbox

/register/seller                          Seller Onboarding (multi-step)
├── Step 1: Account (if not already registered)
│   └── Name, email, password or Google
├── Step 2: Seller Profile
│   └── Store name, bio, avatar, primary category
├── Step 3: Stripe Connect
│   └── "Connect your bank account" → Stripe Express flow
├── Step 4: First Listing
│   └── Guided listing creation
└── Completion: "Your listing is under review!"

/forgot-password                          Forgot Password
├── Email input
└── Submit → sends reset link

/reset-password?token=xxx                 Reset Password
├── New password + confirm
└── Submit → redirect to login

/verify-email?token=xxx                   Email Verification Callback
└── Validates token → marks email verified → redirect
```

### Buyer Dashboard

```
/dashboard                                Buyer Overview
├── Sidebar navigation
│   ├── Overview
│   ├── Orders
│   ├── Downloads
│   ├── Messages
│   ├── Reviews
│   ├── Favorites (Phase 2)
│   └── Settings
├── Active orders summary (count + list)
├── Recent purchases
├── Quick links (browse, downloads)
└── Notification bell (header)

/dashboard/orders                         Order History
├── Tabs: All / Active / Completed / Cancelled / Disputed
├── Order list (order number, listing title, seller, status, date, amount)
├── Search by order number
└── Pagination

/dashboard/orders/[id]                    Order Detail
├── Order header (number, status badge, date)
├── Order item info (listing title, package, price)
├── Status timeline (visual: ordered → accepted → delivered → completed)
├── FOR PRODUCTS:
│   └── Download buttons for each file
├── FOR SERVICES:
│   ├── Delivery info (due date, deliverables if delivered)
│   ├── Actions:
│   │   ├── "Accept Delivery" (if status = DELIVERED)
│   │   ├── "Request Revision" (if revisions remaining + DELIVERED)
│   │   └── "Open Dispute" (if not completed)
│   └── Message thread
│       ├── Messages chronologically
│       ├── System messages (status changes)
│       ├── File attachments
│       └── Message input + send
└── Review section (leave or view review if completed)

/dashboard/downloads                      Digital Library
├── Grid of purchased products
│   ├── Thumbnail
│   ├── Product title
│   ├── Purchase date
│   ├── File info (format, size)
│   └── Download button
└── Search by product name

/dashboard/messages                       All Conversations
├── Conversation list (latest message preview, unread indicator, date)
└── Search by seller name or order number

/dashboard/messages/[id]                  Conversation Thread
├── Order context bar (order #, listing, status)
├── Messages chronologically
├── File attachments
└── Message input + send + attach file

/dashboard/reviews                        My Reviews
├── List of reviews I've left
│   ├── Listing title
│   ├── Rating
│   ├── Review text
│   ├── Date
│   └── Seller response (if any)
└── Pagination

/dashboard/favorites                      Saved Listings (Phase 2)
├── Grid of favorited listings
└── Remove from favorites

/dashboard/settings                       Profile Settings
├── Name, email, avatar upload
├── Password change
└── Save button

/dashboard/settings/notifications         Notification Preferences (Phase 2)
├── Toggle per notification type
│   ├── Order updates
│   ├── Messages
│   ├── Reviews
│   └── Platform announcements
└── Save button
```

### Seller Dashboard

```
/seller/dashboard                         Seller Overview
├── Sidebar navigation
│   ├── Overview
│   ├── Listings
│   ├── Orders
│   ├── Earnings
│   ├── Messages
│   ├── Reviews
│   ├── Analytics (Phase 2)
│   ├── Store Settings
│   └── Account Settings
├── Earnings snapshot (available, pending)
├── Active orders count + list
├── Recent listing views / performance
├── Pending actions (orders to accept, deliveries to make)
└── Notification bell (header)

/seller/dashboard/listings                My Listings
├── Tabs: All / Active / Draft / Pending Review / Paused / Rejected
├── Listing list (title, type badge, status, price/package range, views, orders, rating, date)
├── Actions per listing: Edit / Pause / Delete
├── "Create New Listing" button
└── Pagination

/seller/dashboard/listings/new            Create Listing
├── Step 1: Choose Type (Service / Product)
├── Step 2: Basic Info
│   ├── Title
│   ├── Category + subcategory
│   ├── Tags (up to 5)
│   └── Description (rich text editor)
├── Step 3: Media
│   └── Image upload (drag & drop, up to 6)
├── Step 4A (Service): Packages
│   ├── Package builder (Basic required, Standard + Premium optional)
│   │   └── Per package: name, description, price, delivery days, revisions, feature checklist
│   └── Add-ons: name + price (optional, multiple)
├── Step 4B (Product): Pricing & Files
│   ├── Price input
│   ├── File upload (drag & drop, up to 500MB)
│   └── File format description
├── Step 5: FAQ (optional)
│   └── Question + answer pairs
├── Preview (how listing will look)
└── Actions: Save Draft / Submit for Review

/seller/dashboard/listings/[id]/edit      Edit Listing
├── Same form as create, pre-populated
├── Status indicator
└── Actions: Save / Submit Changes

/seller/dashboard/orders                  Orders Received
├── Tabs: All / New / In Progress / Delivered / Completed / Cancelled / Disputed
├── Order list (order #, buyer name, listing, package, amount, status, date)
└── Pagination

/seller/dashboard/orders/[id]             Order Detail (Seller View)
├── Order header (number, status, buyer, date)
├── Order item details (listing, package, add-ons, amount, delivery due date)
├── Status timeline
├── Actions:
│   ├── "Accept Order" (if PENDING)
│   ├── "Decline Order" (if PENDING, with reason)
│   └── "Deliver Order" (if IN_PROGRESS)
│       ├── Upload deliverables (files)
│       └── Delivery message
├── Message thread (same as buyer view)
└── Commission breakdown (order total, platform fee, seller earnings)

/seller/dashboard/earnings                Earnings
├── Balance cards:
│   ├── Available Balance (withdrawable)
│   ├── Pending Balance (in clearance)
│   └── Total Earned (all time)
├── Recent transactions table
│   └── Order #, buyer, amount, commission, net, status, date
└── Link to payout history

/seller/dashboard/earnings/payouts        Payout History
├── Payout list (amount, date, status, Stripe reference)
└── Stripe Connect account status indicator

/seller/dashboard/messages                Messages (same as buyer)
/seller/dashboard/messages/[id]           Conversation Thread (same as buyer)

/seller/dashboard/reviews                 Reviews Received
├── List of reviews
│   ├── Buyer name, rating, text, date
│   ├── Listing name
│   ├── Seller response (if any)
│   └── "Respond" button (if no response yet)
└── Aggregate stats (avg rating, total reviews)

/seller/dashboard/analytics               Analytics (Phase 2)
├── Views over time (chart)
├── Revenue over time (chart)
├── Top listings by views / revenue
├── Conversion rate (views → orders)
└── Date range selector

/seller/dashboard/store                   Store Settings
├── Store name
├── Store slug / URL
├── Bio (rich text)
├── Banner image upload
├── Primary category
├── Portfolio links
└── Preview store page

/seller/dashboard/settings                Account Settings
├── Profile info (name, email, avatar)
├── Password change
└── Link to payout settings

/seller/dashboard/settings/payouts        Payout Settings
├── Stripe Connect account status
├── "Update bank details" → Stripe hosted flow
└── Payout preference (auto weekly — managed by Stripe)
```

### Admin Dashboard

```
/admin                                    Admin Overview
├── Sidebar navigation
│   ├── Overview
│   ├── Users
│   ├── Listings
│   ├── Orders
│   ├── Disputes
│   ├── Categories
│   ├── Transactions
│   ├── Payouts
│   ├── Settings
│   └── Audit Log
├── Metric cards:
│   ├── Total Users / New this week
│   ├── Active Sellers / Pending verification
│   ├── Active Listings / Pending review
│   ├── Orders this month / Revenue this month
│   └── Open Disputes
├── Action queues:
│   ├── Listings pending review (count + link)
│   ├── Open disputes (count + link)
│   └── Flagged content (count + link)
└── Recent activity feed

/admin/users                              User Management
├── Search bar (name, email)
├── Filters: role, status, date range
├── User list (name, email, role, status, joined, orders)
└── Pagination

/admin/users/[id]                         User Detail
├── Profile info (name, email, avatar, role, status, joined)
├── If seller: store info, listings, earnings
├── Order history
├── Reviews authored / received
├── Actions:
│   ├── Change role (Buyer ↔ Seller, assign Admin)
│   ├── Suspend (temporary, with reason + duration)
│   ├── Ban (permanent, with reason)
│   └── Unsuspend / Unban
└── Admin action history for this user

/admin/listings                           Listing Moderation
├── Tabs: Pending Review / Flagged / All
├── Listing list (title, seller, type, category, status, submitted date)
└── Pagination

/admin/listings/[id]                      Listing Review
├── Full listing preview (as buyer would see it)
├── Seller info
├── Listing metadata (created, updated, views, orders)
├── If product: file info (name, size, type)
├── Actions:
│   ├── Approve → listing goes ACTIVE
│   ├── Reject → with reason (sent to seller)
│   └── Request Changes → with notes (sent to seller)
└── Moderation history for this listing

/admin/orders                             All Orders
├── Search by order number
├── Filters: status, date range, seller, buyer
├── Order list (order #, buyer, seller, amount, status, date)
└── Pagination

/admin/orders/[id]                        Order Detail (Admin View)
├── Full order info (same as buyer/seller views combined)
├── Payment details (Stripe IDs, amounts, fees)
├── Full message thread (read-only)
├── Deliverables
└── Actions: Force refund, force complete (with audit log)

/admin/disputes                           Dispute Queue
├── Tabs: Open / Under Review / Resolved
├── Dispute list (order #, buyer, seller, reason, status, opened date)
└── Sorted by oldest first (FIFO)

/admin/disputes/[id]                      Dispute Detail
├── Dispute info (reason, description, opened date)
├── Order details (listing, package, amount)
├── Buyer's case (complaint text)
├── Seller's response
├── Full message thread
├── Deliverables (if any)
├── Resolution form:
│   ├── Decision: Full Refund / Release to Seller / Partial Refund
│   ├── Partial refund amount (if applicable)
│   ├── Admin notes (internal + external message)
│   └── Submit Resolution
└── Dispute history / timeline

/admin/categories                         Category Management
├── Category tree (drag to reorder)
├── For each category:
│   ├── Name, slug, description, icon
│   ├── Parent category (for subcategories)
│   ├── Active / Inactive toggle
│   ├── Edit / Delete
│   └── Listing count
└── "Add Category" button

/admin/transactions                       Transaction Log
├── Filters: date range, status, seller, buyer
├── Transaction list (payment ID, order #, buyer, seller, amount, platform fee, status, date)
├── Export CSV (Phase 2)
└── Pagination

/admin/payouts                            Payout Monitoring
├── Filters: status, seller, date range
├── Payout list (seller, amount, status, Stripe payout ID, date)
└── Pagination

/admin/settings                           Platform Settings
├── Commission rate (default 12%)
├── Clearance periods (products: 3 days, services: 7 days)
├── Auto-completion timeout (5 days)
├── Auto-cancellation timeout (48 hours)
├── Max file upload sizes
└── Save

/admin/audit-log                          Admin Audit Log
├── Filters: admin user, action type, target type, date range
├── Log entries (admin name, action, target, reason/notes, timestamp)
└── Pagination
```

### Checkout & Utility Pages

```
/cart                                     Shopping Cart
├── Cart items list
│   ├── Listing thumbnail + title
│   ├── Type badge (Service / Product)
│   ├── Package name (for services)
│   ├── Add-ons (for services)
│   ├── Price
│   └── Remove button
├── Cart summary (subtotal, total)
├── "Continue Shopping" link
└── "Proceed to Checkout" button

/checkout                                 Checkout Summary
├── Order summary (line items, total)
└── "Pay Now" → redirect to Stripe Checkout

/checkout/success                         Order Confirmation
├── Success message
├── Order number(s)
├── FOR PRODUCTS: download buttons
├── FOR SERVICES: "Your seller has been notified. They'll start soon."
├── Links to:
│   ├── Order detail
│   ├── Digital library (if products)
│   └── Continue browsing
└── Email confirmation sent notice

/api/auth/[...nextauth]                   Auth.js route handler
/api/webhooks/stripe                      Stripe webhook handler
/api/uploads/presign                      S3 presigned URL generator
/api/downloads/[token]                    Secure file download handler
```

---

## 3. Detailed User Flows

### Flow 1: User Registration

```
START → User clicks "Sign Up" or "Get Started"

→ /register page loads

OPTION A: Email Registration
  1. User enters: name, email, password
  2. User checks "I agree to Terms of Service"
  3. User clicks "Create Account"
  4. Server validates:
     - Email format valid
     - Email not already registered
     - Password meets minimum requirements (8+ chars)
  5. IF validation fails → show inline errors, stay on page
  6. IF validation passes:
     a. Create User record (role: BUYER, status: ACTIVE, emailVerified: null)
     b. Generate email verification token
     c. Send verification email via Resend
     d. Create session (JWT)
     e. Redirect to /dashboard with banner: "Please verify your email"

OPTION B: Google OAuth
  1. User clicks "Sign up with Google"
  2. Redirect to Google consent screen
  3. User authorizes
  4. Callback to /api/auth/callback/google
  5. IF email already exists → link account, sign in
  6. IF new email:
     a. Create User record (role: BUYER, emailVerified: NOW)
     b. Create Account record (OAuth provider data)
     c. Create session
     d. Redirect to /dashboard

POST-REGISTRATION:
  - Unverified users can browse and add to cart
  - Unverified users CANNOT checkout, message, or review
  - Clicking protected actions shows "Verify your email first" prompt
  - Verification link click → /verify-email?token=xxx → mark emailVerified → redirect to /dashboard with success toast

END
```

### Flow 2: Becoming a Seller

```
START → Authenticated buyer clicks "Start Selling" (nav or homepage CTA)

→ /register/seller loads (multi-step wizard)

PRE-CHECK:
  - If email not verified → redirect to verify email first
  - If already a seller → redirect to /seller/dashboard

STEP 1: Seller Profile Setup
  1. User enters:
     - Store name (required, will generate slug)
     - Bio / description (required, 50+ chars)
     - Avatar upload (optional, can use existing)
     - Primary category dropdown (required)
     - Portfolio links (optional, up to 5)
  2. Client-side validation
  3. Click "Continue" → save SellerProfile record (draft state)

STEP 2: Connect Stripe
  1. Page explains: "Connect your bank account to receive payments"
  2. User clicks "Connect with Stripe"
  3. Redirect to Stripe Connect Express onboarding
     - Stripe collects: legal name, DOB, address, bank/card info
     - Stripe handles identity verification
  4. On completion → Stripe redirects back to /register/seller
  5. Server stores stripeAccountId, sets stripeOnboarded: true
  6. If user abandons Stripe → can return later from settings

STEP 3: Create First Listing
  1. User sees: "Create your first listing to go live"
  2. Mini listing creation form (same as full form, but embedded in wizard)
  3. Choose type → fill details → submit
  4. Listing saved with status: PENDING_REVIEW

COMPLETION:
  1. User role upgraded from BUYER to SELLER
  2. Show success page: "You're all set! Your listing is under review."
  3. Redirect to /seller/dashboard
  4. Admin notified of new listing in review queue

END
```

### Flow 3: Creating a Digital Product Listing

```
START → Seller clicks "Create Listing" from /seller/dashboard/listings

→ /seller/dashboard/listings/new loads

STEP 1: Choose Type
  1. User selects "Digital Product"
  2. Click "Continue"

STEP 2: Basic Info
  1. User enters:
     - Title (required, 10–100 chars)
     - Category (required, dropdown)
     - Subcategory (optional, dynamic based on category)
     - Tags (optional, up to 5, autocomplete from existing tags)
     - Description (required, rich text editor, 100+ chars)
  2. Slug auto-generated from title (editable)
  3. Click "Continue"

STEP 3: Media
  1. User uploads images (drag & drop or click to browse)
     - Up to 6 images
     - Each: max 10MB, JPG/PNG/WebP
     - Upload via presigned S3 URL
     - Progress indicator per image
     - Reorderable (drag to sort)
  2. First image = thumbnail
  3. Click "Continue"

STEP 4: Pricing & Files
  1. User enters price (required, min $1)
  2. User uploads product file(s):
     - Drag & drop or click to browse
     - Max 500MB per file
     - Any file type (ZIP, PDF, etc.)
     - Upload via presigned S3 URL (private bucket)
     - Progress indicator
     - Can upload multiple files
  3. User describes file format: "What will the buyer receive?"
     - Free text (e.g., "3 PDF files and 1 .xlsx spreadsheet")
  4. Click "Continue"

STEP 5: FAQ (Optional)
  1. User can add Q&A pairs
  2. "Add FAQ" → question + answer fields
  3. Reorderable
  4. Click "Continue" or "Skip"

STEP 6: Preview
  1. Full listing preview as buyers will see it
  2. User reviews all sections

ACTIONS:
  A. "Save as Draft" → Listing saved with status DRAFT, redirect to /seller/dashboard/listings
  B. "Submit for Review" →
     - IF seller has <3 approved listings → status: PENDING_REVIEW, admin notified
     - IF seller has 3+ approved listings → status: ACTIVE (auto-published)
     - Redirect to /seller/dashboard/listings with success toast

END
```

### Flow 4: Creating a Service Listing

```
START → Seller clicks "Create Listing" from dashboard

→ /seller/dashboard/listings/new loads

STEP 1: Choose Type
  1. User selects "Service"
  2. Click "Continue"

STEP 2: Basic Info
  (Same as digital product: title, category, subcategory, tags, description)

STEP 3: Media
  (Same as digital product: up to 6 images)

STEP 4: Packages
  1. BASIC package (required):
     - Name (default: "Basic", customizable)
     - Description (what's included)
     - Price (min $5)
     - Delivery time in days
     - Number of revisions (0+)
     - Feature checklist:
       - Add feature line
       - Toggle included/not included
       - Reorderable
  2. STANDARD package (optional, toggle to enable):
     - Same fields as Basic
  3. PREMIUM package (optional, toggle to enable):
     - Same fields as Basic
  4. Validation: if multiple packages, prices must be Basic < Standard < Premium
  5. Click "Continue"

STEP 5: Add-ons (Optional)
  1. "Add an Add-on" button
  2. Per add-on: name + price
  3. Examples shown: "Extra revision: $20", "Rush delivery: $50", "Source files: $30"
  4. Click "Continue" or "Skip"

STEP 6: FAQ (Optional)
  (Same as digital product)

STEP 7: Preview
  (Same as digital product, but shows package comparison table)

ACTIONS:
  (Same as digital product: Save Draft or Submit for Review)

END
```

### Flow 5: Purchasing a Digital Product

```
START → Buyer is on a digital product listing detail page

1. Buyer reviews: description, preview images, reviews, seller info
2. Buyer clicks "Buy Now" or "Add to Cart"

IF "Buy Now":
  → Skip to step 5 (direct checkout)

IF "Add to Cart":
  3. Server action: create CartItem (userId, listingId, no package)
  4. Toast: "Added to cart"
  5. Buyer can continue browsing or go to /cart

CART:
  5. Buyer opens /cart
  6. Reviews items (thumbnail, title, price, remove button)
  7. Sees total
  8. Clicks "Proceed to Checkout"

CHECKOUT:
  9. /checkout loads with order summary
  10. Buyer clicks "Pay Now"
  11. Server action:
      a. Validate all cart items still exist and are active
      b. Calculate total
      c. Create Stripe Checkout Session:
         - line_items from cart
         - For each seller: application_fee_amount = price × 12%
         - payment_intent_data with transfer_data to seller's Stripe account
         - success_url: /checkout/success?session_id={CHECKOUT_SESSION_ID}
         - cancel_url: /cart
      d. Redirect to Stripe Checkout
  12. Buyer completes payment on Stripe
  13. Stripe redirects to /checkout/success

POST-PAYMENT (webhook: checkout.session.completed):
  14. Verify webhook signature
  15. Create Order record (status: COMPLETED for products)
  16. Create OrderItem(s)
  17. Create Payment record
  18. For each digital product item:
      a. Generate DownloadToken (72hr expiry, 5 max downloads)
      b. Increment listing orderCount
  19. Clear buyer's cart
  20. Send confirmation email with download links
  21. Create notification for buyer: "Your purchase is ready for download"
  22. Create notification for seller: "New sale! [Product Name]"

CONFIRMATION PAGE:
  23. /checkout/success shows:
      - "Purchase complete!"
      - Download buttons for each product
      - Link to /dashboard/downloads
      - "Continue browsing" link

END
```

### Flow 6: Purchasing a Service Package

```
START → Buyer is on a service listing detail page

1. Buyer reviews packages in comparison table
2. Buyer selects a package (Basic / Standard / Premium) by clicking its "Select" button
3. Optionally checks add-on checkboxes
4. Sidebar/modal updates with: selected package + add-ons + total price
5. Buyer clicks "Continue" or "Add to Cart"

IF "Add to Cart":
  6. Server action: create CartItem (userId, listingId, packageId, addOns JSON)
  7. Toast: "Added to cart"
  8. Flow continues from step 5 in Flow 5 (cart → checkout)

CHECKOUT:
  (Same as Flow 5 steps 9–13)

POST-PAYMENT (webhook):
  14. Verify webhook signature
  15. Create Order record (status determined by items)
  16. Create OrderItem for service:
      - status: PENDING
      - deliveryDays from package
      - deliveryDueAt: null (set when seller accepts)
  17. Create Payment record
  18. Clear buyer's cart
  19. Send notification to seller: "New order! [Listing Name] — [Package Name]"
  20. Send email to seller with order details
  21. Send confirmation email to buyer: "Order placed! Waiting for seller to begin."
  22. Create notification for buyer

CONFIRMATION PAGE:
  23. /checkout/success shows:
      - "Order placed!"
      - "Your seller has been notified and will begin working soon."
      - Link to /dashboard/orders/[id]

END
```

### Flow 7: Seller Fulfilling a Service Order

```
START → Seller receives notification: "New order!"

1. Seller opens /seller/dashboard/orders → sees order with status PENDING
2. Clicks order → /seller/dashboard/orders/[id]
3. Reviews: listing, package, add-ons, buyer info, price
4. Reads any initial message from the buyer

DECISION: Accept or Decline

IF DECLINE:
  5a. Seller clicks "Decline Order"
  6a. Modal: "Reason for declining" (required text)
  7a. Submit → Server action:
      - OrderItem status → CANCELLED
      - Order status → CANCELLED
      - Trigger Stripe refund
      - Notify buyer: "Seller declined your order. A full refund has been issued."
      - Log cancellation
  END (declined)

IF ACCEPT:
  5b. Seller clicks "Accept Order"
  6b. Server action:
      - OrderItem status → IN_PROGRESS
      - Set deliveryDueAt = now + deliveryDays
      - Notify buyer: "Seller has started working on your order!"

7. Seller works on deliverables (off-platform)
8. Seller may message buyer for clarification:
   - Types message in order thread
   - Optionally attaches reference files
   - Buyer gets email notification

DELIVERY:
  9. Seller clicks "Deliver Order"
  10. Delivery form:
      - Upload deliverable files (up to 200MB each)
      - Delivery message (describe what's delivered)
  11. Submit → Server action:
      - Create OrderDeliverable records (files stored in S3)
      - Create system message: "Seller submitted a delivery"
      - OrderItem status → DELIVERED
      - Notify buyer: "Your order has been delivered! Please review."
      - Start 5-day auto-acceptance countdown

BUYER RESPONSE:

  IF ACCEPT:
    12a. Buyer clicks "Accept Delivery"
    13a. Server action:
        - OrderItem status → COMPLETED
        - completedAt = now
        - Start 7-day clearance countdown
        - Notify seller: "Buyer accepted your delivery!"
        - Prompt both to leave review
    END (success)

  IF REQUEST REVISION:
    12b. Buyer clicks "Request Revision"
    13b. Revision form: feedback text (required)
    14b. Server action:
        - Check remaining revisions > 0
        - Decrement revision count
        - OrderItem status → IN_PROGRESS
        - Create system message with revision feedback
        - Notify seller: "Buyer requested a revision"
    15b. → Back to step 7 (seller works on revision)

  IF NO RESPONSE (5 days):
    12c. Cron job detects: deliveredAt + 5 days < now
    13c. Auto-action:
        - OrderItem status → COMPLETED
        - completedAt = now
        - Start 7-day clearance
        - Notify both: "Order auto-completed"

  IF DISPUTE:
    12d. → See Flow 10

CLEARANCE & PAYOUT:
  14. After 7-day clearance:
      - Funds available in seller's Stripe Connect balance
      - Stripe handles automatic payout to seller's bank
      - Create notification: "Payout for order #XXXXX is available"

END
```

### Flow 8: Buyer Downloading Purchased Files

```
START → Buyer wants to download a purchased digital product

ENTRY POINTS:
  A. /checkout/success (immediately after purchase)
  B. /dashboard/orders/[id] (order detail for product order)
  C. /dashboard/downloads (digital library)

FROM DIGITAL LIBRARY (/dashboard/downloads):
  1. Page loads → Server fetches all OrderItems where:
     - buyerId = current user
     - type = PRODUCT
     - status = COMPLETED
  2. For each item, fetch associated DigitalProductFiles
  3. Display grid: thumbnail, product title, purchase date, file info
  4. Each file has a "Download" button

DOWNLOAD ACTION:
  5. Buyer clicks "Download" on a file
  6. Client sends request to server action with orderItemId + fileId
  7. Server validates:
     a. OrderItem belongs to this buyer → fail if not
     b. OrderItem is COMPLETED → fail if not
     c. Find existing valid DownloadToken:
        - token.userId = buyer
        - token.fileId = this file
        - token.expiresAt > now
        - token.downloadCount < token.maxDownloads
     d. If no valid token exists:
        - Generate new DownloadToken (UUID)
        - Set expiresAt = now + 72 hours
        - Set maxDownloads = 5
        - Save to database
     e. Return token
  8. Client redirects to /api/downloads/[token]
  9. Route handler:
     a. Validate token exists and is not expired
     b. Validate token.downloadCount < token.maxDownloads
     c. Validate requesting user = token.userId
     d. Fetch file S3 key from DigitalProductFile
     e. Generate S3 signed URL (15 min expiry)
     f. Increment token.downloadCount
     g. Redirect to signed URL (or stream for extra security)
  10. Browser downloads the file

ERROR CASES:
  - Token expired → auto-generate new one (step 7d)
  - Max downloads exceeded → show message: "Download limit reached. Contact support."
  - File not found in S3 → show error, notify admin
  - Unauthorized user → 403 redirect to /dashboard

END
```

### Flow 9: Admin Approving/Rejecting Seller Listings

```
START → Admin opens /admin or receives notification of pending listing

1. Admin navigates to /admin/listings
2. Clicks "Pending Review" tab
3. Sees list of listings awaiting review (sorted by submission date, oldest first)
   - Each row: title, seller name, type, category, submitted date

4. Admin clicks a listing → /admin/listings/[id]

5. Admin reviews:
   - Full listing preview (exactly as buyers would see)
   - Seller information (store name, verification status, past listings)
   - For products: file info (name, size, type) — admin can download to check
   - For services: package details, pricing
   - Description, images, FAQ

CHECKLIST (admin evaluates):
   □ Title is clear and not misleading
   □ Description is accurate and substantive
   □ Images are relevant and not stolen/inappropriate
   □ Pricing is reasonable (not $0.01 or $99,999)
   □ Category is correct
   □ No prohibited content (violence, illegal services, copyrighted material)
   □ For products: files are present and not empty/corrupted
   □ No spam or duplicate listings

DECISION:

  IF APPROVE:
    6a. Admin clicks "Approve"
    7a. Server action:
        - Listing status → ACTIVE
        - Increment seller's approved listing count
        - Check if seller now has 3 approved listings → auto-verify if criteria met
        - Create AdminLog (adminId, action: LISTING_APPROVED, targetId, timestamp)
        - Notify seller: "Your listing '[Title]' has been approved and is now live!"
    END (approved)

  IF REJECT:
    6b. Admin clicks "Reject"
    7b. Modal: "Rejection reason" (required, shown to seller)
    8b. Server action:
        - Listing status → REJECTED
        - Store rejectionReason
        - Create AdminLog (action: LISTING_REJECTED, details: reason)
        - Notify seller: "Your listing '[Title]' was not approved. Reason: [reason]"
    END (rejected — seller can edit and resubmit)

  IF REQUEST CHANGES:
    6c. Admin clicks "Request Changes"
    7c. Modal: "What needs to change" (required)
    8c. Server action:
        - Listing status → DRAFT (sent back to seller)
        - Create AdminLog (action: LISTING_CHANGES_REQUESTED)
        - Notify seller: "Your listing needs changes: [notes]"
    END (seller edits and resubmits)

END
```

### Flow 10: Admin Handling Disputes

```
START → Buyer opens a dispute on an order

DISPUTE CREATION (buyer side):
  1. Buyer goes to /dashboard/orders/[id] (status: DELIVERED or IN_PROGRESS)
  2. Clicks "Open Dispute"
  3. Dispute form:
     - Reason (dropdown): "Work not delivered" / "Quality doesn't match description" / "Seller not responsive" / "Other"
     - Description (required, 50+ chars): detailed explanation
  4. Submit → Server action:
     - Create Dispute record (status: OPEN)
     - OrderItem status → DISPUTED
     - Notify seller: "A dispute has been opened on order #XXXXX"
     - Notify admins: "New dispute requires review"
     - Create AdminLog entry

SELLER RESPONSE:
  5. Seller receives notification, opens order page
  6. Sees dispute banner with buyer's complaint
  7. Seller can respond via order messaging with their side of the story
  8. Seller can upload additional evidence/files

ADMIN RESOLUTION:
  9. Admin opens /admin/disputes
  10. Sees dispute in queue (sorted by open date, oldest first)
  11. Clicks dispute → /admin/disputes/[id]

  12. Admin reviews:
      - Dispute info: reason, buyer's description, opened date
      - Order info: listing, package, price, dates
      - Full message thread between buyer and seller
      - Deliverables (if any were submitted)
      - Buyer's purchase history (pattern of disputes?)
      - Seller's dispute history (pattern of complaints?)

  13. Admin can message either party for clarification:
      - "Admin message" in order thread (marked as admin)

  14. Admin makes resolution decision:

  OPTION A: Full Refund to Buyer
    15a. Admin selects "Full Refund"
    16a. Enters admin notes (internal: reason for decision)
    17a. Enters message to parties (external: explanation)
    18a. Submit → Server action:
        - Dispute status → RESOLVED
        - Dispute resolution = REFUND
        - Process Stripe refund for full amount
        - OrderItem status → REFUNDED
        - Create AdminLog
        - Notify buyer: "Dispute resolved in your favor. Full refund issued."
        - Notify seller: "Dispute resolved. Funds refunded to buyer. Reason: [message]"

  OPTION B: Release Funds to Seller
    15b. Admin selects "Release to Seller"
    16b–18b. Same notes/message flow
    18b. Submit → Server action:
        - Dispute status → RESOLVED
        - Dispute resolution = RELEASE
        - OrderItem status → COMPLETED
        - Start clearance period
        - Notify buyer: "Dispute resolved. The seller's delivery has been accepted. Reason: [message]"
        - Notify seller: "Dispute resolved in your favor. Funds will be released after clearance."

  OPTION C: Partial Refund
    15c. Admin selects "Partial Refund"
    16c. Enters refund amount (between $1 and full order amount)
    17c–18c. Same notes/message flow
    18c. Submit → Server action:
        - Dispute status → RESOLVED
        - Dispute resolution = PARTIAL_REFUND
        - Process Stripe partial refund
        - OrderItem status → COMPLETED (seller keeps remainder)
        - Create AdminLog
        - Notify buyer: "Dispute resolved. Partial refund of $X issued."
        - Notify seller: "Dispute resolved. Partial refund of $X issued to buyer."

END
```

---

## 4. State Transitions

### 4.1 Listing Status

```
                     ┌──────────────────────────────┐
                     │                              │
                     ▼                              │
   ┌──────┐    ┌──────────────┐    ┌────────┐     │
   │ DRAFT│───▶│PENDING_REVIEW│───▶│ ACTIVE │     │
   └──────┘    └──────────────┘    └────────┘     │
      ▲              │                  │          │
      │              │                  │          │
      │              ▼                  ▼          │
      │         ┌──────────┐      ┌────────┐     │
      └─────────│ REJECTED │      │ PAUSED │─────┘
                └──────────┘      └────────┘

Transitions:
  DRAFT → PENDING_REVIEW    Seller submits listing for review
  DRAFT → ACTIVE            Seller submits + has 3+ approved listings (auto-publish)
  PENDING_REVIEW → ACTIVE   Admin approves
  PENDING_REVIEW → REJECTED Admin rejects (with reason)
  PENDING_REVIEW → DRAFT    Admin requests changes
  REJECTED → DRAFT          Seller edits rejected listing
  ACTIVE → PAUSED           Seller pauses listing
  PAUSED → ACTIVE           Seller reactivates listing
  ACTIVE → DRAFT            Seller unpublishes to edit (optional)
  ANY → DELETED             Seller deletes (soft delete)

Rules:
  - Only ACTIVE listings are visible to buyers
  - First 3 listings per seller always go through PENDING_REVIEW
  - After 3 approved listings, new submissions auto-activate
  - Paused listings retain their data but are hidden from search
  - Rejected listings show the rejection reason to the seller
```

### 4.2 Order Status

```
                                ┌─────────────────────────────┐
                                │                             │
   ┌─────────┐    ┌─────────────┐    ┌───────────┐    ┌───────────┐
   │ PENDING │───▶│ IN_PROGRESS │───▶│ DELIVERED │───▶│ COMPLETED │
   └─────────┘    └─────────────┘    └───────────┘    └───────────┘
       │                                    │               │
       │                                    │               │
       ▼                                    ▼               │
   ┌───────────┐                      ┌──────────┐         │
   │ CANCELLED │                      │ DISPUTED │─────────┘
   └───────────┘                      └──────────┘
                                           │
                                           ▼
                                      ┌──────────┐
                                      │ REFUNDED │
                                      └──────────┘

Transitions:
  PENDING → IN_PROGRESS     Seller accepts order
  PENDING → CANCELLED       Seller declines (auto-refund)
  PENDING → CANCELLED       48hr no response (auto-cancel, auto-refund)
  IN_PROGRESS → DELIVERED   Seller submits delivery
  DELIVERED → COMPLETED     Buyer accepts delivery
  DELIVERED → IN_PROGRESS   Buyer requests revision (if revisions > 0)
  DELIVERED → COMPLETED     5 days no response (auto-complete)
  DELIVERED → DISPUTED      Buyer opens dispute
  IN_PROGRESS → DISPUTED    Buyer opens dispute
  DISPUTED → COMPLETED      Admin releases funds to seller
  DISPUTED → REFUNDED       Admin issues full refund
  DISPUTED → COMPLETED      Admin issues partial refund (seller gets remainder)

Special case — Digital Products:
  Digital product orders skip the service lifecycle entirely:
  Payment confirmed → COMPLETED (immediate)
  No PENDING/IN_PROGRESS/DELIVERED states for products

Rules:
  - Orders can only be disputed before COMPLETED status + clearance period
  - Auto-completion after 5 days of DELIVERED with no buyer action
  - Auto-cancellation after 48 hours of PENDING with no seller action
  - Revision count decremented on each revision request; cannot request when 0
  - COMPLETED triggers clearance countdown (7 days for services)
```

### 4.3 Payment Status

```
   ┌─────────┐    ┌───────────┐
   │ PENDING │───▶│ SUCCEEDED │
   └─────────┘    └───────────┘
       │               │
       ▼               ├──▶ ┌──────────┐
   ┌────────┐          │    │ REFUNDED │
   │ FAILED │          │    └──────────┘
   └────────┘          │
                       └──▶ ┌────────────────┐
                            │ PARTIAL_REFUND │
                            └────────────────┘

Transitions:
  PENDING → SUCCEEDED       Stripe confirms payment (webhook: checkout.session.completed)
  PENDING → FAILED          Stripe reports failure (webhook: checkout.session.expired or payment_intent.payment_failed)
  SUCCEEDED → REFUNDED      Full refund processed (seller decline, dispute resolution, admin action)
  SUCCEEDED → PARTIAL_REFUND Partial refund processed (dispute resolution)

Rules:
  - Payment records are created when Stripe Checkout session is initiated (PENDING)
  - Only SUCCEEDED payments result in order creation
  - Refunds are always initiated server-side via Stripe API
  - Payment record stores both Stripe session ID and payment intent ID
  - Platform fee (application_fee) is captured with the payment, not post-hoc
```

### 4.4 Payout Status

```
   ┌─────────┐    ┌────────────┐    ┌───────────┐
   │ PENDING │───▶│ PROCESSING │───▶│ COMPLETED │
   └─────────┘    └────────────┘    └───────────┘
                       │
                       ▼
                  ┌────────┐
                  │ FAILED │
                  └────────┘

Transitions:
  PENDING → PROCESSING      Clearance period complete, Stripe initiates payout
  PROCESSING → COMPLETED    Stripe confirms funds deposited to seller's bank
  PROCESSING → FAILED       Bank rejects deposit (invalid details, etc.)

Rules:
  - Funds enter PENDING when order completes
  - Clearance period: 3 days (products), 7 days (services)
  - After clearance, Stripe Connect handles the actual bank transfer
  - AMAIA doesn't hold funds — Stripe Connect manages the flow
  - Seller's dashboard shows available/pending/total based on these statuses
  - Failed payouts: seller notified to update bank details
```

### 4.5 Dispute Status

```
   ┌──────┐    ┌──────────────┐    ┌──────────┐
   │ OPEN │───▶│ UNDER_REVIEW │───▶│ RESOLVED │
   └──────┘    └──────────────┘    └──────────┘

Transitions:
  OPEN → UNDER_REVIEW       Admin opens/claims the dispute
  UNDER_REVIEW → RESOLVED   Admin submits resolution (refund / release / partial)
  OPEN → RESOLVED           Admin resolves immediately without separate review step

Resolution types stored on resolved dispute:
  - REFUND: full refund to buyer, seller receives nothing
  - RELEASE: funds released to seller, buyer gets nothing
  - PARTIAL_REFUND: buyer gets partial refund, seller gets remainder

Rules:
  - Only one active dispute per order
  - Disputes can only be opened on orders that are IN_PROGRESS, DELIVERED, or within clearance
  - Opening a dispute freezes the order (no auto-completion while disputed)
  - All dispute actions logged in admin audit trail
  - Resolution is final (no appeals in MVP)
  - Admin notes field: internal-only notes not shown to parties
  - Admin message field: sent to both parties with the resolution
```

---

## 5. MVP Feature Prioritization

### Must-Have (Launch Blockers)

Without these, the platform cannot function as a marketplace.

| Area | Features |
|---|---|
| **Auth** | Registration (email + Google), login, logout, email verification, password reset, role-based middleware |
| **Seller Setup** | Seller onboarding, Stripe Connect, store profile |
| **Listings** | Create/edit/delete service listings with packages, create/edit/delete product listings with file upload, image gallery, categories, tags, listing status management |
| **Browse** | Explore page with grid, search by keyword, filters (type, category, price, rating), sort, pagination, listing detail pages, seller store pages, category pages |
| **Cart & Checkout** | Add to cart, cart management, Stripe Checkout, webhook handler, order confirmation |
| **Digital Delivery** | Download token system, secure S3 signed URLs, digital library page |
| **Service Orders** | Full lifecycle (pending → in-progress → delivered → completed), accept/decline, delivery upload, accept delivery, request revision, auto-complete cron |
| **Messaging** | Per-order message thread, text + file attachments, system messages |
| **Reviews** | Leave review (stars + text), display on listing, seller response, aggregate rating |
| **Earnings** | Earnings dashboard, payout history, Stripe Connect payouts |
| **Disputes** | Open dispute, admin dispute queue, resolve (refund/release/partial) |
| **Admin** | Overview dashboard, user management (suspend/ban), listing moderation queue, dispute resolution, category management, transaction log, audit log |
| **Email** | Transactional emails for: order placed, accepted, delivered, completed, cancelled, disputed, resolved, new message, review received |
| **Notifications** | In-app notification bell with unread count |
| **Public Pages** | Homepage, about, how it works, FAQ, terms, privacy, contact, seller pricing |
| **Responsive** | Mobile-first responsive design across all pages |
| **SEO** | Dynamic meta tags, semantic HTML, slugs |

### Should-Have (Important but not blocking launch)

Improve experience significantly but platform works without them.

| Area | Features |
|---|---|
| **Auth** | Notification preferences (toggle per event type) |
| **Seller** | Verification badges (auto-upgrade after criteria), seller analytics (basic) |
| **Browse** | Sitemap.xml, JSON-LD structured data, autocomplete search |
| **Orders** | Custom offers via messaging |
| **Admin** | Platform settings page (commission rate, timeouts), flagged review moderation |
| **System** | Rate limiting on auth routes, error tracking (Sentry), download token cleanup cron |
| **UX** | Loading skeletons, empty states, error boundaries, toast notifications |

### Nice-to-Have (Defer to Phase 2+)

Enhance growth and engagement but not needed for initial launch.

| Area | Features |
|---|---|
| **Buyer** | Favorites/wishlist, pre-purchase messaging |
| **Seller** | Full analytics dashboard, bulk listing actions, team accounts |
| **Admin** | Featured listing curation, email broadcasts |
| **Platform** | Blog, advanced search (Algolia), real-time notifications (SSE/WebSocket), social logins (GitHub, Twitter) |
| **Revenue** | Featured listings (paid), seller Pro subscription tiers |
| **Growth** | Affiliate/referral program, category SEO landing pages |

---

*This document provides the complete implementation blueprint. Each feature, page, flow, and state transition maps directly to the database schema and folder structure defined in the Product Spec. Developers (human or AI) should reference this document alongside AMAIA-PRODUCT-SPEC.md and AMAIA-PRD.md when building any feature.*
