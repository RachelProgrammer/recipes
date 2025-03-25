

import { useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router"
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Header from "../components/header"
import { useStore } from "../store/storeContext"

const GetAllShoppint = () => {
  const navig = useNavigate()
  const store = useStore();
  const shoppingList = store.shoppingBag.shoppingBag;
  const user = store.auth.user;

  useEffect(() => {
    // FETCH SHOPPING BAG

    // axios.get(`http://localhost:8080/api/bay/${user?.Id}`)
    //   .then(x => {
    //     store.setShoppingList(x.data);
    //   })
    //   .catch(err => console.log(err))
    //   .finally()
  }, [])


  const deleted = (product: any) => {
    axios.post(`http://localhost:8080/api/bay/delete${user?.Id}`, { UserId: user!.Id, Id: product.Id, Name: product.Name, Count: product.Count })
      // .then(x => {
      //   store.setShoppingList(x.data);
      // })
      // .catch(err => console.log(err))
      // .finally()
  }
  const nav = (shopping: any) => {
    navig("/editShoppingList", { state: shopping })
  }


  return (
    <div>
      <div className="notpizaBackground">
        {shoppingList?.map((shopping: any) => (
          <p key={shopping?.Id}>
            <h2 style={{ color: "rgb(232,100,100)" }}>{shopping?.Name}</h2>
            <h3 style={{ color: "rgb(232,100,100)" }}>{shopping?.Count}</h3>
            <Button variant="outline-danger" onClick={() => deleted(shopping)}>-</Button>
            {/* <button onClick={()=>edit(shopping)}>edit</button> */}
            <Button variant="outline-danger" onClick={() => nav(shopping)}>edit</Button>

            <br />
          </p>
        ))}
      </div>
    </div>

  )
}
export default GetAllShoppint;
