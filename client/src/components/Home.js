import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FiTrendingUp, FiAward, FiTruck, FiShield } from "react-icons/fi";
import Button from "./ui/Button";
import { COLORS } from "../config/constants";
import { theme } from "../styles/theme";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const result = await response.json();
        if (result.status && Array.isArray(result.data)) {
          const selectedCategories = result.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
          setCategories(selectedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroText>
            <HeroTitle>Welcome to Indilink</HeroTitle>
            <HeroSubtitle>Authentic. Handcrafted. Global.</HeroSubtitle>
            <HeroDescription>
              Discover authentic Indian handicrafts, artisan products, and cultural treasures from sellers worldwide.
            </HeroDescription>
            <Button as={Link} to="/products">
              Explore Collections
            </Button>
          </HeroText>
          <HeroVisual>
            <HeroCard>✨ Authentic Products</HeroCard>
            <HeroCard>🌍 Global Community</HeroCard>
            <HeroCard>🎨 Artisan Crafted</HeroCard>
          </HeroVisual>
        </HeroContent>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <FeatureGrid>
          <FeatureItem>
            <FeatureIcon><FiTruck size={32} /></FeatureIcon>
            <FeatureTitle>Free Shipping</FeatureTitle>
            <FeatureDesc>Free shipping on orders over ₹500</FeatureDesc>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon><FiShield size={32} /></FeatureIcon>
            <FeatureTitle>Secure Payments</FeatureTitle>
            <FeatureDesc>100% secure transactions with encryption</FeatureDesc>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon><FiAward size={32} /></FeatureIcon>
            <FeatureTitle>Quality Assured</FeatureTitle>
            <FeatureDesc>Verified sellers with quality guarantee</FeatureDesc>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon><FiTrendingUp size={32} /></FeatureIcon>
            <FeatureTitle>Growing Community</FeatureTitle>
            <FeatureDesc>Join thousands of satisfied customers</FeatureDesc>
          </FeatureItem>
        </FeatureGrid>
      </FeaturesSection>

      {/* Categories Section */}
      <CategoriesSection>
        <SectionTitle>Shop by Category</SectionTitle>
        <CategoryGrid>
          {categories.map((category) => (
            <CategoryCard key={category.id} as={Link} to={`/products?category=${category.id}`}>
              <CategoryName>{category.category_name}</CategoryName>
              <CategoryArrow>→</CategoryArrow>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </CategoriesSection>

      {/* Call to Action Section */}
      <CTASection>
        <CTAContent>
          <CTATitle>Become a Seller</CTATitle>
          <CTADescription>Reach millions of customers and grow your artisan business globally</CTADescription>
          <Button as={Link} to="/register" variant="outlined">
            Start Selling Today
          </Button>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroSection = styled.section`
  background: ${COLORS.PRIMARY_GRADIENT};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['4xl']};
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const HeroText = styled.div`
  animation: ${slideUp} 0.8s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.2;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing.md};
  opacity: 0.95;
`;

const HeroDescription = styled.p`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing['2xl']};
  opacity: 0.9;
  line-height: 1.6;
  max-width: 500px;
`;

const HeroVisual = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.lg};
  animation: ${slideUp} 0.8s ease-out 0.2s backwards;
`;

const HeroCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  transition: all ${theme.transitions.base};

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const FeaturesSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  background: ${COLORS.BG_SECONDARY};
`;

const FeatureGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing['2xl']};
`;

const FeatureItem = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  transition: all ${theme.transitions.base};

  &:hover {
    transform: translateY(-8px);
  }
`;

const FeatureIcon = styled.div`
  color: ${COLORS.PRIMARY};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  justify-content: center;
`;

const FeatureTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing.sm};
  color: ${COLORS.TEXT_PRIMARY};
`;

const FeatureDesc = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.6;
`;

const CategoriesSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  background: ${COLORS.BG_PRIMARY};
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

const CategoryGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
`;

const CategoryCard = styled(Link)`
  background: linear-gradient(135deg, ${COLORS.BG_TERTIARY}, ${COLORS.BG_SECONDARY});
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;
  color: ${COLORS.TEXT_PRIMARY};
  transition: all ${theme.transitions.base};
  border: 1px solid ${COLORS.PRIMARY_LIGHT};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${theme.spacing.md};
  min-height: 150px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${COLORS.PRIMARY};
    background: linear-gradient(135deg, ${COLORS.PRIMARY}, ${COLORS.ACCENT});
    color: ${COLORS.WHITE};
  }
`;

const CategoryName = styled.span`
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.base};
`;

const CategoryArrow = styled.span`
  font-size: ${theme.fontSizes.lg};
  transition: transform ${theme.transitions.fast};
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
`;

const CTATitle = styled.h2`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.lg};
`;

const CTADescription = styled.p`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing['2xl']};
  opacity: 0.95;
  line-height: 1.6;
`;

export default Home;
