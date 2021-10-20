import React from "react";
import { Select, Form, Button } from "antd";

import styles from "./index.module.sass";
import { NO_HISTORY } from "../../constants";

type Props = {
  onPredict: (id: number | string) => void;
  userIds: number[];
  isLoadingUsers: boolean;
};

const USER_SELECT = "USER_SELECT";

export const UserSelect: React.FC<Props> = (props: Props) => {
  const { userIds, isLoadingUsers, onPredict } = props;
  const [form] = Form.useForm<{ [USER_SELECT]: number | string }>();

  return (
    <Form
      form={form}
      layout="inline"
      className={styles.form}
      onFinish={(value) => onPredict(value[USER_SELECT])}
    >
      <Form.Item
        name={USER_SELECT}
        initialValue={NO_HISTORY}
        label="Идентификатор пользователя"
      >
        <Select
          className={styles.select}
          placeholder="Выберите идентификатор..."
          loading={isLoadingUsers}
          showSearch
          filterOption={(input, option) => {
            const optionStr = option?.value?.toString();
            if (optionStr.indexOf(input) === 0 || optionStr === NO_HISTORY) {
              return true;
            } else {
              return false;
            }
          }}
        >
          <Select.Option key={NO_HISTORY} value={NO_HISTORY}>
            Пользователь без истории
          </Select.Option>
          {userIds.map((id) => (
            <Select.Option key={id} value={id}>
              {id}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Предсказать
        </Button>
      </Form.Item>
    </Form>
  );
};
