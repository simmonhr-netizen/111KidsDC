import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', paddingBottom: 100, background: '#5b7fd4' }}>

      <div style={{ background: '#5b7fd4', padding: '20px 20px 16px', textAlign: 'center', position: 'relative' }}>

        <div style={{ display: 'inline-block', background: 'white', borderRadius: 6, padding: '3px 14px', marginBottom: 10 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5b7fd4', margin: 0 }}>Austin K. Graff</p>
        </div>

        <span style={{ position: 'absolute', top: 16, left: 6, fontSize: 36, transform: 'rotate(-12deg)', lineHeight: 1 }}>🌸</span>
        <span style={{ position: 'absolute', top: 16, right: 6, fontSize: 34, transform: 'rotate(10deg)', lineHeight: 1 }}>🌭</span>
        <span style={{ position: 'absolute', top: 80, left: 4, fontSize: 32, transform: 'rotate(-6deg)', lineHeight: 1 }}>🐼</span>
        <span style={{ position: 'absolute', top: 76, right: 4, fontSize: 30, transform: 'rotate(15deg)', lineHeight: 1 }}>🪁</span>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '3.2rem', fontWeight: 900, color: 'white', lineHeight: 0.9, textTransform: 'uppercase', textShadow: '2px 2px 0px rgba(0,0,0,0.15)' }}>111</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', lineHeight: 0.95, textTransform: 'uppercase', textShadow: '2px 2px 0px rgba(0,0,0,0.15)', marginTop: 2 }}>Places for</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f472b6', lineHeight: 0.95, textTransform: 'uppercase', textShadow: '2px 2px 0px rgba(0,0,0,0.15)', marginTop: 2 }}>Kids in Washington</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white', lineHeight: 1, textTransform: 'uppercase', textShadow: '2px 2px 0px rgba(0,0,0,0.15)', marginTop: 2 }}>That You Must Not Miss</div>
        </div>

        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 8, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
          Photographs by Cynthia Schiavetto Stalunas
        </p>

        <div style={{ position: 'absolute', inset: 6, border: '2px dashed rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
      </div>

      <div style={{ height: 3, background: 'linear-gradient(90deg, #f472b6, #f59e0b, #10b981)' }} />

      <div style={{ padding: '16px 16px 0', maxWidth: 400, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link href="/map">
            <div style={{ background: 'white', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', borderLeft: '6px solid #10b981' }}>
              <span style={{ fontSize: 36 }}>🗺️</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 900, fontSize: 15, color: '#1a1a1a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Find something nearby</p>
                <p style={{ fontSize: 12, color: '#78716c', margin: '2px 0 0' }}>See all 111 places on the map</p>
              </div>
              <span style={{ fontWeight: 900, color: '#10b981', fontSize: 20 }}>→</span>
            </div>
          </Link>

          <Link href="/adventure">
            <div style={{ background: 'white', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', borderLeft: '6px solid #f472b6' }}>
              <span style={{ fontSize: 36 }}>🧭</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 900, fontSize: 15, color: '#1a1a1a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Build an adventure</p>
                <p style={{ fontSize: 12, color: '#78716c', margin: '2px 0 0' }}>Get a custom itinerary for today</p>
              </div>
              <span style={{ fontWeight: 900, color: '#f472b6', fontSize: 20 }}>→</span>
            </div>
          </Link>

          <Link href="/challenge">
            <div style={{ background: 'white', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', borderLeft: '6px solid #f59e0b' }}>
              <span style={{ fontSize: 36 }}>⭐</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 900, fontSize: 15, color: '#1a1a1a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>The 111 Challenge</p>
                <p style={{ fontSize: 12, color: '#78716c', margin: '2px 0 0' }}>Track your family&apos;s progress</p>
              </div>
              <span style={{ fontWeight: 900, color: '#f59e0b', fontSize: 20 }}>→</span>
            </div>
          </Link>
        </div>

        <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 24 }}>
          <em>111 Places for Kids in Washington That You Must Not Miss</em><br />by Austin K. Graff · emons: Verlag
        </p>
      </div>
    </main>
  );
}
