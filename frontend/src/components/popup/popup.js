import React, { useState } from "react";
import Modal from "react-modal";
import page1 from "../../images/page1.svg";
import page2 from "../../images/page2.svg";
import page3 from "../../images/page3.svg";
import page4 from "../../images/page4.svg";
import page5 from "../../images/page5.svg";
import page6 from "../../images/page6.svg";
import page7 from "../../images/page7.svg";
import page8 from "../../images/page8.svg";


const imageStyles = {
  width: "1350px", 
  height: "auto", 
};

function User_manual({ isOpen, closeModal }) {
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [page1, page2, page3, page4, page5, page6, page7,page8];

  const buttonStyles = {
    nextButton: {
      width: "100px",
      height: "30px",
      border: "none",
      borderRadius: "5px",
      color: "white",
      backgroundColor: "#7d4ef1",
      fontSize: "12px",
      fontFamily: "Poppins",
      textAlign: "center",
      cursor: "pointer",
    },
    closeButton: {
      width: "80px",
      height: "30px",
      border: "none",
      borderRadius: "5px",
      color: "white",
      backgroundColor: "black",
      fontSize: "12px",
      fontFamily: "Poppins",
      textAlign: "center",
      cursor: "pointer",
    },
  };

  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  const currentImage = images[currentImageIndex];

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        {/* <button onClick={closeModal} style={buttonStyles.closeButton}>
          Close
        </button> */}
        <img src={currentImage} alt="" style={imageStyles} />

        <button onClick={goToNextImage} style={buttonStyles.nextButton}>
          Next
        </button>
      </Modal>
    </div>
  );
}

export default User_manual;
