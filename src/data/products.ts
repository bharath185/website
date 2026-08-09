import { Product, GalleryImage } from "@/types"

// Product images from bmtbharat.com (WithFloats CDN)
const IMG = {
  straighteningRollers: "https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg",
  reelingRollers: "https://productimages.withfloats.com/tile/66b1c5539464b8011ada885c.jpg",
  driveRing: "https://productimages.withfloats.com/tile/66b1c2c54f7781d15f4e71dc.jpg",
  hydroSpindles: "https://bizimages.withfloats.com/tile/6a6c3b333547fd8e003991a2.jpg",
  rotaryTables: "https://bizimages.withfloats.com/tile/6a699dcbba701899e1dda222.jpg",
  planetaryGearbox: "https://bizimages.withfloats.com/tile/6a6708682a70fd3f18329c55.jpg",
  gallery1: "https://fpimages.withfloats.com/actual/689b2aaf4e1a717b10cdac53.jpg",
  gallery2: "https://fpimages.withfloats.com/actual/689b2a7f68536c1523251664.jpg",
  gallery3: "https://fpimages.withfloats.com/actual/689b2a7ca0534d0427d7b062.jpg",
  gallery4: "https://fpimages.withfloats.com/actual/689b2a7ae41135d55e7beaf0.jpg",
}

