"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isFirebaseConfigured, auth, db } from "@/lib/firebase";
import SetupHelper from "@/components/SetupHelper";
import PhonePreview from "@/components/PhonePreview";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Flame, Mail, Lock, ArrowRight, ArrowUpRight, Sparkles, AlertCircle } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Fallback state for preview phone on landing page
  const demoProfile = {
    displayName: "Alexander Vibe",
    username: "alex_vibe",
    bio: "Creating futuristic web templates and micro-apps. 🌌 Next.js Developer.",
    theme: "glassmorphism" as const,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
  };

  const demoLinks = [
    { id: "1", title: "My GitHub Projects", url: "github.com", clicks: 420 },
    { id: "2", title: "Watch my YouTube videos", url: "youtube.com", clicks: 310 },
    { id: "3", title: "Follow me on X", url: "x.com", clicks: 195 }
  ];

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setCheckingAuth(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Logged in, redirect to dashboard
        router.push("/dashboard");
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (!isFirebaseConfigured) {
    return <SetupHelper />;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="spinner text-cyan-400" />
      </div>
    );
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/dashboard");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Setup initial default user profile in Firestore
        const initialProfile = {
          uid: user.uid,
          username: `user_${user.uid.slice(0, 5).toLowerCase()}`,
          displayName: user.email?.split("@")[0] || "New User",
          bio: "Welcome to my new bio page!",
          theme: "glassmorphism",
          avatarUrl: "",
          links: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await setDoc(doc(db, "users", user.uid), initialProfile);
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user document already exists
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const initialProfile = {
          uid: user.uid,
          username: `user_${user.uid.slice(0, 5).toLowerCase()}`,
          displayName: user.displayName || "New User",
          bio: "Welcome to my new bio page!",
          theme: "glassmorphism",
          avatarUrl: user.photoURL || "",
          links: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await setDoc(userRef, initialProfile);
      }
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative overflow-hidden font-sans">
      
      {/* Visual background ambient decorations */}
      <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[130px] pointer-events-none" />

      {/* Left Column: Hero & Premium Branding */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-12 md:py-24 z-10 max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center border border-cyan-500/30 text-cyan-400">
            <Flame className="w-5.5 h-5.5" />
          </div>
          <span className="font-bold text-xl tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            VIBETREE
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1] bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          The Premium Hub <br />
          For Your Entire Digital Vibe.
        </h1>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-8 max-w-md">
          Design, customize, and share a stunning frosted-glass, cyberpunk, or brutalist bio link portal. Live-updates in real-time.
        </p>

        {/* Feature bullets */}
        <div className="space-y-4 mb-12 hidden md:block">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs">✔</div>
            <span className="text-xs font-medium text-slate-300">4 gorgeous, high-fidelity responsive themes</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs">✔</div>
            <span className="text-xs font-medium text-slate-300">Instant drag-and-drop links with live phone preview</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs">✔</div>
            <span className="text-xs font-medium text-slate-300">Full click-analytics charts powered by Chart.js</span>
          </div>
        </div>

        {/* Floating Phone mock */}
        <div className="hidden lg:block absolute right-[-50px] top-[15%] rotate-3 hover:rotate-0 transition-transform duration-500 hover:scale-105 select-none">
          <PhonePreview profile={demoProfile} links={demoLinks} />
        </div>
      </div>

      {/* Right Column: Premium Auth Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 z-10">
        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative">
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              {isLogin ? "Welcome Back" : "Reserve Your Username"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isLogin ? "Sign in to manage your link portal" : "Create an account to claim your handle"}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 text-xs text-red-400 mb-4 flex gap-2 items-center">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 spinner" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Register and Claim Handle"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-slate-800" />
            <span className="text-[10px] font-bold text-slate-500 uppercase px-3 tracking-widest">OR</span>
            <div className="flex-1 h-[1px] bg-slate-800" />
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-semibold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.18 1-.78 1.85-1.63 2.42v2.85h2.64c1.55-1.42 2.63-3.5 2.63-5.85z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Toggle Login/Signup */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-slate-400 hover:text-cyan-400 hover:underline transition-all cursor-pointer"
            >
              {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
