import "./App.css";
import { useEffect, useState } from "react";
import Main from "./Main";
import { Route, Routes } from "react-router-dom";
import DomainInfo from "./components/Landing-Page/DomainInfo";
import Progressbar from "./components/Landing-Page/Progressbar";
import Teams from "../src/components/Teams/Teams";

function App() {
  const [a, setA] = useState(100);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (a) {
      setTimeout(() => {
        setA(a - 1);
      }, 20);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [a]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={loading ? <Progressbar value={100 - a} /> : <Main />}
        ></Route>
        <Route path="/domain/:domainId" element={<DomainInfo />}></Route>
        <Route path="/teams" element={<Teams />}></Route>
      </Routes>
    </>
  );
}

export default App;
