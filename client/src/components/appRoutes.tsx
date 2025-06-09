import { Route, Routes, useLocation, useNavigate } from "react-router"
import { observer } from "mobx-react-lite"
import CategoriesGallery from "../category/categoriesGallery"
import RecipePage from "../recipe/recipePage"
import RecipeGallery from "../recipe/recipeGallery"
import ShoppingList from "../shoppingBag/shoppingList"
import { useStore } from "../store/storeContext"
import { HomePage } from "./homePage"
import { useEffect } from "react"
import SignInForm from "../user/signInForm"
import SignUpForm from "../user/signUpForm"

export const AppRoutes = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/")
            navigate("/homepage")
    }, [location, navigate])

    const store = useStore();
    const user = store.auth.user;

    return (
        <Routes>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />

            {/* recipes */}
            {user && <Route path="/recipes" element={<RecipeGallery />} />}
            {user && <Route path="/recipes/:recipeId/view" element={<RecipePage isEditMode={false} />} />}
            {user && <Route path="/recipes/:recipeId/edit" element={<RecipePage isEditMode={true} />} />}

            {/* categories */}
            {user && <Route path="/categories" element={<CategoriesGallery />} />}
    
            {/* shopping bag */}
            {user && <Route path="/shoppingBag" element={<ShoppingList />} />}

        </Routes>
    )
});