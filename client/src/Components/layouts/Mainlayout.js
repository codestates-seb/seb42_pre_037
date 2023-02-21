import Header from './Header';
import Navbar from './Navbar';

function Mainlayout({ children }) {
  return (
    <div>
      <Header />
      <Navbar />
      {children}
    </div>
  );
}
export default Mainlayout;
