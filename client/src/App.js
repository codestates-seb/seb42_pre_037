import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Questions from './Pages/Questions';
import Question from './Pages/Question';
import QuestionForm from './Pages/QuestionForm';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Test from './Pages/Test';
import Mainlayout from './Components/layouts/Mainlayout';


function App() {
  return (
   
    
   <BrowserRouter>  
    <Mainlayout/>
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="question" element={<Question />} />
        <Route path="questionForm" element={<QuestionForm />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
