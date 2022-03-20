import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#3c3c3c`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: `90%`,
        height: `350px`,
        padding: `1.0875rem 1.45rem`
      }}
    >
      <div style={{height:"80px"}}>
      <a
          href="/"
          target="_blank"
          rel="noreferrer"
          title="loomilon">
          <StaticImage
            src="../images/loomi_logo.png"
            width={210}
            quality={95}
            formats={["auto", "webp", "avif"]}
            alt="loomilon"/>
        </a>
      </div>
      
        

      <div style={{
        margin: "20 0 0 0",
        display: "flex",
        columnGap: "10px"
      }}>
        <a
          href="https://www.instagram.com/loomilon/"
          target="_blank"
          rel="noreferrer"
          title="loomilon's Instagram">
          <StaticImage
            src="../images/icon_ins.png"
            width={45}
            quality={95}
            formats={["auto", "webp", "avif"]}
            alt="Instagram"
          />
        </a>
        <a
          href="https://twitter.com/loomilon"
          target="_blank"
          rel="noreferrer"
          title="loomilon's Twitter">
          <StaticImage
            src="../images/icon_twitter.png"
            width={45}
            quality={95}
            formats={["auto", "webp", "avif"]}
            alt="Twitter"
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UC9QWqq6aODT8AuM-m7QgKsg"
          target="_blank"
          rel="noreferrer"
          title="loomilon's Youtube">
          <StaticImage
            src="../images/icon_youtube.png"
            width={45}
            quality={95}
            formats={["auto", "webp", "avif"]}
            alt="Youtube"
          />
        </a>

      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
