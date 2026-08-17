import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, TrendingUp, Shield, Globe, Zap, Brain, BarChart3, Users, ChevronRight, Star } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">AgriConnect</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-text-light hover:text-text transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-text-light hover:text-text transition-colors">How It Works</a>
              <a href="#pricing" className="text-sm text-text-light hover:text-text transition-colors">Pricing</a>
              <Link to="/role">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-background" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">India's #1 AI Agriculture Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-text mb-6 leading-tight">
              India's AI-Powered<br />
              <span className="text-primary">Digital Agriculture</span><br />
              Ecosystem
            </h1>
            <p className="text-xl text-text-light mb-8 max-w-2xl mx-auto">
              Empowering farmers with AI-driven insights, direct market access, and smart tools to increase yields, reduce costs, and build sustainable livelihoods.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/role">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Farm Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">The Problem We Solve</h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Indian farmers face critical challenges that reduce their income and increase risk every season.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: 'Price Uncertainty', desc: 'Farmers sell at 30-40% below market value due to lack of price transparency and middlemen exploitation.' },
              { icon: Shield, title: 'Crop Risks', desc: 'Diseases, weather events, and pests destroy 15-30% of crops annually without early warning systems.' },
              { icon: Globe, title: 'Market Access', desc: 'Limited access to buyers, poor infrastructure, and fragmented supply chains reduce farmer income.' },
            ].map((item, idx) => (
              <Card key={idx} className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">{item.title}</h3>
                <p className="text-text-light">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">How It Works</h2>
            <p className="text-lg text-text-light">Simple steps to transform your farming</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your farmer profile in minutes' },
              { step: '02', title: 'Add Your Farm', desc: 'Input your crops, fields, and farm details' },
              { step: '03', title: 'Get AI Insights', desc: 'Receive personalized recommendations daily' },
              { step: '04', title: 'Sell Directly', desc: 'Connect with buyers and maximize profits' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{item.title}</h3>
                <p className="text-sm text-text-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">7 Flagship AI Innovations</h2>
            <p className="text-lg text-text-light">Cutting-edge technology designed for Indian agriculture</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'AI Farm Copilot', desc: '24/7 intelligent assistant for all farming decisions' },
              { icon: BarChart3, title: 'Yield Prediction', desc: 'AI-powered harvest forecasts with 90% accuracy' },
              { icon: Shield, title: 'Disease Detection', desc: 'Real-time crop health monitoring and alerts' },
              { icon: Globe, title: 'Market Intelligence', desc: 'Live mandi prices and selling recommendations' },
              { icon: TrendingUp, title: 'Financial Analytics', desc: 'Complete profit tracking and expense management' },
              { icon: Leaf, title: 'Soil Intelligence', desc: 'Smart soil analysis and fertilizer recommendations' },
              { icon: Users, title: 'Community Network', desc: 'Connect with farmers, share knowledge, and grow together' },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{item.title}</h3>
                <p className="text-sm text-text-light">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Impact So Far</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50,000+', label: 'Farmers Onboarded' },
              { value: '₹2.5Cr+', label: 'Farmer Earnings' },
              { value: '30%', label: 'Average Yield Increase' },
              { value: '15%', label: 'Cost Reduction' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-text-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-text-light">Start free, upgrade when you need more</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Free', price: '₹0', period: 'forever', features: ['Basic crop tracking', 'Weather alerts', 'Community access', 'Standard support'] },
              { name: 'Pro', price: '₹199', period: 'month', features: ['AI recommendations', 'Market intelligence', 'Yield prediction', 'Priority support', 'Financial analytics'], popular: true },
              { name: 'Enterprise', price: 'Custom', period: '', features: ['All Pro features', 'Custom integrations', 'Dedicated support', 'API access', 'Training sessions'] },
            ].map((plan, idx) => (
              <Card key={idx} className={`p-8 ${plan.popular ? 'ring-2 ring-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <Badge variant="primary" className="mb-4">Most Popular</Badge>
                )}
                <h3 className="text-xl font-semibold text-text mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-text">{plan.price}</span>
                  {plan.period && <span className="text-text-light">/{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-lg text-text-light mb-8">Join thousands of farmers already using AgriConnect to grow smarter.</p>
          <Link to="/role">
            <Button size="lg">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-1 mt-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-accent fill-accent" />
            ))}
            <span className="ml-2 text-sm text-text-light">4.9/5 from 2,000+ reviews</span>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8" />
            <span className="text-2xl font-bold">AgriConnect</span>
          </div>
          <p className="text-green-100 mb-8">Empowering Indian farmers with AI and technology</p>
          <p className="text-sm text-green-200"> 2025 AgriConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
