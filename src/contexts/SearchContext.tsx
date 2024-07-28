import { createContext, Dispatch, useContext, useReducer } from "react";

export interface UserSearch {
  id: number;
  username: string;
  email: string;
  fullName: string;
}

export interface searchAction {
  type: string;
  payload: UserSearch[];
}

const SearchContext = createContext<UserSearch[]>([]);
const SearchDispatchContext = createContext<Dispatch<searchAction>>(() => {});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const searches: UserSearch[] = [];
  const [searchResults, dispatch] = useReducer(searchReducer, searches);

  return (
    <SearchContext.Provider value={searchResults}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}

export function useSearchDispatch() {
  return useContext(SearchDispatchContext);
}

export function searchReducer(
  state: UserSearch[],
  action: searchAction
): UserSearch[] {
  switch (action.type) {
    case "SET_SEARCH":
      return action.payload;
    case "CLEAR_SEARCH":
      return [];
    default:
      return state;
  }
}
