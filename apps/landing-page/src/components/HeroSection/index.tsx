import React from 'react';
import { Button, Heading, Stack, Tag, Text, VStack } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import DialoqMockup from '../DialoqMockup';
import { env } from '../../env';

const Index = (): JSX.Element => {
  return (
    <Stack
      direction={['column', 'column', 'row']}
      height={'70vh'}
      alignItems={'start'}
      marginTop={[12, 12, 32]}
      maxWidth={['80%', '80%', '70%']}
      gap={4}
    >
      <VStack gap={[6, 8, 10]} alignItems={'baseline'}>
        <VStack gap={[2, 2, 4]} alignItems={'baseline'}>
          <Tag
            borderRadius={16}
            paddingX={[2, 4, 8]}
            size={['sm', 'md', 'lg']}
            variant={'subtle'}
            colorScheme={'green'}
          >
            OUR BETA APP JUST RELEASED
          </Tag>
          <Heading fontWeight={'semibold'} size={['xl', '2xl', '3xl']}>
            Master any language with the support of AI
          </Heading>
        </VStack>
        <Text
          maxWidth={['100%', '80%', '70%']}
          fontWeight={'normal'}
          fontSize={['md', 'lg', 'xl']}
        >
          Take your language skills to the next level with revolutionary AI
          support for your individual way of studying.
        </Text>
        <a href={`${env.APP_URL}/app`}>
          <Button size={['md', 'md', 'lg']} rightIcon={<AiOutlineArrowRight />}>
            Get Started
          </Button>
        </a>
      </VStack>
      <Stack
        height={'100%'}
        width={'100%'}
        justifyContent={['center', 'start', 'start']}
        alignItems={['center', 'center', 'center']}
      >
        <DialoqMockup width={['125px', '150px', '250px']} />
      </Stack>
    </Stack>
  );
};

export default Index;
