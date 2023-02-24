import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Button from '../Components/Ui/Button';
import { getTimeDiffString } from '../utils';
import { dummyAnswers } from '../dummyData';
import Nav from '../Components/layouts/Navbar';
import Answers from '../Components/answer/Answers';
import AnswersForm from '../Components/answer/AnswersForm';
import { useIsLoginStore } from '../Stores/loginStore';
import PTagButton from '../Components/Ui/PTagButton';
// import { useUserInfoStore } from '../Stores/userInfoStore';

function Question() {
  const navigate = useNavigate();
  const location = useLocation();

  const { question } = location.state;
  // const { userInfo } = useUserInfoStore(state => state);
  const [answers] = useState(dummyAnswers.data);
  const timeDiff = getTimeDiffString(question.createdAt);
  const { isLogin } = useIsLoginStore(state => state);

  const handlerChangeQuestion = () => {
    navigate('/question/ask');
  };

  const verifyLoginAndPostAuthorship = tag => {
    // if (isLogin && question.displayName === userInfo.displayName) {
    //   return tag;
    // }
    // return '';
    if (isLogin) {
      return tag;
    }
    return '';
  };

  const deletePost = async () => {
    const response = await axios
      .delete(
        `http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/questions/${question.questionId}`,
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

  const handlerClickDelete = () => {
    if (window.confirm('Delete this post?')) {
      deletePost();
      navigate('/');
    }
  };

  return (
    <div className="flex flex-row flex-auto flex-nowrap w-[100vw]">
      <div className="flex mx-auto my-0 w-10/12">
        <Nav />
        <div className="p-5 mt-16 mr-[10rem]">
          <div className="flex items-start justify-between ">
            <h1 className="text-3xl w-4/5">{question.title}</h1>
            <Button onClick={handlerChangeQuestion} size="large">
              Ask Question
            </Button>
          </div>
          <div className="flex space-x-2 py-3 border-b mb-4">
            <p className="text-gray-400">Asked</p>
            <p>{timeDiff}</p>
          </div>

          {/* Question content */}
          <div>{question.content}</div>

          {/* Question footer */}
          <div className="mt-5 flex justify-between border-b">
            <div className="flex jus space-x-3 text-gray-500 ">
              <p>Share</p>
              {verifyLoginAndPostAuthorship(<p>edit</p>)}
              {verifyLoginAndPostAuthorship(
                <PTagButton onClick={handlerClickDelete}>delete</PTagButton>,
              )}
              <p>Follow</p>
            </div>
            <div className="p-2 w-48 rounded clear-blue mb-10">
              <div className="text-gray-500 text-sm">edit {timeDiff}</div>
              <div className="flex h-10">
                <img className="bg-white" src="img/avatar.png" alt="avatar" />
                <p className="h-blue ml-2 text-sm">{question.displayName}</p>
              </div>
            </div>
          </div>
          <div>
            {/* 답변 목록 */}
            <Answers answers={answers} />
            <AnswersForm questionId={question.questionId} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Question;
