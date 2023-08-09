import React from 'react';
import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import FeatureDescription from './FeatureDescription';

const FeaturesSection = (): JSX.Element => {
  const featureDescriptions: JSX.Element[] = [
    <FeatureDescription
      heading={'AI-conversation buddy'}
      description={
        'Describe the item and add all the relevant details you would like to share. Double click to edit the text and change the description.'
      }
      comingSoon={true}
    />,
    <FeatureDescription
      heading={'AI-conversation buddy'}
      description={
        'Describe the item and add all the relevant details you would like to share. Double click to edit the text and change the description.'
      }
      comingSoon={true}
    />,
    <FeatureDescription
      heading={'AI-conversation buddy'}
      description={
        'Describe the item and add all the relevant details you would like to share. Double click to edit the text and change the description.'
      }
      comingSoon={true}
    />,
    <FeatureDescription
      heading={'AI-conversation buddy'}
      description={
        'Describe the item and add all the relevant details you would like to share. Double click to edit the text and change the description.'
      }
      comingSoon={true}
    />,
  ];

  return (
    <>
      <Heading size={'xl'}>Features</Heading>
      <VStack
        width={'100%'}
        paddingY={[16, 24, 24]}
        backgroundColor={'primary.200'}
        alignItems={'center'}
      >
        <SimpleGrid
          justifyContent={'center'}
          alignContent={'center'}
          alignItems={'center'}
          width={['70%', '50%', '50%']}
          columns={[1, 2, 2]}
          gap={[24, 32, 32]}
        >
          {featureDescriptions.map((element) => element)}
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default FeaturesSection;
