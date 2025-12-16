import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/interactive.inline"

const InteractiveEffects: QuartzComponent = (_props: QuartzComponentProps) => {
    return null // No visual output, just script injection
}

InteractiveEffects.afterDOMLoaded = script

export default (() => InteractiveEffects) satisfies QuartzComponentConstructor
