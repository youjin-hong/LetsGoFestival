export default function MoveTopIcon({ scrollTop }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className="absolute bottom-16 right-0 cursor-pointer"
      onClick={scrollTop}
    >
      <circle cx="20" cy="20" r="20" fill="#FF8343" />
      <path
        d="M12.35 26.35L20 18.7166L27.65 26.35L30 24L20 14L10 24L12.35 26.35Z"
        fill="white"
      />
      <circle cx="20" cy="20" r="20" fill="#FF8343" />
      <path
        d="M12.35 26.35L20 18.7166L27.65 26.35L30 24L20 14L10 24L12.35 26.35Z"
        fill="white"
      />
    </svg>
  );
}
