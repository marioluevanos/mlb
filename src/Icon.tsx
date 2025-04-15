import { FC } from "react";

export const RefreshIcon: FC = () => {
  return (
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
  );
};

export const LeftIcon: FC = () => {
  return (
    <svg
      height="16"
      width="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor" strokeMiterlimit="10">
        <polyline
          fill="none"
          points="11.5,0.5 4,8 11.5,15.5 "
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export const RightIcon: FC = () => {
  return (
    <svg
      height="16"
      width="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor" strokeMiterlimit="10">
        <polyline
          fill="none"
          points="5.5,0.5 10.5,8 5.5,15.5 "
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
