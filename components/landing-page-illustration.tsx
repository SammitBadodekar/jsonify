"use client";
import { useState, useEffect } from "react";

export default function LandingPageIllustration() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 rounded-xl z-10">
      <svg viewBox="0 0 800 500" className="w-full h-auto">
        {/* Input Window */}
        <g transform="translate(50, 20)">
          <rect
            x="0"
            y="0"
            width="300"
            height="280"
            rx="10"
            fill="#ffffff"
            stroke="#27ae61"
            strokeWidth="2"
          />
          <text
            x="150"
            y="30"
            textAnchor="middle"
            fill="#27ae61"
            fontSize="18"
            fontWeight="bold"
          >
            Input Data
          </text>
          <foreignObject x="20" y="50" width="260" height="230">
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              className="font-mono text-sm overflow-hidden"
            >
              &lt;html&gt;
              <br />
              &nbsp;&nbsp;&lt;body&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Welcome&lt;/h1&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;This is some messy data&lt;/p&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;ul&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;Item 1&lt;/li&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;Item 2&lt;/li&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/ul&gt;
              <br />
              &nbsp;&nbsp;&lt;/body&gt;
              <br />
              &lt;/html&gt;
            </div>
          </foreignObject>
        </g>

        {/* Output Window */}
        <g transform="translate(450, 150)">
          <rect
            x="0"
            y="0"
            width="300"
            height="300"
            rx="10"
            fill="#ffffff"
            stroke="#27ae61"
            strokeWidth="2"
          />
          <text
            x="150"
            y="30"
            textAnchor="middle"
            fill="#27ae61"
            fontSize="18"
            fontWeight="bold"
          >
            Structured JSON
          </text>
          <foreignObject x="20" y="50" width="260" height="230">
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              className="font-mono text-sm overflow-hidden whitespace-pre"
            >
              {`{
"heading": "Welcome",
"description": "This is some messy data",
"items": [
    "Item 1",
    "Item 2"
    ]
  }
}
`}
            </div>
          </foreignObject>
        </g>

        {/* Dotted Arrow */}
        <path
          d="M 360 170 C 400 170, 400 300, 440 300"
          fill="none"
          stroke="#27ae61"
          strokeWidth="3"
          strokeDasharray="10,5"
          strokeDashoffset={-progress}
        />
        <polygon points="440,300 430,295 430,305" fill="#27ae61" />

        {/* Moving Dots */}
        <circle
          cx={360 + progress * 0.8}
          cy={170 + progress * 1.3}
          r="5"
          fill="#27ae61"
        >
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Decorative Elements */}
        <circle cx="50" cy="480" r="20" fill="#27ae61" opacity="0.5" />
        <rect
          x="730"
          y="20"
          width="40"
          height="40"
          fill="#27ae61"
          opacity="0.5"
          transform="rotate(45 750 40)"
        />
        <path d="M720 460 L740 440 L760 460 Z" fill="#27ae61" opacity="0.5" />
      </svg>
    </div>
  );
}
