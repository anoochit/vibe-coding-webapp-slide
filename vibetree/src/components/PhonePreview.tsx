"use client";

import React from "react";
import { getSocialBrand } from "@/lib/utils";
import { Link, UserProfile } from "@/types";
import { User, Sparkles } from "lucide-react";

interface PhonePreviewProps {
  profile: Partial<UserProfile>;
  links: Link[];
  onLinkClick?: (linkId: string) => void;
}

export default function PhonePreview({ profile, links, onLinkClick }: PhonePreviewProps) {
  const currentTheme = profile.theme || "glassmorphism";

  return (
    <div className="w-full max-w-[340px] aspect-[9/19] bg-slate-900 border-[10px] border-slate-950 rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col p-1.5 ring-4 ring-slate-800/50">
      
      {/* Dynamic Background or Overlays depending on theme */}
      <div className={`absolute inset-0 z-0 theme-container`} data-theme={currentTheme}>
        {currentTheme === "cyberpunk" && (
          <div className="absolute inset-0 cyberpunk-grid pointer-events-none opacity-40" />
        )}
      </div>

      {/* iPhone Camera Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-full z-30 flex items-center justify-between px-4">
        {/* Dynamic Island details */}
        <div className="w-2.5 h-2.5 rounded-full bg-slate-900/60" />
        <div className="w-8 h-1 bg-slate-900/80 rounded" />
      </div>

      {/* Screen Container */}
      <div className="flex-1 rounded-[40px] overflow-y-auto no-scrollbar relative z-10 pt-14 pb-8 px-4 flex flex-col items-center">
        
        {/* Theme Sparkles indicator */}
        <div className="absolute top-4 right-4 text-xs flex items-center gap-1 opacity-60 font-semibold px-2 py-1 rounded-full bg-black/10 border border-white/5">
          <Sparkles className="w-3 h-3 text-yellow-400 animate-spin" />
          <span className="capitalize">{currentTheme}</span>
        </div>

        {/* Profile Avatar */}
        <div className="relative mb-4 group mt-4">
          <div className={`w-20 h-20 rounded-full overflow-hidden flex items-center justify-center border-2 transition-all ${
            currentTheme === "brutalism" 
              ? "border-black bg-white shadow-[2px_2px_0px_#000]" 
              : currentTheme === "cyberpunk"
              ? "border-[#ff007f] bg-black shadow-[0_0_10px_#ff007f]"
              : "border-white/20 bg-slate-800/40 backdrop-blur"
          }`}>
            {profile.avatarUrl ? (
              <img 
                src={profile.avatarUrl} 
                alt="Avatar" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as any).src = ""; // Clear if broken url
                }}
              />
            ) : (
              <User className={`w-10 h-10 ${
                currentTheme === "pastel" ? "text-stone-400" : "text-slate-400"
              }`} />
            )}
          </div>
        </div>

        {/* Display Name */}
        <h2 className={`text-base font-bold text-center tracking-tight mb-1 truncate max-w-full ${
          currentTheme === "brutalism" ? "text-black text-lg" : ""
        }`}>
          {profile.displayName || "Your Name"}
        </h2>

        {/* Username */}
        <p className={`text-xs text-center mb-4 font-mono ${
          currentTheme === "brutalism" 
            ? "text-black/80 font-bold" 
            : currentTheme === "pastel"
            ? "text-stone-500"
            : "text-cyan-400 opacity-90"
        }`}>
          @{profile.username || "username"}
        </p>

        {/* Bio */}
        {profile.bio && (
          <p className={`text-xs text-center leading-relaxed mb-6 max-w-[240px] break-words ${
            currentTheme === "brutalism" 
              ? "text-black border-2 border-black bg-white p-2.5 rounded-xl shadow-[2px_2px_0px_#000]" 
              : currentTheme === "pastel"
              ? "text-stone-600"
              : "text-slate-300"
          }`}>
            {profile.bio}
          </p>
        )}

        {/* Links List */}
        <div className="w-full space-y-3 mt-2 flex-1">
          {links && links.length > 0 ? (
            links.map((link) => {
              const brand = getSocialBrand(link.url);
              const BrandIcon = brand.Icon;

              // Apply custom theme classes
              let cardStyles = "";
              if (currentTheme === "glassmorphism") {
                cardStyles = "bg-white/7 backdrop-blur-md border border-white/10 hover:border-white/20 text-white hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/10";
              } else if (currentTheme === "cyberpunk") {
                cardStyles = "bg-black border-2 border-[#ff007f] hover:border-[#00f0ff] text-white hover:scale-[1.01] hover:-skew-x-1 animate-neon-text shadow-[0_0_8px_rgba(255,0,127,0.15)]";
              } else if (currentTheme === "pastel") {
                cardStyles = "bg-white border border-slate-200 hover:border-emerald-200 text-stone-800 shadow-sm hover:shadow-md hover:-translate-y-0.5";
              } else if (currentTheme === "brutalism") {
                cardStyles = "bg-white border-2 border-black text-black shadow-[3px_3px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5";
              }

              return (
                <a
                  key={link.id}
                  href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLinkClick && onLinkClick(link.id)}
                  className={`w-full py-3.5 px-4 rounded-2xl flex items-center justify-between text-xs font-semibold transition-all duration-300 cursor-pointer ${cardStyles}`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span 
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        currentTheme === "brutalism" 
                          ? "bg-amber-100 border border-black" 
                          : currentTheme === "pastel"
                          ? "bg-slate-50"
                          : "bg-white/10"
                      }`}
                      style={{ color: currentTheme !== "brutalism" ? brand.color : undefined }}
                    >
                      <BrandIcon className="w-4 h-4 flex-shrink-0" />
                    </span>
                    <span className="truncate pr-2">{link.title || "Untitled Link"}</span>
                  </div>
                  <span className="text-[10px] opacity-40">➔</span>
                </a>
              );
            })
          ) : (
            <div className={`text-center py-8 px-4 rounded-2xl border border-dashed text-xs ${
              currentTheme === "brutalism" 
                ? "border-black/50 text-black/60 bg-white" 
                : currentTheme === "pastel"
                ? "border-slate-300 text-slate-400"
                : "border-white/10 text-white/30"
            }`}>
              No active links. Add some on the dashboard to build your VibeTree!
            </div>
          )}
        </div>

        {/* Footer Branding */}
        <div className={`mt-8 text-[10px] font-mono tracking-widest uppercase opacity-40 flex items-center gap-1.5 ${
          currentTheme === "brutalism" ? "text-black font-bold opacity-70" : ""
        }`}>
          <span>VibeTree</span>
        </div>

      </div>
    </div>
  );
}
