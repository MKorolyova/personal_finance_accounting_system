import React  from 'react'
import {Routes,Route} from "react-router-dom";
import {Home} from "../pages/Home.tsx"
import {Transactions} from "../pages/Transactions.tsx"
import {Goals} from "../pages/Goals.tsx"
import {Analytics} from "../pages/Analytics.tsx"

export const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Transactions" element={<Transactions />} />
            <Route path="/Goals" element={<Goals />} />
            <Route path="/Analytics" element={<Analytics />}/>
        </Routes>
    )
}

