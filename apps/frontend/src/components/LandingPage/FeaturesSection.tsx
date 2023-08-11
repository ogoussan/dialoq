import React from 'react';
import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import FeatureDescription from './FeatureDescription';

const FeaturesSection = (): JSX.Element => {
  const featureDescriptions: JSX.Element[] = [
    <FeatureDescription
      heading={'Customized Vocabulary Building'}
      description={
        "Learn new words tailored to your interests and requirements. Whether it's by topic or profession, our AI-powered language learning app provides you with a personalized vocabulary learning experience. Expand your word bank and enhance your communication skills in a way that resonates with your unique learning journey."
      }
    />,
    <FeatureDescription
      heading={'Targeted Grammar Improvement'}
      description={
        'Focus on Strengthening Your Grammar\n' +
        'Tackle your grammar weaknesses head-on. Our app offers targeted exercises to help you master grammatical concepts. Elevate your language foundation and express yourself more accurately and confidently.'
      }
    />,
    <FeatureDescription
      heading={'Learning Path Personalization'}
      description={
        "Tailor Your Learning Path to Your Goals\n. Creata a personalized learning path for your language learning objectives with our app. Whether you're aiming for professional growth or personal enrichment, our adaptive approach ensures that you're always progressing towards your desired level of language proficiency."
      }
    />,
    <FeatureDescription
      heading={'Conversational AI Buddy'}
      description={
        'Boost Your Fluency and Confidence with AI Conversations Elevate your language fluency and conversational confidence through interactions with our AI conversation buddy. Engage in natural, text-based conversations that simulate real-life interactions and provide immediate feedback,'
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
