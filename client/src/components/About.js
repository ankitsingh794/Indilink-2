import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import { FiUsers, FiTarget, FiHeart, FiAward } from 'react-icons/fi';
import Button from './ui/Button';

const About = () => {
  return (
    <AboutContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <h1>About Indilink</h1>
          <p>Bridging cultures, supporting artisans, and celebrating authentic craftsmanship globally</p>
        </HeroContent>
      </HeroSection>

      {/* Mission Section */}
      <MissionSection>
        <SectionTitle>Our Mission</SectionTitle>
        <MissionGrid>
          <MissionCard>
            <MissionIcon><FiTarget size={40} /></MissionIcon>
            <h3>Empower Artisans</h3>
            <p>Provide a global platform for skilled craftspeople to reach worldwide customers and grow their businesses sustainably.</p>
          </MissionCard>
          <MissionCard>
            <MissionIcon><FiUsers size={40} /></MissionIcon>
            <h3>Connect Cultures</h3>
            <p>Bridge the gap between artisans and global consumers who appreciate authentic, handcrafted products with cultural significance.</p>
          </MissionCard>
          <MissionCard>
            <MissionIcon><FiHeart size={40} /></MissionIcon>
            <h3>Preserve Traditions</h3>
            <p>Help preserve traditional crafts and cultural heritage by making these unique products accessible to a worldwide audience.</p>
          </MissionCard>
          <MissionCard>
            <MissionIcon><FiAward size={40} /></MissionIcon>
            <h3>Ensure Quality</h3>
            <p>Maintain strict quality standards and verify all sellers to ensure customers receive authentic, high-quality products.</p>
          </MissionCard>
        </MissionGrid>
      </MissionSection>

      {/* Story Section */}
      <StorySection>
        <StoryContent>
          <h2>Our Story</h2>
          <p>
            Indilink was founded with a simple vision: to connect the world with authentic Indian handicrafts and artisan products. 
            We started as a small initiative to support local artisans and have grown into a vibrant global marketplace.
          </p>
          <p>
            Today, Indilink connects thousands of skilled craftspeople with customers across the globe, making traditional arts 
            and cultural products accessible while supporting sustainable livelihoods in artisan communities.
          </p>
        </StoryContent>
        <StatsGrid>
          <StatCard>
            <StatNumber>5000+</StatNumber>
            <StatLabel>Active Sellers</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>50000+</StatNumber>
            <StatLabel>Products</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>100K+</StatNumber>
            <StatLabel>Happy Customers</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>50+</StatNumber>
            <StatLabel>Countries</StatLabel>
          </StatCard>
        </StatsGrid>
      </StorySection>

      {/* CTA Section */}
      <CTASection>
        <CTAContent>
          <h2>Join Our Community</h2>
          <p>Whether you're an artisan looking to share your creations or a customer seeking authentic products, there's a place for you at Indilink.</p>
          <ButtonGroup>
            <Button as={Link} to="/register">
              Start Selling
            </Button>
            <Button as={Link} to="/products" variant="outlined">
              Shop Now
            </Button>
          </ButtonGroup>
        </CTAContent>
      </CTASection>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
`;

const HeroSection = styled.section`
  background: ${COLORS.PRIMARY_GRADIENT};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  h1 {
    font-size: ${theme.fontSizes['4xl']};
    font-weight: ${theme.fontWeights.bold};
    margin-bottom: ${theme.spacing.lg};
    line-height: 1.2;
  }

  p {
    font-size: ${theme.fontSizes.xl};
    opacity: 0.95;
    line-height: 1.6;
    margin: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;
  color: ${COLORS.TEXT_PRIMARY};
  margin-bottom: ${theme.spacing['3xl']};
  position: relative;
  padding-bottom: ${theme.spacing.lg};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: ${COLORS.PRIMARY_GRADIENT};
    border-radius: ${theme.borderRadius.full};
  }
`;

const MissionSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  background: ${COLORS.BG_PRIMARY};
`;

const MissionGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing['2xl']};
`;

const MissionCard = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const MissionIcon = styled.div`
  color: ${COLORS.PRIMARY};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  justify-content: center;
`;

const StorySection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  background: ${COLORS.BG_SECONDARY};
`;

const StoryContent = styled.div`
  max-width: 800px;
  margin: 0 auto ${theme.spacing['3xl']} auto;

  h2 {
    font-size: ${theme.fontSizes['3xl']};
    font-weight: ${theme.fontWeights.bold};
    color: ${COLORS.TEXT_PRIMARY};
    margin-bottom: ${theme.spacing.lg};
  }

  p {
    color: ${COLORS.TEXT_SECONDARY};
    line-height: 1.8;
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing.lg};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing['2xl']};
`;

const StatCard = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${theme.shadows.md};
`;

const StatNumber = styled.p`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.PRIMARY};
  margin: 0 0 ${theme.spacing.md} 0;
`;

const StatLabel = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.base};
  margin: 0;
`;

const CTASection = styled.section`
  background: ${COLORS.SECONDARY_GRADIENT};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: ${theme.fontSizes['3xl']};
    font-weight: ${theme.fontWeights.bold};
    margin-bottom: ${theme.spacing.lg};
  }

  p {
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing['2xl']};
    opacity: 0.95;
    line-height: 1.6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
`;

export default About;
