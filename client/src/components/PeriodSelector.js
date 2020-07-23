import React, { useEffect } from 'react';

export default function PeriodSelector({
  allPeriods,
  selectedPeriod,
  onChangePeriod,
}) {
  useEffect(() => {
    if (!selectedPeriod || !selectedPeriod) {
      return;
    }
  }, [selectedPeriod, allPeriods]);

  const handleSelectChange = (event) => {
    onChangePeriod(
      allPeriods.find((period) => period.id === event.target.value)
    );
  };

  if (allPeriods.length === 0 || !selectedPeriod) {
    return null;
  }

  return (
    <div style={styles.flexRow}>
      <select
        className="browser-default"
        value={selectedPeriod.id}
        onChange={handleSelectChange}
        style={styles.selectStyle}
      >
        {allPeriods.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

const styles = {
  selectStyle: {
    width: '150px',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  },
};
