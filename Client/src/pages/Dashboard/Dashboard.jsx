
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Quiz.css';
import NAVBAR from '../Navbar/Navbar.jsx';

function Dashboard() {
    const [data, setData] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.example.com/data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDomainClick = (domainName) => {
        navigate(`/domain/${domainName}`); // Navigate to the domain details page
    };

    return (
        <>
        <NAVBAR/>
        <main className='main-container'>
            <div className='main-title'>
                <h3>Dashboard</h3>
            </div>

            <div className='main-cards'>
                {[
                    { title: 'Employee', icon: <BsFillArchiveFill />, count: 300 },
                    { title: 'Domain', icon: <BsFillGrid3X3GapFill />, count: 12 },
                    { title: 'Course', icon: <BsPeopleFill />, count: 33 },
                    { title: 'Simulation', icon: <BsFillBellFill />, count: 42 }
                ].map((card, index) => (
                    <div className='card' key={index}>
                        <div className='card-inner'>
                            <h3>{card.title}</h3>
                            {card.icon}
                        </div>
                        <h1>{card.count}</h1>
                    </div>
                ))}
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="not_clicked" fill="#1f702a" />
                        <Bar dataKey="clicked" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className='domain-list'>
                {data.map((domain) => (
                    <div
                        key={domain.name}
                        className='domain-item'
                        onClick={() => handleDomainClick(domain.name)}
                    >
                        {domain.name}
                    </div>
                ))}
            </div>
        </main>
        </>
    );
}

export default Dashboard;