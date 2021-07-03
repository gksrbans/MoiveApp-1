import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    videoId: {
        type: String,
    }
}, { timestamps: true })

const Like = mongoose.model('Like', likeSchema)

export default Like