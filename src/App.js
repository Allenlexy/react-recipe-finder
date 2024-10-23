import "./app.css";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import {
  Header,
  AppIcon,
  AppName,
  Search,
  SearchIcon,
  SearchInput,
} from "./components/headerComponent";

import {
  RecipeListContainer,
  RecipeContainer,
  CoverImg,
  RecipeName,
  IngredientsText,
  SeemoreText,
} from "./components/recipeComponent";
import { useState } from "react";
import axios from "axios";

const APP_ID = "5dd76867";
const APP_KEY = "54e3323605a2f44be344cee2e57e96b3";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Placeholder = styled.img`
  height: 150px;
  width: 150px;
  margin: 200px;
  opacity: 50%;
`;

const RecipeComponent = (props) => {
  const [open, setOpen] = useState(false);
  const { recipeObj } = props;

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <table>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {recipeObj.ingredients && recipeObj.ingredients.length > 0 ? (
                recipeObj.ingredients.map((ingredientObj) => (
                  <tr key={ingredientObj.text}>
                    <td>{ingredientObj.text}</td>
                    <td>{ingredientObj.weight}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No ingredients available</td>
                </tr>
              )}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <IngredientsText onClick={() => window.open(recipeObj.url)}>
            See More
          </IngredientsText>
          <SeemoreText onClick={() => setOpen(false)}>Close</SeemoreText>
        </DialogActions>
      </Dialog>
      <RecipeContainer>
        <CoverImg src={recipeObj.image} alt={recipeObj.label} />
        <RecipeName>{recipeObj.label}</RecipeName>
        <IngredientsText onClick={() => setOpen(true)}>
          Ingredients
        </IngredientsText>
        <SeemoreText onClick={() => window.open(recipeObj.url)}>
          See Complete Recipe
        </SeemoreText>
      </RecipeContainer>
    </>
  );
};

function App() {
  const [timeOutId, setTimeOut] = useState();
  const [recipeList, setrecipeList] = useState([]);

  const fetchRecipe = async (searchString) => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      setrecipeList(response.data.hits);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const onTextChange = (event) => {
    clearTimeout(timeOutId);
    const timeOut = setTimeout(() => fetchRecipe(event.target.value), 1000);
    setTimeOut(timeOut);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <AppIcon src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" />{" "}
          Recipe Finder
        </AppName>
        <Search>
          <SearchIcon src="https://cdn-icons-png.flaticon.com/512/1212/1212169.png" />
          <SearchInput placeholder="Search Recipe" onChange={onTextChange} />
        </Search>
      </Header>
      <RecipeListContainer>
        {recipeList && recipeList.length ? (
          recipeList.map((recipeObj, index) => (
            <RecipeComponent key={index} recipeObj={recipeObj.recipe} />
          ))
        ) : (
          <Placeholder src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" />
        )}
      </RecipeListContainer>
    </Container>
  );
}

export default App;
