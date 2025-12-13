import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { SimpleSlug, resolveRelative } from "../util/path"
import { classNames } from "../util/lang"

type NavLink = {
  label: string
  slug: string
}

type Options = {
  links: NavLink[]
}

function isActiveLink(current: string, target: string): boolean {
  if (target === "/") return current === "index"

  // folder-like links (e.g. "posts/") should match nested pages too
  if (target.endsWith("/")) return current.startsWith(target)

  return current === target
}

export default ((opts: Options) => {
  const SiteNav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const current = fileData.slug ?? "index"

    return (
      <nav class={classNames(displayClass, "site-nav")} aria-label="Site navigation">
        <ul>
          {opts.links.map((link) => {
            const href = resolveRelative(fileData.slug!, link.slug as SimpleSlug)
            const active = isActiveLink(current, link.slug)
            return (
              <li>
                <a
                  href={href}
                  class={["internal", active ? "active" : ""].filter(Boolean).join(" ")}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  SiteNav.css = `
.site-nav ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  padding: 0;
  margin: 0;
}

.site-nav a {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--darkgray);
}

.site-nav a:hover {
  background: var(--lightgray);
}

.site-nav a.active {
  color: var(--dark);
  background: var(--highlight);
}
`

  return SiteNav
}) satisfies QuartzComponentConstructor<Options>
