import React, {useState} from 'react';
import {FloatingMenu} from 'react-native-floating-action-menu';

const FloatingButtonMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemPress = index => {
    console.log(`Item ${index} pressed`);
  };

  const items = [
    {label: '도움말'},
    {label: '홈'},
    {label: '앨범'},
    {label: '공유'},
  ];

  return (
    <FloatingMenu
      items={items}
      isOpen={isMenuOpen}
      onMenuToggle={handleMenuToggle}
      onItemPress={handleItemPress}
    />
  );
};

export default FloatingButtonMenu;
