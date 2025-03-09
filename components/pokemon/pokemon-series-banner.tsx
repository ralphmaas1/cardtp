import Image from "next/image"

interface PokemonSeriesBannerProps {
  seriesId: string
  name: string
  bannerImage: string
}

export function PokemonSeriesBanner({ seriesId, name, bannerImage }: PokemonSeriesBannerProps) {
  return (
    <div className="relative w-full mb-6 rounded-lg overflow-hidden">
      {/* Container with correct aspect ratio (3000:686 ≈ 4.37:1) */}
      <div className="relative w-full" style={{ paddingTop: "22.87%" }}>
        <Image
          src={bannerImage || `/placeholder.svg?height=686&width=3000`}
          alt={`${name} Series Banner`}
          fill
          className="object-cover"
          priority
        />

        {/* Optional overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 p-4 md:p-6">
          <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">{name}</h3>
        </div>
      </div>
    </div>
  )
}

