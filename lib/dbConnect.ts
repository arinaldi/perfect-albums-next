import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || '';

export default function dbConnect(): Promise<typeof mongoose> | undefined {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(connectionString, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
