import React from 'react';
import { auth } from '../rebase';
import styled from 'styled-components';
import Colours from '../Colours';

class Menu extends React.Component {
  state = {
    expanded: false,
  }

  logout = () => {
    auth.signOut();
  }

  toggleMenu = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <MenuContainer expanded={this.state.expanded}>
        <MenuButton onClick={this.toggleMenu} expanded={this.state.expanded}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </MenuButton>
        <LogoutButton expanded={this.state.expanded} onClick={this.logout}>Log out</LogoutButton>
      </MenuContainer>
    )
  }
}


const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  opacity: ${props => props.expanded ? '1' : '.6'};
  min-width: ${props => props.expanded ? '140px' : '50px'};
  min-height: ${props => props.expanded ? '100%' : '42px'};
  background-color: ${Colours.darkgrey};
  overflow: hidden;
  transition: min-width .5s ease-in-out,
              min-height .5s ease-in-out,
              opacity .5s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &:after {
    display: block;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    border-top: ${props => props.expanded ? `0 solid ${Colours.darkgrey}` : `32px solid ${Colours.darkgrey}`};
    border-right: ${props => props.expanded ? `0 solid ${Colours.white}` : `40px solid ${Colours.white}`};
    transition: border-top .5s ease,
                border-right .5s ease;
  }
`

const MenuButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 22px;
  z-index: 10;
  background: none;
  color: ${Colours.offwhite};
  border: none;
  cursor: pointer;
  transform: rotate(0deg);
  transition: .5s ease-in-out;

  span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
    background-color: ${props => props.expanded ? Colours.offwhite : Colours.white}
  }

  span:nth-child(1) {
    top: ${props => props.expanded ? '9px' : '0'};
    left: ${props => props.expanded ? '50%' : '0'};
    width: ${props => props.expanded ? '0%' : '100%'};
  }

  span:nth-child(2) {
    top: 9px;
    transform: ${props => props.expanded ? 'rotate(45deg)' : ''};
  }
  span:nth-child(3) {
    top: 9px;
    transform: ${props => props.expanded ? 'rotate(-45deg)' : ''};
  }

  span:nth-child(4) {
    top: ${props => props.expanded ? '9px' : '18px'};
    left: ${props => props.expanded ? '50%' : '0'};
    width: ${props => props.expanded ? '0%' : '100%'};
  }
`

const LogoutButton = styled.button`
  display: block;
  position: absolute;
  bottom: 0;
  left: ${props => props.expanded ? '0' : '-100%'};
  width: 100%;
  z-index:10;
  border: 0;
  padding: 15px 0;
  background-color: ${Colours.nearblack};
  color: ${Colours.offwhite};
  cursor: pointer;
  transition: left .5s ease-in-out;
  transition-delay: ${props => props.expanded ? '.75s' : '0s'};
`

export default Menu;
