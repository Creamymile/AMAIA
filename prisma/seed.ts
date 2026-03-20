import { PrismaClient, Role, ListingType, ListingStatus, PackageTier } from "@prisma/client";
import bcrypt from "bcryptjs";
import slugify from "slugify";

const prisma = new PrismaClient();

function generateSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, trim: true });
}

// Mirror of INITIAL_CATEGORIES from src/lib/constants.ts
const INITIAL_CATEGORIES = [
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
];

async function seedCategories() {
  console.log("Seeding categories...");

  const categoryMap: Record<string, string> = {};

  for (let i = 0; i < INITIAL_CATEGORIES.length; i++) {
    const cat = INITIAL_CATEGORIES[i];

    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        icon: cat.icon,
        sortOrder: i,
        isActive: true,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        sortOrder: i,
        isActive: true,
      },
    });

    categoryMap[cat.slug] = parent.id;

    for (let j = 0; j < cat.subcategories.length; j++) {
      const subName = cat.subcategories[j];
      const subSlug = generateSlug(subName);

      const sub = await prisma.category.upsert({
        where: { slug: subSlug },
        update: {
          name: subName,
          parentId: parent.id,
          sortOrder: j,
          isActive: true,
        },
        create: {
          name: subName,
          slug: subSlug,
          parentId: parent.id,
          sortOrder: j,
          isActive: true,
        },
      });

      categoryMap[subSlug] = sub.id;
    }
  }

  console.log(`Seeded ${Object.keys(categoryMap).length} categories.`);
  return categoryMap;
}

async function seedAdminUser() {
  console.log("Seeding admin user...");

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn("ADMIN_EMAIL or ADMIN_PASSWORD not set, skipping admin seed.");
    return null;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      name: "Admin",
      passwordHash,
      role: Role.ADMIN,
    },
    create: {
      name: "Admin",
      email,
      passwordHash,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  });

  console.log(`Admin user seeded: ${admin.email}`);
  return admin;
}

async function seedSellerUsers() {
  console.log("Seeding seller users...");

  const sellers = [
    {
      email: "alice@test.com",
      name: "Alice Chen",
      storeName: "AI Forge Studio",
      storeSlug: "ai-forge-studio",
      bio: "Full-stack AI engineer specializing in GPT integrations, custom chatbots, and workflow automation. 5+ years helping businesses leverage AI to save time and scale faster.",
      primaryCategory: "ai-automation",
    },
    {
      email: "bob@test.com",
      name: "Bob Martinez",
      storeName: "Template Lab",
      storeSlug: "template-lab",
      bio: "Notion nerd and automation enthusiast. I create beautifully designed templates and digital products that help solopreneurs and small teams stay organized and productive.",
      primaryCategory: "digital-products-templates",
    },
  ];

  const sellerRecords: Array<{
    user: { id: string; email: string };
    profile: { id: string };
  }> = [];

  for (const s of sellers) {
    const passwordHash = await bcrypt.hash("password123", 12);

    const user = await prisma.user.upsert({
      where: { email: s.email },
      update: {
        name: s.name,
        passwordHash,
        role: Role.SELLER,
      },
      create: {
        name: s.name,
        email: s.email,
        passwordHash,
        role: Role.SELLER,
        emailVerified: new Date(),
      },
    });

    const profile = await prisma.sellerProfile.upsert({
      where: { userId: user.id },
      update: {
        storeName: s.storeName,
        slug: s.storeSlug,
        bio: s.bio,
        primaryCategory: s.primaryCategory,
      },
      create: {
        userId: user.id,
        storeName: s.storeName,
        slug: s.storeSlug,
        bio: s.bio,
        primaryCategory: s.primaryCategory,
      },
    });

    sellerRecords.push({ user, profile });
  }

  console.log(`Seeded ${sellerRecords.length} seller users.`);
  return sellerRecords;
}

