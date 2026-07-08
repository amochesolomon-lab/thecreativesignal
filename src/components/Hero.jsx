import { Link } from 'react-router-dom';

export default function Hero({ latestSlug }) {
  return (
    <header className="container" style={{ padding: '12rem 2rem 6rem 2rem' }}>
      <div style={{ maxWidth: '850px' }}>
        <p className="label-caps" style={{ marginBottom: '1.5rem' }}>Editorial Journal</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '2.5rem', fontWeight: 800 }}>
          My 2 Cents on design,<br />
          technology,<br />
          intentional creativity and many more.
        </h1>
        {latestSlug && (
          <Link 
            to={`/issue/${latestSlug}`} 
            style={{ 
              fontSize: '0.9rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em', 
              fontWeight: '600',
              borderBottom: '1px solid currentColor',
              paddingBottom: '4px'
            }}
          >
            Read the latest issue &rarr;
          </Link>
        )}
      </div>
    </header>
  );
}