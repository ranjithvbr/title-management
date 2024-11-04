import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TitleForm from "./TitleForm";
import TitleList from "./TitleList";
import "./components.scss";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem("walletAddress") || null);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const storedTitles = JSON.parse(localStorage.getItem("titles")) || [];
    setTitles(storedTitles);
  }, []);

  // connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];

        setWalletAddress(address);
        localStorage.setItem("walletAddress", address);
      } catch (error) {
        console.error("User rejected the connection request", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask to use this feature.");
    }
  };

  const addTitle = (title) => {
    if (!walletAddress) {
      alert("Please connect your MetaMask wallet to add titles.");
      return;
    }

    const newTitles = [...titles, title];
    setTitles(newTitles);
    localStorage.setItem("titles", JSON.stringify(newTitles));
  };

  const deleteTitle = (id) => {
    if (!walletAddress) {
      alert("Please connect your MetaMask wallet to delete titles.");
      return;
    }

    const updatedTitles = titles.filter((title) => title.id !== id);
    setTitles(updatedTitles);
    localStorage.setItem("titles", JSON.stringify(updatedTitles));
  };

  const logout = () => {
    // Clear localstorage
    localStorage.removeItem("token");
    localStorage.removeItem("walletAddress");
    setWalletAddress(null);
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="header-container">
        <h2>Dashboard</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {!walletAddress ? (
        <button className="connect-wallet" onClick={connectWallet}>
          Connect MetaMask
        </button>
      ) : (
        <p>
          Connected Wallet Address: <b>{walletAddress}</b>
        </p>
      )}

      <TitleForm addTitle={walletAddress ? addTitle : null} />
      <TitleList titles={titles} deleteTitle={walletAddress ? deleteTitle : null} />
    </div>
  );
}

export default Dashboard;
