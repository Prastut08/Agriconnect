import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Truck, Heart, ShoppingCart, Leaf, Calendar, Droplets, Sprout } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { TraceabilityTimeline } from '../../components/customer/TraceabilityTimeline';
import { mockProducts, mockReviews } from '../../data/mockData';

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];
  const reviews = mockReviews.filter((r) => r.productId === product.id);
  const relatedProducts = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center gap-2 text-sm text-text-light">
        <Link to="/customer/home" className="hover:text-text">Home</Link>
        <span>/</span>
        <Link to="/customer/products" className="hover:text-text">Products</Link>
        <span>/</span>
        <span className="text-text">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mb-4">
            <Leaf className="w-32 h-32 text-primary/20" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <Badge variant={product.farmingMethod === 'organic' ? 'success' : 'info'}>{product.farmingMethod}</Badge>
                <h1 className="text-3xl font-bold text-text mt-2">{product.name}</h1>
                <p className="text-text-light">by {product.farmerName}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="font-bold text-text">{product.rating}</span>
                <span className="text-text-light">({product.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-text-light" />
              <span className="text-text">{product.location} • {product.distance} km away</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-text-light" />
              <span className="text-text">Harvested: {new Date(product.harvestDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Droplets className="w-4 h-4 text-text-light" />
              <span className="text-text">Freshness: {product.freshness}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-text-light" />
              <span className="text-text">Estimated delivery: 2-3 hours</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sprout className="w-4 h-4 text-text-light" />
              <span className="text-text">Farming method: {product.farmingMethod}</span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <span className="text-4xl font-bold text-text">Rs. {product.price}</span>
              <span className="text-lg text-text-light">/{product.unit}</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-light">Available</p>
              <p className="font-bold text-text">{product.availableQuantity} {product.unit}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="flex-1">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="primary" className="flex-1">
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-text mb-3">About This Product</h3>
            <p className="text-text-light">{product.description}</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">Farmer Story</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{product.farmerName.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <p className="font-semibold text-text">{product.farmerName}</p>
                <p className="text-sm text-text-light">Verified Farmer • {product.rating} rating</p>
              </div>
            </div>
            <p className="text-sm text-text-light">
              {product.farmerName} has been farming for over 10 years, specializing in sustainable and organic farming practices. All produce is grown with care and harvested at peak freshness.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">Reviews ({product.reviews})</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="pb-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{review.customerName.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <span className="font-semibold text-text">{review.customerName}</span>
                    </div>
                    <div className="flex items-center gap-1">
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
          </Card>
        </div>

        <div className="space-y-6">
          <TraceabilityTimeline product={product} />

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">Related Products</h3>
            <div className="space-y-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/customer/products/${p.id}`} className="block">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-8 h-8 text-primary/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text text-sm truncate">{p.name}</p>
                      <p className="text-xs text-text-light">{p.farmerName}</p>
                      <p className="text-sm font-bold text-primary">Rs. {p.price}/{p.unit}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
