import {useEffect} from "react";
import Sidebar from "./components/SideBar/SideBar.jsx";
import NewestNews from "./components/NewestNews/NewestNews.jsx";
import SearchNews from "./components/SearchNews/SearchNews.jsx";
import CategoryNews from "./components/CategoryNews/CategoryNews.jsx"
import {FunctionProvider, useFunctionContext} from "./context/FunctionContext";
import "./App.css";
import {FUNCTION_NAMES} from "./constants";

function AppContent() {
    const {currentFunc} = useFunctionContext();

    useEffect(() => {
        sessionStorage.setItem("currentFunc", currentFunc);
    }, [currentFunc]);

    const renderComponent = {
        [FUNCTION_NAMES.NEWS]: <NewestNews/>,
        [FUNCTION_NAMES.SEARCH]: <SearchNews/>,
        [FUNCTION_NAMES.CATEGORY]: <CategoryNews/>,
    };

    return (
        <div className="app">
            <Sidebar currentFunc={currentFunc}/>
            {renderComponent[currentFunc] || null}
        </div>
    );
}

export default function App() {
    return (
        <FunctionProvider>
            <AppContent/>
        </FunctionProvider>
    );
}
