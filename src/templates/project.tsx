import React, { useCallback, useEffect, useRef, useState } from "react";  
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import { StaticImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"

import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';


// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgShare from 'lightGallery/plugins/share';

const MyTemplate = props => {
  const {pageContext} = props
  const {proj} = pageContext

  const lightGallery = useRef<any>(null);

  const [container, setContainer] = useState(null);

  const [items, setItems] = useState([
    {
        id: '1',
        src:
            'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        thumb:
            'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
        subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@dann">Dan</a></h4>
            <p>Published on November 13, 2018</p>
        </div>`,
    },
    {
        id: '2',
        src:
            'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        thumb:
            'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
        subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@kylepyt">Kyle Peyton</a></h4>
            <p>Published on September 14, 2016</p>
        </div>`,
    },
    {
        id: '3',
        src:
            'https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
        thumb:
            'https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
        subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@jxnsartstudio">Garrett Jackson</a></h4>
            <p>Published on May 8, 2020</p>
        </div>`,
    } as any,
]);

const onInit = useCallback((detail: any) => {
  if (detail) {
      lightGallery.current = detail.instance;
      lightGallery.current.openGallery();
  }
}, []);

const setContainerRef = useCallback((node) => {
  if (node !== null) {
      setContainer(node);
  }
}, []);

const getLgComponent = () => {
  if (container !== null) {
      return (
          <LightGallery
              plugins={[lgZoom, lgThumbnail]}
              elementClassNames="custom-classname"
              dynamic
              dynamicEl={items}
              closable={false}
              showMaximizeIcon
              onInit={onInit}
              container={container}
          ></LightGallery>
      );
  }
  return null;
};
  
  console.debug('====================================');
    console.debug('This is a item injected from pageContedxt:${id_home[0]}``');
    console.debug('====================================');
    const image = getImage (proj.imgs[0].full  )
    const image1 = getImage (proj.imgs[1].full  )
    const images= [
      {
        original : proj.imgs[0].full?.images?.fallback?.src,
        thumbnail: proj.imgs[0].thumb?.images?.fallback?.src
      },
      {
        original : proj.imgs[1].full?.images?.fallback?.src,
        thumbnail: proj.imgs[1].thumb?.images?.fallback?.src
      },
      {
        original : proj.imgs[0].full?.images?.fallback?.src,
        thumbnail: proj.imgs[0].thumb?.images?.fallback?.src
      }
    ]

    items.push({
      id : 4,
      src :proj.imgs[1].full?.images?.fallback?.src,
      thumb :proj.imgs[1].thumb?.images?.fallback?.src,
      subHtml : ""
    })
    
  return (
    
    <section>
      {/* <div className="App">
            <LightGallery
              thumbnail="true"
              toggleThumb="true"
              allowMediaOverlap="true"
              zoomFromOrigin="false"
              animateThumb="false"
              class="list-unstyled"
            >
              {proj.imgs.map((node, index) => {
          return (
            <div key={index} data-src={node.thumb.images.fallback.src} src={node.full.images.fallback.src} >
              <GatsbyImage image={getImage(node.full)} alt="" />
            </div>
          )
        })}
            </LightGallery>
        </div> */}
        <Layout>
          <Seo title={proj.md.frontmatter.shortTitle}/>
          <div className="App">
              <div 
                  style={{ width: '100%', height:'1000px', margin:'auto' }}
                  ref={setContainerRef}
              ></div>
              {getLgComponent()}
          </div>
        </Layout>
        

      <h1>This is the value passed through context {proj.md.frontmatter.shortTitle}</h1>
      <h1>This is the value passed through context {proj.imgs[1].full?.images?.fallback?.src}</h1>
      
      {/* <div style={{width:`100%`, height :`864px`}}>
        <ImageGallery items={images} />
      </div> */}
      {/* <StaticImage
      src="../projects/from_nothing/find_me_1.png" 
      alt="A dinosaur"
      placeholder="blurred"
      layout="fixed"
      width={200}
      height={200}
    />
      <GatsbyImage image={image} alt="" />
      <GatsbyImage image={image1} alt="" /> */}
    </section>
    
  ) 
}
export default MyTemplate


// export default function Template({ data }) {
//     // const { markdownRemark } = data // data.markdownRemark holds your post data
//     // const { frontmatter, html } = markdownRemark
//     console.debug(data)
//     //  const image = getImage (data.allProj.nodes[0].imgs[0].childImageSharp)
//     const image = getImage (data.allFile.nodes[0].childImageSharp)
//     return (
//       // <div className="blog-post">
//       //   <h1>{frontmatter.title}</h1>
//       //   <h2>{frontmatter.date}</h2>
//       //   <div
//       //     className="blog-post-content"
//       //     dangerouslySetInnerHTML={{ __html: html }}
//       //   />
//       // </div>
//           <section>
//       <h1>This is the value passed through context {image.width}  </h1>
//       <StaticImage
//       src="../projects/from_nothing/find me_1.png" 
//       alt="A dinosaur"
//       placeholder="blurred"
//       layout="fixed"
//       width={200}
//       height={200}
//     />
//       <GatsbyImage image={image} alt="" />
//     </section>
//     )
//   }
//   export const pageQuery =  graphql`
  // #   {
  // #   allProj {
  // #     nodes {
  // #       md {
  // #         rawMarkdownBody
  // #       }
  // #       imgs {
  // #         gatsbyImageData(
  // #         width: 500
  // #         placeholder: BLURRED
  // #         formats: [AUTO, WEBP, AVIF]
  // #       )
  // #       }
  // #     }
  // #   }
  // # }


  // # {
  // #   allImageSharp {
  // #     nodes {
  // #       gatsbyImageData
  // #     }
  // #   }
  // # }

  // {
  //   allFile(filter: {extension: {eq: "png"}}) {
  //     nodes {
  //       childImageSharp {
  //         gatsbyImageData(
  //         width: 500
  //         placeholder: BLURRED
  //         formats: [AUTO, WEBP, AVIF]
  //       )
  //       }
  //     }
  //   }
  // }
  // `
  // export const pageQuery = graphql`
  //   query($slug: String!) {
  //     markdownRemark(frontmatter: { slug: { eq: $slug } }) {
  //       html
  //       frontmatter {
  //         date(formatString: "MMMM DD, YYYY")
  //         slug
  //         title
  //       }
  //     }
  //   }
  // `