import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import { Provider } from 'react-redux';
import AppAlertError from 'components/Application/AppAlertError';
import store from './configs/redux';
import { SideLeft } from './components/SideBar';
import { Header } from './components/Header';
import { Layout, Footer } from './app-ui';
import routes from './configs/routes';
import 'configs/app';


const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Layout>
                        <AppAlertError />
                        <Header />
                        <Layout>
                            <SideLeft />
                            <Switch>
                                {
                                    routes.map((route) => {
                                        return (
                                            <Route
                                                exact
                                                path={route.path}
                                                component={route.component}
                                                key={route.path}
                                            />
                                        );
                                    })
                                }
                            </Switch>
                        </Layout>
                        <Footer />
                    </Layout>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
