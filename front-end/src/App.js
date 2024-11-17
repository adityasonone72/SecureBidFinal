import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import emblem from './images/emblem.svg';
import Web3 from 'web3';
import detectEtherumProvider from '@metamask/detect-provider';
import { loadContract } from './utils/loadContract';
import SuperAdmin from './components/SuperAdmin';
import Admin from './components/Admin';
import UserProfile from './components/UserProfile';
import AddAdmin from './components/AddAdmin';
import AddVendor from './components/AddVendor';
import Restriction from './components/Restriction';


function App() {

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  })

  const [account, setAccount] = useState(null);
  let navigate = useNavigate();


  const connectToEthereum = async () => {

    const provider = await detectEtherumProvider();
    const contract = await loadContract('Registry', provider);

    if (provider) {              // provider = metamask detected.
      console.log("provider:", provider);
      provider.request({ method: 'eth_requestAccounts' }); // calling this method trigger a user interface(metamask) 
      // that allow user to approve/reject account access for a dapp.      
      setWeb3Api({
        web3: new Web3(provider),
        provider,
        contract
      })
    }
    else {
      console.error('Please install metamask!');  // metamask not detected.
    }

  }

  useEffect(() => {
    const getAccount = async () => {
      const { web3, contract } = web3Api;
      const accounts = await web3.eth.getAccounts();  // returns the list of accounts you can access.

      setAccount(accounts[0]);

    }
    web3Api.web3 && getAccount();
  }, [web3Api]);


  useEffect(() => {

    const checkAccount = async () => {
      const { web3, contract } = web3Api;
      const superAdmin = await contract.superAdmin();
      console.log(account);
      if (account === superAdmin) {
        navigate('/superadmin');
      }
      else if (await contract.isAdmin({ from: account })) {
        navigate('/admin');
      }
      else if (await contract.isVendor({ from: account })) {
        navigate('./userprofile')
      }
      else {
        navigate('./restriction')
      }
    }
    account && checkAccount();
  }, [web3Api, account])


  return (
    <Routes>

      <Route path='/superadmin' element={<SuperAdmin myWeb3Api={web3Api} account={account} />} />
      <Route path='/AddAdmin' element={<AddAdmin myWeb3Api={web3Api} account={account} />} />
      <Route path='/AddVendor' element={<AddVendor myWeb3Api={web3Api} account={account} />} />
      <Route path='/admin/*' element={<Admin myWeb3Api={web3Api} account={account} />} />
      <Route path='/restriction' element={<Restriction myWeb3Api={web3Api} account={account} />} />
      <Route path='/userprofile/*' element={<UserProfile myWeb3Api={web3Api} account={account} />} />
      <Route path='/' element=
        {
          <div className="App">
            <div className='container mainDiv'>
              <div className='landingPage-heading-div'>
                <img src={emblem} alt="emblem" className="emblem" />
                <h5>SecureBid : Decentralized Tender Allocation System</h5>
              </div>

              {/* <p className='welcome-p'>Welcome to online Land Registration and transfer of entitlement</p> */}

              <section className="hero">
                <div className="hero-content">
                  <p className='newp'>Welcome to Decentralized Tender Allocation System</p>
                  {/* <button className="hero-button but2" id='butty'>Explore</button> */}
                  <button type="button hero-button but2" onClick={connectToEthereum} class="button">
                    <div class="button-top">Connect To Ethereum</div>
                    <div class="button-bottom"></div>
                    <div class="button-base"></div>
                  </button>
                </div>
              </section>

              {/* <button className='landingPage-btn' onClick={connectToEthereum}>Connect to Ethereum</button> */}

            </div>
          </div>
        } />
    </Routes>
  );
}

export default App;
