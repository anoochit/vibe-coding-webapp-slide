"use client";

import React from "react";
import { Terminal, Database, Key, ShieldCheck, Flame, Cpu, ArrowRight } from "lucide-react";

export default function SetupHelper() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background neon glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative z-10 my-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              VibeTree Firebase Setup Assistant
            </h1>
            <p className="text-sm text-slate-400">
              Complete these brief integration steps to unlock full real-time database capabilities.
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-amber-300 text-sm mb-8 flex gap-3 items-start">
          <Terminal className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">Firebase Config Missing</strong>
            Your `.env.local` file is not configured. Since you are running in production mode (or without emulators), please define your Firebase project credentials to proceed.
          </div>
        </div>

        {/* Steps Grid */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            3-Step Integration Process
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="bg-slate-950/50 border border-slate-800/60 rounded-2xl p-5 hover:border-slate-700/80 transition-all">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 font-bold text-sm mb-3">
                1
              </div>
              <h3 className="font-medium text-sm text-slate-200 mb-1 flex items-center gap-1.5">
                <Database className="w-4 h-4" /> Create Project
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Go to the <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Firebase Console</a>, create a project, and enable Firestore & Auth.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950/50 border border-slate-800/60 rounded-2xl p-5 hover:border-slate-700/80 transition-all">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20 text-violet-400 font-bold text-sm mb-3">
                2
              </div>
              <h3 className="font-medium text-sm text-slate-200 mb-1 flex items-center gap-1.5">
                <Key className="w-4 h-4" /> Grab API Credentials
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Add a Web App in Project Settings. Copy the provided config keys into your environment variables.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950/50 border border-slate-800/60 rounded-2xl p-5 hover:border-slate-700/80 transition-all">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 font-bold text-sm mb-3">
                3
              </div>
              <h3 className="font-medium text-sm text-slate-200 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Save .env.local
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Create a `.env.local` file at the root of your project using the template below.
              </p>
            </div>
          </div>
        </div>

        {/* Environment Variable Template Codeblock */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              File Template: .env.local
            </span>
            <span className="text-xs text-slate-500">Root Directory</span>
          </div>
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 font-mono text-xs text-slate-300 relative overflow-x-auto leading-relaxed shadow-inner">
            <p className="text-slate-500"># Firebase Config Template</p>
            <p>NEXT_PUBLIC_FIREBASE_API_KEY=<span className="text-emerald-400">"your_api_key"</span></p>
            <p>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<span className="text-emerald-400">"your_project_id.firebaseapp.com"</span></p>
            <p>NEXT_PUBLIC_FIREBASE_PROJECT_ID=<span className="text-emerald-400">"your_project_id"</span></p>
            <p>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<span className="text-emerald-400">"your_project_id.appspot.com"</span></p>
            <p>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<span className="text-emerald-400">"your_sender_id"</span></p>
            <p>NEXT_PUBLIC_FIREBASE_APP_ID=<span className="text-emerald-400">"your_app_id"</span></p>
          </div>
        </div>

        {/* Help Tip */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Once saved, restart your Next.js development server to pick up new changes.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            I've configured it, check again <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
