import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/luminousHero.scss"

export default (() => {
  const LuminousHero: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    // Only render on the homepage (index)
    if (fileData.slug !== "index") {
      return null
    }

    return (
      <div class={`luminous-hero ${displayClass ?? ""}`}>
        <div class="hero-background">
          <div class="mesh-gradient"></div>
          <div class="glass-overlay"></div>
        </div>

        <div class="hero-content">
          <h1 class="hero-title">
            Hi, I'm <span class="highlight">ParisRain</span>
          </h1>
          <div class="typewriter-container">
            <span class="static-text">I am a </span>
            <span class="dynamic-text"></span>
            <span class="cursor">|</span>
          </div>
          <p class="hero-subtitle">用代码连接物理世界 🌱</p>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
          const roles = ["IoT Explorer", "Developer", "Student", "Dreamer"];
          let roleIndex = 0;
          let charIndex = 0;
          let isDeleting = false;
          let timer;

          function type() {
            const dynamicText = document.querySelector(".dynamic-text");
            if (!dynamicText) return;

            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
              dynamicText.textContent = currentRole.substring(0, charIndex - 1);
              charIndex--;
            } else {
              dynamicText.textContent = currentRole.substring(0, charIndex + 1);
              charIndex++;
            }

            let nextSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
              isDeleting = true;
              nextSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
              isDeleting = false;
              roleIndex = (roleIndex + 1) % roles.length;
              nextSpeed = 500;
            }

            timer = setTimeout(type, nextSpeed);
          }

          function init() {
            // Clear any existing timer to prevent conflicts
            clearTimeout(timer);
            roleIndex = 0;
            charIndex = 0;
            isDeleting = false;
            type();
          }

          // Run on initial load and every SPA navigation
          document.addEventListener("nav", init);
          // Also run immediately in case we are already loaded
          init();
        ` }} />
      </div>
    )
  }

  LuminousHero.css = style
  return LuminousHero
}) satisfies QuartzComponentConstructor
