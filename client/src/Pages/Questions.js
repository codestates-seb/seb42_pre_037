import { useState } from 'react';
import { BiFilter } from 'react-icons/bi';

import Button from '../Components/UI/Button';
import dummyData from '../dummyData';
import QuestionList from '../Components/QuestionList';

function Questions() {
  const [questions] = useState(dummyData.data);
  const [totalQuestion] = useState(dummyData.pageInfo);
  return (
    <>
      <div className="flex items-end justify-between p-5">
        <h1 className="text-4xl">All Questions</h1>
        <Button size="large">Ask Question</Button>
      </div>

      <div className="flex items-end justify-between p-5 border-b-2">
        <h3 className="text-2xl">{totalQuestion.totalElements} questions</h3>
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
      <QuestionList questions={questions} />
    </>
  );
}

export default Questions;
