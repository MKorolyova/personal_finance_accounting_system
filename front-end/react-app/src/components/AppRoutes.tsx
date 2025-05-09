import React  from 'react'
import {Routes,Route} from "react-router-dom";
import {HomePrivate} from "../pages/HomePrivate.tsx"
import {HomePublic} from "../pages/HomePublic.tsx"
import {Transactions} from "../pages/Transactions.tsx"
import {Goals} from "../pages/Goals.tsx"
import {Analytics} from "../pages/Analytics.tsx"
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

let hasShownToast = false;

//     const response = await getUser();
//     if (response.status === 401) {
//       localStorage.removeItem("access_token");
//     } else {
//       setIsAuthenticated(true);
//     }

const PrivateRoute = ({  children }: {  children: React.ReactNode }) => {
  const location = useLocation();

  const access_token = localStorage.getItem("access_token");
  console.log(access_token)
  if (!access_token) {
   if (!hasShownToast) {
      toast.error('Please log in to access this page.');
      hasShownToast = true;

      setTimeout(() => {
        hasShownToast = false;
      }, 1000);
   }
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};


export const AppRoutes = () => {
  return (
    <Routes>

        <Route path="/" element={<HomePublic />} />

        <Route path="/Transactions" element={
            <PrivateRoute>
                <Transactions />
            </PrivateRoute>
        }/>

        <Route path="/Goals" element={
            <PrivateRoute>
                <Goals />
            </PrivateRoute>
        }/>

        <Route path="/Analytics" element={
            <PrivateRoute>
                <Analytics />
            </PrivateRoute>
        }/>


      <Route path="/Home" element={
            <PrivateRoute>
            <HomePrivate />
            </PrivateRoute>
        }/>        




    </Routes>
  );
};



