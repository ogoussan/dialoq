import { Avatar, Flex, HStack, Menu, MenuButton } from '@chakra-ui/react';
import React, { ReactElement, useMemo } from 'react';
import { env } from '../../env';
import { useAuthUser } from '../../services/user.service';
import { BANNER_HEIGHT } from '../DevBanner';
import { UserMenu } from './UserMenu';
import { Link } from 'react-router-dom';
import LogoFull from '../LogoFull';

const Navbar = (): ReactElement => {
  const { data: user } = useAuthUser();
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
      <Link to="/app">
        <LogoFull maxWidth={['50%', '70%', '70%']} />
      </Link>
      <HStack gap={8}>
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
