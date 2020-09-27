import makeContactsDb from './contacts-db'
import makeCompanyDb from "./company-db"
import mongodb from 'mongodb'
import xlsxFile from "read-excel-file/node"

const MongoClient = mongodb.MongoClient
// const url = process.env.DM_COMMENTS_DB_URL
const url = "mongodb://Test:Test%40123@13.126.116.162?authSource=admin"
const dbName = "data"
// const dbName = process.env.DM_COMMENTS_DB_NAME
const client = new MongoClient(url, { useNewUrlParser: true, useNewUrlParser: true })

export async function makeDb() {
    if (!client.isConnected()) {
        await client.connect()
    }
    return client.db(dbName)
}

const contactsDb = makeContactsDb({ makeDb, xlsxFile })
const companiesDb = makeCompanyDb({ makeDb })
export { companiesDb, contactsDb }