import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserInfoStore } from '../Stores/userInfoStore';
import { useIsLoginStore } from '../Stores/loginStore';
import { postQuestion } from '../api';
import AnswersImg from '../Components/icons/AnswersImg.png';
import TextEditor from '../Components/Ui/TextEditor';
import Button from '../Components/Ui/Button';
import Card from '../Components/Ui/Card';
import Input from '../Components/Ui/Input';

function QuestionForm() {
  const { userInfo } = useUserInfoStore(state => state);
  const { isLogin } = useIsLoginStore(state => state);

  const pathData = {
    title: '',
    content: '',
    memberId: null,
    createdAt: '',
  };

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handlerChange = e => {
    setTitle(e.target.value);
  };

  const handlerPostQuestion = async data => {
    const response = await postQuestion(data);
    console.log(response);
  };

  const handlerSubmit = e => {
    if (isLogin) {
      e.preventDefault();
      const currentTime = new Date();

      pathData.title = title;
      pathData.content = body;
      pathData.memberId = userInfo.memberId;
      pathData.createdAt = currentTime.toString();

      handlerPostQuestion(pathData);
      // setIsUpdate(true);
      navigate('/');
    } else {
      alert('You need to Login.');
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-between w-full p-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl">Ask a public question</h1>
        <img className="h-32" src={AnswersImg} alt="askPageImg" />
      </div>

      <Card className="bg-[#EBF4FB] border border-[#B8D8F0] mb-5">
        <div>
          <h2 className=" text-2xl">Writing a good question</h2>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-5">
        <h3 className="text-lg">Title</h3>
        <p className="text-sm">
          Be specific and imagine you’re asking a question to another person.
        </p>
        <Input
          value={title}
          onChange={handlerChange}
          placeholder="e.g.Is there an R function for finding the index of an element in a vector?"
        />
      </Card>

      <form>
        <Card>
          <h3 className="text-lg">What are the details of your problem?</h3>
          <p className="text-sm mb-2">
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </p>
          <TextEditor content={body} setContent={setBody} />
        </Card>
        <div className="py-4">
          <Button onClick={handlerSubmit}>submit</Button>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;
