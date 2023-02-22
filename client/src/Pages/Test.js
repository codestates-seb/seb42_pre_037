import Button from '../Components/Ui/Button';
import SearchBar from '../Components/Ui/SearchBar';
import Card from '../Components/Ui/Card';
import Input from '../Components/Ui/Input';
import Loginheader from '../Components/layouts/loginHeader';

function Test() {
  return (
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
      <Loginheader />
    </div>
  );
}

export default Test;
