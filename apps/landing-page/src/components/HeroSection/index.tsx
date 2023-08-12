import React from 'react';
import {
  Box,
  Button,
  Heading,
  Hide,
  HStack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import DialoqMockup from '../DialoqMockup';
import { env } from '../../env';

const Index = (): JSX.Element => {
  return (
    <HStack
      height={'70vh'}
      alignItems={'start'}
      marginTop={[12, 32, 32]}
      maxWidth={['80%', '60%', '60%']}
      gap={4}
    >
      <VStack gap={[6, 10, 10]} alignItems={'baseline'}>
        <VStack gap={[2, 4, 4]} alignItems={'baseline'}>
          <Tag
            borderRadius={16}
            paddingX={[2, 8, 8]}
            size={['sm', 'lg', 'lg']}
            variant={'subtle'}
            colorScheme={'green'}
          >
            OUR BETA APP JUST RELEASED
          </Tag>
          <Heading fontWeight={'semibold'} size={['xl', '3xl', '3xl']}>
            Master any language with the support of AI
          </Heading>
        </VStack>
        <Text
          maxWidth={['100%', '60%', '60%']}
          fontWeight={'normal'}
          fontSize={['md', 'lg', 'xl']}
        >
          Take your language skills to the next level with revolutionary AI
          support for your individual way of studying.
        </Text>
        <a href={env.APP_URL}>
          <Button size={['md', 'lg', 'lg']} rightIcon={<AiOutlineArrowRight />}>
            Get Started
          </Button>
        </a>
      </VStack>
      <Hide below={'md'}>
        <Box>
          <DialoqMockup />
        </Box>
      </Hide>
    </HStack>
  );
};

export default Index;
