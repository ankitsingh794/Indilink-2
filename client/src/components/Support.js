import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import { FiChevronDown, FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import Button from './ui/Button';

const Support = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(0);

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Browse our product catalog, add items to your cart, and proceed to checkout. You can pay securely using Stripe.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer 30-day returns on all products. Items must be in original condition and unused.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. Expedited shipping (2-3 days) is available at checkout.'
    },
    {
      question: 'Are your products authentic?',
      answer: 'Yes! All sellers are verified and their products are guaranteed to be authentic handcrafted items.'
    },
    {
      question: 'How do I become a seller?',
      answer: 'Click "Register" and select "Become a Seller". Complete the verification process to start selling.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, all transactions are encrypted and processed securely through Stripe. Your information is never stored.'
    }
  ];

  return (
    <SupportContainer>
      {/* Hero */}
      <HeroSection>
        <HeroContent>
          <h1>Support Center</h1>
          <p>We're here to help! Find answers to common questions or contact us directly.</p>
        </HeroContent>
      </HeroSection>

      {/* Contact Info */}
      <ContactSection>
        <ContactGrid>
          <ContactCard>
            <ContactIcon><FiMail size={32} /></ContactIcon>
            <ContactTitle>Email</ContactTitle>
            <ContactValue>support@indilink.com</ContactValue>
            <ContactDesc>Average response time: 24 hours</ContactDesc>
          </ContactCard>
          <ContactCard>
            <ContactIcon><FiPhone size={32} /></ContactIcon>
            <ContactTitle>Phone</ContactTitle>
            <ContactValue>+91-033-INDILINK</ContactValue>
            <ContactDesc>Mon-Fri: 9AM-6PM IST</ContactDesc>
          </ContactCard>
          <ContactCard>
            <ContactIcon><FiMapPin size={32} /></ContactIcon>
            <ContactTitle>Location</ContactTitle>
            <ContactValue>Kolkata, India</ContactValue>
            <ContactDesc>International Support Available</ContactDesc>
          </ContactCard>
          <ContactCard>
            <ContactIcon><FiClock size={32} /></ContactIcon>
            <ContactTitle>Hours</ContactTitle>
            <ContactValue>24/7 Online Support</ContactValue>
            <ContactDesc>Live chat available anytime</ContactDesc>
          </ContactCard>
        </ContactGrid>
      </ContactSection>

      {/* Contact Form */}
      <FormSection>
        <FormContent>
          <h2>Send us a Message</h2>
          <ContactForm>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" placeholder="Your name" />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" placeholder="your@email.com" />
            </FormGroup>
            <FormGroup>
              <Label>Subject</Label>
              <Select>
                <option>Select a topic</option>
                <option>Order Issue</option>
                <option>Product Question</option>
                <option>Seller Inquiry</option>
                <option>Other</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Message</Label>
              <Textarea placeholder="Tell us how we can help..." rows={5} />
            </FormGroup>
            <Button type="submit">Send Message</Button>
          </ContactForm>
        </FormContent>
      </FormSection>

      {/* FAQs */}
      <FAQSection>
        <h2>Frequently Asked Questions</h2>
        <FAQList>
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion
                onClick={() => setExpandedFAQ(expandedFAQ === index ? -1 : index)}
                expanded={expandedFAQ === index}
              >
                <span>{faq.question}</span>
                <ChevronIcon expanded={expandedFAQ === index}>
                  <FiChevronDown size={24} />
                </ChevronIcon>
              </FAQQuestion>
              {expandedFAQ === index && (
                <FAQAnswer>{faq.answer}</FAQAnswer>
              )}
            </FAQItem>
          ))}
        </FAQList>
      </FAQSection>
    </SupportContainer>
  );
};

const SupportContainer = styled.div`
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
  }

  p {
    font-size: ${theme.fontSizes.xl};
    opacity: 0.95;
    margin: 0;
  }
`;

const ContactSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  background: ${COLORS.BG_PRIMARY};
`;

const ContactGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${theme.spacing['2xl']};
`;

const ContactCard = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const ContactIcon = styled.div`
  color: ${COLORS.PRIMARY};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  justify-content: center;
`;

const ContactTitle = styled.h3`
  margin: 0 0 ${theme.spacing.md} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
`;

const ContactValue = styled.p`
  margin: 0 0 ${theme.spacing.sm} 0;
  color: ${COLORS.PRIMARY};
  font-weight: ${theme.fontWeights.semibold};
`;

const ContactDesc = styled.p`
  margin: 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const FormSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  background: ${COLORS.BG_SECONDARY};
`;

const FormContent = styled.div`
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: ${theme.fontSizes['2xl']};
    font-weight: ${theme.fontWeights.bold};
    color: ${COLORS.TEXT_PRIMARY};
    margin-bottom: ${theme.spacing['2xl']};
    text-align: center;
  }
`;

const ContactForm = styled.form`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  color: ${COLORS.TEXT_PRIMARY};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  background: ${COLORS.WHITE};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  font-family: inherit;
  resize: vertical;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FAQSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  background: ${COLORS.BG_PRIMARY};
  max-width: 900px;
  margin: 0 auto;

  h2 {
    font-size: ${theme.fontSizes['3xl']};
    font-weight: ${theme.fontWeights.bold};
    text-align: center;
    color: ${COLORS.TEXT_PRIMARY};
    margin-bottom: ${theme.spacing['3xl']};
  }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FAQItem = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: ${theme.spacing.lg};
  background: ${props => props.expanded ? COLORS.BG_SECONDARY : COLORS.WHITE};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.md};
  transition: background ${theme.transitions.fast};
  text-align: left;

  &:hover {
    background: ${COLORS.BG_SECONDARY};
  }

  span {
    font-size: ${theme.fontSizes.base};
    font-weight: ${theme.fontWeights.semibold};
    color: ${COLORS.TEXT_PRIMARY};
    margin: 0;
  }
`;

const ChevronIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.PRIMARY};
  transition: transform ${theme.transitions.fast};
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const FAQAnswer = styled.div`
  padding: ${theme.spacing.lg};
  background: ${COLORS.BG_SECONDARY};
  color: ${COLORS.TEXT_SECONDARY};
  line-height: 1.6;
  border-top: 1px solid ${COLORS.BG_TERTIARY};
`;

export default Support;
