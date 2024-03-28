import { FooterContainer } from "./Footer.style"

export const Footer = ({ area }) => {
  return (
    <FooterContainer $area={area}>
      <div>
        <h2>HEINZ SONGBOOK</h2>
        <address>
          Egholmsvej 13<br />
          9520 Skørping
        </address>
      </div>
    </FooterContainer>
  )
}
