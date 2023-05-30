import styled from 'styled-components';

// ===============REGISTER SECTION================ //

export const StRegisterSection = styled.div`
  width: 936px;
  height: 783px;
  border: 1px solid var(--color-gray);
  border-radius: 20px;
  padding: 60px 80px;
  display: flex;
  flex-direction: column;
`;

// ===============REGISTER FORM================ //

export const StRegisterBox = styled.div`
  width: 776px;
  height: 663px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StHeader = styled.header`
  width: 50%;
  height: 38px;
  display: flex;
  align-items: center;

  h1 {
    font-size: 26px;
    font-weight: var(--weight-bold);
  }
`;

export const StForm = styled.form`
  width: 100%;
  height: 487px;
  padding-block: 24px;
  border-bottom: 1px solid var(--color-gray);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const StInputField = styled.div`
  display: flex;
  gap: 40px;
`;

export const StPolicyField = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StCheckboxInputField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StSocialField = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  p {
    width: 366px;
    height: 24px;
    text-align: center;
    font-size: var(--font-small);
  }
`;

// ===============REGISTER FOOTER================ //

export const StRegisterFooter = styled.div`
  width: 366px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: var(--font-small);

  :nth-child(1) {
    width: 143px;
    height: 19px;
  }
  :nth-child(2) {
    width: 39px;
    height: 19px;
    color: var(--color-light-green);
    cursor: pointer;
    text-decoration: none;
  }
`;

// =================================== //
