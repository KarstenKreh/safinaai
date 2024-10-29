import { Player } from '@lottiefiles/react-lottie-player';

interface LottieAnimationProps {
  theme?: boolean;
  scrollToSection: (sectionId: string) => void;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ theme }) => {
  return (
    <div className={`w-full max-w-3xl mx-auto ${theme ? 'bg-gray-900' : 'bg-white'}`}>
      <Player
        autoplay
        loop
        src="https://assets5.lottiefiles.com/packages/lf20_iorpbol0.json"
        style={{ height: '500px', width: '100%' }}
      />
    </div>
  );
};

export default LottieAnimation; 