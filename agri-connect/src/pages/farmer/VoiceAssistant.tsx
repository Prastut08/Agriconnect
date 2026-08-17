import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Mic, MicOff, Volume2, Loader2 } from 'lucide-react';

const REGIONAL_LANGUAGES = [
  { name: 'Hindi (हिंदी)', sample: 'Mere गेहूं ke patte peele ho rahe hain, kya karun?' },
  { name: 'Punjabi (ਪੰਜਾਬੀ)', sample: 'ਮੇਰੀ ਕਣਕ ਦੀ ਫ਼ਸਲ ਲਈ ਸਿੰਚਾਈ ਕਦੋਂ ਕਰਾਂ?' },
  { name: 'Tamil (தமிழ்)', sample: 'இன்று தக்காளி பயிருக்கு நீர் பாய்ச்ச வேண்டுமா?' },
  { name: 'Telugu (తెలుగు)', sample: 'ఈ రోజు వరి పంట మార్కెట్ ధర ఎంత?' },
  { name: 'Marathi (मराठी)', sample: 'माझ्या पिकांवर किडीचा प्रादुर्भाव कसा रोखावा?' },
  { name: 'English', sample: 'Should I harvest my wheat crop today?' },
];

export default function VoiceAssistant() {
  const [selectedLang, setSelectedLang] = useState(REGIONAL_LANGUAGES[0]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeQueryText, setActiveQueryText] = useState(REGIONAL_LANGUAGES[0].sample);
  const [response, setResponse] = useState<string | null>(null);

  const handleStartVoice = (querySample?: string) => {
    const textToUse = querySample || activeQueryText;
    setActiveQueryText(textToUse);
    setIsListening(true);
    setResponse(null);

    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);

      setTimeout(() => {
        setIsProcessing(false);
        if (textToUse.includes('peele') || textToUse.includes('yellow')) {
          setResponse('आपकी गेहूं फसल में मैग्नीशियम की कमी और फंगल स्पॉट के शुरुआती लक्षण हैं। 48 घंटे के भीतर कॉपर ऑक्सीक्लोराइड (2g/L) का छिड़काव करें और खेत में पानी का भराव न होने दें।');
        } else if (textToUse.includes('ਸਿੰਚਾਈ') || textToUse.includes('irrigate')) {
          setResponse('ਕੱਲ੍ਹ ਮੀਂਹ ਪੈਣ ਦੀ 70% ਸੰਭਾਵਨਾ ਹੈ। ਅੱਜ ਸਿੰਚਾਈ ਨਾ ਕਰੋ। ਇਸ ਨਾਲ 15,000 ਲੀਟਰ ਪਾਣੀ ਦੀ ਬਚਤ ਹੋਵੇਗੀ।');
        } else {
          setResponse('AgriAI multi-modal analysis complete: Market prices are projected to rise by 4% in 7 days. We recommend holding wheat stock for maximum profit.');
        }
      }, 1500);
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
            India-Specific Differentiator 🇮🇳 ⭐
          </span>
          <h1 className="text-3xl font-bold text-text">Voice AI for Farmers</h1>
        </div>
        <p className="text-text-light">
          Speak your agricultural questions naturally in your preferred regional language (Hindi, Punjabi, Tamil, Telugu, Marathi, English)
        </p>
      </div>

      {/* Language Selector */}
      <Card className="p-6">
        <h3 className="font-bold text-text mb-3 text-sm uppercase tracking-wider">Select Preferred Regional Language</h3>
        <div className="flex flex-wrap gap-2">
          {REGIONAL_LANGUAGES.map((lang) => (
            <button
              key={lang.name}
              onClick={() => {
                setSelectedLang(lang);
                setActiveQueryText(lang.sample);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedLang.name === lang.name
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-gray-100 text-text-light hover:bg-gray-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </Card>

      {/* Main Microphone Interactive View */}
      <Card className="p-8 text-center border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 shadow-xl rounded-3xl">
        <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-4">
          Listening in {selectedLang.name}
        </p>

        {/* Mic Button */}
        <button
          onClick={() => handleStartVoice()}
          disabled={isListening || isProcessing}
          className={`w-36 h-36 rounded-full flex items-center justify-center mx-auto transition-all duration-300 shadow-xl ${
            isListening
              ? 'bg-red-500 scale-110 animate-pulse ring-8 ring-red-200'
              : isProcessing
              ? 'bg-amber-500 animate-pulse'
              : 'bg-emerald-700 hover:bg-emerald-800 hover:scale-105 ring-8 ring-emerald-100'
          }`}
        >
          {isListening ? (
            <MicOff className="w-16 h-16 text-white" />
          ) : isProcessing ? (
            <Loader2 className="w-16 h-16 text-white animate-spin" />
          ) : (
            <Mic className="w-16 h-16 text-white" />
          )}
        </button>

        <p className="mt-6 text-2xl font-black text-text">
          {isListening ? 'Listening...' : isProcessing ? 'Processing Regional Voice Speech...' : 'Tap Mic to Speak'}
        </p>

        {/* Active Speech Query Text */}
        <div className="mt-3 max-w-lg mx-auto p-3.5 bg-white rounded-2xl border border-emerald-200 shadow-xs">
          <p className="text-xs text-text-light font-medium">Spoken Input Prompt:</p>
          <p className="text-sm font-bold text-emerald-950 mt-0.5">"{activeQueryText}"</p>
        </div>

        {/* Response Box */}
        {response && (
          <div className="mt-6 p-6 bg-emerald-950 text-white rounded-3xl text-left shadow-lg space-y-2 border border-emerald-800">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />
              AgriAI Regional Voice Response ({selectedLang.name}):
            </div>
            <p className="text-base font-semibold leading-relaxed text-emerald-100">{response}</p>
          </div>
        )}
      </Card>

      {/* Preset Spoken Examples */}
      <Card className="p-6">
        <h3 className="font-bold text-text mb-3">Try Popular Regional Voice Queries</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { text: 'Mere गेहूं ke patte peele ho rahe hain, kya karun?', lang: 'Hindi' },
            { text: 'ਮੇਰੀ ਕਣਕ ਦੀ ਫ਼ਸਲ ਲਈ ਸਿੰਚਾਈ ਕਦੋਂ ਕਰਾਂ?', lang: 'Punjabi' },
            { text: 'Should I sell my wheat today or wait 7 days?', lang: 'English' },
            { text: 'इन्हें टमाटर की बीमारी से बचाने के उपाय बताओ।', lang: 'Hindi' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleStartVoice(item.text)}
              className="p-3.5 bg-gray-50 hover:bg-emerald-50 rounded-xl text-left border border-gray-200 hover:border-emerald-300 transition-all flex items-center justify-between text-xs font-bold text-text"
            >
              <span>🎙️ "{item.text}"</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{item.lang}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
