import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function getCurrentDate() {
  const date = new Date();

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const today = `${year}-${month}-${day}`;
  return today;
}

export default function ModalTransaction({
  isOpen,
  onClose,
  onSave,
  selectedTransaction,
}) {
  const [date, setDate] = useState(getCurrentDate());
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);
  const [mode, setMode] = useState('insert');

  const [type, setType] = useState(
    !!selectedTransaction ? selectedTransaction.type : '-'
  );

  const handleModalClose = () => {
    onClose(null);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    if (!selectedTransaction) {
      setMode('insert');
      return;
    }

    const { description, category, value, yearMonthDay } = selectedTransaction;

    setMode('edit');
    setDescription(description);
    setCategory(category);
    setDate(yearMonthDay);
    setValue(value);
  }, [selectedTransaction]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
  };

  const handleValueChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
  };

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setType(newType);
  };

  const handleSaveButtonClick = () => {
    const newDateArray = date.split('-');
    const year = newDateArray[0];
    const month = newDateArray[1];
    const day = newDateArray[2];

    const transactionToUpdate = {
      description,
      category,
      type,
      value,
      yearMonthDay: date,
      yearMonth: `${year}-${month}`,
      year,
      month,
      day,
    };

    let id = null;

    if (!!selectedTransaction) {
      id = selectedTransaction.id;
    }

    onSave(transactionToUpdate, mode, id);
    console.log(transactionToUpdate, `update: ${id}`);
  };

  const title =
    mode === 'insert' ? 'Inclusão de lançamento' : 'Edição de lançamento';

  const canSave = () => {
    return description.trim() !== '' && category.trim() !== '';
  };

  return (
    <div>
      <Modal isOpen={isOpen} style={styles.modalStyle}>
        <div style={styles.flexRow}>
          <h3 style={styles.title}>{title}</h3>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>
        <div style={styles.boxForm} className="center">
          <form onSubmit={handleFormSubmit}>
            <div style={styles.radioRow}>
              <label>
                <input
                  className="with-gap"
                  name="groupType"
                  type="radio"
                  value="+"
                  onChange={handleTypeChange}
                  checked={type === '+'}
                  disabled={mode === 'edit'}
                />
                <span style={styles.earningStyle}>Receita</span>
              </label>

              <label>
                <input
                  className="with-gap"
                  name="groupType"
                  type="radio"
                  value="-"
                  onChange={handleTypeChange}
                  checked={type === '-'}
                  disabled={mode === 'edit'}
                />
                <span style={styles.expenseStyle}>Despesa</span>
              </label>
            </div>
            <div className="input-field">
              <input
                id="inputDescription"
                type="text"
                autoFocus
                value={description}
                onChange={handleDescriptionChange}
                style={styles.inputStyle}
              />
              <label className="active" htmlFor="inputDescription">
                Descrição:
              </label>
            </div>

            <div className="input-field">
              <input
                id="inputCategory"
                type="text"
                value={category}
                onChange={handleCategoryChange}
                style={styles.inputStyle}
              />
              <label className="active" htmlFor="inputCategory">
                Categoria:
              </label>
            </div>

            <div style={styles.flexRow}>
              <div className="input-field">
                <input
                  id="inputValue"
                  type="number"
                  min="0"
                  step="0.1"
                  value={value}
                  onChange={handleValueChange}
                  style={styles.inputStyle}
                />
                <label className="active" htmlFor="inputValue">
                  Valor:
                </label>
              </div>

              <input
                className="browser-default"
                id="inputDate"
                style={{ marginLeft: '10px' }}
                type="date"
                value={date}
                onChange={handleDateChange}
              />
            </div>

            <div style={styles.saveButtonStyle}>
              <button
                className="waves-effect waves-light btn"
                disabled={!canSave()}
                onClick={handleSaveButtonClick}
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  boxForm: {
    border: '1px solid lightGrey',
    borderRadius: '5px',
    marginTop: '10px',
    padding: '10px',
    boxShadow: '5px 5px 1px 1px lightGrey',
  },
  radioRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '20px',
    marginBottom: '30px',
  },
  earningStyle: {
    color: '#27ae60',
    fontWeight: 'bold',
    fontSize: '1.3rem',
  },
  expenseStyle: {
    color: '#c0392b',
    fontWeight: 'bold',
    fontSize: '1.3rem',
  },
  modalStyle: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  saveButtonStyle: {
    display: 'flex',
    alignContent: 'start',
  },
  inputStyle: {
    paddingLeft: '3px',
  },
};
