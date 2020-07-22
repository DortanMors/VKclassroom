import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import configureStore from './store/reducers'
import App from "./App";
import createRouter from './create-router';
import registerServiceWorker from './registerServiceWorker';

const router = createRouter();
const store  = configureStore(router);

router.start(()=>{
    ReactDOM.render((
            <Provider store={store}>
              <RouterProvider router={router}>
                  <App router={router}/>
              </RouterProvider>
          </Provider>
        ), document.getElementById("root"))
});

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}

registerServiceWorker();