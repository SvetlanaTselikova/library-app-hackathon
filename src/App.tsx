import React from "react";
import { Layout } from "antd";
import styles from "./index.module.sass";
import "antd/dist/antd.css";
import { IBook } from "./types/common";
import { ContentContainer } from "./containers/content-container";
import { Header } from "./components/header";

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
