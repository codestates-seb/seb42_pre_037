import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextEditor from '../Components/Ui/TextEditor';
import Button from '../Components/Ui/Button';

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

  const pathAnswerData = async id => {
    const response = await axios
      .patch(
        `http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/answers/${id}`,
        pathData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            withCredentials: true,
          },
        },
      )
      .catch(error => {
        console.error(error);
      });
    if (response && response.data) {
      console.log(response);
    }
  };

  const handlerSubmit = e => {
    e.preventDefault();
    pathData.content = body;
    pathData.modifiedAt = currentTime;
    pathAnswerData(answerId);
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
