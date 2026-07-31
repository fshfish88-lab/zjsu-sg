import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["index.html", "STUDENT", "让热爱发生"],
  ["about/index.html", "WHO", "我们是谁"],
  ["departments/index.html", "SIX", "六个部门"],
  ["events/index.html", "CLUB FAIR", "百团大战"],
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
  assert.match(html, /src="\/zjsu-sg\/assets\/hero-night\.webp"/i);
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
    "hero-night.webp",
    "club-fair.webp",
    "culture-festival.webp",
    "team-room.webp",
    "spring-festival.webp",
  ];

  for (const photo of homePhotos) {
    assert.match(source, new RegExp(`/assets/${photo.replace(".", "\\.")}`));
  }

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

test("expands the official campus work overview with six matching photo stories", async () => {
  const source = await readSiteShell();
  const expectedActivities = [
    ["百团大战", "club-fair.webp"],
    ["社团风采节", "showcase-stage.webp"],
    ["社团文化节", "culture-festival.webp"],
    ["社团星级评定", "star-club-review.webp"],
    ["精品活动立项", "project-review.webp"],
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

test("keeps review, annual assembly, and honor archive photos semantically paired", async () => {
  const source = await readSiteShell();

  assert.match(
    source,
    /name: "星级社团评定"[\s\S]*?image: "\/assets\/star-club-review\.webp"/,
  );
  assert.match(
    source,
    /name: "年度总结"[\s\S]*?image: "\/assets\/training-stage\.webp"/,
  );
  assert.match(
    source,
    /image: "\/assets\/team-honors\.webp"[\s\S]*?title: "荣誉时刻"/,
  );
});

test("includes the detailed recruitment-push content hierarchy", async () => {
  const source = await readSiteShell();

  assert.match(source, /作为八大校级学生组织之一/);
  assert.match(source, /为你用心在此/);
  assert.match(source, /服务网络 \/ HOW WE WORK/);
  assert.match(source, /部门组织架构/);
  assert.match(source, /WHAT YOU GAIN \/ 成长收获/);
  assert.match(source, /社团成长的见证者与赋能者/);
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
