import { useFadeIn } from '../hooks/useFadeIn';

const entries = [
  { num: '01', name: 'Product Engineering — TripTalkiez / HUNT / Staffly', date: '2026 – Present', featured: true },
  { num: '02', name: 'AI Engineering Intern — Winniio / LifeAtlas, Sweden (Remote)', date: 'May – Jul 2026', featured: false },
  { num: '03', name: 'Lead Engineer — Stakrid Logistics', date: 'Jan 2025 – Jan 2026', featured: false },
  { num: '04', name: 'Symbiote-X — India AI Impact Summit', date: '2026', featured: false },
  { num: '05', name: 'Two Research Papers — Zenodo', date: 'Aug 2026', featured: false },
];

export default function Journey() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="journey" ref={ref}>
      <div className="sec-row">
        <h2 className="sec-label">Journey</h2>
        <a href="https://linkedin.com/in/shubhamgupta04907" target="_blank" rel="noreferrer" className="sec-link">View All →</a>
      </div>
      <ul className="journey-list">
        {entries.map((e) => (
          <li key={e.num}>
            <div className={`j-row${e.featured ? ' featured' : ''}`}>
              <span className="j-num">{e.num}</span>
              <span className="j-name">{e.name}</span>
              <span className="j-date">{e.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
