

import React, { useEffect } from "react"
import Button from 'react-bootstrap/Button';
import { useStore } from "../store/storeContext"
import { Card } from "react-bootstrap";
import { MdAdd, MdDelete, MdPrint, MdRemove } from "react-icons/md";
import { observer } from "mobx-react-lite";
import { useLang } from "../resources/langContext";
import { DtoRecipeRef } from "../services/DTOs";

const ShoppingList = observer(() => {
  const store = useStore();
  const shoppingList = store.shoppingBag.shoppingBagItems;

  const { r } = useLang();


  useEffect(() => {
    store.shoppingBag.fetchAll();
  }, [store.shoppingBag])



  const clearCart = () => store.shoppingBag.removeAll();


  return (
    <div className="h-full w-full flex items-center flex-col">
      <div className="row print:w-full w-1/2 bg-slate-100 rounded-xl">
        {shoppingList?.map((item, idx) => (
          <div key={idx} className="p-3 flex flex-col">
            <Card key={idx} className="">
              <Card.Header>
                <Card.Title className="!mb-0">{item?.name}</Card.Title>
              </Card.Header>
              <Card.Body className="flex flex-col w-full justify-between items-center">
                {item.refs?.map(r =>
                  <ShoppingListItem key={r.recipeId} r={r} itemName={item.name} />
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
        {!shoppingList?.length && <div className="h-[200px] w-full flex justify-center items-center">
          {r.shoppingBag.empty_cart}
        </div>
        }
      </div>

      <div className='flex justify-center items-center p-3 gap-x-3 ignore-print'>
        <Button className='!flex gap-x-1 items-center' variant="outline-danger" type="button" onClick={() => window.print()}>
          <span>{r.shoppingBag.print}</span>
          <MdPrint />
        </Button>
        <Button className='!flex gap-x-1 items-center' variant="outline-danger" type="button" disabled={!shoppingList.length} onClick={() => clearCart()} >
          <span>{r.shoppingBag.clear_all_cart}</span>
          <MdDelete />
        </Button>
      </div>
    </div>

  )
});


const ShoppingListItem: React.FC<{r: DtoRecipeRef, itemName: string}> = observer(({r, itemName}) => {
  const store = useStore();

  console.info({itemName, ...r});

  const deleteIngredient = (recipeId: string, name: string) =>
    store.shoppingBag.removeIngredient(name, recipeId);

  const addIngredient = (recipeId: string, name: string) =>
    store.shoppingBag.addIngredient(name, recipeId);


  return (
    <Card.Subtitle className="w-full p-[4px] flex flex-row justify-between items-center hover:!bg-slate-100 transition-colors" >
      <div className=" flex flex-row gap-x-2">
        <span>{r.name}</span>
        <span className="text-[#aaa] flex">({
          r.count > 1 ? <span className="flex gap-x-1 flex-row-reverse"><span>{r.countDesc}</span> <span>x</span><span>{r.count}</span></span> : r.countDesc
        })</span>
      </div>
      <div className="flex gap-x-2 print:invisible">
        <Button onClick={() => addIngredient(r.recipeId, itemName)} className="btn-danger h-[30px] hover:shadow-lg">
          <MdAdd />
        </Button>
        <Button onClick={() => deleteIngredient(r.recipeId, itemName)} className="btn-danger h-[30px] hover:shadow-lg">
          <MdRemove />
        </Button>
      </div>
    </Card.Subtitle>
  )
})

export default ShoppingList;
