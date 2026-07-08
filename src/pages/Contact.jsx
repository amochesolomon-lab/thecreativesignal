export default function Contact() {
  return (
    <div className="container" style={{ paddingTop: '8rem' }}>
      
      {/* Identity Overview */}
      <section style={{ marginBottom: '5rem' }}>
        <span className="label-caps" style={{ fontSize: '0.7rem', display: 'block', marginBottom: '1rem', opacity: 0.5 }}>
          Communication Node
        </span>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: '0 0 1.5rem 0', letterSpacing: '-0.02em', color: '#ffffff' }}>
          Contact & Intel
        </h1>
        <p style={{ maxWidth: '32rem', lineHeight: '1.7', color: '#ffffff', opacity: 0.8 }}>
          Establish a direct link for web engineering development, technical layout reviews, or branding workflows.
        </p>
      </section>

      {/* Network Links Array */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem', marginBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
          
          <div>
            <h3 className="label-caps" style={{ fontSize: '0.65rem', marginBottom: '1rem', opacity: 0.5 }}>Identity</h3>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>Sol'o Mon</p>
            <p style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: '0.5rem', color: '#ffffff' }}>Graphic Designer & Developer</p>
          </div>

          <div>
            <h3 className="label-caps" style={{ fontSize: '0.65rem', marginBottom: '1rem', opacity: 0.5 }}>Studio Domain</h3>
            <a href="https://thehalocreative.vercel.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.15rem', color: '#ffffff', textDecoration: 'underline', fontWeight: 600 }}>
              thehalocreative.com
            </a>
          </div>

          <div>
            <h3 className="label-caps" style={{ fontSize: '0.65rem', marginBottom: '1rem', opacity: 0.5 }}>Channels</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <span style={{ opacity: 0.5, color: '#ffffff' }}>Email: </span>
                <a href="mailto:theseraphicd3signer@gmail.com" style={{ color: '#ffffff', textDecoration: 'underline' }}>hello@thehalocreative.com</a>
              </li>
              <li>
                <span style={{ opacity: 0.5, color: '#ffffff' }}>Source: </span>
                <a href="https://github.com/amochesolomon-lab" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline' }}>github.com/thehalocreative</a>
              </li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
}