import React, { useEffect, useMemo, useRef } from 'react';
import useGetHomelandData from '../../hooks/useGetHomelandData';
import { FormatDate } from '../../utils/FormatDate';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from 'reactstrap'; // Import Reactstrap components
import './CharacterModal.css';
import { Character } from '../../redux/types/charactersTypes';

interface CharacterModalProps {
  character: Character;
  isOpen: boolean;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, isOpen, onClose }) => {
  const { data: homeworld, loading, error } = useGetHomelandData<{
    name: string;
    terrain: string;
    climate: string;
    population: string;
  }>(character.homeworld);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    onClose();
    // Optionally, move focus back to the triggering element
  };

  // Memoize random image URL
  const randomImageUrl = useMemo(() => `https://picsum.photos/200?random=${character.name}`, [character.name]);

  useEffect(() => {
    if (isOpen) {
      // Move focus to the modal's close button
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <Modal 
      isOpen={isOpen} 
      role="dialog" 
      toggle={handleClose} 
      size="lg" 
      aria-labelledby="character-modal-title"
      aria-describedby="character-modal-description"
    >
      <ModalHeader id='character-modal-title' className="custom-modal-header" toggle={onClose}>
        <img src={randomImageUrl} alt={character.name} className="modal-character-image" />
        {character.name}
      </ModalHeader>
      <ModalBody id='character-modal-description'>
        {loading ? (
          <div className="loading-content">
            <Spinner color="primary" />
            <p>Loading character details...</p>
          </div>
        ) : error ? (
          <div className="error-content">
            <p>There was an error loading the character's data.</p>
          </div>
        ) : (
          <>
            <div className="character-info">
              <p>
                <strong>Height:</strong> {character.height} meters
              </p>
              <p>
                <strong>Mass:</strong> {character.mass} kg
              </p>
              <p>
                <strong>Birth Year:</strong> {character.birth_year}
              </p>
              <p>
                <strong>Films:</strong> {character.films.length}
              </p>
              <p>
                <strong>Date Added:</strong> <FormatDate date={new Date()} />
              </p>
            </div>
            <div className='homeland-text'>
              <h3>
                <strong>Homeworld</strong>
              </h3>
              <hr />
              <p>
                <strong>Name:</strong> {homeworld?.name}
              </p>
              <p>
                <strong>Terrain:</strong> {homeworld?.terrain}
              </p>
              <p>
                <strong>Climate:</strong> {homeworld?.climate}
              </p>
              <p>
                <strong>Population:</strong> {homeworld?.population}
              </p>
            </div>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <button className='close-button' ref={closeButtonRef} aria-label='close' color="secondary" onClick={onClose}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default React.memo(CharacterModal);
