import Image from "next/image";
import SearchBar from "./SearchBar";

interface AdBannerProps {
  imageUrl: string;
  alt: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

/**
 * Full-width advertisement banner with a centered, controlled search bar
 * overlay. The search value/handler are passed through from the parent
 * (AisleView), which owns the filtering logic.
 */
export default function AdBanner({
  imageUrl,
  alt,
  searchValue,
  onSearchChange,
}: AdBannerProps) {
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
        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>
    </div>
  );
}