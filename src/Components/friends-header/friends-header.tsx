import Snackbar from "../snackbar/snackbar";
import "./friends-header.style.css";
import Search from "../search/search";
import { Pages, usePages, usePagesDispatch } from "../../contexts/PagesContext";
import { useSearch } from "../../contexts/SearchContext";
import SearchPage from "../../pages/search/search.page";
import RequestPage from "../../pages/requests/requests.page";
import FriendsPage from "../../pages/friends/friends.page";

export default function FriendsHeader(): JSX.Element {
  const page = usePages();
  const pageDispatch = usePagesDispatch();
  const searchResults = useSearch();

  const setActive = (index: Pages) => {
    if (index === Pages.Searches) {
      pageDispatch({
        type: "SET_PAGE",
        payload: {
          page: index,
          content: <SearchPage searchResults={searchResults} />,
        },
      });
      return;
    }

    if (index === Pages.Requests) {
      pageDispatch({
        type: "SET_PAGE",
        payload: {
          page: index,
          content: <RequestPage />,
        },
      });
      return;
    }

    if (index === Pages.Friends) {
      pageDispatch({
        type: "SET_PAGE",
        payload: {
          page: index,
          content: <FriendsPage />,
        },
      });
      return;
    }

    pageDispatch({
      type: "SET_PAGE",
      payload: {
        page: index,
        content: <></>,
      },
    });
  };

  return (
    <div className="friends-c">
      <div className="friends-header-c">
        <span>
          <h1>Friends</h1>
        </span>
      </div>
      <Search />
      <div className="switcher-groups-c">
        <div className="switcher-c">
          <div className="popup-switcher">
            <Snackbar
              isActive={page.page === Pages.Inbox}
              content="Inbox"
              setActive={() => setActive(Pages.Inbox)}
            />
            <Snackbar
              isActive={page.page === Pages.Groups}
              content="Groups"
              setActive={() => setActive(Pages.Groups)}
            />
            <Snackbar
              isActive={page.page === Pages.Friends}
              content="Friends"
              setActive={() => setActive(Pages.Friends)}
            />
            <Snackbar
              isActive={page.page === Pages.Requests}
              content="Requests"
              setActive={() => setActive(Pages.Requests)}
            />
            <Snackbar
              isActive={page.page === Pages.Searches}
              content="Search"
              setActive={() => setActive(Pages.Searches)}
            />
          </div>
        </div>
      </div>
      <div className="multi-list-c">{page.content}</div>
    </div>
  );
}
