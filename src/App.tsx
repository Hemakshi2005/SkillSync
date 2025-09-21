import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { AnalysisProgress } from './components/AnalysisProgress';
import { ResultsDisplay } from './components/ResultsDisplay';
import { simulateAnalysis, Candidate } from './utils/mockAnalysis';
import { Brain, FileText, Users, Sparkles, ArrowRight } from 'lucide-react';

type Step = 'upload' | 'analyzing' | 'results';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [jobDescription, setJobDescription] = useState<File[]>([]);
  const [resumes, setResumes] = useState<File[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const handleAnalyze = async () => {
    if (jobDescription.length === 0 || resumes.length === 0) {
      alert('Please upload both job description and resume files');
      return;
    }

    setCurrentStep('analyzing');
    setAnalysisProgress(0);

    const steps = [
      'Parsing job description...',
      'Extracting resume content...',
      'Analyzing skills and experience...',
      'Calculating compatibility scores...',
      'Ranking candidates...',
      'Generating detailed insights...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(steps[i]);
      setAnalysisProgress((i + 1) * 16.67);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    try {
      const results = await simulateAnalysis(jobDescription, resumes);
      setCandidates(results);
      setCurrentStep('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
      setCurrentStep('upload');
    }
  };

  const handleSave = () => {
    const data = {
      timestamp: new Date().toISOString(),
      jobDescription: jobDescription[0]?.name,
      totalCandidates: candidates.length,
      eligibleCandidates: candidates.filter(c => c.rank <= 5).length,
      candidates: candidates
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-evaluation-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Results saved successfully!');
  };

  const handleExport = () => {
    const csvContent = [
      ['Rank', 'Name', 'Email', 'Score', 'Status', 'Experience', 'Skills'],
      ...candidates.map(c => [
        c.rank.toString(),
        c.name,
        c.email,
        c.score.toString(),
        c.rank <= 5 ? 'ELIGIBLE' : 'NOT ELIGIBLE',
        c.experience,
        c.skills.join('; ')
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-evaluation-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setCurrentStep('upload');
    setJobDescription([]);
    setResumes([]);
    setAnalysisProgress(0);
    setAnalysisStep('');
    setCandidates([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ResumeAI Evaluator</h1>
                <p className="text-sm text-gray-600">Intelligent Resume Screening & Ranking System</p>
              </div>
            </div>
            {currentStep === 'results' && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'upload' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Streamline Your Hiring Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload your job description and candidate resumes to get AI-powered analysis, 
                scoring, and ranking in minutes.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Analysis</h3>
                <p className="text-gray-600">AI-powered content extraction and skill matching</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Ranking</h3>
                <p className="text-gray-600">Candidates ranked by compatibility and qualifications</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Insights</h3>
                <p className="text-gray-600">Comprehensive scoring and detailed candidate profiles</p>
              </div>
            </div>

            {/* Upload Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <FileUpload
                  title="Job Description"
                  accept=".pdf,.doc,.docx,.txt"
                  multiple={false}
                  files={jobDescription}
                  onFilesChange={setJobDescription}
                />
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8">
                <FileUpload
                  title="Candidate Resumes"
                  accept=".pdf,.doc,.docx"
                  multiple={true}
                  files={resumes}
                  onFilesChange={setResumes}
                />
              </div>
            </div>

            {/* Analysis Button */}
            <div className="text-center">
              <button
                onClick={handleAnalyze}
                disabled={jobDescription.length === 0 || resumes.length === 0}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                <Brain className="h-5 w-5" />
                Start AI Analysis
                <ArrowRight className="h-5 w-5" />
              </button>
              
              {(jobDescription.length === 0 || resumes.length === 0) && (
                <p className="text-sm text-gray-500 mt-3">
                  Please upload both job description and resume files to continue
                </p>
              )}
            </div>
          </div>
        )}

        {currentStep === 'analyzing' && (
          <div className="max-w-md mx-auto">
            <AnalysisProgress progress={analysisProgress} currentStep={analysisStep} />
          </div>
        )}

        {currentStep === 'results' && (
          <ResultsDisplay
            candidates={candidates}
            onSave={handleSave}
            onExport={handleExport}
          />
        )}
      </main>
    </div>
  );
}

export default App;