async function seedListings(
  sellers: Array<{ user: { id: string }; profile: { id: string } }>,
  categoryMap: Record<string, string>,
) {
  console.log("Seeding listings...");

  const [alice, bob] = sellers;

  const listings = [
    // --- SERVICE listings (Alice) ---
    {
      sellerId: alice.profile.id,
      type: ListingType.SERVICE,
      title: "Custom AI Chatbot Development for Your Business",
      slug: "custom-ai-chatbot-development-for-your-business",
      description:
        "I will build a custom AI-powered chatbot tailored to your business needs. Whether you need a customer support assistant, lead qualification bot, or internal knowledge base helper, I use the latest GPT-4 and Claude APIs to deliver intelligent, context-aware conversational experiences. Every chatbot is tested rigorously and comes with full documentation and deployment support.",
      categorySlug: "ai-chatbot-development",
      status: ListingStatus.ACTIVE,
      packages: [
        {
          tier: PackageTier.BASIC,
          name: "Starter Bot",
          description:
            "Single-purpose chatbot with up to 10 predefined intents. Includes basic FAQ handling, simple conversation flow, and deployment to one platform (web widget or Slack).",
          price: 149.0,
          deliveryDays: 5,
          revisions: 1,
          features: ["Up to 10 intents", "1 platform deployment", "Basic FAQ handling", "1 revision"],
        },
        {
          tier: PackageTier.STANDARD,
          name: "Business Bot",
          description:
            "Multi-purpose chatbot with up to 30 intents, context memory, and integration with your CRM or helpdesk. Deployed to up to 2 platforms with conversation analytics dashboard.",
          price: 399.0,
          deliveryDays: 10,
          revisions: 2,
          features: [
            "Up to 30 intents",
            "2 platform deployments",
            "CRM integration",
            "Analytics dashboard",
            "Context memory",
            "2 revisions",
          ],
        },
        {
          tier: PackageTier.PREMIUM,
          name: "Enterprise Bot",
          description:
            "Fully custom AI assistant with unlimited intents, RAG-based knowledge retrieval, multi-language support, and advanced analytics. Includes 30 days of post-launch support.",
          price: 899.0,
          deliveryDays: 21,
          revisions: 5,
          features: [
            "Unlimited intents",
            "RAG knowledge retrieval",
            "Multi-language support",
            "Advanced analytics",
            "3 platform deployments",
            "30-day post-launch support",
            "5 revisions",
          ],
        },
      ],
    },
    {
      sellerId: alice.profile.id,
      type: ListingType.SERVICE,
      title: "End-to-End AI Workflow Automation with Make & Zapier",
      slug: "end-to-end-ai-workflow-automation-make-zapier",
      description:
        "I will design and implement AI-powered workflow automations using Make (Integromat) or Zapier, integrated with GPT, Claude, or other AI APIs. From lead nurturing sequences to automated content pipelines, I build reliable automations that save you hours every week. Each automation includes error handling, monitoring setup, and thorough documentation.",
      categorySlug: "ai-automation-setup",
      status: ListingStatus.ACTIVE,
      packages: [
        {
          tier: PackageTier.BASIC,
          name: "Simple Automation",
          description:
            "One automated workflow with up to 5 steps. Connects 2 apps with basic AI processing (e.g., summarize emails, classify leads).",
          price: 99.0,
          deliveryDays: 3,
          revisions: 1,
          features: ["1 workflow", "Up to 5 steps", "2 app connections", "Basic AI processing", "1 revision"],
        },
        {
          tier: PackageTier.STANDARD,
          name: "Multi-Flow Automation",
          description:
            "Up to 3 interconnected workflows with conditional logic, error handling, and AI-powered data transformation. Connects up to 5 apps.",
          price: 299.0,
          deliveryDays: 7,
          revisions: 2,
          features: [
            "3 workflows",
            "Conditional logic",
            "Error handling",
            "5 app connections",
            "AI data transformation",
            "2 revisions",
          ],
        },
        {
          tier: PackageTier.PREMIUM,
          name: "Full Automation Suite",
          description:
            "Complete automation ecosystem with unlimited workflows, webhook integrations, custom API connections, monitoring dashboard, and 14 days of post-launch support.",
          price: 699.0,
          deliveryDays: 14,
          revisions: 3,
          features: [
            "Unlimited workflows",
            "Webhook integrations",
            "Custom API connections",
            "Monitoring dashboard",
            "14-day support",
            "3 revisions",
          ],
        },
      ],
    },
    {
      sellerId: alice.profile.id,
      type: ListingType.SERVICE,
      title: "Custom GPT & AI Agent Development for Specialized Tasks",
      slug: "custom-gpt-ai-agent-development-specialized-tasks",
      description:
        "I will build a custom GPT or AI agent fine-tuned for your specific domain. Whether you need a specialized coding assistant, research agent, or content creation tool, I design agents with carefully crafted system prompts, tool integrations, and knowledge bases to deliver expert-level performance in your niche.",
      categorySlug: "custom-gpt-ai-agent-development",
      status: ListingStatus.ACTIVE,
      packages: [
        {
          tier: PackageTier.BASIC,
          name: "Basic Custom GPT",
          description:
            "A single custom GPT with optimized system prompt, 3 conversation starters, and basic knowledge base (up to 5 documents).",
          price: 79.0,
          deliveryDays: 3,
          revisions: 1,
          features: ["1 custom GPT", "Optimized system prompt", "3 conversation starters", "5-doc knowledge base", "1 revision"],
        },
        {
          tier: PackageTier.STANDARD,
          name: "Advanced AI Agent",
          description:
            "Custom GPT or AI agent with tool/API integrations, advanced prompting techniques, up to 20 documents in knowledge base, and iterative testing.",
          price: 249.0,
          deliveryDays: 7,
          revisions: 2,
          features: [
            "1 AI agent",
            "API/tool integrations",
            "20-doc knowledge base",
            "Advanced prompting",
            "Testing & iteration",
            "2 revisions",
          ],
        },
        {
          tier: PackageTier.PREMIUM,
          name: "Multi-Agent System",
          description:
            "A coordinated multi-agent system with up to 3 specialized agents, inter-agent communication, comprehensive knowledge base, and full documentation.",
          price: 599.0,
          deliveryDays: 14,
          revisions: 3,
          features: [
            "Up to 3 agents",
            "Inter-agent communication",
            "Unlimited knowledge base",
            "Full documentation",
            "14-day support",
            "3 revisions",
          ],
        },
      ],
    },
    // --- PRODUCT listings (Bob) ---
    {
      sellerId: bob.profile.id,
      type: ListingType.PRODUCT,
      title: "Ultimate Notion Business OS Template Bundle",
      slug: "ultimate-notion-business-os-template-bundle",
      description:
        "The all-in-one Notion template system for solopreneurs and small teams. Includes project management dashboards, CRM, content calendar, finance tracker, meeting notes database, and client portal templates. Everything is interconnected with relations and rollups for a seamless business operating system. Instant download and setup guide included.",
      categorySlug: "notion-templates",
      status: ListingStatus.ACTIVE,
      price: 49.0,
      packages: [],
    },
    {
      sellerId: bob.profile.id,
      type: ListingType.PRODUCT,
      title: "ChatGPT Mega Prompt Pack: 500+ Business Prompts",
      slug: "chatgpt-mega-prompt-pack-500-business-prompts",
      description:
        "A curated collection of 500+ battle-tested ChatGPT prompts organized into 12 business categories: marketing, sales, copywriting, HR, product management, customer support, data analysis, coding, strategy, social media, email, and brainstorming. Each prompt includes variables you can customize and example outputs so you know exactly what to expect.",
      categorySlug: "prompt-packs",
      status: ListingStatus.ACTIVE,
      price: 29.0,
      packages: [],
    },
    {
      sellerId: bob.profile.id,
      type: ListingType.PRODUCT,
      title: "Make.com Automation Templates: Lead Gen & Nurture Kit",
      slug: "make-com-automation-templates-lead-gen-nurture-kit",
      description:
        "Pre-built Make.com (Integromat) automation blueprints for lead generation and nurturing. Includes 8 ready-to-import scenarios: LinkedIn lead scraper to CRM, email sequence trigger, AI-powered lead scoring, webinar follow-up automation, abandoned cart recovery, review request automation, referral tracking, and social proof collector. Each blueprint comes with setup instructions and a video walkthrough.",
      categorySlug: "automation-templates",
      status: ListingStatus.ACTIVE,
      price: 39.0,
      packages: [],
    },
  ];

  for (const listing of listings) {
    const categoryId = categoryMap[listing.categorySlug];
    if (!categoryId) {
      console.warn(`Category slug "${listing.categorySlug}" not found, skipping listing "${listing.title}".`);
      continue;
    }

    const upsertedListing = await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: {
        sellerId: listing.sellerId,
        type: listing.type,
        title: listing.title,
        description: listing.description,
        categoryId,
        status: listing.status,
        price: listing.price ?? null,
      },
      create: {
        sellerId: listing.sellerId,
        type: listing.type,
        title: listing.title,
        slug: listing.slug,
        description: listing.description,
        categoryId,
        status: listing.status,
        price: listing.price ?? null,
      },
    });

    // Upsert service packages for SERVICE listings
    if (listing.type === ListingType.SERVICE && listing.packages.length > 0) {
      for (let i = 0; i < listing.packages.length; i++) {
        const pkg = listing.packages[i];

        // Use a compound lookup: find existing package by listing + tier
        const existing = await prisma.servicePackage.findFirst({
          where: {
            listingId: upsertedListing.id,
            tier: pkg.tier,
          },
        });

        const packageData = {
          listingId: upsertedListing.id,
          tier: pkg.tier,
          name: pkg.name,
          description: pkg.description,
          price: pkg.price,
          deliveryDays: pkg.deliveryDays,
          revisions: pkg.revisions,
          features: pkg.features,
          sortOrder: i,
        };

        if (existing) {
          await prisma.servicePackage.update({
            where: { id: existing.id },
            data: packageData,
          });
        } else {
          await prisma.servicePackage.create({
            data: packageData,
          });
        }
      }
    }

    console.log(`Seeded listing: ${listing.title}`);
  }

  console.log("Listings seeded.");
}

async function main() {
  console.log("Starting database seed...\n");

  const categoryMap = await seedCategories();
  await seedAdminUser();
  const sellers = await seedSellerUsers();
  await seedListings(sellers, categoryMap);

  console.log("\nSeed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
