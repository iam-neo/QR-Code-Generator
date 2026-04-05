'use client';

/**
 * ThemeToggle Component
 * Animated dark/light mode toggle.
 */
export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      id="theme-toggle"
      onClick={onToggle}
      className="relative p-2.5 rounded-xl bg-white/5 border border-white/10
                 hover:bg-white/10 hover:border-white/20
                 transition-all duration-300 group"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon */}
      <svg
        className={`w-5 h-5 transition-all duration-500 absolute inset-0 m-auto
          ${theme === 'dark'
            ? 'opacity-0 rotate-90 scale-0'
            : 'opacity-100 rotate-0 scale-100 text-amber-400'
          }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>

      {/* Moon icon */}
      <svg
        className={`w-5 h-5 transition-all duration-500
          ${theme === 'dark'
            ? 'opacity-100 rotate-0 scale-100 text-violet-300'
            : 'opacity-0 -rotate-90 scale-0'
          }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  );
}
