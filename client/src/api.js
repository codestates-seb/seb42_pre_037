import axios from 'axios';

// questions GET 요청
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

// question GET 요청
export const fetchQuestion = async id => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/questions/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// question POST 요청
export const postQuestion = async pathData => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/questions`,
      pathData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          withCredentials: true,
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// question PATCH 요청
export const patchQuestion = async (id, pathData) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/questions/${id}`,
      pathData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          withCredentials: true,
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// question DELETE 요청
export const deleteQuestion = async id => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/questions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          withCredentials: true,
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// Answer GET 요청
export const fetchAnswers = async id => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/answers/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
};

// Answer POST 요청
export const postAnswerData = async (id, pathData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/answers/${id}`,
      pathData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          withCredentials: true,
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// Answer PATCH 요청
export const patchAnswer = async (id, pathData) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/answers/${id}`,
      pathData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          withCredentials: true,
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// Answer DELETE 요청
export const deleteAnswer = async id => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/answers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          withCredentials: true,
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
