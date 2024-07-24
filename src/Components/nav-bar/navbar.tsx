import { useNavigate } from "react-router-dom";
import { useSessionDispatch } from "../../Contexts/SessionContext";
import "./navbar.style.css";
import { useSearchDispatch } from "../../Contexts/SearchContext";
import { Pages, usePagesDispatch } from "../../Contexts/PagesContext";

export default function NavBar(): JSX.Element {
  const userDispatch = useSessionDispatch();
  const navigate = useNavigate();
  const searchDispatch = useSearchDispatch();
  const pagesDispatch = usePagesDispatch();

  const handleLogOutClick = () => {
    // Perform log out logic here
    userDispatch({ type: "CLEAR_USER" });
    searchDispatch({ type: "CLEAR_SEARCH", payload: [] });
    pagesDispatch({
      type: "CLEAR_ALL_PAGES",
      payload: { page: Pages.Friends, content: <></> },
    });

    localStorage.removeItem("userSession");
    navigate("/login");
  };

  return (
    <div role="banner">
      <div className="banner-content">
        <div className="title-container">
          <h1 className="app-title">Chat App</h1>
        </div>
        <div className="banner-bar"></div>
        <div className="banner-actions">
          <div className="banner-actions-container">
            <button onClick={handleLogOutClick} className="logout-button">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
