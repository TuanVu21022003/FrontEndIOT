import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Normal state icon
import {
  BORDER_RADIUS_SMALL,
  MARGIN_HEADING,
  THEME_COLOR_BORDER,
  TIME_DELAY_TABLE,
  TRANSITION_TABLE,
} from "../../Assets/Constants/constants";
import { createTableAnimation, hexToRgba } from "../../Assets/Constants/utils";
import Heading from "../Heading/Heading";
import socket from "../../Socket/WebSocketService";
const initialData = [];

function ECDataTable() {
  const [data, setData] = useState(initialData);
  useEffect(() => {
    const handleMqttData = (newData) => {
      console.log("Phản hồi từ server:", newData);
      if (newData.data === 'off' || newData.data === 'on' || newData.data === 'auto') return;

      // Tạo một mảng mới với dữ liệu mới được thêm vào đầu và loại bỏ phần tử cuối
      const updatedData = [
        JSON.parse(newData.data),
        ...data.slice(0, data.length - 1),
      ];

      console.log("Dữ liệu mới:", updatedData);

      setData((prevData) => {
        // Chuyển đổi dữ liệu mới từ JSON string sang object
        const newParsedData = JSON.parse(newData.data);

        // Kiểm tra độ dài của mảng
        const updatedData =
          prevData.length < 15
            ? [newParsedData, ...prevData] // Thêm mới vào đầu nếu < 15 phần tử
            : [newParsedData, ...prevData.slice(0, prevData.length - 1)]; // Nếu đủ 15 phần tử, thêm mới và loại bỏ phần tử cuối

        console.log("Dữ liệu mới:", updatedData);

        return updatedData; // Trả về mảng mới để cập nhật state
      });
    };

    const handleSwitchSystem = (data) => {
      console.log("Cảnh báo chỉ số vượt ngưỡng đã ngắt mạch:", data);
    };

    // Thêm các event listener
    socket.on("mqttData", handleMqttData);
    socket.on("switch system", handleSwitchSystem);

    // Dọn dẹp khi component bị unmount
    return () => {
      console.log("Component unmounted. Gỡ bỏ các listener và ngắt kết nối...");
      socket.off("mqttData", handleMqttData);
      socket.off("switch system", handleSwitchSystem);
    };
  }, []); // Chỉ chạy một lần khi component được mount
  const slideDown = createTableAnimation(TRANSITION_TABLE);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("ecValue");

  //   useEffect(() => {
  //     fetchDataFake();
  //     const intervalId = setInterval(fetchDataFake, 2000);
  //     return () => clearInterval(intervalId);
  //   }, []);

  const getBackgroundColor = (temperature, tds, tempThreshold, tdsThreshold) => {
    // Kiểm tra điều kiện của cả hai giá trị
    if (temperature >= tempThreshold || tds >= tdsThreshold) {
        return "lightcoral"; // Một trong hai giá trị vượt ngưỡng, "Poor"
    }
    return "lightgreen"; // Cả hai giá trị đều dưới ngưỡng, "Good"
};

  const handleSort = (property) => {
    if (orderBy === property) {
      // Cycle through states: normal -> asc -> desc
      if (order === "asc") {
        setOrder("desc");
      } else if (order === "desc") {
        setOrder(""); // Reset to normal
      } else {
        setOrder("asc");
      }
    } else {
      setOrder("asc");
      setOrderBy(property);
    }
  };

  const sortedData = (() => {
    if (order === "") return data; // No sorting
    return [...data].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  })();

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Heading
        text="Dữ liệu EC"
        margin={MARGIN_HEADING}
        themeColorBorder={THEME_COLOR_BORDER}
      ></Heading>
      <TableContainer
        component={Paper}
        sx={{
          width: "80vh",
          height: "70vh",
          margin: "auto", // Center the table container
          borderRadius: BORDER_RADIUS_SMALL,
          border: `3px solid ${THEME_COLOR_BORDER}`,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Thêm shadow
          // boxShadow: `rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px`,
          // overflow: 'hidden',
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          animation: `${slideDown} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${TIME_DELAY_TABLE} both`,
        }}
      >
        <Table>
          <TableHead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1, // Để đảm bảo TableHead luôn nằm trên các thành phần khác
              backgroundColor: "#fff", // Màu nền để tránh bị chồng mờ
            }}
          >
            <TableRow>
              <TableCell align="center">Tempurature</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "ecValue"}
                  direction={
                    orderBy === "ecValue"
                      ? order === ""
                        ? "asc"
                        : order
                      : "asc"
                  }
                  onClick={() => handleSort("ecValue")}
                  IconComponent={() => {
                    if (order === "") {
                      return <ArrowForwardIcon />;
                    }
                    return order === "asc" ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    );
                  }}
                >
                  TDS
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">FlowRate</TableCell>
              <TableCell align="center">PumpState</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow
                key={index}
                style={{ backgroundColor: getBackgroundColor(row.temperature, row.tds, 30, 500) }}
              >
                <TableCell align="center">{row.temperature}</TableCell>
                <TableCell align="center">{row.tds}</TableCell>
                <TableCell align="center">{row.flowRate}</TableCell>
                <TableCell align="center">{row.pumpState}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ECDataTable;
