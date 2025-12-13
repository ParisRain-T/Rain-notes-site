import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
<<<<<<< ours
  header: [
    Component.Flex({
      wrap: "wrap",
      gap: "0.75rem",
      components: [
        { Component: Component.PageTitle(), shrink: false },
        {
          Component: Component.SiteNav({
            links: [
              { label: "开始", slug: "start-here" },
              { label: "文章", slug: "posts/" },
              { label: "笔记", slug: "notes/" },
              { label: "项目", slug: "projects/" },
              { label: "近况", slug: "now" },
              { label: "关于", slug: "about" },
            ],
          }),
          grow: true,
        },
        { Component: Component.Search(), grow: true, basis: "14rem" },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
  ],
  afterBody: [
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug === "index",
      component: Component.Flex({
        wrap: "wrap",
        gap: "2rem",
        components: [
          {
            Component: Component.RecentNotes({
              title: "最新文章",
              limit: 5,
              showTags: false,
              linkToMore: "posts/" as SimpleSlug,
              filter: (f) => (f.slug?.startsWith("posts/") ?? false) && f.slug !== "posts/index",
            }),
            grow: true,
            basis: "22rem",
          },
          {
            Component: Component.RecentNotes({
              title: "最新笔记",
              limit: 5,
              showTags: false,
              linkToMore: "notes/" as SimpleSlug,
              filter: (f) => (f.slug?.startsWith("notes/") ?? false) && f.slug !== "notes/index",
            }),
            grow: true,
            basis: "22rem",
          },
        ],
      }),
    }),
  ],
=======
  header: [],
  afterBody: [],
>>>>>>> theirs
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
