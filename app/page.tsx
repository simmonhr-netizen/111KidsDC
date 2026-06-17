import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen pb-28" style={{ background: '#fdf8f0' }}>
      {/* Hero */}
      <div className="relative px-6 pt-12 pb-8 text-center overflow-hidden">
        {/* Decorative sticker elements */}
        <div className="absolute top-6 left-4 text-4xl rotate-[-15deg] select-none">🪁</div>
        <div className="absolute top-8 right-4 text-4xl rotate-[12deg] select-none">🐼</div>
        <div className="absolute top-24 left-8 text-2xl rotate-[8deg] select-none">🌸</div>
        <div className="absolute top-20 right-6 text-2xl rotate-[-10deg] select-none">🌟</div>

        <div className="relative z-10">
          <p className="text-xs font-bold tracking-widest uppercase text-rose-400 mb-2">Austin K. Graff</p>
          <h1 className="font-extrabold leading-none text-stone-900" style={{ fontSize: '2.6rem', fontFamily: 'Georgia, serif' }}>
            111 Places
          </h1>
          <h2 className="font-extrabold leading-tight mt-1" style={{ fontSize: '1.6rem', color: '#e8426a' }}>
            for Kids in<br />Washington
          </h2>
          <h3 className="font-extrabold text-stone-900 leading-tight mt-1" style={{ fontSize: '1.1rem', fontFamily: 'Georgia, serif' }}>
            That You Must Not Miss
          </h3>
          <div className="flex justify-center gap-1 mt-3">
            {['🦁','🍕','🚀','🎨','🌿'].map(e => (
              <span key={e} className="text-xl">{e}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 border-t-2 border-dashed border-stone-200 mb-6" />

      {/* Main CTAs */}
      <div className="px-4 space-y-3 max-w-sm mx-auto">
        <Link href="/map">
          <div className="rounded-2xl p-5 flex items-center gap-4 shadow-sm border-2 cursor-pointer hover:shadow-md transition-shadow" style={{ background: '#fff', borderColor: '#10b981' }}>
            <div className="text-4xl">🗺️</div>
            <div>
              <h2 className="font-extrabold text-stone-800 text-lg">Find something nearby</h2>
              <p className="text-stone-500 text-sm mt-0.5">See all 111 places on the map</p>
            </div>
            <div className="ml-auto font-bold text-emerald-500 text-xl">→</div>
          </div>
        </Link>

        <Link href="/adventure">
          <div className="rounded-2xl p-5 flex items-center gap-4 shadow-sm border-2 cursor-pointer hover:shadow-md transition-shadow" style={{ background: '#fff', borderColor: '#e8426a' }}>
            <div className="text-4xl">🧭</div>
            <div>
              <h2 className="font-extrabold text-stone-800 text-lg">Build an adventure</h2>
              <p className="text-stone-500 text-sm mt-0.5">Get a custom itinerary for today</p>
            </div>
            <div className="ml-auto font-bold text-rose-400 text-xl">→</div>
          </div>
        </Link>

        <Link href="/challenge">
          <div className="rounded-2xl p-5 flex items-center gap-4 shadow-sm border-2 cursor-pointer hover:shadow-md transition-shadow" style={{ background: '#fff', borderColor: '#f59e0b' }}>
            <div className="text-4xl">⭐</div>
            <div>
              <h2 className="font-extrabold text-stone-800 text-lg">The 111 Challenge</h2>
              <p className="text-stone-500 text-sm mt-0.5">Track your family's progress</p>
            </div>
            <div className="ml-auto font-bold text-amber-400 text-xl">→</div>
          </div>
        </Link>
      </div>

      {/* Mood chips */}
      <div className="mt-8 px-4 max-w-sm mx-auto">
        <p className="text-center text-stone-500 text-sm font-semibold mb-3">What kind of adventure are we having today?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { label: 'Burn energy', emoji: '⚡', href: '/adventure?mood=burn-energy' },
            { label: 'Rainy day rescue', emoji: '☂️', href: '/adventure?mood=rainy-day' },
            { label: 'Tiny explorers', emoji: '🔍', href: '/map?filter=toddlers' },
            { label: 'Completely free', emoji: '💚', href: '/map?filter=free' },
            { label: 'Impress the grandparents', emoji: '🏛️', href: '/adventure?mood=impress' },
          ].map((chip) => (
            <Link key={chip.label} href={chip.href}>
              <span className="inline-flex items-center gap-1.5 bg-white border-2 border-stone-200 rounded-full px-3 py-1.5 text-sm text-stone-600 font-semibold hover:border-rose-300 transition-colors cursor-pointer">
                <span>{chip.emoji}</span>{chip.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-stone-400 mt-10 px-6">
        Tiny explorers welcome. 🌿<br/>
        Based on <em>111 Places for Kids in Washington That You Must Not Miss</em> by Austin K. Graff.
      </p>
    </main>
  );
}
