function Answers({ answers }) {
  return (
    <div>
      <h3 className="text-xl">{answers.length + 1} Answers</h3>
      <ul>
        {answers.map(answer => (
          <div>
            <div className="w-full h-[0.1rem] mb-4 mt-4 bg-gray-300" />
            <div>
              <li key={answer.answerId}>
                <p>{answer.content}</p>
                <p>{answer.displayName}</p>
              </li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Answers;
