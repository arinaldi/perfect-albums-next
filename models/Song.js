import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema(
  {
    artist: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose?.models?.Song || mongoose.model('Song', SongSchema);
