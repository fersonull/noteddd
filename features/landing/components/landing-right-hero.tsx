import { LandingNotebookCard } from "./landing-notebook-card";

export function LandingRightHero() {
  return (
    <section className="relative hidden lg:flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl blur-3xl" />
      <LandingNotebookCard />
    </section>
  );
}
