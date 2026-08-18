import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FarmerLayout } from './components/layout/FarmerLayout';
import { CustomerLayout } from './components/layout/CustomerLayout';
import Landing from './pages/landing/Landing';
import RoleSelect from './pages/landing/RoleSelect';
import Auth from './pages/auth/Auth';
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import DecisionCopilot from './pages/farmer/DecisionCopilot';
import Tasks from './pages/farmer/Tasks';
import CropManagement from './pages/farmer/CropManagement';
import CropDetail from './pages/farmer/CropDetail';
import DiseaseAI from './pages/farmer/DiseaseAI';
import YieldPrediction from './pages/farmer/YieldPrediction';
import HarvestLoss from './pages/farmer/HarvestLoss';
import MarketIntelligence from './pages/farmer/MarketIntelligence';
import Finance from './pages/farmer/Finance';
import ProfitSimulator from './pages/farmer/ProfitSimulator';
import Weather from './pages/farmer/Weather';
import SoilIntelligence from './pages/farmer/SoilIntelligence';
import GovernmentSchemes from './pages/farmer/GovernmentSchemes';
import SellerMode from './pages/farmer/SellerMode';
import AddProduce from './pages/farmer/AddProduce';
import FarmerOrders from './pages/farmer/FarmerOrders';
import AgriStore from './pages/farmer/AgriStore';
import Community from './pages/farmer/Community';
import VoiceAssistant from './pages/farmer/VoiceAssistant';
import CustomerHome from './pages/customer/CustomerHome';
import Products from './pages/customer/Products';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import CustomerOrders from './pages/customer/Orders';
import Subscriptions from './pages/customer/Subscriptions';
import Savings from './pages/customer/Savings';
import NearbyFarmers from './pages/customer/NearbyFarmers';
import AiShopping from './pages/customer/AiShopping';
import CustomerProfile from './pages/customer/Profile';
import SavedItems from './pages/customer/SavedItems';
import Rewards from './pages/customer/Rewards';
import AdminDashboard from './pages/admin/AdminDashboard';

function FarmerRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated || role !== 'farmer') {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}

function CustomerRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated || role !== 'customer') {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/role', element: <RoleSelect /> },
  { path: '/auth', element: <Auth /> },
  {
    path: '/farmer',
    element: (
      <FarmerRoute>
        <FarmerLayout />
      </FarmerRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/farmer/dashboard" replace /> },
      { path: 'dashboard', element: <FarmerDashboard /> },
      { path: 'copilot', element: <DecisionCopilot /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'crops', element: <CropManagement /> },
      { path: 'crops/:id', element: <CropDetail /> },
      { path: 'disease', element: <DiseaseAI /> },
      { path: 'yield', element: <YieldPrediction /> },
      { path: 'harvest-loss', element: <HarvestLoss /> },
      { path: 'market', element: <MarketIntelligence /> },
      { path: 'finance', element: <Finance /> },
      { path: 'profit-simulator', element: <ProfitSimulator /> },
      { path: 'weather', element: <Weather /> },
      { path: 'soil', element: <SoilIntelligence /> },
      { path: 'schemes', element: <GovernmentSchemes /> },
      { path: 'seller', element: <SellerMode /> },
      { path: 'add-produce', element: <AddProduce /> },
      { path: 'orders', element: <FarmerOrders /> },
      { path: 'store', element: <AgriStore /> },
      { path: 'community', element: <Community /> },
      { path: 'voice', element: <VoiceAssistant /> },
    ],
  },
  {
    path: '/customer',
    element: (
      <CustomerRoute>
        <CustomerLayout />
      </CustomerRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/customer/home" replace /> },
      { path: 'home', element: <CustomerHome /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'orders', element: <CustomerOrders /> },
      { path: 'subscriptions', element: <Subscriptions /> },
      { path: 'savings', element: <Savings /> },
      { path: 'nearby', element: <NearbyFarmers /> },
      { path: 'ai-shopping', element: <AiShopping /> },
      { path: 'saved', element: <SavedItems /> },
      { path: 'profile', element: <CustomerProfile /> },
      { path: 'rewards', element: <Rewards /> },
    ],
  },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
