import { Player } from "@lottiefiles/react-lottie-player";
import waveAnimationHero from "../assets/lottie/wave-animation-hero.json";

export const Hero = () => {
  return (
    <section className="hero-section">
      <div className="absolute inset-0 flex justify-center items-center">
        <Player
          autoplay
          loop
          src={waveAnimationHero}
          className="hero-wave-animation"
        />
      </div>
      {/* Rest of hero content */}
    </section>
  );
}; 