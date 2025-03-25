import { Link } from "react-router-dom";
import { useStore } from "../store/storeContext";
import { observe } from "mobx";
import { observer } from "mobx-react-lite"
import { he } from "../resources/he";

const r = he.header;

// import { useSelector } from "react-redux";
const Header = observer(() => {
  // const user = useSelector(state => state.user);
  const store = useStore();
  const user = store.auth.user;

  return (
    <div className="header">
      <div className="link-container">
        <Link to="/homepage" className="link">{r.homepage}</Link>
        {!user && <Link to="/signup" className="link">{r.signup}</Link>}
        {!user && <Link to="/login" className="link">{r.signin}</Link>}
        {user && <Link to="/recipes" className="link">{r.recipes}</Link>}
        {user && <Link to="/recipe/add" className="link">{r.add_recipe}</Link>}
        {/* <Link to="/editRecipe">Edit Recipe</Link><br /> */}
        {/* <Link to="/deleteRecipe">Deleting a recipe</Link><br /> */}
        {user && <Link to="/categories" className="link">{r.categories}</Link>}
        {user && <Link to="/category/add" className="link">{r.add_category}</Link>}
        {user && <Link to="/getAllShoping" className="link">{r.shopping_bag}</Link>}
      </div>
    </div>
  );


});
export default Header;