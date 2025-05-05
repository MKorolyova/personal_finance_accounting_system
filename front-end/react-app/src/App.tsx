import React  from 'react';
import './App.css';
import {Header} from "./components/Header.tsx"
import {Navigation} from "./components/Navigation.tsx"
import {Footer} from "./components/Footer.tsx"
import {AppRoutes} from "./components/AppRoutes.tsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      < Header />
      <ToastContainer aria-label="notification" />
      < AppRoutes />
      < Footer />
    </div>
  );
}

export default App;
