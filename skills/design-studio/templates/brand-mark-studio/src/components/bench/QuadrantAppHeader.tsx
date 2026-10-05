import React, { useState } from 'react';
import { CandidateId, LogoParams } from '../../types';
import { LogoLockup } from '../logos/LogoLockup';
import { Bell, Search, ShieldCheck, ChevronRight, FileText } from 'lucide-react';

interface QuadrantAppHeaderProps {
  candidate: CandidateId;
  params: LogoParams;
}

export const QuadrantAppHeader: React.FC<QuadrantAppHeaderProps> = ({ candidate, params }) => {
  const [headerTheme, setHeaderTheme] = useState<'dark' | 'light'>('dark');

  return (
    <div className="flex flex-col h-full bg-base-200/40 rounded-xl border border-base-300 overflow-hidden shadow-xl">
      {/* Quadrant Header Bar */}
      <div className="px-4 py-2.5 bg-base-300/80 border-b border-base-300 flex items-center justify-between text-base-content">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-base-content uppercase">
            Q1: In-Situ Regulatory SaaS Header (32px Scale)
          </h3>
        </div>

        {/* Header Theme Switcher (Clinical Light vs Cockpit Dark) */}
        <div className="flex items-center space-x-1 bg-base-300/60 p-0.5 rounded-lg border border-base-300">
          <button
            onClick={() => setHeaderTheme('light')}
            className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all ${
              headerTheme === 'light'
                ? 'bg-primary text-primary-content font-semibold'
                : 'text-base-content/70 hover:text-base-content'
            }`}
          >
            Clinical Light
          </button>
          <button
            onClick={() => setHeaderTheme('dark')}
            className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all ${
              headerTheme === 'dark'
                ? 'bg-primary text-primary-content font-semibold'
                : 'text-base-content/70 hover:text-base-content'
            }`}
          >
            Cockpit Dark
          </button>
        </div>
      </div>

      {/* Simulated Live Header Container */}
      <div
        className={`p-6 flex-1 flex flex-col justify-center transition-colors duration-200 ${
          headerTheme === 'dark' ? 'bg-[#080D1A]' : 'bg-[#F1F5F9]'
        }`}
      >
        <div className="mb-2 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>PORTAL: DISTRIBUTED RUNTIME & INFRASTRUCTURE PLATFORM</span>
          <span className="font-semibold text-emerald-500">LIVE PRODUCTION ENVIRONMENT</span>
        </div>

        {/* The Realistic Regulatory App Navigation Bar */}
        <div
          className={`rounded-lg border shadow-lg transition-all ${
            headerTheme === 'dark'
              ? 'bg-[#0F172A] border-slate-700/80 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Main Top Navigation Row */}
          <div className="px-4 py-2.5 flex items-center justify-between gap-4 border-b border-inherit">
            {/* Left: 32px Scale Brand Lockup */}
            <div className="flex items-center shrink-0">
              <LogoLockup
                candidate={candidate}
                params={params}
                size="sm"
                variant="horizontal"
                isDark={headerTheme === 'dark'}
              />
            </div>

            {/* Middle: Live Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md items-center relative">
              <Search
                size={14}
                className={`absolute left-3 ${
                  headerTheme === 'dark' ? 'text-slate-400' : 'text-slate-400'
                }`}
              />
              <input
                type="text"
                readOnly
                value="Search deployments, services, architectural units..."
                className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-md border font-sans outline-none cursor-default ${
                  headerTheme === 'dark'
                    ? 'bg-slate-900/90 border-slate-700 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              />
            </div>

            {/* Right: Status Pill & User Menu */}
            <div className="flex items-center space-x-3 shrink-0">
              {/* System Verification Pill */}
              <div
                className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border ${
                  headerTheme === 'dark'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                }`}
              >
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>SYSTEM HEALTH: 99.99% NOMINAL</span>
              </div>

              {/* Notification icon */}
              <div className="relative p-1.5 rounded-md hover:bg-slate-500/10 cursor-pointer">
                <Bell size={16} className={headerTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              </div>

              {/* User Avatar */}
              <div className="flex items-center space-x-2 pl-2 border-l border-inherit">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold text-xs">
                  HC
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold leading-tight">Staff Architect</span>
                  <span className="text-[9px] text-slate-400 font-mono leading-none">Engineering Systems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subheader Breadcrumbs & Tab Bar */}
          <div
            className={`px-4 py-2 flex items-center justify-between text-xs font-mono ${
              headerTheme === 'dark' ? 'bg-slate-900/50 text-slate-400' : 'bg-slate-100/70 text-slate-600'
            }`}
          >
            <div className="flex items-center space-x-1 text-[11px] overflow-hidden truncate">
              <span className="hover:underline cursor-pointer">Production Clusters</span>
              <ChevronRight size={12} />
              <span className="hover:underline cursor-pointer">us-east-metal-01</span>
              <ChevronRight size={12} />
              <span className={headerTheme === 'dark' ? 'text-amber-400 font-semibold' : 'text-amber-700 font-semibold'}>
                Kernel Engine • Tectonic Core
              </span>
            </div>

            <div className="flex items-center space-x-4 text-[10px]">
              <span className="flex items-center space-x-1">
                <FileText size={11} />
                <span>Release: 2.4.0</span>
              </span>
              <span className="text-slate-500">ISO 27001 • SOC2</span>
            </div>
          </div>
        </div>

        {/* Verification Annotation */}
        <p className="mt-3 text-[11px] text-slate-500 font-mono text-center">
          Proves 32px optical weight, typography baseline parity, and institutional gravitas in production software.
        </p>
      </div>
    </div>
  );
};
