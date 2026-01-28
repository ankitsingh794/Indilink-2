import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import { FiTruck, FiRotateCcw, FiClock, FiCheck } from 'react-icons/fi';

const ShippingReturnsPage = () => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Shipping & Returns Policy</HeroTitle>
          <HeroDescription>
            We're committed to getting your order to you quickly and safely. Learn about our shipping and return policies.
          </HeroDescription>
        </HeroContent>
      </HeroSection>

      <Container>
        {/* Shipping Section */}
        <Section>
          <SectionHeader>
            <SectionIcon><FiTruck size={32} /></SectionIcon>
            <SectionTitle>Shipping Information</SectionTitle>
          </SectionHeader>

          <ContentGrid>
            <Card>
              <CardIcon>📍</CardIcon>
              <CardTitle>Domestic Shipping</CardTitle>
              <CardText>
                Orders placed within India are typically delivered within 3-7 business days. Shipping costs vary based on weight and destination.
              </CardText>
            </Card>

            <Card>
              <CardIcon>🌍</CardIcon>
              <CardTitle>International Shipping</CardTitle>
              <CardText>
                We ship to over 50 countries worldwide. International orders typically take 10-21 business days depending on the destination.
              </CardText>
            </Card>

            <Card>
              <CardIcon>🚚</CardIcon>
              <CardTitle>Free Shipping</CardTitle>
              <CardText>
                Orders over ₹1000 qualify for FREE standard shipping both domestically and internationally. No coupon code needed!
              </CardText>
            </Card>

            <Card>
              <CardIcon>⚡</CardIcon>
              <CardTitle>Express Shipping</CardTitle>
              <CardText>
                Need your order faster? Express shipping options available for most locations. Available at checkout for an additional fee.
              </CardText>
            </Card>
          </ContentGrid>

          <DetailSection>
            <DetailTitle>Shipping Timeline</DetailTitle>
            <Timeline>
              <TimelineItem>
                <TimelineNumber>1</TimelineNumber>
                <TimelineText>
                  <TimelineLabel>Processing (1-2 days)</TimelineLabel>
                  <TimelineDesc>We verify and prepare your order for shipment</TimelineDesc>
                </TimelineText>
              </TimelineItem>

              <TimelineItem>
                <TimelineNumber>2</TimelineNumber>
                <TimelineText>
                  <TimelineLabel>Dispatch (1 day)</TimelineLabel>
                  <TimelineDesc>Your package is handed over to our carrier</TimelineDesc>
                </TimelineText>
              </TimelineItem>

              <TimelineItem>
                <TimelineNumber>3</TimelineNumber>
                <TimelineText>
                  <TimelineLabel>In Transit (3-19 days)</TimelineLabel>
                  <TimelineDesc>Your package is on its way to your address</TimelineDesc>
                </TimelineText>
              </TimelineItem>

              <TimelineItem>
                <TimelineNumber>4</TimelineNumber>
                <TimelineText>
                  <TimelineLabel>Delivery</TimelineLabel>
                  <TimelineDesc>Package arrives at your doorstep</TimelineDesc>
                </TimelineText>
              </TimelineItem>
            </Timeline>
          </DetailSection>

          <DetailSection>
            <DetailTitle>Tracking Your Order</DetailTitle>
            <DetailText>
              Once your order ships, you'll receive a tracking number via email. You can use this number to monitor your package's progress in real-time. Tracking information is typically available within 24 hours of shipment.
            </DetailText>
          </DetailSection>

          <DetailSection>
            <DetailTitle>Shipping Restrictions</DetailTitle>
            <DetailList>
              <DetailListItem>We cannot ship to PO boxes for international orders</DetailListItem>
              <DetailListItem>Some items may have restrictions based on destination country regulations</DetailListItem>
              <DetailListItem>Hazardous materials are subject to special shipping requirements</DetailListItem>
              <DetailListItem>Large or fragile items may require signature on delivery</DetailListItem>
            </DetailList>
          </DetailSection>
        </Section>

        {/* Returns Section */}
        <Section>
          <SectionHeader>
            <SectionIcon><FiRotateCcw size={32} /></SectionIcon>
            <SectionTitle>Returns & Refunds</SectionTitle>
          </SectionHeader>

          <ContentGrid>
            <Card>
              <CardIcon>📅</CardIcon>
              <CardTitle>30-Day Returns</CardTitle>
              <CardText>
                We offer a hassle-free 30-day return window from the date of delivery. Items must be unused and in original packaging.
              </CardText>
            </Card>

            <Card>
              <CardIcon>🆓</CardIcon>
              <CardTitle>Free Returns</CardTitle>
              <CardText>
                Return shipping is FREE for defective or damaged items. You'll receive a prepaid return label via email.
              </CardText>
            </Card>

            <Card>
              <CardIcon>⏳</CardIcon>
              <CardTitle>Quick Refunds</CardTitle>
              <CardText>
                Refunds are processed within 5-7 business days of us receiving your returned item. Amount credited to your original payment method.
              </CardText>
            </Card>

            <Card>
              <CardIcon>💯</CardIcon>
              <CardTitle>100% Satisfaction</CardTitle>
              <CardText>
                Not completely satisfied? Contact our support team within 30 days for a full refund, no questions asked.
              </CardText>
            </Card>
          </ContentGrid>

          <DetailSection>
            <DetailTitle>Return Process</DetailTitle>
            <StepList>
              <Step>
                <StepIcon><FiCheck size={24} /></StepIcon>
                <StepContent>
                  <StepTitle>Step 1: Request Return</StepTitle>
                  <StepDesc>Log into your account, go to "My Orders", select the item, and click "Request Return"</StepDesc>
                </StepContent>
              </Step>

              <Step>
                <StepIcon><FiCheck size={24} /></StepIcon>
                <StepContent>
                  <StepTitle>Step 2: Receive Return Label</StepTitle>
                  <StepDesc>We'll email you a prepaid return shipping label. Print it and attach to your package</StepDesc>
                </StepContent>
              </Step>

              <Step>
                <StepIcon><FiCheck size={24} /></StepIcon>
                <StepContent>
                  <StepTitle>Step 3: Ship Your Return</StepTitle>
                  <StepDesc>Drop off your package at any authorized carrier location (DHL, FedEx, UPS, etc.)</StepDesc>
                </StepContent>
              </Step>

              <Step>
                <StepIcon><FiCheck size={24} /></StepIcon>
                <StepContent>
                  <StepTitle>Step 4: Receive Refund</StepTitle>
                  <StepDesc>Once received and inspected, your refund will be processed within 5-7 business days</StepDesc>
                </StepContent>
              </Step>
            </StepList>
          </DetailSection>

          <DetailSection>
            <DetailTitle>Non-Returnable Items</DetailTitle>
            <DetailList>
              <DetailListItem>Custom or personalized items (unless defective)</DetailListItem>
              <DetailListItem>Clearance or final sale items</DetailListItem>
              <DetailListItem>Items without original packaging or tags</DetailListItem>
              <DetailListItem>Items showing signs of significant wear</DetailListItem>
            </DetailList>
          </DetailSection>

          <DetailSection>
            <DetailTitle>Damage or Defects</DetailTitle>
            <DetailText>
              If you received a damaged or defective item, contact us immediately with photos of the damage. We'll arrange a replacement or full refund at no cost to you. Please report issues within 7 days of delivery.
            </DetailText>
          </DetailSection>
        </Section>

        {/* FAQ Section */}
        <Section>
          <SectionTitle>Common Questions</SectionTitle>

          <QABox>
            <QAQuestion>What if I want to cancel my order?</QAQuestion>
            <QAAnswer>
              You can cancel orders within 1 hour of placement. After that, if your order has already shipped, you'll need to arrange a return once received.
            </QAAnswer>
          </QABox>

          <QABox>
            <QAQuestion>Can I change my shipping address?</QAQuestion>
            <QAAnswer>
              Address changes can be made within 1 hour of order placement. After that, contact our support team immediately. Once shipped, you won't be able to change the address.
            </QAAnswer>
          </QABox>

          <QABox>
            <QAQuestion>Do you ship on weekends or holidays?</QAQuestion>
            <QAAnswer>
              We process orders Monday-Friday. Orders placed on weekends or holidays will be processed on the next business day. Carrier pickup also follows standard business days.
            </QAAnswer>
          </QABox>

          <QABox>
            <QAQuestion>What should I do if my package doesn't arrive?</QAQuestion>
            <QAAnswer>
              Check your tracking information first. If it shows delivered but you haven't received it, contact us within 7 days. We'll investigate and arrange a replacement or refund.
            </QAAnswer>
          </QABox>

          <QABox>
            <QAQuestion>Can I return items to the seller directly?</QAQuestion>
            <QAAnswer>
              No, all returns must go through Indilink. We handle the return process to ensure your package is tracked and you receive your refund promptly.
            </QAAnswer>
          </QABox>
        </Section>

        {/* Contact CTA */}
        <CTASection>
          <CTATitle>Need More Help?</CTATitle>
          <CTADescription>
            Our customer service team is available to answer any questions about shipping and returns.
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
  margin: 0;
  font-size: ${theme.fontSizes.lg};
  opacity: 0.9;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
