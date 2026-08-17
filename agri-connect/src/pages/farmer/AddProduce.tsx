import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Camera, Upload, Leaf, MapPin } from 'lucide-react';

export default function AddProduce() {
  const navigate = useNavigate();
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
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Produce listed successfully!');
    navigate('/farmer/seller');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Add New Produce</h1>
        <p className="text-text-light">List your produce for sale</p>
      </div>

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
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Leaf className="w-12 h-12 text-primary/30" />
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
            <Button type="submit" size="lg" className="w-full">
              List Produce
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => navigate(-1)}>
              Save Draft
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
