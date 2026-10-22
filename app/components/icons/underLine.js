export function MoonUnderLine() {
  return (
    <svg
      className="absolute -bottom-1 left-0 w-full h-2 text-amber-500"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 100 12">
      <path
        d="M0,8 Q50,0 100,8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={4}
      />
    </svg>
  );
}
