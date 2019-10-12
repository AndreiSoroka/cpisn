import Cpisn from './Cpisn.mjs';

let nickname = 'andreisoroka';

const cpisn = new Cpisn();

(async () => {
    const queries = cpisn.getQueries(nickname);

    for (let query of queries) {
        const result = await query.result;
        console.log(query.page.name, result.pageIsFound, query.url);
    }
})();

