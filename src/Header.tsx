import { BaseSyntheticEvent, FC } from "react";
import { formatDate } from "./utils";

export const Header: FC<{
  date?: string;
  cacheDate?: string;
  onRefresh?: (event: BaseSyntheticEvent) => void;
}> = (props) => {
  const { date, onRefresh, cacheDate } = props;

  return (
    <header id="header">
      <h1 data-date={date && formatDate(date)}>MLB</h1>
      <button
        id="refresh"
        className="button"
        onClick={onRefresh}
        data-time-ago={cacheDate}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            d="M14.5,8a6.5,6.5,0,1,1-1.022-3.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <polyline
            points="13.5 0.5 13.5 4.5 9.5 4.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></polyline>
        </svg>
      </button>
    </header>
  );
};
