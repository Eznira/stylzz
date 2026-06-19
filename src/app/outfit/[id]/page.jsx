'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { OutfitDetail } from '../../../components/OutfitDetail';

export default function OutfitDetailPage() {
  const params = useParams();
  const idStr = params?.id;
  const outfitId = idStr ? parseInt(idStr, 10) : null;

  return (
    <div className="py-2">
      <OutfitDetail outfitId={outfitId} />
    </div>
  );
}
