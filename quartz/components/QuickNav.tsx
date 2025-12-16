import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { pathToRoot } from "../util/path"

interface NavLink {
    href: string
    label: string
}

interface Options {
    links: NavLink[]
}

const defaultOptions: Options = {
    links: [],
}

export default ((userOpts?: Partial<Options>) => {
    const opts = { ...defaultOptions, ...userOpts }

    const QuickNav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
        const baseDir = pathToRoot(fileData.slug!)

        return (
            <nav class={classNames(displayClass, "quick-nav")} aria-label="Quick navigation">
                <ul>
                    {opts.links.map((link) => (
                        <li>
                            <a href={baseDir + link.href}>{link.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }

    QuickNav.css = `
.quick-nav {
  margin-bottom: 0.5rem;
  width: 100%;
}

.quick-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
}

.quick-nav li {
  display: flex;
  align-items: center;
}

.quick-nav li:not(:last-child)::after {
  content: "|";
  margin-left: 0.8rem;
  color: var(--lightgray);
  font-weight: 300;
}

.quick-nav li a {
  display: block;
  color: var(--darkgray);
  font-weight: 500;
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.quick-nav li a:hover {
  color: var(--tertiary);
}
`

    return QuickNav
}) satisfies QuartzComponentConstructor<Options>
