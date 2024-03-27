import { Link } from "react-router-dom"
import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper"

export const NotFoundPage = () => {
  return (
    <ContentWrapper title="Siden findes ikke">
      <p>Vi kan ikke finde den side du søger.</p>
      <p>Prøv eventuelt at søge via navigationsmenuen i toppen.</p>
      <p><Link to="/">Gå til forsiden</Link></p>
    </ContentWrapper>
  )
}
