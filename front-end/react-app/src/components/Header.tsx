import React  from 'react';
import { Navigation } from './Navigation.tsx';
export const Header = () => {
  return (
    <header className="header">
          < Navigation />
          <div className='company-info'>
          <p className="name"> Personal finance system </p>
          <img className="icon" src="/logo.png" alt="Logo" />
          </div>
    </header>
  );
}

  