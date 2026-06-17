import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen pb-28" style={{ background: '#fdf6e9' }}>

      <div style={{ background: '#fdf6e9', padding: '40px 24px 24px', textAlign: 'center', position: 'relative' }}>
        <span style={{ position: 'absolute', top: 18, left: 12, fontSize: 44, transform: 'rotate(-18deg)', lineHeight: 1 }}>🪁</span>
        <span style={{ position: 'absolute', top: 12, right: 14, fontSize: 40, transform: 'rotate(14deg)', lineHeight: 1 }}>🐼</span>
        <span style={{ position: 'absolute', top: 90, left: 20, fontSize: 30, transform: 'rotate(8deg)', lineHeight: 1 }}>🌸</span>
        <span style={{ position: 'absolute', top: 80, right: 18, fontSize: 28, transform: 'rotate(-12deg)', lineHeight: 1 }}>🚀</span>
        <span style={{ position: 'absolute', top: 150, left: 8, fontSize: 24, transform: 'rotate(20deg)', lineHeight: 1 }}>🌮</span>
        <span style={{ position: 'absolute', top: 160, right: 10, fontSize: 26, transform: 'rotate(-8deg)', lineHeight: 1 }}>🎨</span>

        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8426a', marginBottom: 8, position: 'relative', zIndex: 1 }}>
          Austin K. Graff
        </p>

        <div style={{ position: 'relative', zIndex: 1, lineHeight: 1 }}>
          <div style={{ fontSize: '4.2rem', fontWeight: 900, fontFamily: 'Georgia, serif', color: '#1a1a1a', lineHeight: 0.95, letterSpacing: '-1px' }}>111</div>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'Georgia, serif', color: '#1a1a1a', lineHeight: 1, marginTop: 2 }}>Places</div>
          <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#e8426a', lineHeight: 1.1, marginTop: 6, fontStyle: 'italic' }}>for Kids in<br />Washington</div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.2, marginTop: 8, fontFamily: 'Georgia, serif' }}>That You Must<br />Not Miss</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 18, position: 'relative', zIndex: 1 }}>
          {['🦁','🍕','🚀','🌿','🎨','🦅','⭐'].map(e => (
            <span key={e} style={{ fontSize: 22 }}>{e}</span>
          ))}
        </div>

        <p style={{ fontSize: 11, color: '#a0856a', marginTop: 10, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
          Photographs by Cynthia Schiavetto Stalunas
        </p>
      </div>

      <div style={{ height: 4, background: 'linear-gradient(90deg, #e8426a, #f59e0b, #10b981)', margin: '0 0 20px' }} />

      <div style={{ padding: '0 16px', maxWidth: 400, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link href="/map">
            <div style={{ background: 'white', borderRadius: 18, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, border: '3px solid #10b981', boxShadow: '4px 4px 0px #10b981', cursor: 'pointer' }}>
              <span style={{ fontSize: 36 }}>🗺️</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 900, fontSize: 17, color: '#1a1a1a', margin: 0 }}>Find something nearby</p>
                <p style={{ fontSize: 13, color: '#78716c', margin: '2px 0 0' }}>See all 111 places on the map</p>
              </div>
              <span style={{ fontWeight: 900, color: '#10b981', fontSize: 20 }}>→</span>
            </div>
          </Link>

          <Link href="/adventure">
            <div style={{ background: 'white', borderRadius: 18, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, border: '3px solid #e8426a', boxShadow: '4px 4px 0px #e8426a', cursor: 'pointer' }}>
              <span style={{ fontSize: 36 }}>🧭</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 900, fontSize: 17, color: '#1a1a1a', margin: 0 }}>Build an adventure</p>
                <p style={{ fontSize: 13, color: '#78716c', margin: '2px 0 0' }}>Get a custom itinerary for today</p>
              </div>
              <span style={{ fontWeight: 900, color: '#e8426a', fontSize: 20 }}>→</span>
            </div>
          </Link>

          <Link href="/challenge">
            <div style={{ background: 'white', borderRadius: 18, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, border: '3px solid #f59e0b', boxShadow: '4px 4px 0px #f59e0b', cursor: 'pointer' }}>
              <span style={{ fontSize: 36 }}>⭐</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 900, fontSize: 17, color: '#1a1a1a', margin: 0 }}>The 111 Challenge</p>
                <p style={{ fontSize: 13, color: '#78716c', margin: '2px 0 0' }}>Track your family&apos;s progress</p>
              </div>
              <span style={{ fontWeight: 900, color: '#f59e0b', fontSize: 20 }}>→</span>
            </div>
          </Link>
        </div>

        <div style={{ marginTop: 28 }}>
          <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#78716c', marginBottom: 12 }}>
            What kind of adventure are we having today?
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {[
              { label: 'Burn energy', emoji: '⚡', href: '/adventure?mood=burn-energy' },
              { label: 'Rainy day rescue', emoji: '☂️', href: '/adventure?mood=rainy-day' },
              { label: 'Tiny explorers', emoji: '🔍', href: '/map?filter=toddlers' },
              { label: 'Completely free', emoji: '💚', href: '/map?filter=free' },
              { label: 'Impress the grandparents', emoji: '🏛️', href: '/adventure?mood=impress' },
            ].map((chip) => (
              <Link key={chip.label} href={chip.href}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'white', border: '2px solid #e7e5e4', borderRadius: 999, padding: '7px 14px', fontSize: 13, color: '#57534e', fontWeight: 700, cursor: 'pointer' }}>
                  {chip.emoji} {chip.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: '#b5a090', marginTop: 32 }}>
          Tiny explorers welcome. 🌿<br />
          <em>111 Places for Kids in Washington That You Must Not Miss</em> by Austin K. Graff.
        </p>
      </div>
    </main>
  );
}
