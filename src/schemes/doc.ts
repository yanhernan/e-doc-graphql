import { Schema } from 'mongoose';

const docScheme = new Schema({
    _id: Schema.Types.ObjectId,
    createdAt: { type: Schema.Types.Date, default: Date.now },
    editedAt: Schema.Types.Date,
    data: Schema.Types.Buffer,
    name: Schema.Types.String,
    author: Schema.Types.String,
    dataFields: Schema.Types.Map
})

export default docScheme;