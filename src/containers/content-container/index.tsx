import React, { useEffect } from "react";
import styles from "./index.module.sass";
import { PageHeader } from "../../components/page-header";
import { UsersContainer } from "../users-container";
import { RecommendationsContainer } from "../recommendations-container";
import { selectContentMode, selectIsLoadingContent } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { ContentMode } from "../../types/common";
import { PopularContainer } from "../popular-container";
import { fetchRecommendationsRequest } from "../../store/slices";
import { NO_HISTORY } from "../../constants";
import { Skeleton } from "antd";
import { TargetContainer } from "../target-container";
import { RecommendationsCreatorContainer } from "../recommendations-creator-container";

export const ContentContainer = () => {
  const contentMode = useSelector(selectContentMode);
  const isLoading = useSelector(selectIsLoadingContent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendationsRequest(NO_HISTORY));
  }, []);

  const getContent = () => {
    if (isLoading) {
      return (
        <React.Fragment>
          {[...Array(3).keys()].map((item, inx) => (
            <Skeleton key={inx} active className={styles.skeleton} />
          ))}
        </React.Fragment>
      );
    }
    if (contentMode === ContentMode.populdar) {
      return (
        <React.Fragment>
          <RecommendationsCreatorContainer />
          <PopularContainer />
        </React.Fragment>
      );
    }
    if (contentMode === ContentMode.recommendations) {
      return (
        <React.Fragment>
          <TargetContainer />
          <RecommendationsContainer />
        </React.Fragment>
      );
    }
    return null;
  };
  return (
    <div className={styles.content}>
      <PageHeader />
      <UsersContainer />
      {getContent()}
    </div>
  );
};
