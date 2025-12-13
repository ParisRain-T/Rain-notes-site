import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/profileCard.scss"
import { classNames } from "../util/lang"
import { isAbsoluteURL, joinSegments, pathToRoot } from "../util/path"

type ProfileLinkIcon = "github" | "x" | "linkedin" | "mail" | "rss" | "link"

export type ProfileLink = {
  href: string
  label: string
  icon?: ProfileLinkIcon
}

export interface ProfileSection {
  title: string
  items: string[]
}

export interface Options {
  name: string
  role?: string
  org?: string
  location?: string
  bio?: string
  avatarUrl?: string
  avatarAlt?: string
  links?: ProfileLink[]
  sections?: ProfileSection[]
}

function Icon({ icon }: { icon: ProfileLinkIcon }) {
  switch (icon) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.77.6-3.35-1.18-3.35-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.64-1.35-2.21-.25-4.54-1.11-4.54-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.12 2.51.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.39.2 2.42.1 2.67.64.7 1.03 1.59 1.03 2.68 0 3.85-2.33 4.7-4.55 4.95.36.31.69.93.69 1.88v2.79c0 .26.18.57.69.48A10 10 0 0 0 12 2Z"
          />
        </svg>
      )
    case "x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.9 2H22l-6.8 7.8L22.6 22h-6l-4.7-6.1L6.6 22H3.5l7.3-8.4L2 2h6.2l4.3 5.6L18.9 2Zm-1 18h1.7L7.2 3.9H5.4L17.9 20Z"
          />
        </svg>
      )
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 21h4V9H3v12Zm7 0h4v-6.2c0-1.7.3-3.3 2.4-3.3 2 0 2 1.9 2 3.4V21h4v-7c0-3.4-.7-6-4.7-6-1.9 0-3.2 1-3.7 2H14V9h-4v12Z"
          />
        </svg>
      )
    case "mail":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
          />
        </svg>
      )
    case "rss":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.18 17.82a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36Zm-2.9-8.3v3.1A11.7 11.7 0 0 1 14.4 23.7h3.1C17.5 15.09 10.9 8.5 3.28 9.52Zm0-6.1v3.1C13.13 6.52 21.48 14.87 21.48 24h3.1C24.58 13.16 14.12 2.7 3.28 3.42Z"
          />
        </svg>
      )
    case "link":
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M10.59 13.41a1 1 0 0 0 1.41 1.41l3.54-3.54a3 3 0 0 0-4.24-4.24L9.88 8.46a1 1 0 1 0 1.41 1.41l1.42-1.42a1 1 0 0 1 1.41 1.42l-3.54 3.54ZM13.41 10.59a1 1 0 0 0-1.41-1.41L8.46 12.7a3 3 0 0 0 4.24 4.24l1.42-1.42a1 1 0 1 0-1.41-1.41l-1.42 1.42a1 1 0 0 1-1.41-1.42l3.53-3.52Z"
          />
        </svg>
      )
  }
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "PR"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default ((opts: Options) => {
  const ProfileCard: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const baseDir = pathToRoot(fileData.slug!)
    const avatarSrc = opts.avatarUrl
      ? isAbsoluteURL(opts.avatarUrl)
        ? opts.avatarUrl
        : joinSegments(baseDir, opts.avatarUrl)
      : joinSegments(baseDir, "static/icon.png")

    return (
      <aside class={classNames(displayClass, "profile-card")} aria-label="Profile">
        <a class="profile-card__avatar" href={baseDir} aria-label="Home">
          <span class="profile-card__avatarFrame">
            <span class="profile-card__avatarFallback" aria-hidden="true">
              {initials(opts.name)}
            </span>
            <img src={avatarSrc} alt={opts.avatarAlt ?? ""} loading="lazy" />
          </span>
        </a>

        <div class="profile-card__identity">
          <a class="profile-card__name" href={baseDir}>
            {opts.name}
          </a>
          {opts.role ? <div class="profile-card__role">{opts.role}</div> : null}
          {opts.org ? <div class="profile-card__org">{opts.org}</div> : null}
          {opts.location ? <div class="profile-card__location">{opts.location}</div> : null}
        </div>

        {opts.bio ? <p class="profile-card__bio">{opts.bio}</p> : null}

        {opts.links && opts.links.length > 0 ? (
          <nav class="profile-card__links" aria-label="Links">
            {opts.links.map((link) => (
              <a
                class="profile-card__link"
                href={isAbsoluteURL(link.href) ? link.href : joinSegments(baseDir, link.href)}
                aria-label={link.label}
              >
                <Icon icon={link.icon ?? "link"} />
              </a>
            ))}
          </nav>
        ) : null}

        {opts.sections && opts.sections.length > 0 ? (
          <div class="profile-card__sections">
            {opts.sections.map((section) => (
              <section class="profile-card__section">
                <h3 class="profile-card__sectionTitle">{section.title}</h3>
                <ul class="profile-card__sectionList">
                  {section.items.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : null}
      </aside>
    )
  }

  ProfileCard.css = style
  return ProfileCard
}) satisfies QuartzComponentConstructor<Options>
