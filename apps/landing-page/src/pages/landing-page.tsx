import React from 'react';
import { VStack } from '@chakra-ui/react';

import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/Feature/FeaturesSection';
import Footer from '../components/Footer';

const LandingPage = (): JSX.Element => {
  return (
    <VStack width={'100%'}>
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </VStack>
  );
};

export default LandingPage;
