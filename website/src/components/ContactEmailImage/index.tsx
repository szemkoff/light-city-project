import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

/**
 * Project inbox shown as a raster image only (reduces plain-text harvesting in HTML).
 * The same address is configured in Web3Forms; do not duplicate as visible text on pages.
 */
export default function ContactEmailImage(): JSX.Element {
  const src = useBaseUrl('img/contact-email-address.png');
  return (
    <figure className={styles.wrap}>
      <figcaption className={styles.caption}>To copy manually (optional)</figcaption>
      <img
        src={src}
        alt=""
        className={styles.img}
        width={280}
        height={40}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}
