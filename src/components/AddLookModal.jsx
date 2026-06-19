import React, { useState } from 'react';
import { useLookbook } from '../context/LookbookContext';
import { X, Save, Image, Tag, Sparkles, Check } from 'lucide-react';

export const AddLookModal = ({ isOpen, onClose }) => {
  const { addCustomOutfit, navigateTo } = useLookbook();

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Casual');
  const [season, setSeason] = useState('Spring');
  const [priceStr, setPriceStr] = useState('150.00');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('100% Organic Pima Cotton');
  const [styleAdvice, setStyleAdvice] = useState('');
  const [keywordsStr, setKeywordsStr] = useState('minimalist, comfort, spring');
  
  const [errorStatus, setErrorStatus] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorStatus(null);

    // Basic Validation
    if (!title.trim()) {
      setErrorStatus("Please specify an outfit title.");
      return;
    }
    if (!description.trim()) {
      setErrorStatus("Please provide a descriptive styling narrative.");
      return;
    }

    // Default image if missing
    let imageUrl = image.trim();
    if (!imageUrl) {
      imageUrl = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80"; // neat default folded shirt
    }

    // Parse price safely
    const parsedPriceFloat = parseFloat(priceStr);
    if (isNaN(parsedPriceFloat) || parsedPriceFloat <= 0) {
      setErrorStatus("Price must be a valid positive decimal number (e.g. 120.00).");
      return;
    }
    const priceCents = Math.round(parsedPriceFloat * 100);

    // Parse keywords
    const keywords = keywordsStr
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter((k) => k.length > 0);

    addCustomOutfit({
      title: title.trim(),
      category,
      season,
      price: priceCents,
      image: imageUrl,
      description: description.trim(),
      fabric: fabric.trim() || 'Premium Quality Blend',
      styleAdvice: styleAdvice.trim() || 'No specific style advice curated yet.',
      keywords: keywords.length > 0 ? keywords : [category.toLowerCase(), season.toLowerCase()],
    });

    // Reset Form & Close
    setTitle('');
    setDescription('');
    setPriceStr('150.00');
    setImage('');
    setFabric('100% Organic Pima Cotton');
    setStyleAdvice('');
    setKeywordsStr('minimalist, comfort, spring');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Backdrop with elegant blur */}
      <div 
        id="modal-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden border border-neutral-100 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-sans font-extrabold text-lg text-neutral-900">Upload Unique Look</h2>
              <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">Register custom style card</p>
            </div>
          </div>
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-neutral-50 flex items-center justify-center text-neutral-400 hover:text-neutral-700 cursor-pointer transition-colors"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {errorStatus && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs font-semibold">
              {errorStatus}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-500">Outfit Title *</label>
              <input
                id="form-title-input"
                type="text"
                required
                placeholder="e.g. Classic Olive Linen Overcoat"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-150 text-neutral-800 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/15 focus:border-amber-600 focus:bg-white transition-all duration-150"
              />
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-500">Retail Price ($ USD) *</label>
              <input
                id="form-price-input"
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="e.g. 150.00"
                value={priceStr}
                onChange={(e) => setPriceStr(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-150 text-neutral-800 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/15 focus:border-amber-600 focus:bg-white transition-all duration-150"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-500">Category</label>
              <select
                id="form-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-150 text-neutral-800 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-amber-500/15 focus:border-amber-600 focus:bg-white transition-all duration-150"
              >
                <option value="Casual">Casual</option>
                <option value="Formal">Formal</option>
                <option value="Business Casual">Business Casual</option>
                <option value="Streetwear">Streetwear</option>
                <option value="Athletic">Athletic</option>
              </select>
            </div>

            {/* Season */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-500">Season Wear</label>
              <select
                id="form-season-select"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-150 text-neutral-800 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-amber-500/15 focus:border-amber-600 focus:bg-white transition-all duration-150"
              >
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
                <option value="All-Season">All-Season</option>
              </select>
            </div>

          </div>

          {/* Photo Image URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-500 flex items-center gap-1">
              <Image className="w-3.5 h-3.5" />
              <span>Cover Image URL (Optional)</span>
            </label>
            <input
              id="form-image-input"
              type="url"
              placeholder="e.g. https://images.unsplash.com/... (Leaves empty for standard lookbook coat placeholder)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-150 text-neutral-800 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/15 focus:border-amber-600 focus:bg-white transition-all duration-150"
            />
          </div>

          {/* Cloth Specs (Fabric composition) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-500">Fabric Composition</label>
            <input
              id="form-fabric-input"
              type="text"
              placeholder="e.g. 100% Organic Cotton Hemp & Flax Linen Blend"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-150 text-neutral-800 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/15 focus:border-amber-600 focus:bg-white transition-all duration-150"
            />
          </div>

          {/* Styling Narrative Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-500">Styling Narrative & Overview *</label>
            <textarea
              id="form-description-textarea"
              required
              rows={3}
              placeholder="Provide a robust character summary of when and how to layer this outfit coordinate..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-150 text-neutral-800 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/15 focus:border-amber-600 focus:bg-white transition-all duration-150 resize-none"
            />
          </div>

          {/* Professional Style Advice */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-500">Stylist Curation Advice</label>
            <textarea
              id="form-advice-textarea"
              rows={2.5}
              placeholder="e.g. Wear layered over a cream colored fine cashmere jersey turtleneck and brown Chelsea chelsea boots..."
              value={styleAdvice}
              onChange={(e) => setStyleAdvice(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-150 text-neutral-800 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/15 focus:border-amber-600 focus:bg-white transition-all duration-150 resize-none"
            />
          </div>

          {/* Keywords / Search Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-500 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Metadata Search Tags (Comma separated)</span>
            </label>
            <input
              id="form-keywords-input"
              type="text"
              placeholder="minimalist, casual, linen, beige, summer"
              value={keywordsStr}
              onChange={(e) => setKeywordsStr(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-150 text-neutral-800 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/15 focus:border-amber-600 focus:bg-white transition-all duration-150"
            />
          </div>

          {/* Form Action Controls Footer */}
          <div className="border-t border-neutral-100 pt-6 flex items-center justify-end gap-3.5">
            <button
              id="cancel-modal-btn"
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="submit-modal-btn"
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 active:scale-95 transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <Save className="w-4 h-4" />
              <span>Submit Outfit Look</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
