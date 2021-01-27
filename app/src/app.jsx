import React from "react"
import { Drizzle } from "@drizzle/store"
import { drizzleReactHooks } from "@drizzle/react-plugin"
import drizzleOptions from "./drizzle"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import LoadingContainer from "./components/containers/Loading"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Category from "./components/pages/category"
import CategoryType from "./components/pages/categoryType"
import AllCategory from "./components/pages/allCategory"
import store from "./middleware"
import "./index.css"

const drizzle = new Drizzle(drizzleOptions, store)
const { DrizzleProvider } = drizzleReactHooks

const App = () => {
  return (
    <DrizzleProvider drizzle={drizzle}>
      <LoadingContainer>
        <ToastContainer />
        <BrowserRouter>
          <Switch>
            <Redirect from="/" to="/category/type" exact />
            <Route path="/category/type" exact component={CategoryType} />
            <Route path="/category" exact component={Category} />
            <Route path="/category/all" exact component={AllCategory} />
          </Switch>
        </BrowserRouter>
      </LoadingContainer>
    </DrizzleProvider>
  )
}

export default App
