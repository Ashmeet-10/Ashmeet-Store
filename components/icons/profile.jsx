export default function ProfileIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Profile"
      viewBox="0 0 32 32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      className={className}
    >
      <rect width="100%" height="100%" rx="16" className="fill-black dark:fill-white" />
      <path
        className="fill-white dark:fill-black"
        d="M16 16C19.3137 16 22 13.3137 22 10C22 6.68629 19.3137 4 16 4C12.6863 4 10 6.68629 10 10C10 13.3137 12.6863 16 16 16Z"
      />
      <path
        className="fill-white dark:fill-black"
        d="M16 18C12.6863 18 4 19.6863 4 23V26H28V23C28 19.6863 19.3137 18 16 18Z"
      />
    </svg>
  );
}

