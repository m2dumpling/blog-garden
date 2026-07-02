'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="border-t border-b">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-3">Let&apos;s connect</h2>
          <p className="text-muted-foreground mb-6">
            I&apos;m always open to interesting conversations and opportunities.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-fd-primary text-fd-primary-foreground font-medium hover:opacity-90 transition-all"
            >
              About Me <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://github.com/m2dumpling"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border hover:bg-accent/50 transition-all"
            >
              GitHub <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}