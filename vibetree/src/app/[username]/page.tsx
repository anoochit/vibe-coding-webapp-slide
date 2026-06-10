"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { getSocialBrand } from "@/lib/utils";
import { Link, UserProfile } from "@/types";
import { User, Sparkles, Frown, Globe } from "lucide-react";

export default function PublicProfile() {
  const params = useParams();
  const rawUsername = params?.username as string;
  const username = rawUsername?.toLowerCase();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!username) return;

    // Search for profile matching username handle
    const q = query(collection(db, "users"), where("username", "==", username));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        // Found matching profile
        const userDoc = snapshot.docs[0];
        setProfile({ ...userDoc.data(), uid: userDoc.id } as UserProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [username]);

  // Track and increment click counter in Firestore on Link click
  const handleLinkClick = async (linkId: string) => {
    if (!profile) return;

    try {
      const updatedLinks = profile.links.map((link) => {
        if (link.id === linkId) {
          return { ...link, clicks: (link.clicks || 0) + 1 };
        }
        return link;
      });

      // Update in Firestore
      await updateDoc(doc(db, "users", profile.uid), {
        links: updatedLinks,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error("Failed to track click:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="spinner text-cyan-400" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400 mb-6">
          <Frown className="w-8 h-8 animate-bounce" />
        </div>
        <h1 className="text-xl font-bold mb-2">Portal Not Found</h1>
        <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
          The handle <strong className="text-slate-200">@{username}</strong> is currently unclaimed or has been removed.
        </p>
        <a 
          href="/" 
          className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25"
        >
          Claim This Handle Now
        </a>
      </div>
    );
  }

  const currentTheme = profile.theme || "glassmorphism";

  return (
    <div className={`min-h-screen w-full flex flex-col items-center relative py-16 px-4 theme-container`} data-theme={currentTheme}>
      
      {/* Theme effects background overlays */}
      {currentTheme === "cyberpunk" && (
        <div className="absolute inset-0 cyberpunk-grid pointer-events-none opacity-40 z-0" />
      )}

      {/* Floating backlink branding to invite other visitors */}
      <div className="absolute top-6 right-6 z-20">
        <a 
          href="/" 
          className={`flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full border shadow transition-all ${
            currentTheme === "brutalism"
              ? "bg-white text-black border-black shadow-[2px_2px_0px_#000]"
              : currentTheme === "pastel"
              ? "bg-white text-stone-700 border-slate-200 hover:border-emerald-200"
              : "bg-black/40 backdrop-blur text-white/80 border-white/10 hover:border-white/20"
          }`}
        >
          <Globe className="w-3.5 h-3.5" /> Made with VibeTree
        </a>
      </div>

      {/* Profile Page Content */}
      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        
        {/* Avatar */}
        <div className="relative mb-6">
          <div className={`w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-4 transition-all ${
            currentTheme === "brutalism" 
              ? "border-black bg-white shadow-[3px_3px_0px_#000]" 
              : currentTheme === "cyberpunk"
              ? "border-[#ff007f] bg-black shadow-[0_0_15px_#ff007f]"
              : "border-white/20 bg-slate-800/40 backdrop-blur"
          }`}>
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.displayName} className="w-full h-full object-cover" />
            ) : (
              <User className={`w-12 h-12 ${
                currentTheme === "pastel" ? "text-stone-400" : "text-slate-400"
              }`} />
            )}
          </div>
        </div>

        {/* Display Name */}
        <h1 className={`text-2xl font-black text-center tracking-tight mb-1.5 ${
          currentTheme === "brutalism" ? "text-black text-3xl" : ""
        }`}>
          {profile.displayName}
        </h1>

        {/* Username */}
        <p className={`text-sm text-center mb-6 font-mono font-semibold ${
          currentTheme === "brutalism" 
            ? "text-black/80" 
            : currentTheme === "pastel"
            ? "text-stone-500"
            : "text-cyan-400 opacity-90"
        }`}>
          @{profile.username}
        </p>

        {/* Bio */}
        {profile.bio && (
          <p className={`text-xs md:text-sm text-center leading-relaxed mb-8 max-w-xs break-words ${
            currentTheme === "brutalism" 
              ? "text-black border-2 border-black bg-white p-3 rounded-2xl shadow-[3px_3px_0px_#000]" 
              : currentTheme === "pastel"
              ? "text-stone-600"
              : "text-slate-300"
          }`}>
            {profile.bio}
          </p>
        )}

        {/* Links Grid */}
        <div className="w-full space-y-4">
          {profile.links && profile.links.length > 0 ? (
            profile.links.map((link) => {
              const brand = getSocialBrand(link.url);
              const BrandIcon = brand.Icon;

              let cardStyles = "";
              if (currentTheme === "glassmorphism") {
                cardStyles = "bg-white/7 backdrop-blur-md border border-white/10 hover:border-white/20 text-white hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/10";
              } else if (currentTheme === "cyberpunk") {
                cardStyles = "bg-black border-2 border-[#ff007f] hover:border-[#00f0ff] text-white hover:scale-[1.01] hover:-skew-x-1 animate-neon-text shadow-[0_0_8px_rgba(255,0,127,0.15)]";
              } else if (currentTheme === "pastel") {
                cardStyles = "bg-white border border-slate-200 hover:border-emerald-200 text-stone-800 shadow-sm hover:shadow-md hover:-translate-y-0.5";
              } else if (currentTheme === "brutalism") {
                cardStyles = "bg-white border-2 border-black text-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5";
              }

              return (
                <a
                  key={link.id}
                  href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full py-4.5 px-5 rounded-2xl flex items-center justify-between text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer ${cardStyles}`}
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <span 
                      className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        currentTheme === "brutalism" 
                          ? "bg-amber-100 border border-black" 
                          : currentTheme === "pastel"
                          ? "bg-slate-50"
                          : "bg-white/10"
                      }`}
                      style={{ color: currentTheme !== "brutalism" ? brand.color : undefined }}
                    >
                      <BrandIcon className="w-4.5 h-4.5 flex-shrink-0" />
                    </span>
                    <span className="truncate pr-2">{link.title || "Untitled Link"}</span>
                  </div>
                  <span className="text-xs opacity-40">➔</span>
                </a>
              );
            })
          ) : (
            <div className={`text-center py-12 px-6 rounded-3xl border border-dashed text-xs ${
              currentTheme === "brutalism" 
                ? "border-black/50 text-black/60 bg-white" 
                : currentTheme === "pastel"
                ? "border-slate-300 text-slate-400"
                : "border-white/10 text-white/30"
            }`}>
              No active links listed.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`mt-16 text-[10px] font-mono tracking-widest uppercase opacity-40 ${
          currentTheme === "brutalism" ? "text-black font-bold opacity-70" : ""
        }`}>
          <span>VibeTree</span>
        </div>

      </div>
    </div>
  );
}
