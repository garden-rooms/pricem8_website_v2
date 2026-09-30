// src/data/trades.ts

export type TradeId =
  | "plumbing"
  | "electrical"
  | "landscaping"
  | "building"
  | "building2ndFix"
  | "garden-rooms";

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
  plumbing: {
    id: "plumbing",
    name: "Plumbing",
    icon: "Droplets",
    path: "/trades/plumbing",
    seo: {
      title: "Plumbing Estimating Software & Quoting App - PriceM8",
      description:
        "Plumbing estimating and quoting software for UK plumbers. Price bathrooms, boiler swaps and call-outs in minutes with live material prices. Try it free.",
    },
    hero: {
      title: "The Plumbing Quoting App That Does The Maths For You",
      subtitle: "Stop guessing. Start winning more profitable bathroom and boiler jobs.",
      badge: "Built for UK plumbing businesses",
    },
    showcase: {
      title: "Price bathrooms and boilers in seconds.",
      description: "See how PriceM8 simplifies complex plumbing quotes with pre-built packs and live material pricing.",
      image: "plumbing-estimate.png",
    },
    pains: {
      title: "Common plumbing quoting problems",
      items: [
        "Chasing suppliers for up-to-date copper and fittings prices",
        "Forgetting small fittings and consumables that eat into profit",
        "Redoing quotes when customers change layouts or specs",
        "Spreadsheets and paper notes scattered everywhere",
        "Hard to see true profit once materials and labour are added",
      ],
    },
    howHelps: {
      title: "How PriceM8 helps plumbers",
      intro:
        "PriceM8 gives you a simple way to keep on top of materials, labour and profit for every plumbing job.",
      bullets: [
        "Live copper and fittings prices updated weekly from UK suppliers",
        "Pre-built bathroom and boiler packs you can adapt in seconds",
        "Unlimited quotes with saved clients and projects",
        "Automatic totals, VAT and margin calculations",
        "Professional PDF quotes that win more work",
      ],
    },
    pack: {
      title: "What’s in the Plumbing Trade Pack",
      intro:
        "Automated logic for common plumbing installs. Just enter the run length or fixture count and PriceM8 handles the rest.",
      materials: [
        "Copper & Plastic pipe logic (15mm, 22mm, 28mm)",
        "Compression and push-fit fitting allowances",
        "Multiple supply modes: Contractor vs Client supplied",
        "Waste pipe systems (32mm, 40mm, 110mm)",
        "Radiator valves and TRV calculation logic",
      ],
      labour: [
        "Surface clipped vs concealed/chased labour rates",
        "Plumbing first-fix vs 2nd-fix labour splits",
        "Heating system power flush labour (by radiator count)",
        "Call-out and emergency day rates",
      ],
      tasks: [
        "Radiator Replacement & Minor Relocation",
        "Sink & Basin installation logic",
        "Heating Pipe Runs (automated material lists)",
        "Shower, Bath & WC connection kits",
        "Outside Tap installation (short/medium/long runs)",
        "Full system power flushing",
      ],
    },
    tasks: {
      title: "10 Ready-Made Tasks That Price Themselves",
      intro: "Every task in the Plumbing Pack includes pre-calculated materials, labour, and connection logic. Just enter quantities and PriceM8 handles the rest.",
      categories: [
        {
          name: "Bathroom Fixtures",
          items: [
            {
              name: "Sink / Basin Installation",
              description: "Installation of a sink or basin with hot/cold water and waste connections. Supports contractor supply, client supply, or connection-only modes. Labour calculated dynamically based on fixture type, connections, run length, and removal requirements.",
              highlight: true,
            },
            {
              name: "WC Installation",
              description: "Installation of a WC (toilet) with cold water and 110mm soil connections. Supports contractor supply, client supply, or connection-only modes. Labour adjusts automatically for connection complexity and run length.",
              highlight: true,
            },
            {
              name: "Bath Installation",
              description: "Complete bath installation including taps, waste, and connections to existing hot and cold water supplies. Fixed 9.0 hours per fixture for complete installation.",
              highlight: true,
            },
            {
              name: "Shower Installation",
              description: "Complete shower installation including tray, enclosure, mixer, waste, and all associated connections to existing services. Fixed 11.0 hours per fixture for complete installation.",
              highlight: true,
            },
          ],
        },
        {
          name: "Heating Systems",
          items: [
            {
              name: "Radiator Replacement / Minor Relocation",
              description: "Replacement or minor relocation of a radiator, including valves and connection to existing pipework. Labour: 3.0 hours for replacement, 4.0 hours for minor relocation.",
            },
            {
              name: "Heating Pipe Runs Installation",
              description: "Installation of heating pipe runs measured per linear metre. Supports 15mm and 22mm pipe sizes with surface clipped or concealed/chased installation methods. Labour: 0.30h per lm (surface), 0.60h per lm (concealed/chased).",
              highlight: true,
            },
            {
              name: "Power Flush (Central Heating)",
              description: "Power flush of the central heating system including cleaning chemicals and optional inhibitor. Labour bands automatically: 6-12 hours per job depending on system size (1-5, 6-10, 11-15, 16-20 radiators).",
            },
            {
              name: "Magnetic Filter Installation",
              description: "Installation of a magnetic filter with optional inhibitor top-up. Fixed 2.5 hours per job.",
            },
          ],
        },
        {
          name: "Connections & Services",
          items: [
            {
              name: "Outside Tap Installation",
              description: "Installation of an outside tap including connection to existing cold water supply and basic testing. Supports short/medium/long run lengths with optional insulation. Labour: 3.0 hours per tap, +0.5h if removing existing.",
            },
            {
              name: "Appliance Connection (Washing Machine / Dishwasher)",
              description: "Connection of a washing machine or dishwasher to existing water supply and waste, including positioning and basic testing. Labour: 2.0 hours per appliance, +0.5 hours if removal required.",
            },
          ],
        },
      ],
    },
    faq: {
      title: "Plumbing FAQs",
      items: [
        {
          question: "Do I add my own boiler or bathroom suite prices?",
          answer:
            "Yes. Special items like boilers or full bathroom suites are user materials you add and update manually so you stay in control of your margins.",
        },
        {
          question: "Can I create packs for my most common installs?",
          answer:
            "Absolutely. You can duplicate existing packs or build new ones for things like boiler swaps, bathroom refits or cylinder installs.",
        },
        {
          question: "Who updates material prices?",
          answer:
            "Core material prices are updated weekly by the admin based on real supplier pages. Any custom materials you create are updated manually by you.",
        },
        {
          question: "How does supply mode work for fixtures?",
          answer:
            "Each fixture task (sink, WC, bath, shower) supports three supply modes: contractor supply (you provide the fixture), client supply (client provides), or connection-only (just plumbing connections). Labour and materials adjust automatically based on your selection.",
        },
        {
          question: "How are pipe runs calculated?",
          answer:
            "Heating pipe runs are measured per linear metre. The pack automatically calculates pipe, fittings, and labour based on pipe size (15mm or 22mm) and installation method (surface clipped vs concealed/chased). Optional fittings allowance can be included.",
        },
        {
          question: "Can I customize labour times?",
          answer:
            "Yes. While the pack provides industry-standard labour times that adjust automatically for different options, you can always override labour hours for specific jobs if needed.",
        },
        {
          question: "How does power flush labour work?",
          answer:
            "Power flush labour is automatically calculated based on system size bands (1-5, 6-10, 11-15, 16-20 radiators). The pack includes cleaning chemicals, and you can optionally include inhibitor. Labour ranges from 6-12 hours depending on system size.",
        },
        {
          question: "What's included in radiator replacement?",
          answer:
            "Radiator replacement includes the radiator, valves, and connection to existing pipework. Labour is 3.0 hours for replacement or 4.0 hours for minor relocation. You can choose whether valves are included or not.",
        },
        {
          question: "How are waste connections handled?",
          answer:
            "Waste connections are automatically included in fixture installations (sink, WC, bath, shower). The pack calculates the appropriate waste pipe size (32mm, 40mm, or 110mm) based on the fixture type.",
        },
        {
          question: "Can I create custom tasks for jobs not in the pack?",
          answer:
            "Yes. You can create completely custom tasks and assemblies for any job with your own materials and labour rates. Pack tasks are read-only templates, but any tasks you create yourself can be fully customized and modified to fit your specific needs.",
        },
        {
          question: "How accurate are the connection labour times?",
          answer:
            "Connection labour times are calculated dynamically based on run length, number of connections (hot/cold/waste/soil), and supply mode. The pack uses industry-standard times that adjust automatically for complexity.",
        },
        {
          question: "Does the pack handle first-fix vs second-fix?",
          answer:
            "Yes. The pack includes logic for first-fix (rough-in) vs second-fix (final connections) labour splits. Labour times adjust automatically based on the work stage.",
        },
      ],
    },
    cta: {
      title: "Price plumbing work with confidence.",
      subtitle: "Start building quotes in minutes with a plumbing pack tailored to your jobs.",
      primaryLabel: "Start free trial",
      primaryHref: "#waitlist",
    },
  },

  electrical: {
    id: "electrical",
    name: "Electrical",
    icon: "Zap",
    path: "/trades/electrical",
    seo: {
      title: "Electrical Estimating Software & Quoting App - PriceM8",
      description:
        "Create professional electrical quotes in minutes. Live cable prices, pre-built rewire packs and NICEIC-ready details. The best app for UK sparkies.",
    },
    hero: {
      title: "Electrical Estimating Software Built for Sparkies",
      subtitle: "Quote rewires, consumer units and EICRs faster than ever before.",
      badge: "Built for domestic electricians",
    },
    showcase: {
      title: "Rewire and circuit pricing made simple.",
      description: "Get accurate totals for SWA runs, consumer units, and first/second fix labour without the manual maths.",
      image: "electric-estiamate.png",
    },
    pains: {
      title: "Electrical quoting problems",
      items: [
        "Cable prices fluctuating weekly (copper is volatile)",
        "Complex rewire calculations taking hours to get right",
        "Forgetting small components like grommets and back boxes",
        "Estimating labour for different property types and access",
        "Spreadsheets getting messy and hard to maintain",
      ],
    },
    howHelps: {
      title: "How PriceM8 helps electricians",
      intro:
        "PriceM8 makes electrical quoting more consistent and less stressful.",
      bullets: [
        "Live T&E and SWA cable prices updated weekly",
        "Electrical starter pack with typical materials and labour items",
        "Rewire and consumer unit templates to speed up quoting",
        "Automatic totals, VAT and profit calculations",
        "Custom packs for rewires, board changes, kitchens and extensions",
      ],
    },
    pack: {
      title: "What’s in the Electrical Trade Pack",
      intro:
        "Advanced electrical logic handles everything from finish selection to SWA cable runs.",
      materials: [
        "Twin & Earth (1.0mm - 10.0mm) with weekly price sync",
        "SWA Cable (2.5mm - 6.0mm) + Gland and clip logic",
        "Consumer Units (12, 16, or 22-way options)",
        "Finish Logic: White vs Brushed Chrome price toggles",
        "Containment: Trunking, PVC, and Steel conduit options",
      ],
      labour: [
        "First-fix vs Second-fix labour percentages",
        "Testing & Certification (Minor Works vs EIC)",
        "Difficult access uplifts for cable pulling",
        "Consumer unit install/replacement labour",
      ],
      tasks: [
        "Double Socket & Light Switch installations",
        "LED Downlights (option for Fire-Rated)",
        "Internal & External Cable Runs (any length)",
        "Consumer Unit Replacement with SPD options",
        "NICEIC-ready Testing & Certification certs",
        "External Socket & Lighting circuits",
      ],
    },
    tasks: {
      title: "9 Ready-Made Tasks That Price Themselves",
      intro: "Every task in the Electrical Pack includes pre-calculated materials, labour, and finish logic. Just enter quantities and PriceM8 handles the rest.",
      categories: [
        {
          name: "Power & Sockets",
          items: [
            {
              name: "Double Socket Installation",
              description: "Installation of a double power socket with wiring, connection, and testing. Choose between white or brushed chrome finish, and plastic or metal back box. Auto-calculates Twin & Earth cable (5lm per socket) and labour (1.25h per socket).",
              highlight: true,
            },
            {
              name: "External Socket (IP66) Installation",
              description: "Weatherproof external socket installation with optional isolation switch. Supports both Twin & Earth and SWA cable types. Labour adjusts automatically for SWA (+0.5h) and isolation switch (+0.5h).",
              highlight: true,
            },
          ],
        },
        {
          name: "Lighting",
          items: [
            {
              name: "Light Switch Installation",
              description: "Installation of light switches with multiple options: single/double, white/brushed chrome, standard or dimmer. Auto-calculates back box type and size based on switch selection. Labour: 0.75h per switch.",
            },
            {
              name: "LED Downlight Installation",
              description: "LED downlight installation with optional fire-rated and cutting options. Downlights can be client supplied or included as an allowance. Labour adjusts for fire-rated (+0.10h) and cutting requirements (-0.15h if no cutting).",
              highlight: true,
            },
            {
              name: "External Light Installation",
              description: "External light fitting installation with optional PIR sensor. Supports Twin & Earth or SWA cable. Light can be client supplied or included as an allowance (£35 default). Labour: 1.50h base, +0.50h if PIR, +0.50h if SWA.",
            },
          ],
        },
        {
          name: "Cable Runs & Distribution",
          items: [
            {
              name: "Electrical Cable Runs Installation",
              description: "Installation of electrical cabling over any run length. Supports Twin & Earth (1.5mm-10.0mm) and SWA (2.5mm-6.0mm) with optional containment (trunking, PVC, or steel conduit). Labour adjusts automatically for installation method: surface (0.25h/lm), concealed (0.55h/lm), external (0.35h/lm), +0.10h/lm for SWA, +0.05h/lm for containment.",
              highlight: true,
            },
            {
              name: "Consumer Unit Install / Change",
              description: "Installation or replacement of consumer units with options for garage or domestic (12/16/22-way), optional SPD, and testing & certification. Labour adjusts for context (replacement vs new feed), unit type, testing (+2.0h), SPD (+0.5h), and difficult access (+1.5h).",
              highlight: true,
            },
          ],
        },
        {
          name: "Testing & Ventilation",
          items: [
            {
              name: "Testing & Certification",
              description: "Electrical testing and certification for Minor Works or EIC certificates. Labour bands automatically based on number of circuits (1-3, 4-6, 7-10) and certificate type. Includes optional allowance for minor remedial adjustments.",
              highlight: true,
            },
            {
              name: "Extractor Fan Installation",
              description: "Extractor fan installation with options for standard, timer, or humidistat types. Supports bathroom or utility locations with optional isolation switch. Fan can be client supplied or included as an allowance (£55 default). Labour: 2.00h base, +0.25h if timer, +0.50h if humidistat, +0.50h if isolator.",
            },
          ],
        },
      ],
    },
    faq: {
      title: "Electrical FAQs",
      items: [
        {
          question: "Do I need to update consumer unit prices manually?",
          answer:
            "Yes. High-value items like consumer units are user materials and you can update them manually whenever supplier prices change.",
        },
        {
          question: "Can I create different packs for rewires and small works?",
          answer:
            "Yes. You can create separate packs for full rewires, partial rewires, board changes and smaller jobs like extra sockets or lighting.",
        },
        {
          question: "How does the cable price sync work?",
          answer:
            "Twin & Earth and SWA cable prices are updated weekly by the admin based on real supplier prices. You'll always have current copper prices without manual updates.",
        },
        {
          question: "Can I use my own cable supplier prices?",
          answer:
            "Yes. You can add your own cable products as materials and update their prices manually whenever your supplier prices change.",
        },
        {
          question: "How does finish logic work for sockets and switches?",
          answer:
            "The pack automatically calculates the correct materials based on your finish selection (white vs brushed chrome). Prices adjust automatically, so you don't need to manually switch between different product SKUs.",
        },
        {
          question: "Does the pack handle difficult access uplifts?",
          answer:
            "Yes. Tasks like Consumer Unit installation and Testing & Certification include difficult access options that automatically adjust labour time (+1.5h for consumer units, +0.75h for testing).",
        },
        {
          question: "How are SWA cable runs priced?",
          answer:
            "SWA cable runs include automatic calculation of cable, glands, and clips based on cable size. Labour includes a +0.10h per linear metre uplift for SWA compared to Twin & Earth.",
        },
        {
          question: "Can I customize testing & certification labour?",
          answer:
            "Testing labour is automatically calculated based on certificate type (Minor Works vs EIC) and number of circuits (1-3, 4-6, 7-10 bands). You can include optional remedial allowances if needed.",
        },
        {
          question: "How does the pack handle downlight allowances?",
          answer:
            "LED downlights can be client supplied or included as an allowance. If you select allowance mode, you can set the allowance amount per downlight, and it will be included in the quote automatically.",
        },
        {
          question: "Can I create custom tasks for jobs not in the pack?",
          answer:
            "Yes. You can create completely custom tasks and assemblies for any job with your own materials and labour rates. Pack tasks are read-only templates, but any tasks you create yourself can be fully customized and modified to fit your specific needs.",
        },
        {
          question: "How accurate are the labour times?",
          answer:
            "Labour times are based on industry-standard installation times and adjust automatically for different options (e.g., SWA vs Twin & Earth, fire-rated downlights, difficult access). You can always override labour hours if needed for specific jobs.",
        },
        {
          question: "Does the pack include containment pricing?",
          answer:
            "Yes. Cable runs can include optional containment (trunking, PVC conduit, flex conduit, or steel conduit) with automatic material and labour calculations (+0.05h per linear metre for containment installation).",
        },
      ],
    },
    cta: {
      title: "Quote electrical work with clarity.",
      subtitle:
        "Keep your pricing sharp and your quotes professional with PriceM8.",
      primaryLabel: "Start free trial",
      primaryHref: "#waitlist",
    },
  },

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

  building: {
    id: "building",
    name: "General Building",
    icon: "BrickWall",
    path: "/trades/building",
    seo: {
      title: "Builder Estimating & Quoting Software | PriceM8",
      description:
        "Estimating and quoting software built for builders. Price extensions, renovations and general building work accurately.",
    },
    hero: {
      title: "Builder Estimating & Quoting Software for UK Builders",
      subtitle: "Quote extensions, renovations and repairs without the paperwork headache.",
      badge: "Domestic building focused",
    },
    showcase: {
      title: "See exactly where your building profit is.",
      description: "Break down structural steel, wall cavities, and excavations in one clear view.",
      image: "building-estimate.png",
    },
    pains: {
      title: "Builder quoting problems",
      items: [
        "Timber, plasterboard and insulation prices changing regularly",
        "Losing track of extras and variations on longer jobs",
        "High risk of missing small materials and fixings",
        "Spreadsheets getting complex as projects grow",
        "Difficult to track profit once variations are added",
      ],
    },
    howHelps: {
      title: "How PriceM8 helps builders",
      intro:
        "PriceM8 gives you a structured way to price building work, from small structural openings to full-scale house extensions.",
      bullets: [
        "Live timber, block and insulation prices updated weekly",
        "Whole-House Synergy: Combine 1st & 2nd Fix packs to price complete extensions",
        "Smart Waste Logic: Built-in soil bulking and skip optimization for dig-outs",
        "Profit Risk Scoring: Alerts you to low margins and day rates",
        "Adaptive Scheduler: Shifts only remaining work if a job overruns",
        "Professional quotes that protect your profit",
      ],
    },
    howFitsTogether: {
      title: "Estimating and Quoting That Works Together",
      intro:
        "PriceM8 gives builders full control from pricing to approval.",
      estimatingLink: "construction estimating software",
      quotingLink: "construction quoting software",
    },
    pack: {
      title: "What’s in the General Building Pack",
      intro:
        "Deep 1st and 2nd fix logic. Includes a full structural steel library and complex wall build-ups.",
      materials: [
        "Structural Steel: 20+ RSJ & UC beam sizes with weights",
        "Wall Logic: Thermalite, Facing Bricks, and Concrete Blocks",
        "Insulation: PIR (50mm/75mm/100mm) and Rockwool Slabs",
        "Carpentry: CLS & C24 timber + 1st/2nd fix ironmongery",
        "Boards: OSB (11/18mm) and multi-layer Plasterboard logic",
      ],
      labour: [
        "Handling: Manual beam lifting vs Genie Lift hire logic",
        "Strongboy vs Needle temporary support labour",
        "Trench foundation dig-out rates (m3)",
        "Internal vs External door install labour splits",
      ],
      tasks: [
        "Structural Openings (Load-bearing wall removal)",
        "Steel Support Systems (RSJ on padstones, Goal Posts)",
        "Cavity Wall construction (Block & Brick with PIR)",
        "Internal Timber Stud Walls with insulation choice",
        "Trench Foundations & Concrete Bases",
        "1st & 2nd Fix Carpentry (Doors, Skirting, Architrave)",
      ],
    },
    tasks: {
      title: "13 Ready-Made Tasks That Price Themselves",
      intro: "Every task in the General Building – 1st Fix Pack includes pre-calculated materials, labour, and structural logic. Just enter dimensions and PriceM8 handles the rest.",
      categories: [
        {
          name: "Structural Work",
          items: [
            {
              name: "Structural Opening – Load-Bearing Wall",
              description: "Priced for temporary works, demolition and padstones only. Steel beam supply and installation are excluded and must be added separately using the Steel Support System task.",
              highlight: true,
            },
            {
              name: "Steel Support System (RSJ / Goal Post / Picture Frame)",
              description: "Complete steel support system with 20+ RSJ and UC beam sizes with weights. Handles manual beam lifting vs Genie Lift hire logic, plus Strongboy vs Needle temporary support options. Labour calculated in person-hours, not elapsed time.",
              highlight: true,
            },
            {
              name: "Trench Foundation",
              description: "Trench foundations with configurable dimensions. Handles ready-mixed or on-site mixed concrete. Auto-calculates excavation time (digger vs manual) and waste with 20% bulking factor.",
            },
          ],
        },
        {
          name: "Walls & Partitions",
          items: [
            {
              name: "Cavity External Wall",
              description: "Complete cavity wall construction with inner leaf (Thermalite 100mm), outer leaf (concrete block or facing brick), optional insulation (PIR or Mineral Wool), wall ties, and DPC. Labour includes both leaves, wall ties and fitting insulation. Additional labour for facing brick.",
              highlight: true,
            },
            {
              name: "Solid External Walls",
              description: "Block or facing brick walls with configurable thickness (100mm or 215mm). Handles bulk bag or small bag sand options. Materials and labour calculated per 10m².",
            },
            {
              name: "Internal Timber Stud Wall – Insulated & Boarded Both Sides",
              description: "Complete stud wall system with optional insulation and boarding both sides. Includes frame, fixings, optional PIR insulation (50mm/75mm), Mineral Wool, and plasterboard boarding. Configurable board types (Standard, Moisture, Fire resistant, or OSB).",
            },
            {
              name: "Plasterboard to Masonry Wall (Dot & Dab)",
              description: "Plasterboard fixed to masonry wall using dot & dab method. Board type selectable (Standard, Moisture, or Fire resistant). Includes DriWall adhesive and all fixings.",
            },
          ],
        },
        {
          name: "Floors & Roofs",
          items: [
            {
              name: "Beam & Block Floor (Suspended)",
              description: "Suspended beam and block floor system. Calculates blocks, concrete beams (3m, 3.6m, 4.2m, 4.8m), DPM, and mortar. Labour calculated in person-hours based on floor area.",
            },
            {
              name: "Sand & Cement Screed (Bulk Bag Default + Optional PIR + Mesh)",
              description: "Sand and cement screed with configurable thickness (50/65/75/100mm), bulk bag or 25kg bag sand supply, optional A142 mesh reinforcement, and optional PIR insulation. Labour calculated in person-hours.",
            },
            {
              name: "Timber Deck Structure (Flat Roof / Suspended Floor)",
              description: "Structural deck for flat roof build-ups or suspended timber floors. Configurable joist size, spacing, deck type (OSB 11mm/18mm), insulation, VCL, and firrings. Base labour at 400mm centres, adjusted dynamically for spacing and options.",
            },
          ],
        },
        {
          name: "Finishes & Bases",
          items: [
            {
              name: "Concrete Base over MOT Type 1",
              description: "Full concrete slab with sub-base. Configurable thickness (75-150mm), grade (C20/C25/C30), and finish (brushed/tamped/powerfloat). Includes MOT Type 1 sub-base, sharp sand, cement, and optional geotextile.",
            },
            {
              name: "Colour Render",
              description: "Complete render system with base, mesh, primer, and finish. Choose thin coat or scrape coat finish. All materials and labour pre-calculated per m².",
            },
            {
              name: "Plasterboard Fixing (Walls / Ceilings)",
              description: "Plasterboard fixing to timber studs or joists. Configurable board types (Standard, Moisture, Fire resistant, or OSB). Includes screws, timber locks, and all fixings. Labour calculated per m².",
            },
          ],
        },
      ],
    },
    faq: {
      title: "Building FAQs",
      items: [
        {
          question: "Can I use PriceM8 for larger projects like extensions?",
          answer:
            "Yes. You can create multiple packs and quotes for different phases of an extension or larger project and keep everything structured.",
        },
        {
          question: "How does the structural steel library work?",
          answer:
            "The Steel Support System task includes 20+ RSJ and UC beam sizes with pre-calculated weights. Just select the beam size and the system automatically calculates materials, handling method (manual vs Genie Lift), and labour in person-hours. Temporary support options (Strongboy vs Needle) are also included.",
        },
        {
          question: "Can I customize wall build-ups?",
          answer:
            "Yes. Tasks like Cavity External Wall and Internal Timber Stud Wall let you choose from multiple options - block types, insulation (PIR or Mineral Wool), board types, and thicknesses. The system automatically includes the correct materials and quantities for your selections.",
        },
        {
          question: "How accurate are the material calculations?",
          answer:
            "All material quantities use real-world installation formulas. For example, cavity walls calculate 10 blocks per m² for both leaves, 3 wall ties per m², and insulation coverage based on pack sizes. Timber stud walls calculate 1.5 lengths of CLS per m² at 400mm centres. These proven formulas ensure accurate pricing.",
        },
        {
          question: "What about temporary works and demolition?",
          answer:
            "The Structural Opening task handles temporary works, demolition, and padstones. Steel beam supply and installation are separate (use Steel Support System task). This separation ensures accurate pricing for each phase of structural work.",
        },
        {
          question: "Does it handle different concrete grades and finishes?",
          answer:
            "Yes. The Concrete Base task lets you choose from C20, C25, or C30 concrete grades, and select finish type (brushed, tamped, or powerfloat). Each selection automatically adjusts material costs and labour requirements.",
        },
        {
          question: "How does labour calculation work for structural work?",
          answer:
            "Labour is calculated in person-hours, not elapsed time. This means if a task takes 8 person-hours, it could be 1 person for 8 hours, 2 people for 4 hours, or any combination. The system calculates total person-hours needed, giving you flexibility in scheduling.",
        },
        {
          question: "Can I combine 1st Fix and 2nd Fix packs?",
          answer:
            "Yes. The General Building – 1st Fix pack handles structural work, while the 2nd Fix pack covers finishes. You can use both in the same quote to price complete extensions from foundations to final finishes.",
        },
        {
          question: "What if I need to price a job not covered by the pack?",
          answer:
            "You can create completely custom tasks and assemblies for any job with your own materials and labour rates. Pack tasks are read-only templates, but any tasks you create yourself can be fully customized and modified to fit your specific needs.",
        },
        {
          question: "How does skip optimization work for excavations?",
          answer:
            "The Trench Foundation task automatically calculates waste volume (including 20% soil bulking), then compares costs for 6yd skips, 8yd skips, and grab lorries. It recommends the most economical option, but you can override if you prefer a different method.",
        },
        {
          question: "Can I use my own supplier prices for materials?",
          answer:
            "Yes. Core pack materials (timber, blocks, insulation) are updated weekly, but you can add your own materials and update their prices manually whenever your supplier prices change. This gives you full control over your pricing.",
        },
        {
          question: "How does the system handle insulation options?",
          answer:
            "Tasks like Cavity External Wall and Internal Timber Stud Wall let you choose between PIR insulation (50mm/75mm/100mm) or Mineral Wool slabs. The system automatically calculates the correct quantities based on pack coverage and includes waste factors. Labour for fitting insulation is included in the base labour rates.",
        },
        {
          question: "What about plasterboard types and applications?",
          answer:
            "Multiple tasks support different plasterboard types: Standard, Moisture resistant, and Fire resistant. You can also use OSB where appropriate. The system calculates quantities, fixings, and labour based on your selection. Dot & dab applications have separate labour rates from timber fixing.",
        },
      ],
    },
    cta: {
      title: "Price your next extension with confidence.",
      subtitle:
        "Use the All-In Pack to combine structural shells, internal fit-outs, plumbing, and electrics into one professional quote.",
      primaryLabel: "Start free trial",
      primaryHref: "#waitlist",
    },
  },

  building2ndFix: {
    id: "building2ndFix",
    name: "General Building – 2nd Fix",
    icon: "BrickWall",
    path: "/trades/building-2nd-fix",
    seo: {
      title: "2nd Fix Building Estimating Software | PriceM8",
      description:
        "Estimating and quoting software for 2nd fix work. Price joinery, decorating, and finishing work accurately.",
    },
    hero: {
      title: "2nd Fix Building Estimating & Quoting Software",
      subtitle: "Price joinery, decorating, and finishing work without the guesswork.",
      badge: "Finishing work focused",
    },
    showcase: {
      title: "See exactly where your finishing profit is.",
      description: "Break down joinery, decorating, and flooring in one clear view.",
      image: "building-estimate.png",
    },
    pains: {
      title: "2nd fix quoting problems",
      items: [
        "Timber and finishing material prices changing regularly",
        "Losing track of paint coats, prep levels, and protection",
        "High risk of missing small fixings and consumables",
        "Spreadsheets getting complex with multiple finish types",
        "Difficult to track profit across joinery, decorating, and flooring",
      ],
    },
    howHelps: {
      title: "How PriceM8 helps 2nd fix builders",
      intro:
        "PriceM8 gives you a structured way to price finishing work, from doors and skirting to complete decorating and flooring.",
      bullets: [
        "Live timber and finishing material prices updated weekly",
        "Complete 2nd Fix Pack: Doors, skirting, architrave, decorating, and flooring",
        "Smart Labour Logic: Auto-adjusts for prep levels, surface conditions, and finish types",
        "Professional quotes that protect your profit",
        "Unlimited quotes with saved clients and projects",
      ],
    },
    pack: {
      title: "What's in the General Building – 2nd Fix Pack",
      intro:
        "Complete finishing logic. Includes joinery, decorating, and flooring with smart labour calculations.",
      materials: [
        "Joinery: Internal doors, skirting, architrave with multiple finish options",
        "Decorating: Paint (walls, ceilings, woodwork), wallpaper with prep levels",
        "Flooring: Laminate, wood, tiles with underlay and finishing options",
        "Fixings: Screws, nails, caulk, filler, and all consumables",
        "Finishing: Latex floor levelling, tiling adhesive, grout",
      ],
      labour: [
        "Joinery: Door installation (standard vs hardwood), skirting/architrave per linear metre",
        "Decorating: Prep levels, surface conditions, coat counts, protection requirements",
        "Flooring: Installation method, removal, finishing (sanding, varnishing)",
        "Tiling: Tile size bands, layout patterns, grout inclusion",
      ],
      tasks: [
        "Internal Door Installation (standard vs hardwood)",
        "Skirting Boards & Architrave Installation",
        "Paint Walls & Ceilings (with prep levels)",
        "Paint Woodwork (skirting & architraves)",
        "Paint Doors & Frames",
        "Wallpapering (plain vs patterned)",
        "Tiling (walls & floors)",
        "Laminate & Wood Flooring",
        "Latex Floor Levelling",
      ],
    },
    tasks: {
      title: "11 Ready-Made Tasks That Price Themselves",
      intro: "Every task in the General Building – 2nd Fix Pack includes pre-calculated materials, labour, and finish logic. Just enter quantities and PriceM8 handles the rest.",
      categories: [
        {
          name: "Joinery",
          items: [
            {
              name: "Internal Door Installation",
              description: "Installation of an internal door including fitting, alignment, and testing. Optional architrave fitting can be included. Labour: 3.0 hours for standard doors, 4.0 hours for hardwood/premium doors.",
              highlight: true,
            },
            {
              name: "Skirting Boards Installation",
              description: "Supply and installation of skirting boards, including cutting, fixing, and finishing with caulk and filler where required. Labour: 0.12 hours per linear metre.",
            },
            {
              name: "Architrave Installation (Per Opening)",
              description: "Supply and installation of architraves around door openings, including cutting, fixing, and finishing with caulk/filler where required. Labour: 1.0 hours per opening.",
            },
          ],
        },
        {
          name: "Decorating",
          items: [
            {
              name: "Paint Walls & Ceilings",
              description: "Painting of walls and ceilings (if selected), including preparation level selected and application of the appropriate number of coats for new plaster or existing surfaces. Labour calculated dynamically based on painted area equivalent, preparation level, and protection requirements.",
              highlight: true,
            },
            {
              name: "Paint Woodwork (Skirting & Architraves)",
              description: "Painting of skirting boards and architraves, including preparation based on surface condition (bare wood or previously painted), undercoat application if required, and finish coats. Labour adjusts for surface condition, prep level, and undercoat requirements.",
            },
            {
              name: "Paint Doors & Frames",
              description: "Preparation and painting of doors and/or frames (as selected), including the chosen prep level and undercoat (if required), followed by gloss finish coats. Labour calculated based on number of doors, door size, paint scope, surface condition, and prep level.",
            },
            {
              name: "Wallpapering",
              description: "Wallpaper hanging to walls supplied by the client, including preparation level selected and use of professional adhesive. Optional removal of existing wallpaper and full floor protection can be included. Labour adjusts for wallpaper type (plain vs patterned), stripping, prep level, and protection.",
            },
          ],
        },
        {
          name: "Flooring",
          items: [
            {
              name: "Tiling (Walls & Floors)",
              description: "Tiling to walls and/or floors based on measured areas, including adhesive and (if selected) grout. Tiles can be client supplied or included as an allowance. Optional mitre cutting/45° edge work can be added. Labour calculated based on floor/wall area, tile size band, layout pattern, and grout inclusion.",
              highlight: true,
            },
            {
              name: "Laminate Flooring Installation",
              description: "Installation of laminate flooring based on measured area. Includes optional underlay, optional removal of existing flooring, and optional scotia/beading if required. Flooring can be client supplied or included as an allowance. Labour calculated dynamically based on floor area, underlay, removal, cuts, and scotia.",
            },
            {
              name: "Wood Flooring Installation (Engineered / Solid)",
              description: "Installation of engineered or solid wood flooring based on measured area, including the selected fixing method. Optional sanding and varnish finishing, removal of existing flooring, and scotia/beading can be included. Labour calculated dynamically based on floor area, wood type, fixing method, sanding, varnishing, removal, and scotia.",
            },
            {
              name: "Latex Floor Levelling (Self-Levelling)",
              description: "Self-levelling latex applied to prepare the floor for the chosen finish. Includes mixing and application to the selected thickness range. Primer can be included if required. Labour: 0.12 h/m² base + thickness add-on.",
            },
          ],
        },
      ],
    },
    faq: {
      title: "2nd Fix Building FAQs",
      items: [
        {
          question: "How does the pack handle different prep levels for decorating?",
          answer:
            "Each decorating task (paint walls, paint woodwork, paint doors) lets you select a preparation level. The system automatically adjusts labour time based on your selection - more prep means more labour time. This ensures you're pricing accurately for the actual work required.",
        },
        {
          question: "Can I customize paint and finish allowances?",
          answer:
            "Yes. While the pack includes standard paint and finish calculations, you can add your own materials and set custom allowances for specific jobs. This gives you full control over your pricing while still benefiting from the automated labour calculations.",
        },
        {
          question: "How does the system calculate tiling labour?",
          answer:
            "Tiling labour is calculated dynamically based on floor/wall area, tile size band (small, medium, large), layout pattern (straight vs diagonal), and whether grout is included. The system uses industry-standard rates that adjust automatically for complexity.",
        },
        {
          question: "What about different surface conditions for painting?",
          answer:
            "The pack automatically adjusts labour for different surface conditions. For example, bare wood requires more prep and may need undercoat, while previously painted surfaces need less prep. The system calculates the correct labour time based on your selection.",
        },
        {
          question: "Can I use my own supplier prices for materials?",
          answer:
            "Yes. Core pack materials (timber, paint, tiles) are updated weekly, but you can add your own materials and update their prices manually whenever your supplier prices change. This gives you full control over your pricing.",
        },
        {
          question: "How does flooring removal affect pricing?",
          answer:
            "When you select removal of existing flooring, the pack automatically adds removal labour and waste disposal costs. This ensures you're pricing accurately for the full scope of work, not just the new flooring installation.",
        },
        {
          question: "What's included in door installation?",
          answer:
            "Internal door installation includes fitting, alignment, and testing. Optional architrave fitting can be included if required. Labour adjusts automatically: 3.0 hours for standard doors, 4.0 hours for hardwood/premium doors.",
        },
        {
          question: "How does wallpaper type affect labour?",
          answer:
            "The pack distinguishes between plain and patterned wallpaper. Patterned wallpaper requires more time for matching and alignment, so labour is automatically adjusted. The system also accounts for whether existing wallpaper needs stripping and the preparation level required.",
        },
        {
          question: "Can I create custom tasks for jobs not in the pack?",
          answer:
            "Yes. You can create completely custom tasks and assemblies for any job with your own materials and labour rates. Pack tasks are read-only templates, but any tasks you create yourself can be fully customized and modified to fit your specific needs.",
        },
        {
          question: "How accurate are the labour times?",
          answer:
            "Labour times are based on industry-standard installation times and adjust automatically for different options (e.g., prep levels, surface conditions, finish types). You can always override labour hours if needed for specific jobs.",
        },
        {
          question: "Does the pack handle different fixing methods for wood flooring?",
          answer:
            "Yes. Wood flooring supports multiple fixing methods (glue, secret nail, floating). The system calculates materials and labour based on your selection, ensuring accurate pricing for each installation method.",
        },
        {
          question: "What about protection requirements for decorating?",
          answer:
            "The pack includes logic for protection requirements (floor protection, furniture protection, etc.). When you select protection options, labour time is automatically adjusted to account for the time needed to set up and remove protection.",
        },
      ],
    },
    cta: {
      title: "Price your next finishing job with confidence.",
      subtitle:
        "Use the 2nd Fix Pack to price joinery, decorating, and flooring work accurately and professionally.",
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
