import { Route, Routes } from "react-router"
import { Fragment } from "react/jsx-runtime"
import { AddOrEditRecipe } from "../recipe/addRecipe"
import GetAllShoppint from "../shoppingBag/getAllShoping"
import EditShoppingList from "../shoppingBag/editShoppingList"
import CategoryPage from "../category/categoryPage"
import CategoriesPage from "../category/categoriesPage"
import RecipePage from "../recipe/recipePage"
import GetAllRecipes from "../recipe/getAllRecipes"
import SignupForm from "../user/signupForm"
import LoginForm from "../user/loginForm"
import { useStore } from "../store/storeContext"
import { observer } from "mobx-react-lite"



export const AppRoutes = observer(() => {

    const store = useStore();
    const user = store.auth.user;

    return (
        <Fragment>
            <Routes>
                {/* <Route path="/" element={<HomePage />} />
                <Route path="/homepage" element={<HomePage />} /> */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                {/* <Route path="/displayRecipe" element={<Recipe />} /> */}

                {/* recipes */}
                {user && <Route path="/recipes" element={<GetAllRecipes />} />}
                {user && <Route path="/recipe/add" element={<RecipePage />} />}
                {user && <Route path="/recipe/view/:recipeId" element={<RecipePage />} />}
                {user && <Route path="/recipe/edit/:recipeId" element={<RecipePage />} />}

                {/* categories */}
                {user && <Route path="/categories" element={<CategoriesPage />} />}
                {user && <Route path="/category/add" element={<CategoryPage />} />}
                {user && <Route path="/category/view/:categoryId" element={<CategoryPage />} />}
                {user && <Route path="/category/edit/:categoryId" element={<CategoryPage />} />}

                {/* <Route path="/displayRecipe" element={<Recipe />} /> */}
                {/* <Route path="/addRecipe" element={<AddOrEditRecipe mode='add' />} /> */}
                {/* <Route path="/getAllRecipes" element={<GetAllRecipes />} /> */}
                {/* <Route path="/getAllCategory" element={<GetAllCategory />} />
                <Route path="/addCategory" element={<AddCategory />} /> */}
                {/* <Route path="/deleteRecipe" element={<DeleteRecipe />} /> */}
                {user && <Route path="/edit" element={<AddOrEditRecipe mode='edit' />} />}
                {user && <Route path="/getAllShoping" element={<GetAllShoppint />} />}
                {user && <Route path="/editShoppingList" element={<EditShoppingList />} />}

            </Routes>
        </Fragment>
    )
});