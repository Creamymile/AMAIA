export const PLATFORM_NAME = "AMAIA";
export const PLATFORM_DESCRIPTION =
  "Digital Services & Products Marketplace for AI, Automation & Productivity";

// Commission
export const COMMISSION_RATE = 0.12; // 12%

// Clearance periods (in days)
export const PRODUCT_CLEARANCE_DAYS = 3;
export const SERVICE_CLEARANCE_DAYS = 7;

// Order timeouts (in hours)
export const AUTO_ACCEPT_TIMEOUT_HOURS = 120; // 5 days
export const AUTO_CANCEL_TIMEOUT_HOURS = 48; // 2 days

// File limits
export const MAX_PRODUCT_FILE_SIZE = 500 * 1024 * 1024; // 500MB
export const MAX_DELIVERABLE_FILE_SIZE = 200 * 1024 * 1024; // 200MB
export const MAX_IMAGE_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_AVATAR_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_LISTING_IMAGES = 6;
export const MAX_TAGS_PER_LISTING = 5;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Downloads
export const DOWNLOAD_TOKEN_EXPIRY_HOURS = 72;
export const MAX_DOWNLOADS_PER_TOKEN = 5;
export const SIGNED_URL_EXPIRY_SECONDS = 900; // 15 minutes

// Reviews
export const MIN_REVIEWS_FOR_DISPLAY = 3;
export const REVIEW_EDIT_WINDOW_HOURS = 48;

// Seller verification
export const LISTINGS_FOR_AUTO_PUBLISH = 3;
export const ORDERS_FOR_VERIFICATION = 3;
export const MIN_RATING_FOR_VERIFICATION = 4.0;

// Listing
export const MIN_LISTING_TITLE_LENGTH = 10;
export const MAX_LISTING_TITLE_LENGTH = 100;
export const MIN_LISTING_DESCRIPTION_LENGTH = 100;
export const MAX_LISTING_DESCRIPTION_LENGTH = 10000;
export const MIN_SERVICE_PRICE = 5;
export const MIN_PRODUCT_PRICE = 1;

// Accepted file types
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const PRODUCT_FILE_TYPES = [
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/csv",
];

// Categories for initial seeding
export const INITIAL_CATEGORIES = [
  {
    name: "AI & Automation",
    slug: "ai-automation",
    icon: "Bot",
    subcategories: [
      "AI Automation Setup",
      "AI Chatbot Development",
      "AI Integration Services",
      "Custom GPT & AI Agent Development",
      "AI Consulting",
    ],
  },
  {
    name: "Prompt Engineering",
    slug: "prompt-engineering",
    icon: "MessageSquare",
    subcategories: [
      "Custom Prompt Writing",
      "Prompt Strategy & Consulting",
      "Prompt Testing & Optimization",
    ],
  },
  {
    name: "Web & Landing Pages",
    slug: "web-landing-pages",
    icon: "Globe",
    subcategories: [
      "Landing Page Design & Setup",
      "Website Development",
      "WordPress & Webflow Setup",
      "Website Maintenance",
    ],
  },
  {
    name: "Design & Creative",
    slug: "design-creative",
    icon: "Palette",
    subcategories: [
      "Graphic Design",
      "UI/UX Design",
      "Photo & Video Editing",
      "Branding & Logo Design",
      "Social Media Design",
    ],
  },
  {
    name: "Digital Products — Prompts & AI",
    slug: "digital-products-prompts-ai",
    icon: "Sparkles",
    subcategories: [
      "Prompt Packs",
      "GPT System Prompts",
      "AI Workflow Templates",
    ],
  },
  {
    name: "Digital Products — Templates",
    slug: "digital-products-templates",
    icon: "FileText",
    subcategories: [
      "Notion Templates",
      "Business Spreadsheets",
      "Automation Templates",
      "Document Templates",
    ],
  },
  {
    name: "Digital Products — Design Assets",
    slug: "digital-products-design-assets",
    icon: "Layers",
    subcategories: [
      "UI Kits",
      "Icon Packs",
      "Mockup Templates",
      "Social Media Templates",
    ],
  },
  {
    name: "Digital Products — Knowledge",
    slug: "digital-products-knowledge",
    icon: "BookOpen",
    subcategories: [
      "Ebooks & Guides",
      "Online Courses",
      "Checklists & Playbooks",
    ],
  },
] as const;
