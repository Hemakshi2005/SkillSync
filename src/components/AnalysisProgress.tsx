import React from 'react';
import { Brain, CheckCircle } from 'lucide-react';

interface AnalysisProgressProps {
  progress: number;
  currentStep: string;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ progress, currentStep }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
          {progress === 100 ? (
            <CheckCircle className="h-8 w-8 text-white" />
          ) : (
            <Brain className="h-8 w-8 text-white animate-pulse" />
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {progress === 100 ? 'Analysis Complete!' : 'Analyzing Resumes...'}
        </h3>
        
        <p className="text-gray-600 mb-6">{currentStep}</p>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-gray-500">{progress}% Complete</p>
      </div>
    </div>
  );
};