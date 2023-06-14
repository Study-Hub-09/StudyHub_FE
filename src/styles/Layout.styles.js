import styled from 'styled-components';

// ===============LAYOUT COMMON STYLES================ //
export const StHomeLayoutContainer = styled.div`
  width: 100%;
  height: ${(props) => props.height || '96px'};
  background-color: ${(props) => props.backgroundcolor || 'var(--color-white)'};
`;

export const StHomeLayoutBox = styled.div`
  width: 1920px;
  height: 100%;
  margin: 0 auto;
  padding-block: ${(props) => props.paddingblock || 'none'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => props.flexdirection || 'row'};
  color: ${(props) => props.color || 'var(--color-black)'};
`;

// ===============HEADER================ //

export const StHeaderLogo = styled.div`
  cursor: pointer;
`;

export const StHeaderAuth = styled.div`
  width: 238px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StHeaderRegister = styled.div`
  width: 107px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ===============FOOTER================ //

export const StFooterInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// FooterNavbar Component
export const StNavbar = styled.nav`
  font-size: 18px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 15px;

    :nth-child(1) {
      font-weight: var(--weight-bold);
    }
  }
`;

export const StFooterNavbar = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-between;
`;

export const StEmailMarketing = styled.div`
  width: 350px;
  height: 67px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StEmail = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  div {
    width: 280px;
    border-bottom: 1px solid var(--color-white);
  }
`;

export const StFooterCopyright = styled.div`
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const StLogo = styled.div`
  height: 60px;
`;

export const StCopyRight = styled.div`
  height: 20px;
`;
