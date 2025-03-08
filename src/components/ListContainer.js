import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import "../App.css"

const Container = styled.div`
  padding: 10px;
  margin: 10px;
  width: 300px;
  background-color: #eef6fd;
  height:80vh;
  overflow:scroll
`;

const liiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

const ListContainer = ({ list, onMoveItem }) => (
  <Container>
    <h3>List {list.list_number}</h3>
    <div className='listitemss'>
    {list.items.map((item) => (
      <ListItem key={item.id} item={item} onMoveItem={onMoveItem} />
    ))}
    </div>

  </Container>
);

export default ListContainer;