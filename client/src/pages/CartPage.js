import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import { FiTrash2, FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <EmptyCart>
          <EmptyIcon><FiShoppingCart size={80} /></EmptyIcon>
          <h2>Your cart is empty</h2>
          <p>Discover amazing handcrafted products and start shopping</p>
          <Button as={Link} to="/products">
            Continue Shopping
          </Button>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <BackLink as={Link} to="/products">
        <FiArrowLeft size={20} /> Back to Shopping
      </BackLink>

      <CartContent>
        <CartHeader>
          <h1>Shopping Cart</h1>
          <ItemCount>{cartItems.length} items</ItemCount>
        </CartHeader>

        <MainGrid>
          <CartItemsSection>
            <CartTable>
              <TableHeader>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </TableHeader>
              <tbody>
                {cartItems.map((item) => (
                  <CartRow key={item.id}>
                    <ProductCell>
                      {item.image && (
                        <ProductImage src={item.image} alt={item.name || item.product_name} />
                      )}
                      <ProductDetails>
                        <ProductName>{item.name || item.product_name}</ProductName>
                        <ProductSKU>SKU: {item.id}</ProductSKU>
                      </ProductDetails>
                    </ProductCell>
                    <PriceCell>₹{((item.price || 0) * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</PriceCell>
                    <QuantityCell>
                      <QuantityControl>
                        <QuantityBtn onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                          −
                        </QuantityBtn>
                        <QuantityValue>{item.quantity}</QuantityValue>
                        <QuantityBtn onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                          +
                        </QuantityBtn>
                      </QuantityControl>
                    </QuantityCell>
                    <TotalCell>₹{(((item.price || 0) * item.quantity) * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TotalCell>
                    <ActionCell>
                      <RemoveBtn onClick={() => removeFromCart(item.id)} title="Remove item">
                        <FiTrash2 size={18} />
                      </RemoveBtn>
                    </ActionCell>
                  </CartRow>
                ))}
              </tbody>
            </CartTable>
          </CartItemsSection>

          <OrderSummarySection>
            <SummaryCard>
              <SummaryTitle>Order Summary</SummaryTitle>
              
              <SummaryRow>
                <Label>Subtotal</Label>
                <Value>₹{(getTotalPrice() * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Value>
              </SummaryRow>

              <SummaryRow>
                <Label>Shipping</Label>
                <ShippingValue>FREE</ShippingValue>
              </SummaryRow>

              <SummaryRow>
                <Label>Tax (18% GST)</Label>
                <Value>₹{((getTotalPrice() * 0.18) * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Value>
              </SummaryRow>

              <Divider />

              <SummaryRow total>
                <TotalLabel>Total</TotalLabel>
                <TotalValue>₹{(getTotalPrice() * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TotalValue>
              </SummaryRow>

              <Button as={Link} to="/checkout" fullWidth>
                Proceed to Checkout
              </Button>

              <ContinueShopping as={Link} to="/products">
                Continue Shopping
              </ContinueShopping>

              <SecurityInfo>
                🔒 Secure checkout powered by Stripe
              </SecurityInfo>
            </SummaryCard>

            <BenefitsCard>
              <BenefitItem>
                <BenefitIcon>🚚</BenefitIcon>
                <BenefitText>Free shipping on orders over ₹500</BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>✓</BenefitIcon>
                <BenefitText>Quality guaranteed by verified sellers</BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>↩️</BenefitIcon>
                <BenefitText>30-day returns and exchanges</BenefitText>
              </BenefitItem>
            </BenefitsCard>
          </OrderSummarySection>
        </MainGrid>
      </CartContent>
    </CartContainer>
  );
};

const CartContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${COLORS.PRIMARY};
  text-decoration: none;
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing['2xl']};
  transition: all ${theme.transitions.fast};

  &:hover {
    gap: ${theme.spacing.md};
    color: ${COLORS.PRIMARY_DARK};
  }
`;

const EmptyCart = styled.div`
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
`;

const EmptyIcon = styled.div`
  color: ${COLORS.PRIMARY};
  margin-bottom: ${theme.spacing['2xl']};
  opacity: 0.5;
`;

const CartContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing['3xl']};

  h1 {
    font-size: ${theme.fontSizes['3xl']};
    font-weight: ${theme.fontWeights.bold};
    color: ${COLORS.TEXT_PRIMARY};
    margin: 0;
  }
`;

const ItemCount = styled.span`
  background: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsSection = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  overflow-x: auto;
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  border-bottom: 2px solid ${COLORS.BG_TERTIARY};

  th {
    padding: ${theme.spacing.md};
    text-align: left;
    font-weight: ${theme.fontWeights.semibold};
    color: ${COLORS.TEXT_PRIMARY};
    font-size: ${theme.fontSizes.sm};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const CartRow = styled.tr`
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};
  transition: background-color ${theme.transitions.fast};

  &:hover {
    background-color: ${COLORS.BG_SECONDARY};
  }

  td {
    padding: ${theme.spacing.md};
  }
`;

const ProductCell = styled.td`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const ProductName = styled.p`
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0;
`;

const ProductSKU = styled.p`
  font-size: ${theme.fontSizes.xs};
  color: ${COLORS.TEXT_SECONDARY};
  margin: 0;
`;

const PriceCell = styled.td`
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const QuantityCell = styled.td`
  display: flex;
  justify-content: center;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

const QuantityBtn = styled.button`
  background: ${COLORS.BG_SECONDARY};
  border: none;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
  }
`;

const QuantityValue = styled.span`
  width: 50px;
  text-align: center;
  font-weight: ${theme.fontWeights.semibold};
`;

const TotalCell = styled.td`
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.PRIMARY};
  font-size: ${theme.fontSizes.lg};
`;

const ActionCell = styled.td`
  text-align: center;
`;

const RemoveBtn = styled.button`
  background: ${COLORS.BG_SECONDARY};
  border: none;
  color: ${COLORS.ERROR};
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${COLORS.ERROR};
    color: ${COLORS.WHITE};
  }
`;

const OrderSummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const SummaryCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  position: sticky;
  top: ${theme.spacing['2xl']};
`;

const SummaryTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${theme.spacing.lg} 0;
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${COLORS.BG_TERTIARY};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} 0;
  font-size: ${theme.fontSizes[props => props.total ? 'lg' : 'base']};
  font-weight: ${theme.fontWeights[props => props.total ? 'bold' : 'medium']};
`;

const Label = styled.span`
  color: ${COLORS.TEXT_SECONDARY};
`;

const Value = styled.span`
  color: ${COLORS.TEXT_PRIMARY};
  font-weight: ${theme.fontWeights.semibold};
`;

const ShippingValue = styled(Value)`
  color: ${COLORS.SUCCESS};
  font-weight: ${theme.fontWeights.bold};
`;

const TotalLabel = styled(Label)`
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.lg};
`;

const TotalValue = styled(Value)`
  color: ${COLORS.PRIMARY};
  font-size: ${theme.fontSizes.lg};
`;

const Divider = styled.div`
  height: 1px;
  background: ${COLORS.BG_TERTIARY};
  margin: ${theme.spacing.md} 0;
`;

const ContinueShopping = styled(Link)`
  display: block;
  text-align: center;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  color: ${COLORS.PRIMARY};
  text-decoration: none;
  font-weight: ${theme.fontWeights.semibold};
  border: 2px solid ${COLORS.PRIMARY};
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.fast};
  margin-top: ${theme.spacing.md};

  &:hover {
    background: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
  }
`;

const SecurityInfo = styled.p`
  text-align: center;
  font-size: ${theme.fontSizes.xs};
  color: ${COLORS.TEXT_SECONDARY};
  margin-top: ${theme.spacing.md};
`;

const BenefitsCard = styled.div`
  background: ${COLORS.BG_SECONDARY};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const BenefitItem = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: flex-start;
`;

const BenefitIcon = styled.span`
  font-size: ${theme.fontSizes.lg};
  flex-shrink: 0;
`;

const BenefitText = styled.p`
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_PRIMARY};
  line-height: 1.5;
`;

export default CartPage;
