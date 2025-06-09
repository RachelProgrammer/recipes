import React, { useState } from "react"
import { Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useStore } from "../store/storeContext"
import { observer } from "mobx-react-lite"
import _ from "lodash"
import { useLang } from "../resources/langContext"

type Props = {
    selectedCategories: string[] | undefined;
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    selectedDifficulty: number;
    setSelectedDifficulty: (d: number) => void
}
export const RecipeFilterBar: React.FC<Props> = observer(({ selectedCategories, setSelectedCategories, selectedDifficulty, setSelectedDifficulty }) => {
    const store = useStore();
    const { r } = useLang();

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const difficulties: { [n: number]: string } = {
        1: r.recipes.easy,
        2: r.recipes.medium,
        3: r.recipes.complex
    } as const;

    const toggleCategory = (categoryId: string | "all") => {
        if (categoryId === "all")
            setSelectedCategories([]);
        else
            setSelectedCategories(prev => prev?.includes(categoryId) ? prev.filter(c => c !== categoryId) : [...prev ?? [], categoryId]);
    };

    return (
        <div className="p-3 border-bottom bg-light">
            <Row className="align-items-center">
                <Col xs="auto">
                    <span>{r.recipes.filter_by}</span>
                </Col>

                <Col xs="auto">
                    <Dropdown show={showCategoryDropdown} onToggle={setShowCategoryDropdown}>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-category">
                            {r.recipes.category}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Form.Check
                                key={"all"}
                                type="checkbox"
                                label={r.recipes.select_all_categories}
                                checked={_.isEmpty(selectedCategories)}
                                onChange={() => toggleCategory("all")}
                                className="!pr-8 pl-3"
                            />
                            {store.category.categories.map((cat) => (
                                <Form.Check
                                    key={cat._id}
                                    type="checkbox"
                                    label={cat.name}
                                    checked={selectedCategories?.includes(cat._id)}
                                    onChange={() => toggleCategory(cat._id)}
                                    className="!pr-8 pl-3"
                                />
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col xs="auto">
                    <Form.Select value={selectedDifficulty ?? ""} onChange={(e) => setSelectedDifficulty(+e.target.value)}>
                        <option value="">{r.recipes.difficulty}</option>
                        {[1, 2, 3].map((d) => (
                            <option key={d} value={d}>
                                {difficulties[d]!}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
        </div>
    );
})