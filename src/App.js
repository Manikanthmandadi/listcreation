import React, { useState, useEffect } from 'react';
import { fetchLists } from './api';
import Loader from './components/Loader';
import ErrorView from './components/ErrorView';
import ListContainer from './components/ListContainer';
import Button from './components/Button';
import './App.css';

const App = () => {
  const [list1, setList1] = useState([]); // For list_number: 1
  const [list2, setList2] = useState([]); // For list_number: 2
  const [newList, setNewList] = useState([]); // For the new list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLists, setSelectedLists] = useState([]); // Track selected lists
  const [isCreating, setIsCreating] = useState(false); // Toggle List Creation view

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchLists();
      // Group items based on list_number
      const list1Items = data.lists.filter((item) => item.list_number === 1);
      const list2Items = data.lists.filter((item) => item.list_number === 2);
      setList1(list1Items);
      setList2(list2Items);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchData();
  };

  const handleListSelect = (listNumber) => {
    if (selectedLists.includes(listNumber)) {
      setSelectedLists(selectedLists.filter((num) => num !== listNumber));
    } else {
      setSelectedLists([...selectedLists, listNumber]);
    }
  };

  const handleCreateList = () => {
    if (selectedLists.length !== 2) {
      alert('You should select exactly 2 lists to create a new list');
      return;
    }
    setIsCreating(true);
    setNewList([]); // Reset the new list
  };

  const handleCancel = () => {
    setIsCreating(false);
    setNewList([]); // Clear the new list
  };

  const handleUpdate = () => {
    setIsCreating(false); // Return to All Lists view
    // Do not merge newList into list1 or list2
    console.log('Updated Lists:', { list1, list2, newList });
  };

  const handleMoveItem = (item, fromList, toList) => {
    if (fromList === 1) {
      setList1((prev) => prev.filter((i) => i.id !== item.id));
      if (toList === 'new') {
        setNewList((prev) => [...prev, item]);
      } else {
        setList2((prev) => [...prev, item]);
      }
    } else if (fromList === 2) {
      setList2((prev) => prev.filter((i) => i.id !== item.id));
      if (toList === 'new') {
        setNewList((prev) => [...prev, item]);
      } else {
        setList1((prev) => [...prev, item]);
      }
    } else if (fromList === 'new') {
      setNewList((prev) => prev.filter((i) => i.id !== item.id));
      if (toList === 1) {
        setList1((prev) => [...prev, item]);
      } else {
        setList2((prev) => [...prev, item]);
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorView onRetry={handleRetry} />;

  return (
    <div className="App">
      <h1>List Creation</h1>
      {!isCreating ? (
        // All Lists View
        <>
            <Button
            primary
            onClick={handleCreateList}
            disabled={selectedLists.length !== 2} // Disable button if not exactly 2 lists are selected
          >
            Create a new list
          </Button>
          <div className="lists-container">
            <div className='listMain'>
              <label>
                <input
                  type="checkbox"
                  checked={selectedLists.includes(1)}
                  onChange={() => handleListSelect(1)}
                />
                List 1
              </label>
              <ListContainer
                list={{ list_number: 1, items: list1 }}
                onMoveItem={null} // Disable move in All Lists view
              />
            </div>
            <div className='listMain'>
              <label>
                <input
                  type="checkbox"
                  checked={selectedLists.includes(2)}
                  onChange={() => handleListSelect(2)}
                />
                List 2
              </label>
              <ListContainer
                list={{ list_number: 2, items: list2 }}
                onMoveItem={null} // Disable move in All Lists view
              />
            </div>
            {newList.length > 0 && (
              <div>
                <h3>New List</h3>
                <ListContainer
                  list={{ list_number: 'new', items: newList }}
                  onMoveItem={null} // Disable move in All Lists view
                />
              </div>
            )}
          </div>
          
        </>
      ) : (
        // List Creation View
        <>
         <div>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button primary onClick={handleUpdate}>
              Update
            </Button>
          </div>
          <div className="lists-container">
            <div className='listMain'>
              <h3>List 1</h3>
              <ListContainer
                list={{ list_number: 1, items: list1 }}
                onMoveItem={(item) => handleMoveItem(item, 1, 'new')} // Move from List 1 to New List
              />
            </div>
            <div className='listMain'>
              <h3>New List</h3>
              <ListContainer
                list={{ list_number: 'new', items: newList }}
                onMoveItem={(item) => handleMoveItem(item, 'new', 2)} // Move from New List to List 2
              />
            </div>
            <div className='listMain'>
              <h3>List 2</h3>
              <ListContainer
                list={{ list_number: 2, items: list2 }}
                onMoveItem={(item) => handleMoveItem(item, 2, 'new')} // Move from List 2 to New List
              />
            </div>
          </div>
         
        </>
      )}
    </div>
  );
};

export default App;