import { useNavigate, useLocation } from 'react-router-dom';

import Button from '../Components/Ui/Button';

function Question() {
  const navigate = useNavigate();
  const question = useLocation();

  const handlerChangeQuestion = () => {
    navigate('/question/ask');
  };
  return (
    <div className="flex items-start justify-between p-5">
      <h1 className="text-3xl w-4/5">{question.state.question.title}</h1>

      <Button onClick={handlerChangeQuestion} size="medium">
        Ask Question
      </Button>
    </div>
  );
}
export default Question;