export const products: Product[] = [
  {
    id: "straightening-machine-rollers",
    name: "Straightening Machine Rollers",
    slug: "straightening-machine-rollers",
    category: "Machinery",
    price: 45000,
    shortDescription: "High-quality straightening machine rollers engineered for precision and durability.",
    description: "Bharat Machine Tools is a top manufacturer of high-quality straightening machine rollers in Bangalore. Known for precision and durability, our rollers are engineered to deliver optimal performance and longevity. With cutting-edge technology and a skilled team, we produce straightening machine rollers that meet the rigorous demands of various industries. Trust Bharat Machine Tools for reliable and efficient solutions in straightening machine rollers. Choose us for superior craftsmanship and innovation in Bangalore.",
    specifications: [
      "Precision engineered for optimal performance",
      "Superior wear resistance and durability",
      "Custom sizes and profiles per application",
      "Manufactured with cutting-edge technology",
    ],
    image: IMG.straighteningRollers,
    features: [
      "Precision and durability",
      "Optimal performance and longevity",
      "Meets rigorous industry demands",
      "Superior craftsmanship",
    ],
  },
  {
    id: "reeling-rollers",
    name: "Reeling Rollers",
    slug: "reeling-rollers",
    category: "Machinery",
    price: 38000,
    shortDescription: "Durable and efficient reeling rollers built to the highest industry standards.",
    description: "Bharat Machine Tools is a trusted name in the manufacturing of high-quality reeling rollers in Bangalore. Our expertise in precision engineering and commitment to quality ensure that every reeling roller we produce is durable and efficient. With state-of-the-art manufacturing facilities and a team of experienced professionals, we deliver reeling rollers that meet the highest industry standards. For reliable performance and exceptional craftsmanship, choose Bharat Machine Tools, your premier reeling rollers manufacturer in Bangalore. Experience manufacturing excellence with us.",
    specifications: [
      "Precision engineering",
      "State-of-the-art manufacturing",
      "Durable and efficient construction",
      "Meets highest industry standards",
    ],
    image: IMG.reelingRollers,
    features: [
      "Durable and efficient",
      "Reliable performance",
      "Exceptional craftsmanship",
      "Highest industry standards",
    ],
  },
  {
    id: "drive-ring",
    name: "Drive Ring",
    slug: "drive-ring",
    category: "Accessories",
    price: 12500,
    shortDescription: "Durable and reliable drive rings that excel in performance for industrial machinery.",
    description: "Bharat Machine Tools stands at the forefront of drive ring manufacturing in Bangalore. Our commitment to precision engineering and quality craftsmanship ensures that every drive ring we produce meets the highest industry standards. With advanced manufacturing facilities and a team of skilled professionals, we deliver durable and reliable drive rings that excel in performance. Whether for industrial machinery or specialized applications, Bharat Machine Tools is your trusted partner for superior drive rings. Experience excellence in manufacturing with Bharat Machine Tools in Bangalore.",
    specifications: [
      "Precision engineering",
      "Quality craftsmanship",
      "Durable and reliable",
      "Suits industrial machinery & specialized applications",
    ],
    image: IMG.driveRing,
    features: [
      "Highest industry standards",
      "Durable and reliable",
      "Excels in performance",
      "Advanced manufacturing facilities",
    ],
  },
  {
    id: "ball-screws",
    name: "Ball Screws",
    slug: "ball-screws",
    category: "Accessories",
    price: 18500,
    shortDescription: "Precision ball screws for accurate linear motion in machine tools.",
    description: "We supply high-precision ball screws for CNC machines and machine tools, engineered for smooth, accurate linear motion with minimal backlash. Available in various leads, diameters, and accuracy grades to suit new builds as well as retrofit and reconditioning projects.",
    specifications: [
      "Various leads and diameters",
      "Multiple accuracy grades",
      "Suitable for CNC retrofits",
      "Low backlash, high efficiency",
    ],
    image: IMG.gallery1,
    features: [
      "Smooth linear motion",
      "Minimal backlash",
      "Retrofit friendly",
      "High positioning accuracy",
    ],
  },
  {
    id: "flow-forming-machine-mandrels",
    name: "Flow Forming Machine Mandrels",
    slug: "flow-forming-machine-mandrels",
    category: "Machinery",
    price: 65000,
    shortDescription: "Precision mandrels for extrusion and flow forming machines.",
    description: "We manufacture precision mandrels and SPM machine tools for extrusion and flow forming machines. Built from high-grade materials and precision ground, our mandrels deliver concentricity and surface finish required for demanding flow forming applications.",
    specifications: [
      "SPM machine tools for extrusion & flow forming",
      "High-grade alloy construction",
      "Precision ground finish",
      "Custom designs per machine",
    ],
    image: IMG.gallery2,
    features: [
      "High concentricity",
      "Excellent surface finish",
      "Custom engineered",
      "Long service life",
    ],
  },
  {
    id: "planetary-gear-box",
    name: "Planetary Gear Box",
    slug: "planetary-gear-box",
    category: "Machinery",
    price: 85000,
    shortDescription: "Compact planetary gear boxes for high torque and space efficiency.",
    description: "Our planetary gear boxes deliver high torque density in a compact footprint. The coaxial arrangement of planet gears distributes load evenly, improving torque capacity and space efficiency for industrial machinery, conveyors, and process equipment.",
    specifications: [
      "High torque density",
      "Compact coaxial design",
      "Multiple ratios available",
      "Hardened & ground gears",
    ],
    image: IMG.planetaryGearbox,
    features: [
      "Improved torque capacity",
      "Space efficient",
      "Even load distribution",
      "Low maintenance",
    ],
  },
  {
    id: "locknuts",
    name: "LOCKNUTS",
    slug: "locknuts",
    category: "Accessories",
    price: 4500,
    shortDescription: "Precision locknuts for secure bearing and spindle assembly.",
    description: "We supply precision locknuts for securing bearings, spindles, and rotating assemblies. Manufactured to tight tolerances with fine threads, our locknuts ensure secure axial positioning and reliable clamping in high-speed and high-load applications.",
    specifications: [
      "Fine precision threads",
      "Various sizes available",
      "Secure axial clamping",
      "Suits bearings & spindles",
    ],
    image: IMG.gallery3,
    features: [
      "Tight tolerances",
      "Reliable clamping",
      "High-speed capable",
      "Corrosion resistant options",
    ],
  },
  {
    id: "hydro-static-spindles",
    name: "Hydro Static Spindles",
    slug: "hydro-static-spindles",
    category: "Spindles",
    price: 120000,
    shortDescription: "Hydrostatic spindles for ultra-precision, high-accuracy machining.",
    description: "Hydro static spindles use a pressurized oil film to support the rotating shaft, eliminating metal-to-metal contact. This delivers exceptional rotational accuracy, vibration damping, and surface finish — ideal for high-accuracy machining, grinding, and precision turning applications.",
    specifications: [
      "Non-contact oil film bearing",
      "Exceptional rotational accuracy",
      "Superior vibration damping",
      "Ideal for grinding & precision turning",
    ],
    image: IMG.hydroSpindles,
    features: [
      "Ultra-high precision",
      "Excellent surface finish",
      "Long bearing life",
      "Smooth, wear-free operation",
    ],
  },
  {
    id: "rotary-tables",
    name: "Rotary Tables",
    slug: "rotary-tables",
    category: "Machinery",
    price: 95000,
    shortDescription: "Precision rotary tables for multi-axis machining operations.",
    description: "Rotary tables are essential for multi-axis precision machining, enabling accurate indexing and continuous rotation of the workpiece. We supply robust, high-precision rotary tables that add 4th and 5th axis capability to machining centers for complex part geometries.",
    specifications: [
      "4th / 5th axis capability",
      "High indexing accuracy",
      "Rigid construction",
      "Worm gear & direct drive options",
    ],
    image: IMG.rotaryTables,
    features: [
      "Multi-axis machining",
      "Accurate indexing",
      "Complex part capability",
      "Heavy load capacity",
    ],
  },
  {
    id: "yrt-cross-roller-bearings",
    name: "YRT & Cross Roller Bearings",
    slug: "yrt-cross-roller-bearings",
    category: "Bearings",
    price: 28000,
    shortDescription: "YRT bearings and large cross roller bearings for rotary tables and precision axes.",
    description: "We supply YRT bearings and large cross roller bearings for rotary tables, indexing heads, and precision rotary axes. These bearings combine radial, axial, and moment load capacity in a single compact unit with exceptional running accuracy.",
    specifications: [
      "Combined radial/axial/moment capacity",
      "High running accuracy",
      "Large sizes available",
      "Suits rotary tables & indexing heads",
    ],
    image: IMG.gallery4,
    features: [
      "Compact single-unit design",
      "Exceptional accuracy",
      "High stiffness",
      "Precision rotary applications",
    ],
  },
  {
    id: "duplex-worm-shafts-worm-wheels",
    name: "Duplex Worm Shafts & Worm Wheels",
    slug: "duplex-worm-shafts-worm-wheels",
    category: "Accessories",
    price: 24000,
    shortDescription: "Duplex worm shafts and worm wheels for backlash-adjustable gear drives.",
    description: "We manufacture duplex worm shafts and worm wheels that allow precise backlash adjustment through axial movement of the worm. Ideal for rotary tables, indexing mechanisms, and precision gear drives where minimal backlash is critical.",
    specifications: [
      "Adjustable backlash design",
      "Precision ground worm threads",
      "Custom ratios",
      "Suits rotary & indexing mechanisms",
    ],
    image: IMG.gallery1,
    features: [
      "Minimal backlash",
      "Precise adjustment",
      "Custom engineering",
      "Durable construction",
    ],
  },
  {
    id: "spm-machine-tools",
    name: "SPM Machine Tools",
    slug: "spm-machine-tools",
    category: "Machinery",
    price: 150000,
    shortDescription: "Special purpose machine tools for extrusion and flow forming applications.",
    description: "We design and build SPM (Special Purpose Machine) tools for extrusion and flow forming machines, along with the necessary rotational gears, actuators, and outriggers. Every SPM solution is engineered to your process for maximum productivity and reliability.",
    specifications: [
      "Custom SPM design & build",
      "Rotational gears, actuators & outriggers",
      "Extrusion & flow forming tooling",
      "Retrofitting & reconditioning",
    ],
    image: "/images/gallery/spm-front.jpg",
    images: [
      "/images/gallery/spm-front.jpg",
      "/images/gallery/spm-front-face.jpg",
      "/images/gallery/spm-top.jpg",
      "/images/gallery/spm-side.jpg",
      "/images/gallery/spm-rear.jpg",
    ],
    features: [
      "Process-specific engineering",
      "Complete tooling packages",
      "Retrofit expertise",
      "Reliable productivity",
    ],
  },
]

