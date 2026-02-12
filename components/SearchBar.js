import { useState, useCallback } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  suggestions = [],
  onSearch = () => {},
  onSelect = () => {},
}) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setInput(value);
      setShowSuggestions(!!value);
      onSearch(value);
    },
    [onSearch],
  );

  const handleSelect = useCallback(
    (suggestion) => {
      setInput(suggestion.title);
      setShowSuggestions(false);
      onSelect(suggestion);
    },
    [onSelect],
  );

  const filteredSuggestions = suggestions.filter((s) =>
    s.title.toLowerCase().includes(input.toLowerCase()),
  );

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={input}
        onChange={handleChange}
        className={styles.input}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSelect(suggestion)}
              className={styles.suggestionItem}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
