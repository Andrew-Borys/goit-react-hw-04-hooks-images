import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Overlay, Popup } from './Modal.styled';

export default function ModaL({ onModalClose, modalImage }) {
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', keyDown);
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [onModalClose]);

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={onModalClose}>
        <Popup>
          <img
            style={{
              width: '100 %',
              height: '100%',
            }}
            src={modalImage}
            alt="#"
          />
        </Popup>
      </Overlay>
    </>,
    document.getElementById('modal-root')
  );
}
