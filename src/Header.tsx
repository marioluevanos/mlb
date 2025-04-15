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
      <h1 data-date={date && formatDate(date)}>
        <img
          className="logo"
          src="https://firebasestorage.googleapis.com/v0/b/mario-luevanos.appspot.com/o/mlb%2Ffavicon.png?alt=media&token=2cda6e71-6589-4cf8-a07f-a66171d31bc5"
        />
        MLB
      </h1>
      {children}
    </header>
  );
};
