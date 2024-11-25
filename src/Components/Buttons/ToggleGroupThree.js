import React, { useState } from 'react';
import './ToggleGroupThree.css';
import '../../Assets/CSS/style.css';
import socket from '../../Socket/WebSocketService';
function ToggleGroupThree() {
    // State để lưu trạng thái hiện tại
    const [selectedOption, setSelectedOption] = useState('');

    // Hàm xử lý khi có thay đổi
    const handleChange = (event) => {
        const value = event.target.value; // Lấy giá trị của radio button được chọn
        setSelectedOption(value); // Cập nhật state
        console.log(value); // In giá trị ra console
        socket.emit("clientEvent", { relay: value });
    };

    return (
        /* From Uiverse.io by Tsiangana */
        <div className="radio-inputs">
            <label>
                <input
                    className="radio-input on"
                    type="radio"
                    name="engine"
                    value="On" // Giá trị của lựa chọn
                    onChange={handleChange} // Gọi hàm khi có thay đổi
                />
                <span className="radio-tile on">
                    <span className="radio-icon">
                        <span>On</span>
                    </span>
                </span>
            </label>

            <label>
                <input
                    className="radio-input off"
                    type="radio"
                    name="engine"
                    value="Off"
                    onChange={handleChange}
                />
                <span className="radio-tile off">
                    <span className="radio-icon">
                        <span>Off</span>
                    </span>
                </span>
            </label>

            <label>
                <input
                    className="radio-input auto"
                    type="radio"
                    name="engine"
                    value="Auto"
                    onChange={handleChange}
                />
                <span className="radio-tile auto">
                    <span className="radio-icon">
                        <span>Auto</span>
                    </span>
                </span>
            </label>
        </div>
    );
}

export default ToggleGroupThree;