import React from 'react';
import logowhite from '../../assets/Icons/logowhite.svg';
import mail from '../../assets/Icons/mail.svg';
import {
  StHomeLayoutBox,
  StHomeLayoutContainer,
  StFooterInfo,
  StFooterNavbar,
  StFooterCopyright,
  StLogo,
  StCopyRight,
  StEmailMarketing,
  StEmail,
} from '../../styles/Layout.styles';
import FooterNavbar from './FooterNavbar';

function Footer() {
  return (
    <StHomeLayoutContainer height="466px" backgroundcolor="var(--color-green)">
      <StHomeLayoutBox
        flexdirection="column"
        color="var(--color-white)"
        paddingblock="76px"
      >
        <StFooterInfo>
          <StFooterNavbar>
            <FooterNavbar
              title="About"
              item1="스터브란"
              item2="공지사항"
              item3="이벤트"
            />
            <FooterNavbar
              title="Legal"
              item1="이용약관"
              item2="개인정보처리방침"
              item3="사업자정보"
            />
          </StFooterNavbar>
          <StEmailMarketing>
            <h3>스터브의 최신 소식을 받아보세요!</h3>
            <StEmail>
              <h3>Email</h3>
              <div>
                <img src={mail} alt="White Email Icon" />
              </div>
            </StEmail>
          </StEmailMarketing>
        </StFooterInfo>

        <StFooterCopyright>
          <StLogo>
            <img src={logowhite} alt="Studyhub White Logo" />
          </StLogo>
          <StCopyRight>
            <p>© 2023 STUB. All Copyrights reserved</p>
          </StCopyRight>
        </StFooterCopyright>
      </StHomeLayoutBox>
    </StHomeLayoutContainer>
  );
}

export default Footer;
