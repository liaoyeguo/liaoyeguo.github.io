import React, { Component } from 'react'
import styles from './nav.module.css'
import { Link } from 'gatsby'

export const NavItem = ({ children, to }) => (
  <li className={styles.navItem}>
    <Link to={to}>{children}</Link>
  </li>
)
export default class Nav extends Component {
  render() {
    return (
      <nav className={styles.nav}>
        <span className={styles.logo}>
          <Link to="/">liaoyeguo</Link>
        </span>

        <ul>{this.props.children}</ul>
      </nav>
    )
  }
}
