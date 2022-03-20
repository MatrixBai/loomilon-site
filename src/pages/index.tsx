import React, { useCallback, useEffect, useRef, useState } from "react"
import { graphql, Link } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Gallery from 'react-grid-gallery';

 function IndexPage ({data}) {
  console.debug("Index")
  console.debug(data.images.count)
  const images = data.images.nodes.map(function(val){
    return {src:val.childImageSharp.full.images.fallback.src,
            thumbnail:val.childImageSharp.full.images.fallback.src, 
            thumbnailWidth:val.childImageSharp.width/2,
            thumbnailHiehgt : 500,
            caption : val.name}  
  }) 

  return (
  <Layout>
    <Seo title="Home" />
    
    <Gallery images={images} rowHeight={400}/>
  </Layout>
  
)}

export default IndexPage

export const pageQuery = graphql `
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          slug
          title
          shortTitle
          date
          cover
          color
          category
        }
        html
        rawMarkdownBody
        tableOfContents
        timeToRead
      }
    }
  }
  images: allFile( filter: {extension: {eq: "png"}, relativeDirectory: {eq: "inktober2020"}}) {
        nodes {
          childImageSharp {
            thumb: gatsbyImageData(width: 270, height: 270, placeholder: BLURRED)
            full: gatsbyImageData
          }
          relativePath
          name
        }
      }
}
`
