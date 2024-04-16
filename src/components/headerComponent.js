import styled from "styled-components";

export const Header = styled.div`
  color: white;
  background-color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  justify-content: space-between;
`;

export const SearchIcon = styled.img`
  height: 32px;
  width: 32px;
`;
export const AppIcon = styled.img`
  height: 36px;
  width: 36px;
  margin: 15px;
`;

export const AppName = styled.div`
  display: flex;
  align-items: center;
`;

export const Search = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 10px;
  border-radius: 6px;
  width: 50%;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;
`;
