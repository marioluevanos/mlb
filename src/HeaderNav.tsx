import { BaseSyntheticEvent, FC } from "react";
import { cn } from "./utils/cn";
import { RefreshIcon } from "./Icon";

type HeaderNavProps = {
  isLoading: boolean;
  date: string;
  onRefresh: (event: BaseSyntheticEvent) => void;
};

export const HeaderNav: FC<HeaderNavProps> = (props) => {
  const { isLoading, onRefresh, date } = props;

  return (
    <nav className="ctas">
      {/* <button
      id="previous-date"
      className={cn("button", isLoading && "loading")}
      title="Previous date"
      onClick={onRefresh}
      data-day={previousDay(data.date)}
    >
      <LeftIcon />
    </button> */}
      <button
        id="refresh"
        className={cn("button", isLoading && "loading")}
        title="Refresh content"
        onClick={onRefresh}
        data-date={date}
      >
        <RefreshIcon />
      </button>
      {/* <button
      id="next-date"
      className={cn("button", isLoading && "loading")}
      title="Next date"
      onClick={onRefresh}
      data-day={nextDay(data.date)}
    >
      <RightIcon />
    </button> */}
    </nav>
  );
};
