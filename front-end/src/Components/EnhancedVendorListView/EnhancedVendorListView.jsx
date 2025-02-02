import React, { useEffect, useState } from 'react'
import { Moon, Sun, Search, Trash, Pencil } from 'lucide-react'
import "./EnhancedVendorListView.scss"
import { Link } from "react-router-dom";
import {fetchData} from '../../Context/CommonFunction';
const URL = import.meta.env.VITE_API_BASE_URL;


const EnhancedVendorListView = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [vendorList, setVendorList] = useState([]);

  // get data
  const loadData = async () => {
    try {
      const data = await fetchData(`${URL}/admin/vendors`);
      setVendorList(data);
    } catch (err) {
      console.error("Error fetching vendors:", err.message);
    }
  };
  // Fetch vendor List on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Avoid filtering when vendorList is empty or undefined
  const filteredVendors = vendorList?.length > 0 ? vendorList.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.serviceProvided.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  //CriticalityColor
  const getCriticalityColor = (criticality) => {
    switch (criticality.toLowerCase()) {
      case 'low':
        return 'criticality-low'
      case 'medium':
        return 'criticality-medium'
      case 'high':
        return 'criticality-high'
      case 'critical':
        return 'criticality-critical'
      default:
        return 'criticality-default'
    }
  }

  //status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active'
      case 'inactive':
        return 'status-inactive'
      case 'pending':
        return 'status-pending'
      default:
        return 'status-default'
    }
  }

  //Delete Vendor
  const deleteVendor = async (venderid) => {
    try {
      const response = await fetch(`${URL}/admin/vendor/${venderid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await loadData();
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className="venderListViewContainer">
      <div className="content-container">
        <div className="card">
          <div className="card-header">
            <h2>Vendor List</h2>
          </div>
          {
            (vendorList && vendorList.length > 0) ?
              <div className="card-content">
                <div className="search-bar">
                  <label htmlFor="search">Search Vendors</label>
                  <div className="search-input">
                    <input
                      id="search"
                      type="text"
                      placeholder="Search by name, type, or service"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr style={{borderBottom:"1px solid #ccc"}}>
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
                      {filteredVendors.map((vendor,index) => (
                        <tr key={index}>
                          <td>{vendor.name}</td>
                          <td>{vendor.type}</td>
                          <td>
                            <span className={`badge ${getCriticalityColor(vendor.criticality)}`}>
                              {vendor.criticality}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${getStatusColor(vendor.status)}`}>
                              {vendor.status}
                            </span>
                          </td>
                          <td>{vendor.contact}</td>
                          <td>{vendor.serviceProvided}</td>
                          <td>
                            <Link to={`/admin/vendor/${vendor._id}`}><Pencil size={20} color="green" /></Link>
                            <Trash size={20} color="red" onClick={() => deleteVendor(vendor._id)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div> : <div className="card-content">No Data Found</div>
          }
        </div>
      </div>
    </div>
  )
}

export default EnhancedVendorListView
