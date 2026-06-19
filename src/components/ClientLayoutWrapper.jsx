'use client';

import React from 'react';
import { LookbookProvider, useLookbook } from '../context/LookbookContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { AddLookModal } from './AddLookModal';

function MainLayoutContent({ children }) {
  const { isAddModalOpen, setIsAddModalOpen } = useLookbook();

  return (
    <div className="min-h-screen bg-neutral-50/20 flex flex-col text-neutral-800 antialiased selection:bg-amber-100 selection:text-amber-900">
      <Header />
      
      <main className="flex-1 pb-16">
        {children}
      </main>

      <Footer />

      <AddLookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

export default function ClientLayoutWrapper({ children }) {
  return (
    <LookbookProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </LookbookProvider>
  );
}
