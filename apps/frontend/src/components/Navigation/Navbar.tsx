import {
  Avatar,
  Button,
  Flex,
  Hide,
  HStack,
  Menu,
  MenuButton,
} from '@chakra-ui/react';
import React, { ReactElement, useMemo } from 'react';
import { env } from '../../env';
import { useAuthUser } from '../../services/user.service';
import { BANNER_HEIGHT } from '../DevBanner';
import { UserMenu } from './UserMenu';
import { Link, useLocation } from 'react-router-dom';
import LogoFull from '../LogoFull';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Navbar = (): ReactElement => {
  const { data: user } = useAuthUser();
  const location = useLocation();
  const avatar = useMemo(() => user?.image, [user?.image]);

  return (
    <Flex
      as="nav"
      display={{ base: 'flex' }}
      insetX="0"
      backgroundColor="white"
      _dark={{
        backgroundColor: 'gray.800',
      }}
      top={env.IS_DEV ? BANNER_HEIGHT : '0'}
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
        {location.pathname === '/' && (
          <Hide below={'md'}>
            <Link to={'/app'}>
              <Button size={'sm'} rightIcon={<AiOutlineArrowRight />}>
                Get Started
              </Button>
            </Link>
          </Hide>
        )}
        <Menu>
          <MenuButton
            as={Avatar}
            size="sm"
            name={`${user?.firstname} ${user?.lastname}`}
            src={avatar}
          />
          <UserMenu />
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Navbar;
