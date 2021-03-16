import mongoose from 'mongoose';

const ReleaseSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
});

export default mongoose?.models?.Release || mongoose.model('Release', ReleaseSchema);
