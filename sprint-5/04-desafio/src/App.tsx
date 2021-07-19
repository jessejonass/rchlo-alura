import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import styled from 'styled-components';
import { GlobalStyle } from "./components/GlobalStyle";

import { Categories } from './components/Menu/types';

import Header from './components/Header';
import Footer from './components/Footer';
import Message from './components/Message';
import Spinner from './components/Spinner';

import CategoriesContext from './contexts/CategoriesContext';
import FilterContext from './contexts/FilterContext';
import LoadingContext from './contexts/LoadingContext';
import MessageContext from './contexts/MessageContext';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetail from './pages/products/ProductDetail';
import CategoriesService from './services/CategoriesService';

import useLoading from './hooks/useLoading';
// import useOrder from './hooks/useOrder';

const Main = styled.main`
  margin: 0 auto;
  width: 80%;
  max-width: 1100px;
  padding: 16px;

  @media (max-width: 1200px) {
    margin-top: 150px;
  }
`;

function App() {
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState<Categories>({} as Categories);
  const [addRequest, removeRequest, isLoading] = useLoading();

  const [nameOrder, setNameOrder] = useState('');
  const [priceOrder, setPriceOrder] = useState('');

  // eslint-disable-next-line
  useEffect(() => loadCategories(), []);

  function loadCategories() {
    addRequest();
    CategoriesService.get()
      .then((c: any) => setCategories(c))
      .catch(() => setMessage("Ocorreu um erro ao carregar as categorias..."))
      .finally(() => removeRequest());
  }

  return (
    <BrowserRouter>
      <GlobalStyle />
      <FilterContext.Provider value={{ filter, setFilter, nameOrder, setNameOrder, priceOrder, setPriceOrder }}>
          <LoadingContext.Provider value={{ addRequest, removeRequest, isLoading }}>
            <MessageContext.Provider value={{ message, setMessage }}>
              <CategoriesContext.Provider value={{ categories }}>
                <Spinner></Spinner>
                <Message></Message>
                <Header></Header>
                <Main>
                  <Switch>
                    <Route exact path="/">
                      <ProductsPage></ProductsPage>
                    </Route>
                    <Route path="/product/:sku">
                      <ProductDetail></ProductDetail>
                    </Route>
                    <Route>
                      <h2>Página não encontrada...</h2>
                    </Route>
                  </Switch>
                </Main>
                <Footer></Footer>
              </CategoriesContext.Provider>
            </MessageContext.Provider>
          </LoadingContext.Provider>
      </FilterContext.Provider>
    </BrowserRouter>
  );
}

export default App;