import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useUser } from './context/index';

import UnAuthorized from './Layout/UnAuthorized';
import Authorized from './Layout/Authorized.jsx';
import Error from './Layout/Error.jsx';

import BackgroundImage from './assets/background.jpg';
import Camera from './assets/camera.svg';

function App() {
  const { isAuth } = useUser();

  return (
    <div className="w-full h-[100vh] relative overflow-hidden flex justify-center items-center">
      <img
        src={BackgroundImage}
        alt="background_img"
        className="w-full h-full object-cover fixed z-0"
      />
      <div className="w-full h-full bg-black opacity-60 fixed z-10"></div>

      {/* Main Screen */}
      <div className="relative z-20 w-[80%] md:w-[30%] lg:w-[20%] h-[80%] mobile-frame overflow-hidden flex justify-center items-start">
        <img src={Camera} alt="camera" className='absolute z-30 top-2' width={70} />
        <Routes>
          {isAuth ? (
            <Route path="/" element={<Authorized />} />
          ) : (
            <Route path="/" element={<UnAuthorized />} />
          )}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
