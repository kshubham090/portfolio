import { GitHubCalendar } from 'react-github-calendar';
import { useFadeIn } from '../hooks/useFadeIn';

const THEME = {
  dark: ['#161616', '#1e3a5f', '#2c5f8f', '#3f82c0', '#60a5fa'],
};

export default function GitHubActivity() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in gh-activity" ref={ref}>
      <div className="sec-row">
        <h2 className="sec-label">GitHub Activity</h2>
        <a href="https://github.com/kshubham090" target="_blank" rel="noreferrer" className="sec-link">Profile →</a>
      </div>

      <div className="gh-calendar-wrap">
        <GitHubCalendar
          username="kshubham090"
          colorScheme="dark"
          theme={THEME}
          fontSize={14}
          blockSize={15}
          blockMargin={5}
        />
      </div>
    </section>
  );
}
