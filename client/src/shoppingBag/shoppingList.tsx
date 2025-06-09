

import { useEffect } from "react"
import Button from 'react-bootstrap/Button';
import { useStore } from "../store/storeContext"
import { Card } from "react-bootstrap";
import { MdDelete, MdPrint } from "react-icons/md";
import { observer } from "mobx-react-lite";
import { useLang } from "../resources/langContext";

const ShoppingList = observer(() => {
  const store = useStore();
  const shoppingList = store.shoppingBag.shoppingBagItems;

  const { r } = useLang();


  useEffect(() => {
    store.shoppingBag.fetchAll();
  }, [store.shoppingBag])

  const deleteIngredient = (itemId: string) => store.shoppingBag.removeIngredient(itemId);

  const clearCart = () => store.shoppingBag.removeAll();

  return (
    <div className="h-full w-full flex items-center flex-col">
      <div className="row print:w-full w-1/2 bg-slate-100 rounded-xl">
        {shoppingList?.map((item) => (
          <div key={item._id} className="p-3 flex flex-col">
            <Card key={item._id} className="hover:!bg-slate-100 transition-colors">
              <Card.Body className="flex flex-row w-full justify-between h-[50px] items-center">
                <Card.Title className="!mb-0">{item?.name}</Card.Title>
                <Button onClick={() => deleteIngredient(item._id)} className="btn-danger h-[30px] cursor-pointer transition-transform duration-700 hover:scale-125 hover:shadow-lg">
                  <MdDelete />
                </Button>
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
export default ShoppingList;
