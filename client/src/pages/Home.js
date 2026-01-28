import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { productService } from '../api/services';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import { Loading } from '../components/ui';
import { useCart } from '../context/CartContext';
import heroImage1 from '../assets/hero-image1.jpg';
import heroImage2 from '../assets/hero-image2.jpg';
import profilePic1 from '../assets/profile1.jpg';
import profilePic2 from '../assets/profile2.jpg';
import profilePic3 from '../assets/profile3.jpg';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await productService.getAll({ limit: 4 });
        setCategories(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const testimonials = [
    {
      id: 1,
      name: 'Aarti S.',
      text: 'Indilink helped me find authentic Indian handicrafts that remind me of home. The quality is exceptional!',
      color: COLORS.YELLOW,
      image: profilePic1,
    },
    {
      id: 2,
      name: 'Ramesh K.',
      text: 'As a seller, Indilink has given me a platform to showcase my products to a global audience. My business has grown significantly!',
      color: COLORS.PRIMARY_GREEN,
      image: profilePic2,
    },
    {
      id: 3,
      name: 'Neha P.',
      text: 'The process was seamless, and the customer service was excellent. I received my items on time and in perfect condition.',
      color: COLORS.BLUE,
      image: profilePic3,
    },
  ];

  if (loading) return <Loading />;

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <h1>Welcome to Indilink</h1>
            <p>Discover authentic Indian products directly from local artisans around the world</p>
            <Button as={Link} to="/products" size="lg">
              Shop Now
            </Button>
          </HeroText>
          <HeroImages>
            <img src={heroImage1} alt="Hero 1" />
            <img src={heroImage2} alt="Hero 2" />
          </HeroImages>
        </HeroContent>
      </HeroSection>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Section>
        <SectionTitle>Featured Products</SectionTitle>
        <ProductGrid>
          {categories.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <h3>{product.name}</h3>
                <Description>{product.description}</Description>
                <Price>₹{product.price?.toFixed(2) || '0.00'}</Price>
                <Button
                  fullWidth
                  onClick={() => addToCart(product)}
                  style={{ marginTop: theme.spacing.md }}
                >
                  Add to Cart
                </Button>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </Section>

      <Section>
        <SectionTitle>What Our Customers Say</SectionTitle>
        <TestimonialGrid>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} color={testimonial.color}>
              <ProfileImage src={testimonial.image} alt={testimonial.name} />
              <p>{testimonial.text}</p>
              <h4>- {testimonial.name}</h4>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </Section>

      <Section>
        <SectionTitle>Why Choose Indilink?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🌍</FeatureIcon>
            <h3>Global Reach</h3>
            <p>Serving customers across 219 countries</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>✨</FeatureIcon>
            <h3>Authentic Products</h3>
            <p>Direct from local artisans and craftspeople</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🛡️</FeatureIcon>
            <h3>Quality Assured</h3>
            <p>Rigorous quality checks on all products</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>💝</FeatureIcon>
            <h3>Support Artisans</h3>
            <p>Fair trade and sustainable practices</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 240, 240, 0.95) 100%);
`;

const HeroSection = styled.section`
  background: ${COLORS.PRIMARY_GRADIENT};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  margin: ${theme.spacing.xl};
`;

const HeroContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HeroText = styled.div`
  animation: ${fadeIn} 0.6s ease-out;

  h1 {
    font-size: ${theme.fontSizes['4xl']};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const HeroImages = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
  animation: ${fadeIn} 0.6s ease-out 0.2s backwards;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.lg};

    @media (max-width: 768px) {
      height: 200px;
    }
  }
`;

const Section = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.spacing.xl};
  background: ${COLORS.PRIMARY_GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`;

const ProductCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};
  animation: ${fadeIn} 0.5s ease-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: ${theme.spacing.lg};

  h3 {
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing.sm};
  }
`;

const Description = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.md};
`;

const Price = styled.div`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${COLORS.PRIMARY_GREEN};
  margin-bottom: ${theme.spacing.md};
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const TestimonialCard = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  border-left: 4px solid ${(props) => props.color};
  transition: all ${theme.transitions.base};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }

  p {
    margin: ${theme.spacing.md} 0;
    font-style: italic;
    color: ${COLORS.TEXT_SECONDARY};
  }

  h4 {
    margin: 0;
    color: ${COLORS.TEXT_PRIMARY};
  }
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: ${theme.spacing.md};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`;

const FeatureCard = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.lg};
  }

  h3 {
    margin: ${theme.spacing.md} 0 ${theme.spacing.sm};
  }

  p {
    color: ${COLORS.TEXT_SECONDARY};
    margin: 0;
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
`;

const ErrorMessage = styled.div`
  background-color: rgba(220, 0, 115, 0.1);
  border-left: 4px solid ${COLORS.RED};
  color: ${COLORS.RED};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing.lg};
  text-align: center;
`;

export default Home;
