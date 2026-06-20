import type { Product } from "@/types/product";
import { meatProducts } from "@/mock/meat";
import { bakeryProducts } from "@/mock/bakery";

/**
 * DATA-FETCHING ABSTRACTION LAYER
 * ---------------------------------------------------------------------------
 * This file is intentionally the ONLY place in the app that knows where
 * product data comes from. Every page/component calls `getProducts(category)`
 * and never imports the mock arrays directly.
 *
 * Today: it returns static in-memory mock arrays.
 *
 * Tomorrow (live DB): swap the body of `getProducts` to query Supabase, e.g.
 *
 *   const { data, error } = await supabase
 *     .from("products")
 *     .select("*")
 *     .eq("category", category);
 *
 * Because prices update hourly in production, this function should NOT be
 * cached indefinitely once wired to Supabase — use a short revalidate window
 * (e.g. `{ next: { revalidate: 3600 } }` if fetched via REST, or simply rely
 * on Supabase's own freshness since it's queried directly) so the in-aisle
 * display reflects current pricing without requiring a redeploy.
 *
 * The function signature and return type (Promise<Product[]>) are designed
 * to stay stable across that swap, so nothing in /app or /components needs
 * to change.
 */

// Internal lookup table mapping a category slug to its mock dataset.
// When moving to a real DB, this map disappears entirely — the category
// param is simply passed as a query filter instead.
const mockCatalog: Record<string, Product[]> = {
  meat: meatProducts,
  bakery: bakeryProducts,
};

/**
 * Returns the list of products for a given category slug.
 * Returns an empty array for unknown/invalid categories rather than
 * throwing, so callers can render a clean "not found" state.
 */
export async function getProducts(category: string): Promise<Product[]> {
  // Simulates network latency of a real DB call. Remove once using Supabase,
  // since the real query will have its own natural latency.
  // (Kept at 0 for now — left here only as a marker of where an `await`
  // to a real client would live.)
  const products = mockCatalog[category];
  return products ?? [];
}

/**
 * Returns true if the given category slug is a recognized aisle category.
 * Used by the page to distinguish "valid category with no stock" (future
 * possibility) from "category doesn't exist at all" (404-style state).
 */
export function isValidCategory(category: string): boolean {
  return category in mockCatalog;
}
