import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import Footer from '../components/Footer';

const Imprint = (): JSX.Element => {
  return (
    <Box maxWidth={['80%', '80%', '70%']} marginTop={[12, 12, 32]}>
      <VStack width={'100%'} alignItems={'start'}>
        <Heading>Imprint</Heading>
        <VStack gap={1} alignItems={'start'}>
          <Text>Naite Labs GbR</Text>
          <Text>Waidmannsluster Damm 138</Text>
          <Text>13469 Berlin</Text>
        </VStack>
        <Text>Contact: info@naitelabs.com</Text>
      </VStack>
      <Footer />
    </Box>
  );
};

export default Imprint;
