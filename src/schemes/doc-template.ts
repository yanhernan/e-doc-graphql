import { Schema } from 'mongoose';


const docTemplateScheme = new Schema({
    _id: Schema.Types.ObjectId,
    name: Schema.Types.String,
    fields: Schema.Types.Map,
    createdAt: { type: Schema.Types.Date, default: Date.now },
    editedAt: Schema.Types.Date
});

export default docTemplateScheme;