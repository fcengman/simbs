import React from "react"
import { graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"
import Layout from "../components/layouts"
import { ImageCaption, Quote, Text } from "../components/slices"

// Query for the Blog Post content in Prismic
export const query = graphql`
  query BlogPostQuery($uid: String) {
    prismic {
      allPosts(uid: $uid) {
        edges {
          node {
            _meta {
              id
              uid
              type
            }
            title
            author
            acknowledgements
            date
            body {
              __typename
              ... on PRISMIC_PostBodyText {
                type
                label
                primary {
                  text
                }
              }
              ... on PRISMIC_PostBodyQuote {
                type
                label
                primary {
                  quote
                }
              }
              ... on PRISMIC_PostBodyImage_with_caption {
                type
                label
                primary {
                  image
                  image_caption
                }
              }
              ... on PRISMIC_PostBodyMedia {
                type
                label
                primary {
                  media_caption
                  media_link
                  media_title
                }
              }
            }
          }
        }
      }
    }
  }
`

// Sort and display the different slice options
const PostSlices = ({ slices }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch (slice.type) {
        case "text":
          return (
            <div key={index} className="homepage-slice-wrapper">
              {<Text slice={slice} />}
            </div>
          )

        case "quote":
          return (
            <div key={index} className="homepage-slice-wrapper">
              {<Quote slice={slice} />}
            </div>
          )

        case "image_with_caption":
          return (
            <div key={index} className="homepage-slice-wrapper">
              {<ImageCaption slice={slice} />}
            </div>
          )

        default:
          return
      }
    })()
    return res
  })
}

// Display the title, date, and content of the Post
const PostBody = ({ blogPost }) => {
  const titled = blogPost.title.length !== 0
  return (
    <div>
      <div className="container post-header">
        <div className="back">
          <Link to="/">back to list</Link>
        </div>
        {/* Render the edit button */}
        <h1 data-wio-id={blogPost._meta.id}>
          {titled ? RichText.asText(blogPost.title) : "Untitled"}
        </h1>
        {/* Render author if present */}
        {blogPost.author && <h2>By: {RichText.asText(blogPost.author)}</h2>}
        {/* Render post date */}
        <p className="blog-post-meta">
          <time>{postDate}</time>
        </p>
      </div>
      {/* Go through the slices of the post and render the appropriate one */}
      <PostSlices slices={blogPost.body} />
      {/* Render acknowledgements */}
      {blogPost.acknowledgements && (
        <p>{RichText.asText(blogPost.acknowledgements)}</p>
      )}
    </div>
  )
}

export default (props) => {
  // Define the Post content returned from Prismic
  const doc = props.data.prismic.allPosts.edges.slice(0, 1).pop()

  if (!doc) return null

  return (
    <Layout>
      <PostBody blogPost={doc.node} />
    </Layout>
  )
}
