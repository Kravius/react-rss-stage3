import './App.css';
import SearchPage from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary';
import ButtonError from './components/Button/Button-error';

function App() {
  return (
    <>
      <ErrorBoundary>
        <SearchPage></SearchPage>
        <ButtonError />
      </ErrorBoundary>
    </>
  );
}

export default App;
