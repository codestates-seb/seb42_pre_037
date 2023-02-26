import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import TextEditor from '../Ui/TextEditor';
import Button from '../Ui/Button';
import { postAnswerData } from '../../api';

import { useUserInfoStore } from '../../Stores/userInfoStore';
import { useIsLoginStore } from '../../Stores/loginStore';

function AnswersForm({ questionId, setIsUpdate }) {
  const [content, setContent] = useState();
  const { userInfo } = useUserInfoStore(state => state);
  const { isLogin } = useIsLoginStore(state => state);
  const navigate = useNavigate();
  const currentTime = new Date();

  const pathData = {
    content: '',
    memberId: null,
    createdAt: '',
  };

  const handlerPostAnswer = async (id, data) => {
    const response = await postAnswerData(id, data);
    console.log(response);
  };

  const handlerSubmit = e => {
    e.preventDefault();
    if (isLogin) {
      e.preventDefault();
      pathData.content = content.replaceAll('"', "'");
      pathData.memberId = userInfo.memberId;
      pathData.createdAt = currentTime.toString();
      handlerPostAnswer(questionId, pathData);
      setContent('');
      setIsUpdate(true);
    } else {
      alert('You need to Login.');
      navigate('/login');
    }
  };

  return (
    <form>
      <h1 className="text-3xl my-7">Your Answer</h1>
      <div className="mb-10">
        <TextEditor content={content} setContent={setContent} />
      </div>
      <Button onClick={handlerSubmit}>Post Your Answer</Button>
    </form>
  );
}

export default AnswersForm;
