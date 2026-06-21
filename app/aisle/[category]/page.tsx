import { getProducts, isValidCategory } from "@/lib/data";
import AisleView from "@/components/AisleView";

interface AislePageProps {
  params: Promise<{ category: string }>;
} 
const bannerConfig: Record<string, { imageUrl: string; alt: string }> = {
  meat: {
    imageUrl:
      "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=1200&q=80",
    alt: "Fresh meat aisle advertisement banner",
  },
  bakery: {
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
    alt: "Fresh bakery aisle advertisement banner",
  },
};

export default async function AislePage({ params }: AislePageProps) {
  const { category } = await params;

  if (!isValidCategory(category)) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Category not found
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          We couldn&apos;t find an aisle for &quot;{category}&quot;.
        </p>
      </main>
    );
  }

  const products = await getProducts(category);
  const banner = bannerConfig[category];

  return (
    <main className="min-h-screen bg-gray-50">
      <AisleView
        products={products}
        bannerImageUrl={banner.imageUrl}
        bannerAlt={banner.alt}
      />
    </main>
  );
}