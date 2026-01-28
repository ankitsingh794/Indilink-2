import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import { FiTrendingUp, FiPackage, FiDollarSign, FiUserCheck, FiSettings, FiBarChart2, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const SellerCenter = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockStats = {
    totalSales: 24500,
    totalOrders: 324,
    totalProducts: 58,
    avgRating: 4.8,
    monthlyGrowth: 23
  };

  const mockRecentOrders = [
    { id: 'ORD-501', product: 'Handwoven Scarf', quantity: 2, amount: 185.00, status: 'shipped' },
    { id: 'ORD-502', product: 'Ceramic Vase', quantity: 1, amount: 125.00, status: 'processing' },
    { id: 'ORD-503', product: 'Silk Blouse', quantity: 3, amount: 298.50, status: 'delivered' },
  ];

  const quickActions = [
    { icon: <FiShoppingCart size={24} />, label: 'List Product', action: '/seller/add-product' },
    { icon: <FiBarChart2 size={24} />, label: 'View Analytics', action: '/seller/analytics' },
    { icon: <FiDollarSign size={24} />, label: 'Payouts', action: '/seller/payouts' },
    { icon: <FiMessageSquare size={24} />, label: 'Messages', action: '/seller/messages' },
  ];

  return (
    <PageContainer>
      <Container>
        {/* Header */}
        <HeaderSection>
          <HeaderContent>
            <HeaderTitle>Seller Dashboard</HeaderTitle>
            <HeaderDescription>Welcome to your Indilink seller center. Manage your products, orders, and earnings.</HeaderDescription>
          </HeaderContent>
        </HeaderSection>

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard>
            <StatIcon><FiDollarSign size={32} /></StatIcon>
            <StatContent>
              <StatLabel>Total Sales</StatLabel>
              <StatValue>₹{mockStats.totalSales.toLocaleString('en-IN')}</StatValue>
              <StatTrend positive>{mockStats.monthlyGrowth}% this month</StatTrend>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon><FiShoppingCart size={32} /></StatIcon>
            <StatContent>
              <StatLabel>Total Orders</StatLabel>
              <StatValue>{mockStats.totalOrders}</StatValue>
              <StatTrend>All time</StatTrend>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon><FiPackage size={32} /></StatIcon>
            <StatContent>
              <StatLabel>Active Products</StatLabel>
              <StatValue>{mockStats.totalProducts}</StatValue>
              <StatTrend>Listed for sale</StatTrend>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon><FiUserCheck size={32} /></StatIcon>
            <StatContent>
              <StatLabel>Seller Rating</StatLabel>
              <StatValue>⭐ {mockStats.avgRating}</StatValue>
              <StatTrend>From {mockStats.totalOrders} reviews</StatTrend>
            </StatContent>
          </StatCard>
        </StatsGrid>

        {/* Quick Actions */}
        <QuickActionsSection>
          <SectionTitle>Quick Actions</SectionTitle>
          <ActionsGrid>
            {quickActions.map((action, index) => (
              <ActionCard key={index} onClick={() => navigate(action.action)}>
                <ActionIcon>{action.icon}</ActionIcon>
                <ActionLabel>{action.label}</ActionLabel>
              </ActionCard>
            ))}
          </ActionsGrid>
        </QuickActionsSection>

        {/* Tabs */}
        <TabsSection>
          <TabsList>
            <Tab active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
              📊 Dashboard
            </Tab>
            <Tab active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
              📦 Products
            </Tab>
            <Tab active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
              🛒 Orders
            </Tab>
            <Tab active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
              ⚙️ Settings
            </Tab>
          </TabsList>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <TabContent>
              <SectionTitle>Recent Orders</SectionTitle>
              <OrdersTable>
                <TableHeader>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableHeader>
                <TableBody>
                  {mockRecentOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>${order.amount.toFixed(2)}</TableCell>
                      <StatusCell status={order.status}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </StatusCell>
                    </TableRow>
                  ))}
                </TableBody>
              </OrdersTable>

              <SectionTitle>Performance Tips</SectionTitle>
              <TipsGrid>
                <TipCard>
                  <TipIcon>📸</TipIcon>
                  <TipTitle>Improve Photo Quality</TipTitle>
                  <TipDesc>High-quality product images lead to higher conversion rates and customer satisfaction.</TipDesc>
                </TipCard>

                <TipCard>
                  <TipIcon>⭐</TipIcon>
                  <TipTitle>Encourage Reviews</TipTitle>
                  <TipDesc>Products with more reviews perform better in search. Maintain excellent customer service.</TipDesc>
                </TipCard>

                <TipCard>
                  <TipIcon>📱</TipIcon>
                  <TipTitle>Mobile Optimization</TipTitle>
                  <TipDesc>60% of shoppers browse on mobile. Ensure your product descriptions are mobile-friendly.</TipDesc>
                </TipCard>

                <TipCard>
                  <TipIcon>🎯</TipIcon>
                  <TipTitle>Competitive Pricing</TipTitle>
                  <TipDesc>Monitor market trends and adjust prices strategically to stay competitive.</TipDesc>
                </TipCard>
              </TipsGrid>
            </TabContent>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <TabContent>
              <ProductsHeader>
                <SectionTitle>Your Products</SectionTitle>
                <Button onClick={() => navigate('/seller/add-product')}>+ Add New Product</Button>
              </ProductsHeader>

              <ProductsList>
                <ProductCard>
                  <ProductImage>🎨</ProductImage>
                  <ProductInfo>
                    <ProductName>Handwoven Scarf</ProductName>
                    <ProductMeta>
                      <MetaItem>Views: 1,245</MetaItem>
                      <MetaItem>Sales: 47</MetaItem>
                      <MetaItem>Rating: ⭐ 4.9</MetaItem>
                    </ProductMeta>
                  </ProductInfo>
                  <ProductPrice>₹{(85.00 * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ProductPrice>
                  <ProductActions>
                    <ActionLink href="#">Edit</ActionLink>
                    <ActionLink href="#">Stats</ActionLink>
                  </ProductActions>
                </ProductCard>

                <ProductCard>
                  <ProductImage>🏺</ProductImage>
                  <ProductInfo>
                    <ProductName>Ceramic Vase</ProductName>
                    <ProductMeta>
                      <MetaItem>Views: 892</MetaItem>
                      <MetaItem>Sales: 23</MetaItem>
                      <MetaItem>Rating: ⭐ 4.7</MetaItem>
                    </ProductMeta>
                  </ProductInfo>
                  <ProductPrice>₹{(125.00 * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ProductPrice>
                  <ProductActions>
                    <ActionLink href="#">Edit</ActionLink>
                    <ActionLink href="#">Stats</ActionLink>
                  </ProductActions>
                </ProductCard>

                <ProductCard>
                  <ProductImage>👕</ProductImage>
                  <ProductInfo>
                    <ProductName>Silk Blouse</ProductName>
                    <ProductMeta>
                      <MetaItem>Views: 2,102</MetaItem>
                      <MetaItem>Sales: 156</MetaItem>
                      <MetaItem>Rating: ⭐ 4.8</MetaItem>
                    </ProductMeta>
                  </ProductInfo>
                  <ProductPrice>₹{(99.50 * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ProductPrice>
                  <ProductActions>
                    <ActionLink href="#">Edit</ActionLink>
                    <ActionLink href="#">Stats</ActionLink>
                  </ProductActions>
                </ProductCard>
              </ProductsList>
            </TabContent>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <TabContent>
              <SectionTitle>All Orders</SectionTitle>
              <OrdersTable>
                <TableHeader>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableHeader>
                <TableBody>
                  {mockRecentOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>${order.amount.toFixed(2)}</TableCell>
                      <TableCell>2024-01-15</TableCell>
                      <StatusCell status={order.status}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </StatusCell>
                    </TableRow>
                  ))}
                </TableBody>
              </OrdersTable>
            </TabContent>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <TabContent>
              <SectionTitle>Seller Settings</SectionTitle>
              <SettingsGrid>
                <SettingCard>
                  <SettingTitle>Store Profile</SettingTitle>
                  <SettingDesc>Update your store name, description, and banner</SettingDesc>
                  <SettingButton href="#">Manage Profile</SettingButton>
                </SettingCard>

                <SettingCard>
                  <SettingTitle>Payment Methods</SettingTitle>
                  <SettingDesc>Add or update your bank account for payouts</SettingDesc>
                  <SettingButton href="#">Manage Payments</SettingButton>
                </SettingCard>

                <SettingCard>
                  <SettingTitle>Shipping Preferences</SettingTitle>
                  <SettingDesc>Set your shipping rates and delivery times</SettingDesc>
                  <SettingButton href="#">Shipping Settings</SettingButton>
                </SettingCard>

                <SettingCard>
                  <SettingTitle>Return Policies</SettingTitle>
                  <SettingDesc>Configure your return policy for customers</SettingDesc>
                  <SettingButton href="#">Edit Policies</SettingButton>
                </SettingCard>
              </SettingsGrid>
            </TabContent>
          )}
        </TabsSection>

        {/* Resources Section */}
        <ResourcesSection>
          <SectionTitle>Seller Resources</SectionTitle>
          <ResourcesGrid>
            <ResourceCard>
              <ResourceIcon>📚</ResourceIcon>
              <ResourceTitle>Seller Guide</ResourceTitle>
              <ResourceDesc>Learn best practices for selling on Indilink</ResourceDesc>
              <ResourceLink href="#">Read Guide →</ResourceLink>
            </ResourceCard>

            <ResourceCard>
              <ResourceIcon>🎓</ResourceIcon>
              <ResourceTitle>Video Tutorials</ResourceTitle>
              <ResourceDesc>Step-by-step videos on product listing and marketing</ResourceDesc>
              <ResourceLink href="#">Watch Videos →</ResourceLink>
            </ResourceCard>

            <ResourceCard>
              <ResourceIcon>💬</ResourceIcon>
              <ResourceTitle>Seller Community</ResourceTitle>
              <ResourceDesc>Connect with other sellers and share insights</ResourceDesc>
              <ResourceLink href="#">Join Community →</ResourceLink>
            </ResourceCard>

            <ResourceCard>
              <ResourceIcon>📞</ResourceIcon>
              <ResourceTitle>Support Team</ResourceTitle>
              <ResourceDesc>Get help from our seller support specialists</ResourceDesc>
              <ResourceLink href="#">Contact Support →</ResourceLink>
            </ResourceCard>
          </ResourcesGrid>
        </ResourcesSection>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
`;

const HeaderSection = styled.div`
  background: ${COLORS.PRIMARY_GRADIENT};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  margin-bottom: ${theme.spacing['3xl']};
`;

const HeaderContent = styled.div``;

const HeaderTitle = styled.h1`
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
`;

const HeaderDescription = styled.p`
  margin: 0;
  opacity: 0.9;
  font-size: ${theme.fontSizes.base};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['3xl']};
`;

const StatCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: flex-start;
`;

const StatIcon = styled.div`
  color: ${COLORS.PRIMARY};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const StatContent = styled.div``;

const StatLabel = styled.div`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.xs};
`;

const StatValue = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
  margin-bottom: ${theme.spacing.xs};
`;

