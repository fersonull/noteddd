import { LandingLeftHero, LandingRightHero } from "@/features/landing";

export default async function Home() {
  return (
    <div className=" h-full flex">
      <div className="flex flex-1 items-center justify-between">
        {/* Left hero */}
        <LandingLeftHero />
        {/* Right hero */}
        <LandingRightHero />
      </div>
    </div>
  );
}
