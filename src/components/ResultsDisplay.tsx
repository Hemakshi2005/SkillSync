import React from 'react';
import { Trophy, Medal, Award, Download, Save, Star, User, Mail, Phone, MapPin } from 'lucide-react';

interface Candidate {
  name: string;
  email: string;
  phone: string;
  location: string;
  score: number;
  rank: number;
  skills: string[];
  experience: string;
  education: string;
  strengths: string[];
  weaknesses: string[];
}

interface ResultsDisplayProps {
  candidates: Candidate[];
  onSave: () => void;
  onExport: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ candidates, onSave, onExport }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-600" />;
      default:
        return <span className="h-6 w-6 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full text-sm font-bold">{rank}</span>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Evaluation Results</h2>
            <p className="text-gray-600">
              {candidates.filter(c => c.rank <= 5).length} candidates eligible • 
              Total analyzed: {candidates.length}
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              Save Results
            </button>
            <button
              onClick={onExport}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {candidates.map((candidate) => (
            <div
              key={candidate.rank}
              className={`border rounded-lg p-6 transition-all duration-200 hover:shadow-md ${
                candidate.rank <= 5
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3">
                      {getRankIcon(candidate.rank)}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          {candidate.name}
                          {candidate.rank <= 5 && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              ELIGIBLE
                            </span>
                          )}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {candidate.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {candidate.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {candidate.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`px-4 py-2 rounded-lg ${getScoreBg(candidate.score)}`}>
                      <span className={`text-2xl font-bold ${getScoreColor(candidate.score)}`}>
                        {candidate.score}
                      </span>
                      <span className="text-gray-600 text-sm">/100</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-700 mb-1">Experience</p>
                      <p className="text-sm text-gray-600">{candidate.experience}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">Education</p>
                      <p className="text-sm text-gray-600">{candidate.education}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-gray-700 mb-2">Key Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-green-700 mb-2">Strengths</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {candidate.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Star className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-orange-700 mb-2">Areas for Improvement</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {candidate.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-3 w-3 bg-orange-300 rounded-full mt-1 flex-shrink-0" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};