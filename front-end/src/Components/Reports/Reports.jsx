import React from 'react'
import "../../Components/Reports/Reports.scss"
import { useNavigate } from 'react-router-dom';

const Reports = () => {
    const navigate = useNavigate();

    return (
        <div className='report-container'>
            <h2>📊 Vendor Reports</h2>
            <p>All vendor statistics are available in the Dashboard.</p>
            <button onClick={() => navigate("/")}>Go to Dashboard</button>
        </div>
    )
}

export default Reports