import { Button, Flex, Hide, HStack } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import LogoFull from '../LogoFull';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { env } from '../../env';

const Navbar = (): ReactElement => {
  return (
    <Flex
      as="nav"
      display={{ base: 'flex' }}
      insetX="0"
      backgroundColor="white"
      _dark={{
        backgroundColor: 'gray.800',
      }}
      top={'0'}
      left={0}
      width="100vw"
      height="16"
      padding="3"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link to="/">
        <LogoFull maxWidth={['50%', '70%', '70%']} />
      </Link>
      <HStack gap={8}>
        <Hide below={'md'}>
          <a href={env.APP_URL}>
            <Button size={'sm'} rightIcon={<AiOutlineArrowRight />}>
              Get Started
            </Button>
          </a>
        </Hide>
      </HStack>
    </Flex>
  );
};

export default Navbar;
