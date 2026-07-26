"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function assetPath(path: string): string {
  return `${assetBasePath}${path}`;
}

type PageName =
  | "home"
  | "about"
  | "departments"
  | "events"
  | "archive"
  | "join";

type Department = {
  name: string;
  en: string;
  slogan: string;
  description: string;
  image: string;
  keywords: string[];
  responsibilities: string[];
};

type EventItem = {
  name: string;
  en: string;
  date: string;
  image: string;
  description: string;
};

type ArchiveItem = {
  image: string;
  title: string;
  date: string;
};

const navItems: { page: PageName; label: string; href: string; num: string }[] =
  [
    { page: "home", label: "Home", href: "/", num: "00" },
    { page: "about", label: "About", href: "/about", num: "01" },
    {
      page: "departments",
      label: "Departments",
      href: "/departments",
      num: "02",
    },
    { page: "events", label: "Events", href: "/events", num: "03" },
    { page: "archive", label: "Archive", href: "/archive", num: "04" },
    { page: "join", label: "Join", href: "/join", num: "05" },
  ];

const departments: Department[] = [
  {
    name: "综合事务部",
    en: "GENERAL AFFAIRS",
    slogan: "让每一次运转，都准确而有序。",
    description:
      "综合事务部对内保障经费报销、换届文件整理和工作衔接，对外统筹社团干部干事考核、行事历收集及财务制度服务，并协助新社团成立答辩会与社长大会。",
    image: "/assets/team-conference.webp",
    keywords: ["ORDER", "SERVICE", "COORDINATE"],
    responsibilities: ["经费与财务服务", "文件与行事历管理", "社团考核", "会议与答辩支持"],
  },
  {
    name: "对外拓展部",
    en: "OUTREACH",
    slogan: "向外连接，让创意抵达更远。",
    description:
      "对外拓展部是校社管的活力引擎：为社团活动拓展资源、搭建合作渠道，同时承担高校联络与校内社团沟通，让每一次交流都成为新的可能。",
    image: "/assets/team-outdoor.webp",
    keywords: ["CONNECT", "EXPLORE", "PARTNERSHIP"],
    responsibilities: ["活动资源拓展", "高校联络", "社团沟通", "合作项目策划"],
  },
  {
    name: "活动策划部",
    en: "EVENT PLANNING",
    slogan: "把天马行空，变成真实现场。",
    description:
      "活动策划部全程推动社团风采节、社团文化节与百团大战等校园活动，从创意构思、筹备执行到复盘总结，让想法在协作中落地。",
    image: "/assets/showcase-stage.webp",
    keywords: ["IDEA", "ACTION", "STAGE"],
    responsibilities: ["活动创意策划", "流程与现场统筹", "资源协调", "活动复盘"],
  },
  {
    name: "精品建设部",
    en: "QUALITY DEVELOPMENT",
    slogan: "在规范与创新之间，陪伴社团成长。",
    description:
      "精品建设部搭建社团管理评价体系，统筹星级社团、七星社长与七星指导教师评选，负责年审注册与精品活动立项培育，是社团成长的见证者与赋能者。",
    image: "/assets/training-stage.webp",
    keywords: ["QUALITY", "GROWTH", "REVIEW"],
    responsibilities: ["年审注册", "荣誉评选", "精品活动立项", "项目跟进培育"],
  },
  {
    name: "传媒运营部",
    en: "MEDIA & DESIGN",
    slogan: "记录现场，也设计被记住的方式。",
    description:
      "传媒运营部整合社团动态，运营微信公众号并完成推送排版；同时以摄影、视频与视觉设计记录校园活动，让每一段青春被看见、被记住。",
    image: "/assets/team-night.webp",
    keywords: ["MEDIA", "STORY", "DESIGN"],
    responsibilities: ["公众号运营", "视觉排版设计", "摄影摄像", "视频剪辑"],
  },
  {
    name: "人力资源部",
    en: "HUMAN RESOURCES",
    slogan: "连接成员，陪伴成长。",
    description:
      "人力资源部负责中心人员统筹、内部会议、招新与大型活动人力安排，也承担成员考核、团建和工作记录，在协作中凝聚团队。",
    image: "/assets/team-room.webp",
    keywords: ["PEOPLE", "CULTURE", "GROWTH"],
    responsibilities: ["人员统筹", "招新与考核", "会议组织", "团队建设"],
  },
];

