import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productPreviews } from '../data/previews';
import type { ProductPreview, PreviewView } from '../data/previews';
import './ProductBrowser.css';

function LiveView({ product, view, revision }: { product: ProductPreview; view: PreviewView; revision: number }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <div className="product-browser-loading" role="status">Opening {product.name}…</div>}
      <iframe
        key={revision}
        className="product-browser-iframe"
        src={view.url}
        title={`${product.name} — ${view.label} live preview`}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

export default function ProductBrowser({ initialSlug = 'hunt', single = false }: { initialSlug?: string; single?: boolean }) {
  const [activeSlug, setActiveSlug] = useState(initialSlug);
  const [viewIndex, setViewIndex] = useState(0);
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [imageZoom, setImageZoom] = useState(false);
  const [revision, setRevision] = useState(0);
  const product = productPreviews.find((p) => p.slug === activeSlug) ?? productPreviews[0];
  const view = product.views[viewIndex] ?? product.views[0];
  const displayAddress = new URL(view.url).host + new URL(view.url).pathname.replace(/\/$/, '') + new URL(view.url).hash;

  function selectProduct(slug: string) {
    setActiveSlug(slug);
    setViewIndex(0);
    setRevision(0);
  }

  return (
    <div className="product-explorer">
      <div className="product-explorer-heading">
        <div>
          <p className="product-eyebrow">A closer look</p>
          {single ? <h2>Explore {product.name}.</h2> : <h3>Explore what I’m building.</h3>}
        </div>
        <span className="product-explorer-hint">{single ? `${product.name} · ${product.status}` : 'Three products. Open for a look.'}</span>
      </div>

      <div className="product-browser">
        <div className="product-browser-tabs" aria-label="Choose a product">
          <span className="browser-lights" aria-hidden="true"><i /><i /><i /></span>
          {(single ? [product] : productPreviews).map((item) => (
            <button
              type="button"
              key={item.slug}
              className={item.slug === product.slug ? 'is-active' : ''}
              aria-pressed={item.slug === product.slug}
              onClick={() => selectProduct(item.slug)}
            >
              {item.name}<span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>

        <div className="product-browser-toolbar">
          {product.mode === 'live' && (
            <button className="browser-reload" type="button" onClick={() => setRevision((n) => n + 1)} aria-label={`Restart ${product.name} preview`} title="Restart preview">↻</button>
          )}
          <a className="browser-address" href={view.url} target="_blank" rel="noreferrer" title="Open this starting page in a new tab">
            <span aria-hidden="true">↗</span>{displayAddress}
          </a>
          {product.mode === 'live' && (
            <div className="browser-viewport" aria-label="Preview width">
              <button type="button" aria-pressed={viewport === 'desktop'} onClick={() => setViewport('desktop')}>Desktop</button>
              <button type="button" aria-pressed={viewport === 'mobile'} onClick={() => setViewport('mobile')}>Mobile</button>
            </div>
          )}
          {product.mode === 'walkthrough' && (
            <div className="browser-viewport" aria-label="Screenshot zoom">
              <button type="button" aria-pressed={!imageZoom} onClick={() => setImageZoom(false)}>Fit view</button>
              <button type="button" aria-pressed={imageZoom} onClick={() => setImageZoom(true)}>Read detail</button>
            </div>
          )}
          <a className="browser-open" href={view.url} target="_blank" rel="noreferrer">Open site <span aria-hidden="true">↗</span></a>
        </div>

        <div className="product-browser-views" aria-label={`${product.name} views`}>
          {product.views.map((item, index) => (
            <button key={item.label} type="button" aria-pressed={index === viewIndex} onClick={() => setViewIndex(index)}>{item.label}</button>
          ))}
          <span className="preview-mode">{product.mode === 'live' ? 'Live website' : 'Guided preview · sample data'}</span>
        </div>

        <div className={`product-browser-stage${product.mode === 'live' && viewport === 'mobile' ? ' is-mobile' : ''}${product.mode === 'walkthrough' ? ` is-walkthrough${imageZoom ? ' is-detail' : ''}` : ''}`}>
          {product.mode === 'live' ? (
            <div className="product-browser-viewport">
              <LiveView key={`${product.slug}-${viewIndex}-${revision}`} product={product} view={view} revision={revision} />
            </div>
          ) : (
            <div className="product-walkthrough" key={`${view.image}-${imageZoom}`} tabIndex={0} role="region" aria-label={`${product.name} ${view.label} screenshot${imageZoom ? ' — scroll to explore details' : ''}`}>
              <img src={view.image} alt={view.alt} loading="lazy" width={view.imageWidth} height={view.imageHeight} />
            </div>
          )}
        </div>

        <div className="product-browser-caption" aria-live="polite">
          <div>
            <span className="product-status">{product.status}</span>
            <p>{view.description ?? product.summary}</p>
            {product.mode === 'walkthrough' && <p className="preview-note">Captured in October 2026. {imageZoom ? 'Scroll to explore the details. ' : 'Choose Read detail to enlarge the view. '}Open the live MVP to use the app.</p>}
            {product.slug === 'hunt' && viewIndex === 1 && <p className="preview-note">Demo entry asks for an email and joins HUNT’s early-access list. The demo uses fictional data and scripted conversations.</p>}
          </div>
          {!single && <Link className="sec-link" to={`/projects/${product.slug}`}>Behind the build →</Link>}
        </div>
      </div>
    </div>
  );
}
