import { useFadeIn } from '../hooks/useFadeIn';

interface Paper {
  title: string;
  meta: string;
  note: string;
  tag: string;
  url?: string;
}

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
    note: '680k hours of weakly supervised audio give zero-shot multilingual ASR — the primary system under audit in Vyashkosh.',
    tag: 'Vyashkosh',
    url: 'https://arxiv.org/abs/2212.04356',
  },
  {
    title: 'Omnilingual ASR: Open-Source Multilingual Speech Recognition for 1600+ Languages',
    meta: 'Meta AI · 2025',
    note: 'The widest language coverage in open-source ASR — another system under audit in Vyashkosh.',
    tag: 'Vyashkosh',
  },
  {
    title: 'Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification',
    meta: 'Buolamwini & Gebru · FAccT 2018',
    note: 'The structural blueprint — build a benchmark, train nothing, audit commercial systems, change industry practice.',
    tag: 'Vyashkosh',
    url: 'https://proceedings.mlr.press/v81/buolamwini18a.html',
  },
  {
    title: 'Advocating Character Error Rate for Multilingual ASR Evaluation',
    meta: 'Thennal D K et al. · NAACL Findings 2025',
    note: 'Grounds the WER–CER decomposition — why word error rate alone misleads on Indic scripts.',
    tag: 'Vyashkosh',
  },
  {
    title: 'SRUTI: an ASR benchmark of rural Bhojpuri women',
    meta: 'Joshi et al. · Interspeech 2025',
    note: 'The scale template for a self-collected Indic benchmark — 444 utterances, 51 speakers, ~72 transcribed minutes.',
    tag: 'Vyashkosh',
  },
  {
    title: 'A Study of Speech Recognition for Children and the Elderly',
    meta: 'Wilpon & Jacobsen · ICASSP 1996',
    note: 'The foundational age-stratified ASR result — error rates climb at both ends of the age range.',
    tag: 'Vyashkosh',
  },
  {
    title: 'Longitudinal Study of ASR Performance on Ageing Voices',
    meta: 'Vipperla, Renals & Frankel · Interspeech 2008',
    note: 'SCOTUS corpus — WER rises gradually with speaker age. Degradation is continuous, not a cliff.',
    tag: 'Vyashkosh',
  },
];

export default function Research() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="research" ref={ref}>
      <div className="sec-row">
        <span className="sec-label">Research</span>
      </div>

      <div className="research-featured">
        <span className="research-status">Paper in progress</span>
        <h3 className="research-featured-title">Age-Stratified Evaluation of Speech Recognition</h3>
        <p className="research-note">
          Establishes how to measure whether speech recognition works for older speakers in any language — a
          portable auditing protocol, demonstrated on Indian languages, showing that it largely doesn't.
        </p>
        <span className="research-tag">Vyashkosh</span>
      </div>

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
