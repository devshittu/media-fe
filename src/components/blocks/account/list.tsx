import React, { useEffect, useState } from 'react';
import { AccountListItem } from './list-item';
import { AccountItem, AccountListProps } from './types';

const generateRandomAccountItems = (): AccountItem[] => {
  const accountItems: AccountItem[] = [];

  for (let i = 0; i < 3; i++) {
    const accountId = Math.random().toString(36).substr(2, 9);
    const active = Math.random() < 0.5;
    const username = Math.random().toString(36).substr(2, 8);
    const displayName = 'Random Channel';
    const gender = Math.random() < 0.5 ? 'male' : 'female';
    const displayPhotoUrl = `https://xsgames.co/randomusers/avatar.php?g=${gender}`;
    const accountItem: AccountItem = {
      accountId,
      active,
      username,
      displayName,
      displayPhotoUrl,
    };

    accountItems.push(accountItem);
  }

  return accountItems;
};

export const AccountList = ({ data = [] }: AccountListProps) => {
  const [accountData, setAccountData] = useState<AccountItem[]>([]);

  useEffect(() => {
    if (data?.length === 0) {
      setAccountData(generateRandomAccountItems());
    }
  }, [data]);

  // Generate random account items if data is empty
  if (data.length === 0) {
    data = accountData;
  }

  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-700">
      {data.map((account: AccountItem) => (
        <AccountListItem key={account.accountId} account={account} />
      ))}
    </ul>
  );
};
