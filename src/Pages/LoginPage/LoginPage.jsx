import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper"
import { LoginForm } from "../../Components/LoginForm/LoginForm"

export const LoginPage = () => {
  return (
    <ContentWrapper title="Login" description="Login to the site">
      <LoginForm />
    </ContentWrapper>
  )
}
