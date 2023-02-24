import avatar from '../icons/avatar.png';

function Answers({ answers }) {
  return (
    <div className="mt-10">
      <h3 className="text-xl">{answers.length + 1} Answers</h3>
      <ul>
        {answers.length > 0 &&
          answers.map(answer => (
            <li key={answer.answerId} className="py-6 border-b px-5">
              <p className="mb-5">{answer.content}</p>

              <div className="flex justify-end">
                <div className="p-2 w-48 mt-3">
                  <div className="flex h-10">
                    <img className="bg-white" src={avatar} alt="avatar" />
                    <p className="h-blue ml-2 text-sm">{answer.displayName}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Answers;
