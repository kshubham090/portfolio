import { useEffect } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

const PDF_URL = '/research/f1-lap-time-pitstop-prediction.pdf';
const GITHUB_URL = 'https://github.com/kshubham090/f1-lap-time-pitstop-prediction';

export default function PaperF1() {
  const ref = useFadeIn<HTMLElement>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="site-wrap">
      <section className="section fade-in paper-page" ref={ref}>
        <a href="/#research" className="back-link">← Back</a>

        <div className="paper-wrap">
          <header className="paper-header">
            <h1 className="paper-title">
              Auditing Evaluation Leakage in Formula 1 Race-Strategy Machine Learning: A Track-Identity Confound and
              a Corrected Protocol
            </h1>
            <p className="paper-authors">Shubham Kumar Gupta</p>
            <p className="paper-affil">ASET, Amity University Noida · shubham.kumar59@s.amity.edu</p>
            <p className="paper-meta">Preprint · August 2026</p>
            <div className="paper-actions">
              <a href={PDF_URL} target="_blank" rel="noreferrer" className="pill-btn">Download PDF →</a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="pill-btn">View code on GitHub →</a>
            </div>
          </header>

          <div className="paper-abstract">
            <span className="paper-abstract-label">Abstract</span>
            <p className="paper-abstract-text">
              Machine learning models for Formula 1 race strategy are typically evaluated with random train/test
              splits over lap-level data, which lets adjacent laps from the same race leak between train and test.
              We quantify this directly on lap time and pit-stop prediction using 2023 FastF1 telemetry (22 races,
              20,447 laps). Removing this leakage collapses a naively evaluated XGBoost lap-time model's R² from
              0.994 to −2.26 on unseen circuits once track-identity features are also removed, showing that
              absolute lap time is dominated by track identity rather than the race-condition features (tyre life,
              stint, weather) typically used to justify these models. A track-aware evaluation (holding out drivers
              rather than circuits) restores an honest R²=0.991 (MAE=0.54s, vs. a persistence baseline's R²=0.949,
              MAE=0.61s). The same corrected pipeline yields a pit-stop-next-lap classifier (F1=0.303,
              ROC-AUC=0.888, vs. a logistic regression baseline's ROC-AUC=0.669) that trails current published
              deep-learning approaches on a closely related task (Sasikumar et al. 2025: F1=0.81), which we report
              as a limitation rather than a contribution. Applying the lap-time model without retraining to 2024
              data shows a substantial generalization gap (R² 0.991 to 0.172; pit-stop ROC-AUC 0.888 to 0.721),
              suggesting season-over-season performance changes are not captured by the current feature set. We
              release code, corrected metrics, and a leakage decomposition to support more reproducible evaluation
              in this domain.
            </p>
          </div>

          <div className="paper-section">
            <h2 className="paper-heading">1. Introduction</h2>
            <p className="paper-body">
              Formula 1 teams make pit-stop and tyre-management decisions under significant time pressure, and a
              growing body of applied machine learning work uses lap-level telemetry (much of it sourced from the
              open FastF1 API) to model lap time degradation and pit-stop timing. A recurring methodological
              pattern in this literature, including in an earlier version of the pipeline this paper corrects, is
              to evaluate these models with a row-wise random train/test split over individual laps. Because laps
              from the same race and the same driver's stint are highly autocorrelated, this split lets
              information leak between train and test: a model can effectively interpolate within a race it has
              already partially seen, rather than generalize to conditions it has not.
            </p>
            <p className="paper-body">
              This paper is a leakage audit, not primarily a new modeling technique. Its central contribution is a
              decomposition that isolates exactly how much of a plausible-looking result is attributable to (a) the
              row-wise split itself and (b) one-hot encoding driver and circuit identity as model features. We show
              that these two choices, independently or combined, are sufficient to reproduce a near-perfect
              lap-time R² that has essentially nothing to do with modeling tyre degradation. We then propose and
              validate an honest evaluation protocol: grouped cross-validation, with an explicit distinction
              between generalizing to an unseen circuit (track-agnostic) versus an unseen driver on a known circuit
              (track-aware). We report what a corrected XGBoost pipeline actually achieves under each. We
              complement this with SHAP-based explainability, a set of non-trivial baselines (persistence,
              linear/logistic regression, majority class), and a cross-season generalization test that evaluates
              2023-trained models on 2024 data without retraining.
            </p>
            <p className="paper-body">
              We do not claim state-of-the-art predictive performance. On the pit-stop classification task
              specifically, our corrected classifier trails several recently published results (Section 2), and we
              report this plainly in Section 5 rather than around it. The contribution we do make is a methodology
              and an empirical demonstration, on a real dataset, of how large an evaluation-leakage confound can be
              in this application domain.
            </p>
          </div>

          <div className="paper-section">
            <h2 className="paper-heading">2. Related Work</h2>
            <p className="paper-body">
              <strong>Machine learning for lap-time prediction.</strong> Several recent studies apply machine
              learning directly to FastF1-sourced lap-time data. Zhao (2024) trains a deep neural network to
              forecast qualifying lap times, categorizing historical data by driver and circuit to produce
              per-driver, per-track predictions; this specialization is functionally close to encoding driver and
              circuit identity as features, the same mechanism this paper identifies as the dominant confound in
              our own leakage decomposition (Section 3.3). Brusik (2024) compares univariate and multivariate LSTM
              and LSTM-FCN architectures for multi-step lap-time forecasting on FastF1 data spanning the
              2018–2023 seasons (136,122 laps), using a strict chronological train/test split and including driver
              and constructor identity among the multivariate model's features; the multivariate models outperform
              their univariate counterparts, and error analysis identifies track-status changes (yellow flags,
              safety cars) as the primary source of large forecasting errors across all tested architectures.
              Neither study's evaluation protocol is directly comparable to ours, since both address multi-step or
              per-category forecasting rather than the single-lap, race-grouped setting studied here, so we do not
              attempt a numeric comparison; both are nonetheless consistent with our finding that circuit and
              driver identity are highly informative for absolute lap time.
            </p>
            <p className="paper-body">
              <strong>Deep learning for pit-stop prediction.</strong> Sasikumar, Leema, and Balakrishnan (2025)
              benchmark five deep sequence and convolutional architectures (Bi-LSTM, TCN-GRU, GRU, InceptionTime,
              and CNN-BiLSTM) on FastF1-sourced pit-stop prediction, evaluated on a temporal holdout (the final
              eight races of the 2024 season), which avoids the within-race leakage this paper is concerned with.
              Their best model, Bi-LSTM, reaches precision=0.77, recall=0.86, F1=0.81, and ROC-AUC=0.988 on the
              pit-stop class. This is a strong result, and our own corrected pit-stop classifier (F1=0.303,
              ROC-AUC=0.888; Section 4.3) does not match it. We do not attempt to explain this gap away: a
              temporally-evaluated deep sequence model may simply capture pit-stop timing dynamics that a
              single-lap tabular gradient-boosted-tree model does not. Older comparators are also ahead of our
              result on the same broad task: Fatima and Johrendt's Deep-Racing embedded neural network (2023)
              reports F1=0.67, and García Tejada's SVM-based classifier (2023) reports F1=0.621 for pit-stop
              occurrence. We discuss this comparison further, and what we think it does and does not imply, in
              Section 5.
            </p>
            <p className="paper-body">
              <strong>Explainable F1 strategy models.</strong> Two contemporaneous preprints from an Imperial
              College London / Mercedes-AMG PETRONAS collaboration take different approaches to interpretability in
              this domain. Todd et al. (2025) apply explainable deep learning and XGBoost to tyre energy
              degradation prediction, using feature importance and counterfactual explanations. Thomas et al.
              (2025) target the sequential strategy decision directly with a reinforcement learning policy (RSRL)
              for tyre compound and pit timing, interpreted via feature importance, surrogate decision trees, and
              counterfactuals; RSRL achieved an average finishing position of P5.33 on the 2023 Bahrain Grand Prix,
              ahead of baseline strategies. Our use of SHAP (TreeExplainer) for both the lap-time and pit-stop
              models is in the same spirit (making model decisions auditable at both the global and
              individual-prediction level), applied to a simpler supervised tabular formulation rather than a
              time-series or RL one.
            </p>
            <p className="paper-body">
              <strong>Positioning.</strong> Given the comparison above, we position this paper's contribution as
              methodological: a race- and driver-grouped cross-validation protocol, an explicit decomposition of
              how leaky evaluation inflates results in this specific domain, honest non-trivial baselines, and a
              cross-season generalization test, rather than a claim of predictive superiority over any cited
              comparator.
            </p>
          </div>

          <div className="paper-section">
            <h2 className="paper-heading">3. Methodology</h2>

            <h3 className="paper-subheading">3.1 Data</h3>
            <p className="paper-body">
              We use the FastF1 Python API to fetch lap-by-lap timing data for all 22 races of the 2023 Formula 1
              season (24,420 raw laps). Unlike a prior version of this pipeline, weather is joined properly: for
              each session, the weather data is merged onto the lap data with a nearest-match merge on timestamp
              (5-minute tolerance) before races are concatenated. For the cross-season generalization test (Section
              3.4), we additionally fetch six 2024 races (Bahrain, Japan, Monaco, Great Britain, Singapore, Brazil)
              chosen to reuse 2023 circuit names, so that circuit-identity features are not evaluated on unseen
              categories purely as an artifact of race selection.
            </p>
            <p className="paper-body">
              Laps are cleaned by requiring an "accurate" flag, dropping deleted laps, and dropping rows missing
              tyre life, stint, lap number, compound, or position, leaving 20,873 laps. Building the
              PitStopNextLap target (Section 3.2) additionally drops each driver's final lap of each race, since it
              has no following lap to compare against, leaving the 20,447 laps used throughout the rest of this
              paper.
            </p>

            <h3 className="paper-subheading">3.2 Features and targets</h3>
            <p className="paper-body">
              Numeric features: tyre life, stint (FastF1's native column, not recomputed), lap number, lap-time
              delta from the previous lap (same driver, same race), an approximate gap to the car ahead (derived
              from the difference in cumulative session time between adjacent-position cars on the same lap, since
              FastF1 does not provide this directly), track temperature, air temperature, rainfall, position,
              humidity, and wind speed. Categorical features: tyre compound and track status, one-hot encoded with
              the first level dropped.
            </p>
            <p className="paper-body">
              The regression target is lap time in seconds. The classification target, PitStopNextLap, is defined
              as (NextTyreLife &lt; TyreLife) AND (TyreLife &gt; 2), where NextTyreLife is each driver's tyre life
              on their following lap, shifted within (Grand Prix, Driver) groups rather than by driver alone.
              Shifting by driver alone incorrectly compares a driver's last lap of one race to their first lap of
              the next. Under this definition, 707 of 20,447 laps (3.5%) are positive.
            </p>

            <h3 className="paper-subheading">3.3 Leakage decomposition</h3>
            <p className="paper-body">
              A prior version of this pipeline evaluated both models with a row-wise random 80/20 split and one-hot
              encoded driver and circuit (GP) identity as features. To isolate how much each choice contributes to
              inflated performance, we evaluate four scenarios for the lap-time regression task, using an identical
              feature pipeline throughout:
            </p>
            <p className="paper-body">
              <strong>A</strong> — Random row-wise split, driver and GP included as one-hot features (reproduces
              the original leaky setup).
              <br />
              <strong>B</strong> — Grouped by race (5-fold), driver and GP included: GP is then an unseen category
              for every held-out race, isolating what identity alone contributes once row-wise leakage is removed.
              <br />
              <strong>C</strong> — Grouped by race (5-fold), no driver or GP features at all ("track-agnostic"):
              tests generalization to a genuinely unseen circuit.
              <br />
              <strong>D</strong> — Grouped by driver (5-fold), GP kept as a feature but driver excluded
              ("track-aware"): tests generalization to an unseen driver on a circuit already represented in
              training. This is a legitimate deployment framing, since a race team always knows which circuit it is
              racing at.
            </p>
            <p className="paper-body">
              Scenario C is our primary track-agnostic result; Scenario D is our primary track-aware result and the
              version used for SHAP analysis, the deployed model, and the 2024 generalization test. The same
              track-agnostic/track-aware distinction (Scenarios C and D) is also applied to the pit-stop
              classifier.
            </p>

            <h3 className="paper-subheading">3.4 Baselines, model, explainability, and generalization test</h3>
            <p className="paper-body">
              For lap-time regression we compare XGBoost against a persistence baseline (predict the previous
              lap's time, within driver/race) and linear regression. For pit-stop classification we compare
              XGBoost against a majority-class baseline and logistic regression with balanced class weights.
              XGBoost hyperparameters follow the original paper's specification without re-tuning, since the
              purpose of this pass is evaluation correction, not hyperparameter search: for regression, 300
              estimators, max depth 6, learning rate 0.05, subsample 0.85, column subsample 0.9, ℓ₂=2.0, ℓ₁=1.0;
              for classification, 250 estimators, max depth 5, learning rate 0.08, subsample 0.9, column subsample
              0.85, with the positive-class weight set from the training fold's class ratio.
            </p>
            <p className="paper-body">
              We compute SHAP values (TreeExplainer) for both final (track-aware) models on a random sample of up
              to 1,500 rows, producing global feature-importance summaries and individual-prediction waterfall
              plots for illustrative cases. Both track-aware models, trained once on the full 2023 season, are
              evaluated without retraining on the 6-race 2024 holdout described above (6,133 laps after cleaning),
              to test whether performance transfers across a season boundary.
            </p>
          </div>

          <div className="paper-section">
            <h2 className="paper-heading">4. Results</h2>

            <h3 className="paper-subheading">4.1 Leakage decomposition</h3>
            <p className="paper-body">
              Table 1 confirms that the original evaluation's near-perfect R² is reproducible almost exactly once
              both the row-wise split and identity features are restored (Scenario A), and that identity features
              alone provide no benefit once the split is honest and the circuit is genuinely unseen (Scenario B,
              comparable to Scenario C). Scenario D shows that keeping circuit identity is not illegitimate in
              general — it is only a problem when combined with a leaky split or evaluated against unseen circuits
              — and yields a strong, honestly-validated result.
            </p>

            <div className="paper-table-wrap">
              <p className="paper-table-caption">Table 1. Leakage decomposition, lap-time regression (Section 3.3).</p>
              <table className="paper-table">
                <thead>
                  <tr><th>Scenario</th><th>Split</th><th>Driver/GP features</th><th>R²</th></tr>
                </thead>
                <tbody>
                  <tr><td>A</td><td>Random row-wise</td><td>Both</td><td>0.994</td></tr>
                  <tr><td>B</td><td>Grouped by race</td><td>Both (unseen at test)</td><td>−0.58 ± 0.47</td></tr>
                  <tr><td>C (track-agnostic, primary)</td><td>Grouped by race</td><td>None</td><td>−2.26 ± 1.56</td></tr>
                  <tr><td className="hl">D (track-aware, primary)</td><td className="hl">Grouped by driver</td><td className="hl">GP only</td><td className="hl">0.991 ± 0.002</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="paper-subheading">4.2 Lap time regression</h3>
            <p className="paper-body">
              Table 2 reports the corrected metrics alongside the original notebook and paper figures, neither of
              which we were able to reproduce from the available pipeline. The track-agnostic model performs worse
              than predicting the training-set mean on unseen circuits (R² &lt; 0), because absolute lap time is
              dominated by track length and layout, which no feature in this study represents. The track-aware
              model is a real improvement over a strong persistence baseline (MAE 0.54s vs. 0.61s), but the gap is
              modest, not the near-perfect result the original evaluation implied.
            </p>

            <div className="paper-table-wrap">
              <p className="paper-table-caption">Table 2. Lap time regression: old vs. corrected metrics.</p>
              <table className="paper-table">
                <thead>
                  <tr><th>Model</th><th>MAE (s)</th><th>RMSE (s)</th><th>R²</th></tr>
                </thead>
                <tbody>
                  <tr><td>Notebook (as found, not reproducible)</td><td>N/A</td><td>0.70</td><td>0.9973</td></tr>
                  <tr><td>Paper (as claimed, not reproducible)</td><td>0.174</td><td>0.769</td><td>0.995</td></tr>
                  <tr><td>Track-agnostic: XGBoost</td><td>13.40 ± 2.14</td><td>16.24 ± 1.78</td><td>−2.26 ± 1.56</td></tr>
                  <tr><td>Track-agnostic: linear regression</td><td>8.28 ± 1.89</td><td>10.63 ± 2.53</td><td>−0.29 ± 0.57</td></tr>
                  <tr><td>Track-agnostic: persistence</td><td>0.61 ± 0.15</td><td>2.20 ± 0.95</td><td>0.943 ± 0.038</td></tr>
                  <tr><td className="hl">Track-aware: XGBoost</td><td className="hl">0.54 ± 0.01</td><td className="hl">1.03 ± 0.12</td><td className="hl">0.991 ± 0.002</td></tr>
                  <tr><td>Track-aware: persistence</td><td>0.61 ± 0.05</td><td>2.41 ± 0.27</td><td>0.949 ± 0.012</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="paper-subheading">4.3 Pit-stop classification</h3>
            <p className="paper-body">
              Table 3 shows the same pattern: the track-agnostic classifier barely beats a majority-class baseline
              on F1 and is actually worse than logistic regression on ROC-AUC (0.645 vs. 0.669), while the
              track-aware classifier is a clear improvement over both non-trivial baselines. As discussed in
              Section 5, even the track-aware result trails recent published comparators on this task.
            </p>

            <div className="paper-table-wrap">
              <p className="paper-table-caption">Table 3. Pit-stop-next-lap classification: old vs. corrected metrics.</p>
              <table className="paper-table">
                <thead>
                  <tr><th>Model</th><th>Accuracy</th><th>Precision</th><th>Recall</th><th>F1</th><th>ROC-AUC</th></tr>
                </thead>
                <tbody>
                  <tr><td>Notebook (as found, not reproducible)</td><td>98.62%</td><td>N/A</td><td>N/A</td><td>0.72</td><td>N/A</td></tr>
                  <tr><td>Paper (as claimed, not reproducible)</td><td>89.53%</td><td>0.71</td><td>0.81</td><td>N/A</td><td>0.94</td></tr>
                  <tr><td>Track-agnostic: XGBoost</td><td>87.8% ± 5.7</td><td>0.087 ± 0.031</td><td>0.213 ± 0.082</td><td>0.114 ± 0.043</td><td>0.645 ± 0.060</td></tr>
                  <tr><td>Track-agnostic: majority class</td><td>96.6% ± 0.4</td><td>0.0</td><td>0.0</td><td>0.0</td><td>0.500</td></tr>
                  <tr><td>Track-agnostic: logistic regr.</td><td>65.7% ± 6.0</td><td>0.057 ± 0.009</td><td>0.565 ± 0.059</td><td>0.103 ± 0.015</td><td>0.669 ± 0.041</td></tr>
                  <tr><td className="hl">Track-aware: XGBoost</td><td className="hl">89.7% ± 1.5</td><td className="hl">0.200 ± 0.027</td><td className="hl">0.643 ± 0.039</td><td className="hl">0.303 ± 0.030</td><td className="hl">0.888 ± 0.005</td></tr>
                </tbody>
              </table>
            </div>
            <p className="paper-body">Precision/recall/F1 in Tables 3 and 4 refer to the pit-stop (positive) class throughout.</p>

            <h3 className="paper-subheading">4.4 Explainability</h3>
            <p className="paper-body">
              Figure 1 shows that the track-aware lap-time model's global feature importance is dominated by
              circuit identity (GP) and weather, with tyre-condition features ranking lower than the original
              paper's framing would suggest, consistent with the leakage-decomposition finding that absolute lap
              time is set primarily by track length and layout. Figure 2 shows the opposite, more domain-sensible
              pattern for the pit-stop model: tyre life and stint dominate, with circuit identity contributing
              comparatively little, matching the intuition that pit-stop timing is driven by tyre condition rather
              than which track is being raced.
            </p>

            <div className="paper-figure-row">
              <figure className="paper-figure">
                <img src="/research/f1/lap_time_summary.png" alt="Global feature importance, track-aware lap-time model" loading="lazy" width={1200} height={1425} />
                <figcaption className="paper-figure-caption">(a) Global feature importance</figcaption>
              </figure>
              <figure className="paper-figure">
                <img src="/research/f1/lap_time_case_high_tyre_life.png" alt="Individual case: high tyre life, wet lap" loading="lazy" width={1200} height={1125} />
                <figcaption className="paper-figure-caption">(b) Individual case: high tyre life, wet lap</figcaption>
              </figure>
            </div>
            <p className="paper-figure-block-caption">Figure 1. SHAP analysis, track-aware lap-time model.</p>

            <div className="paper-figure-row">
              <figure className="paper-figure">
                <img src="/research/f1/pit_stop_summary.png" alt="Global feature importance, track-aware pit-stop model" loading="lazy" width={1200} height={1425} />
                <figcaption className="paper-figure-caption">(a) Global feature importance</figcaption>
              </figure>
              <figure className="paper-figure">
                <img src="/research/f1/pit_stop_case_correct_pit_prediction.png" alt="Individual case: correctly predicted pit stop" loading="lazy" width={1200} height={1125} />
                <figcaption className="paper-figure-caption">(b) Individual case: correctly predicted pit stop</figcaption>
              </figure>
            </div>
            <p className="paper-figure-block-caption">Figure 2. SHAP analysis, track-aware pit-stop model.</p>

            <h3 className="paper-subheading">4.5 Cross-season generalization</h3>
            <p className="paper-body">
              Table 4 reports both track-aware models, trained only on 2023 data, evaluated without retraining on
              the 2024 holdout. Both degrade substantially. The lap-time model's larger relative drop is consistent
              with its dependence on circuit identity as a pace-baseline proxy, which goes stale as cars are
              developed season over season; the pit-stop model's smaller relative drop is consistent with its
              dependence on tyre-life dynamics, which are more stable year over year, though still affected by
              Pirelli's per-round compound allocation changing independently of season.
            </p>

            <div className="paper-table-wrap">
              <p className="paper-table-caption">Table 4. Cross-season generalization: 2023-trained, evaluated on 2024 without retraining.</p>
              <table className="paper-table">
                <thead>
                  <tr><th>Model</th><th>Metric</th><th>2023 (in-season CV)</th><th>2024 (held out)</th></tr>
                </thead>
                <tbody>
                  <tr><td>Lap time</td><td>MAE (s)</td><td>0.54</td><td>7.85</td></tr>
                  <tr><td>Lap time</td><td>RMSE (s)</td><td>1.03</td><td>10.01</td></tr>
                  <tr><td>Lap time</td><td>R²</td><td>0.991</td><td>0.172</td></tr>
                  <tr><td>Pit stop</td><td>Accuracy</td><td>89.7%</td><td>87.7%</td></tr>
                  <tr><td>Pit stop</td><td>Precision</td><td>0.200</td><td>0.080</td></tr>
                  <tr><td>Pit stop</td><td>Recall</td><td>0.643</td><td>0.329</td></tr>
                  <tr><td>Pit stop</td><td>F1</td><td>0.303</td><td>0.129</td></tr>
                  <tr><td>Pit stop</td><td>ROC-AUC</td><td>0.888</td><td>0.721</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="paper-section">
            <h2 className="paper-heading">5. Limitations</h2>
            <p className="paper-body">
              <strong>The pit-stop classifier trails the current published field, and we do not soften this.</strong>{' '}
              Our track-aware classifier reaches F1=0.303 and ROC-AUC=0.888. Sasikumar et al.'s Bi-LSTM (2025)
              reaches F1=0.81 and ROC-AUC=0.988 on a temporally-evaluated holdout; Fatima and Johrendt's Deep-Racing
              (2023) reports F1=0.67; García Tejada's SVM (2023) reports F1=0.621. All three are ahead of our
              result. We do not claim our evaluation methodology explains this gap: Sasikumar et al.'s temporal
              holdout is itself a leakage-conscious design, not a naive split, and a sequence model may genuinely
              capture pit-timing dynamics that a single-lap tabular classifier cannot. This paper's contribution is
              the leakage audit and corrected evaluation protocol applied to a tabular gradient-boosted-tree
              pipeline, not a claim that this pipeline is competitive with the current best published pit-stop
              predictors.
            </p>
            <p className="paper-body">
              <strong>The track-aware framing has a specific, narrower scope than "lap time prediction" as
              originally framed.</strong> It generalizes to an unseen driver on a circuit already represented in
              training, not to an unseen circuit (Table 1, Scenario C). This is a reasonable deployment framing (a
              race team always knows its own circuit), but it does mean the model has not been shown to isolate a
              track-independent tyre-degradation signal, which the original task framing implicitly claimed.
            </p>
            <p className="paper-body">
              <strong>Cross-season generalization is weak without retraining</strong> (Table 4). Neither model
              should be deployed across a season boundary without at least recalibration against current-season
              data.
            </p>
            <p className="paper-body">
              <strong>Safety cars, red flags, and team orders are not modeled.</strong> Pit-stop timing is
              frequently driven by external strategic triggers not represented in the feature set; track status is
              a coarse proxy at best.
            </p>
            <p className="paper-body">
              <strong>Driver and constructor identity are deliberately excluded</strong> from the pit-stop model
              and from the lap-time model's driver dimension, specifically to avoid the identity-memorization
              problem this paper documents. This means neither model represents genuine, non-random variation in
              team strategy philosophy or individual driver tyre management.
            </p>
            <p className="paper-body">
              <strong>Training data is single-season.</strong> The 2024 data introduced in this paper is used only
              for evaluation, not training.
            </p>
            <p className="paper-body">
              <strong>The lap-time delta feature is quasi-derived from the regression target.</strong> It is
              defined as the current lap's time minus the previous lap's time for the same driver, so it is
              linearly related to the target it helps predict. It is retained because the original paper's feature
              specification includes it; an ablation removing it changed the track-agnostic result by less than
              0.03 R², indicating it is not the dominant confound relative to track identity, but its role should
              not be left implicit.
            </p>
          </div>

          <div className="paper-section">
            <h2 className="paper-heading">6. Conclusion</h2>
            <p className="paper-body">
              We audited an existing Formula 1 lap-time and pit-stop prediction pipeline and found that its
              previously reported near-perfect performance was substantially an artifact of a row-wise random
              train/test split combined with one-hot-encoded driver and circuit identity, not genuine modeling of
              race conditions. A grouped, leakage-audited evaluation protocol collapses the lap-time model's
              performance on genuinely unseen circuits below a mean-prediction baseline, revealing that absolute
              lap time in this feature set is dominated by track identity rather than tyre degradation. A
              track-aware reformulation (holding out drivers rather than circuits, and treating circuit identity as
              legitimate known context) restores strong, honestly-validated performance for lap time, and a more
              modest but still non-trivial improvement over baselines for pit-stop classification, which
              nonetheless trails the current published state of the art on the same task. A cross-season
              generalization test further shows that neither model transfers cleanly to a new season without
              retraining. We release the corrected pipeline, the leakage decomposition, and all metrics reported
              here to support more reproducible evaluation practice in this application area.
            </p>
          </div>

          <div className="paper-section">
            <h2 className="paper-heading">References</h2>
            <ol className="paper-refs">
              <li>
                Zhao, Z. (2024). Deep Neural Network-based Lap Time Forecasting of Formula 1 Racing. <em>Applied and
                Computational Engineering</em>, 47, 61–66.{' '}
                <a href="https://doi.org/10.54254/2755-2721/47/20241191" target="_blank" rel="noreferrer">doi:10.54254/2755-2721/47/20241191</a>
              </li>
              <li>
                Brusik, F. (2024). <em>Predicting Lap Times in a Formula 1 Race Using Deep Learning Algorithms: A
                Comparison of Univariate and Multivariate Time Series Models</em> [Master's thesis, Tilburg
                University].
              </li>
              <li>
                Sasikumar, A., Leema, A. A., &amp; Balakrishnan, P. (2025). Data-driven pit stop decision support
                for Formula 1 using deep learning models. <em>Frontiers in Artificial Intelligence</em>, 8, 1673148.{' '}
                <a href="https://doi.org/10.3389/frai.2025.1673148" target="_blank" rel="noreferrer">doi:10.3389/frai.2025.1673148</a>
              </li>
              <li>
                Fatima, S. S. W., &amp; Johrendt, J. (2023). Deep-Racing: An Embedded Deep Neural Network (EDNN)
                Model to Predict the Winning Strategy in Formula One Racing. <em>International Journal of Machine
                Learning</em>, 13(3), 97–103.{' '}
                <a href="https://doi.org/10.18178/ijml.2023.13.3.1135" target="_blank" rel="noreferrer">doi:10.18178/ijml.2023.13.3.1135</a>
              </li>
              <li>
                García Tejada, L. (2023). <em>Applying Machine Learning to Forecast Formula 1 Race Outcomes</em>{' '}
                [Master's thesis, Aalto University].
              </li>
              <li>
                Todd, J., Jiang, J., Russo, A., Winkler, S., Sale, S., McMillan, J., &amp; Rago, A. (2025).
                Explainable Time Series Prediction of Tyre Energy in Formula One Race Strategy. <em>arXiv</em>{' '}
                preprint.{' '}
                <a href="https://arxiv.org/abs/2501.04067" target="_blank" rel="noreferrer">arXiv:2501.04067</a>
              </li>
              <li>
                Thomas, D., Jiang, J., Kori, A., Russo, A., Winkler, S., Sale, S., McMillan, J., Belardinelli, F.,
                &amp; Rago, A. (2025). Explainable Reinforcement Learning for Formula One Race Strategy.{' '}
                <em>arXiv</em> preprint.{' '}
                <a href="https://arxiv.org/abs/2501.04068" target="_blank" rel="noreferrer">arXiv:2501.04068</a>
              </li>
              <li>
                Sander, T. (2023). <em>FastF1: Python API for Accessing Formula 1 Telemetry and Timing Data</em>{' '}
                (Version 3.3) [GitHub repository].{' '}
                <a href="https://github.com/theOehrly/Fast-F1" target="_blank" rel="noreferrer">github.com/theOehrly/Fast-F1</a>
              </li>
            </ol>
          </div>

          <div className="paper-actions" style={{ marginTop: 40, marginBottom: 40 }}>
            <a href={PDF_URL} target="_blank" rel="noreferrer" className="pill-btn">Download PDF →</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="pill-btn">View code on GitHub →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
