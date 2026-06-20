import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

/**
 * Single product card. Purely props-driven, no data fetching or business
 * logic — just renders what it's given.
 */
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
      <div className="relative h-32 w-full sm:h-40">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="self-end text-xs font-medium text-gray-500">
          {product.unit}
        </span>

        <h3 className="text-center text-sm font-semibold leading-snug text-gray-900">
          {product.name}
        </h3>

        <p className="mt-auto text-center text-lg font-bold text-emerald-700">
          ₹{product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
