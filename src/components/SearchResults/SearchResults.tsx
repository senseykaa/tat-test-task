import { useScrollIntoView } from "~/hooks/useScrollIntoView";
import { useSearchError, useSearchStatus, useTours } from "~/store/search/selectors";

import { SearchResultsEmpty } from "./components/SearchResultsEmpty";
import { SearchResultsError } from "./components/SearchResultsError";
import { SearchResultsList } from "./components/SearchResultsList";
import { SearchResultsLoading } from "./components/SearchResultsLoading";

import styles from "./styles.module.scss";

export const SearchResults = () => {
  const status = useSearchStatus();
  const tours = useTours();
  const error = useSearchError();

  const wrapperRef = useScrollIntoView<HTMLDivElement>(status === "success" && tours.length > 0);

  if (status === "idle") return null;

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {status === "loading" && <SearchResultsLoading />}

      {status === "error" && <SearchResultsError message={error} />}

      {status === "success" && tours.length === 0 && <SearchResultsEmpty />}

      {status === "success" && tours.length > 0 && <SearchResultsList tours={tours} />}
    </div>
  );
};
