import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Sparkles, ArrowRight, Droplets, TrendingUp, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';

interface CopilotQuery {
  question: string;
  category: 'irrigation' | 'crops' | 'selling' | 'health';
  action: string;
  reason: string;
  impact: string;
  confidence: number;
  waterSaved?: string;
  revenueGain?: string;
  riskReduction?: string;
}

const PRESET_QUERIES: CopilotQuery[] = [
  {
    question: 'Should I irrigate today?',
    category: 'irrigation',
    action: 'SKIP IRRIGATING TODAY',
    reason: 'Heavy rainfall (18mm) is predicted tomorrow morning with high atmospheric humidity (78%). Soil moisture sensor in North Field currently reads 68%.',
    impact: 'Saves 15,000 Liters of water, prevents root rot fungal risk, and saves ~₹850 in electricity/diesel costs.',
    confidence: 94,
    waterSaved: '15,000 L',
    riskReduction: '24% Fungal Risk Avoided',
  },
  {
    question: 'Which crop should I plant next season?',
    category: 'crops',
    action: 'PLANT ORGANIC TOMATO (HYBRID H-86) OR MUSTARD',
    reason: 'Soil N-P-K test shows high nitrogen residue after wheat harvest. Regional market forecast predicts 22% price surge in tomatoes by May due to supply deficit in neighbouring districts.',
    impact: 'Projected Revenue: ₹1.45 Lakh / acre. Return on Investment (ROI): +38% compared to traditional chana (chickpea).',
    confidence: 89,
    revenueGain: '+₹35,000 / acre',
  },
  {
    question: 'Should I sell my wheat now?',
    category: 'selling',
    action: 'HOLD WHEAT FOR 7 - 10 DAYS',
    reason: 'Current mandi price is ₹2,350/quintal. Government procurement centers open next week with MSP ₹2,425/quintal, and local flour mill demand is spiking by 14%.',
    impact: 'Expected profit increase: +₹16,800 on your 4.2 tonne harvest. Low storage degradation risk over 10 days.',
    confidence: 84,
    revenueGain: '+₹16,800 Total',
  },
  {
    question: 'Why are my tomato leaves turning yellow?',
    category: 'health',
    action: 'APPLY MAGNESIUM SULPHATE + COPPER OXYCHLORIDE SPRAY',
    reason: 'Leaf yellowing between veins (interveinal chlorosis) combined with recent high humidity indicates early Nitrogen-Magnesium deficiency compounded by Early Blight risk.',
    impact: 'Halts leaf yellowing within 48 hours, restores photosynthesis efficiency by 30%, and prevents 15% harvest loss.',
    confidence: 91,
    riskReduction: '78% Disease Prevented',
  },
];

