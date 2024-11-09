// src/components/ItemNavbar.js
import React, { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

function ItemNavbar({ icon, label, route, drawerOpen, showText, subItems, isSelected, onSelect }) {
  const [openSubItems, setOpenSubItems] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (route) {
      onSelect(); // Gọi hàm onSelect khi nhấp vào mục
      navigate(route);
    } else {
      setOpenSubItems(!openSubItems);
    }
  };

  return (
    <>
      <ListItem
        
        onClick={handleItemClick}
        sx={{
          cursor: 'pointer',
          height: 56,
          backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.08)' : 'transparent', // Thay đổi màu nền nếu được chọn
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={label}
          sx={{ display: drawerOpen && showText ? 'block' : 'none' }}
        />
        {subItems && (openSubItems ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>

      {/* SubItems rendering */}
      {subItems && (
        <Collapse in={openSubItems} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((subItem, index) => (
              <ListItem
                
                key={index}
                onClick={() => {
                  navigate(subItem.route);
                  onSelect(); // Gọi hàm onSelect khi bấm vào mục con
                }}
                sx={{
                  pl: 4,
                  height: 56,
                  cursor: 'pointer',
                  backgroundColor: isSelected && route === subItem.route ? 'rgba(0, 0, 0, 0.08)' : 'transparent', // Thay đổi màu nền cho mục con
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                <ListItemIcon>{subItem.icon}</ListItemIcon>
                <ListItemText
                  primary={subItem.label}
                  sx={{ display: drawerOpen && showText ? 'block' : 'none' }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default ItemNavbar;
