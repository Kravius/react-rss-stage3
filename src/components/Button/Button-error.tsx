import React, { useState } from 'react';

const ButtonError: React.FC = () => {
  const [counterError, setCounterError] = useState<number>(0);

  const handleTestErrorClick = () => {
    setCounterError(1);
  };

  if (counterError === 1) {
    throw new Error('Testing error boundary');
  }

  return (
    <>
      <div>
        <button onClick={handleTestErrorClick}>
          Тестировать обработчик ошибок
        </button>
      </div>
    </>
  );
};

export default ButtonError;
