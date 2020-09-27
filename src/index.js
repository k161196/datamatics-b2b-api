import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import mongoDb from "mongodb"

// import { getUser, addUserController } from "./controllers"
import makeCallback from "./express-callback"


import { getContacts, getCompanies, filterCompanies } from "./controllers"

dotenv.config()

const MongoClient = mongoDb.MongoClient

dotenv.config()
const apiRoot = process.env.DM_API_RO
const app = express()



app.use(cors())
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.send("welcome datamatics")
})
// app.get("/contacts", makeCallback(getContacts))
app.get("/contacts/:page", makeCallback(getContacts))
app.get("/companys", makeCallback(getCompanies))
app.get("/companies/filter", makeCallback(filterCompanies))
// app.use("/user", makeCallback(getUser))
// app.use(`${apiRoot}/signup`, makeCallback(getUser))

app.listen(5000, () => {
    console.log("app running on port 5000")
})






export default app






















// MongoClient.connect("mongodb://Test:Test%40123@13.126.116.162?authSource=admin", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
// MongoClient.connect("mongodb://13.126.116.162", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {

//     if (!err) {
//         var db = client.db('data');
//         console.log("We are connected");

//         db.collection("company").find(async (err, data) => {
//             console.log("data", await data)
//         })

//         // db.collection('company').find(function (findErr, result) {
//         //     if (findErr) throw findErr;
//         //     console.log(result);
//         //     client.close();
//         // });
//         // db.collection('contact', function (err, collection) {
//         //     collection.map((data) => {
//         //         console.log(data)
//         //     })
//         // });
//         return


//     }
//     if (err) {
//         console.log("mpongo connection error ", err)
//     }

// });


// MongoClient.connect("mongodb://Test:Test%40123@13.126.116.162/data?authSource=admin", {
//         useNewUrlParser: true
//     }).then((db) => {
//         listDatabases(db)
//         // console.log("db", db)
//     })

