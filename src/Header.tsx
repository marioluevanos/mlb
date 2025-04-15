import { FC, ReactNode } from "react";
import { formatDate } from "./utils";

export const Header: FC<{
  children?: ReactNode;
  className?: string;
  date?: string;
}> = (props) => {
  const { date, className, children } = props;

  return (
    <header id="header" className={className}>
      <h1 data-date={date && formatDate(date)}>MLB</h1>
      {children}
    </header>
  );
};
