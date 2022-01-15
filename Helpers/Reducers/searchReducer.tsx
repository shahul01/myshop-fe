export const UPDATE_SEARCH = "UPDATE_SEARCH";

const searchReducer = (state:ISearchText, action:ISearchTextAction) => {
  switch(action.type) {
    case UPDATE_SEARCH:
      return {...state, searchText: action.searchText};

    default:
      return state;

  };
};

export default searchReducer;
