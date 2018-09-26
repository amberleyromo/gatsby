import { Link } from "gatsby"
import presets, { colors } from "../../utils/presets"
import { /*typography, */ rhythm, scale, options } from "../../utils/typography"
import sharedStyles from "../shared/styles"
import MdArrowBack from "react-icons/lib/md/arrow-back"

const Header = ({ stub }) => {
  return (
    <div
      className="starter-detail-header"
      css={{
        fontFamily: options.headerFontFamily.join(`,`),
        padding: sharedStyles.gutter,
        paddingBottom: 0,
        [presets.Desktop]: {
          padding: sharedStyles.gutterDesktop,
          paddingBottom: 0,
        },
      }}
    >
      <div
        css={{
          paddingBottom: rhythm(1 / 4),
        }}
      >
        <Link
          to={`/starters`}
          {...sharedStyles.withTitleHover}
          css={{
            "&&": {
              ...scale(1 / 5),
              boxShadow: `none`,
              borderBottom: 0,
              color: colors.gatsby,
              cursor: `pointer`,
              fontFamily: options.headerFontFamily.join(`,`),
              fontWeight: `normal`,
              "&:hover": {
                background: `transparent`,
                color: colors.lilac,
              },
            },
          }}
        >
          <MdArrowBack style={{ marginRight: 4, verticalAlign: `sub` }} />
          &nbsp;
          <span className="title">All Starters</span>
        </Link>
      </div>
      <div>
        <h1 css={{ margin: 0, display: `inline-block` }}>{stub}</h1>
      </div>
    </div>
  )
}

export default Header
