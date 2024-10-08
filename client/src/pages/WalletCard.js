import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './WalletCard.css';
import axios from 'axios';

const PlanCard = ({ userName }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    balance: 0,
    posamount: 0,
    negamount: 0,
    debt: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data for userName: ${userName}`); // Log userName
        const response = await axios.get(`http://localhost:12000/wallet-card`, {
          params: { userName } // Use axios params for query strings
        });
        console.log('Response data:', response.data); // Log API response data

        setData({
          posamount: response.data.posamount || 0,
          negamount: response.data.negamount || 0,
          debt: parseInt(response.data.totalDebt) || 0,
          balance: response.data.balance || 0, // Add balance to the state
        });
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchData();
  }, [userName]);

  const handleOpenWallet = () => {
    navigate('/wallet');
  };

  return (
    <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-[#cfc6b1] dark:border-[#522922]">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-[#111827]">Wallet Balance</h5>
      <div className="flex items-baseline text-gray-900 dark:text-[#111827]">
        <span className="text-3xl font-semibold">₹</span>
        <span className="text-4xl font-extrabold tracking-tight">
          {data.balance}
        </span>
        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400"></span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        <li className="flex items-center">
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-[#111827] ms-3">Last Deposit</span>
          <div className="ml-auto text-2xl font-bold text-blue-800 dark:text-blue-800 animated-text">₹{data.posamount}</div>
        </li>
        <li className="flex items-center">
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-[#111827] ms-3">Last Withdrawal</span>
          <div className="ml-auto text-2xl font-bold text-green-600 dark:text-green-500 animated-text">₹{data.negamount}</div>
        </li>
        <li className="flex items-center">
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-[#111827] ms-3">Debt</span>
          <div className="ml-auto text-2xl font-bold text-red-800 dark:text-red-600 animated-text">₹{data.debt}</div>
        </li>
      </ul>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-[#1f2937] dark:hover:bg-[#111827] dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        onClick={handleOpenWallet}
      >
        Open Wallet
      </button>
    </div>
  );
};

export default PlanCard;
