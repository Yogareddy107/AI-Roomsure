import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, description }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-8 m-4 max-h-[90vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="about-modal-title" className="text-2xl font-bold text-gray-800">About PropertyFinder</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close about modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-gray-600 space-y-4">
          <p>{description}</p>
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold text-lg text-gray-700 mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Natural language search powered by the Google Gemini API.</li>
              <li>Interactive map view to visualize property locations.</li>
              <li>Comprehensive filtering by price, type, amenities, and rating.</li>
              <li>Persistent "Favorites" list using local storage.</li>
            </ul>
          </div>
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold text-lg text-gray-700 mb-4">Meet the Team</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-800">Alex Johnson</p>
                <p className="text-sm text-gray-500">Lead Frontend Engineer</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Brenda Smith</p>
                <p className="text-sm text-gray-500">UI/UX Designer</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Charlie Brown</p>
                <p className="text-sm text-gray-500">Gemini API Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;