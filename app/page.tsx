import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-4 pt-10 pb-28">
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">🦁</div>
        <h1 className="text-3xl font-extrabold text-stone-800 leading-tight">
          111 Kids DC
        </h1>
        <p className="text-stone-500 mt-2 text-base leading-relaxed max-w-xs mx-auto">
          Your family&apos;s guide to the best adventures in Washington, DC
        </p>
        <p className="text-xs text-stone-400 mt-1">Based on the book by Austin Graff</p>
      </div>

      <div className="max-w-sm mx-auto space-y-4">
        <Link href="/map">
          <div className="bg-white rounded-2xl shadow-md border border-emerald-100 p-5 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl">🗺️</div>
            <div>
              <h2 className="font-bold text-stone-800 text-lg">Find something nearby</h2>
              <p className="text-stone-500 text-sm mt-0.5">See all 111 places on the map</p>
            </div>
            <div className="ml-auto text-stone-300 text-xl">→</div>
          </div>
        </Link>

        <Link href="/adventure">
          <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-5 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl">🧭</div>
            <div>
              <h2 className="font-bold text-stone-800 text-lg">Build an adventure</h2>
              <p className="text-stone-500 text-sm mt-0.5">Get a custom itinerary for today</p>
            </div>
            <div className="ml-auto text-stone-300 text-xl">→</div>
          </div>
        </Link>

        <Link href="/challenge">
          <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-5 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl">⭐</div>
            <div>
              <h2 className="font-bold text-stone-800 text-lg">View the 111 Challenge</h2>
              <p className="text-stone-500 text-sm mt-0.5">Track your family&apos;s progress</p>
            </div>
            <div className="ml-auto text-stone-300 text-xl">→</div>
          </div>
        </Link>
      </div>

      <div className="mt-10 max-w-sm mx-auto">
        <p className="text-center text-stone-500 text-sm font-medium mb-4">What kind of adventure are we having today?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { label: 'Burn energy', emoji: '⚡', href: '/adventure?mood=burn-energy' },
            { label: 'Rainy day rescue', emoji: '☂️', href: '/adventure?mood=rainy-day' },
            { label: 'Tiny explorers', emoji: '🔍', href: '/map?filter=toddlers' },
            { label: 'Big kids', emoji: '🧗', href: '/map?filter=big-kids' },
            { label: 'Completely free', emoji: '💚', href: '/map?filter=free' },
            { label: 'Impress the grandparents', emoji: '🏛️', href: '/adventure?mood=impress' },
          ].map((chip) => (
            <Link key={chip.label} href={chip.href}>
              <span className="inline-flex items-center gap-1.5 bg-white border border-stone-200 rounded-full px-3 py-1.5 text-sm text-stone-600 font-medium hover:border-emerald-300 hover:text-emerald-700 transition-colors cursor-pointer">
                <span>{chip.emoji}</span>
                {chip.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-stone-400 mt-12 max-w-xs mx-auto">
        Tiny explorers welcome. 🌿<br />
        Places sourced from <em>111 Places in Washington DC That You Must Not Miss for Kids</em> by Austin Graff.
      </p>
    </main>
  );
}
