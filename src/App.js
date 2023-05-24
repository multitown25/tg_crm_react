import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
// import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import CategoryList from "./components/CategoryList/CategoryList";
import PositionList from "./components/PositionList/PostitionList";
// import Form from "./components/Form/Form";

function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            <Routes>
                <Route index element={<CategoryList />}/>
                <Route path={'position/:id'} element={<PositionList />}/>
            </Routes>
        </div>
    );
}

export default App;