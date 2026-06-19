import React from 'react';
import { useLookbook } from '../context/LookbookContext';
import { useRouter } from '../hooks/useRouter';
import Link from './Link';
import { Sparkles, Heart, FolderHeart, Globe, Plus, Compass } from 'lucide-react';

export const Header = () => {
  const { favorites, collection, setIsAddModalOpen } = useLookbook();
  const router = useRouter();

  const navItems = [
    { id: 'home', label: 'All Looks', icon: Sparkles, href: '/' },
    { id: 'favorites', label: 'Favorites', icon: Heart, href: '/favorites', count: favorites.length },
    { id: 'collection', label: 'My Collection', icon: FolderHeart, href: '/collection', count: collection.length },
    { id: 'inspiration', label: 'Global Inspiration', icon: Globe, href: '/inspiration' }
  ];

  const checkIsActive = (path) => {
    if (path === '/') {
      return router.pathname === '/' || router.pathname === '/index';
    }
    return router.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Link */}
          <Link 
            id="logo-brand-btn"
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105 shadow-sm">
              <Compass className="w-5.5 h-5.5 stroke-[2]" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-sans font-bold text-xl tracking-tight text-neutral-900 group-hover:text-amber-700 transition-colors">
                StyleHub
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 mt-0.5">
                Lookbook Engine
              </span>
            </div>
          </Link>

          {/* Navigation Links using Next-like Link */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = checkIsActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`inline-flex items-center justify-center px-2 py-0.5 ml-1 text-xs font-bold rounded-full transition-colors ${
                      isActive ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-2">
            <button
              id="add-look-nav-btn"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 active:scale-95 shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Add Look</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-between py-2.5 border-t border-neutral-50 overflow-x-auto space-x-2">
          {navItems.map((item) => {
            const isActive = checkIsActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                id={`nav-item-mobile-${item.id}`}
                key={item.id}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.id === 'collection' ? 'Collection' : item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                    isActive ? 'bg-amber-400 text-neutral-900' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};
