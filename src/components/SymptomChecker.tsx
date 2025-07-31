import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Info, ArrowRight } from 'lucide-react';

interface SymptomCheckerProps {
  onPageChange: (page: string) => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onPageChange }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const symptomCategories = [
    {
      category: 'Skin Changes',
      symptoms: ['Redness', 'Dry skin', 'Oily skin', 'Discoloration', 'Texture changes', 'Scaling']
    },
    {
      category: 'Lesions & Growths',
      symptoms: ['New moles', 'Changing moles', 'Bumps', 'Lumps', 'Warts', 'Cysts']
    },
    {
      category: 'Sensations',
      symptoms: ['Itching', 'Burning', 'Pain', 'Tingling', 'Numbness', 'Sensitivity']
    },
    {
      category: 'Conditions',
      symptoms: ['Rash', 'Acne', 'Blisters', 'Hives', 'Eczema-like symptoms', 'Psoriasis-like symptoms']
    }
  ];

  const possibleConditions = [
    {
      name: 'Contact Dermatitis',
      probability: 'High',
      description: 'Skin reaction to irritants or allergens',
      urgency: 'low',
      recommendations: ['Avoid known irritants', 'Use gentle moisturizers', 'Consider antihistamines']
    },
    {
      name: 'Seborrheic Dermatitis',
      probability: 'Medium',
      description: 'Common skin condition causing scaly patches',
      urgency: 'low',
      recommendations: ['Use antifungal shampoos', 'Apply prescribed topical treatments', 'Manage stress']
    },
    {
      name: 'Suspicious Lesion',
      probability: 'Low',
      description: 'Requires immediate professional evaluation',
      urgency: 'high',
      recommendations: ['Schedule urgent dermatologist appointment', 'Monitor for changes', 'Avoid sun exposure']
    }
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeSymptoms = () => {
    setResults(possibleConditions);
    setCurrentStep(2);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skin Symptom Checker</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get preliminary insights about your skin symptoms. This tool is for informational purposes only and does not replace professional medical advice.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800 mb-1">Important Disclaimer</h3>
              <p className="text-yellow-700 text-sm">
                This symptom checker is for educational purposes only. Always consult with a qualified dermatologist for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Your Symptoms</h2>
              <p className="text-gray-600">Choose all symptoms that apply to your current condition:</p>
            </div>

            <div className="space-y-6 mb-8">
              {symptomCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="font-medium text-gray-900 mb-3">{category.category}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {category.symptoms.map((symptom, symptomIndex) => (
                      <button
                        key={symptomIndex}
                        onClick={() => toggleSymptom(symptom)}
                        className={`p-3 border rounded-lg text-left transition-all ${
                          selectedSymptoms.includes(symptom)
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 hover:border-green-300 hover:bg-green-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{symptom}</span>
                          {selectedSymptoms.includes(symptom) && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedSymptoms.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Selected Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={analyzeSymptoms}
              disabled={selectedSymptoms.length === 0}
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-lg flex items-center justify-center"
            >
              Analyze Symptoms
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

        {currentStep === 2 && results && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Results</h2>
              
              <div className="space-y-4">
                {results.map((condition: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900">{condition.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(condition.urgency)}`}>
                          {condition.urgency === 'high' ? 'Urgent' : condition.urgency === 'medium' ? 'Moderate' : 'Low Priority'}
                        </span>
                        <span className={`font-medium ${getProbabilityColor(condition.probability)}`}>
                          {condition.probability} Match
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{condition.description}</p>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
                      <ul className="space-y-1">
                        {condition.recommendations.map((rec: string, recIndex: number) => (
                          <li key={recIndex} className="flex items-start text-sm text-gray-600">
                            <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Next Steps</h3>
              <p className="text-blue-800 mb-4">
                Based on your symptoms, we recommend consulting with a dermatologist for proper diagnosis and treatment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onPageChange('search')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Find Dermatologists
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Check Different Symptoms
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;