import makeListContacts from "./list-contacts"
import makeListCompanys from "./list-companies"
import makeFilterCompanies from "./list-filter-companies"

import { contactsDb, companiesDb } from "../data-access"

const listContacts = makeListContacts({ contactsDb })

const listCompanies = makeListCompanys({ companiesDb })
const listFilterCompanies = makeFilterCompanies({ companiesDb })

export { listContacts, listCompanies, listFilterCompanies }