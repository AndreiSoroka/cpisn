# Cpisn
Check page in social networks

```bash
npm install cpisn --save
```

### How usage?

```javascript
import Cpisn from 'cpisn';

const cpisn = new Cpisn();

(async () => {
    const queries = cpisn.getQueries('andreisoroka');

    for (let query of queries) {
        const result = await query.result;
        console.log(query.page.name, result.pageIsFound);
    }
})();
```

Output: 
```text
VK true
Facebook false
npm true
Instagram true
Twitter true
OK false
BitBucket true
GitHub true
Codecademy false
Codewars false
DeviantART false
Dribbble false
Gravatar true
Patreon false
PayPal true
PlayStore false
Reddit false
Slack false
Steam false
SteamGroup false
GitLab false
Tinder false
Telegram true
```

### Set pages

Default pages: [./src/data.json](./src/data.json)
```javascript
const pages = [
  {
    "name": "VK",
    "url": "https://vk.com/{}"
  },
  {
    "name": "Facebook",
    "url": "https://www.facebook.com/{}"
  },
  {
    "name": "Instagram",
    "url": "https://www.instagram.com/{}"
  },
];
const useDefaultPages = false; // for default: true;
const cpisn = new Cpisn(pages, useDefaultPages);

// you can redefine pages
cpisn.setPages([])

// or add more pages
cpisn.addPages([])

// show list of pages
console.log(cpisn.getPages())
```


