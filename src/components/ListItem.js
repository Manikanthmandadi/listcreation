import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #eee;
  background-color: #fffffd;
  border-radius: 20px;
flex-direction: column;
padding: 1em;
`;

const ItemText = styled.span`
  flex: 1;
  width: fit-content;
`;

const ItemTextM = styled.span`
  flex: 1;
font-weight: 600;
width: fit-content;
`;

const ArrowButton = styled.button`
  padding: 10px 20px;
  background-color:#007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  width:fit-content
`;

const ListItem = ({ item, onMoveItem }) => (
  <ItemContainer>
    <ItemTextM>{item.name}</ItemTextM>
    <ItemText>{item.description}</ItemText>
    {onMoveItem && <ArrowButton onClick={() => onMoveItem(item)}>move</ArrowButton>}
  </ItemContainer>
);

export default ListItem;