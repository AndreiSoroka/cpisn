const Cpisn = require('./index.js');

let nickname = process.env.NICKNAME || 'andreisoroka';

const cpisn = new Cpisn();

(async () => {
  const queries = cpisn.getQueries(nickname);

  for (let query of queries) {
    const result = await query.result;
    console.log(query.page.name, result.pageIsFound, query.url);
  }
})();

