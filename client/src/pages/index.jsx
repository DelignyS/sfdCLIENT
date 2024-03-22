import react from "react";

import HeroBanner from "@/components/LandingPage/HeroBanner";
import Companies from "@/components/LandingPage/Companies";
import PopularServices from "@/components/LandingPage/PopularServices";
import Everything from "@/components/LandingPage/Everything";
import Services from "@/components/LandingPage/Services";
import SFDBusiness from "@/components/LandingPage/SFDBusiness";
import JoinSFD from "@/components/LandingPage/JoinSFD";
import AuthWrapper from "@/components/AuthWrapper";
import BackToTopButton from "@/components/BackToTopButton";
import { useStateProvider } from "@/context/StateContext";

function Index() {
  const [{showLoginModal,showSignupModal}] = useStateProvider();
  return (
    <div>
      <HeroBanner />
      <Companies />
      <PopularServices />
      <Everything />
      <Services />
      <SFDBusiness />
      <JoinSFD />
      {(showLoginModal || showSignupModal) && (
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
      )}
      <BackToTopButton />
    </div>
  );
}

export default Index;
