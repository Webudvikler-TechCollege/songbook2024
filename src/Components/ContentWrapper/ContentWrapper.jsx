/**
 * Udskriver sidetitel, descriptiob og
 * h1 og h2 overskrifter på sider
 * @param {*} props
 * @returns
 */

export const ContentWrapper = ({ title, subtitle, description, children }) => {
  // Sætter page title
  document.title = title

  // Sætter page description hvis der en
  if (description) {
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", description)
  }

  return (
    <>
      <h1>{title}</h1>
      {subtitle && <h3>{subtitle}</h3>}
      <div>{children}</div>
    </>
  )
}
