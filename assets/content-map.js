// assets/content-map.js
// Site content partition, keyword tags, and search filtering

(() => {
  const siteBase = "https://cn-site-leyu.com.cn";

  const contentPartitions = [
    {
      id: "sports",
      title: "体育赛事",
      keywords: ["乐鱼体育", "NBA", "欧冠", "体育直播"],
      items: [
        { label: "足球", path: "/football" },
        { label: "篮球", path: "/basketball" },
        { label: "网球", path: "/tennis" }
      ]
    },
    {
      id: "esports",
      title: "电子竞技",
      keywords: ["乐鱼体育", "LOL", "Dota2", "CSGO"],
      items: [
        { label: "英雄联盟", path: "/lol" },
        { label: "刀塔2", path: "/dota2" },
        { label: "反恐精英", path: "/csgo" }
      ]
    },
    {
      id: "live",
      title: "实时直播",
      keywords: ["乐鱼体育", "赛事直播", "高清", "互动"],
      items: [
        { label: "热门直播", path: "/hot" },
        { label: "回放", path: "/replay" }
      ]
    },
    {
      id: "news",
      title: "新闻资讯",
      keywords: ["乐鱼体育", "体育新闻", "转会", "分析"],
      items: [
        { label: "最新", path: "/latest" },
        { label: "深度", path: "/insight" }
      ]
    }
  ];

  const allKeywords = contentPartitions.flatMap(p => p.keywords);
  const uniqueKeywords = [...new Set(allKeywords)];

  function searchFilter(query, partitions) {
    if (!query || query.trim() === "") {
      return partitions;
    }
    const q = query.toLowerCase().trim();
    const results = [];
    for (const partition of partitions) {
      const titleMatch = partition.title.toLowerCase().includes(q);
      const keywordMatch = partition.keywords.some(k => k.toLowerCase().includes(q));
      const itemMatch = partition.items.some(item => item.label.toLowerCase().includes(q) || item.path.toLowerCase().includes(q));
      if (titleMatch || keywordMatch || itemMatch) {
        results.push(partition);
      }
    }
    return results;
  }

  function renderSearchResult(query) {
    const filtered = searchFilter(query, contentPartitions);
    if (filtered.length === 0) {
      console.log(`[${siteBase}] 未找到与“${query}”相关的内容分区`);
      return;
    }
    console.log(`[${siteBase}] 找到 ${filtered.length} 个相关分区:`);
    filtered.forEach(p => {
      console.log(`  - ${p.title} (${p.keywords.join(", ")})`);
      p.items.forEach(item => {
        console.log(`    ${item.label} -> ${item.path}`);
      });
    });
  }

  // 示例用法
  const exampleQuery = "乐鱼体育";
  renderSearchResult(exampleQuery);

  // 支持在全局暴露
  window.__contentMap = {
    siteBase,
    contentPartitions,
    uniqueKeywords,
    searchFilter,
    renderSearchResult
  };
})();