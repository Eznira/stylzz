import React from 'react';
import { useLookbook } from '../context/LookbookContext';
import { useRouter } from '../hooks/useRouter';
import Link from './Link';
import { Heart, FolderPlus, FolderCheck, Calendar, Tag, Compass, ArrowLeft, Star, Shirt } from 'lucide-react';

export const OutfitDetail = ({ outfitId }) => {
  const { outfits, toggleFavorite, toggleCollection, favorites, collection } = useLookbook();
  const router = useRouter();

  // Find the exact outfit from global context
  const outfit = outfits.find((o) => o.id === outfitId);

  const isFavorited = outfit ? favorites.includes(outfit.id) : false;
  const isInCollection = outfit ? collection.includes(outfit.id) : false;

  const handleBack = () => {
    // If we have a back history, use it. Otherwise, go home.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  if (!outfit) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
          <Shirt className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-sans font-bold text-2xl text-neutral-950">Look Customization Missing</h2>
          <p className="text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
            The style design catalog item with ID <strong className="font-mono text-neutral-800">#{outfitId}</strong> is either not registered or has been removed from your local profile databases.
          </p>
        </div>
        <button
          id="not-found-back-home-btn"
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 cursor-pointer shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Looks</span>
        </button>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(outfit.price / 100);

  // Filter recommendations based on matching category or season, excluding the active outfit
  const recommendations = outfits
    .filter((o) => o.id !== outfit.id && (o.category === outfit.category || o.season === outfit.season))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Editorial Breadcrumbs & Back Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
        <button
          id="detail-back-navigation-btn"
          onClick={handleBack}
          className="inline-flex items-center gap-2 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Looks History</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link id="nav-home-breadcrumb" href="/" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <span className="text-neutral-500">Outfit Detail</span>
          <span>/</span>
          <span className="text-neutral-800 font-bold">#{outfit.id}</span>
        </div>
      </div>

      {/* Main Catalog Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left Hand: High-Contrast Portrayed Image View */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-100 shadow-md">
          <img
            src={outfit.image}
            alt={outfit.title}
            referrerPolicy="no-referrer"
            className="w-full object-cover max-h-[640px]"
          />

          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-6 flex flex-wrap gap-2 text-[10px] font-bold tracking-widest text-[#FFF] uppercase font-mono">
            <span>Style Category: {outfit.category}</span>
            <span className="text-amber-400">•</span>
            <span>Season: {outfit.season}</span>
          </div>
        </div>

        {/* Right Hand: Detailed Curations */}
        <div className="space-y-8">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-[10px] font-bold tracking-wider uppercase font-mono border border-amber-200/40">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Verified Style Spec</span>
            </div>

            <h1 className="font-sans font-black text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-tight">
              {outfit.title}
            </h1>
            
            <div className="text-2xl font-mono font-bold text-amber-700">
              {formattedPrice}
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-6" />

          {/* Description & Narrative */}
          <div className="space-y-2.5">
            <h3 className="font-sans font-bold text-sm text-neutral-800">Overview Narrative</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              {outfit.description}
            </p>
          </div>

          {/* Composition Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Fabric Composition</span>
              <p className="text-xs font-semibold text-neutral-800">{outfit.fabric || "Premium Blended Textiles"}</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Digital Catalog Tag</span>
              <p className="text-xs font-semibold text-neutral-800">#{outfit.id} / {outfit.category}</p>
            </div>

          </div>

          {/* Style Advice */}
          {outfit.styleAdvice && (
            <div className="p-5 bg-amber-50/40 rounded-2xl border border-amber-100/40 space-y-2.5">
              <h4 className="font-sans font-bold text-xs text-amber-950 flex items-center gap-1.5 uppercase tracking-wide font-mono">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>Style Advice & Curation</span>
              </h4>
              <p className="text-xs text-neutral-700 leading-relaxed font-light">
                {outfit.styleAdvice}
              </p>
            </div>
          )}

          {/* Action Interactive Bar */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            
            <button
              id={`detail-fav-action-btn-${outfit.id}`}
              onClick={() => toggleFavorite(outfit.id)}
              className={`flex-1 py-3.5 px-6 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                isFavorited
                  ? 'bg-rose-600 text-white hover:bg-rose-700'
                  : 'bg-neutral-50 border border-neutral-150 text-neutral-700 hover:bg-neutral-100 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              <span>{isFavorited ? 'Favourited' : 'Bookmark Look'}</span>
            </button>

            <button
              id={`detail-col-action-btn-${outfit.id}`}
              onClick={() => toggleCollection(outfit.id)}
              className={`flex-1 py-3.5 px-6 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                isInCollection
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-neutral-50 border border-neutral-150 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {isInCollection ? (
                <>
                  <FolderCheck className="w-4 h-4" />
                  <span>On My Wardrobe Rack</span>
                </>
              ) : (
                <>
                  <FolderPlus className="w-4 h-4" />
                  <span>Add to Wardrobe Collection</span>
                </>
              )}
            </button>

          </div>

          {/* Keyword tags */}
          <div className="pt-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 block mb-2">Metadata Search Tags</span>
            <div className="flex flex-wrap gap-1.5">
              {outfit.keywords.map((word) => (
                <span key={word} className="px-2.5 py-1 bg-neutral-100 text-neutral-600 font-mono text-[10px] rounded-lg">
                  #{word}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Suggested Matches Sections */}
      {recommendations.length > 0 && (
        <div className="border-t border-neutral-100 pt-12 space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-sans font-black text-xl text-neutral-900 tracking-tight">Suggestional Layering Coordinate Matches</h3>
            <p className="text-xs text-neutral-500">Other fashionable items registered in our lookbook database with matching profiles</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => {
              const recPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(rec.price / 100);
              return (
                <Link
                  id={`rec-link-card-${rec.id}`}
                  key={rec.id}
                  href={`/outfit/${rec.id}`}
                  className="group flex gap-4 p-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-100 rounded-2xl cursor-pointer transition-all duration-200"
                >
                  <img
                    src={rec.image}
                    alt={rec.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover rounded-xl bg-neutral-100 flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 group-hover:text-amber-700 line-clamp-1 transition-colors">{rec.title}</h4>
                      <p className="text-[10px] text-neutral-400 mt-0.5 uppercase tracking-widest font-mono">{rec.category} • {rec.season}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-600">{recPrice}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
