import { LandingLeftHero, LandingRightHero } from "@/features/landing";

export default async function Home() {
  return (
    <main className="flex-1">
      <section className="container relative flex min-h-[calc(100vh-4rem)] items-center justify-between gap-8 py-12 md:py-24 lg:py-32 max-w-7xl mx-auto">
        <LandingLeftHero />
        <LandingRightHero />
      </section>
    </main>
  );
}
