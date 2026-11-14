import type { SVGProps } from "react";

export type IconName =
  | "home"
  | "children"
  | "calendar"
  | "care"
  | "library"
  | "forum"
  | "assistant"
  | "bell"
  | "user"
  | "menu"
  | "close"
  | "arrow"
  | "logout"
  | "accessibility"
  | "plus"
  | "info"
  | "check"
  | "chevron";
const paths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9M9 20v-7h6v7" />
    </>
  ),
  children: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2" />
    </>
  ),
  care: (
    <>
      <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z" />
    </>
  ),
  library: (
    <>
      <path d="M4 4h5v16H4zM10 4h4v16h-4zM16 5l4-1 3 15-4 1z" />
    </>
  ),
  forum: (
    <>
      <path d="M21 11a8 8 0 0 1-8 8H6l-4 3 1-6a9 9 0 1 1 18-5Z" />
      <path d="M7 10h10M7 14h6" />
    </>
  ),
  assistant: (
    <>
      <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22v-3a8 8 0 0 1 16 0v3" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  logout: (
    <>
      <path d="M9 4H4v16h5M9 12h12m-5-5 5 5-5 5" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="4" r="2" />
      <path d="M4 9h16M12 8v7m0 0-5 7m5-7 5 7" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7v.1" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 5 7 7-7 7" />,
};
export default function Icon({
  name,
  size = 20,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
