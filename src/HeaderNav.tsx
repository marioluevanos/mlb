import { BaseSyntheticEvent, FC } from "react";
import { cn } from "./utils/cn";
import { RefreshIcon } from "./Icon";
import { formatDate } from "./utils/date";

type HeaderNavProps = {
  isLoading: boolean;
  date: string;
  onRefresh: (event: BaseSyntheticEvent) => void;
};

export const HeaderNav: FC<HeaderNavProps> = (props) => {
  const { isLoading, onRefresh, date } = props;
  const [day, today, _year] = date ? formatDate(date).split(",") : [];

  return (
    <nav className="ctas">
      <span className="today">
        {day}, {today}
      </span>
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
