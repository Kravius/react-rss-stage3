import { Component } from 'react';

interface State {
  counterError: number;
}

class ButtonError extends Component<object, State> {
  state: State = {
    counterError: 0,
  };

  handleTestErrorClick = () => {
    this.setState({ counterError: 1 });
  };

  render() {
    const { counterError } = this.state;
    if (counterError === 1) {
      throw new Error('Testing error boundary');
    }

    return (
      <>
        <div>
          <button onClick={this.handleTestErrorClick}>
            Тестировать обработчик ошибок
          </button>
        </div>
      </>
    );
  }
}

export default ButtonError;
