import { createContext } from 'react';

interface SidebarContext {
  isOpen: boolean;
  isClosable: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SidebarContext = createContext({} as SidebarContext);
