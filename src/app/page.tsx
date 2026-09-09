import React from "react"
import IntroVideo from "@/components/v2/IntroVideo"
import V2Hero from "@/components/v2/V2Hero"
import V2About from "@/components/v2/V2About"
import V2MDProfile from "@/components/v2/V2MDProfile"
import V2ServicesShowcase from "@/components/v2/V2ServicesShowcase"
import V2Industries from "@/components/v2/V2Industries"
import V2WhyChooseUs from "@/components/v2/V2WhyChooseUs"
import V2NewProductShowcase from "@/components/v2/V2NewProductShowcase"
import V2Updates from "@/components/v2/V2Updates"
import { getPgClient } from "@/lib/pg-products"

export default async function Home() {
  let mdInfo = null
  try {
    const client = await getPgClient()
    try {
      const res = await client.query('SELECT * FROM "MDInfo" WHERE id = $1 LIMIT 1;', ['md-info'])
      if (res.rows.length > 0) {
        mdInfo = res.rows[0]
      }
    } finally {
      await client.end().catch(() => {})
    }
  } catch (err) {
    // Graceful fallback
  }

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.bmtbharat.com/#website",
        "url": "https://www.bmtbharat.com",
        "name": "BMT - Bharat Machine Tools",
        "alternateName": ["BMT", "BMT Bangalore", "BMT Bharat", "BMT Machine Tools", "Bharat Machine Tools"],
        "description": "BMT (Bharat Machine Tools) - High-Precision Machine Tool Components, Motorized Spindles, Precision Locknuts, and CNC Reconditioning in Bangalore, India.",
        "publisher": {
          "@id": "https://www.bmtbharat.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.bmtbharat.com/products?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://www.bmtbharat.com/#featured-products",
        "name": "Bharat Machine Tools Featured Precision Products",
        "description": "High-precision CNC machine spindles, locknuts, rotary tables, and machine tool accessories.",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Product",
              "@id": "https://www.bmtbharat.com/products/hydro-static-and-hydro-dynamic-spindles#product",
              "name": "Motorized Spindles",
              "description": "High-speed and precise. Made in India. Hydrostatic & motorized spindles for precision CNC machines.",
              "image": "https://productimages.withfloats.com/tile/649be81099d65e0001897660.jpg",
              "url": "https://www.bmtbharat.com/products/hydro-static-and-hydro-dynamic-spindles",
              "brand": {
                "@type": "Brand",
                "name": "Bharat Machine Tools"
              },
              "offers": {
                "@type": "Offer",
                "price": "25000",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "url": "https://www.bmtbharat.com/products/hydro-static-and-hydro-dynamic-spindles"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "120",
                "bestRating": "5",
                "worstRating": "1"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Product",
              "@id": "https://www.bmtbharat.com/products/precision-locknuts-ysk-ysf-ysr-standard-customized#product",
              "name": "Precision Locknuts",
              "description": "Secure locking for bearings. YSK, YSF, and YSR series precision locknuts engineered for minimum runout.",
              "image": "https://productimages.withfloats.com/tile/649eb199db66ae0001a80cef.jpg",
              "url": "https://www.bmtbharat.com/products/precision-locknuts-ysk-ysf-ysr-standard-customized",
              "brand": {
                "@type": "Brand",
                "name": "Bharat Machine Tools"
              },
              "offers": {
                "@type": "Offer",
                "price": "1500",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "url": "https://www.bmtbharat.com/products/precision-locknuts-ysk-ysf-ysr-standard-customized"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "65",
                "bestRating": "5",
                "worstRating": "1"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "Product",
              "@id": "https://www.bmtbharat.com/products/rotary-tables-and-tail-stocks#product",
              "name": "Rotary Tables",
              "description": "Accurate positioning for machining. High rigidity NC rotary tables and tailstocks for precision 4th and 5th axis work.",
              "image": "https://productimages.withfloats.com/tile/649bf791a942e10001afa81f.png",
              "url": "https://www.bmtbharat.com/products/rotary-tables-and-tail-stocks",
              "brand": {
                "@type": "Brand",
                "name": "Bharat Machine Tools"
              },
              "offers": {
                "@type": "Offer",
                "price": "45000",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "url": "https://www.bmtbharat.com/products/rotary-tables-and-tail-stocks"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "reviewCount": "80",
                "bestRating": "5",
                "worstRating": "1"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "Product",
              "@id": "https://www.bmtbharat.com/products/flow-forming-machine-mandrels#product",
              "name": "Ball Screws & Mandrels",
              "description": "High-durability precision ball screws and flow forming machine mandrels engineered for heavy load capacity.",
              "image": "https://productimages.withfloats.com/tile/66b1b2fcc9001ec1a2fb1a96.jpg",
              "url": "https://www.bmtbharat.com/products/flow-forming-machine-mandrels",
              "brand": {
                "@type": "Brand",
                "name": "Bharat Machine Tools"
              },
              "offers": {
                "@type": "Offer",
                "price": "18000",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "url": "https://www.bmtbharat.com/products/flow-forming-machine-mandrels"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "95",
                "bestRating": "5",
                "worstRating": "1"
              }
            }
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://www.bmtbharat.com/#site-sitelinks-cards",
        "name": "Bharat Machine Tools Quick Navigation Cards",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Ball Screws",
            "url": "https://www.bmtbharat.com/products/flow-forming-machine-mandrels",
            "image": "https://productimages.withfloats.com/tile/66b1b2fcc9001ec1a2fb1a96.jpg"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Linear Guides & Planetary Gearboxes",
            "url": "https://www.bmtbharat.com/products/gear-box-planetary-gear-box",
            "image": "https://productimages.withfloats.com/tile/649ea2739fc86000016c926c.jpg"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Custom Solutions & Reconditioning",
            "url": "https://www.bmtbharat.com/services/servicing-and-reconditioning",
            "image": "https://www.bmtbharat.com/images/images/image-4.png"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "About Us",
            "url": "https://www.bmtbharat.com/company-profile",
            "image": "https://www.bmtbharat.com/logo.png"
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />

      {/* Immersive cinematic intro preloader */}
      <IntroVideo />
      
      {/* High-end sections */}
      <V2Hero />
      <V2About />
      <V2MDProfile initialData={mdInfo} />
      
      {/* Specialized Services & Capabilities showcase */}
      <V2ServicesShowcase />

      {/* Dynamic precision industries and inspection dashboard */}
      <V2Industries />

      {/* Animated Why We Are Customer's Choice section */}
      <V2WhyChooseUs />
      
      {/* Interactive new product showcase */}
      <V2NewProductShowcase />
      
      {/* Scraped updates feed */}
      <V2Updates />
    </>
  )
}
