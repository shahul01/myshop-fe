import { createContext, useReducer, useState } from "react";
import searchReducer from "helpers/Reducers/searchReducer";

const initialState = { searchText: '' };
export const SearchContext = createContext<ISearchText | null>(null);

const SearchContextProvider = (props) => {
  const [ searchText, dispatch ] = useReducer(searchReducer, initialState)

  return (
    <SearchContext.Provider value={{ searchText, dispatch }}>
      {props.children}
    </SearchContext.Provider>
  )
};

export default SearchContextProvider;
