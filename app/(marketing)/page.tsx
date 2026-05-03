import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhoIsItForSection } from "@/components/landing/WhoIsItForSection";
import { ProgramTracksSection } from "@/components/landing/ProgramTracksSection";
import { CommunityPreviewSection } from "@/components/landing/CommunityPreviewSection";
import { ExpertNetworkSection } from "@/components/landing/ExpertNetworkSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <WhoIsItForSection />
      <ProgramTracksSection />
      <CommunityPreviewSection />
      <ExpertNetworkSection />
      <SocialProofSection />
      <FinalCTASection />
    </>
  );
}
