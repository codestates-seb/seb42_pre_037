function Answers({ answers }) {
  return (
    <div>
      <h3 className="text-xl">{answers.length + 1} Answers</h3>
      <ul>
        {answers.map(answer => (
          <li key={answer.answerId}>
            <p>{answer.content}</p>
            <p>{answer.displayName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Answers;
