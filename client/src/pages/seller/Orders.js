import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../config/constants';
import { theme } from '../../styles/theme';
import Button from '../../components/ui/Button';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiMapPin, FiDownload } from 'react-icons/fi';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      customer: 'Rajesh Kumar',
      product: 'Premium Handwoven Cotton Saree',
      quantity: 2,
      amount: 4998,
      status: 'delivered',
      orderDate: '2024-01-20',
      deliveryDate: '2024-01-25',
      pincode: '700001',
      state: 'West Bengal',
      location: 'Kolkata',
      trackingId: 'TRK-IND-2024001',
      paymentMethod: 'NEFT',
      currency: '₹'
    },
    {
      id: 'ORD-2024-002',
      customer: 'Priya Sharma',
      product: 'Ceramic Handpainted Vase',
      quantity: 1,
      amount: 1499,
      status: 'in-transit',
      orderDate: '2024-01-22',
      deliveryDate: '2024-01-28',
      pincode: '700091',
      state: 'West Bengal',
      location: 'Kolkata',
      trackingId: 'TRK-IND-2024002',
      paymentMethod: 'UPI',
      currency: '₹'
    },
    {
      id: 'ORD-2024-003',
      customer: 'Amit Singh',
      product: 'Organic Spice Mix',
      quantity: 5,
      amount: 1995,
      status: 'processing',
      orderDate: '2024-01-24',
      deliveryDate: '2024-01-29',
      pincode: '700051',
      state: 'West Bengal',
      location: 'Kolkata',
      trackingId: 'TRK-IND-2024003',
      paymentMethod: 'UPI',
      currency: '₹'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statusConfig = {
    processing: { color: '#ffc107', icon: <FiClock />, label: 'Processing' },
    'in-transit': { color: '#17a2b8', icon: <FiTruck />, label: 'In Transit' },
    delivered: { color: '#28a745', icon: <FiCheckCircle />, label: 'Delivered' },
    cancelled: { color: '#dc3545', icon: <FiPackage />, label: 'Cancelled' }
  };

  const filteredOrders = orders.filter(order => {
    const matchStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchSearch = order.id.includes(searchTerm) ||
                       order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       order.product.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const exportOrders = () => {
    const csv = [
      ['Order ID', 'Customer', 'Product', 'Quantity', 'Amount (₹)', 'Status', 'Order Date', 'Delivery Date', 'Location'],
      ...filteredOrders.map(o => [
        o.id,
        o.customer,
        o.product,
        o.quantity,
        o.amount,
        o.status,
        o.orderDate,
        o.deliveryDate,
        o.location
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const stats = {
    total: orders.length,
    processing: orders.filter(o => o.status === 'processing').length,
    inTransit: orders.filter(o => o.status === 'in-transit').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.reduce((sum, o) => sum + o.amount, 0)
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <HeaderTitle>Order Management</HeaderTitle>
          <StatsGrid>
            <StatCard>
              <StatLabel>Total Orders</StatLabel>
              <StatValue>{stats.total}</StatValue>
            </StatCard>
            <StatCard processing>
              <StatLabel>Processing</StatLabel>
              <StatValue>{stats.processing}</StatValue>
            </StatCard>
            <StatCard transit>
              <StatLabel>In Transit</StatLabel>
              <StatValue>{stats.inTransit}</StatValue>
            </StatCard>
            <StatCard delivered>
              <StatLabel>Delivered</StatLabel>
              <StatValue>{stats.delivered}</StatValue>
            </StatCard>
            <StatCard revenue>
              <StatLabel>Total Revenue</StatLabel>
              <StatValue>₹{stats.revenue.toLocaleString('en-IN')}</StatValue>
            </StatCard>
          </StatsGrid>
        </Header>

        <ToolbarSection>
          <SearchInput
            type="text"
            placeholder="Search by Order ID, Customer, or Product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </FilterSelect>
          <ExportButton onClick={exportOrders}>
            <FiDownload size={18} />
            Export
          </ExportButton>
        </ToolbarSection>

        {/* Orders List */}
        <OrdersList>
          {filteredOrders.map(order => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <OrderId>{order.id}</OrderId>
                <StatusBadge status={order.status}>
                  {statusConfig[order.status]?.icon}
                  {statusConfig[order.status]?.label}
                </StatusBadge>
              </OrderHeader>

              <OrderContent>
                <OrderColumn>
                  <Label>Customer</Label>
                  <Value>{order.customer}</Value>
                </OrderColumn>

                <OrderColumn>
                  <Label>Product</Label>
                  <Value>{order.product}</Value>
                </OrderColumn>

                <OrderColumn>
                  <Label>Quantity</Label>
                  <Value>{order.quantity} pcs</Value>
                </OrderColumn>

                <OrderColumn>
                  <Label>Amount</Label>
                  <PriceValue>₹{order.amount}</PriceValue>
                </OrderColumn>

                <OrderColumn>
                  <Label>Location</Label>
                  <LocationValue>
                    <FiMapPin size={16} />
                    {order.location} ({order.pincode})
                  </LocationValue>
                </OrderColumn>

                <OrderColumn>
                  <Label>Tracking</Label>
                  <Value>{order.trackingId}</Value>
                </OrderColumn>
              </OrderContent>

              <OrderDates>
                <DateItem>
                  <DateLabel>Order Date:</DateLabel>
                  <DateValue>{order.orderDate}</DateValue>
                </DateItem>
                <DateItem>
                  <DateLabel>Expected Delivery:</DateLabel>
                  <DateValue>{order.deliveryDate}</DateValue>
                </DateItem>
                <DateItem>
                  <DateLabel>Payment:</DateLabel>
                  <DateValue>{order.paymentMethod}</DateValue>
                </DateItem>
              </OrderDates>

              <OrderActions>
                {order.status === 'processing' && (
                  <ActionButton 
                    onClick={() => updateOrderStatus(order.id, 'in-transit')}
                    blue
                  >
                    Mark as In Transit
                  </ActionButton>
                )}
                {order.status === 'in-transit' && (
                  <ActionButton 
                    onClick={() => updateOrderStatus(order.id, 'delivered')}
                    green
                  >
                    Mark as Delivered
                  </ActionButton>
                )}
                {(order.status === 'processing' || order.status === 'in-transit') && (
                  <ActionButton 
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    red
                  >
                    Cancel Order
                  </ActionButton>
                )}
                <ActionButton secondary>Print Shipping Label</ActionButton>
              </OrderActions>
            </OrderCard>
          ))}
        </OrdersList>

        {filteredOrders.length === 0 && (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyTitle>No Orders Found</EmptyTitle>
            <EmptyText>Try adjusting your search or filters</EmptyText>
          </EmptyState>
        )}
      </Container>
    </PageContainer>
  );
};

export default Orders;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing['2xl']};
`;

const HeaderTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${theme.spacing.lg} 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
`;

const StatCard = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border-left: 4px solid ${props => 
    props.revenue ? COLORS.PRIMARY :
    props.delivered ? '#28a745' :
    props.transit ? '#17a2b8' :
    props.processing ? '#ffc107' : COLORS.PRIMARY
  };
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
  margin-bottom: ${theme.spacing.xs};
`;

const StatValue = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.PRIMARY};
`;

const ToolbarSection = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  background: ${COLORS.WHITE};
  font-size: ${theme.fontSizes.base};
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px ${COLORS.PRIMARY}20;
  }
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  background: ${COLORS.WHITE};
  cursor: pointer;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const OrderCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  transition: all ${theme.transitions.fast};

  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg};
  background: ${COLORS.BG_SECONDARY};
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};
`;

const OrderId = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: 20px;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.bold};
  background: ${props => {
    switch(props.status) {
      case 'processing': return '#ffc107' + '20';
      case 'in-transit': return '#17a2b8' + '20';
      case 'delivered': return '#28a745' + '20';
      default: return '#dc3545' + '20';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'processing': return '#ffc107';
      case 'in-transit': return '#17a2b8';
      case 'delivered': return '#28a745';
      default: return '#dc3545';
    }
  }};
`;

const OrderContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};
`;

const OrderColumn = styled.div``;

const Label = styled.div`
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_SECONDARY};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.xs};
`;

const Value = styled.div`
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  color: ${COLORS.TEXT_PRIMARY};
`;

const PriceValue = styled(Value)`
  color: ${COLORS.PRIMARY};
  font-size: ${theme.fontSizes.lg};
