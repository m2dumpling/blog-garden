import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">About</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">👋 Hi, I'm Dumpling</h2>
        <p className="text-muted-foreground leading-relaxed">
          I'm a developer passionate about AI, Computer Vision, and Backend Engineering.
          This site is my personal knowledge base — a place to document what I learn,
          share my projects, and track my growth as an engineer.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">🎯 What I'm working on</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Building AI Agent systems with MCP protocol</li>
          <li>• Computer Vision for industrial defect detection (YOLO11)</li>
          <li>• Backend systems with Spring Boot and Redis</li>
          <li>• Learning Rust systems programming</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">📫 Contact</h2>
        <p className="text-muted-foreground">
          GitHub:{' '}
          <Link href="https://github.com/m2dumpling" className="text-fd-primary hover:underline">
            @Dumpling
          </Link>
        </p>
      </section>
    </div>
  );
}