import React from "react"
import { RichText, Link } from "prismic-reactjs"
import { graphql } from "gatsby"
import { BannerBG } from "../components/Banner"
import Layout from "../components/layouts"
import Slices from "../components/slices"

// Query for the Blog Home content in Prismic
export const query = graphql`
  {
    prismic {
      allHome_pages {
        edges {
          node {
            _meta {
              id
              uid
              type
            }
            cta_link {
              ... on PRISMIC__ExternalLink {
                target
                _linkType
                url
              }
            }
            sponsors_title
            subtitle
            cta_text
            title
            banner
            body {
              ... on PRISMIC_Home_pageBodyCta_cards {
                type
                label
                primary {
                  cta_cards_title
                  cta_explainer_text
                }
                fields {
                  card_description
                  cta_background
                  card_title
                  cta_text
                  cta_internal_link
                  cta_link {
                    _linkType
                    ... on PRISMIC__ExternalLink {
                      target
                      _linkType
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
      allSponsorss {
        edges {
          node {
            sponsor {
              logo
              name
              link {
                _linkType
                ... on PRISMIC__ExternalLink {
                  target
                  _linkType
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`

// Using the queried Blog Home document data, we render the top section
const HomeHead = ({ home }) => {
  return (
    <div className="home-header" data-wio-id={home._meta.id}>
      <BannerBG hero url={home.banner.url}>
        <div className="banner-content">
          <div className="banner-content-unit">
            <h1>{RichText.asText(home.title)}</h1>
            <h4>{RichText.asText(home.subtitle)}</h4>
            <a className="btn btn-primary" href={home.cta_link?.url}>
              {RichText.asText(home.cta_text)}
            </a>
          </div>
        </div>
      </BannerBG>
    </div>
  )
}

const HomeSponsor = ({ sponsor }) => {
  if (!sponsor?.logo) return null
  const SponsorImg = () => <img src={sponsor.logo.url} alt={sponsor.logo.alt} />

  if (sponsor.link?._linkType === "Link.web") {
    return (
      <a
        href={Link.url(sponsor.link)}
        rel="noopener"
        target={sponsor.link?.target}
      >
        <SponsorImg />
      </a>
    )
  }

  return <SponsorImg />
}

const HomeSponsors = ({ title, sponsors = [] }) => {
  if (!sponsors.length) return null

  return (
    <div className="home-sponsors">
      {title && <h5 className="sponsors-title">{RichText.asText(title)}</h5>}
      <div className="sponsors-row">
        {sponsors.map((sponsor, i) => (
          <HomeSponsor sponsor={sponsor} key={i} />
        ))}
      </div>
    </div>
  )
}

const HomeHighlights = ({ highlights }) => {
  return null
}

const HomeNews = ({ community }) => {
  return null
}

const HomeSocial = ({ social }) => {
  return null
}

export default ({ data }) => {
  // Define the Blog Home & Blog Post content returned from Prismic
  const doc = data.prismic.allHome_pages.edges.slice(0, 1).pop()
  let sponsors = data.prismic.allSponsorss.edges.slice(0, 1).pop()
  sponsors = sponsors?.node?.sponsor

  if (!doc) return null

  return (
    <Layout clearNav>
      <HomeHead home={doc.node} />
      <HomeSponsors title={doc.node?.sponsors_title} sponsors={sponsors} />
      <Slices slices={doc.node.body} />
      <HomeHighlights />
      <HomeNews />
      <HomeSocial />
    </Layout>
  )
}
