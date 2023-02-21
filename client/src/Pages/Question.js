import { useNavigate, useLocation } from 'react-router-dom';

import Button from '../Components/Ui/Button';
import { getTimeDiffString } from '../utils';

function Question() {
  const navigate = useNavigate();
  const location = useLocation();
  const { question } = location.state;
  const timeDiff = getTimeDiffString(question.createAt);

  const handlerChangeQuestion = () => {
    navigate('/question/ask');
  };

  return (
    <div className="p-5">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl w-4/5">{question.title}</h1>

        <Button onClick={handlerChangeQuestion} size="large">
          Ask Question
        </Button>
      </div>

      <div className="flex space-x-2 py-3 border-b mb-4">
        <p className="text-gray-400">Asked</p>
        <p>{timeDiff}</p>
      </div>

      <div>{question.content}</div>

      <div className="mt-5 flex justify-between">
        <div className="flex jus space-x-3 text-gray-500">
          <p>Share</p>
          <p>Edit</p>
          <p>Follow</p>
        </div>

        <div className="p-2 w-48 rounded clear-blue">
          <div className="text-gray-500 text-sm">edit {timeDiff}</div>

          <div className="flex h-10">
            <img className="bg-white" src="img/avatar.png" alt="avatar" />
            <p className="h-blue ml-2 text-sm">{question.displayName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Question;
