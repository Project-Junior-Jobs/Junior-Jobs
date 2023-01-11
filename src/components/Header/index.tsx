import { Container } from "../Container";
import Logo from "../../assets/img/logo.png";
import { StyledHeader, StyledHeaderNoUser } from "./styled";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import { MenuBox } from "../MenuBox";
// import { DMContext } from "../../contexts/DarkModeContext";

export const Header = () => {
  const { user, loading } = useContext(authContext);

  return (
    <>
      {loading ? null : user ? (
        <StyledHeader>
          <Container>
            <nav>
              <img src={Logo} alt="Júnior Jobs" />
              <MenuBox />
            </nav>
          </Container>
        </StyledHeader>
      ) : (
        <>
          <StyledHeaderNoUser>
            <Container>
              <nav>
                <img src={Logo} alt="Júnior Jobs" />
              </nav>
            </Container>
          </StyledHeaderNoUser>
        </>
      )}
    </>
  );
};
