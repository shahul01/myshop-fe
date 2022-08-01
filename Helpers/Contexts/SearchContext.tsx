import { createContext, useReducer, useState } from "react";
import searchReducer from "helpers/Reducers/searchReducer";

const initialState = { searchText: '' };
export const SearchContext = createContext<ISearchText | null>(null);

const SearchContextProvider = (props) => {
  const [ searchText, dispatchSearchText ] = useReducer(searchReducer, initialState)

  return (
    <SearchContext.Provider value={{ searchText, dispatchSearchText }}>
      {props.children}
    </SearchContext.Provider>
  )
};

export default SearchContextProvider;
