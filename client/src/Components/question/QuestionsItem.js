import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getTimeDiffString } from '../../utils';

function QuestionsItem({ question }) {
  const purify = DOMPurify(window);
  const { questionId } = question;

  return (
    <li className=" border-b-2 p-5">
      <div>{question.count_answer} answer</div>

      <div className="mb-1">
        <Link to={`/question/${questionId}`}>
          <h3 className="h3-blue hover: cursor-pointer">{question.title}</h3>
        </Link>
        <p
          className=" line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: purify.sanitize(question.content),
          }}
        />
      </div>

      <div className="flex items-end justify-end">
        {/* <ul className="flex space-x-3">
          {question.tags.map((tag, idx) => (
            <li key={idx} className="tag">
              {tag}
            </li>
          ))}
        </ul> */}

        <p className="h-blue text-sm mr-1">{question.displayName}</p>
        <p className="text-sm text-gray-400">
          {getTimeDiffString(question.createdAt)}
        </p>
      </div>
    </li>
  );
}

export default QuestionsItem;
