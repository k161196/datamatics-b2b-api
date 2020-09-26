export default function makeFilterCompanies({ companiesDb }) {
    return async function listFilterCompanies() {
        const companies = await companiesDb.filter()
        return companies
    }
}