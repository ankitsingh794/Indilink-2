import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../config/constants';
import { theme } from '../../styles/theme';
import Button from '../../components/ui/Button';
import { FiEdit, FiTrash2, FiEye, FiSearch, FiFilter, FiDownload } from 'react-icons/fi';

const ManageProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Handwoven Cotton Saree',
      category: 'Textiles & Fabrics',
      price: 2499,
      costPrice: 1200,
      gst: 18,
      quantity: 45,
      unit: 'pcs',
      status: 'active',
      views: 1245,
      sales: 23,
      rating: 4.8,
      hsnCode: '6204',
      image: 'https://via.placeholder.com/80'
    },
    {
      id: 2,
      name: 'Ceramic Handpainted Vase',
      category: 'Ceramics & Pottery',
      price: 1499,
      costPrice: 700,
      gst: 18,
      quantity: 12,
      unit: 'pcs',
      status: 'active',
      views: 856,
      sales: 8,
      rating: 4.6,
      hsnCode: '6910',
      image: 'https://via.placeholder.com/80'
    },
    {
      id: 3,
      name: 'Organic Spice Mix',
      category: 'Spices & Food',
      price: 399,
      costPrice: 150,
      gst: 5,
      quantity: 200,
      unit: 'kg',
      status: 'active',
      views: 2100,
      sales: 45,
      rating: 4.9,
      hsnCode: '0907',
      image: 'https://via.placeholder.com/80'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'sales':
          return b.sales - a.sales;
        case 'quantity':
          return b.quantity - a.quantity;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditData({ ...product });
  };

  const handleSaveEdit = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...editData } : p));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleStatusToggle = (id) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  const exportToCSV = () => {
    const csv = [
      ['Product Name', 'Category', 'Price (₹)', 'Cost Price (₹)', 'GST %', 'Quantity', 'Sales', 'Rating'],
      ...filteredProducts.map(p => [
        p.name,
        p.category,
        p.price,
        p.costPrice,
        p.gst,
        p.quantity,
        p.sales,
        p.rating
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const totalRevenue = filteredProducts.reduce((sum, p) => sum + (p.price * p.sales), 0);
  const totalProducts = filteredProducts.length;
  const totalSales = filteredProducts.reduce((sum, p) => sum + p.sales, 0);

  return (
    <PageContainer>
      <Container>
        <Header>
          <HeaderTitle>Manage Products</HeaderTitle>
          <HeaderStats>
            <StatItem>
              <StatLabel>Total Products</StatLabel>
              <StatValue>{totalProducts}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Total Sales</StatLabel>
              <StatValue>{totalSales}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Revenue</StatLabel>
              <StatValue>₹{totalRevenue.toLocaleString('en-IN')}</StatValue>
            </StatItem>
          </HeaderStats>
        </Header>

        {/* Search & Filter */}
        <ToolbarSection>
          <SearchBox>
            <FiSearch size={20} />
            <SearchInput
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>

          <ControlsGrid>
            <FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FilterSelect>

            <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="sales">Sort by Sales</option>
              <option value="quantity">Sort by Quantity</option>
            </SortSelect>

            <ExportButton onClick={exportToCSV}>
              <FiDownload size={18} />
              Export CSV
            </ExportButton>
          </ControlsGrid>
        </ToolbarSection>

        {/* Products Table */}
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price (₹)</th>
                <th>Cost (₹)</th>
                <th>Qty</th>
                <th>Sales</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <TableRow key={product.id} editing={editingId === product.id}>
                  <td>
                    <ProductCell>
                      <img src={product.image} alt={product.name} />
                      <ProductInfo>
                        <ProductName>{product.name}</ProductName>
                        <ProductMeta>{product.hsnCode}</ProductMeta>
                      </ProductInfo>
                    </ProductCell>
                  </td>
                  <td>{product.category}</td>
                  <td>
                    {editingId === product.id ? (
                      <EditInput
                        type="number"
                        value={editData.price}
                        onChange={(e) => setEditData({...editData, price: parseFloat(e.target.value)})}
                      />
                    ) : (
                      `₹${product.price}`
                    )}
                  </td>
                  <td>
                    {editingId === product.id ? (
                      <EditInput
                        type="number"
                        value={editData.costPrice}
                        onChange={(e) => setEditData({...editData, costPrice: parseFloat(e.target.value)})}
                      />
                    ) : (
                      `₹${product.costPrice}`
                    )}
                  </td>
                  <td>
                    {editingId === product.id ? (
                      <EditInput
                        type="number"
                        value={editData.quantity}
                        onChange={(e) => setEditData({...editData, quantity: parseInt(e.target.value)})}
                      />
                    ) : (
                      <>
                        {product.quantity} {product.unit}
                      </>
                    )}
                  </td>
                  <td>{product.sales}</td>
                  <td>
                    <Rating>⭐ {product.rating}</Rating>
                  </td>
                  <td>
                    <StatusBadge status={product.status}>
                      {product.status}
                    </StatusBadge>
                  </td>
                  <td>
                    <ActionButtons>
                      {editingId === product.id ? (
                        <>
                          <ActionBtn onClick={() => handleSaveEdit(product.id)} title="Save" green>Save</ActionBtn>
                          <ActionBtn onClick={() => setEditingId(null)} title="Cancel">Cancel</ActionBtn>
                        </>
                      ) : (
                        <>
                          <IconBtn onClick={() => handleEdit(product)} title="Edit">
                            <FiEdit />
                          </IconBtn>
                          <IconBtn 
                            onClick={() => handleStatusToggle(product.id)} 
                            title={product.status === 'active' ? 'Deactivate' : 'Activate'}
                            warning
                          >
                            <FiEye />
                          </IconBtn>
                          <IconBtn 
                            onClick={() => setShowDeleteConfirm(product.id)} 
                            title="Delete"
                            danger
                          >
                            <FiTrash2 />
                          </IconBtn>
                        </>
                      )}
                    </ActionButtons>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>

        {filteredProducts.length === 0 && (
          <EmptyState>
            <EmptyIcon>📦</EmptyIcon>
            <EmptyTitle>No Products Found</EmptyTitle>
            <EmptyText>Try adjusting your search or filters</EmptyText>
          </EmptyState>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <Modal>
            <ModalContent>
              <ModalTitle>Delete Product?</ModalTitle>
              <ModalText>
                This action cannot be undone. The product will be permanently removed.
              </ModalText>
              <ModalButtons>
                <Button 
                  danger 
                  onClick={() => handleDelete(showDeleteConfirm)}
                >
                  Delete Product
                </Button>
                <Button 
                  secondary 
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancel
                </Button>
              </ModalButtons>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </PageContainer>
  );
};

export default ManageProducts;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
`;

const Container = styled.div`
  max-width: 1400px;
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

const HeaderStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${theme.spacing.lg};
`;

const StatItem = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
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
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background: ${COLORS.BG_SECONDARY};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${COLORS.BG_TERTIARY};

  svg {
    color: ${COLORS.TEXT_SECONDARY};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: ${theme.fontSizes.base};
  color: ${COLORS.TEXT_PRIMARY};

  &::placeholder {
    color: ${COLORS.TEXT_SECONDARY};
  }

  &:focus {
    outline: none;
  }
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  background: ${COLORS.WHITE};
  color: ${COLORS.TEXT_PRIMARY};
  cursor: pointer;
  font-size: ${theme.fontSizes.base};
`;

const SortSelect = styled(FilterSelect)``;

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

const TableWrapper = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: ${COLORS.BG_SECONDARY};
    border-bottom: 2px solid ${COLORS.BG_TERTIARY};

    th {
      padding: ${theme.spacing.lg};
      text-align: left;
      font-weight: ${theme.fontWeights.semibold};
      color: ${COLORS.TEXT_PRIMARY};
      font-size: ${theme.fontSizes.sm};
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  tbody tr {
    border-bottom: 1px solid ${COLORS.BG_TERTIARY};
    transition: all ${theme.transitions.fast};

    &:hover {
      background: ${COLORS.BG_SECONDARY};
    }
  }

  td {
    padding: ${theme.spacing.lg};
    color: ${COLORS.TEXT_PRIMARY};
  }
`;

const TableRow = styled.tr`
  background: ${props => props.editing ? COLORS.PRIMARY + '10' : 'transparent'};
`;

const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};

  img {
    width: 60px;
    height: 60px;
    border-radius: ${theme.borderRadius.md};
    object-fit: cover;
  }
`;

const ProductInfo = styled.div``;

const ProductName = styled.div`
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing.xs};
`;

const ProductMeta = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${COLORS.TEXT_SECONDARY};
`;

const EditInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  background: ${COLORS.BG_SECONDARY};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px ${COLORS.PRIMARY}20;
  }
`;

const Rating = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: 20px;
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
  text-transform: uppercase;
  background: ${props => props.status === 'active' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.status === 'active' ? '#155724' : '#721c24'};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ActionBtn = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.xs};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  background: ${props => props.green ? COLORS.PRIMARY : COLORS.BG_SECONDARY};
  color: ${props => props.green ? COLORS.WHITE : COLORS.TEXT_PRIMARY};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.sm};
  }
`;

const IconBtn = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.sm};
  background: ${COLORS.WHITE};
  cursor: pointer;
  color: ${props => props.danger ? '#dc3545' : props.warning ? '#ffc107' : COLORS.PRIMARY};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
    background: ${props => props.danger ? '#dc3545' + '10' : props.warning ? '#ffc107' + '10' : COLORS.PRIMARY + '10'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']};
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  max-width: 400px;
  width: 90%;
  box-shadow: ${theme.shadows.lg};
`;

const ModalTitle = styled.h2`
  margin: 0 0 ${theme.spacing.md} 0;
  color: ${COLORS.TEXT_PRIMARY};
`;

const ModalText = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  margin-bottom: ${theme.spacing.lg};
`;

const ModalButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
`;
