import axios from 'axios';

console.log(process.env.REACT_APP_API_URL);

export const fetchQuestions = async (currentPage, perPage) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/questions?page=${currentPage}&size=${perPage}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      data: [],
      pageInfo: { totalElements: 10 },
      // axios.get() 함수 호출에 실패한 경우에 대비한 예외 처리
    };
  }
};
