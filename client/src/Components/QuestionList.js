function QuestionList({ questions }) {
  return (
    <div>
      <ul>
        {questions.map(question => (
          <li className="border-b-2 p-5" id={question.questionId}>
            <div>{question.count_answer} answer</div>

            <div>
              <h3 className="h3-blue">{question.title}</h3>
              <p>{question.content}</p>
            </div>

            <div>
              <ul className="flex space-x-3">
                {question.tags.map(tag => (
                  <li className="tag">{tag}</li>
                ))}
              </ul>

              <div>{question.displayName}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
