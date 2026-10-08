import { Link } from 'react-router-dom';
import { useFadeIn } from '../hooks/useFadeIn';

interface Paper {
  title: string;
  meta: string;
  note: string;
  tag: string;
  url?: string;
}

interface OwnPaper {
  status: string;
  title: string;
  note: string;
  tag: string;
  href?: string;
  reloadDocument?: boolean;
}

const OWN_PAPERS: OwnPaper[] = [
  {
    status: 'Published · Zenodo · Aug 2026',
    title: 'Auditing Evaluation Leakage in Formula 1 Race-Strategy Machine Learning',
    note: 'A research preprint auditing model evaluation across 20,447 laps and 22 races. XGBoost experiments, grouped validation, baseline comparisons and a 6,133-lap next-season holdout examine how data splits and target-derived inputs affect reported performance.',
    tag: 'F1',
    href: 'https://doi.org/10.5281/zenodo.21862868',
  },
  {
    status: 'Published · Zenodo · Aug 2026',
    title: 'VAYAS: An Age-Stratified Zero-Shot Audit of Hindi Speech Recognition',
    note: 'A co-authored preprint comparing four ASR systems with 50 older speakers and matched controls. WER/CER analysis, bootstrap uncertainty and multiple-testing correction put the observed age effects in context; none remained significant after correction.',
    tag: 'Vyaskosh / ASR',
    href: '/research/vayas-age-stratified-asr',
    reloadDocument: true,
  },
  {
    status: 'In progress',
    title: 'Vyaskosh — Second Manuscript',
    note: 'Continuing model training and benchmarking in the broader Vyaskosh project. The second manuscript is in progress, alongside the published VAYAS zero-shot evaluation.',
    tag: 'Ongoing research',
  },
  {
    status: 'Research prototype · 2026',
    title: 'AgenticSwarm — Governed Multi-Agent Systems',
    note: 'Earlier Chakra47 research combining custom Python orchestration, policy checks and a SHA-256 audit chain. Related research was presented as Symbiote-X at the India AI Impact Summit 2026; the newer Chakra47 application layer is a separate development direction.',
    tag: 'Systems research',
    href: '/projects/chakra47-agentic-swarm',
  },
];

const PAPERS: Paper[] = [
  {
    title: 'Attention Is All You Need',
    meta: 'Vaswani et al. · NeurIPS 2017',
    note: 'The transformer — self-attention replaces recurrence. The architecture underneath every model I build on.',
    tag: 'Foundations',
    url: 'https://arxiv.org/abs/1706.03762',
  },
  {
    title: 'Language Models are Few-Shot Learners (GPT-3)',
    meta: 'Brown et al. · NeurIPS 2020',
    note: 'Scale unlocks in-context learning — models follow instructions from the prompt alone. The reason prompt design is engineering, not guesswork.',
    tag: 'Foundations',
    url: 'https://arxiv.org/abs/2005.14165',
  },
  {
    title: 'Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)',
    meta: 'Radford et al. · 2022',
    note: '680k hours of weakly supervised audio support zero-shot multilingual ASR — background for the speech-recognition work in Vyaskosh.',
    tag: 'Vyaskosh',
    url: 'https://arxiv.org/abs/2212.04356',
  },
  {
    title: 'Omnilingual ASR: Open-Source Multilingual Speech Recognition for 1600+ Languages',
    meta: 'Meta AI · 2025',
    note: 'Broad multilingual coverage in open-source ASR — background for comparing systems and evaluation protocols.',
    tag: 'Vyaskosh',
  },
  {
    title: 'Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification',
    meta: 'Buolamwini & Gebru · FAccT 2018',
    note: 'The structural blueprint — build a benchmark, train nothing, audit commercial systems, change industry practice.',
    tag: 'Vyaskosh',
    url: 'https://proceedings.mlr.press/v81/buolamwini18a.html',
  },
  {
    title: 'Advocating Character Error Rate for Multilingual ASR Evaluation',
    meta: 'Thennal D K et al. · NAACL Findings 2025',
    note: 'Grounds the WER–CER decomposition — why word error rate alone misleads on Indic scripts.',
    tag: 'Vyaskosh',
  },
  {
    title: 'SRUTI: an ASR benchmark of rural Bhojpuri women',
    meta: 'Joshi et al. · Interspeech 2025',
    note: 'The scale template for a self-collected Indic benchmark — 444 utterances, 51 speakers, ~72 transcribed minutes.',
    tag: 'Vyaskosh',
  },
  {
    title: 'A Study of Speech Recognition for Children and the Elderly',
    meta: 'Wilpon & Jacobsen · ICASSP 1996',
    note: 'The foundational age-stratified ASR result — error rates climb at both ends of the age range.',
    tag: 'Vyaskosh',
  },
  {
    title: 'Longitudinal Study of ASR Performance on Ageing Voices',
    meta: 'Vipperla, Renals & Frankel · Interspeech 2008',
    note: 'SCOTUS corpus — WER rises gradually with speaker age. Degradation is continuous, not a cliff.',
    tag: 'Vyaskosh',
  },
];

export default function Research() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="research" ref={ref}>
      <div className="sec-row">
        <h2 className="sec-label">Research</h2>
      </div>

      {OWN_PAPERS.map((p) => {
        const inner = (
          <>
            <span className="research-status">{p.status}</span>
            <h3 className="research-featured-title">{p.title}</h3>
            <p className="research-note">{p.note}</p>
            <span className="research-tag">{p.tag}</span>
          </>
        );
        return p.href?.startsWith('https://') ? (
          <a key={p.title} href={p.href} target="_blank" rel="noreferrer" className="research-featured research-featured-link">
            {inner}
          </a>
        ) : p.href ? (
          <Link key={p.title} to={p.href} reloadDocument={p.reloadDocument} className="research-featured research-featured-link">
            {inner}
          </Link>
        ) : (
          <div key={p.title} className="research-featured">
            {inner}
          </div>
        );
      })}

      <ul className="research-list">
        {PAPERS.map((p) => {
          const body = (
            <>
              <div className="research-item-top">
                <span className="research-title">{p.title}</span>
                <span className="research-meta">{p.meta}</span>
              </div>
              <p className="research-note">{p.note}</p>
              <span className="research-tag">{p.tag}</span>
            </>
          );
          return (
            <li key={p.title} className="research-item">
              {p.url
                ? <a href={p.url} target="_blank" rel="noreferrer" className="research-item-link">{body}</a>
                : body}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
