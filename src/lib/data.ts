// ─────────────────────────────────────────────────────────────
// All content data for MGL Realtech website
// Single source of truth. Components import from here.
// ─────────────────────────────────────────────────────────────

// ── Site-wide constants ──────────────────────────────────────

export const SITE = {
  name: "MGL Realtech",
  fullName: "MGL Realtech Pvt. Ltd.",
  phone: "+91-6361618181",
  phonePretty: "+91-6361-618181",
  email: "info@mglrealtech.com",
  whatsapp: "916361618181",
  address: "NH 344P, Kharkhoda, Sonipat, Haryana",
  addressLine1: "NH 344P, Kharkhoda",
  addressLine2: "Sonipat, Haryana, India",
  tagline: "North NCR's developer of record since 2018",
  heroSubtitle: "rooted in Kharkhoda, building for North NCR",
  heroDescription:
    "10+ delivered projects along the NH-44 growth corridor. From plotted colonies to villa floors, MGL Realtech is the name Sonipat families trust for clean titles, on-time possession, and neighbourhoods that hold value.",
  copyright: `© ${new Date().getFullYear()} MGL Realtech Pvt. Ltd.`,
} as const;

// ── Navigation ───────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Our Projects", href: "#projects" },
  { label: "About Us", href: "#about" },
  { label: "Amenities", href: "#amenities" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#book-a-visit" },
] as const;

// ── Projects ─────────────────────────────────────────────────

export interface Project {
  title: string;
  subtitle: string;
  location: string;
  description: string;
  status: "Delivered" | "Ongoing" | "Coming Soon";
  image: string;
}

export const PROJECTS: readonly Project[] = [
  {
    title: "MGL Greens",
    subtitle: "Plotted Development",
    location: "Sector 36, Kharkhoda, Sonipat",
    description:
      "120+ residential plots on NH-344P with 30-ft roads, underground electrification, and a landscaped central park. 15 minutes from the Maruti Suzuki Kharkhoda plant gate.",
    status: "Delivered",
    image: "/images/livings-1.avif",
  },
  {
    title: "Orchid Heights",
    subtitle: "Villa Floors",
    location: "Sector 28, Kharkhoda, Sonipat",
    description:
      "Independent villa floors with private terraces, stilt parking, and Vastu-compliant layouts from 150 to 250 sq. yd. Registry-ready with all approvals in place.",
    status: "Ongoing",
    image: "/images/livings-2.avif",
  },
  {
    title: "MGL Business Park",
    subtitle: "Commercial Hub",
    location: "NH-344P Junction, Kharkhoda",
    description:
      "Retail showrooms and office spaces anchoring the NH-344P commercial belt. Ground + 3 floors, 12-ft ceiling heights, and 40-ft road frontage for maximum visibility.",
    status: "Ongoing",
    image: "/images/livings-3.avif",
  },
  {
    title: "Mystical Meadows",
    subtitle: "Integrated Golf Township",
    location: "Sectors 70 & 71, Kundli, Sonipat",
    description:
      "A ~150-acre golf township on the Delhi-Sonipat corridor, the flagship MGL project. 9-hole course, clubhouse, villa plots, and SCO blocks set against the KMP Expressway backdrop.",
    status: "Coming Soon",
    image: "/images/livings-1.avif",
  },
] as const;

// ── Stats ────────────────────────────────────────────────────

export interface Stat {
  /** The rendered number (may include "+", "/" etc.) */
  value: string;
  /** Numeric target for count-up animation */
  numericTarget: number;
  /** "+", "/7", etc.,appended after the animated number */
  suffix: string;
  label: string;
}

export const STATS: readonly Stat[] = [
  {
    value: "10+",
    numericTarget: 10,
    suffix: "+",
    label: "Delivered projects across Kharkhoda-Sonipat.",
  },
  {
    value: "7+",
    numericTarget: 7,
    suffix: "+",
    label: "Years of on-ground development in North NCR.",
  },
  {
    value: "500+",
    numericTarget: 500,
    suffix: "+",
    label: "Families living in MGL-developed colonies.",
  },
  {
    value: "100%",
    numericTarget: 100,
    suffix: "%",
    label: "On-time possession record across all projects.",
  },
] as const;

