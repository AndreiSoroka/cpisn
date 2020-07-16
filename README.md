# Cpisn
Check page in social networks

You can use UI version: http://furyferret.com/

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
Steam true
SteamGroup false
GitLab false
Tinder false
Telegram true
LiveJournal false
Leetcode false
Thingiverse false
3dtoday false
CareerHabr false
Litres false
UID false
Coroflot false
TikTok true
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
cpisn.setPages([]);

// or add more pages
cpisn.addPages([]);

// show list of pages
(async () => {
  const queries = cpisn.getQueries(nickname);

  for (let query of queries) {
    const result = await query.result;
    console.log(query.page.name, result.pageIsFound, query.url);
  }
})();
```

### Set pages with custom fetch

```javascript
const pages = [
  {
    "name": "CustomSiteSPA",
    "url": "https://customSpaSite/{}",
    "error": {
      "body_includes": "class=\"not-found\"",
      "body_does_not_includes": "class=\"profile\""
    },
    "customFetch": async (url) => {
      console.log(url); // here you got url with nickname
      // your code
      return { 
        customBody: '', 
        status: 200, // optional 
      }
    },
  },
];
cpisn.addPages(pages, {isCustomFetch: true});

// show list of pages
(async () => {
  const queries = cpisn.getQueries(nickname);

  for (let query of queries) {
    const result = await query.result;
    console.log(query.page.name, result.pageIsFound, query.url);
  }
})();
```