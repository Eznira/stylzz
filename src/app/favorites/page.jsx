'use client';

import React from 'react';
import { OutfitsList } from '../../components/OutfitsList';

export default function FavoritesPage() {
  return (
    <div className="py-2">
      <OutfitsList mode="favorites" />
    </div>
  );
}
