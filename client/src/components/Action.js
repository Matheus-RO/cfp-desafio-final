import React from 'react';

export default function Action({ onClickAction, type }) {
  const handleClickAction = (event) => {
    onClickAction(type);
  };

  return (
    <i
      className="tiny material-icons"
      onClick={handleClickAction}
      style={{ cursor: 'pointer', fontSize: '1.3rem' }}
    >
      {type}
    </i>
  );
}
