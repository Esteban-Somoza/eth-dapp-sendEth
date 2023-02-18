import React, { useEffect, useState } from "react";

import { ethers } from "ethers";

import { contractABI, contractAddress } from '../../utils/constants'

export const TransactionContext = React.createContext();

const { ethereum } = window

const getEthereumContract = async () => {
    console.log(ethers);
    // const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    // const provider = new ethers.BrowserProvider(window.ethereum)
    // const signer = await provider.getSigner();

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    console.log({
        provider,
        signer,
        transactionContract
    })

    console.log(transactionContract.getTransactionCount);
    return transactionContract
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' })
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    // minute 1:56:41 https://www.youtube.com/watch?v=Wn_Kb3MR_cU&t=935s

    const checkIfWalletIsConnected = async () => {
        try {

            if (!ethereum) return alert('Please Install Metamask')

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0])

                //getAllTransactions();
            }

            // console.log(accounts);
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object')
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Please Install Metamask')

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract()
            const parsedAmount = ethers.utils.parseEther(amount)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 gwei
                    value: parsedAmount._hex
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true)
            console.log(`loading.. ${transactionHash}`);

            await transactionHash.wait()

            setIsLoading(false)
            console.log(`success.. ${transactionHash}`);

            const transactionCount = await transactionContract.getTransactionCount()
            setTransactionCount(transactionCount.toNumber())

        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object')
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install metamask');

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0])
        } catch (error) {
            console.error(error)
            throw new Error('No ethereum object')
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}