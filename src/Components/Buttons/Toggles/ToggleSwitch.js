import React, { useState, useEffect } from 'react';
import './ToggleSwitch.css';
import '../../../Assets/CSS/style.css';



function ToggleSwitch() {
    // State quản lý giá trị ON/OFF
    const [isActive, setIsActive] = useState(false); // true: ON, false: OFF

    // Hàm chuyển trạng thái
    const toggleActive = () => {
        setIsActive(!isActive); // Đảo trạng thái hiện tại
    };

    useEffect(() => {
        // Hàm thay đổi trạng thái cứ mỗi 1 giây
        const interval = setInterval(() => {
            setIsActive((prev) => !prev); // Đảo trạng thái
        }, 1000);

        // Dọn dẹp interval khi component bị unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="firstFilter" className="filter-switch">
            {/* Input điều khiển trạng thái thông qua biến isActive */}
            <input
                id="option1"
                name="options"
                type="radio"
                checked={isActive} // Bật ON nếu isActive = true
                readOnly // Chỉ đọc, không cho phép thay đổi trực tiếp
            />
            <label className="option" htmlFor="option1">
                ON
            </label>

            <input
                id="option2"
                name="options"
                type="radio"
                checked={!isActive} // Bật OFF nếu isActive = false
                readOnly // Chỉ đọc, không cho phép thay đổi trực tiếp
            />
            <label className="option" htmlFor="option2">
                OFF
            </label>

            <span className="background"></span>
        </div>
    );
}

export default ToggleSwitch;
