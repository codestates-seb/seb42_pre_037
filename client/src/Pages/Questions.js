import { useEffect, useState } from 'react';
import { BiFilter } from 'react-icons/bi';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

import QuestionsItem from '../Components/question/QuestionsItem';
import Button from '../Components/Ui/Button';
import Nav from '../Components/layouts/Navbar';
import { useIsUpdateQuestionStore } from '../Stores/useIsUpdateStore';
import { fetchQuestions } from '../api';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [totalQuestion, setTotalElements] = useState([]);
  // 1. currentPage 초기값은 0으로 설정
  const [currentPage, setCurrentPage] = useState(0);
  const { isUpdate, setIsUpdate } = useIsUpdateQuestionStore(state => state);

  const PER_PAGE = 10;
  // 2. page 갯수 계산
  const pageCount = Math.ceil(totalQuestion / PER_PAGE);
  const navigate = useNavigate();

  const getQuestions = async () => {
    const response = await fetchQuestions(currentPage, PER_PAGE);
    setQuestions(response.data);
    setTotalElements(response.pageInfo.totalElements);
  };

  // 4. 밑의 함수가 호출되면 setCurrentPage에 의해 CurrentPage 값을 변경
  const handlerPageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handlerChangeQuestion = () => {
    navigate('/question/ask', { state: setIsUpdate });
  };

  useEffect(() => {
    setTimeout(() => {
      getQuestions();
      setIsUpdate(false);
    }, 100);
  }, [currentPage, isUpdate]);
  // 5. currentPage가 변경될 때 마다 API호출을 한다.

  return (
    <div className=" flex justify-center">
      <div className="flex xl:w-10/12 w-full">
        <Nav />
        <div className="flex flex-col w-full">
          <div className="question-header">
            <h1 className="text-4xl">All Questions</h1>
            <Button onClick={handlerChangeQuestion} size="large">
              Ask Question
            </Button>
          </div>

          <div className="question-header border-b-2">
            <h3 className="text-2xl">
              {totalQuestion.totalElements} questions
            </h3>
            <Button
              color="clear-blue"
              icon={<BiFilter />}
              iconClassName="text-2xl"
              size="small"
            >
              Filter
            </Button>
          </div>

          {/* Question list */}
          <div>
            <ul>
              {questions.map(question => (
                <QuestionsItem key={question.questionId} question={question} />
              ))}
            </ul>
          </div>

          {/* Pagination */}
          <div className="flex justify-center pt-5">
            <ReactPaginate
              previousLabel="prev"
              nextLabel="next"
              breakLabel="..."
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              // 3. pager가 바뀔 때 마다 handlerPageClick 함수 호출
              onPageChange={handlerPageClick}
              // 밑 props는 style을 위한 className 지정 해주는 역할
              containerClassName="flex space-x-2 p-2 m-4"
              activeClassName="orange"
              pageClassName="paginate-btn"
              previousClassName="paginate-btn"
              nextClassName="paginate-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
