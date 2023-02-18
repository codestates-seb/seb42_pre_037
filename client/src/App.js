import Button from './Components/UI/Button';
import SearchBar from './Components/UI/SearchBar';
import Login from './Pages/Login';
import Card from './Components/UI/Card';
import Input from './Components/UI/Input';

function App() {
  return (
    <div>
      <Login />
      <div className="flex flex-col justify-center space-y-5">
        <Card className="mx-auto space-x-2">
          <Button color="clear-blue" size="large" type="button">
            Log in
          </Button>
          <Button color="blue" size="medium" type="button">
            Sign up
          </Button>
          <Button color="green" size="small" type="button">
            버튼입니다!
          </Button>
        </Card>
        <Card className="mx-auto flex flex-col mt-2 space-y-2">
          <SearchBar placeholder="Filter by tag name..." />
          <SearchBar placeholder="Search..." />
        </Card>
        <Card className="mx-auto space-y-2">
          <Input label="Display name" placeholder="Display name" />
          <Input label="Email" placeholder="Email" disabled />
          <Input label="Password" placeholder="Password" />
        </Card>
      </div>
    </div>
  );
}

export default App;
