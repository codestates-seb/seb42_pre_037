import { useNavigate, useLocation } from 'react-router-dom';
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
import { useIsUpdateAnswerStore } from '../Stores/useIsUpdateStore';
import { fetchQuestion, deleteQuestion, fetchAnswers } from '../api';
// import { useUserInfoStore } from '../Stores/userInfoStore';

function Question() {
  const navigate = useNavigate();
  const purify = DOMPurify(window);
  // const { userInfo } = useUserInfoStore(state => state);
  const { isLogin } = useIsLoginStore(state => state);
  const { isUpdate, setIsUpdate } = useIsUpdateAnswerStore(state => state);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState('');

  const timeDiff = getTimeDiffString(question.createdAt);
  const location = useLocation();
  const questionId = location.pathname.split('/')[2];

  const getQuestion = async id => {
    const response = await fetchQuestion(id);
    setQuestion(response.data);
  };

  const getAnswers = async id => {
    const response = await fetchAnswers(id);
    setAnswers(response.data);
  };

  const handlerDeleteQuestion = id => {
    deleteQuestion(id);
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
      handlerDeleteQuestion(questionId);
      setIsUpdate(true);
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
      getQuestion(questionId);
      getAnswers(questionId);
      setIsUpdate(false);
    }, 100);
  }, [isUpdate]);

  return (
    <div className="flex justify-center">
      <div className="flex xl:w-10/12 w-full">
        <Nav />
        <div className="p-5">
          <div className="flex items-start justify-between ">
            <h1 className=" text-3xl w-3/4">{question.title}</h1>
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
            <AnswersForm
              questionId={question.questionId}
              setIsUpdate={setIsUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Question;
