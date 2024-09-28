import React from 'react';

const Header = ({ dark, toggleDarkMode }) => {
  const darkModeLabel = dark === 'light' ? 'Dark Mode' : 'Light Mode';
  const darkModeIcon = dark === 'light' ? '🌛' : '🌞';

  return (
    <div className={`header_${dark}`}>
      <div>
        <h2>Where in the World?</h2>
      </div>
      <div>
        <button onClick={toggleDarkMode} className='header_button'>
          <p>{darkModeIcon}</p>
          <p>{darkModeLabel}</p>
        </button>
      </div>
    </div>
  );
};

export default Header;
