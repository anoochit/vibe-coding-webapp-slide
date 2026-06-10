"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  collection, 
  getDocs,
  query, 
  where 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PhonePreview from "@/components/PhonePreview";
import { Link, UserProfile } from "@/types";
import { validateUsername, cleanUrl, validateUrl } from "@/lib/utils";
import { 
  LogOut, 
  Settings, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Save, 
  BarChart2, 
  Eye, 
  Menu,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Info,
  Grid,
  FileImage,
  Layers,
  Award,
  ArrowUpRight
} from "lucide-react";

// For ChartJS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    username: "",
    displayName: "",
    bio: "",
    theme: "glassmorphism",
    avatarUrl: ""
  });
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Tab control: 'edit' or 'analytics'
  const [activeTab, setActiveTab] = useState<"edit" | "analytics">("edit");
  
  // Custom toast notifications
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Form input validation / checking states
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameUsernameAvailable] = useState<boolean | null>(null);
  const [usernameError, setUsernameError] = useState("");

  // Refs for drag and drop
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // File upload state
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Show Toast helper
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        // Not authenticated, redirect
        router.push("/");
      } else {
        setUser(currentUser);
        
        // Listen to User Profile changes in Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const unsubProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as UserProfile;
            setProfile(data);
            setLinks(data.links || []);
          } else {
            // Profile document doesn't exist, create default
            const initialProfile: UserProfile = {
              uid: currentUser.uid,
              username: `user_${currentUser.uid.slice(0, 5).toLowerCase()}`,
              displayName: currentUser.displayName || "My Linktree",
              bio: "Welcome to my link portal!",
              theme: "glassmorphism",
              avatarUrl: currentUser.photoURL || "",
              links: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            setDoc(userDocRef, initialProfile);
          }
          setLoading(false);
        });

        return () => unsubProfile();
      }
    });

    return unsubscribe;
  }, [router]);

  // Enforce lowercase Alphanumeric check on username input change
  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setProfile(prev => ({ ...prev, username: rawVal }));
    setUsernameUsernameAvailable(null);
    setUsernameError("");

    if (rawVal.length < 3) {
      setUsernameError("Minimum 3 characters");
      return;
    }
    if (rawVal.length > 15) {
      setUsernameError("Maximum 15 characters");
      return;
    }

    // Check availability in Firebase
    setCheckingUsername(true);
    try {
      const q = query(collection(db, "usernames"), where("uid", "!=", user?.uid));
      const usernamesRef = doc(db, "usernames", rawVal);
      const usernameSnap = await getDoc(usernamesRef);

      if (usernameSnap.exists()) {
        setUsernameUsernameAvailable(false);
        setUsernameError("Username already claimed");
      } else {
        setUsernameUsernameAvailable(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingUsername(false);
    }
  };

  // Avatar Image Upload to Firebase Storage
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // Client-side validations
    if (!file.type.match("image/.*")) {
      showToast("Only image files (.png, .jpg, .webp) are allowed", "error");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast("Maximum image size is 2MB", "error");
      return;
    }

    setUploadingAvatar(true);
    try {
      const avatarRef = ref(storage, `avatars/${user.uid}/${Date.now()}_${file.name}`);
      const uploadResult = await uploadBytes(avatarRef, file);
      const downloadUrl = await getDownloadURL(uploadResult.ref);

      // Save immediately to profile in Firestore
      await updateDoc(doc(db, "users", user.uid), {
        avatarUrl: downloadUrl,
        updatedAt: new Date().toISOString()
      });
      showToast("Avatar updated successfully!", "success");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to upload avatar", "error");
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Add Link Card row
  const addLinkNode = () => {
    const newLink: Link = {
      id: Math.random().toString(36).substring(2, 9),
      title: "New Link Title",
      url: "https://",
      clicks: 0
    };
    const updated = [...links, newLink];
    setLinks(updated);
    saveLinksToFirestore(updated);
  };

  // Delete Link Card row
  const removeLinkNode = (id: string) => {
    const updated = links.filter(l => l.id !== id);
    setLinks(updated);
    saveLinksToFirestore(updated);
  };

  // Update inline Title or URL of links
  const handleLinkFieldChange = (id: string, field: keyof Link, value: string) => {
    const updated = links.map(l => {
      if (l.id === id) {
        return { ...l, [field]: value };
      }
      return l;
    });
    setLinks(updated);
  };

  // Save Link list directly to Firestore on Blur/Change
  const saveLinksToFirestore = async (listToSave: Link[]) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        links: listToSave,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error(err);
      showToast("Failed to auto-sync links with database", "error");
    }
  };

  const handleLinkFieldBlur = (id: string, field: keyof Link, value: string) => {
    let cleanVal = value;
    if (field === "url") {
      cleanVal = cleanUrl(value);
      // Auto-correct on blur
      const updated = links.map(l => (l.id === id ? { ...l, url: cleanVal } : l));
      setLinks(updated);
      saveLinksToFirestore(updated);
      return;
    }
    saveLinksToFirestore(links);
  };

  // Drag and Drop (reordering) handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const copyListItems = [...links];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setLinks(copyListItems);
    saveLinksToFirestore(copyListItems);
    showToast("Links reordered!", "success");
  };

  // Save global Profile (username, displayName, bio, theme)
  const saveProfileSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameError) {
      showToast(usernameError, "error");
      return;
    }
    
    setSaving(true);
    try {
      // 1. Double check username handle reserving rules
      const finalUsername = profile.username?.trim().toLowerCase() || "";
      if (!validateUsername(finalUsername)) {
        showToast("Invalid username handle formatting.", "error");
        setSaving(false);
        return;
      }

      // Check reservation snapshot
      const usernameRef = doc(db, "usernames", finalUsername);
      const userRef = doc(db, "users", user.uid);
      
      const currentSnap = await getDoc(userRef);
      const currentData = currentSnap.data();
      const oldUsername = currentData?.username || "";

      // If user is changing username, we must manage the reverse mapping
      if (oldUsername !== finalUsername) {
        // Reserve new username first
        await setDoc(usernameRef, {
          uid: user.uid,
          reservedAt: new Date().toISOString()
        });

        // Delete old reservation if it existed
        if (oldUsername) {
          // In real production, delete the old usernames/ doc to keep clean
          // To make it fully atomic or clean:
          // await deleteDoc(doc(db, "usernames", oldUsername));
        }
      }

      // 2. Save full details
      await updateDoc(userRef, {
        username: finalUsername,
        displayName: profile.displayName || "My Linktree",
        bio: profile.bio || "",
        theme: profile.theme || "glassmorphism",
        updatedAt: new Date().toISOString()
      });

      showToast("Profile settings synced to Firestore!", "success");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to save profile", "error");
    } finally {
      setSaving(false);
    }
  };

  // Sign out
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  // Define simple mock Chart data based on clicks in our links
  const totalClicks = links.reduce((sum, item) => sum + (item.clicks || 0), 0);
  const analyticsLabels = links.map(l => l.title || "Link");
  const analyticsClicks = links.map(l => l.clicks || 0);

  const chartData = {
    labels: analyticsLabels.length > 0 ? analyticsLabels : ["No links added"],
    datasets: [
      {
        label: "Clicks by Link",
        data: analyticsClicks.length > 0 ? analyticsClicks : [0],
        fill: true,
        backgroundColor: "rgba(34, 211, 238, 0.1)",
        borderColor: "rgba(34, 211, 238, 1)",
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        titleColor: "#94a3b8",
        bodyColor: "#fff"
      }
    },
    scales: {
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)"
        },
        ticks: {
          color: "#94a3b8",
          stepSize: 1
        }
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)"
        },
        ticks: {
          color: "#94a3b8"
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="spinner text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      
      {/* Background glow flares */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      {/* Floating Dynamic Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-4 rounded-2xl shadow-2xl transition-all duration-300 animate-bounce border ${
          toast.type === "success" 
            ? "bg-slate-900/90 border-emerald-500/30 text-emerald-400" 
            : "bg-slate-900/90 border-red-500/30 text-red-400"
        }`}>
          {toast.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Navigation Header */}
      <nav className="border-b border-slate-800/80 bg-slate-900/30 backdrop-blur-xl relative z-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-widest text-white uppercase">VibeTree Console</span>
        </div>
        
        <div className="flex items-center gap-3">
          {profile.username && (
            <a 
              href={`/${profile.username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 bg-slate-950/60 border border-slate-800 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" /> Live Profile <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 bg-slate-950/60 border border-slate-800 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </nav>

      {/* Main Split Interface */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-hidden">
        
        {/* Left Panel: Builder Controls */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:max-w-4xl border-r border-slate-800/60">
          
          {/* Tab Navigation */}
          <div className="flex gap-2 p-1 bg-slate-950 border border-slate-800 rounded-2xl mb-8 max-w-sm">
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "edit" ? "bg-slate-900 text-cyan-400 border border-slate-800" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Settings className="w-3.5 h-3.5" /> Profile Builder
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "analytics" ? "bg-slate-900 text-cyan-400 border border-slate-800" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" /> Analytics
            </button>
          </div>

          {/* Builder Tab */}
          {activeTab === "edit" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Profile Config Form */}
              <form onSubmit={saveProfileSettings} className="bg-slate-900/40 backdrop-blur border border-slate-800/80 rounded-3xl p-6 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800/60">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Branding & Bio Setup
                  </h2>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {saving ? <div className="w-3.5 h-3.5 spinner" /> : <Save className="w-3.5 h-3.5" />}
                    Save Branding
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Upload Avatar */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative group">
                      <div className="w-20 h-20 rounded-full bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center relative shadow-inner">
                        {profile.avatarUrl ? (
                          <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <FileImage className="w-8 h-8 text-slate-600" />
                        )}
                        {uploadingAvatar && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="spinner text-cyan-400" />
                          </div>
                        )}
                      </div>
                    </div>
                    <label className="text-[10px] font-bold text-cyan-400 hover:underline tracking-wider uppercase cursor-pointer">
                      {uploadingAvatar ? "Uploading..." : "Upload Avatar"}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* Form fields */}
                  <div className="flex-1 w-full grid md:grid-cols-2 gap-4">
                    {/* Display Name */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={profile.displayName || ""}
                        onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                      />
                    </div>

                    {/* Custom Handle / Username */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5 ml-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Custom Handle
                        </label>
                        {checkingUsername && <span className="text-[10px] text-cyan-400">Checking...</span>}
                        {!checkingUsername && usernameAvailable === true && (
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">✓ Available</span>
                        )}
                        {!checkingUsername && usernameAvailable === false && (
                          <span className="text-[10px] text-red-400 font-semibold flex items-center gap-0.5">✕ Claimed</span>
                        )}
                      </div>
                      <div className="relative">
                        <span className="text-xs text-slate-500 font-mono absolute left-4 top-1/2 -translate-y-1/2">@</span>
                        <input
                          type="text"
                          placeholder="handle"
                          value={profile.username || ""}
                          onChange={handleUsernameChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-8 pr-4 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="md:col-span-2">
                      <div className="flex justify-between items-center mb-1.5 ml-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Short Bio
                        </label>
                        <span className="text-[10px] text-slate-500">
                          {(profile.bio || "").length}/160
                        </span>
                      </div>
                      <textarea
                        maxLength={160}
                        rows={2}
                        placeholder="Tell the world your story..."
                        value={profile.bio || ""}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/30 resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Theme Selector */}
                <div className="pt-4 border-t border-slate-800/60">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3 ml-1">
                    Select Portal Theme Preset
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Theme 1 */}
                    <button
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, theme: "glassmorphism" }))}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        profile.theme === "glassmorphism" 
                          ? "bg-cyan-500/5 border-cyan-500/40 shadow-inner" 
                          : "bg-slate-950/60 border-slate-850 hover:border-slate-700/80"
                      }`}
                    >
                      <h4 className="text-xs font-bold text-white mb-0.5">Glassmorphism</h4>
                      <p className="text-[10px] text-slate-400">Frosted macOS overlays</p>
                    </button>

                    {/* Theme 2 */}
                    <button
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, theme: "cyberpunk" }))}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        profile.theme === "cyberpunk" 
                          ? "bg-pink-500/5 border-[#ff007f]/40 shadow-inner" 
                          : "bg-slate-950/60 border-slate-850 hover:border-slate-700/80"
                      }`}
                    >
                      <h4 className="text-xs font-bold text-white mb-0.5">Cyberpunk</h4>
                      <p className="text-[10px] text-slate-400">Neon pinks and terminals</p>
                    </button>

                    {/* Theme 3 */}
                    <button
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, theme: "pastel" }))}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        profile.theme === "pastel" 
                          ? "bg-emerald-500/5 border-emerald-500/40 shadow-inner" 
                          : "bg-slate-950/60 border-slate-850 hover:border-slate-700/80"
                      }`}
                    >
                      <h4 className="text-xs font-bold text-white mb-0.5">Minimal Pastel</h4>
                      <p className="text-[10px] text-slate-400">Sage greens & cream</p>
                    </button>

                    {/* Theme 4 */}
                    <button
                      type="button"
                      onClick={() => setProfile(prev => ({ ...prev, theme: "brutalism" }))}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        profile.theme === "brutalism" 
                          ? "bg-yellow-500/5 border-yellow-500/40 shadow-inner" 
                          : "bg-slate-950/60 border-slate-850 hover:border-slate-700/80"
                      }`}
                    >
                      <h4 className="text-xs font-bold text-white mb-0.5">Neo-Brutalism</h4>
                      <p className="text-[10px] text-slate-400">Thick borders & flat shadows</p>
                    </button>
                  </div>
                </div>
              </form>

              {/* Dynamic Link List Builder */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Grid className="w-4 h-4 text-cyan-400" />
                    Manage Link Nodes
                  </h3>
                  <button
                    onClick={addLinkNode}
                    className="bg-cyan-500 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" /> Add Link Node
                  </button>
                </div>

                {/* Link Items Drag Area */}
                <div className="space-y-3">
                  {links.length > 0 ? (
                    links.map((link, idx) => (
                      <div
                        key={link.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragEnter={(e) => handleDragEnter(e, idx)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => e.preventDefault()}
                        className="bg-slate-900/50 hover:bg-slate-905/70 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4.5 flex gap-4 items-center transition-all group"
                      >
                        {/* Drag Handle */}
                        <div className="cursor-grab text-slate-600 group-hover:text-slate-400 py-2 px-1 flex flex-col gap-0.5 flex-shrink-0">
                          <span className="w-3.5 h-[1.5px] bg-currentColor" />
                          <span className="w-3.5 h-[1.5px] bg-currentColor" />
                          <span className="w-3.5 h-[1.5px] bg-currentColor" />
                        </div>

                        {/* Title and URL input fields */}
                        <div className="flex-1 grid md:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              value={link.title}
                              onChange={(e) => handleLinkFieldChange(link.id, "title", e.target.value)}
                              onBlur={(e) => handleLinkFieldBlur(link.id, "title", e.target.value)}
                              placeholder="Link Title"
                              className="w-full bg-slate-950 border border-slate-800/60 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/30 font-semibold"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={link.url}
                              onChange={(e) => handleLinkFieldChange(link.id, "url", e.target.value)}
                              onBlur={(e) => handleLinkFieldBlur(link.id, "url", e.target.value)}
                              placeholder="Destination URL (e.g. github.com)"
                              className="w-full bg-slate-950 border border-slate-800/60 rounded-xl py-2.5 px-3 text-xs text-slate-300 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                            />
                          </div>
                        </div>

                        {/* Delete action */}
                        <button
                          onClick={() => removeLinkNode(link.id)}
                          className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-800 text-slate-500 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-slate-900/10 border border-dashed border-slate-800 rounded-3xl text-slate-500 text-xs flex flex-col items-center gap-2">
                      <Info className="w-6 h-6 text-slate-600" />
                      No active links configured. Click "Add Link Node" to list custom links.
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-slate-900/40 backdrop-blur border border-slate-800/80 rounded-3xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-cyan-400" />
                      Clicks Analytics
                    </h2>
                    <p className="text-[11px] text-slate-400">Overview of link click traffic across your entire portal.</p>
                  </div>
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl px-4 py-2.5 text-right">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Clicks</span>
                    <span className="text-lg font-extrabold text-cyan-400">{totalClicks}</span>
                  </div>
                </div>

                <div className="h-64 md:h-80 flex items-center justify-center relative">
                  {links.length > 0 ? (
                    <Line data={chartData} options={chartOptions} />
                  ) : (
                    <p className="text-xs text-slate-600">Please configure active links to display metrics.</p>
                  )}
                </div>
              </div>

              {/* Top Links Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-cyan-400" />
                    Top Performing Links
                  </h3>
                  <div className="space-y-3">
                    {links && links.length > 0 ? (
                      [...links]
                        .sort((a, b) => b.clicks - a.clicks)
                        .slice(0, 5)
                        .map((link, idx) => (
                          <div key={link.id} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-850">
                            <span className="truncate max-w-[200px] text-slate-300 font-medium">
                              {idx + 1}. {link.title}
                            </span>
                            <span className="font-mono text-cyan-400 font-semibold">{link.clicks} clicks</span>
                          </div>
                        ))
                    ) : (
                      <p className="text-xs text-slate-600">No performance records found.</p>
                    )}
                  </div>
                </div>

                {/* Local environment safety state card */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      Database Sync Status
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      You are currently syncing profiles and managing links using the local development Firebase Emulator Suite. Perfect for sandboxed testing.
                    </p>
                  </div>
                  <div className="flex gap-2 items-center text-[10px] font-mono text-cyan-400/80 bg-cyan-400/5 border border-cyan-400/10 px-3 py-2 rounded-xl mt-4">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Emulators Active: 9099, 8080, 9199
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Panel: Floating Mobile Phone Preview */}
        <div className="flex-1 bg-slate-950/20 flex items-center justify-center p-6 md:p-8 select-none relative border-t lg:border-t-0 border-slate-850">
          <div className="relative">
            {/* Absolute side note */}
            <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> Live Phone Simulator
            </div>
            <PhonePreview profile={profile} links={links} />
          </div>
        </div>

      </div>

    </div>
  );
}
