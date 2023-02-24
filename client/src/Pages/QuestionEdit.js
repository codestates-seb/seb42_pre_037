import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Input from '../Components/Ui/Input';
import TextEditor from '../Components/Ui/TextEditor';
import Button from '../Components/Ui/Button';

function QuestionEdit() {
  const location = useLocation();
  const { question } = location.state;
  const currentTime = new Date().toString();

  const pathData = {
    content: '',
    modifiedAt: '',
  };

  const [title, setTitle] = useState(question.title);
  const [body, setBody] = useState(question.content);

  const handlerChangeTitle = e => {
    setTitle(e.target.value);
  };

  const pathQuestionData = async () => {
    const response = await axios
      .patch(
        `http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/questions/${question.questionId}`,
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
  console.log(body);
  const handlerSubmit = e => {
    e.preventDefault();
    pathData.content = body;
    pathData.modifiedAt = currentTime;
    pathQuestionData();
  };

  return (
    <div>
      <form>
        <Input
          disabled
          label="Title"
          id="title"
          value={title}
          onChange={handlerChangeTitle}
        />
        <h3>Body</h3>
        <TextEditor content={body} setContent={setBody} />
        <Button className="mt-20" onClick={handlerSubmit}>
          Save edits
        </Button>
      </form>
    </div>
  );
}

export default QuestionEdit;
