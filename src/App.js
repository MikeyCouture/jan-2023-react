import React, { useState, useEffect } from "react";
import "./App.css";
import CardList from "./components/card-list/index";
import SearchBox from "./components/search-box/index";

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  const [searchField, setSearchField] = useState("");

  console.log("Render");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter(monster => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = event => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex!</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monnstaaas"
        className="search-box-monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
