import { useState } from "react";
import { searchByUsernameOrEmail } from "../../endpoints/userapi";
import { useSession } from "../../contexts/SessionContext";
import { UserSearch, useSearchDispatch } from "../../contexts/SearchContext";
import "./search.style.css";
import { Pages, usePagesDispatch } from "../../contexts/PagesContext";
import SearchPage from "../../pages/search/search.page";

export default function Search() {
  const userData = useSession();
  const searchDispatch = useSearchDispatch();
  const pageDispatch = usePagesDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const searchByInput = () => {
    searchByUsernameOrEmail(searchQuery, userData.id).then((response) => {
      if (response === false) {
        return;
      }

      const userSearches: UserSearch[] = response.map((user: any) => {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.firstName + " " + user.lastName,
        };
      });

      searchDispatch({ type: "SET_SEARCH", payload: userSearches });

      pageDispatch({
        type: "SET_PAGE",
        payload: {
          page: Pages.Searches,
          content: <SearchPage searchResults={userSearches} />,
        },
      });
    });
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    searchByInput();
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <div className="search-results-c">
      <div className="search-results-nav">
        <input
          type="text"
          placeholder="Search for people to chat with"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          className="search-results-input"
        />
      </div>
    </div>
  );
}
