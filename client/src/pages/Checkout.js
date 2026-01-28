import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { orderService } from '../api/services';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import { FormGroup, Label, Input } from '../components/ui/CommonStyles';
import { useForm } from '../hooks/useCustomHooks';
import { formatPrice, getErrorMessage } from '../utils/helpers';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { values, handleChange, handleSubmit } = useForm(
    {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      paymentMethod: 'credit-card',
    },
    async (formData) => {
      try {
        setIsProcessing(true);
        setOrderError('');

        const orderData = {
          ...formData,
          items: cartItems,
          totalPrice: getTotalPrice(),
        };

        await orderService.createOrder(orderData);
        setOrderSuccess(true);
        clearCart();

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        setOrderError(getErrorMessage(error));
      } finally {
        setIsProcessing(false);
      }
    }
  );

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <CheckoutContainer>
        <ContentWrapper>
          <EmptyCart>
            <h2>Your cart is empty</h2>
            <p>Add items to your cart before checkout</p>
            <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
          </EmptyCart>
        </ContentWrapper>
      </CheckoutContainer>
    );
  }

  if (orderSuccess) {
    return (
      <CheckoutContainer>
        <ContentWrapper>
          <SuccessMessage>
            <Icon>✓</Icon>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your order. You will receive a confirmation email shortly.</p>
            <p>Redirecting to home...</p>
          </SuccessMessage>
        </ContentWrapper>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <ContentWrapper>
        <h1>Checkout</h1>

        <CheckoutGrid>
          <FormSection>
            <h2>Shipping Information</h2>

            {orderError && <ErrorAlert>{orderError}</ErrorAlert>}

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Full Name *</Label>
                <Input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Email *</Label>
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Phone *</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Street Address *</Label>
                <Input
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>City *</Label>
                  <Input
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>State *</Label>
                  <Input
                    type="text"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Postal Code *</Label>
                <Input
                  type="text"
                  name="postalCode"
                  value={values.postalCode}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Payment Method *</Label>
                <Select
                  name="paymentMethod"
                  value={values.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="credit-card">Credit Card</option>
                  <option value="debit-card">Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="net-banking">Net Banking</option>
                </Select>
              </FormGroup>

              <Button type="submit" fullWidth disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>
            </Form>
          </FormSection>

          <OrderSummary>
            <h2>Order Summary</h2>
            <ItemsList>
              {cartItems.map((item) => (
                <OrderItem key={item.id}>
                  <div>
                    <p>{item.name || item.product_name}</p>
                    <small>Qty: {item.quantity || 1}</small>
                  </div>
                  <Price>{formatPrice((item.price || 0) * (item.quantity || 1))}</Price>
                </OrderItem>
              ))}
            </ItemsList>

            <Divider />

            <SummaryRow>
              <span>Subtotal</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </SummaryRow>

            <SummaryRow>
              <span>Shipping</span>
              <span>Free</span>
            </SummaryRow>

            <SummaryRow>
              <span>Tax</span>
              <span>{formatPrice(getTotalPrice() * 0.1)}</span>
            </SummaryRow>

            <TotalRow>
              <span>Total</span>
              <span>{formatPrice(getTotalPrice() * 1.1)}</span>
            </TotalRow>
          </OrderSummary>
        </CheckoutGrid>
      </ContentWrapper>
    </CheckoutContainer>
  );
};

const CheckoutContainer = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 240, 240, 0.95) 100%);
  min-height: calc(100vh - 200px);
  padding: ${theme.spacing.xl};
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: ${theme.fontSizes['3xl']};
    margin-bottom: ${theme.spacing.xl};
    color: ${COLORS.TEXT_PRIMARY};
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: ${theme.spacing.xl};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};

  h2 {
    margin-bottom: ${theme.spacing.lg};
    color: ${COLORS.TEXT_PRIMARY};
  }
`;

const Form = styled.form``;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${COLORS.TEXT_SECONDARY};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY_GREEN};
  }
`;

const OrderSummary = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  height: fit-content;

  h2 {
    margin: 0 0 ${theme.spacing.lg};
    color: ${COLORS.TEXT_PRIMARY};
    font-size: ${theme.fontSizes.lg};
  }
`;

const ItemsList = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${COLORS.BG_LIGHT};

  &:last-child {
    border-bottom: none;
  }

  p {
    margin: 0;
    font-weight: 500;
    color: ${COLORS.TEXT_PRIMARY};
  }

  small {
    color: ${COLORS.TEXT_SECONDARY};
  }
`;

const Price = styled.span`
  font-weight: 600;
  color: ${COLORS.PRIMARY_GREEN};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${COLORS.BG_LIGHT};
  margin: ${theme.spacing.md} 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const TotalRow = styled(SummaryRow)`
  font-weight: 700;
  font-size: ${theme.fontSizes.lg};
  color: ${COLORS.TEXT_PRIMARY};
  border-top: 2px solid ${COLORS.BG_LIGHT};
  padding-top: ${theme.spacing.md};
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']};
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};

  h2 {
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${COLORS.TEXT_SECONDARY};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']};
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const Icon = styled.div`
  font-size: 4rem;
  color: ${COLORS.PRIMARY_GREEN};
  margin-bottom: ${theme.spacing.lg};
`;

const ErrorAlert = styled.div`
  background-color: rgba(220, 0, 115, 0.1);
  border-left: 4px solid ${COLORS.RED};
  color: ${COLORS.RED};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
`;

export default Checkout;
