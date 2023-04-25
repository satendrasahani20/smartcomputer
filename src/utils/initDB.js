import mongoose from "mongoose";
global.mongoose = {
  conn: null,
  promise: null
}
export async function initDB() {
  if (global.mongoose && global.mongoose.conn) {
    console.log("Using Existsing mongoose connections");
    return global.mongoose.conn
  } else {
    console.log("Creating new connections");
    const promise = mongoose.connect("mongodb+srv://satendrasahani19:mongodb1345@cluster0.hwaxhm8.mongodb.net/smartedu?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true
    }).then(mongoose => mongoose)

    global.mongoose={
      conn:await promise,
      promise
    }

    return await promise;
  }
}