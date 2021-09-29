import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema(
  {
    artist: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    cd: {
      type: Boolean,
      required: true,
    },
    aotd: {
      type: Boolean,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: true,
    },
    studio: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose?.models?.Album || mongoose.model('Album', AlbumSchema);
