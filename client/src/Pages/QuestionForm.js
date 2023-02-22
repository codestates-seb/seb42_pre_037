import { useState } from 'react';
import axios from 'axios';
import AnswersImg from '../Components/icons/AnswersImg.png';
import TextEditor from '../Components/Ui/TextEditor';
import Button from '../Components/Ui/Button';

function QuestionForm() {
  const pathData = {
    title: '',
    body: '',
  };

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handlerChange = e => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const pathQuestionData = async () => {
    const response = await axios
      .post('http://localhost:8080/questions', pathData)
      .catch(error => {
        console.error(error);
      });
    if (response && response.data) {
      console.log(response);
    }
  };

  const handlerSubmit = e => {
    e.preventDefault();
    pathData.title = title;
    pathData.body = body;
    pathQuestionData();
    console.log('pathData', pathData.title, pathData.body);
  };

  return (
    <>
      <div className="AskHeader w-screen h-32 relative">
        <span className="text-2xl font-semibold absolute top-10 left-64">
          Ask a public question
        </span>
        <img
          className="max-w-md h-25 right-64 top-4 absolute"
          src={AnswersImg}
          alt="askPageImg"
        />
      </div>
      <div className="AskSubForm max-w-2xl h-screen ml-64">
        <div className=" bg-sky-50 max-w-2xl h-52 rounded-sm border-sky-200 border">
          <div className="ml-4 mt-4">Writing a good question</div>
          <div className="text-xs ml-4 mt-3">
            You’re ready to <span className="text-blue-500">ask</span> a{' '}
            <span className="text-blue-500">programming-related question</span>{' '}
            and this form will help guide you through the process. <br />
            Looking to ask a non-programming question? See{' '}
            <span className="text-blue-500">the topics here</span> to find a
            relevant site.
          </div>
          <br />
          <span className="text-xs font-medium ml-4 absolute top-[278px]">
            Steps
          </span>
          <br />
          <ul className="list-disc text-xs font-light ml-11 mt-[-17px]">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>
              Add “tags” which help surface your question to members of the
              community.
            </li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <form>
          <div className="bg-white max-w-2xl h-24 mt-3 rounded-sm border">
            <div className="mt-5 ml-5 text-xs font-medium">Title</div>
            <div className="text-xs font-light ml-5" required size="100">
              Be specific and imagine you’re asking a question to another
              person.
            </div>

            <input
              className="w-[90%] h-6 mt-1 ml-5 rounded-sm text-xs border  "
              type="text"
              placeholder="e.g.Is there an R function for finding the index of an element in a vector?"
              value={title}
              onChange={handlerChange}
            />
          </div>
          <div className="bg-white max-w-2xl h-72 mt-3 rounded-sm border">
            <div className="ml-5 mt-5 text-xs font-medium">
              What are the details of your problem?
            </div>
            <div className="text-xs font-light ml-5">
              Introduce the problem and expand on what you put in the title.
              Minimum 20 characters.
            </div>
            <TextEditor body={body} setBody={setBody} />
          </div>
          <Button onClick={handlerSubmit}>submit</Button>
        </form>
      </div>
    </>
  );
}

export default QuestionForm;
