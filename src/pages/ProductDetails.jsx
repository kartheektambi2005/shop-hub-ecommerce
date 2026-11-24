import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchProductById, fetchProductsByCategory } from '../services/productService';
import { useFetch } from '../hooks/useFetch';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ImageGallery from '../components/product/ImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import RelatedProducts from '../components/product/RelatedProducts';
import NotFound from './NotFound';

function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useFetch(() => fetchProductById(id), [id]);

  const { data: relatedProducts } = useFetch(
    () => (product ? fetchProductsByCategory(product.category) : Promise.resolve([])),
    [product?.category],
  );

  useDocumentTitle(product ? product.title : 'Product');

  if (isLoading) return <Loader label="Loading product details..." />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!product) return <NotFound message="We couldn't find that product." />;

  return (
    <div>
      <Breadcrumbs
        trail={[
          { label: product.category.replace(/-/g, ' '), to: `/products?category=${product.category}` },
          { label: product.title },
        ]}
      />

      <div className="container py-4">
        <div className="row g-5">
          <div className="col-lg-6">
            <ImageGallery
              key={product.id}
              images={product.images?.length ? product.images : [product.thumbnail]}
              title={product.title}
            />
          </div>

          <div className="col-lg-6">
            <ProductInfo key={product.id} product={product} />
          </div>
        </div>

        {relatedProducts && (
          <RelatedProducts products={relatedProducts} currentProductId={product.id} />
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
