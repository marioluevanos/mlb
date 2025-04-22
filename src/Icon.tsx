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

export const CapIcon: FC = () => {
  return (
    <svg
      height="16"
      width="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path
          d="M3.227,9.711S.5,10.68.5,11.763c0,1.2,4.261,2.737,6.818,2.737,2.727,0,6.818-3.421,6.818-3.421"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5,10.4s-1.818,1.368-6.136,1.368S3.227,10.4,3.227,10.4V7.658A6.148,6.148,0,0,1,9.364,1.5h0A6.147,6.147,0,0,1,15.5,7.658Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export const AtBatIcon: FC<{ className?: string }> = (props) => {
  return (
    <svg
      height="16"
      width="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <g fill="currentColor">
        <circle
          cx="12.5"
          cy="8.5"
          fill="none"
          r="2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.268,5.268l.4-.4a2.6,2.6,0,0,0,.274-3.445,2.5,2.5,0,0,0-3.709-.192L6.643,5.821A4.017,4.017,0,0,0,5.71,7.289L4.859,9.641,1.25,13.25"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.75,14.75l3.609-3.609,2.352-.851c.093-.034.184-.071.274-.111"
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
          x1="0.5"
          x2="3.5"
          y1="12.5"
          y2="15.5"
        />
      </g>
    </svg>
  );
};

export const BaseballIcon: FC<{ className?: string }> = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6576 2.3424C12.096 0.7808 10.048 0 8 0C5.952 0 3.904 0.7808 2.3424 2.3424C-0.7808 5.4656 -0.7808 10.5344 2.3424 13.6576C3.904 15.2192 5.952 16 8 16C10.048 16 12.096 15.2192 13.6576 13.6576C16.7808 10.5344 16.7808 5.4656 13.6576 2.3424ZM2.7968 2.7968C4.0512 1.5424 5.6832 0.7936 7.4368 0.6656C7.3856 1.088 7.2768 1.5744 7.072 2.09216L6.6432 1.664L6.1888 2.1184L6.7904 2.72C6.464 3.3792 5.984 4.0896 5.2736 4.8256L4.3776 3.9296L3.9296 4.3776L4.8256 5.2736C4.0896 5.9776 3.3856 6.46336 2.7264 6.7968L2.1184 6.1888L1.664 6.6432L2.0928 7.072C1.568 7.2768 1.0816 7.3856 0.6592 7.4368C0.7936 5.7472 1.4976 4.0896 2.7968 2.7968ZM7.9168 15.36C5.984 15.3408 4.1664 14.5728 2.7968 13.2032C1.3824 11.7952 0.6656 9.9392 0.64 8.0896C1.1968 8.032 1.856 7.8784 2.5856 7.56544L3.4752 8.45504L3.9296 8.00064L3.1936 7.26464C3.8528 6.91904 4.5568 6.42048 5.28 5.73504L6.1888 6.64384L6.6432 6.18944L5.7344 5.28064C6.4192 4.55744 6.912 3.85984 7.264 3.19424L8 3.9296L8.4544 3.4752L7.5584 2.57984C7.872 1.8624 8.0192 1.2032 8.0832 0.64C10.0166 0.6592 11.8336 1.4272 13.2032 2.7968C14.624 4.2112 15.3408 6.0672 15.36 7.9232C14.7968 7.9808 14.144 8.128 13.4208 8.44224L12.5254 7.54624L12.071 8.00064L12.8064 8.73664C12.1408 9.08864 11.4368 9.5808 10.72 10.2662L9.8112 9.35744L9.3568 9.81184L10.2656 10.7206C9.5808 11.4438 9.088 12.1478 8.736 12.807L8 12.0704L7.5456 12.5248L8.4352 13.4144C8.128 14.144 7.9808 14.8032 7.9168 15.36ZM13.2032 13.2032C11.9488 14.4576 10.3168 15.2064 8.5632 15.3344C8.6144 14.912 8.7232 14.432 8.928 13.9078L9.3568 14.3366L9.8112 13.8822L9.2096 13.2806C9.53664 12.6214 10.0166 11.911 10.7264 11.175L11.6224 12.071L12.0704 11.623L11.1744 10.727C11.9104 10.023 12.6208 9.54304 13.2736 9.20384L13.8816 9.81184L14.336 9.35744L13.9072 8.92864C14.4314 8.71744 14.9178 8.60864 15.3402 8.56384C15.2064 10.2528 14.5024 11.9104 13.2032 13.2032Z"
        fill="currentColor"
      />
    </svg>
  );
};
