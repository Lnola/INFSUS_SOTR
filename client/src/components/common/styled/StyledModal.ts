import styled from '@emotion/styled';

export const StyledModalContainer = styled.div`
  position: absolute;
  z-index: 7;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0000004d;
  width: 100vw;
  height: 100vh;
`;

export const StyledModal = styled.div({
  minWidth: '300px',
  width: '40vw',
  height: '40vh',
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '10px',
  boxShadow: '20px 20px 20px #888888',
});

export const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 90%;
  align-items: center;
`;
