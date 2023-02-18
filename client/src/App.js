import Button from './Components/Ui/Button';
import SearchBar from './Components/Ui/SearchBar';
import Login from './Pages/Login';

function App() {
  return (
    <div>
      <Login />
      <div className="m-5 space-x-2">
        <Button color="gray" size="large" type="button">
          버튼입니다!
        </Button>
        <Button color="blue" size="medium" type="button">
          버튼입니다!
        </Button>
        <Button color="green" size="small" type="button">
          버튼입니다!
        </Button>
      </div>
      <div className="m-5 flex flex-col mt-2 space-y-2 w-96">
        <SearchBar placeholder="Filter by tag name..." />
        <SearchBar placeholder="Search..." />
      </div>
    </div>
  );
}

export default App;
