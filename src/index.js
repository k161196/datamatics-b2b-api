import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import mongoDb from "mongodb"
import multer from "multer"

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


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/data')
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' + file.originalname)
        cb(null, "test.xlsx")
    }
})

var upload = multer({ storage: storage }).array('file')


app.get("/", (req, res) => {
    res.send("welcome datamatics v1.0")
})
// app.get("/contacts", makeCallback(getContacts))
app.get("/contacts/:page", makeCallback(getContacts))
app.get("/companys", makeCallback(getCompanies))
app.get("/companies/filter", makeCallback(filterCompanies))
// app.use("/user", makeCallback(getUser))
// app.use(`${apiRoot}/signup`, makeCallback(getUser))


app.post('/upload', (req, res) => {
    // console.log("upload", req)
    console.log("uploas")
    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
            // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
            // An unknown error occurred when uploading.
        }

        return res.status(200).send(req.file)
        // Everything went fine.
    })





    // if (!req.files) {
    //     return res.status(500).send({ msg: "file is not found" })
    // }
    // // // accessing the file

    // console.log("file exist")
    // const myFile = req.files.file;
    // console.log("my File", myFile)
    // //  mv() method places the file inside public directory
    // myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
    //     if (err) {
    //         console.log(err)
    //         return res.status(500).send({ msg: "Error occured" });
    //     }
    //     // returing the response with file path and name
    //     return res.send({ name: myFile.name, path: `/${myFile.name}` });
    // });
})





const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
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

