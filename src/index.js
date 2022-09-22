import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Bookpage from "./Bookpage/Bookpage";
import Header from "./header";
import AuthorPage from "./AuthorPage/AuthorPage";
import SearchResultPage from "./SearchResult/SearchResultPage";
import PageNotFound from "./PageNotFound/PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SearchContextProvider from "./store/search-context";
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <SearchContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<App />} />
          <Route path="/books/:bookId" element={<Bookpage />} />
          <Route path="/author/:authorname" element={<AuthorPage />} />
          <Route path="/result/:query" element={<SearchResultPage />} />
        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
