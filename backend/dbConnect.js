import mongoose from "mongoose";

export async function connectdb() {
  try {

    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const dbconnection = mongoose.connection;

    dbconnection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    dbconnection.on('error', (err) => {
              console.error('MongoDB connection error:', err);
              process.exit(1); // Exit the Node.js process on a database connection error
            });

  } 
  
  catch (error) {

    console.error('Something went wrong:', error);

  }
 
}

 