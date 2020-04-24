import mongoose, { ConnectionOptions } from 'mongoose';

const connect = (options: ConnectionOptions | undefined = undefined) => {
    const uri = process.env.URLDB || ''
    return mongoose.connect(uri, options);
}

export default {
    connect
}