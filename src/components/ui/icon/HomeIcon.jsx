export default function HomeIcon({ handleHomeIcon, clickHome }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="m-auto"
      onClick={handleHomeIcon}
    >
      {clickHome ? (
        <path
          d="M3 21.3333H7.5V13.3333H16.5V21.3333H21V9.33333L12 3.33333L3 9.33333V21.3333ZM0 24V8L12 0L24 8V24H13.5V16H10.5V24H0Z"
          fill="#FF5F00"
        />
      ) : (
        <path
          d="M3 21.3333H7.5V13.3333H16.5V21.3333H21V9.33333L12 3.33333L3 9.33333V21.3333ZM0 24V8L12 0L24 8V24H13.5V16H10.5V24H0Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}
