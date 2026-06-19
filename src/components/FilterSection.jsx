import React from 'react';
import { useLookbook } from '../context/LookbookContext';
import { Search, X } from 'lucide-react';

export const FilterSection = () => {
  const { outfits, filters, setFilters, resetFilters } = useLookbook();

  // Dynamically extract unique categories from current outfits list
  const categories = React.useMemo(() => {
    const list = new Set();
    outfits.forEach((o) => {
      if (o.category) list.add(o.category);
    });
    return Array.from(list);
  }, [outfits]);

  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter', 'All-Season'];

  const isFiltered = filters.search || filters.category || filters.season;

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 space-y-6 shadow-xs max-w-7xl mx-auto my-6">
      
      {/* Search Input Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-neutral-400">
              <Search className="w-5 h-5 stroke-[2]" />
            </span>
            <input
              id="search-input"
              type="text"
              placeholder="Search by outfit title, tags, fabrics, or keyword..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="w-full pl-11 pr-10 py-3.5 bg-neutral-50/50 hover:bg-neutral-50 rounded-2xl border border-neutral-150 text-neutral-800 placeholder-neutral-400 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 focus:bg-white transition-all duration-200"
            />
            {filters.search && (
              <button
                id="clear-search-btn"
                onClick={() => setFilters({ search: '' })}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4 bg-neutral-200 hover:bg-neutral-300 rounded-full p-0.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action button status */}
        {isFiltered && (
          <button
            id="reset-filters-btn"
            onClick={resetFilters}
            className="flex items-center justify-center gap-1.5 px-4 py-3 border border-dashed border-amber-600 text-amber-700 text-xs font-bold rounded-xl hover:bg-amber-50 cursor-pointer transition-all duration-150"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      <div className="border-t border-neutral-100 my-4" />

      {/* Grid of Season & Category Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Season filtration */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-neutral-400 uppercase font-mono">
            <span>Filter by Season</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              id="season-filter-all"
              onClick={() => setFilters({ season: '' })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 ${
                filters.season === ''
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              All Seasons
            </button>
            {seasons.map((season) => (
              <button
                id={`season-filter-${season.toLowerCase()}`}
                key={season}
                onClick={() => setFilters({ season })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 ${
                  filters.season === season
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>

        {/* Category filtration */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-neutral-400 uppercase font-mono">
            <span>Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              id="category-filter-all"
              onClick={() => setFilters({ category: '' })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 ${
                filters.category === ''
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                id={`category-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                key={category}
                onClick={() => setFilters({ category })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 ${
                  filters.category === category
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
