import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema({
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
},
{ timestamps: true },
);

AlbumSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Album || mongoose.model('Album', AlbumSchema);
