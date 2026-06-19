import React from 'react';
import { useLookbook } from '../context/LookbookContext';
import { OutfitCard } from './OutfitCard';
import { FilterSection } from './FilterSection';
import Link from './Link';
import { Sparkles, Heart, FolderHeart, Info, Eraser, ArrowLeft, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const OutfitsList = ({ mode }) => {
  const { outfits, favorites, collection, filters, resetFilters, setIsAddModalOpen } = useLookbook();

  // 1. Filter layout elements matching view state
  const modeFilteredOutfits = React.useMemo(() => {
    switch (mode) {
      case 'favorites':
        return outfits.filter((o) => favorites.includes(o.id));
      case 'collection':
        return outfits.filter((o) => collection.includes(o.id));
      case 'home':
      default:
        return outfits;
    }
  }, [mode, outfits, favorites, collection]);

  // 2. Apply category filters, season filters, and search query matches
  const finalFilteredOutfits = React.useMemo(() => {
    return modeFilteredOutfits.filter((item) => {
      if (filters.category && item.category !== filters.category) {
        return false;
      }
      if (filters.season && item.season !== filters.season) {
        return false;
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query) || false;
        const matchesKeywords = item.keywords.some((k) => k.toLowerCase().includes(query));
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesFabric = item.fabric?.toLowerCase().includes(query) || false;
        
        if (!matchesTitle && !matchesDesc && !matchesKeywords && !matchesCategory && !matchesFabric) {
          return false;
        }
      }
      return true;
    });
  }, [modeFilteredOutfits, filters]);

  const headerContent = {
    home: {
      title: "Discover Your Next Signature Look",
      subtitle: "Explore StyleHub's custom-selected seasonal outfits. Layer tailored garments, comfortable street elements, and premium fabrics.",
      icon: Sparkles,
      accent: "text-amber-600 bg-amber-50"
    },
    favorites: {
      title: "Your Private Wardrobe Favorites",
      subtitle: "Review the styling looks you've hearted. Curated elements saved together for quick coordination across the seasons.",
      icon: Heart,
      accent: "text-rose-600 bg-rose-50"
    },
    collection: {
      title: "Personal Capsule Outfit Rack",
      subtitle: "Your active closet wardrobe planner. Add and coordinate outfits to construct versatile looks for formal meetings or weekend lounging.",
      icon: FolderHeart,
      accent: "text-indigo-600 bg-indigo-50"
    }
  };

  const currentHeader = headerContent[mode] || headerContent.home;
  const HeaderIcon = currentHeader.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Editorial Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full ">
          <span className={`w-12 h-12 rounded-full flex items-center justify-center ${currentHeader.accent}`}>
            <HeaderIcon className="w-4 h-4 stroke-[2.5]" />
          </span>
      
        </div>
        
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-tight">
          {currentHeader.title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 font-medium leading-relaxed">
          {currentHeader.subtitle}
        </p>
      </div>

      {/* Filter Section */}
      <FilterSection />

      {/* Stats bar */}
      <div className="flex items-center justify-between px-2 text-xs font-mono text-neutral-400">
        <span>Showing {finalFilteredOutfits.length} out of {modeFilteredOutfits.length} look{modeFilteredOutfits.length === 1 ? '' : 's'}</span>
        {mode !== 'home' && (
          <Link
            id="back-home-list-btn"
            href="/"
            className="flex items-center gap-1 hover:text-neutral-900 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Looks</span>
          </Link>
        )}
      </div>

      {/* Outfits Grid with animations */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {finalFilteredOutfits.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            >
              {finalFilteredOutfits.map((outfit) => (
                <OutfitCard key={outfit.id} outfit={outfit} />
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-neutral-50 rounded-3xl border border-dashed border-neutral-200 py-16 px-4 text-center max-w-xl mx-auto space-y-5"
            >
              <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <Info className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-sans font-bold text-lg text-neutral-800">
                  {outfits.length === 0
                    ? "Welcome to StyleHub!"
                    : modeFilteredOutfits.length === 0
                    ? `No looks added to ${mode} yet`
                    : "No matching outfit matches"}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto">
                  {outfits.length === 0
                    ? "Let's kick things off by fetching fashionable looks from the global feed or uploading your own!"
                    : modeFilteredOutfits.length === 0 && mode === 'favorites'
                    ? "Heart lookbook tiles anywhere in the app, and they will assemble nicely right here."
                    : modeFilteredOutfits.length === 0 && mode === 'collection'
                    ? "Add coordinations to your capsule wardrobe collection rack to organize custom garments."
                    : "Adjust your active search query, pick another season filter, or clear inputs to reset the view."}
                </p>
              </div>

              <div className="flex justify-center gap-3">
                {modeFilteredOutfits.length === 0 && (mode === 'collection' || mode === 'favorites') ? (
                  <Link
                    id={mode === 'collection' ? "add-to-closet-empty-btn" : "add-to-favs-empty-btn"}
                    href="/"
                    className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 cursor-pointer shadow-xs transition-colors"
                  >
                    Browse Looks
                  </Link>
                ) : (
                  <button
                    id="clear-filters-empty-btn"
                    onClick={resetFilters}
                    className="px-5 py-2.5 bg-neutral-800 text-white rounded-xl text-xs font-bold hover:bg-neutral-700 cursor-pointer shadow-xs transition-all flex items-center gap-1.5 mx-auto"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span>Clear Search Filters</span>
                  </button>
                )}
                
                {mode === 'home' && (
                  <button
                    id="add-look-empty-btn"
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-5 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 cursor-pointer shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Custom Look</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
