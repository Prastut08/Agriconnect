import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Upload, Camera, AlertTriangle, Shield, CheckCircle, Activity, Sparkles, CloudRain, Thermometer } from 'lucide-react';
import { mockDiseaseAlerts } from '../../data/mockData';

export default function DiseaseAI() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(mockDiseaseAlerts[0]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
              Flagship Innovation #2 ⭐
            </span>
            <h1 className="text-3xl font-bold text-text">Pest & Disease Early Warning AI</h1>
          </div>
          <p className="text-text-light">
            Proactive risk prediction (Weather + Crop Stage + Regional Trends) + AI Image Confirmation
          </p>
        </div>
      </div>

      {/* Early Warning Risk System Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-text flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Early Warning System (Pre-Outbreak Risk Prediction)
          </h2>
          <span className="text-xs text-text-light">Updated 10 minutes ago</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Card 1: High Risk (Matches prompt example exactly!) */}
          <Card
            onClick={() => setSelectedAlert(mockDiseaseAlerts[0])}
            className={`p-5 cursor-pointer border-2 transition-all duration-300 ${
              selectedAlert.id === mockDiseaseAlerts[0].id
                ? 'border-red-500 bg-red-50/80 shadow-md scale-[1.01]'
                : 'border-red-200 bg-red-50/40 hover:bg-red-50/70'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-600 text-white mb-1.5 inline-block">
                  ⚠️ High Risk
                </span>
                <h3 className="text-lg font-extrabold text-red-950">Tomato Leaf Disease</h3>
                <p className="text-xs text-text-light">Greenhouse A • Punjab Region</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-red-600">78%</span>
                <p className="text-[10px] text-red-700 font-bold uppercase">Risk Score</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-text-light bg-white p-3 rounded-xl border border-red-100 mb-3">
              <div className="flex items-center gap-1.5 text-red-900 font-medium">
                <CloudRain className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span><strong>Conditions:</strong> High humidity (82%) + recent rainfall (14mm)</span>
              </div>
              <div className="flex items-center gap-1.5 text-red-900 font-medium">
                <Thermometer className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span><strong>Temperature:</strong> 26°C ideal fungal incubation window</span>
              </div>
            </div>

            <div className="p-2.5 bg-red-100/90 rounded-xl text-xs font-bold text-red-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-700 flex-shrink-0" />
              <span>Recommended Action: Inspect crop within 24 hours.</span>
            </div>
          </Card>

          {/* Card 2: Medium Risk */}
          <Card
            onClick={() => setSelectedAlert(mockDiseaseAlerts[1])}
            className={`p-5 cursor-pointer border-2 transition-all duration-300 ${
              selectedAlert.id === mockDiseaseAlerts[1].id
                ? 'border-amber-500 bg-amber-50/80 shadow-md scale-[1.01]'
                : 'border-amber-200 bg-amber-50/40 hover:bg-amber-50/70'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500 text-white mb-1.5 inline-block">
                  ⚡ Medium Risk
                </span>
                <h3 className="text-lg font-extrabold text-amber-950">Wheat Rust Disease</h3>
                <p className="text-xs text-text-light">North Field • Punjab</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-amber-600">45%</span>
                <p className="text-[10px] text-amber-700 font-bold uppercase">Risk Score</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-text-light bg-white p-3 rounded-xl border border-amber-100 mb-3">
              <p><strong>Conditions:</strong> Moderate humidity + morning fog</p>
              <p><strong>Stage:</strong> Vegetative growth stage vulnerability</p>
            </div>

            <div className="p-2.5 bg-amber-100/90 rounded-xl text-xs font-bold text-amber-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>Recommended Action: Monitor leaf tips every 48 hours.</span>
            </div>
          </Card>

          {/* Card 3: Low Risk */}
          <Card
            onClick={() => setSelectedAlert(mockDiseaseAlerts[2])}
            className={`p-5 cursor-pointer border-2 transition-all duration-300 ${
              selectedAlert.id === mockDiseaseAlerts[2].id
                ? 'border-emerald-500 bg-emerald-50/80 shadow-md scale-[1.01]'
                : 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/70'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-600 text-white mb-1.5 inline-block">
                  ✅ Low Risk
                </span>
                <h3 className="text-lg font-extrabold text-emerald-950">Potato Early Blight</h3>
                <p className="text-xs text-text-light">South Field • Haryana</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-emerald-600">28%</span>
                <p className="text-[10px] text-emerald-700 font-bold uppercase">Risk Score</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-text-light bg-white p-3 rounded-xl border border-emerald-100 mb-3">
              <p><strong>Conditions:</strong> Dry weather + optimal soil moisture</p>
              <p><strong>Stage:</strong> Fruiting stage healthy resistance</p>
            </div>

            <div className="p-2.5 bg-emerald-100/90 rounded-xl text-xs font-bold text-emerald-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>Recommended Action: Apply weekly bio-neem spray.</span>
            </div>
          </Card>
        </div>
      </div>

      {/* AI Image Upload Confirmation */}
      <Card className="p-8 border-2 border-primary/20 shadow-lg rounded-3xl">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
            <Camera className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text">Upload Crop Image for AI Confirmation</h3>
            <p className="text-sm text-text-light mt-1">
              Confirm early warning predictions by snapping a photo of leaves, stems, or soil.
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-primary transition-colors bg-gray-50/50">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-xs text-text-light mb-4">Drag and drop leaf photo, or click to upload</p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={handleAnalyze} disabled={isAnalyzing} className="shadow-md">
                {isAnalyzing ? 'Analyzing AI Computer Vision...' : 'Upload & Analyze Photo'}
              </Button>
              <Button variant="outline" onClick={handleAnalyze}>
                <Camera className="w-4 h-4 mr-2" />
                Take Photo Live
              </Button>
            </div>

            {isAnalyzing && (
              <div className="mt-6 flex items-center justify-center gap-2 text-primary font-bold text-sm">
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
                <span>Scanning leaf color spectrum & fungal pattern database...</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Diagnosis Results */}
      {showResults && (
        <Card className="p-6 bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-300 shadow-xl rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-text text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              AI Image Diagnosis Confirmation
            </h3>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              Matched with Early Warning Model
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-gray-100">
              <p className="text-xs text-text-light mb-1">Confirmed Disease</p>
              <p className="text-xl font-bold text-red-600">Late Blight (Phytophthora)</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100">
              <p className="text-xs text-text-light mb-1">AI Confidence</p>
              <p className="text-xl font-bold text-emerald-700">92.4%</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100">
              <p className="text-xs text-text-light mb-1">Severity Assessment</p>
              <p className="text-xl font-bold text-amber-600">Early Stage (Stage 1)</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-100">
              <p className="text-xs text-text-light mb-1">Remedy Timeline</p>
              <p className="text-sm font-bold text-primary">Spray within 24 Hours</p>
            </div>
          </div>

          <div className="p-4 bg-emerald-950 text-white rounded-2xl space-y-2">
            <p className="text-xs font-bold text-amber-300 uppercase">Step-by-Step Remediation Plan:</p>
            <ol className="text-xs text-emerald-100 space-y-1 list-decimal list-inside">
              <li>Spray Copper Oxychloride (50% WP) @ 2.5g per liter of water during clear afternoon weather.</li>
              <li>Prune lower yellowing leaves and destroy them outside the greenhouse perimeter.</li>
              <li>Reduce sprinkler pressure to avoid splashing spores onto healthy neighboring crops.</li>
            </ol>
          </div>
        </Card>
      )}

      {/* Prevention Tips */}
      <Card className="p-6">
        <h3 className="font-bold text-text mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Proactive Crop Disease Prevention Rules
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'Inspect crop field every 3 days during high humidity',
            'Maintain at least 45cm spacing between tomato plants',
            'Adopt certified disease-resistant hybrid seed varieties',
            'Apply preventive bio-neem spray before monsoon rain',
            'Isolate and burn infected leaves away from irrigation channels',
            'Sync irrigation schedules with automated rain sensor data',
          ].map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3.5 bg-gray-50 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-medium text-text">{tip}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
