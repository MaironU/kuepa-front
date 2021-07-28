import React from 'react';
import {
    Route,
    Switch,
    BrowserRouter,
    Redirect
} from 'react-router-dom';
import { isAuthenticated } from '../Utils/helper'
import PageLogin from '../pages/pageLogin/index';
import PageRegister from '../pages/pageRegister/index';
import PageDashboard from '../pages/pageDashboard/index'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Router = () => {
    const RoutePrivate = (props)=> (
        isAuthenticated() ?
        <Route {...props} />
        :<Redirect to="/login" />
    )


    return (
        <>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path={'/login'}>
                        <PageLogin />
                    </Route>
                    <Route exact path={'/register'}>
                        <PageRegister />
                    </Route>
                    <RoutePrivate exact path="/">
                      <PageDashboard />
                    </RoutePrivate>
                </Switch>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default Router;
