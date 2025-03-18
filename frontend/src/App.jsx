// import { useState, useEffect } from "react";
// import axios from "axios";
import Sidebar from "./components/SideBar";
import ContainContents from "./components/ContainContents";
import "./App.css"

import NewestNews from "./functions/NewestNews";

export default function App() {
  

  return (
    <div className="">
      <div className="app">
        <Sidebar />
        <NewestNews/>
      </div>
      
    </div>
  );
}
