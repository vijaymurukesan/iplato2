import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import BreweryFilter from "../components/BreweryFilter";
import BreweryList from "../components/BreweryList";

const ListPage = () => {
  const [stateFilter, setStateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const page1 = await fetch(
          `https://api.openbrewerydb.org/breweries?by_state=${stateFilter}&by_type=${typeFilter}&page=1&per_page=50`
        ).then((res) => res.json());
        const page2 = await fetch(
          `https://api.openbrewerydb.org/breweries?by_state=${stateFilter}&by_type=${typeFilter}&page=2&per_page=50`
        ).then((res) => res.json());
        setData([...page1, ...page2]);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [stateFilter, typeFilter]);

  const handleStateChange = (event) => {
    setStateFilter(event.target.value);
  };
  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };
  const handleReset = (event) => {
    setStateFilter("");
    setTypeFilter("");
  };

  return (
    <>
      <BreweryFilter
        data={data}
        stateFilter={stateFilter}
        typeFilter={typeFilter}
        onStateChange={handleStateChange}
        onTypeChange={handleTypeChange}
        onReset={handleReset}
      />
      <BreweryList data={data} />
    </>
  );
};
export default ListPage;
