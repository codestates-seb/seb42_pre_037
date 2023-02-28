import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import TextEditor from '../Components/Ui/TextEditor';
import Button from '../Components/Ui/Button';
import { patchAnswer } from '../api';
import Nav from '../Components/layouts/Navbar';

function AnswerEdit() {
  const location = useLocation();
  const { answer } = location.state;
  const currentTime = new Date().toString();
  const navigate = useNavigate();
  const { answerId } = answer;

  const pathData = {
    content: '',
    modifiedAt: '',
  };

  const [body, setBody] = useState(answer.content);

  const handlerPatchAnswer = async (id, data) => {
    const response = await patchAnswer(id, data);
    console.log(response);
  };

  const handlerSubmit = e => {
    e.preventDefault();
    pathData.content = body;
    pathData.modifiedAt = currentTime;
    handlerPatchAnswer(answerId, pathData);
    navigate(-1);
  };

  return (
    <div className="flex xl:w-10/12 w-full">
      <Nav />
      <form className="p-5">
        <h3>Body</h3>
        <TextEditor content={body} setContent={setBody} />
        <div className="mt-5">
          <Button onClick={handlerSubmit}>Save edits</Button>
        </div>
      </form>
    </div>
  );
}

export default AnswerEdit;
