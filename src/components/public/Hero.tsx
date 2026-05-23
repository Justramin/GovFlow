"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, ShieldCheck, FileText } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#8B0000]">
      {/* Background Pattern/Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              KSEB Workers Association - Kerala
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Uniting Workers, <br />
              <span className="text-accent">Empowering Kerala.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              The official management portal of the KSEB Workers Association. 
              Dedicated to the welfare of power sector employees and the public of Kerala.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 group">
                Explore Portal
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-all">
                About Union
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-white">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-white/60">Active Members</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-bold">14</div>
                <div className="text-sm text-white/60">Districts</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm text-white/60">Units</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Users className="text-primary" />, title: "Membership", desc: "Join the strongest union" },
                  { icon: <ShieldCheck className="text-primary" />, title: "Protection", desc: "Securing worker rights" },
                  { icon: <FileText className="text-primary" />, title: "Circulars", desc: "Latest state updates" },
                  { icon: <Users className="text-primary" />, title: "Committees", desc: "Localized leadership" },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="mb-4 bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative background circle */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-dark/30 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
