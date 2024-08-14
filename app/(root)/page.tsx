import HeaderBox from '@/components/HeaderBox'
import RecentTransaction from '@/components/RecentTransaction'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import {  getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async ({searchParams : {id ,page}}:SearchParamProps) => {

    const currentPage = Number (page as string) || 1

  const loggedIn = await getLoggedInUser();

  const userName = `${loggedIn.firstName} ${loggedIn.lastName}` 

  const accounts = await getAccounts({
    userId : loggedIn.$id
  })

  if(!accounts) return


  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId

  const account = await getAccount({appwriteItemId})


  return (
    <section className='home'>
      <div className='home-content'>
          <header className='home-header'>
            <HeaderBox 
            type='greeting'
            title='Welcome'
            user={userName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently"
            />
            
            <TotalBalanceBox 
            accounts={accounts?.data}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
            />
          </header>
          <RecentTransaction 
          accounts = {accounts?.data}
          transactions = {accounts?.transcations}
          appwriteItemId={appwriteItemId}
          page = {currentPage}
          />
      </div>
      <RightSideBar 
      user={loggedIn} 
      transactions={accounts?.transactions}
      banks={accounts?.data.slice(0,2)}
       />
    </section>
  )
}

export default Home