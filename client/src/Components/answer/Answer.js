import axios from 'axios';

import PTagButton from '../Ui/PTagButton';
import avatar from '../icons/avatar.png';
import { useIsLoginStore } from '../../Stores/loginStore';

function Answer({ answer }) {
  const { isLogin } = useIsLoginStore(state => state);

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
        `http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/answers/${answer.answerId}`,
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
    }
  };

  return (
    <li key={answer.answerId} className="py-6 border-b">
      <p className="mb-5">{answer.content}</p>
      <div className="flex justify-between">
        <div className="flex jus space-x-3 text-gray-500 ">
          <p>Share</p>
          {verifyLoginAndPostAuthorship(<p>edit</p>)}
          {verifyLoginAndPostAuthorship(
            <PTagButton onClick={handlerClickDelete}>delete</PTagButton>,
          )}
          <p>Follow</p>
        </div>
        <div className="mt-3">
          {/* <div className="text-gray-500 text-sm">edit {timeDiff}</div> */}
          <div className="flex h-10">
            <img className="bg-white" src={avatar} alt="avatar" />
            <p className="h-blue ml-2 text-sm">{answer.displayName}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
export default Answer;
