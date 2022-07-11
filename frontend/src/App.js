import './App.css';
import React, {useEffect} from "react";
import Table1 from "./components/table"
import Footer from "./components/footer";
import Header from "./components/header";
import {fetchZones} from "./actions/zones";
import {useDispatch} from "react-redux";
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchZones());
    }, [])

    return (
        <Theme preset={presetGpnDefault}>
            <Header />
            <Table1 />
            <Footer />
        </Theme>
    );
}

export default App;
