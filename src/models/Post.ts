import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    excerpt: { type: String },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    content: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
