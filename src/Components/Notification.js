import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import {
  addTopicListener,
  removeTopicListener,
} from "../Socket/WebSocketService"; // Assuming WebSocketService manages your socket connection

const allNotifications = [
    {
      alert_type: "Cảnh báo độ đục vượt ngưỡng",
      message: "Cảm biến đo độ đục vượt ngưỡng! Giá trị: 1128.84",
    },
    {
      alert_type: "Cảnh báo độ đục vượt ngưỡng",
      message: "Cảm biến đo độ đục vượt ngưỡng! Giá trị: 1128.84",
    },
    {
      alert_type: "Cảnh báo độ đục vượt ngưỡng",
      message: "Cảm biến đo độ đục vượt ngưỡng! Giá trị: 1128.84",
    },
];

function Notification({ notifications }) {
  return (
    <List>
      {notifications.map((notification, index) => (
        <ListItem
          key={index}
          button
          onClick={() => console.log("Notification:", notification)} // In ra toàn bộ đối tượng thông báo
          sx={{
            cursor: "pointer",
          }}
        >
          <ListItemText
            primary={notification.alert_type}
            secondary={notification.message}
          />
        </ListItem>
      ))}
    </List>
  );
}

export {allNotifications, Notification};
