import React from 'react';

export default function Action({ onClickAction, type }) {
  const handleClickAction = (event) => {
    onClickAction(type);
  };

  return (
    <i
      className="tiny material-icons"
      onClick={handleClickAction}
      style={styles.actionStyle}
    >
      {type}
    </i>
  );
}

const styles = {
  actionStyle: {
    cursor: 'pointer',
    fontSize: '1.3rem',
    marginRight: '10px',
  },
};
