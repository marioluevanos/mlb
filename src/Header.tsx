import { FC, ReactNode } from "react";
import { formatDate } from "./utils/date";

export const Header: FC<{
  children?: ReactNode;
  className?: string;
  date?: string;
}> = (props) => {
  const { date, className, children } = props;

  return (
    <header id="header" className={className}>
      <h1 data-date={date && formatDate(date)}>
        <img
          loading="eager"
          className="logo"
          width={256}
          height={256}
          src="/icon.png"
        />
        MLB
      </h1>
      {children}
    </header>
  );
};
