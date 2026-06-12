import { useEffect } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

const LI_POSTS = [
  'https://www.linkedin.com/embed/feed/update/urn:li:share:7470061885741232128?collapsed=1',
  'https://www.linkedin.com/embed/feed/update/urn:li:share:7468557476829769728?collapsed=1',
  'https://www.linkedin.com/embed/feed/update/urn:li:activity:7435354971174486016?collapsed=1',
];

const X_IDS = [
  '2049178684712452483',
  '2051575512859083108',
  '2064070781110464992',
];

export default function Thoughts() {
  const ref = useFadeIn<HTMLElement>();

  useEffect(() => {
    const w = window as any;
    if (w.twttr?.widgets) {
      w.twttr.widgets.load();
    } else {
      const s = document.createElement('script');
      s.src = 'https://platform.x.com/widgets.js';
      s.async = true;
      s.charset = 'utf-8';
      document.body.appendChild(s);
    }
  }, []);

  return (
    <section className="section fade-in" ref={ref}>
      <div className="sec-row">
        <span className="sec-label">Thoughts</span>
        <div className="sec-links-group">
          <a href="https://linkedin.com/in/shubhamgupta04907" target="_blank" rel="noreferrer" className="sec-link">LinkedIn →</a>
          <a href="https://x.com/skg_curious" target="_blank" rel="noreferrer" className="sec-link">X →</a>
        </div>
      </div>

      <div className="social-grid">
        <div className="social-col">
          <span className="social-col-label">LinkedIn</span>
          {LI_POSTS.map((src) => (
            <iframe
              key={src}
              src={src}
              className="li-embed"
              frameBorder="0"
              allowFullScreen
              title="LinkedIn post"
            />
          ))}
        </div>

        <div className="social-col">
          <span className="social-col-label">X / Twitter</span>
          {X_IDS.map((id) => (
            <blockquote key={id} className="twitter-tweet" data-theme="dark" data-dnt="true">
              <a href={`https://x.com/skg_curious/status/${id}`} />
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
