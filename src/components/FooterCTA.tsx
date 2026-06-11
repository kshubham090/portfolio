import { useFadeIn } from '../hooks/useFadeIn';

export default function FooterCTA() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="footer-cta fade-in" id="contact" ref={ref}>
      <h2 className="footer-cta-title">LET'S BUILD<br />SOMETHING<br />REAL</h2>
      <a href="mailto:kshubham04907@gmail.com" className="sq-btn">Contact Now →</a>
    </section>
  );
}
