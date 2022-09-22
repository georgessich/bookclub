import classes from "../searchInput/SearchInput.module.scss";
import image from "../searchInput/Icon-color.svg";
import { useQuery, gql } from "@apollo/client";
import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../store/search-context";
import MiniSearch from "minisearch";
const BOOKS = gql`
  query Query {
    bookCards {
      id
      title
      description
      cover
      author
    }
  }
`;
const SearchInput = () => {
  const { data } = useQuery(BOOKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  // const suggestions = data?.bookCards?.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase) || item.author.toLowerCase().includes(searchQuery.toLowerCase));
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteRef = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setShowSuggestion(false);
      }
    };
    let miniSearch = new MiniSearch({
      fields: ["title", "author"],
      storeFields: ["title", "description", "cover", "author"],
    });
    miniSearch.addAll(data.bookCards);
    let filteredBooks = miniSearch.search(searchContext.searchQuery);
    setSuggestions(filteredBooks);

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [data.bookCards, searchContext.searchQuery]);

  const searchContext = useContext(SearchContext);
  const handleClick = () => {
    setSearchQuery("");
  };
  const searchQueryHandler = () => {
    searchContext.searchHandler(searchQuery);
    handleClick();
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestion(false);
  };
  console.log(
    suggestions
  );
  console.log(searchQuery);
  return (
    <div className={classes["search"]} style={{ alignSelf: "flex-end" }}>
      <label
        htmlFor="search-form"
        ref={autocompleteRef}
        className={classes["search-label"]}
      >
        <input
          className={classes["search-input"]}
          type="search"
          name="search-form"
          id="search-form"
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestion(true)}
          value={searchQuery}
        />

        {searchQuery === "" ? (
          <Link to="/">
            <img
              src={image}
              className={classes["search-icon"]}
              alt="searchbutton"
            />
          </Link>
        ) : (
          <Link to={`/result/${searchQuery}`} onClick={searchQueryHandler}>
            <img
              src={image}
              className={classes["search-icon"]}
              alt="searchbutton"
            />
          </Link>
        )}
        {showSuggestion && (
          <ul>
            {suggestions.map((suggestion) => (
              <li
                onClick={() => handleSuggestionClick(suggestion)}
                key={suggestion}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        )}
      </label>
    </div>
  );
};

export default SearchInput;
