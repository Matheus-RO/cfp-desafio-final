import React from 'react';

export default function ArrowButton({
  buttonDisabled = false,
  onArrowClick = null,
  type = 'left',
}) {
  const handleButtonClick = () => {
    onArrowClick(null);
  };

  return (
    <div style={styles.buttonStyle}>
      <button
        className="btn waves-effect waves-light"
        onClick={handleButtonClick}
        disabled={buttonDisabled}
        style={{ fontWeight: 'bold' }}
      >
        {type === 'left' ? '<' : '>'}
      </button>
    </div>
  );
}

const styles = {
  buttonStyle: {
    margin: '5px',
  },
};
