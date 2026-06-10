import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function AppleMapsIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="3"
        className="stroke-current"
        strokeWidth="1.5"
      />
      <path
        d="M3 9h18M8 5V3M16 5V3"
        className="stroke-current"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="13" r="2.25" className="fill-current" />
      <path
        d="M12 15.25v2.5"
        className="stroke-current"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GoogleMapsIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
        fill="#EA4335"
      />
      <circle cx="12" cy="9" r="2.5" fill="#B31412" />
      <path
        d="M12 11.5v3"
        stroke="#7B1110"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="21" rx="6" ry="1" fill="#34A853" opacity="0.35" />
    </svg>
  );
}
