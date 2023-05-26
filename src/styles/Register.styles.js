import styled from 'styled-components';

export const StRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 80px;
  height: 487px;
  border: 1px solid #bfbfbf;
  border-radius: 20px;
  width: 954px;
  height: 750px;
`;

export const StRegisterBox = styled.div`
  width: 794px;
  height: 630px;
  h1 {
    line-height: 35.41px;
    font-size: 26px;
  }
`;

export const StRegisterHeader = styled.header`
  width: 366px;
  height: 38px;
`;

export const StRegisterFormBox = styled.div`
  border-bottom: 1px solid #bfbfbf;
  width: 794px;
  height: 457px;
  padding-top: 50px;
  padding-bottom: 47px;
`;

export const StRegisterForm = styled.form`
  width: 794px;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

export const StInputField = styled.div`
  display: flex;
  gap: 60px;
`;

export const StPolicyField = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StCheckboxInputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

export const StSocialField = styled.div`
  width: 792px;
  height: 139px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  p {
    text-align: center;
    width: 366px;
    height: 24px;
  }
`;

export const StFormFooter = styled.div`
  span {
    color: var(--color-light-green);
    margin-left: 10.89px;
    cursor: pointer;
  }
`;
