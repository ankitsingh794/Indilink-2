import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import { FiChevronDown, FiSearch } from 'react-icons/fi';

const FAQPage = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: 'General Questions',
      items: [
        {
          question: 'What is Indilink?',
          answer: 'Indilink is a global e-commerce platform dedicated to connecting authentic Indian artisans and craftspeople with customers worldwide. We showcase handcrafted products from across India with a focus on quality, authenticity, and fair trade practices.'
        },
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking the "Sign Up" button on our homepage. Fill in your details, choose your user type (Buyer or Seller), and verify your email address to get started.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use industry-standard SSL encryption to protect your personal and payment information. All transactions are securely processed through trusted payment gateways.'
        },
        {
          question: 'Can I browse products without an account?',
          answer: 'Yes, you can browse our catalog without creating an account. However, to make purchases or save items to your wishlist, you\'ll need to register.'
        }
      ]
    },
    {
      title: 'Ordering & Checkout',
      items: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payments are processed securely.'
        },
        {
          question: 'Can I change my order after placing it?',
          answer: 'Orders can be modified within 1 hour of placement. After that, you\'ll need to contact our customer service team. If your order has already shipped, you\'ll need to arrange a return.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. You\'ll see the exact costs during checkout.'
        },
        {
          question: 'Is there a minimum order amount?',
          answer: 'No, there\'s no minimum order requirement. However, orders under ₹500 may have higher shipping costs. We offer free shipping on orders over ₹1000!'
        }
      ]
    },
    {
      title: 'Shipping & Delivery',
      items: [
        {
          question: 'How long does delivery take?',
          answer: 'Domestic delivery typically takes 3-7 business days, while international shipping takes 10-21 business days depending on the destination country.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package in real-time.'
        },
        {
          question: 'What if my order doesn\'t arrive?',
          answer: 'Contact our support team immediately if your order doesn\'t arrive within the expected timeframe. We\'ll investigate and arrange a replacement or refund.'
        },
        {
          question: 'Do you offer express shipping?',
          answer: 'Yes, express shipping options are available for most locations at an additional cost. Select this option during checkout for faster delivery.'
        }
      ]
    },
    {
      title: 'Returns & Refunds',
      items: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy on all products. Items must be in original condition with packaging intact. Return shipping is free for defective items.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Go to "My Orders" in your account, select the item, and click "Request Return". Our team will provide you with a prepaid return label.'
        },
        {
          question: 'How long does the refund process take?',
          answer: 'We process refunds within 5-7 business days of receiving your returned item. The refund will be credited to your original payment method.'
        },
        {
          question: 'What if I received a damaged item?',
          answer: 'Contact us immediately with photos of the damage. We\'ll arrange a replacement or full refund at no cost to you.'
        }
      ]
    },
    {
      title: 'Seller Information',
      items: [
        {
          question: 'How do I become a seller on Indilink?',
          answer: 'Click "Become a Seller" on our homepage, provide your business details, and submit required documentation. Our team will verify and activate your account within 3-5 business days.'
        },
        {
          question: 'What are the seller fees?',
          answer: 'We charge a 5-8% commission on each sale depending on your product category. There are no upfront listing fees or monthly subscriptions.'
        },
        {
          question: 'How do I list my products?',
          answer: 'Once approved as a seller, use our seller dashboard to add products. Fill in product details, upload high-quality images, and set prices. Your products will be live immediately.'
        },
        {
          question: 'When do I get paid?',
          answer: 'We process payouts every 2 weeks for orders received in the previous period. Payments are sent to your registered bank account.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories
    .map(category => ({
      ...category,
      items: category.items.filter(
        item =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.items.length > 0);

  const toggleExpand = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Frequently Asked Questions</HeroTitle>
          <HeroDescription>
            Find answers to common questions about our products, ordering, shipping, and more.
          </HeroDescription>
          
          <SearchContainer>
            <SearchIcon>
              <FiSearch size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </HeroContent>
      </HeroSection>

      <Container>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, categoryIndex) => (
            <CategorySection key={categoryIndex}>
              <CategoryTitle>{category.title}</CategoryTitle>
              
              <AccordionList>
                {category.items.map((item, itemIndex) => {
                  const isExpanded = expandedItems[`${categoryIndex}-${itemIndex}`];
                  
                  return (
                    <AccordionItem key={itemIndex}>
                      <AccordionButton
                        onClick={() => toggleExpand(categoryIndex, itemIndex)}
                        expanded={isExpanded}
                      >
                        <QuestionText>{item.question}</QuestionText>
                        <ChevronIcon expanded={isExpanded}>
                          <FiChevronDown size={20} />
                        </ChevronIcon>
                      </AccordionButton>
                      
                      <AnswerContainer expanded={isExpanded}>
                        <AnswerText>{item.answer}</AnswerText>
                      </AnswerContainer>
                    </AccordionItem>
                  );
                })}
              </AccordionList>
            </CategorySection>
          ))
        ) : (
          <NoResults>
            <NoResultsTitle>No results found</NoResultsTitle>
            <NoResultsText>
              We couldn't find any FAQs matching "{searchTerm}". Try searching with different keywords.
            </NoResultsText>
          </NoResults>
        )}

        <CTASection>
          <CTATitle>Still have questions?</CTATitle>
          <CTADescription>
            Can't find the answer you're looking for? Our support team is here to help.
          </CTADescription>
          <CTAButton href="/support">Contact Support</CTAButton>
        </CTASection>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
`;

const HeroSection = styled.div`
  background: ${COLORS.PRIMARY_GRADIENT};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.bold};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['2xl']};
  }
