import { Schema } from 'mongoose';

const templateSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: Schema.Types.String,
    content: Schema.Types.Buffer,
    createdAt: { type: Schema.Types.Date, default: Date.now },
    editedAt: Schema.Types.Date
});

export default templateSchema;