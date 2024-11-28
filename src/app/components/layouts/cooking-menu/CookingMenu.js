'use client';

import React from 'react';

const CookingMenu = () => {
  return (
    <nav style={styles.menu}>
      <button style={styles.tab} className="active">Home</button>
      <button style={styles.tab}>Suggest</button>
      <button style={styles.tab}>Calendar</button>
    </nav>
  );
};

const styles = {
  menu: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
    borderBottom: '2px solid #ccc',
  },
  tab: {
    padding: '10px 20px',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default CookingMenu;
