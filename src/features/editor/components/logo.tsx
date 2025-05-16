import Link from 'next/link'
import { useState, useEffect } from 'react'

export const Logo = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href="/">
      <div
        className="relative shrink-0 cursor-pointer text-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`font-sans text-3xl font-bold tracking-tight transition-all duration-300 ${
            isHovered ? 'scale-105 text-indigo-600' : 'text-gray-800'
          }`}
        >
          <span className="text-indigo-500">S</span>
          <span
            className={`transition-all duration-300 ${isHovered ? 'text-pink-500' : 'text-indigo-400'}`}
          >
            o
          </span>
          <span
            className={`transition-all duration-300 ${isHovered ? 'text-purple-500' : 'text-indigo-500'}`}
          >
            n
          </span>
          <span
            className={`transition-all duration-300 ${isHovered ? 'text-blue-500' : 'text-indigo-600'}`}
          >
            d
          </span>
          <span
            className={`transition-all duration-300 ${isHovered ? 'text-cyan-500' : 'text-indigo-500'}`}
          >
            r
          </span>
          <span
            className={`transition-all duration-300 ${isHovered ? 'text-teal-500' : 'text-indigo-400'}`}
          >
            a
          </span>
          <span
            className={`transition-all duration-300 ${isHovered ? 'text-green-500' : 'text-indigo-500'}`}
          >
            w
          </span>
        </div>
        {/* {isHovered && (
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
        )} */}
      </div>
    </Link>
  )
}
