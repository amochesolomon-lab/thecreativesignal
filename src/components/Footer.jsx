
export default function Footer() {
  return (
    <footer className="container" style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
      <p className="label-caps" style={{ fontSize: '0.65rem' }}>
        &copy; {new Date().getFullYear()} THE CREATIVE SIGNAL by Sol'o Mon. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
}