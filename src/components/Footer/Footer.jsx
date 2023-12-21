import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const Footer = () => {
  return (
    <footer className="py-6 bg-gray-400 border-t-2 border-t-black">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="flex items-center ml-3  mb-3">
          <Logo width="50px" />
          <p className="ml-2 text-sm text-gray-600">
            &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          {renderFooterLinks('Company', [
            { label: 'Features', to: '/' },
            { label: 'Pricing', to: '/' },
            { label: 'Affiliate Program', to: '/' },
            { label: 'Press Kit', to: '/' },
          ])}
          {renderFooterLinks('Support', [
            { label: 'Account', to: '/' },
            { label: 'Help', to: '/' },
            { label: 'Contact Us', to: '/' },
            { label: 'Customer Support', to: '/' },
          ])}
          {renderFooterLinks('Legals', [
            { label: 'Terms & Conditions', to: '/' },
            { label: 'Privacy Policy', to: '/' },
            { label: 'Licensing', to: '/' },
          ])}
        </div>
      </div>
    </footer>
  );
};

const renderFooterLinks = (title, links) => (
  <div className="flex flex-col space-y-2 ml-3 mb-2" >
    <h3 className="text-xs font-semibold uppercase text-gray-500">{title}</h3>
    <ul>
      {links.map((link) => (
        <li key={link.label}>
          <Link
            className="text-base text-gray-900 hover:text-gray-700"
            to={link.to}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
