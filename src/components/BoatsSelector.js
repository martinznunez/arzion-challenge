import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RiSailboatFill } from 'react-icons/ri';
import Button from './Button';
import { boatTypes } from '../constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-align: center;
  flex-wrap: wrap;
  padding-top: 20px;
`;

const BoatIcon = styled(RiSailboatFill)`
  font-size: 4rem;
  margin: 15px;
  cursor: pointer;
  color: ${(p) => {
    if (p.type === boatTypes.CRUISER) {
      return 'red';
    }

    if (p.type === boatTypes.SUBMARINE) {
      return 'blue';
    }

    if (p.type === boatTypes.CARRIER) {
      return 'green';
    }

    return '#000';
  }};
  border: ${(p) => (p.selected ? '1px solid red' : '')};
`;

const ContainerBtn = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  margin-top: 20px;

  @media screen and (min-width: 600px) {
    width: 90%;
    margin: auto;
  }

  @media screen and (min-width: 800px) {
    img {
      width: 15%;
      margin: 10px;
    }
  }
  @media screen and (min-width: 1200px) {
    img {
      width: 10%;
    }
  }
`;

const BoatsSelector = ({ selectedBoat, handleSelectBoat }) => {
  const boats = useSelector((state) => state.game.boats);

  const handleClickBoat = (boatId, length) => {
    handleSelectBoat({ boatId, length });
  };

  const handlerClick = () => {
    console.log('');
  };

  const renderBoat = (boat) => (
    <>
      <BoatIcon
        key={boat.id}
        type={boat.type}
        selected={selectedBoat.id === boat.id}
        src={`/assets/${boat.type}.png`}
        alt="Boat type"
        onClick={() => handleClickBoat(boat.id, boat.length)}
      />
      <p>{boat.type}</p>
    </>
  );

  return (
    <>
      <Container>{boats.map((boat) => renderBoat(boat))}</Container>
      <ContainerBtn>
        <Button handlerClick={handlerClick} value="rotate ship" />
      </ContainerBtn>
    </>
  );
};

BoatsSelector.propTypes = {
  selectedBoat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
  }).isRequired,
  handleSelectBoat: PropTypes.func.isRequired,
};

export default BoatsSelector;