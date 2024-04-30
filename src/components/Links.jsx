import {Link as RouterLink, NavLink as RouterNavLink} from "react-router-dom";
import styled from "styled-components";

export const Link = styled(RouterLink)`
  color: #e6ffff;
  text-decoration: none;

  transition: color 0.2s;

  &:hover {
    color: #7e9bb1;
  }
`;

export const NavLink = styled(RouterNavLink)`
  color: #e6ffff;
  text-decoration: none;

  transition: color 0.2s;

  &.active {
    color: #92abab;
  }
`;
