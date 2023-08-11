import React from 'react';
import { VStack, Text, HStack, Icon } from '@chakra-ui/react';

import HeroSection from '../components/LandingPage/HeaderSection';
import FeaturesSection from '../components/LandingPage/FeaturesSection';
import LogoFull from '../components/LogoFull';
import { AiOutlineCopyrightCircle } from 'react-icons/ai';

const LandingPage = (): JSX.Element => {
  return (
    <VStack width={'100%'}>
      <HeroSection />
      <FeaturesSection />

      <VStack gap={1}>
        <LogoFull boxSize={[100, 200, 200]} />
        <Text>info.dialoq@naite-labs.com</Text>
        <HStack gap={1} color={'gray.600'}>
          <Icon boxSize={4} as={AiOutlineCopyrightCircle} /> <Text>dialoq</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default LandingPage;
