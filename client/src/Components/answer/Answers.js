import Answer from './Answer';
// import { getTimeDiffString } from '../../utils';

function Answers({ answers }) {
  // const timeDiff = getTimeDiffString(answers.createdAt);

  return (
    <div className="mt-6">
      <h3 className="text-xl">{answers.length} Answers</h3>
      <ul>
        {answers.length > 0 &&
          answers.map(answer => <Answer answer={answer} />)}
      </ul>
    </div>
  );
}

export default Answers;
