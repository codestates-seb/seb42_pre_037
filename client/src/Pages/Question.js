import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

import avatar from '../Components/icons/avatar.png';
import Button from '../Components/Ui/Button';
import { getTimeDiffString } from '../utils';
import Nav from '../Components/layouts/Navbar';
import Answers from '../Components/answer/Answers';
import AnswersForm from '../Components/answer/AnswersForm';
import { useIsLoginStore } from '../Stores/loginStore';
import PTagButton from '../Components/Ui/PTagButton';
import { useQuestionIsUpdate } from '../Stores/isUpdate';
// import { useUserInfoStore } from '../Stores/userInfoStore';

function Question() {
  const navigate = useNavigate();
  const purify = DOMPurify(window);
  // const { userInfo } = useUserInfoStore(state => state);
  const { isLogin } = useIsLoginStore(state => state);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState('');
  const timeDiff = getTimeDiffString(question.createdAt);
  const location = useLocation();
  const questionId = location.pathname.split('/')[2];
  const { isUpdate, setIsUpdate } = useQuestionIsUpdate(state => state);

  const fetchQuestion = async id => {
    try {
      const response = await axios.get(
        `http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/questions/${id}`,
      );
      setQuestion(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAnswers = async id => {
    try {
      const response = await axios.get(
        `http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/answers/${id}`,
      );
      setAnswers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async id => {
    const response = await axios
      .delete(
        `http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/questions/${id}`,
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

  const handlerClickDelete = () => {
    if (window.confirm('Delete this post?')) {
      deletePost(questionId);
      navigate('/');
    }
  };

  const handlerClickEdit = () => {
    navigate('/question/:questionId/edit', {
      state: { question },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchQuestion(questionId);
      fetchAnswers(questionId);
    }, 100);
    setIsUpdate(false);
    console.log(isUpdate);
  }, [isUpdate]);

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
          <div
            dangerouslySetInnerHTML={{
              __html: purify.sanitize(question.content),
            }}
          />

          {/* Question footer */}
          <div className="mt-5 flex justify-between border-b">
            <div className="flex jus space-x-3 text-gray-500 ">
              <p>Share</p>
              {verifyLoginAndPostAuthorship(
                <PTagButton onClick={handlerClickEdit}>edit</PTagButton>,
              )}
              {verifyLoginAndPostAuthorship(
                <PTagButton onClick={handlerClickDelete}>delete</PTagButton>,
              )}
              <p>Follow</p>
            </div>
            <div className="p-2 w-48 rounded clear-blue mb-10">
              <div className="text-gray-500 text-sm">edit {timeDiff}</div>
              <div className="flex h-10">
                <img className="bg-white" src={avatar} alt="avatar" />
                <p className="h-blue ml-2 text-sm">{question.displayName}</p>
              </div>
            </div>
          </div>
          <div>
            {/* 답변 목록 */}
            <Answers answers={answers} isLogin={isLogin} />
            <AnswersForm questionId={question.questionId} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Question;
