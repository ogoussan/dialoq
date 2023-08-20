import { Box, VStack } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/notfound';
import { routes } from './routes';
import React, { ReactElement } from 'react';
import Navbar from './components/Navbar/Navbar';

const App = (): ReactElement => {
  return (
    <Box
      width="100vw"
      backgroundColor="gray.100"
      _dark={{ backgroundColor: 'gray.900' }}
      paddingBottom={8}
    >
      <VStack width="100vw">
        <Navbar />
        <Routes>
          {routes.map(({ path, component }) => (
            <Route path={path} element={component} key={`route-${path}`} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </VStack>
    </Box>
  );
};

export default App;
