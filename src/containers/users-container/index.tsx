import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoadingUsers, selectUsersIds } from "./selector";

import { UserSelect } from "../../components/user-select";
import { fetchRecommendationsRequest } from "../../store/slices";

export const UsersContainer = () => {
  const userIds = useSelector(selectUsersIds);
  const dispatch = useDispatch();
  const isLoadingUsers = useSelector(selectIsLoadingUsers);
  const onPredict = (userId: number | string) =>
    dispatch(fetchRecommendationsRequest(userId));

  return (
    <UserSelect
      userIds={userIds}
      isLoadingUsers={isLoadingUsers}
      onPredict={onPredict}
    />
  );
};
