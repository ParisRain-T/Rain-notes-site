
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint center-container not-found-container">
      <div class="glitch-wrapper">
        <h1 class="glitch" data-text="404">404</h1>
      </div>
      <p class="not-found-text">Signal Lost in Deep Space.</p>
      <p class="not-found-subtext">You have drifted to the edge of the digital garden.</p>
      <a href={baseDir} class="warp-btn">
        <span class="btn-text">Initiate Warp Drive (Home)</span>
      </a>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
