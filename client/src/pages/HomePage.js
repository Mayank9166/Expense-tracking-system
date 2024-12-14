import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import Layout from "../components/Layout/Layout";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../index.css";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModel, setshowModel] = useState(false);
  const [loading, setloading] = useState(false);
  const [allTransection, setallTransection] = useState([]);
  const [Frequency, setFrequency] = useState("7");
  const [selectedDate, setselectedDate] = useState([]);
  const [type, settype] = useState("all");
  const [ViewData, setViewData] = useState("table");
  const [editTable, seteditTable] = useState(null);
  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              seteditTable(record);
              setshowModel(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  //get all Transctions

  //useeffect Hook
  useEffect(() => {
    const getAllTransection = async (value) => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setloading(true);
        const res = await axios.post("/transections/get-transection", {
          userid: user._id,
          Frequency,
          selectedDate,
          type,
        });

        setallTransection(res.data);
        console.log(res.data);
        setloading(false);
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue with transection");
      }
    };
    getAllTransection();
  }, [Frequency, selectedDate, type]);
  const handleDelete = async(record) => {
     try {
      setloading(true)
      await axios.post("/transections/delete-transection",{transactionId:record._id})
      setloading(false)
      message.success('Transaction Deleted')
     } catch (error) {
      setloading(false)
      console.log(false)
      message.error("unable to delete")
      
     }
  };
  //form handling
  const handleSubmit = async (value) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      if (editTable) {
        await axios.post("/transections/edit-transection", {
          payload: {
            ...value,
            userId: user._id,
          },
          transactionId: editTable._id,
        });
        setloading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/transections/add-transection", {
          ...value,
          userid: user._id,
        });
        setloading(false);
        message.success("Transection Succesfully");
      }
      setshowModel(false);
      seteditTable(null);
    } catch (error) {
      setloading(false);
      message.error("Failed to add transection");
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select
            style={{ width: "150px" }}
            value={Frequency}
            onChange={(values) => {
              setFrequency(values);
            }}
          >
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {Frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(value) => {
                setselectedDate(value);
              }}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select
            style={{ width: "150px" }}
            value={type}
            onChange={(values) => {
              settype(values);
            }}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {Frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(value) => {
                setselectedDate(value);
              }}
            />
          )}
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              ViewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => {
              setViewData("table");
            }}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              ViewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setshowModel(true);
            }}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content1">
        {ViewData === "table" ? (
          <Table columns={columns} dataSource={allTransection}></Table>
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>
      <Modal
        title={editTable ? "Edit Transaction" : "Add Transection"}
        open={showModel}
        onCancel={() => {
          setshowModel(false);
        }}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editTable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              {""}SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
