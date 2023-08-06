import {
  FormEventHandler,
  PropsWithChildren,
  ReactElement,
  useRef,
} from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  confirmText: string;
  isLoading?: boolean;
}

const DrawerContainer = ({
  title,
  isOpen,
  onSubmit,
  onClose,
  confirmText,
  children,
  isLoading,
}: PropsWithChildren<Props>): ReactElement => {
  const initialFocusRef = useRef(null);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialFocusRef}
      placement="bottom"
      size="full"
    >
      <DrawerOverlay />
      <DrawerContent
        ref={initialFocusRef}
        as="form"
        onSubmit={handleSubmit}
        sx={{ '&': { minH: '100dvh' } }}
        display="flex"
        flexDirection="column"
      >
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody overflowY={'scroll'} flex="1 0 auto">
          {children}
        </DrawerBody>
        <DrawerFooter>
          <Button
            disabled={isLoading}
            variant="ghost"
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button isLoading={isLoading} type="submit">
            {confirmText}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerContainer;
