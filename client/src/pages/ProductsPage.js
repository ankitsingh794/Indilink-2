import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../config/constants';
import { theme } from '../styles/theme';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        if (data.status && Array.isArray(data.data)) {
          setProducts(data.data);
          setFilteredProducts(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        (product.product_name || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      (product.price || 0) >= priceRange[0] && (product.price || 0) <= priceRange[1]
    );

    // Sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, sortBy, products]);

  return (
    <ProductsContainer>
      <FilterSection mobileOpen={mobileFiltersOpen}>
        <FilterHeader>
          <h3>Filters</h3>
          <CloseBtn onClick={() => setMobileFiltersOpen(false)}>
            <FiX size={24} />
          </CloseBtn>
        </FilterHeader>

        <FilterGroup>
          <FilterTitle>Price Range</FilterTitle>
          <PriceInput
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
          <PriceLabel>Up to ${priceRange[1]}</PriceLabel>
        </FilterGroup>

        <FilterGroup>
          <FilterTitle>Sort By</FilterTitle>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </Select>
        </FilterGroup>
      </FilterSection>

      <ProductsContent>
        <SearchHeader>
          <SearchBox>
            <SearchIcon><FiSearch size={20} /></SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>

          <MobileFilterBtn onClick={() => setMobileFiltersOpen(true)}>
            <FiFilter size={20} /> Filters
          </MobileFilterBtn>
        </SearchHeader>

        <ResultsInfo>
          Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </ResultsInfo>

        {loading ? (
          <LoadingMessage>Loading products...</LoadingMessage>
        ) : filteredProducts.length === 0 ? (
          <EmptyState>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms</p>
          </EmptyState>
        ) : (
          <ProductsGrid>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductImageContainer>
                  {product.image && (
                    <ProductImage src={product.image} alt={product.product_name} />
                  )}
                  <ProductBadge>New</ProductBadge>
                </ProductImageContainer>

                <ProductInfo>
                  <ProductName>{product.product_name}</ProductName>
                  <ProductPrice>₹{((product.price || 0) * 1).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ProductPrice>

                  <ProductDesc>
                    {product.description?.substring(0, 80)}...
                  </ProductDesc>

                  <ProductActions>
                    <Button
                      onClick={() => addToCart(product)}
                      size="small"
                    >
                      Add to Cart
                    </Button>
                  </ProductActions>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
        )}
      </ProductsContent>
    </ProductsContainer>
  );
};

const ProductsContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 0;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const FilterSection = styled.div`
  background: ${COLORS.WHITE};
  padding: ${theme.spacing.lg};
  border-right: 1px solid ${COLORS.BG_TERTIARY};
  height: fit-content;
  position: sticky;
  top: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.lg}) {
    position: fixed;
    left: 0;
    top: 0;
    width: 280px;
    height: 100vh;
    z-index: 1000;
    border-right: none;
    box-shadow: ${theme.shadows.lg};
    transform: ${props => props.mobileOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform ${theme.transitions.base};
    overflow-y: auto;
  }
`;

const FilterHeader = styled.div`
  display: none;

  @media (max-width: ${theme.breakpoints.lg}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.lg};

    h3 {
      margin: 0;
    }
  }
`;

const CloseBtn = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${COLORS.TEXT_PRIMARY};

  @media (max-width: ${theme.breakpoints.lg}) {
    display: flex;
  }
`;

const FilterGroup = styled.div`
  margin-bottom: ${theme.spacing['2xl']};
`;

const FilterTitle = styled.h4`
  margin: 0 0 ${theme.spacing.md} 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
`;

const PriceInput = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: ${COLORS.BG_TERTIARY};
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${COLORS.PRIMARY};
    cursor: pointer;
    box-shadow: ${theme.shadows.md};
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${COLORS.PRIMARY};
    cursor: pointer;
    border: none;
    box-shadow: ${theme.shadows.md};
  }
`;

const PriceLabel = styled.p`
  margin: ${theme.spacing.md} 0 0 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.md};
  background: ${COLORS.WHITE};
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${COLORS.PRIMARY};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ProductsContent = styled.div`
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
`;

const SearchHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  color: ${COLORS.TEXT_SECONDARY};
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing['3xl']};
  border: 2px solid ${COLORS.BG_TERTIARY};
  border-radius: ${theme.borderRadius.lg};
  background: ${COLORS.WHITE};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const MobileFilterBtn = styled.button`
  display: none;
  background: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  gap: ${theme.spacing.sm};
  align-items: center;

  @media (max-width: ${theme.breakpoints.lg}) {
    display: flex;
  }
`;

const ResultsInfo = styled.p`
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.lg};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};

  h3 {
    color: ${COLORS.TEXT_PRIMARY};
    font-size: ${theme.fontSizes.xl};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${COLORS.TEXT_SECONDARY};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${theme.spacing.md};
  }
`;

const ProductCard = styled.div`
  background: ${COLORS.WHITE};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  background: ${COLORS.BG_SECONDARY};
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${theme.transitions.base};

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductBadge = styled.span`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${COLORS.ACCENT};
  color: ${COLORS.WHITE};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
`;

const ProductInfo = styled.div`
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ProductName = styled.h3`
  margin: 0;
  color: ${COLORS.TEXT_PRIMARY};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  line-height: 1.4;
`;

const ProductPrice = styled.p`
  margin: 0;
  color: ${COLORS.PRIMARY};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
`;

const ProductDesc = styled.p`
  margin: 0;
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${theme.fontSizes.xs};
  line-height: 1.5;
  min-height: 40px;
`;

const ProductActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

export default ProductsPage;
