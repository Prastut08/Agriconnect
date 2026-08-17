import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Calendar, Landmark, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { mockGovernmentSchemes } from '../../data/mockData';

export default function GovernmentSchemes() {
  const [cropType, setCropType] = useState('Wheat, Tomato');
  const [farmSize, setFarmSize] = useState('5.2');
  const [location, setLocation] = useState('Punjab, India');
  const [showMatchResults, setShowMatchResults] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
            Flagship Innovation #7 ⭐
          </span>
          <h1 className="text-3xl font-bold text-text">Government Scheme Matchmaker</h1>
        </div>
        <p className="text-text-light">
          Personalized AI matcher pairing your farm details with eligible subsidies, loans, and crop insurance
        </p>
      </div>

      {/* Matchmaker Form Card */}
      <Card className="p-6 border-2 border-amber-400/40 bg-gradient-to-r from-amber-50/80 via-white to-orange-50/60 shadow-lg rounded-3xl">
        <h3 className="font-extrabold text-amber-950 text-lg mb-4 flex items-center gap-2">
          <Landmark className="w-5 h-5 text-amber-700" />
          Enter Farm Profile for AI Scheme Matching
        </h3>

        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-1.5">Crop Type</label>
            <Input placeholder="e.g., Wheat, Rice, Tomato" value={cropType} onChange={setCropType} />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-1.5">Farm Size (acres)</label>
            <Input placeholder="e.g., 5.2" value={farmSize} onChange={setFarmSize} />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-1.5">Location / State</label>
            <Input placeholder="e.g., Punjab, India" value={location} onChange={setLocation} />
          </div>
        </div>

        <Button onClick={() => setShowMatchResults(true)} className="bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md">
          <Sparkles className="w-4 h-4 mr-2" />
          Find Eligible Government Schemes
        </Button>
      </Card>

      {/* Matched Count Banner (Exact user prompt match!) */}
      {showMatchResults && (
        <div className="p-4 bg-emerald-950 text-white rounded-2xl flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400 text-amber-950 rounded-xl font-black text-lg">
              3
            </div>
            <div>
              <p className="font-bold text-base text-amber-300">3 potentially relevant schemes found</p>
              <p className="text-xs text-emerald-200">Based on: {cropType} • {farmSize} acres • {location}</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-800 text-emerald-100 rounded-full">
            100% Eligible
          </span>
        </div>
      )}

      {/* Scheme List with 6 structured fields per card */}
      <div className="grid md:grid-cols-2 gap-6">
        {mockGovernmentSchemes.slice(0, 3).map((scheme) => (
          <Card key={scheme.id} className="p-6 border-2 border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300 rounded-3xl space-y-4">
            {/* 1. Scheme Name & Amount */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-full">
                  {scheme.category}
                </span>
                <h3 className="font-black text-text text-xl mt-1.5">{scheme.name}</h3>
              </div>
              {scheme.amount && <span className="text-lg font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">{scheme.amount}</span>}
            </div>

            {/* 2. Benefit */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-xs font-bold text-amber-900 uppercase">Benefit Summary:</p>
              <p className="text-sm font-extrabold text-amber-950">{scheme.benefit}</p>
            </div>

            {/* 3. Eligibility */}
            <div>
              <p className="text-xs font-bold text-text-light uppercase tracking-wider mb-1">Eligibility Criteria</p>
              <p className="text-xs font-medium text-text bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                {scheme.eligibility}
              </p>
            </div>

            {/* 4. Documents Required */}
            <div>
              <p className="text-xs font-bold text-text-light uppercase tracking-wider mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-primary" /> Documents Required
              </p>
              <div className="flex flex-wrap gap-1.5">
                {scheme.documents.map((doc, idx) => (
                  <span key={idx} className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                    ✓ {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Application Process */}
            <div>
              <p className="text-xs font-bold text-text-light uppercase tracking-wider mb-1">Application Process</p>
              <ol className="text-xs text-text-light space-y-1 list-decimal list-inside bg-gray-50 p-3 rounded-xl border border-gray-100">
                {scheme.applicationProcess.map((step, idx) => (
                  <li key={idx} className="font-medium text-text">{step}</li>
                ))}
              </ol>
            </div>

            {/* 6. Deadline */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-red-700 font-bold bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
                <Calendar className="w-4 h-4 text-red-600" />
                <span>Deadline: {new Date(scheme.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                Apply Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
