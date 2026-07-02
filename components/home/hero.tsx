'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, PenLine, FolderGit2, BookOpen, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getNavModules } from '@/lib/modules/registry';

const subtitles = [
  'Exploring AI / Computer Vision / Backend Engineering',
  'Building things that matter',
  'MCP · Agent · RAG · YOLO · Spring · Rust',
];

export default function HeroSection() {
  const [subtitleIdx, setSubtitleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSubtitleIdx((i) => (i + 1) % subtitles.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center hero-glow overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-fd-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="pulse-dot" />
          <span className="text-sm text-muted-foreground">Stay hungry, stay foolish</span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.2]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Hi, I&apos;m{' '}
          <span className="hero-gradient inline-block pb-2">Dumpling</span>
        </motion.h1>

        <motion.div
          className="mt-6 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.p
            key={subtitleIdx}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {subtitles[subtitleIdx]}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {getNavModules().map((mod, i) => {
            const icons: Record<string, LucideIcon> = {
              blog: PenLine,
              projects: FolderGit2,
              docs: BookOpen,
            };
            const Icon = icons[mod.name] ?? ArrowUpRight;
            const isPrimary = i === 0;

            return (
              <Link
                key={mod.name}
                href={mod.route}
                className={
                  isPrimary
                    ? 'group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-fd-primary text-fd-primary-foreground font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-fd-primary/20'
                    : 'group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-accent/50 transition-all duration-300 font-medium'
                }
              >
                <Icon className="w-4 h-4" />
                {mod.label}
                {isPrimary && (
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}