import React from 'react';
import empty from '../assets/Images/emtpy.png';
import {
  StPageNotFoundBox,
  StPageNotFoundContainer,
  StPageNotFoundHeader,
  StPageNotFoundContent,
  StLinkStudyHub,
} from '../styles/Common.styles';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <StPageNotFoundContainer>
      <StPageNotFoundBox>
        <StPageNotFoundHeader>
          <img src={empty} alt="" />
        </StPageNotFoundHeader>
        <StPageNotFoundContent>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            The requested URL was not found on this server. Go back to
            <StLinkStudyHub to="/">StudyHub</StLinkStudyHub>.
          </p>
        </StPageNotFoundContent>
      </StPageNotFoundBox>
    </StPageNotFoundContainer>
  );
}

export default PageNotFound;
