import './App.css';
import SearchPage from './header';
import ErrorBoundary from './ErrorBoundary';
import ButtonError from './components/Button-error';

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
