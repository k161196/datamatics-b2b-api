export default function makeFilterCompanies({ companiesDb }) {
    return async function listFilterCompanies({ query }) {

        const companies = await companiesDb.filter(query)
        return companies
    }
}