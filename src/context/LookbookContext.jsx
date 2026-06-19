'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_OUTFITS } from '../data/outfits';

const LookbookContext = createContext(undefined);

export const LookbookProvider = ({ children }) => {
  const [outfits, setOutfits] = useState(INITIAL_OUTFITS);
  const [favorites, setFavorites] = useState([]);
  const [collection, setCollection] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const [filters, setFiltersState] = useState({
    search: '',
    category: '',
    season: '',
  });

  // Inspiration items fetched from Fakestore API
  const [inspirationItems, setInspirationItems] = useState([]);
  const [isLoadingInspiration, setIsLoadingInspiration] = useState(false);
  const [inspirationError, setInspirationError] = useState(null);

  // Load initial states from localStorage on client mount only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedOutfits = localStorage.getItem('stylehub_outfits');
      const savedFavorites = localStorage.getItem('stylehub_favorites');
      const savedCollection = localStorage.getItem('stylehub_collection');

      if (savedOutfits) {
        try {
          setOutfits(JSON.parse(savedOutfits));
        } catch (e) {
          console.error('Error parsing saved outfits:', e);
        }
      }
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (e) {
          console.error('Error parsing saved favorites:', e);
        }
      }
      if (savedCollection) {
        try {
          setCollection(JSON.parse(savedCollection));
        } catch (e) {
          console.error('Error parsing saved collection:', e);
        }
      }
      setIsHydrated(true);
    }
  }, []);

  // Sync with localStorage only after hydration completed
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('stylehub_outfits', JSON.stringify(outfits));
    }
  }, [outfits, isHydrated]);

  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('stylehub_favorites', JSON.stringify(favorites));
    }
  }, [favorites, isHydrated]);

  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('stylehub_collection', JSON.stringify(collection));
    }
  }, [collection, isHydrated]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const toggleCollection = (id) => {
    setCollection((prev) =>
      prev.includes(id) ? prev.filter((colId) => colId !== id) : [...prev, id]
    );
  };

  const setFilters = (newFilters) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFiltersState({
      search: '',
      category: '',
      season: '',
    });
  };

  const addCustomOutfit = (newOutfitData) => {
    const newId = outfits.length > 0 ? Math.max(...outfits.map((o) => o.id)) + 1 : 1;
    const outfit = {
      ...newOutfitData,
      id: newId,
    };
    setOutfits((prev) => [outfit, ...prev]);
  };

  const deleteCustomOutfit = (id) => {
    setOutfits((prev) => prev.filter((o) => o.id !== id));
    // Also remove from favorites or collection
    setFavorites((prev) => prev.filter((favId) => favId !== id));
    setCollection((prev) => prev.filter((colId) => colId !== id));
  };

  // Fetching inspirational items from Fakestore API (Week 4)
  const fetchInspiration = async () => {
    setIsLoadingInspiration(true);
    setInspirationError(null);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Could not fetch items from Fakestore API');
      }
      const data = await response.json();
      
      // Filter for fashion (men's clothing, women's clothing, jewelery)
      const fashionItems = data.filter((item) =>
        item.category.includes('clothing') || item.category === 'jewelery'
      );
      setInspirationItems(fashionItems);
    } catch (err) {
      setInspirationError(err.message || 'An error occurred while fetching inspiration.');
    } finally {
      setIsLoadingInspiration(false);
    }
  };

  const importInspirationToLookbook = (item) => {
    const mappedCategory = item.category === "men's clothing" ? "Men's Wear" 
                         : item.category === "women's clothing" ? "Women's Wear"
                         : "Accessorized";
    
    const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
    
    const words = item.title.toLowerCase().split(' ').slice(0, 5);

    addCustomOutfit({
      title: item.title,
      category: mappedCategory,
      season: randomSeason,
      description: item.description,
      image: item.image,
      price: Math.round(item.price * 100), // convert to cents
      keywords: [...words, mappedCategory.toLowerCase(), randomSeason.toLowerCase()],
      fabric: "Premium Blend Fabric",
      styleAdvice: "This stunning item fetched from Fakestore is perfect for styling modern layered trends."
    });
  };

  // Modal state for adding looks
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <LookbookContext.Provider
      value={{
        outfits,
        favorites,
        collection,
        filters,
        toggleFavorite,
        toggleCollection,
        setFilters,
        resetFilters,
        addCustomOutfit,
        deleteCustomOutfit,
        inspirationItems,
        isLoadingInspiration,
        inspirationError,
        fetchInspiration,
        importInspirationToLookbook,
        isAddModalOpen,
        setIsAddModalOpen,
      }}
    >
      {children}
    </LookbookContext.Provider>
  );
};

export const useLookbook = () => {
  const context = useContext(LookbookContext);
  if (context === undefined) {
    throw new Error('useLookbook must be used within a LookbookProvider');
  }
  return context;
};
