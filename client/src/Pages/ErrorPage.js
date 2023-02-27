import React from 'react';
import { Link } from 'react-router-dom';

import tw from 'tailwind-styled-components';
import AlertXl from '../Components/icons/AlertXl.png';

const ContentDiv = tw.div`
    flex 
    flex-row 
    stack-gray 
    place-content-center 
    h-screen 
    items-center 
    box-border
`;

const StyledHeader = tw.h1`
    text-2xl 
    mb-1
`;

const StyledPMb4 = tw.div`
    mb-4
`;

const StyledPMb6 = tw.div`
    mb-6
    text-xl
`;

const FlexRowDiv = tw.div`
    flex
    flex-row
`;

const FlexColDiv = tw.div`
    flex
    flex-col
`;

const ErrorPage = () => {
  const error = 'error';
  console.log(error);

  return (
    <ContentDiv className="content flex flex-row stack-gray place-content-center h-screen items-center box-border">
      <img src={AlertXl} alt="Alert" className="mb-24" />
      <div className="flex flex-col ml-4">
        <StyledHeader>Page not found</StyledHeader>
        <StyledPMb6>
          We&apos;re sorry, we couldn&apos;t find the page you requested.
        </StyledPMb6>
        <FlexColDiv className="flex flex-col">
          <FlexRowDiv>
            <StyledPMb4>Try </StyledPMb4>
            <Link
              to="/"
              className="inline-block items-end text-blue-500 hover:text-blue-800 ml-2"
            >
              searching for similar questions
            </Link>
          </FlexRowDiv>
          <FlexRowDiv>
            <StyledPMb4>Browse our </StyledPMb4>
            <Link
              to="/"
              className="inline-block items-end text-blue-500 hover:text-blue-800 ml-2"
            >
              recent questions
            </Link>
          </FlexRowDiv>
          <FlexRowDiv>
            <StyledPMb4>Browse our </StyledPMb4>
            <Link
              to="/"
              className="inline-block items-end text-blue-500 hover:text-blue-800 ml-2"
            >
              popular tags
            </Link>
          </FlexRowDiv>
          <FlexRowDiv>
            <StyledPMb4>
              If you feel something is missing that should be here,
            </StyledPMb4>
            <Link
              to="/"
              className="inline-block items-end text-blue-500 hover:text-blue-800 ml-2"
            >
              contact us.
            </Link>
          </FlexRowDiv>
        </FlexColDiv>
      </div>
    </ContentDiv>
  );
};

export default ErrorPage;
