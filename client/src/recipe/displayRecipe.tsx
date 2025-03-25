
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Header from '../components/header';
import { useStore } from '../store/storeContext';
import { Fragment, useEffect, useState } from 'react';
import { Recipe } from '../services/DTOs';

const DisplayRecipe: React.FC<{recipeId: string}> = ({recipeId}) => {
    const navigate = useNavigate()
    const store = useStore();
    const location = useLocation();
    const [recipe, setRecipe] = useState<Recipe>();

    const user = store.auth.user;

    const editRecipe = () => {
        // navigate("/addRecipe", { state: { activeRecipe: recipe } })
    }

    useEffect(() => {
        store.recipe.getById(location.pathname).then(setRecipe);
    }, [])

    const print = () => {
        window.print();
    }

    //ask teacher
    const AddProduct = (check: any, item: any) => {
        if (check) {
            axios.post("http://localhost:8080/api/bay", item)
                .then((x) => { console.log(x.data); alert("   added!"); })
                .catch(err => console.log(err))
        }
    }

    const deleteRecipe = () => {

    }



    if (!recipe) {
        return (
            <div>
                loading...
            </div>
        )
    }

    return (
        <Fragment>

            <div>
                <div className='dRcipe'>
                    <h6> {recipe?.Name}</h6>,
                    <img src={recipe?.Img} style={{ borderRadius: "50px" }}></img>,
                    <h6> דרגת קושי: {recipe?.Difficulty}</h6>
                    <h6> משך זמן הכנה: {recipe?.Duration}</h6>,
                    <h6> תיאור: {recipe?.Description}</h6>


                    <br />
                    <div>
                        {recipe?.Instructions.map((y: any) => <p>{y}</p>)}

                    </div>
                    <br />
                    <div>
                        {user && recipe?.Ingrident.map((v: any) => <div>{v.Name}<br />

                            < input type="checkbox" onChange={(e) => AddProduct(e.target.checked, { Id: v.Id, Name: v.Name, UserId: user.Id, Count: v.Count })} />
                            {v.Count}<br />
                            {v.Type}
                        </div>)}
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button variant="outline-danger" type="button" onClick={() => print()}  >להדפסה</Button>
                    <div>
                        {recipe?.UserId === user?.Id ? <div>
                            <Button variant="outline-danger" type="button" onClick={() => editRecipe()}  >עריכה</Button>
                            <Button variant="outline-danger" type="button" onClick={() => deleteRecipe()}  >מחיקה</Button>
                        </div> :
                            <div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default DisplayRecipe;


