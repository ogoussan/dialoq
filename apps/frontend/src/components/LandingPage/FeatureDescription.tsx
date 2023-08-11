import React from 'react';
import { Badge, Heading, Text, VStack } from '@chakra-ui/react';

interface FeatureDescriptionProps {
  heading: string;
  description: string;
  comingSoon?: boolean;
}

const FeatureDescription = ({
  heading,
  description,
  comingSoon = false,
}: FeatureDescriptionProps): JSX.Element => {
  return (
    <VStack alignItems={'baseline'} width={'100%'}>
      <Heading size={'sm'}>{heading}</Heading>
      <Text>{description}</Text>
      {comingSoon && (
        <Badge textAlign={'center'} width={'100%'}>
          Coming Soon
        </Badge>
      )}
    </VStack>
  );
};

export default FeatureDescription;
