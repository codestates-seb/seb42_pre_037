import { useState } from 'react';
import { BiFilter } from 'react-icons/bi';

import Button from '../Components/UI/Button';
import dummyData from '../dummyData';

function Questions() {
  const [questions] = useState(dummyData);
  return (
    <>
      <div className="flex items-end justify-between p-5">
        <h1 className="text-4xl">All Questions</h1>
        <Button size="large">Ask Question</Button>
      </div>

      <div className="flex items-end justify-between p-5">
        <h3 className="text-2xl">Questions</h3>
        <Button
          color="clear-blue"
          icon={<BiFilter />}
          iconClassName="text-2xl"
          size="small"
        >
          Filter
        </Button>
      </div>

      {/* Question list */}
      <div>
        <ul>
          {questions.map(question => (
            <li id={question.questionId}>
              <div>{question.count_answer} answer</div>
              <div>
                <h3 className="text-xl">{question.title}</h3>
                <p>{question.content}</p>
              </div>
              <div>
                <ul>
                  {question.tags.map(tag => (
                    <li>{tag}</li>
                  ))}
                </ul>
                <div>{question.displayName}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Questions;