`;

const HeroDescription = styled.p`
  margin: 0 0 ${theme.spacing['2xl']} 0;
  font-size: ${theme.fontSizes.lg};
  opacity: 0.9;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: ${COLORS.TEXT_SECONDARY};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing['3xl']};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  background: ${COLORS.WHITE};
  color: ${COLORS.TEXT_PRIMARY};
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
`;

const CategorySection = styled.div`
  margin-bottom: ${theme.spacing['3xl']};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h2`
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${COLORS.BG_TERTIARY};
`;

const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const AccordionItem = styled.div`
  background: ${COLORS.WHITE};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${COLORS.PRIMARY};
    box-shadow: ${theme.shadows.md};
  }
`;

const AccordionButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.lg} ${theme.spacing.lg};
  background: ${props => props.expanded ? COLORS.BG_SECONDARY : 'transparent'};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${COLORS.BG_SECONDARY};
  }
`;

const QuestionText = styled.span`
  color: ${COLORS.TEXT_PRIMARY};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.base};
  text-align: left;
`;

const ChevronIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.PRIMARY};
  transition: transform ${theme.transitions.fast};
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0)'};
  flex-shrink: 0;
  margin-left: ${theme.spacing.md};
`;

const AnswerContainer = styled.div`
  max-height: ${props => props.expanded ? '500px' : '0'};
  overflow: hidden;
  transition: max-height ${theme.transitions.base};
`;

const AnswerText = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.base};
  line-height: 1.8;
  padding: 0 ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.lg};
  margin: 0;
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
`;

const NoResultsTitle = styled.h3`
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.xl};
  margin: 0 0 ${theme.spacing.md} 0;
`;

const NoResultsText = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.base};
  margin: 0;
`;

const CTASection = styled.div`
  background: ${COLORS.PRIMARY_GRADIENT};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  text-align: center;
  margin-top: ${theme.spacing['4xl']};
`;

const CTATitle = styled.h3`
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
`;

const CTADescription = styled.p`
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.fontSizes.base};
  opacity: 0.9;
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: ${theme.spacing.md} ${theme.spacing['2xl']};
  background: ${COLORS.WHITE};
  color: ${COLORS.PRIMARY};
  text-decoration: none;
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fontWeights.semibold};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

export default FAQPage;
