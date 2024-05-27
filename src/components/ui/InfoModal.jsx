import { useRef } from 'react';

function InfoModal({ infoModalText, setInfoModalText }) {
    const infoModal = useRef(null);

    function infoModalHandler() {
        infoModal.current.toggleAttribute('open');
    }

    alert('modal rendered')

    return (
        <dialog open className='z-10' ref={infoModal}>
            <article>
                <h2>{infoModalText?.title}</h2>
                <p>{infoModalText?.message}</p>
                <footer>
                    <button onClick={infoModalHandler}>OK</button>
                </footer>
            </article>
        </dialog>
    );
}

export default InfoModal;
