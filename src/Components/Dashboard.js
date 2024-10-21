import Welcome from './Welcome';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import UserInfo from './UserInfo';
import TurbidityTable from './DataWater/TurbidityTable';
import TemperatureTable from './DataWater/TemperatureTable';
import ECDataTable from './DataWater/ECDataTable';
import RelayDataTable from './DataWater/RelayDataTable';
import InvoiceTable from './Invoice/InvoiceTable';
import WaterBillChart from './Statics/WaterBillChart';
import WaterDataChart from './Statics/WaterDataChart';
import WarningComponent from './Warning/WarningComponent';

function Dashboard({ user }) {
    return (
        <Box display="flex">
            <Navbar />
            <Box flex={1}>
                {/* Header thông tin người dùng */}
                <UserInfo user={user} />
                {/* Main content area for routing */}
                <Box p={2}>
                    <Routes>
                        <Route path="/" element={<Welcome user={user} />} />
                        <Route path="/welcome" element={<Welcome user={user} />} />
                        <Route path="/du-lieu/do-duc" element={<TurbidityTable/>} />
                        <Route path="/du-lieu/ec" element={<ECDataTable/>} />
                        <Route path="/du-lieu/nhiệt-do" element={<TemperatureTable/>} />
                        <Route path="/du-lieu/relay" element={<RelayDataTable/>} />
                        <Route path="/hoa-don" element={<InvoiceTable/>} />
                        <Route path="/thong-ke/tien-nuoc" element={<WaterBillChart/>} />
                        <Route path="/thong-ke/du-lieu-nuoc" element={<WaterDataChart/>} />
                        <Route path="/xem-canh-bao" element={<WarningComponent/>} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
}

export default Dashboard;
