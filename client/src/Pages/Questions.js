import { useEffect, useState } from 'react';
import { BiFilter } from 'react-icons/bi';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import QuestionsItem from '../Components/QuestionsItem';
import Button from '../Components/UI/Button';
import dummyData from '../dummyData';

function Questions() {
  const [questions, setQuestions] = useState(dummyData.data);
  const [totalQuestion, setTotalElements] = useState(dummyData.pageInfo);
  // currentPage 초기값은 0으로 설정
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 10;
  // page 갯수 계산
  const pageCount = Math.ceil(totalQuestion.totalElements / PER_PAGE);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://test:8080/questions?page=${currentPage}&size=${PER_PAGE}`,
        );
        setQuestions(response.data);
        setTotalElements(response.pageInfo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, [currentPage]);
  // currentPage가 변경될 때 마다 API호출을 한다.

  const handlerPageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="flex items-end justify-between p-5">
        <h1 className="text-4xl">All Questions</h1>
        <Button size="large">Ask Question</Button>
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
          onPageChange={handlerPageClick}
          containerClassName="bg-blue-400"
          activeClassName="bg-blue-400"
        />
      </div>
    </>
  );
}

export default Questions;
