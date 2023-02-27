import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Input from '../Components/Ui/Input';
import TextEditor from '../Components/Ui/TextEditor';
import Button from '../Components/Ui/Button';
import { patchQuestion } from '../api';
import Nav from '../Components/layouts/Navbar';

function QuestionEdit() {
  const location = useLocation();
  const { question } = location.state;
  const currentTime = new Date().toString();
  const navigate = useNavigate();
  const { questionId } = question;

  const pathData = {
    content: '',
    modifiedAt: '',
  };

  const [title, setTitle] = useState(question.title);
  const [body, setBody] = useState(question.content);

  const handlerPatchQuestion = async (id, data) => {
    const response = await patchQuestion(id, data);
    console.log(response);
  };

  const handlerChangeTitle = e => {
    setTitle(e.target.value);
  };

  const handlerSubmit = e => {
    e.preventDefault();
    pathData.content = body;
    pathData.modifiedAt = currentTime;
    handlerPatchQuestion(questionId, pathData);
    navigate(-1);
  };

  return (
    <div className="flex xl:w-10/12 w-full">
      <Nav />
      <form className="p-5">
        <Input
          disabled
          label="Title"
          id="title"
          value={title}
          onChange={handlerChangeTitle}
        />
        <h3>Body</h3>
        <TextEditor content={body} setContent={setBody} />
        <div className="mt-5">
          <Button onClick={handlerSubmit}>Save edits</Button>
        </div>
      </form>
    </div>
  );
}

export default QuestionEdit;
