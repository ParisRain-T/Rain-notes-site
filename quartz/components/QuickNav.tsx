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
  margin-bottom: 1rem;
}

.quick-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.quick-nav li a {
  display: block;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  color: var(--dark);
  font-weight: 500;
  font-size: 0.95rem;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.quick-nav li a:hover {
  background-color: var(--lightgray);
  color: var(--tertiary);
}
`

    return QuickNav
}) satisfies QuartzComponentConstructor<Options>
