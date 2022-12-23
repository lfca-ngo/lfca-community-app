import styles from './styles.module.less'

const LINKS = [
  {
    key: 'Imprint',
    title: 'Imprint',
    url: 'https://lfca.ngo/de/imprint/',
  },
]

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>
        {`lfca.ngo © ${new Date().getFullYear()} - No cookies, no worries 🍪`}
      </div>
      <div className={styles.links}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.key}>
              <a href={link.url} rel="noreferrer" target="_blank">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
