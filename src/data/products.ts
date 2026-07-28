import { Product, GalleryImage } from "@/types"

export const products: Product[] = [
  {
    id: "straightening-rollers",
    name: "Straightening Machine Rollers",
    slug: "straightening-machine-rollers",
    category: "Rollers",
    shortDescription: "High-precision straightening rollers for bar, pipe, tube, and sheet metal industries.",
    description: "We manufacture high-quality straightening machine rollers engineered for precision straightening of bars, pipes, tubes, rods, and sheets. Crafted from superior grade alloy steel and heat-treated for maximum wear resistance, our rollers deliver consistent performance and extended service life. Available in various profiles including concave, convex, and flat configurations to suit您的 specific application requirements.",
    specifications: [
      "Material: Alloy Steel / D2 / H13 / EN series",
      "Hardness: 52-62 HRC as per application",
      "Surface Finish: 0.8 Ra or better",
      "Diameter Range: 20 mm to 500 mm",
      "Length Range: 100 mm to 3000 mm",
      "Custom profiles available",
      "Heat treatment: Through-hardened / Induction hardened"
    ],
    image: "/images/straightening-rollers.jpg",
    features: [
      "Superior wear resistance",
      "Precision ground surface finish",
      "Custom profiles per drawing",
      "Extended service life",
      "Consistent straightening quality"
    ]
  },
  {
    id: "reeling-rollers",
    name: "Reeling Rollers",
    slug: "reeling-rollers",
    category: "Rollers",
    shortDescription: "Premium reeling rollers for tube and pipe finishing applications.",
    description: "Our reeling rollers are designed for superior surface finishing and dimensional accuracy in tube and pipe manufacturing. Made from high-grade materials with precision machining, these rollers ensure optimal surface quality and consistent roundness in the reeling process.",
    specifications: [
      "Material: Alloy Steel / Carbide coated options",
      "Hardness: 58-65 HRC",
      "Surface Finish: 0.4 Ra",
      "Custom designs per application",
      "Optimized groove profiles"
    ],
    image: "/images/reeling-rollers.jpg",
    features: [
      "Excellent surface finish quality",
      "High dimensional accuracy",
      "Long operational life",
      "Custom groove profiles",
      "Reduced downtime"
    ]
  },
  {
    id: "drive-rings",
    name: "Drive Rings",
    slug: "drive-rings",
    category: "Rollers",
    shortDescription: "Robust drive rings for rotary tube and pipe straightening machines.",
    description: "We supply heavy-duty drive rings designed for rotary straightening machines in tube and pipe industries. Manufactured from wear-resistant materials with precision machining, our drive rings provide reliable power transmission and consistent performance in demanding production environments.",
    specifications: [
      "Material: Alloy Steel / Forged Steel",
      "Hardness: 50-58 HRC",
      "Precision machined bores",
      "Custom sizes available",
      "Balanced for high-speed operation"
    ],
    image: "/images/drive-rings.jpg",
    features: [
      "High strength and durability",
      "Precision fitment",
      "Balanced rotation",
      "Wear-resistant surface",
      "Custom manufacturing"
    ]
  },
  {
    id: "cylindrical-rollers",
    name: "Cylindrical Roller Bearings",
    slug: "cylindrical-roller-bearings",
    category: "Bearings",
    shortDescription: "High-capacity cylindrical roller bearings for heavy radial loads.",
    description: "We offer a comprehensive range of cylindrical roller bearings designed for high radial load capacity and moderate thrust loads in both directions. Ideal for machine tool spindles, electric motors, and industrial gearboxes.",
    specifications: [
      "Type: NU, NJ, NUP, N series",
      "Cage: Brass / Steel / Polyamide",
      "Precision: P0, P6, P5, P4",
      "Size range: 20 mm bore to 500 mm bore",
      "Clearance: C2, CN, C3, C4"
    ],
    image: "/images/cylindrical-rollers.jpg",
    features: [
      "High radial load capacity",
      "Low friction",
      "High speed capability",
      "Interchangeable design",
      "Long service life"
    ]
  },
  {
    id: "ball-bearings",
    name: "Deep Groove Ball Bearings",
    slug: "deep-groove-ball-bearings",
    category: "Bearings",
    shortDescription: "Versatile deep groove ball bearings for high-speed and low-noise applications.",
    description: "Our deep groove ball bearings are the most versatile type of rolling bearings, suitable for high-speed operation while accommodating radial and axial loads in both directions. Available in various sizes, seals, and precision grades.",
    specifications: [
      "Type: Single row / Double row",
      "Seals: Open / ZZ / 2RS / Teflon",
      "Precision: P0, P6, P5, P4",
      "Size range: 3 mm bore to 400 mm bore",
      "Cages: Steel / Brass / Polyamide"
    ],
    image: "/images/ball-bearings.jpg",
    features: [
      "Versatile load handling",
      "High-speed capability",
      "Low noise operation",
      "Wide size range",
      "Multiple seal options"
    ]
  },
  {
    id: "spherical-roller-bearings",
    name: "Spherical Roller Bearings",
    slug: "spherical-roller-bearings",
    category: "Bearings",
    shortDescription: "Self-aligning spherical roller bearings for heavy loads and misalignment compensation.",
    description: "Spherical roller bearings offer the highest load capacity among roller bearings with self-aligning capability. Ideal for heavy industrial applications like mining, cement, paper mills, and heavy machinery where shaft deflection or misalignment is present.",
    specifications: [
      "Type: 20000 CC, CA, E series",
      "Bore: 25 mm to 1000 mm",
      "Precision: P0, P6, P5",
      "Cage: Brass / Steel / Polyamide",
      "Clearance: CN, C3, C4"
    ],
    image: "/images/spherical-roller-bearings.jpg",
    features: [
      "Highest load capacity",
      "Self-aligning feature",
      "Excellent shock load resistance",
      "Long maintenance-free life",
      "Suitable for harsh environments"
    ]
  },
  {
    id: "grinding-spindles",
    name: "Grinding Spindles",
    slug: "grinding-spindles",
    category: "Spindles",
    shortDescription: "High-precision grinding spindles for surface, cylindrical, and internal grinding applications.",
    description: "We manufacture and supply precision grinding spindles designed for surface grinders, cylindrical grinders, and internal grinding machines. Built with high-precision bearings and dynamically balanced for vibration-free operation at high speeds.",
    specifications: [
      "Speed: Up to 60000 RPM",
      "Bearing Type: Angular Contact / Roller",
      "Lubrication: Grease / Oil Mist",
      "Cooling: Air / Liquid",
      "Runout: < 2 microns",
      "Power: Custom as required"
    ],
    image: "/images/grinding-spindles.jpg",
    features: [
      "Sub-micron precision",
      "High-speed capability",
      "Vibration-free operation",
      "Custom mounting configurations",
      "Long bearing life"
    ]
  },
  {
    id: "milling-spindles",
    name: "Milling Spindles",
    slug: "milling-spindles",
    category: "Spindles",
    shortDescription: "Robust milling spindles for heavy-duty machining operations.",
    description: "Our milling spindles are engineered for heavy-duty machining centers and milling machines. Designed for high torque and rigidity, these spindles ensure accurate material removal in demanding manufacturing environments.",
    specifications: [
      "Speed: Up to 15000 RPM",
      "Taper: BT / ISO / CAT / HSK",
      "Drive: Belt / Direct / Geared",
      "Cooling: Air / Liquid",
      "Runout: < 5 microns"
    ],
    image: "/images/milling-spindles.jpg",
    features: [
      "High torque output",
      "Rigid construction",
      "Multiple taper options",
      "Smooth operation",
      "Customizable drive systems"
    ]
  },
  {
    id: "cnc-lathe-spindles",
    name: "CNC Lathe Spindles",
    slug: "cnc-lathe-spindles",
    category: "Spindles",
    shortDescription: "Precision CNC lathe spindles for turning and boring applications.",
    description: "High-precision CNC lathe spindles designed for accurate turning, facing, and boring operations. Built with precision bearings and robust housing for chatter-free machining at various speed ranges.",
    specifications: [
      "Speed: Up to 8000 RPM",
      "Bore: Custom sizes",
      "Mounting: Flange / Foot mount",
      "Runout: < 3 microns",
      "Lubrication: Grease / Oil"
    ],
    image: "/images/cnc-lathe-spindles.jpg",
    features: [
      "High precision turning",
      "Chatter-free operation",
      "Compact design",
      "Easy installation",
      "Low maintenance"
    ]
  },
  {
    id: "industrial-machinery-spares",
    name: "Industrial Machinery Spares",
    slug: "industrial-machinery-spares",
    category: "Machinery",
    shortDescription: "Comprehensive range of industrial machinery spares and replacement parts.",
    description: "We supply a wide range of industrial machinery spares including gears, shafts, bushes, sleeves, couplings, and other custom-engineered components for various industrial machines. Each component is manufactured to precise specifications.",
    specifications: [
      "Material: Mild Steel / Alloy Steel / Stainless Steel / CI",
      "Process: Turning / Milling / Grinding / Gear cutting",
      "Heat Treatment: As required",
      "Custom designs accepted",
      "Reverse engineering available"
    ],
    image: "/images/machinery-spares.jpg",
    features: [
      "Custom manufacturing",
      "Reverse engineering",
      "Quality materials",
      "Competitive pricing",
      "Quick turnaround"
    ]
  },
  {
    id: "rubber-rollers",
    name: "Rubber & Polyurethane Rollers",
    slug: "rubber-polyurethane-rollers",
    category: "Rollers",
    shortDescription: "High-quality rubber and polyurethane rollers for diverse industrial applications.",
    description: "We manufacture rubber and polyurethane rollers for a variety of industrial applications including printing, packaging, textile, steel, and material handling. Our rollers are made with precision-ground cores and high-quality elastomers for optimal performance.",
    specifications: [
      "Core Material: MS / SS / CI / Aluminum",
      "Coating: Natural Rubber / Neoprene / Silicon / PU",
      "Hardness: 20 to 90 Shore A",
      "Diameter: Up to 600 mm",
      "Length: Up to 4000 mm",
      "Surface Finish: As required"
    ],
    image: "/images/rubber-rollers.jpg",
    features: [
      "Multiple elastomer options",
      "Precision ground surface",
      "Chemical resistant options",
      "High temperature variants",
      "Rebonding and regrinding service"
    ]
  },
  {
    id: "machine-tool-accessories",
    name: "Machine Tool Accessories",
    slug: "machine-tool-accessories",
    category: "Accessories",
    shortDescription: "Complete range of machine tool accessories and tooling solutions.",
    description: "We offer a complete range of machine tool accessories including chucks, collets, tool holders, arbors, adapters, boring heads, and milling tooling. All accessories are sourced from reputed manufacturers and quality checked before delivery.",
    specifications: [
      "Types: Chucks / Collets / Tool Holders / Arbors",
      "Standards: DIN / ISO / BT / CAT / HSK",
      "Material: Alloy Steel / Carbide",
      "Precision: Standard to Ultra-precision",
      "Custom tooling solutions available"
    ],
    image: "/images/accessories.jpg",
    features: [
      "Complete range available",
      "Industry standard compatibility",
      "Quality assured",
      "Competitive pricing",
      "Custom tooling solutions"
    ]
  },
  {
    id: "roller-reconditioning",
    name: "Roller Reconditioning & Regrinding",
    slug: "roller-reconditioning-regrinding",
    category: "Services",
    shortDescription: "Professional roller reconditioning, regrinding, and refurbishment services.",
    description: "We provide comprehensive roller reconditioning and regrinding services to extend the life of your existing rollers. Our services include regrinding to original specifications, hard chrome plating, metal spray coating, and rubber/polyurethane re-bonding.",
    specifications: [
      "Regrinding: Up to 4000 mm length",
      "Coating: Hard Chrome / Metal Spray / Ceramic",
      "Rubber Re-bonding: All elastomers",
      "Dynamic Balancing available",
      "Inspection & measurement reports"
    ],
    image: "/images/reconditioning.jpg",
    features: [
      "Cost-effective alternative to new",
      "Restores original specs",
      "Extends roller life significantly",
      "Quick turnaround time",
      "Comprehensive quality report"
    ]
  },
  {
    id: "bearing-repair",
    name: "Bearing Repair & Refurbishment",
    slug: "bearing-repair-refurbishment",
    category: "Services",
    shortDescription: "Professional bearing repair and refurbishment services for industrial bearings.",
    description: "Our bearing repair service offers a cost-effective alternative to replacement. We inspect, re-grind, replace rolling elements, and re-assemble bearings to restore them to like-new condition, often at 40-60% cost savings.",
    specifications: [
      "Bearing Types: All standard types",
      "Size Range: 50 mm to 1000 mm OD",
      "Process: Inspection / Re-grinding / Re-assembly",
      "Testing: Run-out / Vibration / Noise",
      "Warranty: 6-12 months on repaired bearings"
    ],
    image: "/images/bearing-repair.jpg",
    features: [
      "40-60% cost savings",
      "Faster turnaround than new",
      "Same performance standards",
      "Extended equipment life",
      "Environmentally sustainable"
    ]
  }
]

export const categories = [
  { id: "rollers", name: "Rollers", count: 4 },
  { id: "bearings", name: "Bearings", count: 3 },
  { id: "spindles", name: "Spindles", count: 3 },
  { id: "machinery", name: "Machinery & Spares", count: 1 },
  { id: "accessories", name: "Accessories", count: 1 },
  { id: "services", name: "Services", count: 2 }
]

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/workshop-1.jpg", alt: "Manufacturing Workshop", caption: "Our Manufacturing Facility" },
  { src: "/images/gallery/workshop-2.jpg", alt: "Machining Operations", caption: "Precision Machining" },
  { src: "/images/gallery/grinding.jpg", alt: "Grinding Operations", caption: "Roller Grinding" },
  { src: "/images/gallery/quality.jpg", alt: "Quality Inspection", caption: "Quality Control" },
  { src: "/images/gallery/products.jpg", alt: "Finished Products", caption: "Finished Rollers" },
  { src: "/images/gallery/team.jpg", alt: "Our Team", caption: "Our Engineering Team" }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 6)
}
