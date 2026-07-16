import { useFadeIn } from '../hooks/useFadeIn';

export default function Testimonial() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="testimonial-section fade-in" ref={ref}>
      <div className="testimonial-card">
        <div className="testimonial-mark">"</div>
        <p className="testimonial-text">
          Reliable, communicative, intelligent and a great loop programmer with solid AI foundations — Shubham is a star.
        </p>
        <div className="testimonial-author">
          <div>
            <span className="testimonial-author-name">Nicolas Waern</span>
            <span className="testimonial-author-role">Founder, WINNIIO AB · CEO, Life Atlas · Digital Twin Specialist</span>
          </div>
          <a href="https://www.linkedin.com/in/nicolaswaern" target="_blank" rel="noreferrer" className="testimonial-linkedin">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
