'use client'; // Client-side rendering
import Link from 'next/link';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';

import { navbar } from '@/app/components/customer/common/config';

const NavBar: React.FC<{ path?: string }> = ({ path }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [isMouseNearTop, setIsMouseNearTop] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > lastScrollPosition) setShowNav(false);
    else if (scrollPosition < lastScrollPosition) setShowNav(true);
    setLastScrollPosition(scrollPosition);
  }, [scrollPosition, lastScrollPosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsMouseNearTop(e.clientY < 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isMouseNearTop && scrollPosition > 50 && !showNav) setShowNav(true);
    if (!isMouseNearTop && scrollPosition > 50 && showNav) setShowNav(false);
  }, [isMouseNearTop, scrollPosition, showNav]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  if (!mounted) return null;

  return (
    <div>
      {!isMenuOpen ? (
        <nav
          className={`fixed top-0 left-0 flex justify-between items-center w-full px-6 py-4 
            backdrop-blur-xl border border-white/20 rounded-b-lg shadow-lg
            transition-all duration-700 ease-in-out z-40
            ${scrollPosition > 50
              ? showNav
                ? 'translate-y-0 opacity-100'
                : '-translate-y-full opacity-0'
              : 'translate-y-0 opacity-100'
            }
            ${theme === 'dark'
              ? 'bg-[#0f0f0f]/60 text-white'
              : 'bg-white/40 text-black'
            }`}
        >
          {/* Left side */}
          <div className='flex items-center space-x-6'>
            {/* Mobile Menu Icon */}
            <div className='sm:hidden'>
              <button
                onClick={() => setMenuOpen(true)}
                className='text-gray-700 dark:text-gray-200 hover:scale-110 transition-transform'
              >
                <FaBars size={22} />
              </button>
            </div>

            {/* Logo */}
            <div className='text-2xl font-extrabold tracking-wide cursor-pointer hover:scale-105 transition-transform'>
              <Link href='/'>SK</Link>
            </div>
          </div>

          {/* Right side */}
          <div className='flex items-center space-x-6'>
            {/* Desktop Links */}
            <div className='hidden sm:flex gap-3'>
              {navbar
                .filter((item) => (path ? item.link !== path : item))
                .map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className={`px-3 py-2 rounded-xl font-medium transition-all duration-300
                      border border-transparent
                      ${theme === 'dark'
                        ? 'hover:bg-white/10 hover:border-white/20'
                        : 'hover:bg-black/10 hover:border-black/20'
                      }`}
                  >
                    <div className='flex items-center gap-2'>
                      {item.icon &&
                        React.createElement(item.icon, {
                          size: 18,
                        })}
                      {item.text}
                    </div>
                  </Link>
                ))}
            </div>

            <Link
              href='#'
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`p-2 rounded-full shadow-md transition-all duration-300 hover:rotate-180
                ${theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-yellow-400'
                  : 'bg-black/10 hover:bg-black/20 text-blue-600'
                }`}
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </Link>
          </div>
        </nav>
      ) : (
        // Mobile Menu Overlay
        <div
          className='fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-end transition-all duration-500'
          onClick={() => setMenuOpen(false)}
        >
          <div
            className='w-[70%] sm:w-[40%] h-full dark:bg-[#1a1a1a] bg-white shadow-2xl p-6 flex flex-col justify-between'
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className='flex justify-between items-center mb-8'>
                <h2 className='text-lg font-semibold'>Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className='hover:rotate-90 transition-transform'
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className='flex flex-col space-y-3'>
                {navbar.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-all duration-300 ${path === item.link
                      ? 'bg-gray-300 dark:bg-gray-800'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Theme toggle at bottom */}
            <div className='pt-6 border-t dark:border-gray-700 border-gray-300 flex items-center justify-between'>
              <span className='font-medium'>Theme</span>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className={`p-2 rounded-full transition ${theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-yellow-400'
                  : 'bg-black/10 hover:bg-black/20 text-blue-600'
                  }`}
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
