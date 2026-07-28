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
  description: string[];
  image: string;
  imageCaption: string;
  previewPosition?: string;
  detailPosition?: string;
  keywords: string[];
  responsibilities: {
    title: string;
    text: string;
  }[];
  growth: string;
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
    slogan: "保障社管工作的连续性和活动的顺利开展。",
    description: [
      "综合事务部是学生社团管理中心里的一个综合性部门，对内主要负责社管经费报销、换届文件整理等，致力于保障社管工作的连续性和活动的顺利开展。",
      "对外负责全校社团的干部干事考核、社团行事历收集，以及以财务制度为中心，为全校社团解决财务报销等事宜；同时，协助召开新社团成立答辩会与社长大会。",
    ],
    image: "/assets/dept-general-affairs.webp",
    imageCaption: "WORK SCENE / 综合事务部工作总结",
    previewPosition: "12% 50%",
    detailPosition: "25% 50%",
    keywords: ["ORDER", "SERVICE", "COORDINATE"],
    responsibilities: [
      {
        title: "经费报销与文件整理",
        text: "负责社管经费报销、换届文件整理等工作。",
      },
      {
        title: "干部干事考核",
        text: "负责全校社团的干部干事考核。",
      },
      {
        title: "行事历与财务制度",
        text: "收集社团行事历，为全校社团解决财务报销等事宜。",
      },
      {
        title: "答辩会与社长大会",
        text: "协助召开新社团成立答辩会与社长大会。",
      },
    ],
    growth:
      "在综合事务部的大家庭里，大家可以充分发挥个人创意，培养沟通协调能力，锻炼组织领导和规划能力，也可以交到很多很好的朋友，让大学生活更加丰富多彩！",
  },
  {
    name: "对外拓展部",
    en: "OUTREACH",
    slogan: "校社管的活力引擎。",
    description: [
      "大家好，我们是对外拓展部，是校社管的活力引擎！对外我们为社团活动拉赞助、拓渠道，更是与各大高校联络共同策划活动的基石。",
      "对内我们是全校社团的联络平台，助力你更加全方位地认识学校。",
    ],
    image: "/assets/team-outdoor.webp",
    imageCaption: "TEAM SCENE / 对外拓展部团队活动",
    keywords: ["CONNECT", "EXPLORE", "PARTNERSHIP"],
    responsibilities: [
      {
        title: "拉赞助、拓渠道",
        text: "为社团活动拉赞助、拓渠道。",
      },
      {
        title: "高校联络",
        text: "与各大高校联络，共同策划活动。",
      },
      {
        title: "社团联络平台",
        text: "对内承担全校社团的联络工作。",
      },
      {
        title: "认识校园",
        text: "助力成员更加全方位地认识学校。",
      },
    ],
    growth:
      "在这里，我们可以让你的创意生根发芽，我们能够激发你在谈判场上的无限潜能，期待与你并肩，开启新的旅程！",
  },
  {
    name: "活动策划部",
    en: "EVENT PLANNING",
    slogan: "校园大型活动的核心推动者。",
    description: [
      "活动策划部是校园大型活动的核心推动者，无论是社团风采节、社团文化节，还是百团大战等标志性活动，从最初的创意构思到细致的筹备安排，从活动现场的统筹执行到结束后的复盘总结，每个环节都活跃着策划部成员的身影。",
    ],
    image: "/assets/dept-event-planning.webp",
    imageCaption: "EVENT SCENE / 社团文化节现场",
    keywords: ["IDEA", "ACTION", "STAGE"],
    responsibilities: [
      {
        title: "创意构思",
        text: "将脑海中天马行空的想法转化为具体方案。",
      },
      {
        title: "筹备安排",
        text: "在反复打磨中让创意落地生根。",
      },
      {
        title: "现场统筹执行",
        text: "参与活动现场的统筹与执行。",
      },
      {
        title: "复盘总结",
        text: "完成活动结束后的复盘总结。",
      },
    ],
    growth:
      "积极参与活动的全流程管理，不仅能锻炼活动策划的核心能力，还能在协调资源、应对突发情况的过程中，提升组织协调与沟通执行的综合素养，成为校园文化活动的幕后搭建者。",
  },
  {
    name: "精品建设部",
    en: "QUALITY DEVELOPMENT",
    slogan: "社团成长的见证者与赋能者。",
    description: [
      "作为学生社团管理中心的重要职能部门，精建部紧密连接全校社团，立足校园文化建设与社团提质发展两大核心方向。",
      "我们不止是冰冷的审核者，更是社团成长的见证者与赋能者。",
    ],
    image: "/assets/dept-quality-review.webp",
    imageCaption: "WORK SCENE / 精品建设部工作总结",
    previewPosition: "12% 50%",
    detailPosition: "25% 50%",
    keywords: ["QUALITY", "GROWTH", "REVIEW"],
    responsibilities: [
      {
        title: "管理评价体系",
        text: "牵头搭建完整的社团管理评价体系。",
      },
      {
        title: "荣誉评选",
        text: "统筹星级社团、七星社长、七星指导教师三大荣誉评选工作。",
      },
      {
        title: "年审注册",
        text: "负责全校社团年审注册，规范社团日常运营标准。",
      },
      {
        title: "精品活动培育",
        text: "开展精品活动立项申报与全程跟进培育。",
      },
    ],
    growth:
      "在这里你将深度参与校园社团顶层管理工作，近距离对接全校社团负责人、专业指导老师，熟练掌握评比策划、项目评审、统筹协调、材料统筹多项实用技能，亲手打造校园社团荣誉榜单，孵化出圈的特色精品活动。",
  },
  {
    name: "传媒运营部",
    en: "MEDIA & DESIGN",
    slogan: "校园社团的“传声筒”。",
    description: [
      "传媒运营部是校园社团的“传声筒”——整合全校社团动态，通过微信公众号将精彩活动预告、社管通告、各类评比信息及时传递给每一位同学。",
      "不止于此，我们还是校园活动的“记录者”与“设计师”：为社团风采节、社团文化节等年度盛会拍摄照片、剪辑视频，定格青春瞬间，用创意点亮每一次活动。",
    ],
    image: "/assets/dept-media-story.webp",
    imageCaption: "WELCOME SCENE / 传媒运营部纳新准备",
    detailPosition: "50% 43%",
    keywords: ["MEDIA", "STORY", "DESIGN"],
    responsibilities: [
      {
        title: "整合社团动态",
        text: "整合全校社团动态，及时传递给每一位同学。",
      },
      {
        title: "公众号运营",
        text: "发布精彩活动预告、社管通告和各类评比信息。",
      },
      {
        title: "推送排版",
        text: "运用专业平台打磨每一篇推送。",
      },
      {
        title: "拍摄与剪辑",
        text: "为年度盛会拍摄照片、剪辑视频。",
      },
    ],
    growth:
      "加入我们，你能深度参与公众号日常运营，在实践中掌握排版、设计、拍摄、剪辑等技能，更能结识一群志同道合的伙伴，一起学习、一起成长。",
  },
  {
    name: "人力资源部",
    en: "HUMAN RESOURCES",
    slogan: "活动开展的“幕后调度员”。",
    description: [
      "人力资源部是校级八大组织之一学生社团管理中心的一个人员统筹部门，对内负责统筹社团管理中心人员调配。",
      "作为活动开展的“幕后调度员”，人力资源部全程深度参与社管各类大型活动的筹备与执行，在协调人力、凝聚团队中发挥关键的作用。",
    ],
    image: "/assets/training-stage.webp",
    imageCaption: "MEETING SCENE / 学生社团管理中心总结大会",
    keywords: ["PEOPLE", "CULTURE", "GROWTH"],
    responsibilities: [
      {
        title: "人员调配",
        text: "统筹社团管理中心人员调配。",
      },
      {
        title: "内部大会与招新",
        text: "负责内部大会的召开与招新工作。",
      },
      {
        title: "考核与团建",
        text: "组织社管人员考核以及团建等活动。",
      },
      {
        title: "日常工作记录",
        text: "收集社管内部行事历并记录人员工作。",
      },
    ],
    growth:
      "在这里，你可以锻炼统筹规划与组织协调能力，在协作中收获团队管理经验与温暖的友谊！",
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
    image: "/assets/star-club-review.webp",
    description:
      "围绕规范运营、活动质量与文化影响力开展年度评价，挖掘认真耕耘的优秀社团，也为持续成长提供清晰方向。",
  },
  {
    name: "年度总结",
    en: "ANNUAL ASSEMBLY",
    date: "2025 / YEAR END",
    image: "/assets/training-stage.webp",
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
      image: "/assets/team-honors.webp",
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
          <Image
            className="brand-mark"
            src={assetPath("/assets/scmc-mark.png")}
            alt=""
            width={512}
            height={512}
            priority
          />
          <span className="brand-copy">
            <strong>浙江工商大学学生社团管理中心</strong>
            <small>Zhejiang Gongshang University Administrative Center of Students’ Associations</small>
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
            作为八大校级学生组织之一，学生社团管理中心是全校学生社团的管理、协调和监督机构，一直致力于挖掘社团的潜力，服务社团的发展，繁荣校园文化，建设和谐商大。
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
  const [tab, setTab] = useState<"intro" | "work" | "structure">("intro");

  const panel = {
    intro: (
      <div className="about-panel">
        <h2>
          ONE
          <br />
          CENTER
        </h2>
        <div className="about-copy-stack">
          <div className="about-copy-block">
            <p className="section-label">工作概况 / WHO WE ARE</p>
            <p className="body-copy">
              作为八大校级学生组织之一，学生社团管理中心是全校学生社团的管理、协调和监督机构，一直致力于挖掘社团的潜力，服务社团的发展，繁荣校园文化，建设和谐商大。
            </p>
          </div>
          <div className="about-copy-block">
            <p className="section-label">组织理念 / OUR MISSION</p>
            <p className="body-copy">
              学生社团管理中心秉承着“为你用心在此”的理念，为学生社团提供全方位的支持和服务。我们有完善的管理体制、优秀的干部团队和广泛的影响力，将为社团的发展提供可靠的保障。
            </p>
          </div>
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
        <div className="about-copy-stack">
          <div className="about-copy-block">
            <p className="section-label">大型活动举办 / CAMPUS EVENTS</p>
            <p className="body-copy">
              每年，我们都会举办一系列集中展示全校社团风采的活动。百团大战、社团风采节、社团文化节等等，这些精彩纷呈的活动都为同学们提供了展示自我才艺和交流学习的平台。
            </p>
          </div>
          <div className="function-list">
            {[
              ["百团大战", "全校社团集中展示"],
              ["社团风采节", "校园社团风采展示"],
              ["社团文化节", "社团文化交流平台"],
              ["社团星级评定", "激励社团创新发展"],
              ["精品活动立项", "培育社团特色项目"],
              ["七星社长评选", "发现优秀社团骨干"],
            ].map(([title, text], index) => (
              <div className="function-row" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    structure: (
      <div className="about-panel">
        <h2>
          SIX
          <br />
          TEAMS
        </h2>
        <div className="about-copy-stack">
          <div className="about-copy-block">
            <p className="section-label">部门组织架构 / STRUCTURE</p>
            <p className="body-copy">
              学生社团管理中心下设六个部门。主任团由三名成员组成，作为连接校团委和各部门的桥梁；每个部门内设置一名部长、二名副部长。各个部门分工明确、各司其职，为社团的个性化发展营造了良好的自主空间。
            </p>
          </div>
          <div className="structure-grid">
            {departments.map((department, index) => (
              <div className="structure-cell" key={department.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{department.name}</strong>
                <small>{department.en}</small>
              </div>
            ))}
          </div>
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
            ["intro", "01 CENTER"],
            ["work", "02 WHAT WE DO"],
            ["structure", "03 STRUCTURE"],
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
      <section className="about-photo-rail" aria-label="学生社团管理中心工作现场">
        {[
          ["/assets/club-fair.webp", "01 / 百团大战"],
          ["/assets/dept-quality-review.webp", "02 / 社团工作现场"],
          ["/assets/showcase-stage.webp", "03 / 社团风采节"],
        ].map(([image, caption]) => (
          <figure className="about-photo-card" key={image}>
            <div>
              <Image
                src={assetPath(image)}
                alt={caption.replace(/^\d+\s\/\s/, "")}
                width={1200}
                height={800}
                sizes="(max-width: 800px) 100vw, 34vw"
              />
            </div>
            <figcaption>{caption}</figcaption>
          </figure>
        ))}
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
            <div className="department-copy">
              {current.description.map((paragraph) => (
                <p className="body-copy" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
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
                style={{ objectPosition: current.detailPosition }}
              />
            </div>
            <p className="detail-caption">{current.imageCaption}</p>
            <ol className="responsibility-list">
              {current.responsibilities.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="department-growth">
          <div>
            <p className="section-label">WHAT YOU GAIN / 成长收获</p>
            <span>{current.name}</span>
          </div>
          <p>{current.growth}</p>
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
              style={{ objectPosition: current.previewPosition }}
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
