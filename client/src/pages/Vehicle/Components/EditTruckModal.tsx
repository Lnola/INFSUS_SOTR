import styled from '@emotion/styled'
import Truck from "../Model/Truck";

const MyCenteredModalContainer  = styled.div`
  position: absolute;
  z-index: 7;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0000004d;
  width: 100vw;
  height: 100vh;
`

const MyModal = styled.div(({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minWidth: '300px',
  width: '40vw',
  height: '40vh',
  backgroundColor: 'yellow',
  borderRadius: '20px',
  padding: '10px'
}))

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 20%;
  padding-right: 20%;
  padding-bottom: 20px;
`



const EditTruckModal = ({truck, setShowEditModal}: {truck: Truck | undefined, setShowEditModal: (show: boolean) => void}) => {
  return (
    <MyCenteredModalContainer>
      <MyModal>
        <span>EDITING TRUCK: {truck?.id}, {truck?.registration}</span>
        <ButtonContainer>
          <button style={{width: '100px', height: '30px'}} onClick={() => setShowEditModal(false)}>Save</button>
          <button style={{width: '100px', height: '30px'}} onClick={() => setShowEditModal(false)}>Close</button>
        </ButtonContainer>
      </MyModal>
    </MyCenteredModalContainer>
  )
}

export default EditTruckModal;
