import SearchUserCard from "../../components/search-user-card/search-user-card";
import { UserSearch } from "../../contexts/searchContext";
import { useSession } from "../../contexts/sessionContext";
import "./search.style.css";

interface SearchPageProps {
  searchResults: UserSearch[];
}

export default function SearchPage(props: SearchPageProps): JSX.Element {
  const user = useSession();

  return (
    <div className="search-page">
      <div className="search-results-c">
        <ul>
          {props.searchResults.map((search) => (
            <li key={search.id}>
              <SearchUserCard
                name={search.fullName}
                userSenderId={user.id}
                userReceiverId={search.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
