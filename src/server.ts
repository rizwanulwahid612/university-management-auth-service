import mongoose from "mongoose";
import app from "./app";
import config from "./config";


async function boostrap() {
    try{
        await mongoose.connect(config.database_url as string);
        console.log("Darabase is cunnected successfully");
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
          })
    }
    catch(err){
        console.log("Failed to cunnect database",err);
    }
    
  }
  boostrap();