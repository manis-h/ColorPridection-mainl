import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Components/Home";
import FreeGame from "../Components/Iframe";
import BetPage from "../Components/BetPage";
import RegisterForm from "../Components/Regester";
import Refral from "../Components/Refral";
import Withdraw from "../Components/Withdraw";
import Deposit from "../Components/Deposit";
import ChangePassword from "../Components/ChangePassword";
import BetPage5mint from "../Components/BetPage5mint";
import BetPagefive from "../Components/BetPagefive";


export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:name" element={<FreeGame />} /> 
      <Route path="/betpage" element={<BetPage/>}/>
      <Route path="/betpagefive" element={<BetPagefive/>}/>
      <Route path="/regester" element={<RegisterForm/>}/>
      <Route path="/reffercode" element={<Refral/>}/>
      <Route path="/withdraw" element={<Withdraw/>}/>
      <Route path="/deposit" element={<Deposit/>}/>
      <Route path="/change-password" element={<ChangePassword/>}/>


     

    </Routes>
  );
};
