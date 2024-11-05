export default function LandingPageBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-0 opacity-40 top-0"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0,0 L1000,0 L1000,1000 L0,1000 Z" fill="white" />
      <path
        d="M400,300 Q500,100 600,300 T800,400 T600,600 T400,500 T300,400 Z"
        fill="#e6f7e6"
      >
        {/* <animate
          attributeName="d"
          dur="20s"
          repeatCount="indefinite"
          values="
              M400,300 Q500,100 600,300 T800,400 T600,600 T400,500 T300,400 Z;
              M350,350 Q450,150 550,350 T750,450 T550,650 T350,550 T250,450 Z;
              M450,250 Q550,50 650,250 T850,350 T650,550 T450,450 T350,350 Z;
              M400,300 Q500,100 600,300 T800,400 T600,600 T400,500 T300,400 Z"
        /> */}
      </path>
    </svg>
  );
}
