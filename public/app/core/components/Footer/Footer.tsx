import React, { FC } from 'react';
import config from 'app/core/config';

export interface FooterLink {
  text: string;
  icon?: string;
  url?: string;
  target?: string;
}

export let getFooterLinks = (): FooterLink[] => {
  return [
    {
      text: 'Santiment',
      icon: 'fa fa-home',
      url: 'https://santiment.net',
      target: '_blank',
    },
    {
      text: 'Sanbase',
      icon: 'fa fa-area-chart',
      url: 'https://app.santiment.net',
      target: '_blank',
    },
    {
      text: 'Community',
      icon: 'fa fa-comments-o',
      url: 'https://community.santiment.net',
      target: '_blank',
    },
  ];
};

export function setFooterLinksFn(fn: typeof getFooterLinks) {
  getFooterLinks = fn;
}

export function setVersionLinkFn(fn: typeof getFooterLinks) {
  getVersionLinks = fn;
}

export const Footer: FC = React.memo(() => {
  const links = getFooterLinks().concat(getVersionLinks());

  return (
    <footer className="footer">
      <div className="text-center">
        <ul>
          {links.map(link => (
            <li key={link.text}>
              <a href={link.url} target="_blank" rel="noopener">
                <i className={link.icon} /> {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
});
