import React from "react";
import "../css/BouncerLoader.css";
import styled from 'styled-components'
export const SpinnerWrapper = styled.div``
export const Spinner = styled.div``
export const Bounce1 = styled.div``
export const Bounce2 = styled.div``
export const Bounce3 = styled.div``
function BouncerLoader() {
  return (
    <SpinnerWrapper className="spinner-wrapper">
            <Spinner className="spinner">
                <Bounce1 className="bounce1"></Bounce1>
                <Bounce2 className="bounce2"></Bounce2>
                <Bounce3 className="bounce3"></Bounce3>
            </Spinner>
        </SpinnerWrapper>
  );
}
export default BouncerLoader;