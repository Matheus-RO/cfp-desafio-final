import React, { useEffect, useState } from 'react';
import ArrowButton from './ArrowButton';

export default function PeriodSelector({
  allPeriods,
  selectedPeriod,
  onChangePeriod,
}) {
  const [isFirstPeriod, setIsFirstPeriod] = useState(false);
  const [isLastPeriod, setIsLastPeriod] = useState(false);

  useEffect(() => {
    if (!selectedPeriod || !allPeriods) {
      return;
    }

    const currentIndex = allPeriods.findIndex(
      (item) => item.id === selectedPeriod.id
    );
    const checkIsFirstPeriod = currentIndex === 0;
    const checkIsLastPeriod = currentIndex === allPeriods.length - 1;

    setIsFirstPeriod(checkIsFirstPeriod);
    setIsLastPeriod(checkIsLastPeriod);
  }, [selectedPeriod, allPeriods]);

  const handleSelectChange = (event) => {
    onChangePeriod(
      allPeriods.find((period) => period.id === event.target.value)
    );
  };

  if (allPeriods.length === 0 || !selectedPeriod) {
    return null;
  }

  const handleLeftButtonClick = () => {
    const index = allPeriods.findIndex((item) => item.id === selectedPeriod.id);

    onChangePeriod(allPeriods[index - 1]);
  };

  const handleRightButtonClick = () => {
    const index = allPeriods.findIndex((item) => item.id === selectedPeriod.id);

    onChangePeriod(allPeriods[index + 1]);
  };

  return (
    <div style={styles.flexRow}>
      <ArrowButton
        type="left"
        buttonDisabled={isFirstPeriod}
        onArrowClick={handleLeftButtonClick}
      />
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
      <ArrowButton
        type="right"
        buttonDisabled={isLastPeriod}
        onArrowClick={handleRightButtonClick}
      />
    </div>
  );
}

const styles = {
  selectStyle: {
    width: '150px',
    height: '36px',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  },
};
