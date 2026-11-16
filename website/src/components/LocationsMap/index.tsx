import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import map from './map.json';
import {REGIONS, ALSO} from './data';
import './map.css';

type MapData = {W: number; H: number; land: string; borders: string; hl: Record<string, string>; markers: Record<string, [number, number]>};
const M = map as unknown as MapData;

export default function LocationsMap(): JSX.Element {
  const [sel, setSel] = useState(REGIONS[0].id);
  const r = REGIONS.find((x) => x.id === sel) ?? REGIONS[0];
  const img = useBaseUrl(`img/home/${r.img}.webp`);
  const total = r.scores.reduce((a, [, v]) => a + v, 0);
  const pct = (k: string) => {
    const [x, y] = M.markers[k];
    return {left: `${(x / M.W) * 100}%`, top: `${(y / M.H) * 100}%`};
  };

  return (
    <div className="lm">
      <div className="lm-map"><div className="lm-stage">
        <svg viewBox={`0 0 ${M.W} ${M.H}`} role="img" aria-label="Map of the Americas and Iberia with five candidate regions in the United States, Portugal, Spain and Costa Rica">
          <path d={M.land} className="lm-land" />
          {Object.entries(M.hl).map(([k, d]) => <path key={k} d={d} className="lm-hl" />)}
          <path d={M.borders} className="lm-borders" />
          <path d={M.land} className="lm-outline" />
        </svg>
        {ALSO.map((a) => (
          <span key={a.id} className="lm-also" style={pct(a.id)} title={a.note}>
            <i aria-hidden="true"></i><span>{a.name}</span>
          </span>
        ))}
        {REGIONS.map((x) => (
          <button
            key={x.id}
            type="button"
            className={'lm-pin' + (x.id === sel ? ' on' : '')}
            data-id={x.id}
            style={pct(x.id)}
            aria-pressed={x.id === sel}
            aria-label={`${x.n}. ${x.name}`}
            onClick={() => setSel(x.id)}>
            {x.n}
          </button>
        ))}
      </div></div>

      <div className="lm-tabs" role="tablist" aria-label="Candidate regions">
        {REGIONS.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={x.id === sel} className={x.id === sel ? 'on' : ''} onClick={() => setSel(x.id)}>
            <b>{x.n}</b>{x.name}
          </button>
        ))}
      </div>

      <article className="lm-card" aria-live="polite">
        <figure className="lm-card-art"><img src={img} alt={`Concept view of Light City in the ${r.name} landscape`} loading="lazy" width="1200" height="900" /></figure>
        <div className="lm-card-body">
          <p className="pg-kicker">Option {r.n} · {r.place}</p>
          <h3>{r.name}</h3>
          <p className="lm-best">Best for: {r.bestFor}</p>
          <dl className="lm-climate">
            {r.climate.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <div className="lm-lists">
            <div>
              <h4>Benefits</h4>
              <ul>{r.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
            <div>
              <h4>Watch-outs</h4>
              <ul className="risk">{r.risks.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          </div>
          <div className="lm-scores" aria-label={`Scores, total ${total} of 45`}>
            {r.scores.map(([k, v]) => (
              <div key={k} className="lm-score">
                <span>{k}</span>
                <span className="lm-dots" aria-label={`${v} of 5`}>{[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= v ? 'f' : ''}></i>)}</span>
              </div>
            ))}
            <div className="lm-total">Total <b>{total}</b> / 45</div>
          </div>
        </div>
      </article>
    </div>
  );
}
