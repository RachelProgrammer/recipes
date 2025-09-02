import { RequestHandler, Response } from 'express';
import ShoppingList from '../models/shoppingBag.model';
import Recipes from '../models/recipe.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { assert } from 'console';
import { ShoppingBagDto, ShoppingBagResultDto } from '../dto/shoppingBag.dto';


export const getUserCart: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        const myList = await ShoppingList.findOne({ userId });
        if (!myList) return res.json({ userId, items: [] });

        const allRefs = myList.items.flatMap((item: any) => item.refs || []);
        const recipeIds = allRefs.map((ref: any) => ref.recipeId?.toString()).filter(Boolean);

        const recipes = await Recipes.find({ _id: { $in: recipeIds } });
        const recipeMap: Record<string, any> = {};
        recipes.forEach((r: any) => { recipeMap[r._id.toString()] = r; });

        const dto: ShoppingBagResultDto = {
            userId: myList.userId.toString(),
            items: myList.items.map((item) => ({
                name: item.name,
                refs: (item.refs || []).map((ref: any) => {
                    const recipe = recipeMap[ref.recipeId?.toString()];
                    let countDesc = "";
                    let amount: number = 1;
                    if (recipe) {
                        const ingredient = Array.isArray(recipe.ingredients)
                            ? recipe.ingredients.find((ing: any) => ing.name === item.name)
                            : undefined;
                        countDesc = ingredient?.description || "";
                        amount = ingredient?.amount || 1;
                    }
                    return {
                        recipeId: ref.recipeId?.toString() || '',
                        name: `${recipe?.title ?? ""}`,
                        countDesc,
                        count: ref.count * amount
                    };
                })
            }))
        };
        res.json(dto);
    } catch (error) {
        res.status(500).send('internal server error');
    }
}
export const removeItemFromCart: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        const { recipeId, name, count = 1 } = req.body;

        const shoppingList = await ShoppingList.findOne({ userId });
        if (!shoppingList) {
            return res.status(404).send('Shopping list not found');
        }

        const item = shoppingList.items.find((item: any) => item.name === name);
        if (!item) {
            return res.status(404).send('Item not found');
        }

        const refIndex = (item.refs || []).findIndex((ref: any) => ref.recipeId?.toString() === recipeId);
        if (refIndex === -1) {
            return res.status(404).send('Recipe reference not found');
        }

        if (item.refs[refIndex].count > count) {
            item.refs[refIndex].count -= count;
        } else {
            item.refs.splice(refIndex, 1);
        }

        if (!item.refs || item.refs.length === 0) {
            shoppingList.items.remove(item);
        }

        await shoppingList.save();

        res.send('Item count decreased or removed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error, message: "Failed to remove item from shopping bag" });
    }
}

export const addAllItemsToCart: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { recipeId } = req.params;

    try {
        const userId = req.userId;
        const recipe = await Recipes.findById(recipeId);
        if (!recipe)
            return res.status(404).json({ message: "Recipe not found" });

        const shoppingList = (await ShoppingList.findOne({ userId })) ?? new ShoppingList({ userId });

        for (const ingredient of recipe.ingredients || []) {
            const existingItem = shoppingList.items.find((i: any) => i.name === ingredient.name);
            if (!existingItem) {
                shoppingList.items.push({
                    name: ingredient.name,
                    refs: [{ recipeId: recipe._id, count: 1 }]
                });
            } else {
                const ref = (existingItem.refs || []).find((r: any) => r.recipeId?.toString() === recipe._id.toString());
                if (ref)
                    ref.count += 1;
                else {
                    existingItem.refs = existingItem.refs || [];
                    existingItem.refs.push({ recipeId: recipe._id, count: 1 });
                }
            }
        }

        await shoppingList.save();

        const dto: ShoppingBagDto = {
            userId: shoppingList.userId.toString(),
            items: shoppingList.items.map((item: any) => ({
                name: item.name,
                refs: (item.refs || []).map((ref: any) => ({
                    recipeId: ref.recipeId?.toString() || '',
                    name: ref.name,
                    countDesc: ref.countDesc,
                    count: ref.count
                }))
            }))
        };

        res.json(dto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error, message: "Failed to add all items to shopping bag" });
    }
}

export const addItemToCart: RequestHandler = async (req: AuthenticatedRequest<{}, {}, {name: string, recipeId: string, count?: number}>, res: Response): Promise<any> => {
    const item = req.body;
    const userId = req.userId;
    const count = item.count ?? 1;

    try {
        const shoppingList = (await ShoppingList.findOne({ userId })) ?? new ShoppingList({ userId });

        const existingItem = shoppingList.items.find((i: any) => i.name === item.name);
        if (!existingItem)
            shoppingList.items.push({ name: item.name, refs: [{ recipeId: item.recipeId, count: count }] });
        else {
            const ref = (existingItem.refs || []).find(r => r.recipeId?.toString() === item.recipeId);
            if (ref)
                ref.count += count;
            else {
                existingItem.refs = existingItem.refs || [];
                existingItem.refs.push({ recipeId: item.recipeId, count: count});
            }
        }

        await shoppingList.save();

        const dto: ShoppingBagDto = {
            userId: shoppingList.userId.toString(),
            items: shoppingList.items.map((item: any) => ({
                name: item.name,
                refs: (item.refs || []).map((ref: any) => ({
                    recipeId: ref.recipeId?.toString() || '',
                    name: ref.name,
                    countDesc: ref.countDesc,
                    count: ref.count
                }))
            }))
        };
        res.json(dto);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error, message: "Failed to add item to shopping bag" });
    }
}

export const deleteCart: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        const deleted = await ShoppingList.findOneAndDelete({userId: userId});

        if (!deleted)
            return res.status(400).send('shopping list was not deleted');

        res.send('ok');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error, message: "Failed to delete shopping bag" });
    }
}

export const deleteItemFromCart: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        const cart = await ShoppingList.findOne({ userId });
        assert(!!cart, "Cannot remove item from empty cart");
        const { itemId } = req.params;
        const items = cart!.items.filter(i => i._id != itemId);
        await ShoppingList.findByIdAndUpdate(cart!.id, { items: items });
        res.send("ok");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error, message: "Failed to delete item from shopping bag" });
    }
}