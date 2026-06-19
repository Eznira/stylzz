import React, { useEffect } from 'react';
import { useLookbook } from '../context/LookbookContext';
import { CloudDownload, Globe, Loader2, RefreshCw, AlertCircle, Sparkles, Check } from 'lucide-react';

export const InspirationSection = () => {
  const {
    inspirationItems,
    isLoadingInspiration,
    inspirationError,
    fetchInspiration,
    importInspirationToLookbook,
    outfits,
  } = useLookbook();

  // Load items on mount if they haven't been fetched yet
  useEffect(() => {
    if (inspirationItems.length === 0) {
      fetchInspiration();
    }
  }, []);

  // Helper to check if an item with the same title is already imported
  const getIsAlreadyImported = (title) => {
    return outfits.some((o) => o.title.toLowerCase() === title.toLowerCase());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Editorial Header Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl text-white">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-amber-600/10 via-transparent to-transparent opacity-60 pointer-events-none rounded-full blur-2xl" />

        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-400 border border-white/5 text-[10px] font-bold tracking-widest uppercase font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>Fakestore REST API Live Integration</span>
          </div>

          <h2 className="font-sans font-black text-2xl sm:text-3xl tracking-tight leading-tight text-white">
            Pull Global Curation Feeds
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Synchronize external retail feeds with your custom digital locker closet. Select fashionable entries (jackets, coordinates, accessories) fetched from fake live servers and import them cleanly to your closet.
          </p>
        </div>

        {/* Sync Controls / Stats */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 relative z-10">
          <div className="text-left font-mono pr-2 border-r border-white/10">
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 block pb-0.5">Sync Status</span>
            <span className="text-xs font-bold text-emerald-400">● Live Connected</span>
          </div>
          
          <button
            id="force-sync-inspiration-btn"
            onClick={fetchInspiration}
            disabled={isLoadingInspiration}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/20 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingInspiration ? 'animate-spin' : ''}`} />
            <span>Refetch Global Feed</span>
          </button>
        </div>

      </div>

      {/* Grid of items */}
      <div>
        {isLoadingInspiration ? (
          /* Loading Skeletal Shivers */
          <div className="py-24 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
            <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
            <div className="text-center space-y-1">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Awaiting Live Feed</span>
              <p className="text-xs text-neutral-500">Contacting global Fakestore servers, filtering retail fashion lists...</p>
            </div>
          </div>
        ) : inspirationError ? (
          /* Error Banner */
          <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 max-w-xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-sans font-bold text-neutral-900">Synchronize Error</h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                StyleHub could not pull from the public endpoints due to: <strong className="font-mono text-rose-700">{inspirationError}</strong>
              </p>
            </div>
            <button
              id="retry-feed-sync-btn"
              onClick={fetchInspiration}
              className="px-5 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              Retry Live Sync
            </button>
          </div>
        ) : (
          /* Grid list content */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {inspirationItems.map((item) => {
              const isAlreadyImported = getIsAlreadyImported(item.title);
              const roundedPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(item.price);

              return (
                <div
                  id={`inspiration-item-card-${item.id}`}
                  key={item.id}
                  className="bg-white rounded-3xl border border-neutral-100 hover:border-neutral-200 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  
                  {/* Image Cover */}
                  <div className="relative aspect-square w-full bg-neutral-50 p-6 flex items-center justify-center border-b border-neutral-50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                    />

                    {/* Retail Price Display */}
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center px-2.5 py-1 bg-neutral-900 text-white text-[10px] font-mono font-bold rounded-lg shadow-xs">
                        {roundedPrice}
                      </span>
                    </div>

                    {/* Category Label */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-100 text-[9px] font-bold uppercase tracking-wider rounded-lg shadow-2xs">
                        {item.category === "men's clothing" ? 'Men\'s Wear' : item.category === "women's clothing" ? 'Women\'s Wear' : 'Accessorized'}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-sm text-neutral-900 line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="border-t border-neutral-50 pt-4 flex items-center justify-between gap-3">
                      
                      {/* Interactive import button and indicator */}
                      {isAlreadyImported ? (
                        <div className="w-full flex items-center justify-center gap-1 px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-xs font-bold leading-none select-none">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Imported into Closets</span>
                        </div>
                      ) : (
                        <button
                          id={`import-inspiration-btn-${item.id}`}
                          onClick={() => importInspirationToLookbook(item)}
                          className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 rounded-xl text-xs font-bold leading-none cursor-pointer transition-all duration-150"
                        >
                          <CloudDownload className="w-3.5 h-3.5" />
                          <span>Import to Lookbook</span>
                        </button>
                      )}

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