const StatTrend = styled.div`
  color: ${props => props.positive ? COLORS.SUCCESS : COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
`;

const QuickActionsSection = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
`;

const SectionTitle = styled.h2`
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
`;

const ActionCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  text-align: center;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  box-shadow: ${theme.shadows.sm};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.md};
    background: ${COLORS.BG_SECONDARY};
  }
`;

const ActionIcon = styled.div`
  color: ${COLORS.PRIMARY};
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.spacing.md};
`;

const ActionLabel = styled.div`
  color: ${COLORS.TEXT_PRIMARY};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};
`;

const TabsSection = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
`;

const TabsList = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  border-bottom: 2px solid ${COLORS.BG_TERTIARY};
  margin-bottom: ${theme.spacing.lg};
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: ${theme.spacing.md} 0;
  cursor: pointer;
  color: ${props => props.active ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY};
  font-weight: ${props => props.active ? theme.fontWeights.bold : theme.fontWeights.medium};
  border-bottom: ${props => props.active ? `3px solid ${COLORS.PRIMARY}` : 'none'};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.transitions.fast};

  &:hover {
    color: ${COLORS.PRIMARY};
  }
`;

const TabContent = styled.div`
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
`;

const TableHeader = styled.thead`
  background: ${COLORS.BG_SECONDARY};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};

  &:hover {
    background: ${COLORS.BG_SECONDARY};
  }
`;