export const categories = [
  { id: "machinery", name: "Machinery", count: 5 },
  { id: "bearings", name: "Bearings", count: 1 },
  { id: "spindles", name: "Spindles", count: 1 },
  { id: "accessories", name: "Accessories", count: 5 },
]

// Real gallery images from bmtbharat.com
export const galleryImages: GalleryImage[] = [
  { src: IMG.gallery1, alt: "Bharat Machine Tools facility", caption: "Our Facility" },
  { src: IMG.gallery2, alt: "Machine tools and equipment", caption: "Machine Tools" },
  { src: IMG.gallery3, alt: "Precision manufacturing", caption: "Precision Manufacturing" },
  { src: IMG.gallery4, alt: "Industrial machinery", caption: "Industrial Machinery" },
]

// Real updates/blog posts from bmtbharat.com
export const updates = [
  {
    title: "How Hydro Static Spindles Improve Precision in High-Accuracy Machining",
    date: "2026-07-31",
    image: IMG.hydroSpindles,
    slug: "how-hydro-static-spindles-improve-precision-in-high-accuracy-machining",
  },
  {
    title: "Why Rotary Tables Are Essential for Multi-Axis Precision Machining",
    date: "2026-07-29",
    image: IMG.rotaryTables,
    slug: "why-rotary-tables-are-essential-for-multi-axis-precision-machining",
  },
  {
    title: "How a Planetary Gear Box Improves Torque and Space Efficiency",
    date: "2026-07-27",
    image: IMG.planetaryGearbox,
    slug: "how-a-planetary-gear-box-improves-torque-and-space-efficiency",
  },
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
