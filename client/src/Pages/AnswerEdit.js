import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import TextEditor from '../Components/Ui/TextEditor';
import Button from '../Components/Ui/Button';
import { patchAnswer } from '../api';

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
    <div>
      <form>
        <h3>Body</h3>
        <TextEditor content={body} setContent={setBody} />
        <Button className="mt-20" onClick={handlerSubmit}>
          Save edits
        </Button>
      </form>
    </div>
  );
}

export default AnswerEdit;
