'use client';

import React from 'react';
import { OutfitsList } from '../../components/OutfitsList';

export default function CollectionPage() {
  return (
    <div className="py-2">
      <OutfitsList mode="collection" />
    </div>
  );
}
