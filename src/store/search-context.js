
import React, {useState} from "react";

export const SearchContext = React.createContext({
    searchQuery: "", 
    searchHandler: () => {}
});

const SearchContextProvider = (props) => {
    const [searchQuery, setSearchQuery] = useState("")
    const searchHandler = searchQuery => {
        setSearchQuery(searchQuery);
    }

    return(
        <SearchContext.Provider value={{searchQuery: searchQuery, searchHandler: searchHandler}}>
            {props.children}
        </SearchContext.Provider>
    )
}


export default SearchContextProvider;