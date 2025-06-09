import { Request, RequestHandler, Response } from 'express';
import ShoppingList from '../models/shoppingBag.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { assert } from 'console';
import { DtoItem } from '../dto/shoppingBag.dto';


export const getUserCart: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        const myList = await ShoppingList.findOne({ userId });
        res.send(myList);
    } catch (error) {
        res.status(500).send('internal server error');
    }
}


export const addItemToCart: RequestHandler = async (req: AuthenticatedRequest<{}, {}, DtoItem>, res: Response): Promise<any> => {
    const item = req.body;
    const userId = req.userId;
    
    try {
        let shoppingList = await ShoppingList.findOne({ userId });

        if (!shoppingList) {
            shoppingList = new ShoppingList({ userId, items: [item] });
        } else if (!shoppingList.items.find(i => i.name == item.name)) {
            shoppingList.items.push(item);
        }

        await shoppingList.save();
        res.json(shoppingList);
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