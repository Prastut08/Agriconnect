import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Sprout, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function FarmerAuth() {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated, role, loading } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-800 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated && role === 'farmer') {
    return <Navigate to="/farmer/dashboard" replace />;
  }

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = isLogin
        ? await login(formData.email, formData.password, 'farmer')
        : await signup(formData.name, formData.email, formData.password, formData.phone, 'farmer');

      if (res.success) {
        navigate('/farmer/dashboard');
      } else {
        setError(res.error || 'Authentication failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-800 flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background texture blobs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-300/5 rounded-full blur-2xl" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg">AgriConnect</span>
        </div>

        {/* Hero content */}
        <div className="relative z-10">
          <div className="text-6xl mb-6">🌾</div>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Farmer<br />
            <span className="text-emerald-300">Intelligence</span><br />
            Platform
          </h1>
          <p className="text-emerald-100/80 text-lg leading-relaxed mb-8">
            AI-powered crop management, real-time market prices, and smart insights to maximize your farm's productivity and profit.
          </p>
          <div className="space-y-3">
            {['🤖 AI Crop Disease Detection', '📈 Market Sell/Wait Advisor', '🌦 Smart Weather Irrigation', '💰 Profit & Finance Tracker'].map(f => (
              <div key={f} className="flex items-center gap-3 text-emerald-100/90 text-sm font-medium">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom footer */}
        <div className="relative z-10">
          <p className="text-emerald-200/50 text-xs">
            Trusted by 50,000+ farmers across India
          </p>
        </div>
      </div>

      {/* Right auth panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-emerald-700 rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-emerald-800 text-lg">AgriConnect</span>
          </div>

          {/* Back link */}
          <Link to="/role" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to role select
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs font-semibold text-emerald-700">Farmers Portal</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-1">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Sign in to your farmer account' : 'Join thousands of smart farmers'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError(null); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${isLogin ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError(null); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${!isLogin ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-sm mb-5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={e => handleChange('name')(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={e => handleChange('email')(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-sm"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={e => handleChange('phone')(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isLogin ? 'Enter your password' : 'Min. 6 characters'}
                  value={formData.password}
                  onChange={e => handleChange('password')(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed text-sm mt-2"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Sign In to Farmer Portal' : 'Create Farmer Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? "New to AgriConnect? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(null); }}
              className="text-emerald-700 font-semibold hover:underline"
            >
              {isLogin ? 'Create account' : 'Sign in'}
            </button>
          </p>

          <p className="text-center text-xs text-gray-400 mt-4">
            Looking for the{' '}
            <Link to="/auth/customer" className="text-blue-500 hover:underline font-medium">
              Customer Portal?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
