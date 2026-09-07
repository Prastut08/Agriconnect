import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Camera, Upload, Leaf, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { addProduceToMarketplace } from '../../lib/firestoreService';
import { useAuth } from '../../contexts/AuthContext';

export default function AddProduce() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Vegetables',
    quantity: '',
    price: '',
    availableDate: '',
    location: '',
    farmingMethod: 'organic',
    harvestDate: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity) {
      setStatusMessage({ type: 'error', text: 'Please fill in product name, price, and quantity.' });
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    const farmerId = currentUser?.id || 'farmer-1';
    const farmerName = currentUser?.name || 'Rajesh Kumar';
    const productData = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price) || 0,
      unit: formData.category === 'Grains' ? 'kg' : formData.category === 'Fruits' ? 'dozen' : 'kg',
      availableQuantity: Number(formData.quantity) || 50,
      availableDate: formData.availableDate || new Date().toISOString().split('T')[0],
      harvestDate: formData.harvestDate || new Date().toISOString().split('T')[0],
      location: formData.location || 'Punjab, India',
      distance: 4.8,
      farmingMethod: formData.farmingMethod as 'organic' | 'traditional' | 'hydroponic',
      freshness: 99,
      rating: 4.9,
      reviews: 1,
      images: [formData.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'],
      description: formData.description || 'Fresh harvested produce direct from farm',
      status: 'active',
    };
    const result = await addProduceToMarketplace(productData, farmerId, farmerName);

    setSubmitting(false);
    if (result.success) {
      setStatusMessage({ type: 'success', text: `Produce "${formData.name}" published to Cloud Firestore & Customer Marketplace!` });
      setTimeout(() => navigate('/farmer/seller'), 1500);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to save produce to Firestore.' });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Add New Produce</h1>
        <p className="text-text-light">List your produce for sale on Cloud Firestore Marketplace</p>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold border ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">Product Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Product Name"
                placeholder="e.g., Organic Tomatoes"
                value={formData.name}
                onChange={handleInputChange('name')}
              />
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category')(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Grains</option>
                  <option>Dairy</option>
                  <option>Herbs</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <Input
                label="Quantity Available"
                placeholder="e.g., 100 kg"
                value={formData.quantity}
                onChange={handleInputChange('quantity')}
              />
              <Input
                label="Price per Unit (Rs.)"
                type="number"
                placeholder="e.g., 45"
                value={formData.price}
                onChange={handleInputChange('price')}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Farming Method</label>
                <select
                  value={formData.farmingMethod}
                  onChange={(e) => handleInputChange('farmingMethod')(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="organic">Organic</option>
                  <option value="traditional">Traditional</option>
                  <option value="hydroponic">Hydroponic</option>
                </select>
              </div>
              <Input
                label="Harvest Date"
                type="date"
                value={formData.harvestDate}
                onChange={handleInputChange('harvestDate')}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <Input
                label="Available From"
                type="date"
                value={formData.availableDate}
                onChange={handleInputChange('availableDate')}
              />
              <Input
                label="Location"
                placeholder="Village, District"
                value={formData.location}
                onChange={handleInputChange('location')}
              />
            </div>

            <div className="mt-4">
              <Input
                label="Image URL (Unsplash or direct image link)"
                placeholder="https://images.unsplash.com/..."
                value={formData.imageUrl}
                onChange={handleInputChange('imageUrl')}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-text mb-1.5">Description</label>
              <textarea
                placeholder="Describe your produce..."
                value={formData.description}
                onChange={(e) => handleInputChange('description')(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">Photos</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary transition-colors">
              <Upload className="w-12 h-12 text-text-light mx-auto mb-4" />
              <p className="text-sm text-text-light mb-4">Upload photos of your produce</p>
              <Button variant="outline" type="button">
                <Camera className="w-4 h-4 mr-2" />
                Upload Photos
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-green-50 to-background sticky top-6">
            <h3 className="font-semibold text-text mb-4">Preview</h3>
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Leaf className="w-12 h-12 text-primary/30" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-text">{formData.name || 'Product Name'}</h4>
                <p className="text-sm text-text-light">{formData.category} • {formData.farmingMethod}</p>
                <p className="text-sm text-text-light mt-1">{formData.quantity || '0'} {formData.quantity ? 'available' : ''}</p>
                <p className="text-xl font-bold text-primary mt-2">Rs. {formData.price || '0'}/{formData.category === 'Grains' ? 'kg' : formData.category === 'Fruits' ? 'dozen' : 'kg'}</p>
                {formData.location && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-text-light">
                    <MapPin className="w-3 h-3" />
                    {formData.location}
                  </div>
                )}
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-3">
            <Button type="submit" size="lg" className="w-full font-bold shadow-md" disabled={submitting}>
              {submitting ? 'Publishing to Cloud Firestore...' : 'Publish Produce to Marketplace'}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
