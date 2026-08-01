import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["index.html", "STUDENT", "让热爱发生"],
  ["about/index.html", "WHO", "我们是谁"],
  ["departments/index.html", "SIX", "六个部门"],
  ["events/index.html", "CLUB FAIR", "百团迎新"],
  ["archive/index.html", "CAMPUS", "校园档案"],
  ["join/index.html", "JOIN", "新的故事"],
];

async function readExport(relativePath) {
  return readFile(new URL(`../out/${relativePath}`, import.meta.url), "utf8");
}

async function readSiteShell() {
  return readFile(new URL("../app/site-shell.tsx", import.meta.url), "utf8");
}

async function readStyles() {
  return readFile(new URL("../app/globals.css", import.meta.url), "utf8");
}

test("exports every primary route for GitHub Pages", async () => {
  for (const [relativePath, englishText, chineseText] of routes) {
    const html = await readExport(relativePath);

    assert.match(html, new RegExp(englishText, "i"), relativePath);
    assert.match(html, new RegExp(chineseText), relativePath);
    assert.match(html, /浙江工商大学学生社团管理中心/, relativePath);
  }
});

test("prefixes routes and assets with the repository path", async () => {
  const html = await readExport("index.html");

  assert.match(html, /href="\/zjsu-sg\/about\/"/i);
  assert.match(
    html,
    /src="\/zjsu-sg\/assets\/archive-showcase-2025-cover\.webp"/i,
  );
  assert.match(html, /src="\/zjsu-sg\/assets\/scmc-mark\.png"/i);
  assert.match(html, /href="\/zjsu-sg\/_next\//i);
  assert.match(
    html,
    /property="og:image" content="https:\/\/fshfish88-lab\.github\.io\/zjsu-sg\/og\.png"/i,
  );
  assert.doesNotMatch(html, /(?:src|href)="\/assets\//i);
});

test("cycles multiple official photos on the homepage and links directly to join", async () => {
  const [html, source, styles] = await Promise.all([
    readExport("index.html"),
    readSiteShell(),
    readStyles(),
  ]);
  const homePhotos = [
    "archive-showcase-2025-cover.webp",
    "archive-club-fair-2025-entry.webp",
    "archive-spring-2026-stage.webp",
    "archive-showcase-2025-dance.webp",
    "archive-relief-2025-foam.webp",
    "archive-guofeng-2024-opera.webp",
    "archive-showcase-2025-camera.webp",
    "archive-relief-2025-installation.webp",
  ];

  for (const photo of homePhotos) {
    assert.match(source, new RegExp(`/assets/${photo.replace(".", "\\.")}`));
  }

  const homeSlidesBlock = source.match(
    /const homeSlides: HomeSlide\[\] = \[([\s\S]*?)\n\];/,
  );
  assert.ok(homeSlidesBlock, "homepage slide data should exist");
  assert.equal(
    [...homeSlidesBlock[1].matchAll(/image: "\/assets\//g)].length,
    8,
    "homepage should contain exactly eight selected photos",
  );
  assert.match(
    homeSlidesBlock[1],
    /^\s*\{\s*image: "\/assets\/archive-showcase-2025-cover\.webp"/,
    "the user-selected DSC01254 photo must remain the first cover",
  );
  assert.match(
    homeSlidesBlock[1],
    /image: "\/assets\/archive-showcase-2025-dance\.webp"[\s\S]*?title: "狂响百团夜 · 舞台展演"/,
  );
  assert.doesNotMatch(
    homeSlidesBlock[1],
    /archive-spring-2025-piano\.webp/,
  );

  assert.match(source, /window\.setTimeout/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /暂停自动播放/);
  assert.match(styles, /\.home-slide\.is-active/);
  assert.match(styles, /\.home-carousel-slides\s*\{\s*bottom: 84px;/);
  assert.match(
    styles,
    /\.home-carousel-controls\s*\{\s*top: auto;\s*right: 0;\s*bottom: 0;\s*left: 0;/,
  );
  assert.match(html, /href="\/zjsu-sg\/join\/"/i);
});

test("keeps each department paired with a relevant recruitment or work photo", async () => {
  const source = await readSiteShell();
  const expectedPairs = [
    ["综合事务部", "team-night.webp"],
    ["对外拓展部", "team-outdoor.webp"],
    ["活动策划部", "team-celebration.webp"],
    ["精品建设部", "team-annual.webp"],
    ["传媒运营部", "dept-media-story.webp"],
    ["人力资源部", "dept-human-resources.webp"],
  ];

  for (const [department, image] of expectedPairs) {
    assert.match(
      source,
      new RegExp(
        `name: "${department}"[\\s\\S]*?image: "/assets/${image.replace(".", "\\.")}"`,
      ),
      department,
    );
  }
});

test("expands the official campus work overview with matching photo stories", async () => {
  const source = await readSiteShell();
  const expectedActivities = [
    ["百团迎新", "club-fair.webp"],
    ["社团风采节", "showcase-stage.webp"],
    ["社团文化节", "culture-festival.webp"],
    ["社团星级评定", "star-club-review.webp"],
    ["新社团成立", "new-club-establishment.webp"],
    ["精品活动立项", "quality-project-hearing.webp"],
    ["七星社长评选", "team-honors.webp"],
  ];

  for (const [activity, image] of expectedActivities) {
    assert.match(
      source,
      new RegExp(
        `name: "${activity}"[\\s\\S]*?image: "/assets/${image.replace(".", "\\.")}"`,
      ),
      activity,
    );
  }
});

test("keeps added event photos semantically paired", async () => {
  const source = await readSiteShell();

  assert.match(
    source,
    /name: "星级社团评定"[\s\S]*?image: "\/assets\/star-club-review\.webp"/,
  );
  assert.match(
    source,
    /name: "新社团成立"[\s\S]*?image: "\/assets\/new-club-establishment\.webp"/,
  );
  assert.match(
    source,
    /name: "精品活动立项"[\s\S]*?image: "\/assets\/quality-project-hearing\.webp"/,
  );
  assert.match(
    source,
    /name: "社长大会暨财务报销培训会"[\s\S]*?image: "\/assets\/president-finance-training\.webp"/,
  );
  assert.match(
    source,
    /name: "社长沙龙"[\s\S]*?image: "\/assets\/presidents-salon\.webp"/,
  );
  assert.match(
    source,
    /image: "\/assets\/archive-spring-2026-stage\.webp"[\s\S]*?title: "春之行 · 舞台展演"/,
  );
  assert.match(
    source,
    /image: "\/assets\/archive-club-fair-2025-entry\.webp"[\s\S]*?title: "百团迎新 · 校园入口"/,
  );
  assert.match(
    source,
    /image: "\/assets\/archive-guofeng-2024-opera\.webp"[\s\S]*?title: "国风雅韵 · 戏曲舞台"/,
  );
});

test("archives one to three supplied photos for every identified event", async () => {
  const source = await readSiteShell();
  const archiveBlock = source.match(
    /const archive: Record<string, ArchiveItem\[\]> = \{([\s\S]*?)\n\};/,
  );
  assert.ok(archiveBlock, "archive data should exist");
  const events = [
    ["archive-spring-2025-", 3],
    ["archive-relief-2025-", 3],
    ["archive-club-fair-2025-", 3],
    ["archive-showcase-2025-", 3],
    ["archive-spring-2026-", 3],
    ["archive-guofeng-2024-", 3],
  ];

  for (const [prefix, count] of events) {
    assert.equal(
      [...archiveBlock[1].matchAll(new RegExp(`/assets/${prefix}`, "g"))].length,
      count,
      `${prefix} should contribute three archive entries`,
    );
  }

  assert.match(source, /"2026": \[[\s\S]*?2026 \/ APR 01/);
  assert.match(
    source,
    /"2025": \[[\s\S]*?2025 \/ APR 02[\s\S]*?2025 \/ MAY 28[\s\S]*?2025 \/ SEP 17[\s\S]*?2025 \/ OCT 25/,
  );
  assert.match(source, /"2024": \[[\s\S]*?2024 \/ NOV 09/);
});

test("continues the staggered archive layout below the first six photos", async () => {
  const styles = await readStyles();
  const continuedLayout = [
    [7, "1 / span 7"],
    [8, "9 / span 4"],
    [9, "3 / span 4"],
    [10, "7 / span 6"],
    [11, "1 / span 5"],
    [12, "7 / span 5"],
  ];

  for (const [index, columns] of continuedLayout) {
    assert.match(
      styles,
      new RegExp(
        `\\.archive-item:nth-child\\(${index}\\)\\s*\\{[^}]*grid-column:\\s*${columns.replaceAll("/", "\\/")}`,
      ),
      `archive photo ${index} should continue the large/small grid below`,
    );
  }
});

test("includes the detailed recruitment-push content hierarchy", async () => {
  const source = await readSiteShell();

  assert.match(source, /作为校级学生组织之一/);
  assert.doesNotMatch(source, /八大校级学生组织|校级八大组织/);
  assert.match(source, /为你用心在此/);
  assert.match(source, /服务网络 \/ HOW WE WORK/);
  assert.match(source, /部门组织架构/);
  assert.match(source, /WHAT YOU GAIN \/ 成长收获/);
  assert.match(source, /社团成长的见证者与赋能者/);
});

test("uses the official names and WeChat references for added events", async () => {
  const source = await readSiteShell();

  assert.doesNotMatch(source, /百团大战/);
  assert.match(source, /百团迎新/);
  assert.match(source, /NKRAyOcY-hg6igbNU3EKaw/);
  assert.match(source, /jpJ4v2e92OdXTs1vpUutZQ/);
  assert.match(source, /gxF6TlI9heCmiey8aMbzgw/);
});

test("links every department to its matching official recruitment article", async () => {
  const source = await readSiteShell();
  const expectedArticles = [
    ["综合事务部", "Hfm7AFG-PErTn29zBMBjEQ"],
    ["对外拓展部", "K7866xaO4eiBulctZHw_cA"],
    ["活动策划部", "tZb2h0iVncQiCrrLiR5GcA"],
    ["精品建设部", "0HJjq2ePYecXtPCrUgeKPQ"],
    ["传媒运营部", "8FlyicfHWwOfGgtls04w_w"],
    ["人力资源部", "hwmIUUSmy3UjJBE9PsjjMg"],
  ];

  for (const [department, articleId] of expectedArticles) {
    assert.match(
      source,
      new RegExp(
        `name: "${department}"[\\s\\S]*?articleUrl: "https://mp\\.weixin\\.qq\\.com/s/${articleId}"`,
      ),
      department,
    );
  }
});

test("links every structure card to its matching department introduction", async () => {
  const source = await readSiteShell();
  const slugs = [
    "general-affairs",
    "outreach",
    "event-planning",
    "quality-development",
    "media-design",
    "human-resources",
  ];

  for (const slug of slugs) {
    assert.match(
      source,
      new RegExp(`slug: "${slug}"`),
      slug,
    );
  }

  assert.match(
    source,
    /href=\{`\/departments\?department=\$\{department\.slug\}`\}/,
  );
  assert.match(source, /aria-label=\{`查看\$\{department\.name\}详细介绍`\}/);
});

test("publishes the latest 2026 signup and QQ recruitment entrances", async () => {
  const source = await readSiteShell();

  assert.match(source, /recruitment-signup-qr-2026\.png/);
  assert.match(source, /recruitment-qq-qr-2026\.png/);
  assert.match(source, /QQ群：1067554166/);
  assert.match(source, /jZQkafWlCyaKBbphdQnxdg/);
});

test("adds smooth, reduced-motion-safe transitions to primary content switches", async () => {
  const [source, styles] = await Promise.all([readSiteShell(), readStyles()]);

  assert.match(source, /isLeaving/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /className="content-switch"/);
  assert.match(source, /className="department-preview-swap"/);
  assert.match(source, /event-photo-swap/);
  assert.match(styles, /@keyframes page-enter/);
  assert.match(styles, /@keyframes page-leave/);
  assert.match(styles, /@keyframes content-switch-enter/);
  assert.match(styles, /@keyframes preview-switch-enter/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});

test("keeps event photos unobstructed by decorative overlays", async () => {
  const styles = await readStyles();

  assert.doesNotMatch(
    styles,
    /\.event-photo::after\s*\{/,
    "event photos should not be covered by the yellow decorative block",
  );
});
