import { useNavigate, useLocation } from 'react-router-dom';

import Button from '../Components/Ui/Button';
import { getTimeDiffString } from '../utils';

function Question() {
  const navigate = useNavigate();
  const location = useLocation();
  const { question } = location.state;

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
      <div className="flex space-x-2 py-3 border-b">
        <p className="text-gray-400 ">Asked</p>
        <p>{getTimeDiffString(question.createAt)}</p>
      </div>
      <div>{question.content}</div>
    </div>
  );
}
export default Question;
