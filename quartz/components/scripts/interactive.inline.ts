


// 3D Tilt Effect
function initTilt() {
    const cards = document.querySelectorAll<HTMLElement>(".section-li > .section, .profile-card, .luminous-hero")

    cards.forEach((card) => {
        // Add transition style specifically for the transform
        card.style.transition = "transform 0.1s ease-out"

        let ticking = false

        card.addEventListener("mousemove", (e: MouseEvent) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top

                    const centerX = rect.width / 2
                    const centerY = rect.height / 2

                    // Calculate rotation (max 5 degrees for sublety)
                    const rotateX = ((y - centerY) / centerY) * -5
                    const rotateY = ((x - centerX) / centerX) * 5

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
                    ticking = false
                })
                ticking = true
            }
        })

        card.addEventListener("mouseleave", () => {
            card.style.transition = "transform 0.5s ease-out"
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
        })
    })
}

// Scroll Reveal Effect
function initScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible")
                    observer.unobserve(entry.target) // Only animate once
                }
            })
        },
        {
            threshold: 0.1,
            rootMargin: "50px",
        },
    )

    // Select elements to animate
    const targets = document.querySelectorAll(
        "article > h1, article > h2, article > h3, article > p, article > ul > li, article > ol > li, .section-li",
    )

    targets.forEach((el) => {
        el.classList.add("reveal-hidden")
        observer.observe(el)
    })
}

// Initialization Logic
document.addEventListener("nav", () => {
    initTilt()
    initScrollReveal()
})

// Initial run
window.addEventListener("load", () => {
    initTilt()
    initScrollReveal()
})
