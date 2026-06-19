import React from "react";
import { Compass, Mail, ShieldAlert, PhoneCall } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-12 border-t border-neutral-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-around gap-8 md:flex-row ">
          <div className="space-y-4">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                <Compass className="w-4.5 h-4.5" />
              </div>
              <span className="font-sans font-bold text-lg tracking-tight text-white">
                StyleHub
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Elevating personal wardrobe exploration through digital
              cataloging. Explore trend-forward styles, create custom-themed
              cards, and save seasonal outfits.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-mono">
              Contact & Support
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>support@stylehub.io</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-500" />
                <span>+1 (555) 234-4555</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-900 mt-10 pt-6 flex flex-col md:flex-row items-center justify-around gap-4 text-xs font-mono">
          <p>© 2026 StyleHub Lookbook Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Wear
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
