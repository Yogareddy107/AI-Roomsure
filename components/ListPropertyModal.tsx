import React from 'react';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListPropertyModal: React.FC<ListPropertyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="list-property-modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-8 m-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="list-property-modal-title" className="text-2xl font-bold text-gray-800">List Your Property</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close list property modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-gray-600 space-y-4">
          <p>Thank you for your interest! The property submission form is coming soon.</p>
          <p>You will be able to add details, upload photos, and set your price to reach thousands of potential tenants.</p>
        </div>
      </div>
    </div>
  );
};

export default ListPropertyModal;