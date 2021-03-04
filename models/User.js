import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
},
{ timestamps: true },
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