const TableCell = styled.td`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.sm};
`;

const StatusCell = styled(TableCell)`
  color: ${props => {
    switch (props.status) {
      case 'delivered': return COLORS.SUCCESS;
      case 'shipped': return COLORS.ACCENT;
      case 'processing': return COLORS.WARNING;
      default: return COLORS.TEXT_PRIMARY;
    }
  }};
  font-weight: ${theme.fontWeights.semibold};
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['3xl']};
`;

const TipCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  text-align: center;
`;

const TipIcon = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.spacing.md};
`;

const TipTitle = styled.h4`
  margin: 0 0 ${theme.spacing.sm} 0;
  color: ${COLORS.TEXT_PRIMARY};
`;

const TipDesc = styled.p`
  margin: 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.md};
  }
`;

const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ProductCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  gap: ${theme.spacing.lg};
  align-items: center;
  box-shadow: ${theme.shadows.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  text-align: center;
`;

const ProductInfo = styled.div``;

const ProductName = styled.h4`
  margin: 0 0 ${theme.spacing.sm} 0;
  color: ${COLORS.TEXT_PRIMARY};
`;

const ProductMeta = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const ProductPrice = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.PRIMARY};
`;

const ProductActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ActionLink = styled.a`
  color: ${COLORS.PRIMARY};
  text-decoration: none;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
`;

const SettingCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
`;

const SettingTitle = styled.h4`
  margin: 0 0 ${theme.spacing.sm} 0;
  color: ${COLORS.TEXT_PRIMARY};
`;

const SettingDesc = styled.p`
  margin: 0 0 ${theme.spacing.md} 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const SettingButton = styled.a`
  display: inline-block;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  text-decoration: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${COLORS.PRIMARY_DARK};
  }
`;

const ResourcesSection = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`;

const ResourceCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  text-align: center;
  box-shadow: ${theme.shadows.sm};
`;

const ResourceIcon = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.spacing.md};
`;

const ResourceTitle = styled.h4`
  margin: 0 0 ${theme.spacing.sm} 0;
  color: ${COLORS.TEXT_PRIMARY};
`;

const ResourceDesc = styled.p`
  margin: 0 0 ${theme.spacing.md} 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const ResourceLink = styled.a`
  color: ${COLORS.PRIMARY};
  text-decoration: none;
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default SellerCenter;
