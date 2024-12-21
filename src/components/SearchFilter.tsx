import React from "react";
import { Character } from "../redux/types/charactersTypes";

interface SearchFilterProps {
    searchTerm: string;
    selectedHomeworld: string;
    selectedFilm: string;
    selectedSpecies: string;
    setSearchTerm: (term: string) => void;
    setSearchInputLoad: (search: boolean) => void;
    setSelectedHomeworld: (homeworld: string) => void;
    setSelectedFilm: (film: string) => void;
    setSelectedSpecies: (species: string) => void;
    filteredData: Character[]; // Full dataset
    staticSelections: {
        homeworld: string;
        film: string;
        species: string;
    };
}

const SearchFilter: React.FC<SearchFilterProps> = ({
    searchTerm,
    selectedHomeworld,
    selectedFilm,
    selectedSpecies,
    setSearchTerm,
    setSearchInputLoad,
    setSelectedHomeworld,
    setSelectedFilm,
    setSelectedSpecies,
    filteredData,
    staticSelections,
}) => {
    const { homeworld: currentHomeworld, film: currentFilm, species: currentSpecies } = staticSelections;

    const homeworldOptions = Array.from(
        new Set([
            ...(filteredData.map((char) => char.homeworldName || "Unknown")),
            currentHomeworld, // Ensure current selection is included
        ])
    );

    const filmOptions = Array.from(
        new Set([
            ...filteredData.flatMap((char) => char.films || []),
            currentFilm, // Ensure current selection is included
        ])
    );

    const speciesOptions = Array.from(
        new Set([
            ...(filteredData.map((char) => char.species || "Unknown")),
            currentSpecies, // Ensure current selection is included
        ])
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setSearchInputLoad(true);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
        const value = e.target.value;
        if (type === 'homeworld') {
            setSelectedHomeworld(value);
        } else if (type === 'film') {
            setSelectedFilm(value);
        } else if (type === 'species') {
            setSelectedSpecies(value);
        }
        setSearchInputLoad(true);
    };

    return (
        <div className="search-filter-container">
            <input
                type="text"
                data-cy="search-input"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search for characters by name"
            />

            <select
                onChange={(e) => handleFilterChange(e, 'homeworld')}
                value={selectedHomeworld}
            >
                <option value="">All Homeworlds</option>
                {homeworldOptions.map((homeworld) => (
                    <option key={homeworld} value={homeworld}>
                        {homeworld}
                    </option>
                ))}
            </select>

            <select onChange={(e) => handleFilterChange(e, 'film')} value={selectedFilm}>
                <option value="">All Films</option>
                {filmOptions.map((film) => (
                    <option key={film} value={film}>
                        {film}
                    </option>
                ))}
            </select>

            <select onChange={(e) => handleFilterChange(e, 'species')} value={selectedSpecies}>
                <option value="">All Species</option>
                {speciesOptions.map((species) => (
                    <option key={species} value={species}>
                        {species}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default React.memo(SearchFilter);
