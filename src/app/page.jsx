'use client';

import React from 'react';
import { useLookbook } from '../context/LookbookContext';
import { OutfitsList } from '../components/OutfitsList';
import { useRouter } from '../hooks/useRouter';
import { Star, ArrowRight } from 'lucide-react';

export default function IndexPage() {
  const router = useRouter();
  const { setIsAddModalOpen } = useLookbook();

  return (
    <div className="space-y-6">
      {/* Editorial Premium Canvas Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl py-14 px-8 sm:px-12 md:px-16 flex items-center">
          
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-amber-600/15 via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

          <div className="max-w-xl relative space-y-5">
          
            
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Aesthetic Wardrobes, Crafted with Intent.
            </h2>
            
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              Welcome to StyleHub. Streamline digital closet planning, explore high-contrast layering patterns, bookmark seasonal pieces, or pull real items directly from our integrated global inventory.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-inspiration-btn"
                onClick={() => router.push('/inspiration')}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-600 font-semibold text-white text-xs rounded-xl hover:bg-amber-700 cursor-pointer active:scale-95 transition-all duration-150"
              >
                <span>Browse Global Inventory Sync</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="hero-create-look-btn"
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-2.5 bg-white/10 font-semibold text-white/90 text-xs rounded-xl hover:bg-white/15 cursor-pointer active:scale-95 transition-all duration-150"
              >
                <span>Add Custom Outfit</span>
              </button>
            </div>
          </div>

          {/* Editorial mock jacket commentary */}
          <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-64 text-right pr-6 border-r border-neutral-800 space-y-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">Curator Commentary</span>
            <p className="text-sm italic font-light text-neutral-400">
              "Clothes mean nothing until someone lives in them."
            </p>
            <p className="text-[10px] font-mono text-amber-500">- Marc Jacobs</p>
          </div>

        </div>
      </div>

      <OutfitsList mode="home" />
    </div>
  );
}
