export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string[]; // bullets or sections
  speakerNotes: string[];
  layoutType: 'title' | 'summary' | 'bullets' | 'split' | 'two-column' | 'conclusion';
  visualSuggestion?: string;
}

export const PRESENTATION_SLIDES: Slide[] = [
  {
    id: 1,
    title: "BBQ Tonight - Premium Restaurant Hub",
    subtitle: "A Complete Digital & Guest Experience Transformation Proposal by MetaWave Innovations",
    content: [
      "Prepared For: BBQ Tonight Management",
      "Date: July 2026",
      "Status: Premium Proposal Phase"
    ],
    speakerNotes: [
      "Welcome, Founders and Board Members of BBQ Tonight. We are MetaWave Innovations.",
      "Today, we are thrilled to present our tailored digital transformation and guest-experience proposal for your flagship restaurant.",
      "Our goal is to align your stellar culinary reputation with a high-performance, conversion-first online ordering and table booking ecosystem.",
      "Note our '100% Flavor & Tech' assurance: it represents our commitment to seamless delivery, robust ordering, and gorgeous aesthetic design."
    ],
    layoutType: 'title',
    visualSuggestion: "Use the premium high-quality flame grill imagery. Place a prominent '100% Experience' badge in the top right corner."
  },
  {
    id: 2,
    title: "Our Vision for BBQ Tonight",
    subtitle: "Executive Summary",
    content: [
      "Objective: To design an elite, high-performance web & mobile hub that captures the smoky, rich ambiance of your dine-in experience.",
      "Key Impact: Empower food lovers to explore the visual menu, book premium lounge tables, and place direct online delivery orders with zero friction.",
      "Goal: To amplify the BBQ Tonight brand, eliminate third-party marketplace commissions, and streamline back-of-house kitchen workflows."
    ],
    speakerNotes: [
      "Let's look at the grand vision. Why are we launching this custom platform instead of relying solely on generic aggregators?",
      "First, we want your guests to experience the warm, charcoal-lit luxury of BBQ Tonight before they even enter. Our gorgeous visual menus do exactly that.",
      "Second, by offering a direct delivery and reservation system, you reclaim full control over your customer data and eliminate steep 30% commission fees.",
      "Finally, we integrate directly with your POS and kitchen staff, ensuring every tandoor and grill ticket flows smoothly without double-handling."
    ],
    layoutType: 'summary',
    visualSuggestion: "Clean minimalist layout with gold accents, warm charcoal highlights."
  },
  {
    id: 3,
    title: "Understanding Your Needs",
    subtitle: "Your Core Requirements",
    content: [
      "Culinary Showcase: Elite high-fidelity menu display with interactive filters for spices, allergens, and chef specials.",
      "Reservation Engine: Smooth table booking flow with live selection of premium dining zones (lounge, family area, grill-side).",
      "Direct Ordering: Instant delivery and click-and-collect checkout powered by real-time tracking & WhatsApp order confirmations.",
      "Catering & Events: Dedicated lead-capture system for luxury corporate banquets, weddings, and high-end outdoor BBQ live stations."
    ],
    speakerNotes: [
      "Based on our deep analysis of your operational model, we've identified four vital growth pillars.",
      "1. Culinary Showcase: High-end, rich food photography and seamless menu sorting so customers can explore platters, kebabs, and tikkas easily.",
      "2. Reservation Engine: No more busy phone lines. Guests can secure lounge or grill-view tables on their phones in just three clicks.",
      "3. Direct Ordering: A premium checkout experience that keeps customers on your site and prompts them with high-margin add-ons like signature mocktails or desserts.",
      "4. Catering: BBQ Tonight's live grills are legendary. We build a high-conversion inquiry funnel to capture premium catering bookings."
    ],
    layoutType: 'bullets',
    visualSuggestion: "Four structured bento-cards representing core pillars with culinary-themed luxury icons."
  },
  {
    id: 4,
    title: "The Complete Digital Ecosystem",
    subtitle: "Proposed Website Solution",
    content: [
      "Website Pages: Home, Story, Interactive Menu, Reservations, Catering & Events, Locations, Reviews, Direct Delivery Shop, FAQ, Contact.",
      "Interactive Modules: Live Kitchen Tracker, Instant Table Booker, Custom Platter Builder, Integrated Delivery Estimator & WhatsApp Alerts."
    ],
    speakerNotes: [
      "This slide outlines the comprehensive architecture of the proposed BBQ Tonight platform.",
      "On the left, we map out a fully integrated page hierarchy designed to elevate your brand story, display your multiple branches, and drive conversions.",
      "On the right, we introduce custom interactive modules. The Custom Platter Builder, for instance, lets families configure their own tikka and kebab assortments dynamically, driving up average order values by 25%."
    ],
    layoutType: 'split',
    visualSuggestion: "Split Screen Layout: Website pages on the left, interactive features on the right."
  },
  {
    id: 5,
    title: "Engineered for Dining Excellence",
    subtitle: "Features & Functionalities",
    content: [
      "Guest Experience (The Sizzle):",
      "High-fidelity, interactive visual menu with zoomable gourmet food close-ups",
      "Seamless mobile-first booking & checkout with Apple Pay / card support",
      "Loyalty Reward Portal & instant WhatsApp receipt and delivery tracking",
      "One-tap calls and GPS routing to nearest branch with active seating status",
      "Kitchen & Admin Control (The Fire):",
      "Unified kitchen tablet display for incoming orders, edits, and booking updates",
      "Real-time menu item toggles (mark sold-out instantly during peak rush)",
      "In-depth analytics dashboard to monitor daily sales, peak hours, and guest trends"
    ],
    speakerNotes: [
      "Let's look at what powers this platform on both ends.",
      "For your guests, it's all about the sizzle. They get a blazing-fast mobile experience where they can browse items, build custom platters, and pay instantly.",
      "For your kitchen team and branch managers, we keep it simple. They get an admin app to track table reservations, manage catering inquiries, and toggle menu availability with one tap so guests are never disappointed."
    ],
    layoutType: 'two-column',
    visualSuggestion: "Two-Column Layout: Guest features on the left, Admin/Kitchen features on the right."
  },
  {
    id: 6,
    title: "Why Partner with MetaWave?",
    subtitle: "MetaWave Advantage (Premium Hospitality)",
    content: [
      "Hospitality Expertise: We don't just write code; we understand guest psychology, premium culinary branding, and table turnover optimization.",
      "High-Speed Performance: Ultra-optimized static loading, ensuring your website renders in under 1 second even during peak Sunday evening traffic.",
      "Scale-Ready Setup: Seamlessly manage multiple branches, menus, and prices from a single, centralized administrative dashboard.",
      "Dedicated Support: 24/7 technical monitoring during peak restaurant hours, ensuring your online orders are always processing smoothly."
    ],
    speakerNotes: [
      "Why MetaWave for BBQ Tonight? We bring a unique hospitality-tech focus to the table.",
      "First, our team has extensive experience in high-end restaurant systems. We know that every second of latency on a booking page is a lost table.",
      "Second, we guarantee lightning-fast load times. When hungry customers look for BBQ Tonight on 3G or 4G networks, the menu loads instantly.",
      "Third, we build with scale in mind. If you launch a new franchise or a express-concept stall, you can activate it in our backend in minutes."
    ],
    layoutType: 'bullets',
    visualSuggestion: "Modern grid highlighting culinary expertise, blazing speed, multi-location control, and peak hours SLA support."
  },
  {
    id: 7,
    title: "Let’s Elevate BBQ Tonight Together",
    subtitle: "Conclusion & Contact",
    content: [
      "We are ready to build an online digital experience that matches the legendary flavor of your signature grills.",
      "Call to Action: 'We look forward to partnering with BBQ Tonight.'",
      "Website: bbq-tonight.metawave.com",
      "Contact Email: hospitality@metawaveinnovations.com"
    ],
    speakerNotes: [
      "In conclusion, BBQ Tonight is a legendary culinary brand. Your online experience should be just as savory, premium, and legendary.",
      "We are ready to kickstart development immediately and deliver this masterpiece before your next seasonal menu launch.",
      "Thank you so much for your time and hospitality today. Let's fire up your digital presence!"
    ],
    layoutType: 'conclusion',
    visualSuggestion: "A clean gorgeous photo of family dining or professional chef at a live BBQ grill, with a warm gold checkmark badge."
  }
];
