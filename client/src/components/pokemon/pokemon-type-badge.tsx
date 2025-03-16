type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy"

const typeColors: Record<PokemonType, { bg: string; text: string }> = {
  normal: { bg: "bg-neutral-200", text: "text-neutral-700" },
  fire: { bg: "bg-red-500", text: "text-white" },
  water: { bg: "bg-blue-500", text: "text-white" },
  electric: { bg: "bg-yellow-400", text: "text-yellow-900" },
  grass: { bg: "bg-green-500", text: "text-white" },
  ice: { bg: "bg-cyan-300", text: "text-cyan-900" },
  fighting: { bg: "bg-orange-600", text: "text-white" },
  poison: { bg: "bg-purple-500", text: "text-white" },
  ground: { bg: "bg-amber-600", text: "text-white" },
  flying: { bg: "bg-indigo-400", text: "text-white" },
  psychic: { bg: "bg-pink-500", text: "text-white" },
  bug: { bg: "bg-lime-500", text: "text-white" },
  rock: { bg: "bg-stone-500", text: "text-white" },
  ghost: { bg: "bg-violet-600", text: "text-white" },
  dragon: { bg: "bg-indigo-600", text: "text-white" },
  dark: { bg: "bg-neutral-800", text: "text-white" },
  steel: { bg: "bg-slate-400", text: "text-white" },
  fairy: { bg: "bg-pink-300", text: "text-pink-900" },
}

interface PokemonTypeBadgeProps {
  type: string
  size?: "sm" | "md" | "lg"
}

export function PokemonTypeBadge({ type, size = "md" }: PokemonTypeBadgeProps) {
  const typeKey = type.toLowerCase() as PokemonType
  const colors = typeColors[typeKey] || { bg: "bg-neutral-200", text: "text-neutral-700" }
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-4 py-1.5 text-sm",
    lg: "px-6 py-2 text-base"
  }

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium capitalize
        ${colors.bg} ${colors.text}
        ${sizeClasses[size]}
        transition-transform hover:scale-105
      `}
    >
      {type}
    </span>
  )
} 
