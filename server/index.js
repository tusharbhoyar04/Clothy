const express = require("express")
const { connection } = require("./config/db.config")
const { productRouter } = require("./routes/product.route");

const { CartWishlistRouter } = require("./routes/cart.wishlist.route");
const app = express();
require("dotenv").config()
const cors = require("cors");
const { userRouter } = require("./routes/user.Route");

app.use(express.json())
app.use(cors())
app.use("/",userRouter)
app.use("/",productRouter)
app.use("/",CartWishlistRouter)

app.listen((process.env.PORT) , async() => {
    try {
        await connection;
        console.log('Database is Connected');
        console.log(`Server is Running on Port ${process.env.PORT}`);
    } 
    catch (error) {
        console.log(error);
    }
})