`;

const LocationValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.base};
  color: ${COLORS.TEXT_PRIMARY};
`;

const OrderDates = styled.div`
  display: flex;
  gap: ${theme.spacing['2xl']};
  padding: ${theme.spacing.lg};
  background: ${COLORS.BG_SECONDARY};
  border-bottom: 1px solid ${COLORS.BG_TERTIARY};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
  }
`;

const DateItem = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const DateLabel = styled.div`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
`;

const DateValue = styled.div`
  color: ${COLORS.TEXT_PRIMARY};
  font-weight: ${theme.fontWeights.semibold};
`;

const OrderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  transition: all ${theme.transitions.fast};
  background: ${props => 
    props.green ? '#28a745' :
    props.blue ? '#17a2b8' :
    props.red ? '#dc3545' : COLORS.BG_SECONDARY
  };
  color: ${props => 
    props.green || props.blue || props.red ? COLORS.WHITE : COLORS.TEXT_PRIMARY
  };
  border: ${props => props.secondary ? `1px solid ${COLORS.BG_TERTIARY}` : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']};
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  color: ${COLORS.TEXT_SECONDARY};
`;

const EmptyIcon = styled.div`
  font-size: 60px;
  margin-bottom: ${theme.spacing.lg};
`;

const EmptyTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  color: ${COLORS.TEXT_PRIMARY};
  margin-bottom: ${theme.spacing.sm};
`;

const EmptyText = styled.p`
  margin: 0;
`;
