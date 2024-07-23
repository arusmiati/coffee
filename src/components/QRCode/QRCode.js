import React from 'react';

const QRCodePopup = ({ togglePopup, qrcode }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Show the QR Code below to the cashier</h2>
        <img src="../assets/qrCode.png" alt="QR Code" />
        <button onClick={togglePopup}>Close</button>
      </div>
    </div>
  );
};

export default QRCodePopup;
