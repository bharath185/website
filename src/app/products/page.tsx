"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const categories = [...new Set(products.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary-dark to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            High-precision industrial components manufactured to exacting standards
            for diverse industrial applications.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "All"
                ? "bg-accent text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-accent hover:text-accent"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                activeCategory === cat
                  ? "bg-accent text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
