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

export const TriangleUp: FC = () => {
  return (
    <svg
      height="16"
      width="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.91,10.213l-3.5-5a.52.52,0,0,0-.82,0l-3.5,5A.5.5,0,0,0,4.5,11h7a.5.5,0,0,0,.41-.787Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TriangleDown: FC = () => {
  return (
    <svg
      height="16"
      width="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.943,5.269A.5.5,0,0,0,11.5,5h-7a.5.5,0,0,0-.409.787l3.5,5a.5.5,0,0,0,.818,0l3.5-5A.5.5,0,0,0,11.943,5.269Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SwitchIcon: FC = () => {
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
          points="11.5,0.5 15.5,4.5 11.5,8.5 "
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          fill="none"
          points="4.5,7.5 0.5,11.5 4.5,15.5 "
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          x1="0.5"
          x2="15.5"
          y1="4.5"
          y2="4.5"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          x1="15.5"
          x2="0.5"
          y1="11.5"
          y2="11.5"
        />
      </g>
    </svg>
  );
};

export const HourglassIcon: FC = () => {
  return (
    <svg
      height="16"
      width="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor" strokeMiterlimit="10">
        <path
          d="M12.5,15.5 c0,0,0-0.784,0-1c0-2.843-0.955-5.39-2.5-6.5c1.545-1.11,2.5-3.657,2.5-6.5c0-0.216,0-1,0-1"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5,15.5 c0,0,0-0.784,0-1C3.5,11.657,4.455,9.11,6,8C4.455,6.89,3.5,4.343,3.5,1.5c0-0.216,0-1,0-1"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          x1="1.5"
          x2="14.5"
          y1="0.5"
          y2="0.5"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          x1="1.5"
          x2="14.5"
          y1="15.5"
          y2="15.5"
        />
      </g>
    </svg>
  );
};

export const BaseballPlayerIcon: FC = () => {
  return (
    <svg
      height="16"
      width="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <circle
          cx="8.5"
          cy="3"
          fill="none"
          r="1.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          x1="3.5"
          x2="5.5"
          y1="4.5"
          y2="0.5"
        />
        <path
          d="M2.5,6.5l2,1,2-1h3a1,1,0,0,1,1,1v3l1,5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          fill="none"
          points="5.5 15.5 6.5 10.5 6.5 8.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
