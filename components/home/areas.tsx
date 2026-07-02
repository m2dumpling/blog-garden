'use client';

import { motion } from 'motion/react';
import { areas } from '@/lib/config';

const IconMap: Record<string, string> = {
  'AI / LLM': 'bg-gradient-to-br from-orange-500/20 to-amber-500/10',
  'Computer Vision': 'bg-gradient-to-br from-sky-500/20 to-blue-500/10',
  Backend: 'bg-gradient-to-br from-emerald-500/20 to-green-500/10',
};

function AreaCard({ icon, title, items, index }: { icon: string; title: string; items: string[]; index: number }) {
  return (
    <motion.div
      className="skill-card rounded-xl border p-6 bg-gradient-to-b from-card/50 to-card/30 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <div className={`w-12 h-12 rounded-xl ${IconMap[title] || 'bg-accent'} flex items-center justify-center text-xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="tag-pill">{item}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function AreasSection() {
  return (
    <section className="border-t">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h2 className="section-heading section-heading-underline">Areas</h2>
            <p className="text-muted-foreground mt-3">What I&apos;m working on</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {areas.map((area, i) => (
            <AreaCard key={area.title} {...area} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}