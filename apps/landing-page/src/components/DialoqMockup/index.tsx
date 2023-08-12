import { Box, BoxProps, Image } from '@chakra-ui/react';
import DialoqMockupImage from '../../../public/dialoq-mockup.png';

const DialoqMockup = (props: BoxProps): JSX.Element => {
  return (
    <Box width="300px" {...props}>
      <Image src={DialoqMockupImage} alt="Dialoq" />
    </Box>
  );
};

export default DialoqMockup;