// ── Beliefs ──────────────────────────────────────────────────

export interface Belief {
  title: string;
  description: string;
}

export const BELIEFS: readonly Belief[] = [
  {
    title: "Zero Structural Complaints",
    description:
      "Not one structural rework across 10 projects. We pour the same RMC grade we spec in the brochure and publish the test certificates.",
  },
  {
    title: "Registry Within 30 Days",
    description:
      "Once you take possession, registry paperwork is filed within 30 days. No year-long wait, no hidden charges.",
  },
  {
    title: "Clear Title, Every Plot",
    description:
      "Every MGL colony starts with consolidated, mutation-complete land. We share the full title chain before you pay a rupee.",
  },
  {
    title: "Roads Before Roofs",
    description:
      "Internal roads, drainage, and electrification are completed before we hand over a single plot. You build on finished infrastructure.",
  },
  {
    title: "Sonipat-Rooted Team",
    description:
      "Our site office is on NH-344P, 10 minutes from every project. The people who sold you the plot are the same people who answer your call.",
  },
] as const;

// ── Amenities (Mystical Meadows context) ──────────────────────

export interface Amenity {
  title: string;
  description: string;
  bigImage: string;
  smallImage: string;
}

export const AMENITIES: readonly Amenity[] = [
  {
    title: "The Greens & Golf",
    description:
      "A landscaped 9-hole golf course winding through the township, with a dedicated driving range, chipping area, and tree-lined fairways open to all residents.",
    bigImage: "/images/amenities-1-big.avif",
    smallImage: "/images/amenities-1-small.avif",
  },
  {
    title: "The Clubhouse & Pool",
    description:
      "A 25,000 sq. ft. clubhouse with a temperature-controlled pool, banquet hall, indoor gym, squash court, and a rooftop lounge overlooking the greens.",
    bigImage: "/images/amenities-2-big.avif",
    smallImage: "/images/amenities-2-small.avif",
  },
  {
    title: "Parks & Walking Trails",
    description:
      "Over 8 km of dedicated cycling and jogging trails, children's adventure parks, senior-citizen yoga decks, and a 5-acre central botanical garden.",
    bigImage: "/images/amenities-3-big.avif",
    smallImage: "/images/amenities-3-small.avif",
  },
] as const;

// ── FAQs ─────────────────────────────────────────────────────

export interface FAQ {
  question: string;
  answer: string;
}

export const FAQS: readonly FAQ[] = [
  {
    question: "Are MGL Realtech projects RERA-registered?",
    answer:
      "Yes. Every MGL project that is open for sale carries a valid HARERA (Haryana RERA) registration number displayed at the site office and in all marketing material. You can verify the number on haryanarera.gov.in before booking.",
  },
  {
    question: "What plot sizes are available?",
    answer:
      "Our plotted colonies offer plots from 100 sq. yd. to 500 sq. yd., with the most popular sizes being 150, 200, and 250 sq. yd. Villa floor units start at 150 sq. yd. All layouts are Vastu-compliant.",
  },
  {
    question: "Can I get a bank loan for an MGL plot?",
    answer:
      "All ongoing MGL projects are pre-approved with major banks including SBI, PNB, HDFC, and ICICI. We assist with the full loan application process at no extra cost.",
  },
  {
    question: "How far is Kharkhoda from Delhi?",
    answer:
      "Kharkhoda is approximately 60 km from central Delhi via NH-44. The Delhi border at Narela is about 35 km away, roughly 40 minutes by road. The upcoming Rithala-Kundli Metro extension (approved, targeted 2028) will further cut travel time.",
  },
  {
    question: "What is the possession timeline for ongoing projects?",
    answer:
      "Orchid Heights villa floors are scheduled for possession in Q2 2027. MGL Business Park commercial units begin handover in Q4 2026. All timelines are RERA-committed. We have a 100% on-time delivery record.",
  },
  {
    question: "Why is the Kharkhoda-Sonipat belt a good investment?",
    answer:
      "The Maruti Suzuki Kharkhoda mega-plant (operational since Feb 2025), the KMP Expressway, the NH-44 elevated corridor, and the proposed Delhi-Panipat RRTS are driving job creation and connectivity. Prices here are still 60-80% lower than equivalent locations in Gurugram.",
  },
  {
    question: "What is Mystical Meadows?",
    answer:
      "Mystical Meadows is MGL's upcoming ~150-acre integrated golf township in the Kundli-Sonipat urban complex. It will feature a 9-hole golf course, clubhouse, villa plots, and SCO commercial blocks. Registration details will be announced once DTCP licensing is complete.",
  },
] as const;

