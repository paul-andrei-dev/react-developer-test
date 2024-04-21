import * as React from 'react';
import {FC} from "react";
import HomeContainer from "./containers/HomeContainer";
import {Provider} from "react-redux";
import {store} from "./redux/store";

export const App: FC = () => {

    return (
        <Provider store={store}>
            <HomeContainer/>
        </Provider>
    );
};

export default App;
