const fs = require('fs');

const JSON_FOLDER = "./.json";
const DATA_FOLDER = "src/database/json";

// 讀取 authors.json 和 works.json
// const authorsData = JSON.parse(fs.readFileSync('scripts/authors.json', 'utf-8'));
// const worksData = JSON.parse(fs.readFileSync('scripts/works.json', 'utf-8'));

const authorsData = JSON.parse(fs.readFileSync(`${DATA_FOLDER}/authors.json`, 'utf-8'));
const worksData = JSON.parse(fs.readFileSync(`${DATA_FOLDER}/works.json`, 'utf-8'));
const collectionsData = JSON.parse(fs.readFileSync(`${DATA_FOLDER}/collections.json`, 'utf-8'));

const searchResults = [];

// 處理 collections.json
// 過濾 works.json 中特定的數據項，例如過濾掉 id=10001 的項
const filteredCollections = collectionsData.collections
  .filter(collection => collection.online_data == 0);

filteredCollections.forEach((collection) => {
  searchResults.push({
    group: "詩集",
    slug: `collections/${collection.id}`,
    frontmatter: {
      title: collection.name,
      meta_title: "", // collection.name,
      description: "",
      date: "", // 由於 collections.json 中沒有提供日期信息，這裡留空
      image: "", // 由於 collections.json 中沒有提供圖片信息，這裡留空
      categories: [collection.kind],
      author: "",
      tags: [], // 由於 collections.json 中沒有提供標籤信息，這裡留空
      draft: false
    },
    content: collection.desc || ""
  });
});

// 處理 authors.json
authorsData.authors.forEach((author) => {
  searchResults.push({
    group: "詩人",
    slug: `authors/${author.id}`,
    frontmatter: {
      title: author.name,
      meta_title: "", // author.name,
      description: "",
      date: "", // 由於 authors.json 中沒有提供日期信息，這裡留空
      image: "", // 由於 authors.json 中沒有提供圖片信息，這裡留空
      categories: [author.dynasty],
      author: "", // author.name,
      tags: [], // 由於 authors.json 中沒有提供標籤信息，這裡留空
      draft: false
    },
    content: author.intro ? author.intro.slice(0, 50) : ""
  });
});

// 處理 works.json
worksData.works.forEach((work) => {
  searchResults.push({
    group: "詩詞",
    slug: `works/${work.id}`,
    frontmatter: {
      title: work.title,
      meta_title: "", // work.title,
      description: "",
      date: "", // 由於 works.json 中沒有提供日期信息，這裡留空
      image: "", // 由於 works.json 中沒有提供圖片信息，這裡留空
      categories: [work.dynasty],
      author: "", // work.author,
      tags: [work.author], // 由於 works.json 中沒有提供標籤信息，這裡留空
      draft: false
    },
    content: work.content ? work.content.slice(0, 50) : ""
  });
});


try {
  // create folder if it doesn't exist
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  // 將結果寫入 search.json
  // fs.writeFileSync('scripts/search.json', JSON.stringify(searchResults, null, 2), 'utf-8');
  fs.writeFileSync(`${JSON_FOLDER}/search.json`,
    JSON.stringify(searchResults, null, 2), 'utf-8'
  );

  console.log('search.json has been generated successfully.');
} catch (err) {
  console.error(err);
}