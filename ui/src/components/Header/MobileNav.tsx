import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { SCREENS } from "../../media";
import { FooterLinks } from "../Footer";
import CompleteProfile from "./CompleteProfile";
import PlaceholderAvatar from "./PlaceholderAvatar";

type MobileNavProps = {
  active: boolean;
};

const StyledMobileNav = styled.nav<MobileNavProps>`
  background: var(--color-background);
  flex-direction: column;
  width: 100vw;
  display: none;
  padding: 1.5rem 0;
  position: fixed;
  z-index: 1;
  top: 3.5rem;
  bottom: 0;

  ${SCREENS.Down.Tablet} {
    display: ${(props) => (props.active ? "flex" : "none")};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const NavLink = styled("a")`
  display: block;
  padding: 0.75rem 1.75rem;
  color: var(--color-darkblue);
`;

const Footer = styled.nav`
  margin-top: auto;
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  height: 4rem;
  width: 4rem;
`;

const AvatarHolder = styled.div`
  margin: 0 0 1.5rem 1.75rem;
`;

type Props = MobileNavProps & {
  isLoggedIn: boolean;
  isAuthorized: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
  profileImage?: string;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileNav: React.FC<Props> = function ({
  active,
  setActive,
  isLoggedIn,
  isAuthorized,
  handleLogin,
  handleLogout,
  profileImage,
}) {
  return (
    <StyledMobileNav active={active}>
      {isLoggedIn ? (
        <>
          <AvatarHolder>
            {profileImage ? (
              <ProfileImage src={profileImage} height="64" width="64" />
            ) : (
              <PlaceholderAvatar />
            )}
          </AvatarHolder>
          <ul onClick={() => setActive(false)}>
            <li>
              <NavLink as={Link} to="/profile">
                {isAuthorized ? "Profile" : <CompleteProfile />}
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleLogout}>Log Out</NavLink>
            </li>
          </ul>
        </>
      ) : (
        <ul onClick={() => setActive(false)}>
          <li>
            <NavLink onClick={handleLogin}>Sign in</NavLink>
          </li>
        </ul>
      )}

      <Footer>
        <FooterLinks />
      </Footer>
    </StyledMobileNav>
  );
};

export default MobileNav;
