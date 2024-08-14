import Link from 'next/link'
import React from 'react'
import { Tabs,TabsContent,TabsList,TabsTrigger } from './ui/tabs'
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'


const RecentTransaction = ({
  accounts,
  transactions=[],
  appwriteItemId,
  page=1
  }:RecentTransactionsProps) => {
  return (
    <header className='recent-transactions'>
      <div className='flex items-center justify-between'>
          <h2 className='recent-transactions-label'>
              Recent transactions
          </h2>
          <Link 
          href={`/transaction-history/?id${appwriteItemId}`} className='view-all-btn'
          >View All</Link>
      </div>
        <Tabs defaultValue={appwriteItemId} className='w-full'>
          <TabsList className='recent-transactions-tablist'>
          {accounts.map((account : Account)=>(
            <TabsTrigger 
            key={account.id}
            value={account.appwriteItemId}
            >
              <BankTabItem key={account.id} account={account} appwriteItemId={appwriteItemId} />  
            </TabsTrigger>
          ))}
          </TabsList>
          {accounts.map((account : Account)=>(
            <TabsContent 
            value={appwriteItemId}
            key={account.id}
            className='space-y-4'
            >
              <BankInfo account={account} appwriteItemId={appwriteItemId} type='full'/>
              <TransactionsTable transactions={transactions} />
            </TabsContent>
          ))}
        </Tabs>
    </header>
  )
}

export default RecentTransaction