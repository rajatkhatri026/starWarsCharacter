import React, { useEffect, useMemo, useState } from 'react';
import './CharacterCard.css';
import { Character } from '../../redux/types/charactersTypes';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  const [speciesColors, setSpeciesColors] = useState<{ [key: string]: string }>({});

  // Memoize random image URL to avoid recalculating on each render
  const randomImageUrl = useMemo(() => `https://picsum.photos/200?random=${character.name}`, [character.name]);
  
  // Function to generate random color
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Fetch unique species and assign colors dynamically
  useEffect(() => {
    const newSpeciesColors: { [key: string]: string } = {};
    newSpeciesColors[character.species] = generateRandomColor(); // Generate a random color for each species
    setSpeciesColors(newSpeciesColors);
  }, [character]);

  // Memoize species background color dynamically
  const speciesColor = useMemo(() => {
    const species = character?.species; // Assuming the first species is what we need
    return speciesColors[species] || '#D3D3D3'; // Default to light grey if not found
  }, [character.species, speciesColors]);

  return (
    <div className={`character-card`} onClick={onClick} style={{ backgroundColor: speciesColor}}>
      <LazyLoadImage
        src={randomImageUrl}
        alt={character.name}
        effect="blur"
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: {transitionDelay: "0.5s"},
        }}
      />
      <h6>{character.name}</h6>
    </div>
  );
};

export default React.memo(CharacterCard);
