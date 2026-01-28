import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import { COLORS } from '../../config/constants';
import { theme } from '../../styles/theme';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import logo from '../../assets/logo.png';

const Header = () => {
  const { isAuthenticated, logout, user, userRole } = useAuth();
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search
  };

  return (
    <HeaderContainer>
      <TopBar>
        <TopBarContent>
          <TopBarLeft>
            <TopBarLink href="#phone">📞 +91-033-INDILINK</TopBarLink>
            <Divider>|</Divider>
            <TopBarLink href="#email">✉️ support@indilink.com</TopBarLink>
          </TopBarLeft>
          <TopBarRight>
            <TopBarLink href="#shipping">🚚 Free Shipping Orders Over ₹500</TopBarLink>
          </TopBarRight>
        </TopBarContent>
      </TopBar>

      <MainHeader>
        <HeaderContent>
          <BrandSection>
            <Logo src={logo} alt="Indilink Logo" />
            <BrandText>
              <BrandTitle to="/">Indilink</BrandTitle>
              <BrandSlogan>Authentic. Handcrafted. Global.</BrandSlogan>
            </BrandText>
          </BrandSection>

          <SearchBar onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">
              <FiSearch size={20} />
            </SearchButton>
          </SearchBar>

          <RightSection>
            {isAuthenticated && (
              <CartIcon to="/cart">
                <FiShoppingCart size={24} />
                {getCartCount() > 0 && <CartBadge>{getCartCount()}</CartBadge>}
              </CartIcon>
            )}
            
            {isAuthenticated ? (
              <UserMenu>
                <UserIcon>
                  <FiUser size={20} />
                  <UserDropdown>
                    <DropdownItem>Hi, {user?.name?.split(' ')[0]}</DropdownItem>
                    <DropdownDivider />
                    <DropdownLink to="/profile">
                      👤 My Profile
                    </DropdownLink>
                    <DropdownLink to="/cart">
                      🛒 My Orders
                    </DropdownLink>
                    {userRole === 'seller' && (
                      <DropdownLink to="/seller-dashboard">
                        📊 Seller Dashboard
                      </DropdownLink>
                    )}
                    {userRole === 'admin' && (
                      <DropdownLink to="/admin-dashboard">
                        ⚙️ Admin Panel
                      </DropdownLink>
                    )}
                    <DropdownDivider />
                    <DropdownButton onClick={logout}>
                      <FiLogOut size={16} /> Logout
                    </DropdownButton>
                  </UserDropdown>
                </UserIcon>
              </UserMenu>
            ) : (
              <AuthButtons>
                <Button as={Link} to="/register" variant="outlined" small>
                  Sign In
                </Button>
                <Button as={Link} to="/register" small>
                  Sign Up
                </Button>
              </AuthButtons>
            )}

            <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </MobileMenuButton>
          </RightSection>
        </HeaderContent>

        <NavMenu isOpen={mobileMenuOpen}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/support">Support</NavLink>
        </NavMenu>
      </MainHeader>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background: ${COLORS.BG_PRIMARY};
  box-shadow: ${theme.shadows.lg};
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
  border-bottom: 2px solid ${COLORS.BG_TERTIARY};
`;

const TopBar = styled.div`
  background: ${COLORS.TEXT_PRIMARY};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  font-size: ${theme.fontSizes.xs};
`;

const TopBarContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
    text-align: center;
  }
`;

const TopBarLeft = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
`;

const TopBarRight = styled.div`
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`;

const TopBarLink = styled.a`
  color: ${COLORS.WHITE};
  text-decoration: none;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${COLORS.PRIMARY_LIGHT};
  }
`;

const Divider = styled.span`
  color: ${COLORS.TEXT_SECONDARY};
`;

const MainHeader = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex: 0 0 auto;
  min-width: 200px;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.lg};
  object-fit: cover;
  box-shadow: ${theme.shadows.md};
  transition: transform ${theme.transitions.fast};

  &:hover {
    transform: scale(1.05);
  }
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const BrandTitle = styled(Link)`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  background: ${COLORS.PRIMARY_GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  margin: 0;
`;

const BrandSlogan = styled.p`
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
  color: ${COLORS.TEXT_SECONDARY};
  margin: 0;
`;

const SearchBar = styled.form`
  display: flex;
  width: 100%;
  min-width: 280px;
  max-width: 100%;
  border-radius: ${theme.borderRadius.lg};
  background: ${COLORS.BG_TERTIARY};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.fast};

  &:focus-within {
    box-shadow: ${theme.shadows.lg};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: 1;
    order: 2;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: transparent;
  font-size: ${theme.fontSizes.base};
  color: ${COLORS.TEXT_PRIMARY};

  &::placeholder {
    color: ${COLORS.TEXT_LIGHT};
  }

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${COLORS.PRIMARY_GRADIENT};
  color: ${COLORS.WHITE};
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${theme.spacing.lg};
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: 1;
    width: 100%;
    justify-content: space-between;
  }
`;

const CartIcon = styled(Link)`
  position: relative;
  color: ${COLORS.TEXT_PRIMARY};
  text-decoration: none;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${COLORS.PRIMARY};
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${COLORS.ERROR};
  color: ${COLORS.WHITE};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
  width: 20px;
  height: 20px;
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.md};
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserIcon = styled.div`
  cursor: pointer;
  color: ${COLORS.TEXT_PRIMARY};
  transition: color ${theme.transitions.fast};
  display: flex;
  align-items: center;

  &:hover {
    color: ${COLORS.PRIMARY};
  }

  &:hover > div:nth-child(2) {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${COLORS.BG_PRIMARY};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  min-width: 240px;
  margin-top: ${theme.spacing.md};
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all ${theme.transitions.fast};
  z-index: ${theme.zIndex.dropdown};
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  color: ${COLORS.TEXT_SECONDARY};
  font-weight: ${theme.fontWeights.semibold};
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};
`;

const DropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  color: ${COLORS.TEXT_PRIMARY};
  text-decoration: none;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${COLORS.BG_TERTIARY};
    color: ${COLORS.PRIMARY};
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: none;
  border: none;
  color: ${COLORS.TEXT_PRIMARY};
  cursor: pointer;
  text-align: left;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${COLORS.BG_TERTIARY};
    color: ${COLORS.ERROR};
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: ${COLORS.BG_TERTIARY};
`;

const AuthButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    gap: ${theme.spacing.sm};

    button {
      flex: 1;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${COLORS.TEXT_PRIMARY};
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${COLORS.PRIMARY};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavMenu = styled.nav`
  display: none;
  background: ${COLORS.BG_TERTIARY};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  gap: ${theme.spacing.md};
  flex-direction: column;
  width: 100%;
  order: 3;

  ${(props) => props.isOpen && `
    display: flex;
  `}
`;

const NavLink = styled(Link)`
  color: ${COLORS.TEXT_PRIMARY};
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${COLORS.BG_SECONDARY};
    color: ${COLORS.PRIMARY};
  }
`;

export default Header;
