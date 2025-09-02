import { useEffect, useState } from "react"
import { useStore } from "../store/storeContext"
import { observer } from "mobx-react-lite"
import { CategoryFormModal } from "./categoryForm";
import { DtoCategory } from "../services/DTOs";
import { Button, Card } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { useLang } from "../resources/langContext";
import { toast } from "react-toastify";

const CategoriesGallery = observer(() => {
  const store = useStore();
  const categories = store.category.categories;

  const { r } = useLang();

  useEffect(() => {
    store.category.fetchAll();
  }, [store.category])

  const [createCategory, setCreateCategory] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<DtoCategory | undefined>();


  const closeModal = () => {
    setCreateCategory(false);
    setEditCategory(undefined);
  }

  const deleteCategory = async (cid: string) => {
    try {
      await store.category.delete(cid);
    } catch (err) {
      toast.error(r.categories.delete_error);
    }
  }

  return (
    <div className="h-full w-full">
      <Button onClick={() => setCreateCategory(true)}
        className="fixed bottom-20 right-20 z-50 h-fit !bg-red-600 border-black text-white !text-3xl font-bold px-9 py-3 rounded-full shadow-2xl btn-dark hover:!-translate-y-3 !translate-y-0 !duration-700 hover:!duration-700 hover:!transition-all !transition-all">
        {r.categories.add_category}
      </Button>
      {(createCategory || !!editCategory) && <CategoryFormModal show={createCategory || !!editCategory} onHide={closeModal} existingCategory={editCategory} />}

      <div className="row">
        {categories?.map((category: DtoCategory) => (
          <div key={category._id} className=" p-3 col-md-3">
            <Card key={category._id} className="!h-full hover:!bg-slate-100 transition-colors">
              <Card.Body className="flex flex-row w-full justify-between">
                <Card.Title className="cursor-default">{category?.name}</Card.Title>
                <div className="flex gap-x-3">
                  <Button title={r.categories.edit_category} onClick={() => setEditCategory(category)} className="btn-danger cursor-pointer transition-transform duration-700 hover:scale-125 hover:shadow-lg">
                    <MdEdit />
                  </Button>
                  <Button title={r.categories.delete_category} onClick={() => deleteCategory(category._id)} className="btn-danger cursor-pointer transition-transform duration-700 hover:scale-125 hover:shadow-lg">
                    <MdDelete />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
        {!categories.length && <div className="h-[200px] w-full flex justify-center items-center">
          {r.categories.empty}
        </div>}
      </div>
    </div>
  );
});

export default CategoriesGallery;