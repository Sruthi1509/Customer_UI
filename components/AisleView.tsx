"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import AdBanner from "./AdBanner";
import ProductGrid from "./ProductGrid";

interface AisleViewProps {
    products: Product[];
    bannerImageUrl: string;
    bannerAlt: string;
}

/**
 * Client component that owns the search input's state and filters the
 * already-fetched product list by name as the customer types. Kept
 * separate from the server component (page.tsx) since interactivity
 * (useState, onChange) requires a client component, while data fetching
 * stays server-side.
 */
export default function AisleView({
    products,
    bannerImageUrl,
    bannerAlt,
}: AisleViewProps) {
    const [query, setQuery] = useState("");

    const filteredProducts = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return products;
        return products.filter((product) =>
            product.name.toLowerCase().includes(normalized)
        );
    }, [products, query]);

    return (
        <>
            <AdBanner
                imageUrl={bannerImageUrl}
                alt={bannerAlt}
                searchValue={query}
                onSearchChange={setQuery}
            />

            {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
            ) : (
                <p className="px-4 py-10 text-center text-sm text-gray-500">
                    No products match &quot;{query}&quot;.
                </p>
            )}
        </>
    );
}