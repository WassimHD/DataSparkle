import React, { useEffect, useState } from 'react';

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    const hideTimer = setTimeout(() => {
      setShowPopup(false);
    }, 15000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return showPopup ? (
    <div
      className="popup"
      style={{
        position: 'fixed',
        fontSize:"20px",
        textAlign:"center",
        top: '15%',
        left: '53%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        background: '#F1EEF3',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        zIndex: '9999',
      }}
    >
Make sure to take a look at our user manual to understand the services of DataSparkle by clicking on the lamp in the sidebar 
    </div>
  ) : null;
};

export default Popup;
