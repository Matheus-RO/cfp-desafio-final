import React from 'react';

export default function AccountingEntry({ onChangeFilter, onInsertButton }) {
  const handleInputChange = (event) => {
    onChangeFilter(event.target.value);
  };

  const handleButtonClick = () => {
    onInsertButton();
  };

  return (
    <div style={styles.flexRow}>
      <button
        className="btn waves-effect waves-light"
        onClick={handleButtonClick}
      >
        + Novo lançamento
      </button>
      <div className="input-field" style={styles.flexInput}>
        <input
          id="inputFilter"
          type="text"
          placeholder="Filtro"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

const styles = {
  flexRow: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flexStart',
  },
  flexInput: {
    marginLeft: '10px',
    display: 'flex',
    flex: '1 1 0',
  },
};
