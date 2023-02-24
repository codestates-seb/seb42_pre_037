import { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import TextEditor from './Ui/TextEditor';
import Button from './Ui/Button';

import { useUserInfoStore } from '../Stores/userInfoStore';
import { useIsLoginStore } from '../Stores/loginStore';

function AnswersForm({ questionId }) {
  const pathData = {
    content: '',
    memberId: null,
    createdAt: '',
  };

  const [content, setContent] = useState();
  const { userInfo } = useUserInfoStore(state => state);
  const { isLogin } = useIsLoginStore(state => state);
  const navigate = useNavigate();
  // 'http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/
  const pathQuestionData = async () => {
    const response = await axios
      .post(
        `http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/answers/${questionId}`,
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
    if (isLogin) {
      e.preventDefault();
      pathData.content = content.replaceAll('"', "'");
      pathData.memberId = userInfo.memberId;
      const currentTime = new Date();
      pathData.createdAt = currentTime.toString();
      pathQuestionData();
    } else {
      alert('You need to Login.');
      navigate('/login');
    }
  };

  return (
    <form>
      <h1 className="text-3xl w-4/5 my-7">Your Answer</h1>
      <div className="mb-10">
        <TextEditor content={content} setContent={setContent} />
      </div>
      <Button onClick={handlerSubmit}>Post Your Answer</Button>
    </form>
  );
}

export default AnswersForm;
