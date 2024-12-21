import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/slices/charactersSlice';
import CharacterCard from '../../components/CharacterCard';
import CharacterModal from '../../components/CharacterModal';
import { RootState } from '../../redux/store';
import { AppDispatch } from '../../redux/store';
import SearchFilter from '../../components/SearchFilter';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Character } from '../../redux/types/charactersTypes';
import { fetchCharacters } from '../../redux/thunks/charactersThunks';
import useFetchDetails from '../../hooks/useFetchDetails';

const MainContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, currentPage, hasMore } = useSelector((state: RootState) => state.characters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [filteredData, setFilteredData] = useState(data || []);
  const [dataOptions, setDataOptions] = useState(data || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // Debounced search term
  const [selectedHomeworld, setSelectedHomeworld] = useState('');
  const [selectedFilm, setSelectedFilm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [searchInputLoad, setSearchInputLoad] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = useFetchDetails(); // Use the custom hook

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleCardClick = useCallback((character: Character) => {
    setSelectedCharacter(character);
    toggleModal();
  }, [toggleModal]);
  
  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust debounce delay as needed (e.g., 300ms)

    return () => clearTimeout(timer); // Cleanup previous timer
  }, [searchTerm]);

  // Apply optimistic updates when filters change
  useEffect(() => {
    const applyFilters = async () => {
      const filtered = await Promise.all(
        (data || []).map(async (character) => {
          // Fetch homeland data
          const homeworldName = await fetchData(character.homeworld, 'homeland');

          // Fetch films data
          const filmsData = await Promise.all(
            character.films.map(async(filmUrl: string) => {
              const filmData = await fetchData(filmUrl, "film");
              return filmData;
            })
          );

          // Fetch species data
          const speciesData = await fetchData(character.species[0], "species");

          return {
            ...character,
            homeworldName,
            films: filmsData,
            species: speciesData,
          };
        })
      );

      // Now apply the filters
      const optimisticallyFilteredData = filtered.filter((character) => {
        const nameMatches = character.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        const homeworldMatches = selectedHomeworld ? character.homeworldName === selectedHomeworld : true;
        const filmMatches = selectedFilm ? character.films.some((film) => film.includes(selectedFilm)) : true;
        const speciesMatches = selectedSpecies ? character.species.includes(selectedSpecies) : true;
        return nameMatches && homeworldMatches && filmMatches && speciesMatches;
      });
  
      setFilteredData(optimisticallyFilteredData || []);
      setDataOptions(optimisticallyFilteredData || [])
      setSearchInputLoad(false)
    };
  
    applyFilters();
  }, [data]);

  useEffect(() => {
    const applyFilters = async () => {
      const filtered = await Promise.all(
        (data || []).map(async (character) => {
          // Fetch homeland data
          const homeworldName = await fetchData(character.homeworld, 'homeland');

          // Fetch films data
          const filmsData = await Promise.all(
            character.films.map(async(filmUrl: string) => {
              const filmData = await fetchData(filmUrl, "film");
              return filmData;
            })
          );

          // Fetch species data
          const speciesData = await fetchData(character.species[0], "species");

          return {
            ...character,
            homeworldName,
            films: filmsData,
            species: speciesData,
          };
        })
      );

      // Now apply the filters
      const optimisticallyFilteredData = filtered.filter((character) => {
        const nameMatches = character.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        const homeworldMatches = selectedHomeworld ? character.homeworldName === selectedHomeworld : true;
        const filmMatches = selectedFilm ? character.films.some((film) => film.includes(selectedFilm)) : true;
        const speciesMatches = selectedSpecies ? character.species.includes(selectedSpecies) : true;
        return nameMatches && homeworldMatches && filmMatches && speciesMatches;
      });
  
      setDataOptions(optimisticallyFilteredData || []);
      setSearchInputLoad(false)
    };
  
    applyFilters();
  }, [debouncedSearchTerm, selectedHomeworld, selectedFilm, selectedSpecies]);


  // Remove duplicates based on unique property (e.g., name or id)
  const uniqueFilteredData = useMemo(() => {
    const seen = new Set();
    return dataOptions.filter((character) => {
      // Use a unique property, like `id` or `name`, to determine uniqueness
      const identifier = character.name;  // or use `character.id` if available
      return seen.has(identifier) ? false : seen.add(identifier);
    });
  }, [dataOptions]);
  

  // Fetch characters when the page changes, but prevent initial call
  useEffect(() => {
    if (currentPage === 1 || (hasMore && currentPage < 10)) {
      dispatch(fetchCharacters(currentPage));
    }
  }, [dispatch, currentPage, hasMore]);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          dispatch(setPage(currentPage + 1));
        }
      },
      { threshold: 1.0 } // Trigger when the element is fully visible
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [dispatch, currentPage, hasMore, loading]);

  return (
    <main className="main-content">
      {/* Search and Filter Section */}
      <SearchFilter
        searchTerm={searchTerm}
        selectedHomeworld={selectedHomeworld}
        selectedFilm={selectedFilm}
        selectedSpecies={selectedSpecies}
        setSearchTerm={setSearchTerm}
        setSearchInputLoad={setSearchInputLoad}
        setSelectedHomeworld={setSelectedHomeworld}
        setSelectedFilm={setSelectedFilm}
        setSelectedSpecies={setSelectedSpecies}
        filteredData={filteredData} // Use filteredData for dynamic dropdown options
        staticSelections={{
            homeworld: selectedHomeworld,
            film: selectedFilm,
            species: selectedSpecies,
        }}
      />
      <hr></hr>
      {loading || searchInputLoad ? (
        <LoadingIndicator message="Fetching data, please wait..." />
      )
      :
        <>
          {/* Cards Section */}
          <div className="card-container pb-5">
            {uniqueFilteredData.length ? uniqueFilteredData?.map((character, index) => (
              <CharacterCard key={`${character.name}-${index}`} character={character} onClick={() => handleCardClick(character)} />
            ))
            :
            uniqueFilteredData.length === 0 && debouncedSearchTerm !== "" && <div className='no-data'>{`No data available for ${debouncedSearchTerm}`}</div>
            }
          </div>

          {/* Infinite Scroll Trigger */}
          {hasMore && (
            <div ref={observerRef} style={{ height: '50px', backgroundColor: 'transparent' }} />
          )}

          {/* Modal */}
          {selectedCharacter && <CharacterModal character={selectedCharacter} isOpen={isModalOpen} onClose={toggleModal} />}

          {/* Loading Indicator for Additional Data */}
          {loading && currentPage > 1 && <LoadingIndicator message="Loading more characters..." />}
        </>
      }
    </main>
  );
};

export default MainContent;