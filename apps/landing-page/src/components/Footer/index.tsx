import React from 'react';
import LogoFull from '../LogoFull';
import {
  HStack,
  Icon,
  Text,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import { Link as ReactRouterLink } from 'react-router-dom';

const Index = (): JSX.Element => {
  return (
    <VStack gap={1}>
      <LogoFull boxSize={[100, 200, 200]} />
      <Text>info@naitelabs.com</Text>
      <HStack gap={1} color={'gray.600'}>
        <Icon boxSize={4} as={AiOutlineCopyrightCircle} />{' '}
        <Text>naitelabs</Text>
      </HStack>
      <ChakraLink as={ReactRouterLink} to="/imprint">
        Imprint
      </ChakraLink>
    </VStack>
  );
};

export default Index;
