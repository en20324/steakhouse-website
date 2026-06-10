import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function AppleMapsGoldIcon({ className, ...props }: IconProps) {
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
        x="4"
        y="5"
        width="16"
        height="14"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M4 9.5h16" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M9.5 5V3.5M14.5 5V3.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M8 14.5h3.5l1-2 1.5 3 2-3.5H16"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <circle cx="12" cy="13.25" r="2.1" fill="currentColor" />
      <path
        d="M12 15.35v2.15"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GoogleMapsGoldIcon({ className, ...props }: IconProps) {
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
        d="M12 2.25C8.27 2.25 5.25 5.27 5.25 9c0 4.88 6.75 12.5 6.75 12.5s6.75-7.62 6.75-12.5c0-3.73-3.02-6.75-6.75-6.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <circle cx="12" cy="9" r="2.35" fill="currentColor" />
      <circle
        cx="12"
        cy="9"
        r="0.85"
        fill="var(--background, #050505)"
        opacity="0.35"
      />
    </svg>
  );
}
