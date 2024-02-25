import React from 'react'
import ReactDOM from 'react-dom/client'
import './src/fonts/fonts.css'
import {BrowserRouter} from 'react-router-dom'
import './src/styles.css'
import {Provider} from "react-redux";
import {store} from "./src/store/store";
import Main from "./src/components/Main";
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Main/>
        </Provider>
    </BrowserRouter>
)