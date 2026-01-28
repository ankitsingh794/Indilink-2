import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import { FiCheck, FiShoppingBag, FiTruck, FiCreditCard, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkoutData, setCheckoutData] = useState({
    // Shipping Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    // Billing Info
    sameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingCountry: '',
    billingPostalCode: '',
    // Payment Info
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    paymentMethod: 'card'
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, cartTotal } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 60;
  const tax = (subtotal * 0.18).toFixed(2);
  const total = (subtotal + shipping + parseFloat(tax)).toFixed(2);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setCheckoutData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');
    
    if (currentStep === 1) {
      if (!checkoutData.firstName || !checkoutData.lastName || !checkoutData.email || !checkoutData.address || !checkoutData.city || !checkoutData.state) {
        setError('Please fill in all required fields');
        return;
      }
    } else if (currentStep === 2) {
      if (!checkoutData.sameAsShipping) {
        if (!checkoutData.billingAddress || !checkoutData.billingCity) {
          setError('Please fill in all required billing fields');
          return;
        }
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!checkoutData.cardNumber || !checkoutData.expiry || !checkoutData.cvv) {
        setError('Please fill in all payment details');
        setLoading(false);
        return;
      }

      // Simulate order placement
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock order placement success
      navigate('/order-confirmation', {
        state: {
          orderId: Math.random().toString(36).substr(2, 9),
          total,
          shippingAddress: `${checkoutData.firstName} ${checkoutData.lastName}, ${checkoutData.address}, ${checkoutData.city}, ${checkoutData.state} ${checkoutData.postalCode}`,
          items: cartItems
        }
      });
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isStep1Valid = checkoutData.firstName && checkoutData.lastName && checkoutData.email && checkoutData.address && checkoutData.city && checkoutData.state;
  const isStep2Valid = checkoutData.sameAsShipping || (checkoutData.billingAddress && checkoutData.billingCity);
  const isStep3Valid = checkoutData.cardNumber && checkoutData.expiry && checkoutData.cvv;

  return (
    <PageContainer>
      <Container>
        <MainContent>
          {/* Progress Steps */}
          <ProgressSteps>
            <ProgressStep active={currentStep >= 1} completed={currentStep > 1}>
              <StepCircle>
                {currentStep > 1 ? <FiCheck size={20} /> : '1'}
              </StepCircle>
              <StepLabel>Shipping</StepLabel>
            </ProgressStep>
            
            <StepLine completed={currentStep > 1} />
            
            <ProgressStep active={currentStep >= 2} completed={currentStep > 2}>
              <StepCircle>
                {currentStep > 2 ? <FiCheck size={20} /> : '2'}
              </StepCircle>
              <StepLabel>Billing</StepLabel>
            </ProgressStep>
            
            <StepLine completed={currentStep > 2} />
            
            <ProgressStep active={currentStep >= 3}>
              <StepCircle>
                {currentStep > 3 ? <FiCheck size={20} /> : '3'}
              </StepCircle>
              <StepLabel>Payment</StepLabel>
            </ProgressStep>
          </ProgressSteps>

          {/* Error Message */}
          {error && <ErrorAlert>{error}</ErrorAlert>}

          {/* Step Forms */}
          <FormCard>
            <Form onSubmit={currentStep === 3 ? handleSubmit : handleNextStep}>
              {/* Step 1: Shipping Info */}
              {currentStep === 1 && (
                <StepContent>
                  <StepTitle>
                    <FiTruck size={24} />
                    Shipping Address
                  </StepTitle>
                  
                  <FormGroup>
                    <FormRow>
                      <FormColumn>
                        <Label>First Name *</Label>
                        <Input
                          type="text"
                          name="firstName"
                          value={checkoutData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          required
                        />
                      </FormColumn>
                      <FormColumn>
                        <Label>Last Name *</Label>
                        <Input
                          type="text"
                          name="lastName"
                          value={checkoutData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          required
                        />
                      </FormColumn>
                    </FormRow>
                  </FormGroup>

                  <FormGroup>
                    <FormRow>
                      <FormColumn>
                        <Label>Email Address *</Label>
                        <Input
                          type="email"
                          name="email"
                          value={checkoutData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </FormColumn>
                      <FormColumn>
                        <Label>Phone Number</Label>
                        <Input
                          type="tel"
                          name="phone"
                          value={checkoutData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                        />
                      </FormColumn>
                    </FormRow>
                  </FormGroup>

                  <FormGroup>
                    <Label>Street Address *</Label>
                    <Input
                      type="text"
                      name="address"
                      value={checkoutData.address}
                      onChange={handleChange}
                      placeholder="Sector V, Salt Lake"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormRow>
                      <FormColumn>
                        <Label>City *</Label>
                        <Input
                          type="text"
                          name="city"
                          value={checkoutData.city}
                          onChange={handleChange}
                          placeholder="Kolkata"
                          required
                        />
                      </FormColumn>
                      <FormColumn>
                        <Label>State/Province *</Label>
                        <Input
                          type="text"
                          name="state"
                          value={checkoutData.state}
                          onChange={handleChange}
                          placeholder="West Bengal"
                          required
                        />
                      </FormColumn>
                    </FormRow>
                  </FormGroup>

                  <FormGroup>
                    <FormRow>
                      <FormColumn>
                        <Label>Country</Label>
                        <Input
                          type="text"
                          name="country"
                          value={checkoutData.country}
                          onChange={handleChange}
                          placeholder="India"
                        />
                      </FormColumn>
                      <FormColumn>
                        <Label>Postal Code</Label>
                        <Input
                          type="text"
                          name="billingPostalCode"
                          value={checkoutData.billingPostalCode}
                          onChange={handleChange}
                          placeholder="700091"
                        />
                      </FormColumn>
                    </FormRow>
                  </FormGroup>
                </StepContent>
              )}

              {/* Step 2: Billing Info */}
              {currentStep === 2 && (
                <StepContent>
                  <StepTitle>
                    <FiShoppingBag size={24} />
                    Billing Address
                  </StepTitle>

                  <CheckboxGroup>
                    <Checkbox
                      type="checkbox"
                      name="sameAsShipping"
                      checked={checkoutData.sameAsShipping}
                      onChange={handleChange}
                      id="sameAddress"
                    />
                    <CheckboxLabel htmlFor="sameAddress">
                      Billing address same as shipping
                    </CheckboxLabel>
                  </CheckboxGroup>

                  {!checkoutData.sameAsShipping && (
                    <>
                      <FormGroup>
                        <Label>Billing Street Address *</Label>
                        <Input
                          type="text"
                          name="billingAddress"
                          value={checkoutData.billingAddress}
                          onChange={handleChange}
                          placeholder="Sector V, Salt Lake"
                          required={!checkoutData.sameAsShipping}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormRow>
                          <FormColumn>
                            <Label>City *</Label>
                            <Input
                              type="text"
                              name="billingCity"
                              value={checkoutData.billingCity}
                              onChange={handleChange}
                              placeholder="Kolkata"
                              required={!checkoutData.sameAsShipping}
                            />
                          </FormColumn>
                          <FormColumn>
                            <Label>State/Province</Label>
                            <Input
                              type="text"
                              name="billingState"
                              value={checkoutData.billingState}
                              onChange={handleChange}
                              placeholder="West Bengal"
                            />
                          </FormColumn>
                        </FormRow>
                      </FormGroup>

                      <FormGroup>
                        <FormRow>
                          <FormColumn>
                            <Label>Country</Label>
                            <Input
                              type="text"
                              name="billingCountry"
                              value={checkoutData.billingCountry}
                              onChange={handleChange}
                              placeholder="India"
                            />
                          </FormColumn>
                          <FormColumn>
                            <Label>Postal Code</Label>
                            <Input
                              type="text"
                              name="billingPostalCode"
                              value={checkoutData.billingPostalCode}
                              onChange={handleChange}
                              placeholder="700091"
                            />
                          </FormColumn>
                        </FormRow>
                      </FormGroup>
                    </>
                  )}
                </StepContent>
              )}

              {/* Step 3: Payment Info */}
              {currentStep === 3 && (
                <StepContent>
                  <StepTitle>
                    <FiCreditCard size={24} />
                    Payment Method
                  </StepTitle>

                  <PaymentMethodGroup>
                    <PaymentOption>
                      <PaymentRadio
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={checkoutData.paymentMethod === 'card'}
                        onChange={handleChange}
                        id="cardPayment"
                      />
                      <PaymentLabel htmlFor="cardPayment">
                        💳 Credit / Debit Card
                      </PaymentLabel>
                    </PaymentOption>
                    <PaymentOption>
                      <PaymentRadio
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={checkoutData.paymentMethod === 'paypal'}
                        onChange={handleChange}
                        id="paypalPayment"
                      />
                      <PaymentLabel htmlFor="paypalPayment">
                        🅿️ PayPal
                      </PaymentLabel>
                    </PaymentOption>
                  </PaymentMethodGroup>

                  {checkoutData.paymentMethod === 'card' && (
                    <>
                      <FormGroup>
                        <Label>Cardholder Name *</Label>
                        <Input
                          type="text"
                          name="cardName"
                          value={checkoutData.cardName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Card Number *</Label>
                        <Input
                          type="text"
                          name="cardNumber"
                          value={checkoutData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormRow>
                          <FormColumn>
                            <Label>Expiry Date *</Label>
                            <Input
                              type="text"
                              name="expiry"
                              value={checkoutData.expiry}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              maxLength="5"
                              required
                            />
                          </FormColumn>
                          <FormColumn>
                            <Label>CVV *</Label>
                            <Input
                              type="text"
                              name="cvv"
                              value={checkoutData.cvv}
                              onChange={handleChange}
                              placeholder="123"
                              maxLength="3"
                              required
                            />
                          </FormColumn>
                        </FormRow>
                      </FormGroup>
                    </>
                  )}

                  {checkoutData.paymentMethod === 'paypal' && (
                    <PaymentNotice>
                      You will be redirected to PayPal to complete your payment securely.
                    </PaymentNotice>
                  )}
                </StepContent>
              )}

              {/* Action Buttons */}
              <ButtonGroup>
                {currentStep > 1 && (
                  <Button secondary onClick={handlePreviousStep}>
                    Back
                  </Button>
                )}
                <Button 
                  type="submit" 
                  disabled={loading || (currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid)}
                  fullWidth
                >
                  {loading ? 'Processing...' : currentStep === 3 ? 'Place Order' : 'Continue'}
                  {currentStep < 3 && <FiArrowRight size={18} />}
                </Button>
              </ButtonGroup>
            </Form>
          </FormCard>
        </MainContent>

        {/* Order Summary Sidebar */}
        <Sidebar>
          <SummaryCard>
            <SummaryTitle>Order Summary</SummaryTitle>
            
            <SummaryItems>
              {cartItems.slice(0, 3).map(item => (
                <SummaryItem key={item.id}>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>{item.quantity}x ₹{(item.price * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ItemPrice>
                  </ItemDetails>
                </SummaryItem>
              ))}
              {cartItems.length > 3 && (
                <MoreItems>+{cartItems.length - 3} more items</MoreItems>
              )}
            </SummaryItems>

            <Divider />

            <SummaryRow>
              <Label>Subtotal</Label>
              <Value>₹{(subtotal * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>Shipping (India)</Label>
              <Value>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>Tax (18% GST)</Label>
              <Value>₹{(parseFloat(tax) * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Value>
            </SummaryRow>

            <Divider />

            <TotalRow>
              <Label>Total</Label>
              <TotalValue>₹{(parseFloat(total) * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TotalValue>
            </TotalRow>

            {shipping === 0 && (
              <FreeShippingBanner>
                ✨ FREE SHIPPING - Enjoy complimentary delivery on your order!
              </FreeShippingBanner>
            )}
          </SummaryCard>

          <SecurityBadges>
            <Badge>🔒 Secure Checkout</Badge>
            <Badge>✓ Verified Seller</Badge>
            <Badge>🛡️ Buyer Protection</Badge>
          </SecurityBadges>
        </Sidebar>
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
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2xl']};
`;

const ProgressSteps = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing['2xl']};
`;

const ProgressStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex: 1;
`;

const StepCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.parent?.active ? COLORS.PRIMARY : props.parent?.completed ? COLORS.SUCCESS : COLORS.BG_SECONDARY};
  color: ${props => props.parent?.active || props.parent?.completed ? COLORS.WHITE : COLORS.TEXT_SECONDARY};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeights.bold};
  font-size: ${theme.fontSizes.lg};
`;

const StepLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${props => props.completed ? COLORS.SUCCESS : COLORS.BG_TERTIARY};
  margin: 0 ${theme.spacing.md};
  margin-top: 25px;
`;

const StepLabel = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
  font-weight: ${theme.fontWeights.medium};
`;

const ErrorAlert = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: ${COLORS.ERROR};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${COLORS.ERROR};
  font-size: ${theme.fontSizes.sm};
`;

const FormCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.md};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2xl']};
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const StepTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.fontSizes.xl};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.sm};
`;

const Input = styled.input`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: ${COLORS.BG_SECONDARY};
  border-radius: ${theme.borderRadius.lg};
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  font-weight: ${theme.fontWeights.medium};
  color: ${COLORS.TEXT_PRIMARY};
`;

const PaymentMethodGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  border: 2px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${COLORS.PRIMARY};
    background: rgba(102, 126, 234, 0.05);
  }
`;

const PaymentRadio = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const PaymentLabel = styled.label`
  cursor: pointer;
  font-weight: ${theme.fontWeights.medium};
  color: ${COLORS.TEXT_PRIMARY};
  flex: 1;
`;

const PaymentNotice = styled.div`
  padding: ${theme.spacing.lg};
  background: rgba(79, 172, 254, 0.1);
  border: 1px solid ${COLORS.ACCENT};
  border-radius: ${theme.borderRadius.lg};
  color: ${COLORS.ACCENT};
  font-size: ${theme.fontSizes.sm};
`;

const Divider = styled.div`
  height: 1px;
  background: ${COLORS.BG_TERTIARY};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.sm};
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.md};
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h3`
  margin: 0 0 ${theme.spacing.lg} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.lg};
`;

const SummaryItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const SummaryItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemName = styled.div`
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.sm};
`;

const ItemPrice = styled.div`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const MoreItems = styled.div`
  color: ${COLORS.PRIMARY};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} 0;
`;

const Value = styled.span`
  color: ${COLORS.TEXT_SECONDARY};
  font-weight: ${theme.fontWeights.medium};
`;

const TotalRow = styled(SummaryRow)`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const TotalValue = styled.span`
  color: ${COLORS.PRIMARY};
  font-weight: ${theme.fontWeights.bold};
`;

const FreeShippingBanner = styled.div`
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: rgba(34, 197, 94, 0.1);
  border-left: 3px solid ${COLORS.SUCCESS};
  border-radius: ${theme.borderRadius.md};
  color: ${COLORS.SUCCESS};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
`;

const SecurityBadges = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const Badge = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${COLORS.WHITE};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
  box-shadow: ${theme.shadows.sm};
`;

export default CheckoutPage;
