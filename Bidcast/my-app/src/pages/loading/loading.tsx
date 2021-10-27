// import "./styles.css";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import "./loading.scss";
export function LoadingComponentTest() {
    return <div>hi</div>;
}

export function LoadingDefaultStyle() {
    const ResetCss = createGlobalStyle`
      body{
        width: 100%;
      height: 100vh;
      margin: 0;
      padding: 0;
      }
    `;
    const Wrap = styled.div`
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: fixed;
        z-index: 13000;
    `;
    const rotation = keyframes`
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
    `;
    const Loading = styled.div`
        width: 48px;
        height: 48px;
        border: 5px solid #fff;
        border-bottom-color: #000;
        border-radius: 50%;
        display: inline-block;
        animation: ${rotation} 1s linear infinite;
    `;
    return (
        <div className="App">
            <Wrap>
                <ResetCss />
                <Loading />
            </Wrap>
        </div>
    );
}
