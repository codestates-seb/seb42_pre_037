import { useNavigate, useLocation } from 'react-router-dom';

import Button from '../Components/Ui/Button';

function Question() {
  const navigate = useNavigate();
  const location = useLocation();
  const { question } = location.state;

  const handlerChangeQuestion = () => {
    navigate('/question/ask');
  };

  const getTimeDiffString = pastTime => {
    const now = new Date();
    const past = new Date(pastTime);
    const diffMs = now.getTime() - past.getTime();

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) return `${diffYears} years`;
    if (diffMonths > 0) return `${diffMonths} months`;
    if (diffDays > 0) return `${diffDays} days`;
    if (diffHours > 0) return `${diffHours} hours ago`;
    if (diffMinutes > 0) return `${diffMinutes} min ago`;
    return '1 min ago';
  };

  return (
    <div className="p-5">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl w-4/5">{question.title}</h1>

        <Button onClick={handlerChangeQuestion} size="large">
          Ask Question
        </Button>
      </div>
      <div className="flex space-x-3">
        <p>Asked {getTimeDiffString(question.createAt)}</p>
        <p>Modified {}</p>
      </div>
    </div>
  );
}
export default Question;
