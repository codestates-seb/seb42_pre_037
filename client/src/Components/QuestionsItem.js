import { Link } from 'react-router-dom';

function QuestionsItem({ question }) {
  return (
    <li className="border-b-2 p-5">
      <div>{question.count_answer} answer</div>

      <div className="mb-1">
        <Link to="/question" state={{ question }}>
          <h3 className="h3-blue hover: cursor-pointer">{question.title}</h3>
        </Link>
        <p>{question.content}</p>
      </div>

      <div className="flex items-end justify-end">
        {/* <ul className="flex space-x-3">
          {question.tags.map((tag, idx) => (
            <li key={idx} className="tag">
              {tag}
            </li>
          ))}
        </ul> */}

        <div>{question.displayName}</div>
      </div>
    </li>
  );
}

export default QuestionsItem;
