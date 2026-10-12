export const siteConfig = {
  name: "NovaCraft",
  title: "NovaCraft | Websites for Businesses & Social Media Support",
  tagline: "Websites for Businesses & Social Media Support",
  description:
    "NovaCraft creates clear, professional websites and offers social media advice and management for businesses worldwide. Discuss your website project.",
  contactEmail: "novacraft.webdesign@gmail.com",
  contactPhone: "+370 69140144",
  phoneFormatted: "+370 691 40144",
  telLink: "tel:+37069140144",
  audience: "For local businesses and companies worldwide.",
} as const;

export const businessNeeds = [
  {
    id: "first-website",
    title: "You need your first website.",
    description:
      "A dedicated, professional online home that clearly introduces your business to prospective customers and establishes immediate credibility.",
  },
  {
    id: "modern-presentation",
    title: "Your current website needs a clearer, more modern presentation.",
    description:
      "A clean refresh designed to showcase your current services properly, make key information easy to read, and work smoothly on modern phones.",
  },
  {
    id: "consistent-message",
    title: "Your website and social profiles need a more consistent message.",
    description:
      "A cohesive online presence so customers who discover you on social channels arrive at a website that reinforces the exact same story and offer.",
  },
] as const;

export const websiteCreationGoals = [
  {
    id: "introduce-services",
    title: "Clearly introduce the business and its services",
    description:
      "Help visitors understand what you do right away without confusing technical jargon or clutter.",
  },
  {
    id: "organize-information",
    title: "Organize information so visitors find what they need",
    description:
      "Logical structure, clear typography, and intuitive navigation that guide potential customers naturally.",
  },
  {
    id: "easy-contact",
    title: "Make the agreed contact action easy to locate",
    description:
      "Prominent buttons, direct phone links, and simple inquiry forms placed right where visitors look.",
  },
  {
    id: "cross-device-layout",
    title: "Create a layout that works across screen sizes",
    description:
      "Responsive design that looks balanced and readable on mobile phones, tablets, and desktop displays.",
  },
] as const;

export const socialMediaServices = [
  {
    id: "social-advice",
    title: "Social media advice",
    description: "Guidance on making your profiles and messaging clearer and more consistent.",
  },
  {
    id: "social-management",
    title: "Social media management",
    description:
      "Support managing your social media presence, with the scope agreed around your needs.",
  },
] as const;

export const approachSteps = [
  {
    step: "01",
    title: "Share your business details and existing website",
    description:
      "Tell us what your business does, who you serve, and share your current website or social profiles if you have them.",
  },
  {
    step: "02",
    title: "Discuss the scope and design direction",
    description:
      "We discuss what needs to be created or updated, agree on the key priorities, and clarify how you want your business presented.",
  },
  {
    step: "03",
    title: "Create and review the agreed work",
    description:
      "We build your website, review the progress together, make adjustments, and get everything ready for your visitors.",
  },
] as const;

export const conceptDemonstration = {
  badge: "Concept demonstration",
  notice:
    "This demonstration illustrates how NovaCraft organizes information for a local service business. It is a concept layout, not a client commission.",
  conceptTitle: "Local Service Business Layout",
  conceptSubtitle: "Example: Home Craft & Renovation Services",
  layoutPrinciples: [
    {
      title: "Clear service information",
      description:
        "The primary services are explained in plain language right at the top so prospective customers know immediately if you can solve their problem.",
    },
    {
      title: "Visible contact action",
      description:
        "Direct phone numbers and a quick inquiry button are visible across every screen, removing friction for high-intent visitors.",
    },
    {
      title: "Readable mobile presentation",
      description:
        "Fast-loading layout with large touch targets and comfortable font sizes tailored for people browsing on mobile devices.",
    },
  ],
} as const;
