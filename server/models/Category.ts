import mongoose, { Schema } from 'mongoose';

export const Category = new mongoose.Schema({
    Name: { type: String, unique:true },
    UserName: { type: String },
    Questionaries: [{ type: Schema.Types.ObjectId, ref: 'Questionary'}]
    
})

const CategoryTable = mongoose.model('Category', Category);

export default CategoryTable;