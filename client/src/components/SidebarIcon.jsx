import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';

const SidebarIcon = ({handleClick, isOpen}) => {
  return <span onClick={handleClick}>
    {isOpen ? <MenuIcon /> : <MenuIcon/>}
  </span>
};

export default SidebarIcon;