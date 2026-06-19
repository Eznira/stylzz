import React from 'react';
import { useLookbook } from '../context/LookbookContext';
import { useRouter } from '../hooks/useRouter';
import Link from './Link';
import { Heart, FolderPlus, FolderCheck, ArrowUpRight, Trash2, Tag, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const OutfitCard = ({ outfit }) => {
  const { toggleFavorite, toggleCollection, favorites, collection, deleteCustomOutfit } = useLookbook();
  const router = useRouter();

  const isFavorited = favorites.includes(outfit.id);
  const isInCollection = collection.includes(outfit.id);

  // Custom outfits have id > 8
  const isCustomOutfit = outfit.id > 8;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(outfit.price / 100);

  return (
    <motion.div
      layout
      id={`outfit-card-${outfit.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative bg-white overflow-hidden border border-neutral-100 hover:border-neutral-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      
      {/* Image Container / Interactive Cover */}
      <div className="relative aspect-4/5 w-full bg-neutral-100 overflow-hidden">
        <Link href={`/outfit/${outfit.id}`} className="block w-full h-full">
          <img
            src={outfit.image}
            alt={outfit.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </Link>

        {/* Categories Overlays */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/95 backdrop-blur-xs text-neutral-900 text-[10px] font-bold tracking-wider uppercase rounded-full shadow-xs">
            <Tag className="w-3 h-3 text-amber-600" />
            {outfit.category}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-900/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-xs">
            <Calendar className="w-3 h-3 text-amber-500" />
            {outfit.season}
          </span>
        </div>

        {/* Favorite Button Overlay */}
        <button
          id={`favorite-btn-${outfit.id}`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleFavorite(outfit.id);
          }}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xs shadow-xs transition-all duration-200 cursor-pointer active:scale-90 ${
            isFavorited
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-neutral-600 hover:bg-white hover:text-rose-500'
          }`}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-4.5 h-4.5 ${isFavorited ? 'fill-current stroke-[2.5]' : 'stroke-[2.5]'}`} />
        </button>

        {/* Hover Action Overlay Bottom */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-neutral-950/80 via-neutral-950/30 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
          
          <button
            id={`collection-btn-overlay-${outfit.id}`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleCollection(outfit.id);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
              isInCollection
                ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
                : 'bg-white text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            {isInCollection ? (
              <>
                <FolderCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>In Collection</span>
              </>
            ) : (
              <>
                <FolderPlus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add Collection</span>
              </>
            )}
          </button>

          <Link
            id={`detail-btn-overlay-${outfit.id}`}
            href={`/outfit/${outfit.id}`}
            className="w-9 h-9 bg-white/90 hover:bg-white hover:text-amber-800 text-neutral-800 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-150"
            title="View Look Details"
          >
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

        </div>
      </div>

      {/* Info Bottom Card */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link
            id={`view-detail-title-btn-${outfit.id}`}
            href={`/outfit/${outfit.id}`}
            className="font-sans font-bold text-base text-neutral-900 hover:text-amber-700 transition-colors text-left line-clamp-1 block focus:outline-hidden cursor-pointer"
          >
            {outfit.title}
          </Link>
          <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
            {outfit.description}
          </p>
        </div>

        {/* Price Tag & Wardrobe Action Grid */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-50">
          <span className="font-mono text-sm font-bold text-amber-700">
            {formattedPrice}
          </span>
          
          <div className="flex items-center gap-1.5">
            {/* Quick Wardrobe Action Button */}
            <button
              id={`collection-btn-quick-${outfit.id}`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleCollection(outfit.id);
              }}
              className={`md:hidden px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                isInCollection
                  ? 'bg-amber-500/20 text-amber-800 border border-amber-500/10'
                  : 'bg-neutral-50 text-neutral-600 border border-neutral-100 hover:bg-neutral-100'
              }`}
            >
              {isInCollection ? 'In Collection' : '+ Wardrobe'}
            </button>

            {/* Custom outfit delete button */}
            {isCustomOutfit && (
              <button
                id={`delete-outfit-btn-${outfit.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (confirm("Are you sure you want to delete this custom look? This cannot be undone.")) {
                    deleteCustomOutfit(outfit.id);
                  }
                }}
                className="w-8 h-8 rounded-lg mb-0.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer transition-colors"
                title="Delete Look"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
