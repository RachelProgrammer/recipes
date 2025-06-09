import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useStore } from "../store/storeContext";
import { DtoCategory } from "../services/DTOs";
import { useLang } from "../resources/langContext";

export const CategoryFormModal: React.FC<{ show: boolean, onHide: () => void, existingCategory?: DtoCategory }> = ({ show, onHide, existingCategory }) => {
    const store = useStore();

    const { r, dir } = useLang();

    const schema = yup
        .object({
            title: yup.string().min(3, r.categories.name_too_short).max(30, r.categories.name_too_long).required(r.categories.name_required),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });



    const onSubmit = async (data: { title: string }) => {
        let category;
        if (existingCategory)
            category = await store.category.edit(existingCategory._id, data.title);
        else
            category = await store.category.add(data.title);
        if (category)
            onHide();
    }

    return (

        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered dir={dir}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {existingCategory ? r.categories.edit_category : r.categories.add_category}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'fit-content' }}>
                    <Form.Control {...register("title")} defaultValue={existingCategory?.name} className="addR" placeholder={r.categories.insert_cateogry_name} />
                    <p className="text-sm text-red-600 !m-0">{errors.title?.message}</p>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onHide()} className="btn btn-secondary">{r.categories.cancel}</Button>
                <Button type="submit" className="btn btn-danger" onClick={handleSubmit(onSubmit)}>{r.categories.save}</Button>
            </Modal.Footer>
        </Modal>
    );
}