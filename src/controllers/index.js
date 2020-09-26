import { listContacts, listCompanies, listFilterCompanies } from "../use-cases"


import makeGetContacts from "./get-contacts"
import makeGetCompanies from "./get-companys"
import makeFilterCompanies from "./filter-companies"


const getContacts = makeGetContacts({ listContacts })
const getCompanies = makeGetCompanies({ listCompanies })
const filterCompanies = makeFilterCompanies({ listFilterCompanies })


export { getContacts, getCompanies, filterCompanies } 