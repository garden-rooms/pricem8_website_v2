// src/data/trades.ts

export type TradeId = "landscaping" | "garden-rooms";

export type TradePageContent = {
  id: TradeId;
  name: string;
  icon: string;
  path: string;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
    badge?: string;
    heroImage?: string;
  };
  showcase?: {
    title: string;
    description: string;
    image: string;
  };
  pains: {
    title: string;
    items: string[];
  };
  howHelps: {
    title: string;
    intro: string;
    bullets: string[];
  };
  howFitsTogether?: {
    title: string;
    intro: string;
    estimatingLink: string;
    quotingLink: string;
  };
  pack: {
    title: string;
    intro: string;
    materials: string[];
    labour: string[];
    tasks: string[];
  };
  tasks?: {
    title: string;
    intro: string;
    categories: {
      name: string;
      items: {
        name: string;
        description?: string | string[];
        highlight?: boolean;
      }[];
    }[];
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    subtitle?: string;
    primaryLabel: string;
    primaryHref: string;
  };
};

export const tradesContent: Record<TradeId, TradePageContent> = {
  landscaping: {
    id: "landscaping",
    name: "Landscaping",
    icon: "Shovel",
    path: "/trades/landscaping",
    seo: {
      title: "Landscaping Estimating Software & Quote App - PriceM8",
      description:
        "Quote patios, decking, fencing and garden rooms in minutes. Live aggregate and timber prices. The best app for UK landscapers.",
    },
    hero: {
      title: "Landscaping Quoting Software Built by Landscapers",
      subtitle: "Accurate quotes for patios, driveways, fencing and full garden builds.",
      badge: "Designed by someone who actually builds gardens",
    },
    showcase: {
      title: "See exactly where your profit is.",
      description: "Stop guessing. See your materials, labour, and wastage broken down in one clear view before you hit send.",
      image: "paving-estimate.png",
    },
    pains: {
      title: "Landscaping quoting problems",
      items: [
        "Sand, cement and timber prices changing daily",
        "Miscalculating waste removal and skip costs",
        "Labour varying wildly based on access and soil type",
        "Clients changing layouts and materials mid-quote",
        "Spreadsheets that don't account for wastage",
      ],
    },
    howHelps: {
      title: "How PriceM8 helps landscapers",
      intro:
        "PriceM8 was heavily shaped by real landscaping work, so it fits how you actually price gardens.",
      bullets: [
        "Live MOT, sand and timber prices updated weekly",
        "Smart Waste Engine: Calculates soil bulking and optimizes skip sizes",
        "Digger vs Manual: Auto-adjusts labour hours based on excavation method",
        "Calculators for paving, decking, turf and fencing (m2 & lm)",
        "Automatic material and labour totals with VAT and profit",
        "Professional quotes that show clients exactly what they get",
      ],
    },
    pack: {
      title: "What’s in the Landscaping Trade Pack",
      intro:
        "The most sophisticated landscaping logic on the market. Handles waste, soil bulking and complex paving in a few taps.",
      materials: [
        "Paving: 5+ grout types (Flowpoint, Joint-It, Fugabella, Mapei)",
        "Fencing: Closeboard, Lap, and Decorative panels (0.9m - 1.8m)",
        "Posts: Concrete & Timber (up to 3.0m) + Postcrete logic",
        "Artificial Grass: Seaming tape, adhesive and perimeter fixings",
        "Sleepers: Oak vs Softwood size and quantity math",
        "Aggregates: MOT Type 1, Sharp Sand, and Ballast",
      ],
      labour: [
        "Digger vs Manual excavation labour shift logic",
        "Skip size optimization (6yd vs 8yd vs Grab)",
        "Poor access labour uplifts (auto-calculated)",
        "Jointing & Sealing labour by m2",
      ],
      tasks: [
        "Paving Installation (Porcelain or Natural Stone)",
        "Panel Fencing (just enter length and height)",
        "Artificial Grass (perimeter and seam math included)",
        "Lawn cultivation & Soil removal logic",
        "Garden Sleeper structure math",
        "Soft Landscaping & Drainage tasks",
      ],
    },
    faq: {
      title: "Landscaping FAQs",
      items: [
        {
          question: "Can I use my own paving supplier prices?",
          answer:
            "Yes. You can add your own paving products as materials and update their prices manually whenever your supplier prices change.",
        },
        {
          question: "Does PriceM8 handle labour and materials separately?",
          answer:
            "Yes. Materials, labour, overhead and profit are all tracked separately so you can see where your money goes.",
        },
        {
          question: "How does the Smart Waste Engine work?",
          answer:
            "The Smart Waste Engine automatically calculates soil bulking (20% expansion factor) and optimizes skip sizes. It compares 6yd vs 8yd skips vs grab lorries and recommends the most cost-effective option based on waste volume. No more guessing or over-ordering skips.",
        },
        {
          question: "What happens if I choose digger vs manual excavation?",
          answer:
            "PriceM8 automatically adjusts labour hours based on your choice. Digger excavation is much faster (typically 1 hour per m³ vs 5.5 hours manual), and the system recalculates all labour costs accordingly. You can switch between methods instantly to see the cost difference.",
        },
        {
          question: "Can I customize the grout types for paving?",
          answer:
            "Yes. Each paving task lets you choose from 5+ grout types (Flowpoint, Joint-It, Fugabella, Mapei, GFTK). The system automatically includes the correct quantities and prices for your chosen grout.",
        },
        {
          question: "How accurate are the material calculations?",
          answer:
            "All material quantities are calculated using real-world installation assumptions. For example, MOT Type 1 is calculated at 0.1m³ per m² at 100mm thickness, with automatic adjustments for different thicknesses. Sharp sand, cement, and all other materials follow similar proven formulas.",
        },
        {
          question: "What if a client changes the spec mid-quote?",
          answer:
            "PriceM8 makes it easy to adjust. Change the paving type, grout, or dimensions and all materials, labour, and totals update instantly. No need to recalculate everything manually.",
        },
        {
          question: "Does it handle poor access automatically?",
          answer:
            "Yes. When you select 'poor access', PriceM8 automatically applies labour uplifts and can swap bulk materials for bagged versions where needed. This ensures you're pricing accurately for difficult sites.",
        },
        {
          question: "Can I create custom tasks for jobs not in the pack?",
          answer:
            "Yes. You can create completely custom tasks and assemblies for any job with your own materials and labour rates. Any tasks you create yourself can be fully customized and modified to fit your specific needs.",
        },
        {
          question: "How does skip optimization work?",
          answer:
            "The system calculates total waste volume (including soil bulking), then compares costs for 6yd skips, 8yd skips, and grab lorries. It automatically selects the most economical option and shows you the breakdown. You can override if you prefer a different method.",
        },
        {
          question: "What about artificial grass seams and perimeter fixings?",
          answer:
            "The Artificial Grass task automatically calculates Perimeter Pin Kerb for edge fixing (essential structural component, not decorative), plus seaming tape and adhesive if seams are required. Just enter the area and whether seams are needed - the system handles the rest.",
        },
        {
          question: "Can I use PriceM8 for quotes without the Landscaping Pack?",
          answer:
            "Yes. PriceM8 Core lets you create quotes manually with your own materials and labour. However, the Landscaping Pack saves significant time by pre-calculating quantities, handling waste logic, and providing ready-made tasks for common landscaping jobs.",
        },
        {
          question: "How often are material prices updated?",
          answer:
            "Core pack materials (MOT Type 1, Sharp Sand, Cement, etc.) are updated weekly based on real supplier prices. Any custom materials you add are updated manually by you, so you stay in control of your pricing.",
        },
      ],
    },
    tasks: {
      title: "17 Ready-Made Tasks That Price Themselves",
      intro: "Every task in the Landscaping Pack includes pre-calculated materials, labour, and waste logic. Just enter dimensions and PriceM8 handles the rest.",
      categories: [
        {
          name: "Paving & Surfaces",
          items: [
            {
              name: "Porcelain Paving",
              description: "Full base build-up with MOT Type 1, sharp sand, and cement. Choose from 5 grout types (Flowpoint, Joint-It, Fugabella, Mapei, GFTK). Optional cutting blades included. Auto-calculates digger vs manual excavation time.",
              highlight: true,
            },
            {
              name: "Natural Stone Paving",
              description: "Same sophisticated base logic as porcelain, with natural stone material calculations. Handles all grout types and excavation methods.",
              highlight: true,
            },
            {
              name: "Block Paving",
              description: "Complete block paving installation with optional edging (Pin Kerb or Block Kerb). Includes base, kiln-dried sand, and all fixings.",
            },
            {
              name: "Paving (over existing base)",
              description: "For when the base is already done. Just add paving slabs and grout. Perfect for quick quotes on existing prepared areas.",
            },
            {
              name: "MOT Type 1 Base",
              description: "Standalone base installation. Calculates MOT, sharp sand, cement, and optional geotextile. Adjustable thickness (100-200mm).",
            },
            {
              name: "Concrete Base over MOT Type 1",
              description: "Full concrete slab with sub-base. Configurable thickness (75-150mm), grade (C20/C25/C30), and finish (brushed/tamped/powerfloat).",
            },
          ],
        },
        {
          name: "Fencing & Boundaries",
          items: [
            {
              name: "Panel Fencing",
              description: "Just enter length and height. Auto-calculates panels, posts (concrete or timber), postcrete, and clips. Choose from Closeboard, Lap, or Decorative panels (0.9m-1.8m). Optional gates and gravel boards included.",
              highlight: true,
            },
            {
              name: "Garden Sleepers",
              description: "Sleeper structures with automatic quantity calculations. Handles Oak vs Softwood sizing, concrete spurs, and all fixings.",
            },
          ],
        },
        {
          name: "Lawns & Grass",
          items: [
            {
              name: "Artificial Grass Install",
              description: "Complete installation with MOT base, sharp sand, and all fixings. Automatically calculates Perimeter Pin Kerb for edge fixing, plus seaming tape and adhesive if seams are required. No more guessing perimeter materials.",
              highlight: true,
            },
            {
              name: "Natural Lawn",
              description: "Full lawn installation including soil removal (with bulking factor), new topsoil, cultivation (with optional cultivator hire), and turf laying. Smart waste disposal options.",
            },
          ],
        },
        {
          name: "Structures & Features",
          items: [
            {
              name: "Decking Installation",
              description: "Complete decking with frame support options. Choose concrete spurs or timber posts, box section steel or timber bearers. Auto-calculates all materials and fixings.",
            },
            {
              name: "Timber Pergola Structure",
              description: "Full pergola pricing with posts, rafters, optional roof covering (multiwall or solid polycarbonate), and screens. Configurable post sizes, rafter spacing, and fixing methods.",
            },
            {
              name: "Steel Frame Base (Concrete Piles)",
              description: "Steel frame foundation system with concrete pads. Perfect for garden rooms and structures. Auto-calculates spurs, concrete, and box section steel.",
            },
          ],
        },
        {
          name: "Foundations & Building",
          items: [
            {
              name: "Trench Foundation",
              description: "Trench foundations with configurable dimensions. Handles ready-mixed or on-site mixed concrete. Auto-calculates excavation time (digger vs manual) and waste with 20% bulking factor.",
            },
            {
              name: "Solid External Walls",
              description: "Block or facing brick walls with configurable thickness (100mm or 215mm). Handles bulk bag or small bag sand options. Materials and labour calculated per 10m².",
            },
            {
              name: "Colour Render",
              description: "Complete render system with base, mesh, primer, and finish. Choose thin coat or scrape coat finish. All materials and labour pre-calculated.",
            },
          ],
        },
        {
          name: "Roofing",
          items: [
            {
              name: "Torch-On Felt Flat Roof System (3-Layer SBS)",
              description: "Professional flat roof system with 10% lap/waste allowance. Includes GRP trims, optional lead flashing, and solar paint. Perfect for garden rooms and extensions.",
            },
          ],
        },
      ],
    },
    cta: {
      title: "Quote landscaping jobs without guesswork.",
      subtitle:
        "From patios to full gardens, PriceM8 helps you price clearly and confidently.",
      primaryLabel: "Start free trial",
      primaryHref: "#waitlist",
    },
  },

  "garden-rooms": {
    id: "garden-rooms",
    name: "Garden Rooms",
    icon: "Warehouse",
    path: "/trades/garden-rooms",
    seo: {
      title: "Garden Room Estimating Software & Quote App - PriceM8",
      description:
        "Premium garden room estimating software. Price £12k–£60k projects accurately with complete structural breakdowns, cladding options, and professional quotes.",
    },
    hero: {
      title: "Premium Garden Room Estimating Software",
      subtitle:
        "The complete system for pricing high-value garden offices, studios, and gyms. One-time payment, lifetime access.",
      badge: "Premium Feature • One-Time Payment",
    },
    showcase: {
      title: "Professional garden room breakdowns that win £12k–£60k projects.",
      description: "Show your clients exactly where the value is with detailed structural breakdowns, cladding options, and complete internal finishes.",
      image: "garden-rooms-estimate.png",
    },
    pains: {
      title: "Garden room quoting problems",
      items: [
        "Many materials to track: timber, insulation, cladding, fixings, electrics",
        "Timber and cladding prices changing regularly",
        "Doors and windows varying hugely in price (£500–£5,000+)",
        "Clients changing layouts, sizes and spec several times",
        "Forgetting internal finishes like skirting, architrave, and flooring",
        "Complex bundle pricing that's hard to break down for clients",
        "High-value projects need professional quotes that justify the price",
      ],
    },
    howHelps: {
      title: "How PriceM8 helps garden room builders",
      intro:
        "PriceM8's premium Garden Room Pack gives you a complete system for pricing high-value projects from foundations to final finishes.",
      bullets: [
        "Complete Garden Room Bundle: Structure, roof, cladding, electrics, and finishes in one task",
        "Live timber and cladding prices updated weekly from UK suppliers",
        "Foundation options: Steel frame, concrete base, or trench foundation",
        "Cladding logic: Cedar, Larch, Composite, or Box Profile with front-only or all-walls options",
        "Integrated electrics: Consumer units, sockets, switches, downlights, and testing",
        "Internal finishes: Plaster skim, painting, flooring (laminate, wood, tiles)",
        "Professional PDF quotes that justify £12k–£60k project prices",
        "One-time payment: No ongoing subscription, lifetime access",
      ],
    },
    pack: {
      title: "What's in the Premium Garden Room Pack",
      intro:
        "A complete multi-trade bundle that combines structure, external finishes, electrics, and internal finishes into one professional system.",
      materials: [
        "Foundation: Steel Frame (concrete piles), Concrete Base, or Trench Foundation",
        "Cladding: Cedar (Channel/TGV), Larch, Composite Slatted, or Box Profile",
        "Roofing: EPDM, Torch-On Felt, or GRP systems with trims and flashing",
        "Doors/Windows: uPVC, Aluminium, or Timber (allowances or client supply)",
        "Insulation: PIR (50-100mm) combined with Rockwool slabs",
        "Electrics: Consumer units, sockets, switches, downlights, external sockets/lights",
        "Internal Finishes: Plasterboard, plaster skim, paint, flooring (laminate/wood/tiles)",
      ],
      labour: [
        "Complete bundle installation with project management overhead",
        "Foundation installation (steel frame, concrete, or trench)",
        "Cladding installation (front-only vs all-walls labour splits)",
        "Roofing installation (EPDM, felt, or GRP systems)",
        "Electrical first & second fix (Consumer unit to final fix)",
        "Internal finish-out (Plaster skim, paint, flooring)",
      ],
      tasks: [
        "Garden Room Bundle (Complete system from foundations to finishes)",
        "EPDM Roofing System (Professional flat roof with trims)",
        "All foundation, cladding, electrics, and finishing options included",
      ],
    },
    tasks: {
      title: "Premium Garden Room System",
      intro: "The Garden Room Pack includes a sophisticated bundle task that automatically calculates every material, labour hour, and cost for the entire build. Enter dimensions once, select your specifications, and PriceM8 generates a complete professional quote that justifies £12k–£60k project prices.",
      categories: [
        {
          name: "Complete Garden Room Bundle",
          items: [
            {
              name: "Garden Room (Bundle)",
              description: [
                "Foundation logic: Steel frame, concrete base, or trench foundation",
                "Stud wall construction with insulation options",
                "Cladding selection: Cedar, Larch, Composite, or Box Profile (front-only or all-walls)",
                "Roofing types: EPDM, torch-on felt, or GRP",
                "Complete electrical package: Consumer unit, sockets, switches, downlights, testing",
                "Doors and windows: Allowances or client supply",
                "Internal finishes: Plaster skim, painting, flooring, wall tiling",
                "All materials and labour calculated automatically from dimensions"
              ],
              highlight: true,
            },
          ],
        },
        {
          name: "Roofing Systems",
          items: [
            {
              name: "EPDM Roofing System",
              description: [
                "Automatic material calculations: Membrane, adhesive, trims, flashing",
                "Labour adjusts for perimeter complexity and wall abutments",
                "Perfect for durable, weatherproof garden room roofs"
              ],
              highlight: true,
            },
          ],
        },
      ],
    },
    faq: {
      title: "Garden Room FAQs",
      items: [
        {
          question: "Why is the Garden Room Pack a one-time payment?",
          answer:
            "The Garden Room Pack is designed for high-value projects (£12k–£60k) and is a specialist premium feature. It's a one-time payment because it's a complete, comprehensive system that doesn't require ongoing updates like subscription packs. You get lifetime access to the pack once purchased.",
        },
        {
          question: "Do I need PriceM8 Core to use the Garden Room Pack?",
          answer:
            "Yes. The Garden Room Pack requires PriceM8 Core (the base subscription) to function. Core gives you access to the quoting system, client management, and all the base features. The Garden Room Pack adds the specialized garden room bundle and tasks on top of Core.",
        },
        {
          question: "Can I adapt this to my own garden room system?",
          answer:
            "Yes. The garden room pack is designed as a starting point. You can edit all items, add your own materials, modify labour rates, and build new packs for different sizes or specs. The bundle task is fully customizable to match your build system.",
        },
        {
          question: "How does the bundle task work?",
          answer:
            "The Garden Room Bundle is a single task that automatically calculates all materials and labour for the entire build. You enter dimensions (length, width, height) and select options for foundation, roof, cladding, doors/windows, electrics, and internal finishes. The system then breaks down all materials and labour automatically, giving you a complete professional quote.",
        },
        {
          question: "What foundation options are available?",
          answer:
            "The pack supports three foundation types: Steel Frame (concrete piles with box section steel), Concrete Base (slab over MOT Type 1), or Trench Foundation. Each option automatically calculates materials, labour, and costs based on your garden room dimensions.",
        },
        {
          question: "How does cladding selection work?",
          answer:
            "You can choose from Cedar (Channel or TGV), Larch, Composite Slatted, or Box Profile cladding. The system lets you apply cladding to all walls or just the front wall, automatically adjusting materials and labour accordingly. Cladding can be supplied by you, included as an allowance, or client-supplied.",
        },
        {
          question: "What electrical options are included?",
          answer:
            "The bundle includes a complete electrical package: Consumer unit (garage or domestic, 12/16/22-way), Sockets, Switches, LED downlights, External sockets and lights, Extractor fans, Testing & certification. All electrical materials and labour are automatically calculated based on your selections.",
        },
        {
          question: "Can I customize door and window allowances?",
          answer:
            "Yes. Doors and windows can be included as allowances (you set the price per door/window), supplied by you, or client-supplied. The system automatically includes installation labour and fixings based on your selection.",
        },
        {
          question: "What internal finish options are available?",
          answer:
            "The bundle includes: Plaster skim (optional), Painting (walls, ceilings, woodwork with prep levels), Flooring (laminate, wood, or tiles with underlay options), Wall tiling (optional, with area input). All materials and labour are automatically calculated based on your selections.",
        },
        {
          question: "How accurate are the material calculations?",
          answer:
            "All material quantities are calculated using real-world installation assumptions. For example, insulation is calculated based on wall/roof/floor areas with proper pack coverage, timber is calculated with waste factors, and cladding includes all fixings and trims. The system uses proven formulas that match actual build requirements.",
        },
        {
          question: "Can I use this for different garden room sizes?",
          answer:
            "Yes. The bundle task accepts dimensions from 1m to 20m for length and width, and 2m to 4m for height. All materials and labour scale automatically based on your dimensions, so you can price anything from a small garden office to a large studio or gym.",
        },
        {
          question: "What if I need to add custom items?",
          answer:
            "You can add custom tasks and materials to any quote. The Garden Room Bundle gives you the complete base system, but you can add additional items like decking, external lighting, heating systems, or any other custom requirements. All custom items integrate seamlessly with the bundle pricing.",
        },
      ],
    },
    cta: {
      title: "Quote garden rooms with confidence and control.",
      subtitle:
        "Price £12k–£60k projects accurately with complete structural breakdowns and professional quotes that justify the price.",
      primaryLabel: "Start free trial",
      primaryHref: "#waitlist",
    },
  },
};
