import { FC } from "react";
import css from "./ImageModal.module.css"
import Modal from 'react-modal';
Modal.setAppElement("#root");

const customStyles = {
  content: {
    padding: '0',
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
};

interface ImageModalProps {
    showModal: boolean;
    closeModal: () => void;
    currentUrl: string;
    currentAlt: string;
}

const ImageModal: FC<ImageModalProps> =({showModal, closeModal, currentUrl, currentAlt}) => {
    return (
        <>
            {showModal && <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <img src={currentUrl} alt={currentAlt} className={css.modalImg}/>
            </Modal>}
        </>
    )
};

export default ImageModal;