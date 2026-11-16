import React from 'react';
import SiteFooter from '@site/src/components/Site/SiteFooter';
import '@site/src/components/Home/home.css';

/** Docs and blog use the same footer as the main pages. */
export default function Footer(): JSX.Element {
  return (
    <div className="lc-home lc-chrome">
      <SiteFooter />
    </div>
  );
}
