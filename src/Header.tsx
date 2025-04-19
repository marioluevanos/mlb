import { BaseSyntheticEvent, FC, ReactNode } from "react";

export const Header: FC<{
  children?: ReactNode;
  className?: string;

  onLogoClick: (event: BaseSyntheticEvent) => void;
}> = (props) => {
  const { className, children, onLogoClick } = props;

  return (
    <header id="header" className={className}>
      <h1 onClick={onLogoClick}>
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
