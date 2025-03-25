import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './user/loginForm';
import SignupForm from './user/signupForm';
import DisplayRecipe from './recipe/displayRecipe';
import GetAllRecipes from './recipe/getAllRecipes';
import CategoriesPage from './category/categoriesPage'
import { AddOrEditRecipe } from './recipe/addRecipe';
import GetAllShoppint from './shoppingBag/getAllShoping';
import EditShoppingList from './shoppingBag/editShoppingList';
import { useStore } from './store/storeContext';
import { Fragment } from 'react/jsx-runtime';
import RecipePage from './recipe/recipePage';
import CategoryPage from './category/categoryPage';
import Header from './components/header';
import { AppRoutes } from './components/appRoutes';
import { useEffect } from 'react';

export const App = () => {
  const store = useStore();

  useEffect(() => {
    store.auth.autoLogin();
  }, [])

  return (
    <Fragment>
      <Header />
      <div className="body">
        <div className="app-container">
          <AppRoutes />
        </div>
      </div>
    </Fragment>
  );
}

