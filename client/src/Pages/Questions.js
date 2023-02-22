import { useEffect, useState } from 'react';
import { BiFilter } from 'react-icons/bi';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

import QuestionsItem from '../Components/QuestionsItem';
import Button from '../Components/Ui/Button';
import Nav from '../Components/layouts/Navbar';
import { dummyQuestions } from '../dummyData';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [totalQuestion, setTotalElements] = useState([]);
  // 1. currentPage 초기값은 0으로 설정
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 10;
  // 2. page 갯수 계산
  const pageCount = Math.ceil(totalQuestion / PER_PAGE);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://b7cb-121-177-26-57.jp.ngrok.io/questions?page=${currentPage}&size=${PER_PAGE}`,
        );
        setQuestions(response.data.data);
        setTotalElements(response.data.pageInfo.totalElements);
      } catch (error) {
        console.error(error);
        setQuestions(dummyQuestions.data);
        setTotalElements(10);
      }
    };
    fetchQuestions();
  }, [currentPage]);
  // 5. currentPage가 변경될 때 마다 API호출을 한다.

  // 4. 밑의 함수가 호출되면 setCurrentPage에 의해 CurrentPage 값을 변경
  const handlerPageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handlerChangeQuestion = () => {
    navigate('/question/ask');
  };
  return (
    <>
      <Nav />
      <div className="flex items-end justify-between p-5">
        <h1 className="text-4xl">All Questions</h1>
        <Button onClick={handlerChangeQuestion} size="large">
          Ask Question
        </Button>
      </div>

      <div className="flex items-end justify-between p-5 border-b-2">
        <h3 className="text-2xl">{totalQuestion.totalElements} questions</h3>
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
    </>
  );
}

export default Questions;
