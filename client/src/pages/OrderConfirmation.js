import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import { FiCheck, FiPackage, FiTruck, FiMail } from 'react-icons/fi';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const orderId = state.orderId || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const total = state.total || 0;
  const shippingAddress = state.shippingAddress || '';
  const items = state.items || [];

  return (
    <PageContainer>
      <Container>
        <SuccessIcon>
          <FiCheck size={80} />
        </SuccessIcon>

        <Title>Order Confirmed!</Title>
        <Subtitle>Thank you for your purchase</Subtitle>

        <ConfirmationCard>
          <CardSection>
            <CardTitle>Order Details</CardTitle>
            <DetailRow>
              <DetailLabel>Order ID</DetailLabel>
              <DetailValue>{orderId}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Order Total</DetailLabel>
              <DetailValue highlight>₹{(parseFloat(total) * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Order Date</DetailLabel>
              <DetailValue>{new Date().toLocaleDateString()}</DetailValue>
            </DetailRow>
          </CardSection>

          <Divider />

          <CardSection>
            <CardTitle>Items Ordered</CardTitle>
            {items && items.length > 0 ? (
              <ItemsList>
                {items.map((item, index) => (
                  <ItemRow key={index}>
                    <ItemName>{item.name || item.product_name}</ItemName>
                    <ItemMeta>
                      <span>Qty: {item.quantity}</span>
                      <span>₹{((item.price * item.quantity) * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </ItemMeta>
                  </ItemRow>
                ))}
              </ItemsList>
            ) : (
              <p>No items in order</p>
            )}
          </CardSection>

          <Divider />

          <CardSection>
            <CardTitle>Shipping Address</CardTitle>
            <ShippingAddress>{shippingAddress || 'Address not provided'}</ShippingAddress>
          </CardSection>
        </ConfirmationCard>

        {/* Next Steps */}
        <StepsSection>
          <StepsTitle>What's Next?</StepsTitle>
          <StepsGrid>
            <Step>
              <StepIcon>📧</StepIcon>
              <StepTitle>Confirmation Email</StepTitle>
              <StepDesc>Check your email for order confirmation and tracking details</StepDesc>
            </Step>

            <Step>
              <StepIcon>🚚</StepIcon>
              <StepTitle>Shipping Preparation</StepTitle>
              <StepDesc>Your order is being prepared for shipment (1-2 business days)</StepDesc>
            </Step>

            <Step>
              <StepIcon>📍</StepIcon>
              <StepTitle>Track Your Order</StepTitle>
              <StepDesc>You'll receive tracking information as soon as your order ships</StepDesc>
            </Step>

            <Step>
              <StepIcon>💬</StepIcon>
              <StepTitle>Need Help?</StepTitle>
              <StepDesc>Contact our support team anytime at support@indilink.com</StepDesc>
            </Step>
          </StepsGrid>
        </StepsSection>

        {/* CTA Buttons */}
        <ButtonGroup>
          <Button onClick={() => navigate('/products')} primary>
            Continue Shopping
          </Button>
          <Button onClick={() => navigate('/profile')} secondary>
            View My Orders
          </Button>
        </ButtonGroup>

        {/* Benefits */}
        <BenefitsSection>
          <BenefitCard>
            <BenefitIcon>🚚</BenefitIcon>
            <BenefitTitle>Free Shipping</BenefitTitle>
            <BenefitDesc>On orders over ₹500</BenefitDesc>
            <BenefitIcon>🔄</BenefitIcon>
            <BenefitTitle>Easy Returns</BenefitTitle>
            <BenefitDesc>30-day returns on all items</BenefitDesc>
          </BenefitCard>

          <BenefitCard>
            <BenefitIcon>🔒</BenefitIcon>
            <BenefitTitle>Secure Payment</BenefitTitle>
            <BenefitDesc>100% secure transactions</BenefitDesc>
          </BenefitCard>
        </BenefitsSection>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2xl']};
`;

const SuccessIcon = styled.div`
  width: 120px;
  height: 120px;
  background: ${COLORS.PRIMARY_GRADIENT};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.WHITE};
  margin: 0 auto ${theme.spacing.lg};
  animation: slideUp 0.6s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  margin: 0 0 ${theme.spacing.sm} 0;
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const Subtitle = styled.p`
  text-align: center;
  margin: 0 0 ${theme.spacing['2xl']} 0;
  font-size: ${theme.fontSizes.lg};
  color: ${COLORS.TEXT_SECONDARY};
`;

const ConfirmationCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.md};
`;

const CardSection = styled.div``;

const CardTitle = styled.h3`
  margin: 0 0 ${theme.spacing.lg} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: ${COLORS.TEXT_SECONDARY};
  font-weight: ${theme.fontWeights.semibold};
`;

const DetailValue = styled.span`
  color: ${props => props.highlight ? COLORS.PRIMARY : COLORS.TEXT_PRIMARY};
  font-weight: ${props => props.highlight ? theme.fontWeights.bold : theme.fontWeights.medium};
  font-size: ${props => props.highlight ? theme.fontSizes.lg : theme.fontSizes.base};
`;

const Divider = styled.div`
  height: 1px;
  background: ${COLORS.BG_TERTIARY};
  margin: ${theme.spacing.lg} 0;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  color: ${COLORS.TEXT_PRIMARY};
  font-weight: ${theme.fontWeights.semibold};
`;

const ItemMeta = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};

  span {
    &:last-child {
      font-weight: ${theme.fontWeights.semibold};
      color: ${COLORS.TEXT_PRIMARY};
    }
  }
`;

const ShippingAddress = styled.p`
  background: ${COLORS.BG_SECONDARY};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  margin: 0;
  color: ${COLORS.TEXT_SECONDARY};
  line-height: 1.8;
`;

const StepsSection = styled.div`
  margin-top: ${theme.spacing['2xl']};
`;

const StepsTitle = styled.h3`
  text-align: center;
  margin: 0 0 ${theme.spacing.lg} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${theme.spacing.lg};
`;

const Step = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  text-align: center;
  box-shadow: ${theme.shadows.sm};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.md};
  }
`;

const StepIcon = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.spacing.md};
`;

const StepTitle = styled.h4`
  margin: 0 0 ${theme.spacing.sm} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.bold};
`;

const StepDesc = styled.p`
  margin: 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.xs};
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const BenefitsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`;

const BenefitCard = styled.div`
  background: ${COLORS.BG_SECONDARY};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  text-align: center;
`;

const BenefitIcon = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.spacing.md};
`;

const BenefitTitle = styled.h4`
  margin: 0 0 ${theme.spacing.xs} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.bold};
`;

const BenefitDesc = styled.p`
  margin: 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

export default OrderConfirmation;
