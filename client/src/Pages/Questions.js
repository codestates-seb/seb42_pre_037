import { BiFilter } from 'react-icons/bi';

import Button from '../Components/UI/Button';

function Questions() {
  return (
    <>
      <div>
        <h1>All Questions</h1>
        <Button>Ask Question</Button>
      </div>
      <div>
        <h3>Questions</h3>
        <Button
          color="clear-blue"
          icon={<BiFilter />}
          iconClassName="text-2xl"
          size="small"
        >
          Filter
        </Button>
      </div>
    </>
  );
}

export default Questions;
