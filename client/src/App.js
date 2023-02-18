import Button from './Components/UI/Button';
import SearchBar from './Components/UI/SearchBar';
import Login from './Pages/Login';
import Card from './Components/UI/Card';

function App() {
  return (
    <div>
      <Login />
      <Card className=" m-5 space-x-2">
        <Button color="gray" size="large" type="button">
          버튼입니다!
        </Button>
        <Button color="blue" size="medium" type="button">
          버튼입니다!
        </Button>
        <Button color="green" size="small" type="button">
          버튼입니다!
        </Button>
      </Card>
      <Card className="m-5 flex flex-col mt-2 space-y-2">
        <SearchBar placeholder="Filter by tag name..." />
        <SearchBar placeholder="Search..." />
      </Card>
    </div>
  );
}

export default App;
