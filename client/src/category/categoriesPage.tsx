import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
import Header from "../components/header"
import { useStore } from "../store/storeContext"
import { observer } from "mobx-react-lite"
const CategoriesPage = observer(() => {

  const navigate = useNavigate();
  const store = useStore();
  const categories = store.category.categories;
  // const [categories, setCategories] = useState<{ Id: string, Name: string }[]>([]);

  useEffect(() => {
    store.category.fetchCategory();
  }, [])
  // useEffect(() => {
  //   axios.get<Category[]>("http://localhost:8080/api/category")
  //     .then(x => {
  //       setCategories(x.data)
  //       console.log("a", x.data)
  //       store.setCategories(x.data);
  //     })
  //     .catch(err => console.log(err))
  //     .finally()
  // }, [])


  const addCategory = () => {
    navigate("/category/add")
  }
  
  const setCategory = (cid: string) => {
    navigate(`/setCategory/${cid}`);
  }

  return (
    <>

      <div className="categories" style={{height: "80%", overflowY: "auto", width: "80%"}}>
        <h3 style={{ color: "rgb(232,100,100)" }} onClick={() => { addCategory() }} className="bg-white text-center w-50 mx-auto mt-4 rounded-20">הכול</h3>
        {categories?.map((category) => (
          <div key={category.Id} className="w-50 mx-auto">
            <h3 style={{ color: "rgb(232,100,100)" }} onClick={() => { setCategory(category.Id) }} className="bg-white text-center mt-4 rounded-20 rounded-bottom-lg rounded-top-sm"
            >
              {category.Name}
            </h3>
          </div>
        ))}
      </div></>
  );
});

export default CategoriesPage;