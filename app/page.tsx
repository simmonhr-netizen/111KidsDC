import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', paddingBottom: 100, background: '#5b7fd4' }}>

      <div style={{ background: '#5b7fd4', padding: '32px 20px 28px', textAlign: 'center', position: 'relative', borderBottom: '3px dashed rgba(255,255,255,0.4)' }}>

        <div style={{ display: 'inline-block', background: 'white', borderRadius: 6, padding: '4px 16px', marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5b7fd4', margin: 0 }}>Austin K. Graff</p>
        </div>

        <span style={{ position: 'absolute', top: 24, left: 10, fontSize: 42, transform: 'rotate(-12deg)', lineHeight: 1, filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.2))' }}>🌸</span>
        <span style={{ position: 'absolute', top: 28, right: 8, fontSize: 38, transform: 'rotate(10deg)', lineHeight: 1, filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.2))' }}>🌭</span>
        <span style={{ position: 'absolute', top: 110, left: 6, fontSize: 36, transform: 'rotate(-6deg)', lineHeight: 1, filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.2))' }}>🐼</span>
        <span style={{ position: 'absolute', top: 100, right: 6, fontSize: 32, transform: 'rotate(15deg)', lineHeight: 1, filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.2))' }}>🪁</span>
        <span style={{ position: 'absolute', top: 190, left: 10, fontSize: 28, transform: 'rotate(8deg)', lineHeight: 1 }}>🚀</span>
        <span style={{ position: 'absolute', top: 195, right: 12, fontSize: 26, transform: 'rotate(-14deg)', lineHeight: 1 }}>📸</span>

        <div style={{ position: 'relative', zIndex: 1, marginTop: 8 }}>
          <div style={{ fontSize: '4rem', fontWeight: 900, color: 'white', lineHeight: 0.9, letterSpacing: '-1px', textTransform: 'uppercase', textShadow: '2px 2px 0px rgba(0,0,0,0.15)' }}>111</div>
          <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.5px', textTransform: 'uppercase', textShadow: '2px 2px 0px rgba(0,0,0,0.15)', marginTop: 4 }}>Places for</div>
          <div style={{ fontSize: '2.6rem', fontWeight: 900, color: '#f472b6', lineHeight: 1, letterSpacing: '-0.5px', textTransform: 'uppercase', textShadow: '2px 2px 0px rgba(0,0,0,0.15)', marginTop: 2 }}>Kids in<br />Washington</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', lineHeight: 1.05, letterSpacing: '-0.5px', textTransform: 'uppercase', textShadow: '2px 2px 0px rgba(0,0,0,0.15)', marginTop: 4 }}>That You<br />Must Not Miss</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20, position: 'relative', zIndex: 1 }}>
          {['🏛️','🦁','🌿','🎨','⭐'].map(e => (
            <span key={e} style={{ fontSize: 26, filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))' }}>{e}</span>
          ))}
        </div>

        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 12, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
          Photographs by Cynthia Schiavetto Stalunas
        </p>

        <div style={{ position: 'absolute', inset: 8, border: '2px dashed rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
      </div>

      <div style={{ padding: '24px 16px 0', maxWidth: 400, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link href="/map">
            <div style={{ background: 'white', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', borderLeft: '6px solid #10b981' }}>
              <span style={{ fontSize: 32 }}>🗺️</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 900, fontSize: 16, color: '#1a1a1a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Find something nearby</p>
                <p style={{ fontSize: 12, color: '#78716c', margin: '2px 0 0' }}>See all 111 places on the map</p>
              </div>
              <span style={{ fontWeight: 900, color: '#10b981', fontSize: 20 }}>→</span>
            </div>
          </Link>

          <Link href="/adventure">
            <div style={{ background: 'white', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', borderLeft: '6px solid #f472b6' }}>
              <span style={{ fontSize: 32 }}>🧭</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 900, fontSize: 16, color: '#1a1a1a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Build an adventure</p>
                <p style={{ fontSize: 12, color: '#78716c', margin: '2px 0 0' }}>Get a custom itinerary for today</p>
              </div>
              <span style={{ fontWeight: 900, color: '#f472b6', fontSize: 20 }}>→</span>
            </div>
          </Link>

          <Link href="/challenge">
            <div style={{ background: 'white', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', borderLeft: '6px solid #f59e0b' }}>
              <span style={{ fontSize: 32 }}>⭐</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 900, fontSize: 16, color: '#1a1a1a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>The 111 Challenge</p>
                <p style={{ fontSize: 12, color: '#78716c', margin: '2px 0 0' }}>Track your family&apos;s progress</p>
              </div>
              <span style={{ fontWeight: 900, color: '#f59e0b', fontSize: 20 }}>→</span>
            </div>
          </Link>
        </div>

        <div style={{ marginTop: 24 }}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.85)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            What&apos;s the vibe today?
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {[
              { label: 'Burn energy', emoji: '⚡', href: '/adventure?mood=burn-energy' },
              { label: 'Rainy day', emoji: '☂️', href: '/adventure?mood=rainy-day' },
              { label: 'Tiny explorers', emoji: '🔍', href: '/map?filter=toddlers' },
              { label: 'Free', emoji: '💚', href: '/map?filter=free' },
              { label: 'Impress family', emoji: '🏛️', href: '/adventure?mood=impress' },
            ].map((chip) => (
              <Link key={chip.label} href={chip.href}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 999, padding: '6px 12px', fontSize: 12, color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                  {chip.emoji} {chip.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 28 }}>
          <em>111 Places for Kids in Washington That You Must Not Miss</em><br />by Austin K. Graff · emons: Verlag
        </p>
      </div>
    </main>
  );
}
