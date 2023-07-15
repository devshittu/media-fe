import Wizard from '@/components/blocks/wizard/wizard';
import steps from '@/components/blocks/wizard/steps';

const HomePage: React.FC = () => {
  const handleFinish = () => {
    // Handle logic when the user finishes the wizard
    console.log('Wizard finished!');
  };

  return (
    <div className="h-screen">
      {/* <h1>Signup Wizard</h1> */}

      <Wizard steps={steps} onFinish={handleFinish} />
    </div>
  );
};

export default HomePage;