`;

const Section = styled.div`
  margin-bottom: ${theme.spacing['4xl']};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
`;

const SectionIcon = styled.div`
  color: ${COLORS.PRIMARY};
  display: flex;
  align-items: center;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
`;

const Card = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  text-align: center;
  box-shadow: ${theme.shadows.sm};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.md};
  }
`;

const CardIcon = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.spacing.md};
`;

const CardTitle = styled.h3`
  margin: 0 0 ${theme.spacing.sm} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.lg};
`;

const CardText = styled.p`
  margin: 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.6;
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.spacing['2xl']};
`;

const DetailTitle = styled.h3`
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
`;

const DetailText = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  line-height: 1.8;
  margin: 0;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const TimelineItem = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: flex-start;
`;

const TimelineNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${COLORS.PRIMARY_GRADIENT};
  color: ${COLORS.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeights.bold};
  flex-shrink: 0;
`;

const TimelineText = styled.div``;

const TimelineLabel = styled.div`
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
  margin-bottom: ${theme.spacing.xs};
`;

const TimelineDesc = styled.div`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const DetailListItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${COLORS.TEXT_SECONDARY};

  &::before {
    content: '✓';
    color: ${COLORS.SUCCESS};
    font-weight: bold;
    font-size: ${theme.fontSizes.lg};
  }
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const Step = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: flex-start;
  padding: ${theme.spacing.lg};
  background: ${COLORS.BG_SECONDARY};
  border-radius: ${theme.borderRadius.lg};
`;

const StepIcon = styled.div`
  color: ${COLORS.SUCCESS};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const StepContent = styled.div``;

const StepTitle = styled.h4`
  margin: 0 0 ${theme.spacing.sm} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-weight: ${theme.fontWeights.bold};
`;

const StepDesc = styled.p`
  margin: 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const QABox = styled.div`
  background: ${COLORS.WHITE};
  border-left: 4px solid ${COLORS.PRIMARY};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
`;

const QAQuestion = styled.h4`
  margin: 0 0 ${theme.spacing.md} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.bold};
`;

const QAAnswer = styled.p`
  margin: 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.8;
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

export default ShippingReturnsPage;
