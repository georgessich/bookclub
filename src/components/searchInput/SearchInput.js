import classes from "./SearchInput.module.scss";
import image from "./Icon-color.svg";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../store/search-context";
const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchContext = useContext(SearchContext);
  const navigate = useNavigate();
  
  const handleClick = () => {
    setSearchQuery("")
  }
  const searchQueryHandler = () => {
    searchContext.searchHandler(searchQuery);
    handleClick()
  };
  const handleEnterKey = (e) => {

    if (e.keyCode === 13) {
      searchQueryHandler();
      navigate(`/result/${searchQuery}`)
    }
  }
  return (
    <div className={classes["search"]} style={{ alignSelf: "flex-end" }}>
      <label htmlFor="search-form" className={classes["search-label"]}>
        <input
          className={classes["search-input"]}
          type="search"
          name="search-form"
          id="search-form"
          autoComplete="off"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          onKeyDown={handleEnterKey}
        />
        {searchQuery === "" ? <Link to="/">
          <img src={image} className={classes["search-icon"]} alt="searchbutton"/>
        </Link> : <Link to={`/result/${searchQuery}`}
        onClick={searchQueryHandler}>
          <img src={image} className={classes["search-icon"]} alt="searchbutton"/>
        </Link>}
        
      </label>
    </div>
  );
};

export default SearchInput;
