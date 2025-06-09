import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/storeContext";
import { useLang } from "../resources/langContext";
import { toast } from "react-toastify";

const AppHeader = observer(() => {
  const store = useStore();
  const user = store.auth.user;

  const { r, toggleLang, lang } = useLang();

  const navigate = useNavigate();

  const signOut = () => {
    store.auth.signOut();
    toast.success(r.auth.signout_sucess);
    navigate("/homepage")
  }

  return (
    <div className="header bg-red-500 justify-between px-10 items-center flex">
      <div className="gap-x-7 flex justify-between items-center font-bold text-lg">
        {!user && <Link to="/signin" className="link">{r.header.signin} / {r.header.signup}</Link>}
        <Link to="/homepage" className="link">{r.header.homepage}</Link>
        {user && <Link to="/recipes" className="link">{r.header.recipes}</Link>}
        {user && <Link to="/categories" className="link">{r.header.categories}</Link>}
        {user && <Link to="/shoppingBag" className="link">{r.header.shopping_bag}</Link>}
      </div>
      <div className="link-container flex gap-x-10 items-center">
        {user && <span onClick={signOut} className="h-[40px] flex justify-center items-center font-bold text-lg cursor-pointer link ignore-print">
          {r.header.signout}
        </span>}
        <button onClick={toggleLang} className="h-[40px] w-[40px] rounded-[40px] btn-light flex justify-center items-center font-bold uppercase hover:bg-slate-200 hover:transition-colors">
          {lang}
        </button>
        <img src="/logo.png" className="logo-img h-[8vh]" alt="logo" />
      </div>
    </div>
  );


});
export default AppHeader;