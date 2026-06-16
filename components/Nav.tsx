'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', emoji: '🏠' },
  { href: '/map', label: 'Map', emoji: '🗺️' },
  { href: '/adventure', label: 'Adventure', emoji: '🧭' },
  { href: '/challenge', label: 'Challenge', emoji: '⭐' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-50 safe-area-pb">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all ${
                active ? 'text-emerald-600' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className={`text-xs font-medium ${active ? 'font-semibold' : ''}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
