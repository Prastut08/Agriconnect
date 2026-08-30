import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Users, ChevronRight, Leaf, Sun, Cloud } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export default function RoleSelect() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  const handleRoleSelect = (roleId: 'farmer' | 'customer') => {
    // If already authenticated with the right role, go directly to dashboard
    if (isAuthenticated && role === roleId) {
      navigate(roleId === 'farmer' ? '/farmer/dashboard' : '/customer/home');
    } else {
      // Send to the portal-specific auth page
      navigate(roleId === 'farmer' ? '/auth/farmer' : '/auth/customer');
    }
  };

  const roles = [
    {
      id: 'farmer' as const,
      title: 'FARMER',
      subtitle: 'Grow Smarter',
      description: 'AI-powered insights, market intelligence, and tools to maximize your farm productivity and profits.',
      icon: Sprout,
      color: 'primary',
      features: ['AI Crop Recommendations', 'Disease Detection', 'Yield Prediction', 'Market Prices', 'Financial Analytics'],
    },
    {
      id: 'customer' as const,
      title: 'CUSTOMER',
      subtitle: 'Eat Fresh',
      description: 'Buy directly from verified farmers. Fresh produce, transparent pricing, and farm-to-table traceability.',
      icon: Users,
      color: 'secondary',
      features: ['Direct from Farmers', 'Fresh & Organic', 'Best Prices', 'Traceability', 'Home Delivery'],
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 opacity-20">
          <Sun className="w-32 h-32 text-accent" />
        </div>
        <div className="absolute bottom-32 left-1/4 opacity-20">
          <Cloud className="w-24 h-24 text-primary" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Welcome to AgriConnect</h1>
            <p className="text-xl text-text-light">Choose your role to get started</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                className="cursor-pointer block"
              >
                <div
                  className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${
                    hoveredRole === role.id
                      ? 'border-primary shadow-2xl scale-105 bg-surface'
                      : 'border-gray-200 bg-surface/50 hover:border-primary/50'
                  }`}
                >
                  <div className={`w-20 h-20 ${role.id === 'farmer' ? 'bg-green-100' : 'bg-blue-100'} rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0`}>
                    <role.icon className={`w-10 h-10 ${role.id === 'farmer' ? 'text-primary' : 'text-secondary'}`} />
                  </div>

                  <h2 className="text-3xl font-bold text-text mb-2 text-center md:text-left">{role.title}</h2>
                  <p className="text-lg text-primary font-medium mb-4 text-center md:text-left">{role.subtitle}</p>
                  <p className="text-text-light mb-6 text-center md:text-left">{role.description}</p>

                  <ul className="space-y-3 mb-8">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-text">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${role.id === 'farmer' ? 'bg-green-100' : 'bg-blue-100'}`}>
                          <ChevronRight className={`w-4 h-4 ${role.id === 'farmer' ? 'text-primary' : 'text-secondary'}`} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={role.id === 'farmer' ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                  >
                    {isAuthenticated ? `Go to ${role.title} Dashboard` : `Login / Sign Up as ${role.title}`}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-text-light">
              {isAuthenticated
                ? 'You can switch between roles anytime from your dashboard'
                : 'Sign in or create an account to access your dashboard'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
