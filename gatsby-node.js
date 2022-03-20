const { createFileNodeFromBuffer } = require("gatsby-source-filesystem")
const path = require(`path`)

// exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }, themeOptions) => {

//   const { createNode, createParentChildLink } = actions

//   if (node.internal.type !== `MarkdownRemark`) {
//     return
//   }

//   const mdxProjectId = createNodeId(`${node.id} >>> Project`)

//   const fieldData = {
//     slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
//     title: node.frontmatter.title,
//     shortTitle: node.frontmatter.shortTitle,
//     cover: node.frontmatter.cover,
//     date: node.frontmatter.date,
//     category: node.frontmatter.category,
//     color: node.frontmatter.color ? node.frontmatter.color : undefined,
//     imageworks: []
//   }

//   createNode({
//     ...fieldData,
//     // Required fields
//     id: mdxProjectId,
//     parent: node.id,
//     children: [],
//     internal: {
//       type: `MdxProject`,
//       contentDigest: createContentDigest(fieldData),
//       content: JSON.stringify(fieldData),
//       description: `Mdx implementation of the Project interface`,
//     },
//   })
// }

// exports.onCreateNode= ({ node, actions, getNode, createNodeId, createContentDigest }, themeOptions) => {
//   const { createNode, createNodeField } = actions

//   if (node.internal.type != 'MarkdownRemark'
//       && node.internal.type != 'ImageSharp'){
//     return;
//   }

//   var parentNode = getNode(node.parent)
//   Debug("ParentNode", parentNode)
//   if (parentNode.sourceInstanceName != "projects") {
//     return;
//   }

//   var dir = parentNode.relativeDirectory;
//   var projNodId = "proj_" + dir
//   var projNode = getNode(projNodId)
//   if (projNode == null){
//     Debug("Check proj node", "No Proj Node")
    
//     const fieldData ={
//       md: null,
//       imgs:[]
//     }

//     createNode({
//       ...fieldData,
//       // Required fields
//     id: projNodId,
//     parent: null,
//     children: [],
//     internal: {
//       type: `Proj`,
//       contentDigest: createContentDigest(""),
//       content: JSON.stringify(""),
//       description: `Project node`,
//     }
//     })

//     projNode = getNode(projNodId)

//     Debug("Node Created", projNode)
//   }

//   if (parentNode.extension == "md")
//   {
//     projNode.md = node
//   }
//   else {
//     projNode.imgs.push(node)
//   }

//   Debug("Proj Node", projNode)
// }

exports.createSchemaCustomization = ({ actions, schema }, themeOptions) => {
  
}

exports.createPages = async ({ actions,createContentDigest, getNode, graphql }) => {
  const { createPage } = actions

  const { createNode, createNodeField } = actions

  const projectImageResult = await graphql(`
    {
      images: allFile( filter: {extension: {eq: "png"}}) {
        nodes {
          childImageSharp {
            thumb: gatsbyImageData(width: 270, height: 270, placeholder: BLURRED)
            full: gatsbyImageData(height: 1000)
          }
          relativePath
        }
      }
    }
  `)
  if (projectImageResult.errors) {
    console.error(projectImageResult.errors)
  }

  Debug("Images", projectImageResult.data)

  projectImageResult.data.images.nodes.forEach((node) =>{
    console.debug(node.relativePath)
  })

  const mdResult = await graphql(`
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
    }
  `)
  if (mdResult.errors) {
    console.error(mdResult.errors)
  }

  mdResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.debug("slug " + node.frontmatter.slug)

    const images =[]
    projectImageResult.data.images.nodes.forEach((imageNode) => {
      console.debug("relativePath " + imageNode.relativePath)
      if (imageNode.relativePath.startsWith(node.frontmatter.slug.substring(1))){
        images.push(imageNode.childImageSharp);
      }
    })

    var projId = "proj_" + node.frontmatter.slug.substring(1)

    createNode({
      md : node,
      imgs: images,
      // Required fields
    id: projId,
    parent: null,
    children: [],
    internal: {
      type: `Proj`,
      contentDigest: createContentDigest(""),
      content: JSON.stringify(""),
      description: `Project node`,
    }
    })

    var projNode = getNode(projId)
    Debug("Proj Node", projNode)
  })


  mdResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.debug("slug " + node.frontmatter.slug)
    
    var projId = "proj_" + node.frontmatter.slug.substring(1)
    var projNode = getNode(projId)

    createPage({
      path: node.frontmatter.slug,
      component: path.resolve(`src/templates/project.tsx`)
      ,
      context :{
        proj: projNode
      }
    })
  })
}

// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }

function Debug(title, content){
  console.debug("============"+title+ "===============")
  console.debug(content)
}
