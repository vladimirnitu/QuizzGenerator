import mongoose, { Schema } from 'mongoose';

export const Category = new mongoose.Schema({
    Name: { type: String, unique:true },
    UserName: { type: String }
    
})

const CategoryTable = mongoose.model('Category', Category);

export default CategoryTable;