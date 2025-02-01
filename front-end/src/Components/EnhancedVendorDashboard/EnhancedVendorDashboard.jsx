import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Info } from 'lucide-react';
import './EnhancedVendorDashboard.scss';
import Modal from '../Modal/Modal';
import {fetchData} from '../../Context/CommonFunction';
const URL = import.meta.env.VITE_API_BASE_URL;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function EnhancedVendorDashboard() {
  const [vendorList, setVendorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);


  // Fetch vendor List on component mount
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData(`${URL}/admin/vendors`);
      setVendorList(data);
    };
    loadData();
  }, []);


  // Avoid filtering when vendorList is empty or undefined
  const filteredVendors = vendorList?.length > 0 ? vendorList.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.serviceProvided.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  //get type and criticality field count
  const getCountByField = (data, field) => {
    const countMap = data.reduce((acc, item) => {
      acc[item[field]] = (acc[item[field]] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(countMap).map(name => ({ name, value: countMap[name] }));
  };

  //functions for apply class
  const getCriticalityClass = (criticality) => `${criticality.toLowerCase()}-criticality`;
  const getStatusClass = (status) => `${status.toLowerCase()}-status`;

  //details modal open 
  const openModal = (vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  //details modal close 
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVendor(null);
  };
  return (
    <>
      <div className="dashboardContainer">

        {
          (vendorList && vendorList.length > 0) ?
            <main>
              <h1 className="main-heading">Vendor Dashboard</h1>

              {/* Summary Cards */}
              <div className="grid">
                <div className="card bg-blue">
                  <h3>Total Vendors</h3>
                  <p>{vendorList.length}</p>
                </div>
                <div className="card bg-green">
                  <h3>Active Vendors</h3>
                  <p>{vendorList.filter(v => v.status === 'Active').length}</p>
                </div>
                <div className="card bg-red">
                  <h3>Inactive Vendors</h3>
                  <p>{vendorList.filter(v => v.status === 'Inactive').length}</p>
                </div>
                <div className="card bg-yellow">
                  <h3>Pending Vendors</h3>
                  <p>{vendorList.filter(v => v.status === 'Pending').length}</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-2">
                <div className="chart-container">
                  <h3>Vendor Types</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={getCountByField(vendorList, "type")} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                        {getCountByField(vendorList, "type").map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-container">
                  <h3>Vendor Criticality</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={getCountByField(vendorList, "criticality")}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Vendor Table */}
              <div className="table-container">
                <h3>Recent Vendors</h3>
                <input
                  type="text"
                  placeholder="Search by name, type, or service"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className='table-info-container'>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Criticality</th>
                        <th>Status</th>
                        <th>Contact</th>
                        <th>Service Provided</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVendors.length > 0 ? filteredVendors.map((vendor, index) => (
                        <tr key={index}>
                          <td>{vendor.name}</td>
                          <td>{vendor.type}</td>
                          <td><span className={`badge ${getCriticalityClass(vendor.criticality)}`}>{vendor.criticality}</span></td>
                          <td><span className={`badge ${getStatusClass(vendor.status)}`}>{vendor.status}</span></td>
                          <td>{vendor.contact}</td>
                          <td>{vendor.serviceProvided}</td>
                          <td>
                            <button className="details-button" onClick={() => openModal(vendor)}>
                              <Info /> Details
                            </button>
                          </td>
                        </tr>
                      )) : <tr><td colSpan="7" style={{ textAlign: "center" }}>No Data Found</td></tr>}
                    </tbody>
                  </table>

                </div>
              </div>
            </main> : <main>No data is currently available.</main>
        }

      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} vendor={selectedVendor} />
    </>
  );
}
