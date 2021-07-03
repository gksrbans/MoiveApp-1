import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    videoId: {
        type: String,
    }
}, { timestamps: true })

const DisLike = mongoose.model('DisLike', dislikeSchema)

export default DisLike