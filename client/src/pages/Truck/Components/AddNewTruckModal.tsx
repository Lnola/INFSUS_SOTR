import styled from '@emotion/styled'
import { useState } from 'react';


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
  minWidth: '300px',
  width: '40vw',
  height: '40vh',
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '10px',
  boxShadow: '20px 20px 20px #888888',
}))

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 20%;
  padding-right: 20%;
  padding-bottom: 20px;
`

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 90%;
  align-items: center;
`

const EditTruckModal = ({setShowAddNewModal}: {setShowAddNewModal: (show: boolean) => void}) => {

  const [formData, setFormData] = useState({
    registration: '',
    makeYear: '0',
    reservoirCapacity: 0,
    horsepower: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/trucks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: null, ...formData }),
    });

    if (response.ok) {
      alert('Truck added successfully!');
      setShowAddNewModal(false);
    } else {
      alert('Failed to add new truck.');
    }
  };


  return (
    <MyCenteredModalContainer>
      <MyModal>
        <div style={{height: '100%'}}>
          <p style={{textAlign: 'center', margin: '0.75em'}}><strong>ADD NEW TRUCK</strong></p>
          <Form onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Registration: </label>
                <input type="text" name="registration" value={formData.registration} onChange={handleChange} />
              </div>
              <div>
                <label>Make Year: </label>
                <input type="number" name="makeYear" value={formData.makeYear} onChange={handleChange} />
              </div>
              <div>
                <label>Reservoir Capacity: </label>
                <input type="number" name="reservoirCapacity" value={formData.reservoirCapacity} onChange={handleChange} />
              </div>
              <div>
                <label>Horsepower: </label>
                <input type="number" name="horsepower" value={formData.horsepower} onChange={handleChange} />
              </div>
            </div>
            <ButtonContainer>
              <button type="submit" style={{ width: '100px', height: '30px' }}>Save</button>
              <button type="button" style={{ width: '100px', height: '30px' }} onClick={() => setShowAddNewModal(false)}>Close</button>
            </ButtonContainer>
          </Form>
        </div>
      </MyModal>
    </MyCenteredModalContainer>
  )
}

export default EditTruckModal;
