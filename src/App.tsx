import './App.css';
import SearchPage from './header';
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
