import Button from './Components/UI/Button';
import SearchBar from './Components/UI/SearchBar';
import Login from './Pages/Login';

function App() {
  return (
    <div>
      <Login />
      <Button color="gray" size="large" type="button">
        버튼입니다!
      </Button>
      <div className="flex flex-col mt-2 space-y-2 w-96">
        <SearchBar placeholder="Filter by tag name" />
        <SearchBar placeholder="Search..." />
      </div>
    </div>
  );
}

export default App;
