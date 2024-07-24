import { createContext, Dispatch, useContext, useReducer } from "react";

//Enum Pages
export enum Pages {
  Inbox,
  Groups,
  Friends,
  Requests,
  Searches,
}

interface Page {
  page: Pages;
  content: JSX.Element;
}

interface PageAction {
  type: string;
  payload: Page;
}

const PagesContext = createContext<Page>({
  page: Pages.Requests,
  content: <></>,
});
const PagesDispatchContext = createContext<Dispatch<PageAction>>(() => {});

export function PagesProvider({ children }: { children: React.ReactNode }) {
  const pages: Page = {
    page: Pages.Requests,
    content: <></>,
  };
  const [pageResults, dispatch] = useReducer(pageReducer, pages);

  return (
    <PagesContext.Provider value={pageResults}>
      <PagesDispatchContext.Provider value={dispatch}>
        {children}
      </PagesDispatchContext.Provider>
    </PagesContext.Provider>
  );
}

export function usePages() {
  return useContext(PagesContext);
}

export function usePagesDispatch() {
  return useContext(PagesDispatchContext);
}

function pageReducer(state: Page, action: PageAction): Page {
  switch (action.type) {
    case "SET_PAGE":
      return {
        page: action.payload.page,
        content: action.payload.content,
      };
    case "CLEAR_ALL_PAGES":
      return {
        page: Pages.Requests,
        content: <></>,
      };
    default:
      return state;
  }
}
