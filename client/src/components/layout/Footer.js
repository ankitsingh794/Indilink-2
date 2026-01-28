import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../config/constants';
import { theme } from '../../styles/theme';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>About Indilink</SectionTitle>
          <SectionDesc>
            Connecting the global Indian diaspora with authentic products and traditional craftsmanship. We bridge cultures and support artisans worldwide.
          </SectionDesc>
          <SocialLinks>
            <SocialLink href="#facebook" aria-label="Facebook">
              <FiFacebook />
            </SocialLink>
            <SocialLink href="#twitter" aria-label="Twitter">
              <FiTwitter />
            </SocialLink>
            <SocialLink href="#instagram" aria-label="Instagram">
              <FiInstagram />
            </SocialLink>
            <SocialLink href="#linkedin" aria-label="LinkedIn">
              <FiLinkedin />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Quick Links</SectionTitle>
          <LinkList>
            <LinkItem><Link to="/">Home</Link></LinkItem>
            <LinkItem><Link to="/about">About Us</Link></LinkItem>
            <LinkItem><Link to="/products">Products</Link></LinkItem>
            <LinkItem><Link to="/support">Support</Link></LinkItem>
            <LinkItem><Link to="/seller-center">Become a Seller</Link></LinkItem>
          </LinkList>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Customer Service</SectionTitle>
          <LinkList>
            <LinkItem><Link to="/profile">Track Orders</Link></LinkItem>
            <LinkItem><Link to="/shipping-returns">Returns & Refunds</Link></LinkItem>
            <LinkItem><Link to="/shipping-returns">Shipping Info</Link></LinkItem>
            <LinkItem><Link to="/faq">FAQ</Link></LinkItem>
            <LinkItem><Link to="/support">Contact Us</Link></LinkItem>
          </LinkList>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Contact Info</SectionTitle>
          <ContactItem>
            <FiPhone size={18} />
            <div>
              <ContactLabel>Phone</ContactLabel>
              <ContactValue href="tel:+913340123456">+91 (033) 4012-3456</ContactValue>
            </div>
          </ContactItem>
          <ContactItem>
            <FiMail size={18} />
            <div>
              <ContactLabel>Email</ContactLabel>
              <ContactValue href="mailto:support@indilink.com">support@indilink.com</ContactValue>
            </div>
          </ContactItem>
          <ContactItem>
            <FiMapPin size={18} />
            <div>
              <ContactLabel>Address</ContactLabel>
              <ContactValue>Sector V, Salt Lake, Kolkata, West Bengal 700091</ContactValue>
            </div>
          </ContactItem>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <BottomContent>
          <CopyRight>&copy; {currentYear} Indilink. All rights reserved.</CopyRight>
          <PolicyLinks>
            <PolicyLink href="#privacy">Privacy Policy</PolicyLink>
            <PolicyDivider>•</PolicyDivider>
            <PolicyLink href="#terms">Terms of Service</PolicyLink>
            <PolicyDivider>•</PolicyDivider>
            <PolicyLink href="#cookies">Cookie Policy</PolicyLink>
          </PolicyLinks>
        </BottomContent>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${COLORS.BG_SECONDARY} 0%, ${COLORS.BG_TERTIARY} 100%);
  color: ${COLORS.TEXT_PRIMARY};
  margin-top: auto;
  border-top: 1px solid ${COLORS.BG_TERTIARY};
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
    gap: ${theme.spacing.xl};
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.PRIMARY};
  margin: 0;
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${COLORS.PRIMARY};
`;

const SectionDesc = styled.p`
  font-size: ${theme.fontSizes.sm};
  line-height: 1.8;
  color: ${COLORS.TEXT_SECONDARY};
  margin: 0;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const LinkItem = styled.li`
  a {
    color: ${COLORS.TEXT_SECONDARY};
    text-decoration: none;
    font-size: ${theme.fontSizes.sm};
    transition: all ${theme.transitions.fast};
    display: inline-block;

    &:hover {
      color: ${COLORS.PRIMARY};
      transform: translateX(4px);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: ${COLORS.PRIMARY_GRADIENT};
  color: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const ContactItem = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: flex-start;
  color: ${COLORS.TEXT_SECONDARY};
`;

const ContactLabel = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${COLORS.TEXT_LIGHT};
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
`;

const ContactValue = styled.a`
  color: ${COLORS.TEXT_SECONDARY};
  text-decoration: none;
  font-size: ${theme.fontSizes.sm};
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${COLORS.PRIMARY};
  }
`;

const FooterBottom = styled.div`
  background: ${COLORS.TEXT_PRIMARY};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  border-top: 1px solid ${COLORS.BG_TERTIARY};
`;

const BottomContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
  }
`;

const CopyRight = styled.p`
  margin: 0;
  font-size: ${theme.fontSizes.sm};
`;

const PolicyLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const PolicyLink = styled.a`
  color: ${COLORS.WHITE};
  text-decoration: none;
  font-size: ${theme.fontSizes.sm};
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${COLORS.PRIMARY_LIGHT};
  }
`;

const PolicyDivider = styled.span`
  color: ${COLORS.TEXT_SECONDARY};
`;

export default Footer;
