import React from "react"
import CTA from "./CTA"
import CTACards from "./CTACards"
import ImageCaption from "./ImageCaption"
import InfoPanel from "./InfoPanel"
import Media from "./Media"
import PullQuote from "./PullQuote"
import Team from "./Team"
import Text from "./Text"

export { CTA, ImageCaption, Media, PullQuote, Team, Text }

// Sort and display the different slice options
export default function Slices({ slices }) {
  if (!slices) return null

  return slices.map((slice, index) => {
    const res = (() => {
      switch (slice.type) {
        case "call_to_action":
          return (
            <div key={index} className="slice-wrapper">
              {<CTA slice={slice} />}
            </div>
          )

        case "cta_cards":
          return (
            <div key={index} className="slice-wrapper">
              {<CTACards slice={slice} />}
            </div>
          )

        case "image_with_caption":
          return (
            <div key={index} className="slice-wrapper">
              {<ImageCaption slice={slice} />}
            </div>
          )

        case "info_panel":
          return (
            <div key={index} className="slice-wrapper">
              {<InfoPanel slice={slice} />}
            </div>
          )

        case "media":
          return (
            <div key={index} className="slice-wrapper">
              {<Media slice={slice} />}
            </div>
          )

        case "pull_quote":
          return (
            <div key={index} className="slice-wrapper">
              {<PullQuote slice={slice} />}
            </div>
          )

        case "team":
          return (
            <div key={index} className="slice-wrapper">
              {<Team slice={slice} />}
            </div>
          )

        case "text":
        case "text_with_embed":
          return (
            <div key={index} className="slice-wrapper">
              {<Text slice={slice} />}
            </div>
          )

        default:
          return
      }
    })()
    return res
  })
}