const events: EventItem[] = [
  {
    name: "百团大战",
    en: "CLUB FAIR",
    date: "ANNUAL / AUTUMN",
    image: "/assets/club-fair.webp",
    description:
      "全校社团集中亮相的年度相遇。展位、舞台和互动体验共同展开，让新同学在一天之内看见校园兴趣版图，并找到属于自己的同行者。",
  },
  {
    name: "社团风采节",
    en: "CLUB SHOWCASE",
    date: "ANNUAL / CAMPUS",
    image: "/assets/hero-night.webp",
    description:
      "属于社团人的高光舞台。校社管连接各类学生社团，用演出、展示与交流把多元校园文化带到每一位同学面前。",
  },
  {
    name: "社团文化节",
    en: "CULTURE FESTIVAL",
    date: "2026 / SPRING",
    image: "/assets/culture-festival.webp",
    description:
      "以主题市集、社团体验与创意活动为线索，邀请同学走进社团文化。每一次参与，都是校园共同记忆的一部分。",
  },
  {
    name: "星级社团评定",
    en: "STAR CLUB REVIEW",
    date: "ANNUAL / REVIEW",
    image: "/assets/training-stage.webp",
    description:
      "围绕规范运营、活动质量与文化影响力开展年度评价，挖掘认真耕耘的优秀社团，也为持续成长提供清晰方向。",
  },
  {
    name: "年度总结",
    en: "ANNUAL ASSEMBLY",
    date: "2025 / YEAR END",
    image: "/assets/team-awards.webp",
    description:
      "回望一年的协作、服务与创造。我们把重要节点整理成档案，也把每一份并肩努力留给下一段旅程。",
  },
];

const archive: Record<string, ArchiveItem[]> = {
  "2026": [
    {
      image: "/assets/culture-festival.webp",
      title: "社团文化节 · 春之行径",
      date: "2026 / SPRING",
    },
    {
      image: "/assets/spring-festival.webp",
      title: "校园舞台",
      date: "2026 / SPRING",
    },
    {
      image: "/assets/team-spring.webp",
      title: "春日合影",
      date: "2026 / SPRING",
    },
    {
      image: "/assets/club-fair.webp",
      title: "社团招新现场",
      date: "CAMPUS / ARCHIVE",
    },
    {
      image: "/assets/team-night.webp",
      title: "风采节之后",
      date: "CAMPUS / NIGHT",
    },
    {
      image: "/assets/team-classroom.webp",
      title: "团队共创",
      date: "SCMC / TEAM",
    },
  ],
  "2025": [
    {
      image: "/assets/team-annual.webp",
      title: "年度大会",
      date: "2025 / ANNUAL",
    },
    {
      image: "/assets/team-conference.webp",
      title: "总结与启程",
      date: "2025 / MEETING",
    },
    {
      image: "/assets/team-awards.webp",
      title: "荣誉时刻",
      date: "2025 / CEREMONY",
    },
    {
      image: "/assets/team-celebration.webp",
      title: "共同经历",
      date: "2025 / TEAM",
    },
    {
      image: "/assets/team-outdoor.webp",
      title: "山野团建",
      date: "2025 / OUTDOOR",
    },
    {
      image: "/assets/team-room.webp",
      title: "部门记忆",
      date: "2025 / TEAM",
    },
  ],
};

function Header({
  page,
  menuOpen,
  setMenuOpen,
}: {
  page: PageName;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <>
      <header className="topbar">
        <Link className="brand-link" href="/" aria-label="返回首页">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="brand-copy">
            <strong>浙江工商大学学生社团管理中心</strong>
            <small>Student Club Management Center</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <Link
              className="nav-link"
              href={item.href}
              key={item.page}
              aria-current={page === item.page ? "page" : undefined}
            >
              <span>{item.num}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          MENU
        </button>
      </header>
      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <div className="mobile-menu-header">
            <span>SCMC / NAVIGATION</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="关闭菜单"
            >
              CLOSE ×
            </button>
          </div>
          <nav className="mobile-menu-nav" aria-label="移动端导航">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.page}
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.num}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>SCMC / 2026</span>
      <span>Student Club Management Center</span>
      <span>© 2026 Zhejiang Gongshang University</span>
    </footer>
  );
}

