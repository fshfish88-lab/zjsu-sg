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

test("keeps each department paired with its official recruitment photo", async () => {
  const source = await readSiteShell();
  const expectedPairs = [
    ["综合事务部", "team-night.webp"],
    ["对外拓展部", "team-outdoor.webp"],
    ["活动策划部", "team-celebration.webp"],
    ["精品建设部", "team-annual.webp"],
    ["传媒运营部", "team-conference.webp"],
    ["人力资源部", "team-awards.webp"],
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
