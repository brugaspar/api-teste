import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

try {
  mongoose.connect(uri, options);
  console.log("\n✔ Successfully connected with database!");
} catch(err) {
  throw new Error("ERR_CONNECTION_MONGO");
}