function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-photo">
          <Image
            src={assetPath("/assets/hero-night.webp")}
            alt="学生社团风采节现场合影"
            fill
            priority
            sizes="(max-width: 800px) 80vw, 52vw"
          />
          <span className="home-photo-tag">CAMPUS ARCHIVE / 001</span>
        </div>
        <div className="bauhaus-rail" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="home-copy">
          <span className="home-eyebrow">ZJSU / CAMPUS CULTURE</span>
          <h1 className="home-title">
            STUDENT
            <br />
            CLUB
            <br />
            CENTER
          </h1>
          <div>
            <p className="home-motto">让热爱发生，让青春留下痕迹。</p>
            <div className="home-meta">
              <span>SCMC / 2026</span>
              <span>HANGZHOU</span>
            </div>
          </div>
        </div>
      </section>
      <section className="home-intro">
        <h2>
          CAMPUS
          <br />
          ARCHIVE
        </h2>
        <div>
          <p className="section-label">WHO WE ARE / 我们是谁</p>
          <p className="body-copy">
            浙江工商大学学生社团管理中心是全校学生社团的管理、协调与监督机构。我们挖掘社团潜力、服务社团发展，也用真实影像记录一代学生共同经历的校园文化。
          </p>
          <Link className="text-link" href="/about">
            Discover SCMC <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function About() {
  const [tab, setTab] = useState<"intro" | "work" | "values">("intro");

  const panel = {
    intro: (
      <div className="about-panel">
        <h2>
          ONE
          <br />
          CENTER
        </h2>
        <div>
          <p className="section-label">INTRODUCTION / 中心介绍</p>
          <p className="body-copy">
            作为校级学生组织，浙江工商大学学生社团管理中心连接校团委、全校学生社团与每一位热爱校园文化的同学。我们以“为你用心在此”为理念，通过日常管理、活动服务、项目培育与宣传记录，为社团提供完整支持，也让校园里不同的兴趣与创造被看见。
          </p>
        </div>
      </div>
    ),
    work: (
      <div className="about-panel">
        <h2>
          WHAT
          <br />
          WE DO
        </h2>
        <div className="function-list">
          {[
            ["社团管理", "年审注册、制度支持与日常协同。"],
            ["活动服务", "推动百团大战、风采节与文化节等品牌活动。"],
            ["文化建设", "培育精品项目，丰富校园文化表达。"],
            ["组织培训", "支持社团负责人和骨干持续成长。"],
            ["宣传展示", "运营新媒体，以影像和设计记录现场。"],
            ["综合服务", "提供财务、考核、资源和联络支持。"],
          ].map(([title, text], index) => (
            <div className="function-row" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    values: (
      <div className="about-panel">
        <h2>
          OUR
          <br />
          VALUES
        </h2>
        <div className="values-grid">
          {[
            ["SERVICE", "服务"],
            ["CONNECT", "连接"],
            ["GROW", "成长"],
            ["CREATE", "创造"],
          ].map(([en, zh]) => (
            <div className="value-cell" key={en}>
              <strong>{en}</strong>
              <span>{zh}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div className="page-shell">
      <section className="about-hero">
        <div>
          <p className="page-kicker">01 / ABOUT</p>
          <h1 className="display-title">
            WHO
            <br />
            WE ARE
          </h1>
          <p className="zh-title">我们是谁？</p>
        </div>
        <div className="about-hero-image">
          <Image
            src={assetPath("/assets/team-room.webp")}
            alt="学生社团管理中心成员合影"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 42vw"
          />
        </div>
      </section>
      <section className="about-content">
        <div className="tabs" role="tablist" aria-label="关于我们内容切换">
          {[
            ["intro", "01 INTRODUCTION"],
            ["work", "02 WHAT WE DO"],
            ["values", "03 VALUES"],
          ].map(([key, label]) => (
            <button
              className={`tab-button ${tab === key ? "active" : ""}`}
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key as typeof tab)}
            >
              {label}
            </button>
          ))}
        </div>
        {panel[tab]}
      </section>
    </div>
  );
}

function Departments() {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const current = departments[detailIndex ?? previewIndex];

  if (detailIndex !== null) {
    return (
      <div className="page-shell">
        <button
          className="back-button"
          type="button"
          onClick={() => setDetailIndex(null)}
        >
          ← BACK TO DEPARTMENTS
        </button>
        <section className="department-detail">
          <div>
            <p className="page-kicker">
              02 / {String(detailIndex + 1).padStart(2, "0")}
            </p>
            <h1>{current.en}</h1>
            <p className="department-cn">{current.name}</p>
            <p className="department-slogan">{current.slogan}</p>
            <p className="body-copy">{current.description}</p>
            <div className="keyword-row" aria-label="部门关键词">
              {current.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="detail-image">
              <Image
                src={assetPath(current.image)}
                alt={`${current.name}工作与团队照片`}
                width={1200}
                height={900}
                sizes="(max-width: 800px) 100vw, 50vw"
              />
            </div>
            <ol className="responsibility-list">
              {current.responsibilities.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="departments-layout">
        <div>
          <p className="page-kicker">02 / DEPARTMENTS</p>
          <h1 className="display-title">
            SIX
            <br />
            TEAMS
          </h1>
          <p className="zh-title">六个部门，同一个目标。</p>
          <div className="department-list">
            {departments.map((department, index) => (
              <button
                className="department-row"
                type="button"
                key={department.name}
                onMouseEnter={() => setPreviewIndex(index)}
                onFocus={() => setPreviewIndex(index)}
                onClick={() => setDetailIndex(index)}
              >
                <span className="num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong>{department.name}</strong>
                  <small>{department.en}</small>
                </span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
        <aside className="department-preview" aria-live="polite">
          <div className="department-preview-image">
            <Image
              src={assetPath(current.image)}
              alt={`${current.name}预览`}
              width={1000}
              height={1250}
              sizes="(max-width: 800px) 100vw, 42vw"
            />
          </div>
          <div className="department-preview-meta">
            <span>{current.en}</span>
            <span>{current.keywords.join(" / ")}</span>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Events() {
  const [eventIndex, setEventIndex] = useState(0);
  const event = events[eventIndex];

  return (
    <div className="page-shell">
      <section className="events-hero">
        <div>
          <p className="page-kicker">03 / EVENTS</p>
          <h1 className="event-title">{event.en}</h1>
          <p className="event-cn">{event.name}</p>
          <span className="event-date">{event.date}</span>
        </div>
        <div className="event-photo">
          <Image
            key={event.image}
            src={assetPath(event.image)}
            alt={`${event.name}活动现场`}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 58vw"
          />
        </div>
      </section>
      <div className="event-switcher" aria-label="切换活动">
        {events.map((item, index) => (
          <button
            className={eventIndex === index ? "active" : ""}
            type="button"
            key={item.name}
            aria-label={`查看${item.name}`}
            aria-pressed={eventIndex === index}
            onClick={() => setEventIndex(index)}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      <section className="event-story">
        <h2>
          MAKE
          <br />
          IT HAPPEN
        </h2>
        <div>
          <p className="section-label">ABOUT THIS EVENT / 活动记录</p>
          <p className="body-copy">{event.description}</p>
        </div>
      </section>
    </div>
  );
}

function Archive() {
  const [year, setYear] = useState("2026");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = archive[year];
  const activeItem = openIndex === null ? null : items[openIndex];

  useEffect(() => {
    if (openIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") {
        setOpenIndex((current) =>
          current === null ? 0 : (current + 1) % items.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setOpenIndex((current) =>
          current === null
            ? 0
            : (current - 1 + items.length) % items.length,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openIndex, items.length]);

  return (
    <div className="page-shell">
      <section className="archive-header">
        <div>
          <p className="page-kicker">04 / ARCHIVE</p>
          <h1 className="display-title">
            CAMPUS
            <br />
            ARCHIVE
          </h1>
          <p className="zh-title">校园档案 · 共同经历的影像记录</p>
        </div>
        <div className="year-switcher" aria-label="选择档案年份">
          {Object.keys(archive)
            .sort()
            .reverse()
            .map((archiveYear) => (
              <button
                className={year === archiveYear ? "active" : ""}
                type="button"
                key={archiveYear}
                aria-pressed={year === archiveYear}
                onClick={() => {
                  setYear(archiveYear);
                  setOpenIndex(null);
                }}
              >
                {archiveYear}
              </button>
            ))}
        </div>
      </section>
      <section className="archive-grid" aria-live="polite">
        {items.map((item, index) => (
          <button
            className="archive-item"
            type="button"
            key={`${year}-${item.image}`}
            onClick={() => setOpenIndex(index)}
            aria-label={`打开大图：${item.title}`}
          >
            <Image
              src={assetPath(item.image)}
              alt={item.title}
              width={1200}
              height={900}
              loading="lazy"
              sizes="(max-width: 520px) 100vw, (max-width: 800px) 50vw, 58vw"
            />
            <span className="archive-caption">
              <span>{String(index + 1).padStart(3, "0")}</span>
              <span>
                {item.title}
                <br />
                {item.date}
              </span>
            </span>
          </button>
        ))}
      </section>
      {activeItem && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title}大图预览`}
          onClick={() => setOpenIndex(null)}
        >
          <div className="lightbox-top">
            <span>
              {year} / {String((openIndex ?? 0) + 1).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => setOpenIndex(null)}>
              CLOSE ×
            </button>
          </div>
          <div className="lightbox-image">
            <Image
              src={assetPath(activeItem.image)}
              alt={activeItem.title}
              width={1800}
              height={1200}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
          <div className="lightbox-bottom">
            <div>
              <strong>{activeItem.title}</strong>
              <br />
              <span>{activeItem.date}</span>
            </div>
            <div
              className="lightbox-controls"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenIndex(
                    ((openIndex ?? 0) - 1 + items.length) % items.length,
                  )
                }
              >
                ← PREV
              </button>
              <button
                type="button"
                onClick={() =>
                  setOpenIndex(((openIndex ?? 0) + 1) % items.length)
                }
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Join() {
  return (
    <>
      <section className="page-shell join-hero">
        <div>
          <p className="page-kicker">05 / JOIN</p>
          <h1 className="join-title">
            JOIN
            <br />
            US.
          </h1>
          <p className="join-subtitle">新的故事，等待你的加入。</p>
          <span className="join-year">RECRUITMENT / 2026</span>
        </div>
        <div className="join-card">
          <h2>WECHAT / 公众号</h2>
          <Image
            src={assetPath("/assets/wechat-qr.jpg")}
            alt="浙江工商大学学生社团管理中心微信公众号二维码"
            width={640}
            height={640}
            priority
          />
          <p>
            扫码关注公众号，获取纳新时间、报名方式与最新校园社团活动信息。
          </p>
        </div>
      </section>
      <section className="page-shell join-details">
        <h2>
          YOUR
          <br />
          NEXT
          <br />
          STEP
        </h2>
        <div className="join-steps">
          {[
            [
              "认识我们",
              "了解综合事务、对外拓展、活动策划、精品建设、传媒运营和人力资源六个部门。",
            ],
            ["关注招新", "通过微信公众号获取正式纳新通知与现场安排。"],
            ["提交报名", "按推文指引加入官方纳新群，并完成线上报名。"],
            ["一起创造", "把你的兴趣、能力和好奇心带来，与我们共同建设校园文化。"],
          ].map(([title, text], index) => (
            <div className="join-step" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function SiteShell({ page }: { page: PageName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const content = useMemo(
    () =>
      ({
        home: <Home />,
        about: <About />,
        departments: <Departments />,
        events: <Events />,
        archive: <Archive />,
        join: <Join />,
      })[page],
    [page],
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="site-frame">
      <Header
        page={page}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main className="page">{content}</main>
      <Footer />
    </div>
  );
}

