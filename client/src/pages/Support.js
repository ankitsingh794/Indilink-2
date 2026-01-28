import React, { useState } from 'react';
import styled from 'styled-components';
import { supportService } from '../api/services';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import { FormGroup, Label, Input, Textarea } from '../components/ui/CommonStyles';
import { useForm } from '../hooks/useCustomHooks';
import { getErrorMessage } from '../utils/helpers';

const Support = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useForm(
    { name: '', email: '', message: '' },
    async (formData) => {
      try {
        await supportService.submitQuery(formData);
        setSuccessMessage('Your query has been submitted successfully. We will respond within 24 hours.');
        setErrorMessage('');
        // Reset form
        Object.keys(formData).forEach((key) => {
          formData[key] = '';
        });
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
        setSuccessMessage('');
      }
    }
  );

  return (
    <SupportContainer>
      <ContentWrapper>
        <h1>Support Center</h1>
        <p>We're here to help! Contact us for any inquiries or assistance.</p>

        <SupportGrid>
          <InfoSection>
            <h2>Get in Touch</h2>

            <ContactCard>
              <Icon>📧</Icon>
              <div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:support@indilink.com">support@indilink.com</a>
                </p>
                <small>Response time: 24 hours</small>
              </div>
            </ContactCard>

            <ContactCard>
              <Icon>📞</Icon>
              <div>
                <h3>Phone</h3>
                <p>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </p>
                <small>Monday - Friday, 9 AM - 6 PM IST</small>
              </div>
            </ContactCard>

            <h2 style={{ marginTop: theme.spacing.xl }}>FAQ</h2>
            <FAQList>
              <FAQItem>
                <Question>How long does shipping take?</Question>
                <Answer>Shipping typically takes 5-15 business days depending on your location.</Answer>
              </FAQItem>
              <FAQItem>
                <Question>What is your return policy?</Question>
                <Answer>We offer 30 days returns from the date of purchase for unused items.</Answer>
              </FAQItem>
              <FAQItem>
                <Question>Do you ship internationally?</Question>
                <Answer>Yes, we ship to over 219 countries worldwide.</Answer>
              </FAQItem>
              <FAQItem>
                <Question>How can I track my order?</Question>
                <Answer>You can track your order using the tracking number sent to your email.</Answer>
              </FAQItem>
            </FAQList>
          </InfoSection>

          <FormSection>
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>

            {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
            {errorMessage && <ErrorAlert>{errorMessage}</ErrorAlert>}

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.message && errors.message}
                  required
                />
              </FormGroup>

              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </Form>
          </FormSection>
        </SupportGrid>
      </ContentWrapper>
    </SupportContainer>
  );
};

const SupportContainer = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 240, 240, 0.95) 100%);
  min-height: calc(100vh - 200px);
  padding: ${theme.spacing.xl};
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: ${theme.fontSizes['3xl']};
    color: ${COLORS.TEXT_PRIMARY};
    margin-bottom: ${theme.spacing.md};
  }

  > p {
    font-size: ${theme.fontSizes.lg};
    color: ${COLORS.TEXT_SECONDARY};
    margin-bottom: ${theme.spacing.xl};
  }
`;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const InfoSection = styled.div`
  h2 {
    font-size: ${theme.fontSizes['2xl']};
    color: ${COLORS.TEXT_PRIMARY};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const ContactCard = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }

  h3 {
    margin: 0 0 ${theme.spacing.sm};
    color: ${COLORS.PRIMARY_GREEN};
  }

  p {
    margin: 0;
  }

  a {
    color: ${COLORS.BLUE};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  small {
    display: block;
    color: ${COLORS.TEXT_SECONDARY};
    margin-top: ${theme.spacing.xs};
  }
`;

const Icon = styled.div`
  font-size: 2rem;
  min-width: 50px;
  display: flex;
  align-items: center;
`;

const FAQList = styled.div``;

const FAQItem = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border-left: 4px solid ${COLORS.YELLOW};

  &:hover {
    box-shadow: ${theme.shadows.md};
  }
`;

const Question = styled.h3`
  margin: 0 0 ${theme.spacing.sm};
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.base};
`;

const Answer = styled.p`
  margin: 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.6;
`;

const FormSection = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  height: fit-content;

  h2 {
    margin: 0 0 ${theme.spacing.md};
    color: ${COLORS.TEXT_PRIMARY};
    font-size: ${theme.fontSizes['2xl']};
  }

  > p {
    margin: 0 0 ${theme.spacing.lg};
    color: ${theme.fontSizes.sm};
  }
`;

const Form = styled.form``;

const SuccessAlert = styled.div`
  background-color: rgba(4, 231, 98, 0.1);
  border-left: 4px solid ${COLORS.PRIMARY_GREEN};
  color: ${COLORS.PRIMARY_GREEN};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.sm};
`;

const ErrorAlert = styled.div`
  background-color: rgba(220, 0, 115, 0.1);
  border-left: 4px solid ${COLORS.RED};
  color: ${COLORS.RED};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.sm};
`;

export default Support;
