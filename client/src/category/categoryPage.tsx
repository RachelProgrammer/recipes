import { useParams, useLocation } from "react-router-dom";
import CategoryForm from "./categoryForm";

const CategoryPage = () => {
    const { categoryId } = useParams();
    const location = useLocation();

    if (location.pathname.includes("add")) {
        return <CategoryForm categoryId={categoryId} />;
    } else if (location.pathname.includes("edit")) {
        return <CategoryForm categoryId={categoryId} />;
    } else {
        return <p>404 Not Found</p>;
    }
};

export default CategoryPage;
