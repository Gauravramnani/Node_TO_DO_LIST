import mongoose from "mongoose"

export const connectDB = () =>{

    
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "backendAPI"
    }).then(() => { console.log("Database connect succesfully") })
    .catch((e) => { console.log(e) })
    
    
    }

