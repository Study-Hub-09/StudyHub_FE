import styled from 'styled-components';

// ===============LOGIN SECTION================ //

export const StLoginSection = styled.div`
  width: 526px;
  height: 616px;
  border-radius: 20px;
  padding: 60px 80px;
  border: 1px solid var(--color-gray);
`;

// ===============LOGIN FORM================ //

export const StLoginBox = styled.div`
  width: 366px;
  height: 496px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StHeader = styled.header`
  width: 366px;
  height: 38px;
`;

export const StForm = styled.form`
  width: 366px;
  height: 343px;
  border-bottom: 1px solid var(--color-gray);
  padding-block: 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const StLoginInputFrame = styled.div`
  width: 366px;
  height: 178px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StSocialField = styled.div`
  width: 366px;
  height: 140px;
  padding-top: 28px;
  p {
    height: 24px;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

// ===============LOGIN FOOTER================ //

export const StLoginFooter = styled.div`
  width: 366px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: var(--font-small);

  :nth-child(1) {
    width: 143px;
    height: 19px;
  }
  :nth-child(2) {
    width: 52px;
    height: 19px;
    color: var(--color-light-green);
    cursor: pointer;
    text-decoration: none;
  }
`;
// =================================== //
