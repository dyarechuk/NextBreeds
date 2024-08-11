import { Breed } from '@/types/breeds';
import { debounce } from 'lodash';
import { CircleX } from 'lucide-react';
import { useCallback, useState } from 'react';

interface BreedAutocompleteProps {
  setFilteredBreeds: (breeds: Breed[]) => void;
  cats: Breed[];
  dogs: Breed[];
}

export const BreedAutocomplete: React.FC<BreedAutocompleteProps> = ({
  setFilteredBreeds,
  cats,
  dogs,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<
    string[]
  >([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSearch = (query: string) => {
    if (query === '') {
      setFilteredBreeds([...cats, ...dogs]);
      setAutocompleteSuggestions([]);
      setIsDropdownVisible(false);
    } else {
      const filtered = [...cats, ...dogs].filter((breed) =>
        breed.name.toLowerCase().includes(query),
      );
      setFilteredBreeds(filtered);
      setAutocompleteSuggestions(filtered.map((breed) => breed.name));
      setIsDropdownVisible(filtered.length > 0);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), [
    cats,
    dogs,
  ]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    debouncedHandleSearch(query);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    const filtered = [...cats, ...dogs].filter(
      (breed) => breed.name.toLowerCase() === suggestion.toLowerCase(),
    );
    setFilteredBreeds(filtered);
    setIsDropdownVisible(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredBreeds([...cats, ...dogs]);
    setAutocompleteSuggestions([]);
    setIsDropdownVisible(false);
  };

  return (
    <div className="fixed w-full z-10">
      <div className="relative">
        <label className="relative">
          <input
            type="text"
            className="p-6 text-2xl border-2 border-gray-400 rounded-b-2xl w-full text-black outline-none focus:border-gray-800 transition duration-500 bg-gray-300"
            value={searchQuery}
            onChange={onSearchChange}
          />
          <span
            className={`text-2xl text-gray-500 text-opacity-80 absolute left-0 -top-3 mx-6 px-2 transition dutation-300 input-text ${
              searchQuery &&
              '!text-black bg-gray-300 transform translate-y-10 -translate-x-4 scale-75'
            }`}
          >
            Breed name
          </span>
        </label>

        {searchQuery && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
            onClick={handleClearSearch}
          >
            <CircleX color="#000000" />
          </button>
        )}
        {isDropdownVisible && (
          <ul className="absolute left-0 right-0 mt-4 bg-white border border-gray-400 rounded-md max-h-60 overflow-y-auto z-10 text-blacky">
            {autocompleteSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BreedAutocomplete;
