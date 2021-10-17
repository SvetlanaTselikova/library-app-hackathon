import React from "react";
import { Layout } from "antd";
import styles from "./index.module.sass";
import "antd/dist/antd.css";
import { IBook } from "./types/common";
import { ContentContainer } from "./containers/content-container";
import { Header } from "./components/header";

const books: IBook[] = [
  {
    id: 1,
    title: "1 book",
    author: "1 author",
    year: 123,
    annotation: "annotation",
    age_resctriction: 16,
    volume: 123,
    rubric: "rubric",
    keyword: "keyword",
  },
  {
    id: 2,
    title: "2 book",
    author: "2 author",
    year: 123,
    annotation: "annotation",
    age_resctriction: 16,
    volume: 123,
    rubric: "rubric",
    keyword: "keyword",
  },

  {
    id: 3,
    title: "3 book",
    author: "3 author",
    year: 123,
    annotation: "annotation",
    age_resctriction: 16,
    volume: 123,
    rubric: "rubric",
    keyword: "keyword",
  },
  {
    id: 4,
    title: "4 book",
    author: "4 author",
    year: 123,
    annotation: "annotation",
    age_resctriction: 16,
    volume: 123,
    rubric: "rubric",
    keyword: "keyword",
  },
  {
    id: 5,
    title: "5 book",
    author: "5 author",
    year: 123,
    annotation: "annotation",
    age_resctriction: 16,
    volume: 123,
    rubric: "rubric",
    keyword: "keyword",
  },
  {
    id: 6,
    title: "6 book",
    author: "6 author",
    year: 123,
    annotation: "annotation",
    age_resctriction: 16,
    volume: 123,
    rubric: "rubric",
    keyword: "keyword",
  },
  {
    id: 7,
    title: "7 book",
    author: "7 author",
    year: 123,
    annotation: "annotation",
    age_resctriction: 16,
    volume: 123,
    rubric: "rubric",
    keyword: "keyword",
  },
  {
    id: 8,
    title: "8 book",
    author: "8 author",
    year: 123,
    annotation: "annotation",
    age_resctriction: 16,
    volume: 123,
    rubric: "rubric",
    keyword: "keyword",
  },
  {
    id: 9,
    title: "9 book",
    author: "9 author",
    year: 123,
    annotation: "annotation",
    age_resctriction: 16,
    volume: 123,
    rubric: "rubric",
    keyword: "keyword",
  },
  {
    id: 10,
    title: "10 book",
    author: "10 author",
    year: 123,
    annotation: "annotation",
    age_resctriction: 16,
    volume: 123,
    rubric: "rubric",
    keyword: "keyword",
  },
];

function App() {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout.Content className={styles.contentWrapper}>
        <ContentContainer />
      </Layout.Content>
    </Layout>
  );
}

export default App;
