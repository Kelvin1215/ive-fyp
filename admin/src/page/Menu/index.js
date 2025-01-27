import React, { useEffect, useState } from "react";
import {
  Layout,
  Button,
  Flex,
  Tooltip,
  Form,
  Input,
  Radio,
  Table,
  Typography,
} from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import intl from "react-intl-universal";
import Sider from "../layout/Sider";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { getDishesType } from "../../api/DishesType";

import "./index.css";
import { findInMenu } from "../../api/Menu";

function Content() {
  const [dishesType, setDishesType] = useState([]);
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [type, setType] = useState("");

  useEffect(() => {
    getDishesType().then((res) => {
      const data = res.data;
      if (localStorage.getItem("locale") === "zh-HK") {
        setDishesType(
          data.map((item) => (
            <Tooltip title={item.name_Zh_HK} key={item.id}>
              <Button
                type="primary"
                color="primary"
                variant="outlined"
                style={{ flex: 1, height: "100%", fontSize: "16px" }}
                onClick={() => {
                  setType(item.name_Zh_HK);
                  findInMenu("", "", "", "", "", item.id).then((res) => {
                    setData(res.data);
                  });
                  form.setFieldsValue({ type: item.id });
                }}
              >
                {item.name_Zh_HK}
              </Button>
            </Tooltip>
          ))
        );
      } else {
        console.log(data);
        setDishesType(
          data.map((item) => (
            <Tooltip title={item.name_Us_En} key={item.id}>
              <Button
                type="primary"
                color="primary"
                variant="outlined"
                style={{ flex: 1, height: "100%", fontSize: "16px" }}
                onClick={() => {
                  setType(item.name_Us_En);
                  findInMenu("", "", "", "", "", item.id).then((res) => {
                    setData(res.data);
                  });
                  form.setFieldsValue({ type: item.id });
                }}
              >
                {item.name_Us_En}
              </Button>
            </Tooltip>
          ))
        );
      }
    });
  }, [navigator, form]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findInMenu("", "", "", "", "", "");
        response.data.forEach((item) => {
          item.key = item.id;
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const formFields = () => {
    if (localStorage.getItem("locale") === "zh-HK") {
      return (
        <>
          <Form.Item label={intl.get("name")} name="name_zh_HK">
            <Input size="large" id="name_zh_HK" />
          </Form.Item>
          <Form.Item label={intl.get("nameCN")} name="name_zh_CN">
            <Input size="large" id="name_zh_CN" />
          </Form.Item>
          <Form.Item label={intl.get("nameEN")} name="name_en_US">
            <Input size="large" id="name_en_US" />
          </Form.Item>
        </>
      );
    } else {
      return (
        <>
          <Form.Item label={intl.get("nameEN")} name="name_en_US">
            <Input size="large" id="name_en_US" />
          </Form.Item>
          <Form.Item label={intl.get("name")} name="name_zh_HK">
            <Input size="large" id="name_zh_HK" />
          </Form.Item>
          <Form.Item label={intl.get("nameCN")} name="name_zh_CN">
            <Input size="large" id="name_zh_CN" />
          </Form.Item>
        </>
      );
    }
  };

  const tableColumns = () => {
    if (localStorage.getItem("locale") === "zh-HK") {
      return [
        {
          title: intl.get("name"),
          dataIndex: "name_zh_HK",
          key: "name_zh_HK",
          sorter: (a, b) => a.name_zh_HK.localeCompare(b.name_zh_HK),
        },
        {
          title: intl.get("nameCN"),
          dataIndex: "name_zh_CN",
          key: "name_zh_CN",
          sorter: (a, b) => a.name_zh_CN.localeCompare(b.name_zh_CN),
        },
        {
          title: intl.get("nameEN"),
          dataIndex: "name_en_US",
          key: "name_en_US",
          sorter: (a, b) => a.name_en_US.localeCompare(b.name_en_US),
        },
        {
          title: intl.get("price"),
          dataIndex: "price",
          key: "price",
          sorter: (a, b) => a.price - b.price,
        },
        {
          title: intl.get("status"),
          dataIndex: "onSale",
          key: "onSale",
          sorter: (a, b) => (a.onSale > b.onSale ? 1 : -1),
          render: (onSale) => {
            return onSale === "Y" ? intl.get("active") : intl.get("inactive");
          },
        },
      ];
    } else {
      return [
        {
          title: intl.get("nameEN"),
          dataIndex: "name_en_US",
          key: "name_en_US",
          sorter: (a, b) => a.name_en_US.localeCompare(b.name_en_US),
        },
        {
          title: intl.get("name"),
          dataIndex: "name_zh_HK",
          key: "name_zh_HK",
          sorter: (a, b) => a.name_zh_HK.localeCompare(b.name_zh_HK),
        },
        {
          title: intl.get("nameCN"),
          dataIndex: "name_zh_CN",
          key: "name_zh_CN",
          sorter: (a, b) => a.name_zh_CN.localeCompare(b.name_zh_CN),
        },

        {
          title: intl.get("price"),
          dataIndex: "price",
          key: "price",
          sorter: (a, b) => a.price - b.price,
        },
        {
          title: intl.get("status"),
          dataIndex: "onSale",
          key: "onSale",
          sorter: (a, b) => (a.onSale > b.onSale ? 1 : -1),
          render: (onSale) => {
            return onSale === "Y" ? intl.get("active") : intl.get("inactive");
          },
        },
      ];
    }
  };
  const onReset = () => {
    form.resetFields();
    findInMenu("", "", "", "", "", "").then((res) => {
      setData(res.data);
    });
    setType("");
  };


  return (
    <Layout.Content
      style={{
        margin: "12px",
        padding: 12,
        overflow: "auto",
      }}
    >
      <Flex wrap gap="middle">
        {dishesType}
      </Flex>
      <Flex wrap gap="middle">
        <Form
          form={form}
          name="form"
          layout="vertical"
        >
          <Flex wrap gap={20} justify="center">
            {formFields()}
            <Form.Item label={intl.get("price")} name="price">
              <Input size="large" id="price" />
            </Form.Item>
            <Form.Item label={intl.get("status")} name="onSale">
              <Radio.Group id="onSale">
                <Radio value="Y">{intl.get("active")}</Radio>
                <Radio value="N">{intl.get("inactive")}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="&nbsp;">
              <Button icon={<ClearOutlined />} onClick={() => onReset()}>
                {intl.get("reset")}
              </Button>
            </Form.Item>
            <Form.Item label="&nbsp;">
              <Button type="primary" htmlType="submit">
                {intl.get("submit")}
              </Button>
            </Form.Item>
            <Form.Item name="type" hidden>
              <Input />
            </Form.Item>
          </Flex>
        </Form>
      </Flex>
      {type === "" ? null : (
        <Typography.Title level={3}>{type}</Typography.Title>
      )}
      <Flex wrap gap="middle">
        <Table
          dataSource={Array.from(data)}
          name="table"
          scroll={{
            y: 400,
          }}
          virtual
          rowKey={(record) => record.key}
          columns={tableColumns()}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "25", "50", "100"],
            defaultPageSize: 10,
          }}
        />
      </Flex>
    </Layout.Content>
  );
}

function Menu() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Content />
        <Footer />
      </Layout>
    </Layout>
  );
}
export default Menu;
