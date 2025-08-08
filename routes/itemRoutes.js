const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.post('/', async (req, res) => {
    try{
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();                
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/', async (req, res) => { 
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.body._id,
            req.body,
            { new: true, runValidators: true }
        );      
        
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   

});

router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);
module.exports = router;
