import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import { Heading, Text } from '../components/ui/CommonStyles';
import logo from '../assets/logo1.png';

const About = () => {
  return (
    <AboutContainer>
      <ContentWrapper>
        <HeaderSection>
          <Logo src={logo} alt="Indilink" />
          <h1>About Indilink</h1>
        </HeaderSection>

        <Section>
          <h2>Our Story</h2>
          <Text>
            Indilink is a unique platform dedicated to connecting the global Indian diaspora with the rich and
            diverse craftsmanship of local artisans in India. Our mission is to bridge the gap between the Indian
            community abroad and the traditional artisans of India, ensuring that quality products and authentic
            cultural experiences are accessible to everyone, no matter where they are in the world.
          </Text>
        </Section>

        <Section>
          <h2>Our Mission</h2>
          <Text>
            At Indilink, we understand the challenges faced by the Indian diaspora when it comes to accessing
            traditional products and connecting with their cultural roots. Many are often left searching for reliable
            sources of high-quality Puja Samagri, traditional attires, and handcrafted items, while local artisans
            struggle with limited resources and high transportation costs. Our platform aims to solve these issues by
            providing a seamless connection between buyers and sellers, ensuring quality assurance and reasonable
            transit costs.
          </Text>
        </Section>

        <Section>
          <h2>What We Offer</h2>
          <OfferingsList>
            <OfferingItem>
              <strong>A Diverse Range of Products:</strong> From Puja Samagri to Handicrafts, Traditional Jewelry, and
              Sweets, our platform offers a wide variety of products that cater to your cultural and personal needs.
            </OfferingItem>
            <OfferingItem>
              <strong>Global Reach with Local Touch:</strong> We cover around 219 countries, offering a bridge between
              the Indian diaspora and local artisans across India.
            </OfferingItem>
            <OfferingItem>
              <strong>Quality Assurance:</strong> We prioritize quality by verifying products and sellers before they
              reach you.
            </OfferingItem>
            <OfferingItem>
              <strong>Seasonal and Cultural Relevance:</strong> Whether it's a wedding ceremony, festival needs, or
              seasonal preferences, Indilink caters to your specific needs.
            </OfferingItem>
            <OfferingItem>
              <strong>Support for Local Artisans:</strong> By connecting global buyers with local artisans, we support
              small businesses and preserve traditional crafts.
            </OfferingItem>
          </OfferingsList>
        </Section>

        <Section>
          <h2>Our Values</h2>
          <ValuesList>
            <ValueItem>
              <ValueTitle>Authenticity</ValueTitle>
              <p>We strive to provide genuine products that reflect the rich cultural heritage of India.</p>
            </ValueItem>
            <ValueItem>
              <ValueTitle>Quality</ValueTitle>
              <p>Our rigorous quality checks ensure that every item meets high standards.</p>
            </ValueItem>
            <ValueItem>
              <ValueTitle>Connection</ValueTitle>
              <p>We foster a deep connection between the Indian diaspora and their roots.</p>
            </ValueItem>
            <ValueItem>
              <ValueTitle>Sustainability</ValueTitle>
              <p>We support eco-friendly practices and sustainable products.</p>
            </ValueItem>
          </ValuesList>
        </Section>

        <Section>
          <h2>Join Our Community</h2>
          <Text>
            Become a part of the Indilink community and experience the vibrant culture of India from anywhere in the
            world. Whether you're looking for traditional attire, exquisite handicrafts, or unique gifts, Indilink is
            your gateway to a world of authentic Indian products and traditions. Explore our categories, discover new
            favorites, and stay connected with your cultural heritage.
          </Text>
        </Section>
      </ContentWrapper>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 240, 240, 0.95) 100%);
  min-height: calc(100vh - 200px);
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};

  h1 {
    font-size: ${theme.fontSizes['4xl']};
    background: ${COLORS.PRIMARY_GRADIENT};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: ${theme.spacing.lg} 0 0;
  }
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing['2xl']};

  h2 {
    font-size: ${theme.fontSizes['2xl']};
    color: ${COLORS.TEXT_PRIMARY};
    margin-bottom: ${theme.spacing.lg};
    border-bottom: 3px solid ${COLORS.PRIMARY_GREEN};
    padding-bottom: ${theme.spacing.md};
  }
`;

const OfferingsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const OfferingItem = styled.li`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${COLORS.PRIMARY_GREEN};
  box-shadow: ${theme.shadows.sm};
  transition: all ${theme.transitions.base};

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateX(4px);
  }
`;

const ValuesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`;

const ValueItem = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.lg};
  }

  p {
    margin: ${theme.spacing.md} 0 0;
    color: ${COLORS.TEXT_SECONDARY};
  }
`;

const ValueTitle = styled.h3`
  margin: 0;
  color: ${COLORS.PRIMARY_GREEN};
  font-size: ${theme.fontSizes.lg};
`;

export default About;
