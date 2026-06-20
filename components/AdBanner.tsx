import Image from "next/image";
import SearchBar from "./SearchBar";

interface AdBannerProps {
  imageUrl: string;
  alt: string;
}

/**
 * Full-width advertisement banner with a centered search bar overlay.
 */
export default function AdBanner({ imageUrl, alt }: AdBannerProps) {
  return (
    <div className="relative h-48 w-full sm:h-64">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 px-4">
        <SearchBar />
      </div>
    </div>
  );
}
