import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

const profileCard = Component.DesktopOnly(
  Component.ProfileCard({
    name: "ParisRain",
    role: "IoT 物联网方向",
    org: "物联网工程 · 大二",
    bio: "用代码连接物理世界 🌱",
    avatarUrl: "static/avatar.svg",
    links: [
      { href: "https://github.com/ParisRain-T", label: "GitHub", icon: "github" },
      { href: "mailto:2026482602th@gmail.com", label: "Email", icon: "mail" },
    ],
  }),
)

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
    Component.MobileOnly(Component.PageTitle()),
    profileCard,
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
    Component.Explorer({
      filterFn: (node) => !["_meta", "tags", "assets"].includes(node.slugSegment),
      sortFn: (a, b) => {
        const order = ["projects", "notes", "posts", "til"]
        const aIdx = order.indexOf(a.slugSegment)
        const bIdx = order.indexOf(b.slugSegment)
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx
        if (aIdx !== -1) return -1
        if (bIdx !== -1) return 1
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, { numeric: true, sensitivity: "base" })
        }
        return !a.isFolder && b.isFolder ? 1 : -1
      },
    }),
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
    Component.MobileOnly(Component.PageTitle()),
    profileCard,
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
    Component.Explorer({
      filterFn: (node) => !["_meta", "tags", "assets"].includes(node.slugSegment),
      sortFn: (a, b) => {
        const order = ["projects", "notes", "posts", "til"]
        const aIdx = order.indexOf(a.slugSegment)
        const bIdx = order.indexOf(b.slugSegment)
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx
        if (aIdx !== -1) return -1
        if (bIdx !== -1) return 1
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, { numeric: true, sensitivity: "base" })
        }
        return !a.isFolder && b.isFolder ? 1 : -1
      },
    }),
  ],
  right: [],
}
