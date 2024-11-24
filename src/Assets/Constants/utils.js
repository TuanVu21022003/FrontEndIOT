import { keyframes } from '@mui/material';

export const createSlideDownAnimation = (distance) => keyframes`
  from {
    transform: translateY(${distance}); /* Sử dụng biến */
    opacity: 0.5; /* Ẩn ban đầu */
  }
  to {
    transform: translateY(0); /* Vị trí gốc */
    opacity: 1; /* Hiển thị hoàn toàn */
  }
`;

export const createSlideLeftAnimation = (distance) => keyframes`
  from {
    transform: translateX(${distance}); /* Sử dụng biến */
    opacity: 0.5; /* Ẩn ban đầu */
  }
  to {
    transform: translateX(0); /* Vị trí gốc */
    opacity: 1; /* Hiển thị hoàn toàn */
  }
`;