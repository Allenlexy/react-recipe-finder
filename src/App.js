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
  console.log("props", props);
  const [open, setOpen] = useState(false);
  const { recipeObj } = props;
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {recipeObj.ingredients.map((ingredientObj) => (
                <tr>
                  <td>{ingredientObj.text}</td>
                  <td>{ingredientObj.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <IngredientsText onClick={() => window.open(recipeObj.url)}>
            See More
          </IngredientsText>
          <SeemoreText onClick={() => setOpen("")}>Close</SeemoreText>
        </DialogActions>
      </Dialog>
      <RecipeContainer>
        <CoverImg src={recipeObj.image} />
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
    const response = await axios.get(
      `https:api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setrecipeList(response.data.hits);
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
          <AppIcon src="hamburger.svg" /> Recipe Finder
        </AppName>
        <Search>
          <SearchIcon src="search-icon.svg" />
          <SearchInput placeholder="Search Recipe" onChange={onTextChange} />
        </Search>
      </Header>
      <RecipeListContainer>
        {recipeList.length ? (
          recipeList.map((recipeObj, index) => (
            <RecipeComponent key={index} recipeObj={recipeObj.recipe} />
          ))
        ) : (
          <Placeholder src="hamburger.svg" />
        )}
      </RecipeListContainer>
    </Container>
  );
}

export default App;