// ── About section copy ───────────────────────────────────────

export const ABOUT = {
  caption: "(About)",
  heading: "timeless design, purposeful development",
  paragraph1:
    "MGL Realtech has been developing residential colonies and commercial spaces along the NH-344P corridor since 2018. Every project starts with clear land titles, ends with on-time registry, and is backed by a team that lives and works in Kharkhoda.",
  paragraph2:
    "From the Maruti plant corridor to the Kundli growth belt, we know this land parcel by parcel. That ground-level knowledge is why 500+ families have trusted us with their most important purchase.",
  image: "/images/about-desktop.avif",
  imageAlt: "MGL Realtech residential development in Kharkhoda",
} as const;

// ── CTA / Contact section copy ───────────────────────────────

export const CTA = {
  heading: "See the Site,\nThen Decide",
  description:
    "Book a guided site visit to any MGL project. Walk the roads, check the construction, meet the team. No pressure,just the facts on the ground.",
  formTitle: "Book a Visit",
  formSubtitle: "We'll call you within 2 hours to confirm your slot.",
  submitLabel: "request",
  privacyNote: "By submitting, you agree to our privacy policy.",
  successMessage: "Thank you! We'll call you within 2 hours.",
} as const;

// ── Beliefs section copy ─────────────────────────────────────

export const BELIEFS_SECTION = {
  caption: "(Our beliefs)",
  heading: "A Vision of Inspired Living",
  description:
    "To build developments that stand up to scrutiny,where the roads are laid before the first plot is sold, the title is clear before the first ad is run, and the registry happens before the buyer has to follow up.",
} as const;

// ── Amenities section copy ───────────────────────────────────

export const AMENITIES_SECTION = {
  caption: "(Amenities)",
  heading: "Designed for Living",
} as const;

// ── FAQ section copy ─────────────────────────────────────────

export const FAQ_SECTION = {
  caption: "(FAQ)",
  heading: "Your Questions, Answered",
} as const;

// ── Footer ───────────────────────────────────────────────────

export const FOOTER = {
  columns: [
    {
      caption: "(Get in touch)",
      content: SITE.name,
      type: "brand" as const,
    },
    {
      caption: "(Location)",
      line1: SITE.addressLine1,
      line2: SITE.addressLine2,
      type: "location" as const,
    },
    {
      caption: "(Contact)",
      email: SITE.email,
      phone: SITE.phone,
      whatsappUrl: `https://wa.me/${SITE.whatsapp}`,
      type: "contact" as const,
    },
  ],
  bottomLeft: SITE.copyright,
  bottomRight: "All rights reserved.",
} as const;

// ── Location highlights (for About or standalone section) ────

export interface LocationHighlight {
  label: string;
  detail: string;
}

export const LOCATION_HIGHLIGHTS: readonly LocationHighlight[] = [
  {
    label: "Maruti Suzuki Kharkhoda",
    detail: "~900-acre mega-plant, operational since Feb 2025",
  },
  {
    label: "KMP Expressway",
    detail: "Operational since 2018. Kundli is the northern terminus",
  },
  {
    label: "NH-44 Elevated Corridor",
    detail: "High-speed Delhi-Sonipat link, operational since 2023",
  },
  {
    label: "Metro to Kundli",
    detail: "Rithala-Narela-Kundli Phase IV, approved, targeted 2028",
  },
  {
    label: "Delhi-Panipat RRTS",
    detail: "Rapid rail proposed, PIB-approved Nov 2025",
  },
  {
    label: "Education Cluster",
    detail: "SRM University, Ashoka University, O.P. Jindal Global, all within 20 km",
  },
] as const;
