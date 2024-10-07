import React, { useState } from 'react';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (inputValue: string) => void;
  label?: string;
  modalTestId: string;
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, handleSubmit, label, modalTestId }) => {
  const [inputValue, setInputValue] = useState('');

  if (!show) {
    return null;
  }

  const onSubmit = () => {
    handleSubmit(inputValue);
    setInputValue('');
    handleClose(); 
  };

  return (
    <div data-testid={modalTestId} className="modal-backdrop">
      <div className="modal-content">
        <h2>{label}</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={label}
        />
        <button onClick={onSubmit}>Submit</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