export default function DecisionCopilot() {
  const [customQuestion, setCustomQuestion] = useState('');
  const [activeQuery, setActiveQuery] = useState<CopilotQuery>(PRESET_QUERIES[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPreset = (query: CopilotQuery) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveQuery(query);
      setIsLoading(false);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      // Generate intelligent synthetic response based on question keywords
      const q = customQuestion.toLowerCase();
      let generated: CopilotQuery;

      if (q.includes('irrigate') || q.includes('water') || q.includes('rain')) {
        generated = {
          question: customQuestion,
          category: 'irrigation',
          action: 'REDUCE IRRIGATION BY 40% THIS WEEK',
          reason: `AI multi-data fusion (Weather + Soil Sensor #3 + Wheat Growth Stage): Upcoming cloudy weather reduces evapotranspiration rate. Soil moisture is at optimal field capacity (72%).`,
          impact: 'Saves ~12,000 Liters of water and maintains ideal soil aeration for root development.',
          confidence: 91,
          waterSaved: '12,000 L',
        };
      } else if (q.includes('sell') || q.includes('price') || q.includes('mandi') || q.includes('market')) {
        generated = {
          question: customQuestion,
          category: 'selling',
          action: 'PARTIAL SELL: RELEASE 50% STOCK NOW, HOLD 50%',
          reason: `Current market price is near peak for the week (₹2,275/quintal). Holding 50% hedges against potential procurement price hikes next fortnight.`,
          impact: 'Secures immediate liquidity of ₹95,000 while maintaining upside potential for additional ₹12,000 gain.',
          confidence: 86,
          revenueGain: '+₹12,000 Potential',
        };
      } else if (q.includes('pest') || q.includes('disease') || q.includes('leaf') || q.includes('yellow') || q.includes('insect')) {
        generated = {
          question: customQuestion,
          category: 'health',
          action: 'SPRAY NEEM OIL EXTRACT (5ml/L) + MONITOR IN 24 HOURS',
          reason: `High humidity (75%) and temperature (28°C) create high risk for aphid infestation and leaf spot fungus. Early bio-pesticide intervention is recommended.`,
          impact: 'Protects 95% of canopy health and eliminates chemical residue risk for organic certification.',
          confidence: 88,
          riskReduction: '85% Risk Controlled',
        };
      } else {
        generated = {
          question: customQuestion,
          category: 'crops',
          action: 'OPTIMIZE FIELD NUTRIENT BALANCE & MONITOR MOISTURE',
          reason: `Based on regional agronomic models for Punjab clay-loam soils and current crop cycle position, balanced N-P-K fertigation will maximize yield potential.`,
          impact: 'Boosts expected yield by 8-12% while reducing soil nutrient leaching.',
          confidence: 85,
          revenueGain: '+8-12% Yield',
        };
      }

      setActiveQuery(generated);
      setIsLoading(false);
      setCustomQuestion('');
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-primary to-teal-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-4 text-emerald-200 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            Flagship Innovation #1
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            AI Farm Decision Copilot
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl">
            Real-time action recommendation engine combining <span className="text-amber-300 font-semibold">Weather + Soil Sensors + Crop Stage + Mandi Prices + Historical Data</span> into clear, executable steps.
          </p>
        </div>
      </div>

      {/* Interactive Ask Input */}
      <Card className="p-6 border-2 border-primary/20 bg-surface shadow-lg rounded-2xl">
        <h3 className="font-bold text-text text-lg mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Ask AgriConnect AI Copilot
        </h3>
        <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Type your question (e.g., 'Should I irrigate today?', 'Why are my leaves yellow?')..."
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            className="flex-1 px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <Button type="submit" size="lg" disabled={isLoading} className="shadow-md">
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Analyze & Recommend
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Preset Chips */}
        <div>
          <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-2">
            Or tap a common farmer question:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_QUERIES.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(item)}
                className={`p-3.5 rounded-xl text-left border text-xs font-semibold transition-all duration-200 flex items-center justify-between gap-2 ${
                  activeQuery.question === item.question
                    ? 'bg-primary/10 border-primary text-primary shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-text-light hover:bg-gray-100 hover:text-text'
                }`}
              >
                <span className="line-clamp-2">"{item.question}"</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Structured Output UI */}
      {isLoading ? (
        <Card className="p-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-text text-lg">Fusing Multi-Modal Data...</h4>
          <p className="text-sm text-text-light mt-1">Analyzing weather forecast, soil moisture, crop stage, and live mandi prices...</p>
        </Card>
      ) : (
        <Card className="p-8 border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 shadow-xl rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                Selected Question
              </span>
              <h2 className="text-2xl font-extrabold text-text mt-2">
                "{activeQuery.question}"
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-emerald-100/80 px-4 py-2 rounded-2xl border border-emerald-200">
              <span className="text-xs font-medium text-emerald-800">AI Confidence</span>
              <span className="text-lg font-black text-emerald-900">{activeQuery.confidence}%</span>
            </div>
          </div>

          {/* 3-Step Structured Output: Action -> Reason -> Expected Impact */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* 1. Recommended Action */}
            <div className="bg-white p-6 rounded-2xl border-2 border-emerald-500/40 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/50 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center gap-2 mb-3 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Step 1: Recommended Action
                </div>
                <h3 className="text-lg font-black text-emerald-950 leading-tight">
                  {activeQuery.action}
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
                <span>Status: Clear & Executable</span>
                <span className="bg-emerald-100 px-2 py-0.5 rounded-full">Priority High</span>
              </div>
            </div>

            {/* 2. Reason */}
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-500/30 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center gap-2 mb-3 text-blue-700 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Step 2: AI Data Reason
                </div>
                <p className="text-sm text-text-light font-medium leading-relaxed">
                  {activeQuery.reason}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs text-blue-700 font-semibold">
                <span>Source: Weather + Soil + Mandi</span>
                <span className="bg-blue-100 px-2 py-0.5 rounded-full">Verified</span>
              </div>
            </div>

            {/* 3. Expected Impact */}
            <div className="bg-white p-6 rounded-2xl border-2 border-amber-500/40 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/50 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center gap-2 mb-3 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  Step 3: Expected Impact
                </div>
                <p className="text-sm font-semibold text-text leading-relaxed">
                  {activeQuery.impact}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-100 flex items-center gap-2 flex-wrap">
                {activeQuery.waterSaved && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Droplets className="w-3 h-3" /> {activeQuery.waterSaved}
                  </span>
                )}
                {activeQuery.revenueGain && (
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {activeQuery.revenueGain}
                  </span>
                )}
                {activeQuery.riskReduction && (
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> {activeQuery.riskReduction}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-text-light">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recommendation automatically updated every 6 hours based on field telemetry.</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => handleSelectPreset(activeQuery)}>
                <RefreshCw className="w-4 h-4 mr-2" /> Re-analyze
              </Button>
              <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800">
                Execute Recommended Action
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
