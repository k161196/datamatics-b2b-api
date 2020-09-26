export default function makeListCompanys({ companiesDb }) {
    return async function listCompanys() {
        const companys = await companiesDb.findAll()
        return companys
    }
}