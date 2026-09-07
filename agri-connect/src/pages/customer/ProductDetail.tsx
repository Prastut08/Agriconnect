import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Truck, Heart, ShoppingCart, Leaf, Calendar, Droplets, Sprout, ArrowLeft } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { TraceabilityTimeline } from '../../components/customer/TraceabilityTimeline';
import { subscribeToMarketplaceProducts } from '../../lib/firestoreService';
import { mockReviews } from '../../data/mockData';
import type { Product } from '../../types';

const DEFAULT_PRODUCT_IMAGES: Record<string, string> = {
  Wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
  Tomatoes: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
  Potatoes: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
  Rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
  Onions: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&w=800&q=80',
  Mangoes: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
  Spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
  Carrots: 'https://images.unsplash.com/photo-1598170845058-12f6a6736561?auto=format&fit=crop&w=800&q=80',
};

export default function ProductDetail() {
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToMarketplaceProducts((products) => {
      setAllProducts(products);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const product = allProducts.find((p) => p.id === id) || allProducts[0];
  const reviews = product ? mockReviews.filter((r) => r.productId === product.id) : [];
  const relatedProducts = product
    ? allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-text-light font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center space-y-4">
          <Leaf className="w-16 h-16 text-gray-300 mx-auto" />
          <h2 className="text-xl font-bold text-text">Product Not Found</h2>
          <p className="text-text-light">This product may have been removed or is no longer available.</p>
          <Link to="/customer/products">
            <Button variant="primary">Browse All Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl =
    product.images && product.images.length > 0 && product.images[0]
      ? product.images[0]
      : DEFAULT_PRODUCT_IMAGES[product.name] || DEFAULT_PRODUCT_IMAGES['Tomatoes'];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-light">
        <Link to="/customer/home" className="hover:text-text transition-colors">Home</Link>
        <span>/</span>
        <Link to="/customer/products" className="hover:text-text transition-colors">Products</Link>
        <span>/</span>
        <span className="text-text font-medium">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <div className="aspect-square bg-gradient-to-br from-green-100 to-green-50 rounded-3xl overflow-hidden shadow-lg">
            <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <Badge variant={product.farmingMethod === 'organic' ? 'success' : 'info'}>
                  🌿 {product.farmingMethod}
                </Badge>
                <h1 className="text-3xl font-bold text-text mt-2">{product.name}</h1>
                <p className="text-text-light mt-1">
                  by <strong className="text-text">{product.farmerName}</strong>
                </p>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="font-bold text-text">{product.rating}</span>
                <span className="text-text-light text-sm">({product.reviews})</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-gray-50 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-text">{product.location} • {product.distance} km away</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-secondary" />
              <span className="text-text">
                Harvested: {new Date(product.harvestDate).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-text">Freshness: <strong>{product.freshness}%</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span className="text-text">Estimated delivery: 2–3 hours</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sprout className="w-4 h-4 text-green-600" />
              <span className="text-text capitalize">Farming method: {product.farmingMethod}</span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <span className="text-4xl font-black text-primary">₹{product.price}</span>
              <span className="text-lg text-text-light">/{product.unit}</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-light uppercase tracking-wider font-semibold">In Stock</p>
              <p className="font-bold text-text">{product.availableQuantity} {product.unit}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 rounded-xl">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="primary" className="flex-1 rounded-xl font-bold">
              Buy Now
            </Button>
          </div>

          <Link to="/customer/products" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card className="p-6">
            <h3 className="font-semibold text-text mb-3 text-lg">About This Product</h3>
            <p className="text-text-light leading-relaxed">{product.description}</p>
          </Card>

          {/* Farmer Story */}
          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4 text-lg">Farmer Story</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {product.farmerName.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-text">{product.farmerName}</p>
                <p className="text-sm text-text-light">Verified Farmer • ⭐ {product.rating} rating</p>
              </div>
            </div>
            <p className="text-sm text-text-light leading-relaxed">
              {product.farmerName} has been farming for over 10 years, specializing in sustainable and{' '}
              {product.farmingMethod} farming practices. All produce is grown with care and harvested at peak
              freshness, ensuring you get the best quality directly from the farm.
            </p>
          </Card>

          {/* Reviews */}
          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4 text-lg">Reviews ({product.reviews})</h3>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">
                            {review.customerName.split(' ').map((n) => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-semibold text-text text-sm">{review.customerName}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-text-light">{review.comment}</p>
                    <p className="text-xs text-text-light mt-1">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-light text-sm">No reviews yet. Be the first to review!</p>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <TraceabilityTimeline product={product} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <Card className="p-6">
              <h3 className="font-semibold text-text mb-4">Related Products</h3>
              <div className="space-y-3">
                {relatedProducts.map((p) => {
                  const relImg =
                    p.images && p.images.length > 0 && p.images[0]
                      ? p.images[0]
                      : DEFAULT_PRODUCT_IMAGES[p.name] || DEFAULT_PRODUCT_IMAGES['Tomatoes'];
                  return (
                    <Link key={p.id} to={`/customer/products/${p.id}`} className="block">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-200">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={relImg} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-text text-sm truncate">{p.name}</p>
                          <p className="text-xs text-text-light">{p.farmerName}</p>
                          <p className="text-sm font-bold text-primary">₹{p.price}/{p.unit}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
