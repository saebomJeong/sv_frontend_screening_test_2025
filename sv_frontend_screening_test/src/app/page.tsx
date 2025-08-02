import Link from 'next/link';

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <h1>🔥 SV Frontend screening test 🔥</h1>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <Link href="/bouncing-ball">GO 1</Link>
        <Link href="/road-observer">GO 2</Link>
      </div>
    </main>
  );
}
