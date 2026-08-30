import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { Sprout, Phone, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialRole = (searchParams.get('role') as 'farmer' | 'customer') || 'farmer';
  const { login, signup, isAuthenticated, role, loading: authLoading } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dryTestLogs, setDryTestLogs] = useState<Array<{ step: string; status: 'pending' | 'success' | 'error'; details?: string }>>([]);
  const [runningDryTest, setRunningDryTest] = useState(false);
  const [showDryTestPanel, setShowDryTestPanel] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: initialRole,
  });

  useEffect(() => {
    if (initialRole && formData.role !== initialRole) {
      setFormData((prev) => ({ ...prev, role: initialRole }));
    }
  }, [initialRole]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-text-light">Initializing Firebase Security...</p>
      </div>
    );
  }

  if (isAuthenticated && role && !showDryTestPanel) {
    return <Navigate to={role === 'farmer' ? '/farmer/dashboard' : '/customer/home'} replace />;
  }

  const handleRoleToggle = (selectedRole: 'farmer' | 'customer') => {
    setFormData((prev) => ({ ...prev, role: selectedRole }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      let res;
      if (isLogin) {
        res = await login(formData.email, formData.password, formData.role);
      } else {
        res = await signup(formData.name, formData.email, formData.password, formData.phone, formData.role);
      }

      if (res.success) {
        navigate(formData.role === 'farmer' ? '/farmer/dashboard' : '/customer/home');
      } else {
        setError(res.error || 'Authentication failed. Please check your details.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const runAutomatedDryTest = async () => {
    setRunningDryTest(true);
    setShowDryTestPanel(true);
    setDryTestLogs([]);

    const timestamp = Date.now().toString().slice(-5);
    const farmerTestEmail = `test.farmer.${timestamp}@agriconnect.com`;
    const customerTestEmail = `test.customer.${timestamp}@agriconnect.com`;
    const testPassword = 'TestPassword123!';

    const addLog = (step: string, status: 'pending' | 'success' | 'error', details?: string) => {
      setDryTestLogs((prev) => [...prev, { step, status, details }]);
    };

    try {
      // Step 1: Farmer Portal Sign Up
      addLog('1. Farmers Portal (farmer-b00f2): Creating test account', 'pending');
      const farmerSignUp = await signup('Test Farmer', farmerTestEmail, testPassword, '+919999988888', 'farmer');
      if (farmerSignUp.success) {
        addLog(`1. Farmers Portal (farmer-b00f2): Sign Up SUCCESS (${farmerTestEmail})`, 'success');
      } else {
        addLog(`1. Farmers Portal (farmer-b00f2): Sign Up (${farmerSignUp.error})`, 'error');
      }

      // Step 2: Farmer Portal Sign In
      addLog('2. Farmers Portal (farmer-b00f2): Testing Sign In', 'pending');
      const farmerSignIn = await login(farmerTestEmail, testPassword, 'farmer');
      if (farmerSignIn.success) {
        addLog(`2. Farmers Portal (farmer-b00f2): Sign In Verified! User ID: ${farmerSignIn.user?.id}`, 'success');
      } else {
        addLog(`2. Farmers Portal (farmer-b00f2): Sign In Failed (${farmerSignIn.error})`, 'error');
      }

      // Step 3: Customer Portal Sign Up
      addLog('3. Customer Portal (agri-909a6): Creating test account', 'pending');
      const customerSignUp = await signup('Test Customer', customerTestEmail, testPassword, '+919999977777', 'customer');
      if (customerSignUp.success) {
        addLog(`3. Customer Portal (agri-909a6): Sign Up SUCCESS (${customerTestEmail})`, 'success');
      } else {
        addLog(`3. Customer Portal (agri-909a6): Sign Up (${customerSignUp.error})`, 'error');
      }

      // Step 4: Customer Portal Sign In
      addLog('4. Customer Portal (agri-909a6): Testing Sign In', 'pending');
      const customerSignIn = await login(customerTestEmail, testPassword, 'customer');
      if (customerSignIn.success) {
        addLog(`4. Customer Portal (agri-909a6): Sign In Verified! User ID: ${customerSignIn.user?.id}`, 'success');
      } else {
        addLog(`4. Customer Portal (agri-909a6): Sign In Failed (${customerSignIn.error})`, 'error');
      }

    } catch (err: any) {
      addLog('Dry Test Exception', 'error', err.message);
    } finally {
      setRunningDryTest(false);
    }
  };

  const currentDomainBadge = formData.role === 'farmer' 
    ? 'farmer-b00f2.firebaseapp.com' 
    : 'agri-909a6.firebaseapp.com';

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">AgriConnect</span>
          </Link>
          <h1 className="text-3xl font-bold text-text mb-2">{showForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-text-light">{showForgotPassword ? 'Enter your email to reset password' : isLogin ? 'Sign in to your account' : 'Start your agricultural journey'}</p>
        </div>

        <div className="bg-surface rounded-2xl shadow-sm border border-gray-100 p-8 relative">
          {/* Active Firebase Target Indicator */}
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-gray-700">Firebase Target:</span>
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
              {currentDomainBadge}
            </span>
          </div>

          {/* Role selector tabs */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-text-light mb-2">Select Portal Role</label>
            <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleRoleToggle('farmer')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  formData.role === 'farmer' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🌾 Farmers Portal
              </button>
              <button
                type="button"
                onClick={() => handleRoleToggle('customer')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  formData.role === 'customer' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🛒 Customer Portal
              </button>
            </div>
          </div>

          {!showForgotPassword && (
            <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(null); }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isLogin ? 'bg-white text-primary shadow-xs' : 'text-text-light hover:text-text'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(null); }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  !isLogin ? 'bg-white text-primary shadow-xs' : 'text-text-light hover:text-text'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-xs mb-4">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
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
              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
            )}
            {!showForgotPassword && (
              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? 'Authenticating...' : isLogin ? `Sign In (${formData.role.toUpperCase()})` : `Create Account (${formData.role.toUpperCase()})`}
              </Button>
            )}
          </form>

          {/* Quick Demo Credentials Fill */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Quick Demo Credentials:</span>
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  email: prev.role === 'farmer' ? 'demo@farmer.com' : 'demo@customer.com',
                  password: 'password123',
                }));
                setError(null);
              }}
              className="text-primary font-bold hover:underline"
            >
              Fill Demo Login
            </button>
          </div>

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

              <button 
                type="button"
                onClick={() => setError('Google Sign-In requires standard OAuth setup in Firebase Console.')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-medium text-text">Continue with Google</span>
              </button>

              <button 
                type="button"
                onClick={() => setError('Phone Authentication requires SMS recaptcha verification in Firebase Console.')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors mt-3"
              >
                <Phone className="w-5 h-5 text-text-light" />
                <span className="text-sm font-medium text-text">Continue with Phone</span>
              </button>
            </>
          )}

          {!showForgotPassword && (
            <p className="text-center text-sm text-text-light mt-6">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(null); }}
                className="text-primary font-medium hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          )}

          {showForgotPassword && (
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="text-primary text-sm font-medium hover:underline mt-4 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </button>
          )}
        </div>

        {/* Automated Dry Test Suite Box */}
        <div className="mt-6 bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold">Firebase Auth Dry Test Suite</h3>
            </div>
            <button
              type="button"
              onClick={runAutomatedDryTest}
              disabled={runningDryTest}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${runningDryTest ? 'animate-spin' : ''}`} />
              {runningDryTest ? 'Running Test...' : 'Run Live Dry Test'}
            </button>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Automated test creating random accounts on both <span className="text-emerald-400 font-mono">farmer-b00f2</span> & <span className="text-blue-400 font-mono">agri-909a6</span> Firebase instances.
          </p>

          {showDryTestPanel && (
            <div className="space-y-2 max-h-48 overflow-y-auto bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
              {dryTestLogs.length === 0 ? (
                <p className="text-slate-500 italic">Initiating test sequence...</p>
              ) : (
                dryTestLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {log.status === 'pending' && <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0 mt-0.5" />}
                    {log.status === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />}
                    {log.status === 'error' && <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />}
                    <span className={log.status === 'success' ? 'text-emerald-300' : log.status === 'error' ? 'text-red-300' : 'text-slate-300'}>
                      {log.step}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

