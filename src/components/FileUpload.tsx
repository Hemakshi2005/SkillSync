import React, { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploadProps {
  title: string;
  accept: string;
  multiple?: boolean;
  onFilesChange: (files: File[]) => void;
  files: File[];
}

export const FileUpload: React.FC<FileUploadProps> = ({
  title,
  accept,
  multiple = false,
  onFilesChange,
  files
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      accept.split(',').some(type => file.type.includes(type.trim()) || file.name.toLowerCase().includes(type.replace('*', '').trim()))
    );
    
    if (multiple) {
      onFilesChange([...files, ...validFiles]);
    } else {
      onFilesChange(validFiles.slice(0, 1));
    }
  }, [accept, multiple, files, onFilesChange]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (multiple) {
        onFilesChange([...files, ...selectedFiles]);
      } else {
        onFilesChange(selectedFiles);
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Drop your files here, or{' '}
          <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
            browse
            <input
              type="file"
              className="hidden"
              accept={accept}
              multiple={multiple}
              onChange={handleFileInput}
            />
          </label>
        </p>
        <p className="text-sm text-gray-500">
          {multiple ? 'Multiple files supported' : 'Single file only'} • PDF, DOC, DOCX
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Uploaded Files:</h4>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};