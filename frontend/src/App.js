import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useUser } from './context/index';

import UnAuthorized from './Layout/UnAuthorized';
import Authorized from './Layout/Authorized.jsx';
import Error from './Layout/Error.jsx';

import BackgroundImage from './assets/background.jpg';
import MobileBg from './assets/mobileBg.webp';
import Camera from './assets/camera.svg';
import { useEffect } from 'react';

function App() {
  const { isAuth } = useUser();

  useEffect(() => {
    console.log('Is Auth', isAuth);
  }, [isAuth])

  return (
    <div className="w-full h-[100vh] relative overflow-hidden flex justify-center items-center">
      <img
        src={BackgroundImage}
        alt="background_img"
        className="w-full h-full object-cover fixed z-0"
      />
      <div className="w-full h-full bg-black opacity-60 fixed z-10"></div>

      {/* Main Screen */}
      <div className="relative z-20 flex justify-center items-start w-[80%] md:w-[30%] lg:w-[20%] h-[85%] mobile-frame overflow-hidden">
        <img
          src={MobileBg}
          alt="wallpaper"
          className="absolute inset-0 z-30 object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-40 bg-black opacity-50"></div>
        <img
          src={Camera}
          alt="camera"
          className="absolute z-50 top-2"
          width={70}
        />
        {/* Content Section */}
        <div className="absolute inset-0 z-40 flex flex-col p-2 rounded-3xl">
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
    </div>
  );
}

export default App;
