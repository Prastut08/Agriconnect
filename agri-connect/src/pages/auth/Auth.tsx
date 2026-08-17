import { useState } from 'react';
import { Link, useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { Sprout, Phone, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialRole = (searchParams.get('role') as 'farmer' | 'customer') || 'farmer';
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: initialRole,
  });
  const { login, signup, isAuthenticated, role } = useAuth();

  if (isAuthenticated && role) {
    return <Navigate to={role === 'farmer' ? '/farmer/dashboard' : '/customer/home'} replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    if (isLogin) {
      success = login(formData.email, formData.password, formData.role);
    } else {
      success = signup(formData.name, formData.email, formData.password, formData.phone, formData.role);
    }
    if (success) {
      navigate(formData.role === 'farmer' ? '/farmer/dashboard' : '/customer/home');
    }
  };

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">AgriConnect</span>
          </Link>
          <h1 className="text-3xl font-bold text-text mb-2">{showForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-text-light">{showForgotPassword ? 'Enter your email to reset password' : isLogin ? 'Sign in to your account' : 'Start your farming journey'}</p>
        </div>

        <div className="bg-surface rounded-2xl shadow-sm border border-gray-100 p-8">
          {!showForgotPassword && (
            <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isLogin ? 'bg-white text-primary shadow-sm' : 'text-text-light hover:text-text'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  !isLogin ? 'bg-white text-primary shadow-sm' : 'text-text-light hover:text-text'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !showForgotPassword && (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange('name')}
              />
            )}
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange('email')}
            />
            {!showForgotPassword && (
              <>
                {!isLogin && (
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                  />
                )}
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                />
              </>
            )}
            {showForgotPassword && (
              <Button type="submit" className="w-full" size="lg">
                Send Reset Link
              </Button>
            )}
            {!showForgotPassword && (
              <Button type="submit" className="w-full" size="lg">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            )}
          </form>

          {!showForgotPassword && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface text-text-light">Or continue with</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-medium text-text">Continue with Google</span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors mt-3">
                <Phone className="w-5 h-5 text-text-light" />
                <span className="text-sm font-medium text-text">Continue with Phone</span>
              </button>
            </>
          )}

          {!showForgotPassword && (
            <p className="text-center text-sm text-text-light mt-6">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-medium hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          )}

          {showForgotPassword && (
            <button
              onClick={() => setShowForgotPassword(false)}
              className="text-primary text-sm font-medium hover:underline mt-4 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
