import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", "STUDENT", "让热爱发生"],
  ["/about", "WHO", "我们是谁"],
  ["/departments", "SIX", "六个部门"],
  ["/events", "CLUB FAIR", "百团大战"],
  ["/archive", "CAMPUS", "校园档案"],
  ["/join", "JOIN", "新的故事"],
];

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${pathname}-${process.pid}-${Date.now()}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders every primary route", async () => {
  for (const [pathname, englishText, chineseText] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      pathname,
    );

    const html = await response.text();
    assert.match(html, new RegExp(englishText, "i"), pathname);
    assert.match(html, new RegExp(chineseText), pathname);
    assert.match(html, /浙江工商大学学生社团管理中心/, pathname);
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
  }
});

test("includes site-specific metadata", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.match(html, /<title>浙江工商大学学生社团管理中心<\/title>/i);
  assert.match(html, /property="og:image"/i);
  assert.match(html, /\/og\.png/i);
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
});
