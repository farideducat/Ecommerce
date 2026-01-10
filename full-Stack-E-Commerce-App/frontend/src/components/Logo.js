import React from 'react'

const Logo = ({w,h}) => {
  return (
    <div>
        
   <svg width={w} height={h} viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 20) scale(0.9)">
    <path d="M36.3,1.3c-1.3-1.3-3.4-1.3-4.7,0L20.5,12.4c-0.6,0.6-0.9,1.4-1,2.2l-1.3,8.7l-8.7,1.3c-0.8,0.1-1.6,0.4-2.2,1L1.3,31.6 c-1.3,1.3-1.3,3.4,0,4.7l4,4c0.6,0.6,1.4,0.9,2.2,1l8.7,1.3l1.3,8.7c0.1,0.8,0.4,1.6,1,2.2l11.1,11.1c1.3,1.3,3.4,1.3,4.7,0l4-4 c0.6-0.6,0.9-1.4,1-2.2l1.3-8.7l8.7-1.3c0.8-0.1,1.6-0.4,2.2-1l11.1-11.1c1.3-1.3,1.3-3.4,0-4.7L36.3,1.3z" fill="#E11D48"/>
    <circle cx="35" cy="25" r="5" fill="white"/>
    <path d="M5,55 L15,45 M5,45 L15,55" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
  </g>

  <text x="75" y="45" font-family="Arial, sans-serif" font-weight="800" font-size="28" fill="#1F2937">
    Farid <tspan fill="#E11D48">Express</tspan>
  </text>

  <text x="75" y="68" font-family="Arial, sans-serif" font-weight="400" font-size="14" fill="#6B7280">
    Elevate Your Shopping.
  </text>
</svg>

    </div>
  )
}

export default Logo