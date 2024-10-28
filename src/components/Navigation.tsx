import { Link } from 'react-router-dom';
import { Bot, Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  visible: boolean;
  scrollToSection: (sectionId: string) => void;
}

export const Navigation = ({
  isDarkTheme,
  toggleTheme,
  isMenuOpen,
  setIsMenuOpen,
  visible,
  scrollToSection
}: NavigationProps) => {
  // Copy navigation JSX from App.tsx
  // Lines 170-309
}; 