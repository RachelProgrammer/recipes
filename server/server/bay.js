const Bay = require('../models/bay');

const BayService = {
    GetMaList: async (req, res) => {
        try {
            const { UserId } = req.params;
            const myList = await Bay.find({ UserId });

            if (!myList.length) {
                return res.status(400).send('לא נמצאו נתונים');
            }

            res.send(myList);
        } catch (error) {
            res.status(500).send('שגיאה בשרת');
        }
    },

    AddToList: async (req, res) => {
        try {
            const { Name, UserId, Count } = req.body;

            if (!Name || !UserId || !Count) {
                return res.status(400).send('לא נשלח שם מוצר או כמות תקינה או שם משתמש');
            }

            let existingItem = await Bay.findOne({ Name, UserId });

            if (existingItem) {
                existingItem.Count += Count;
                await existingItem.save();
                return res.send(existingItem);
            } else {
                const newBay = new Bay({ Name, UserId, Count });
                await newBay.save();
                res.send(newBay);
            }
        } catch (error) {
            res.status(500).send('שגיאה בשרת');
        }
    },

    Delete: async (req, res) => {
        try {
            const { Id } = req.params;
            const deleted = await Bay.findByIdAndDelete(Id);

            if (!deleted) {
                return res.status(400).send('לא נמצא פריט למחיקה');
            }

            res.send('ok');
        } catch (error) {
            res.status(500).send('שגיאה בשרת');
        }
    }
};

module.exports = BayService;