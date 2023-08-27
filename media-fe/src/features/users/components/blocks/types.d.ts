export type AccountItem = {
  accountId: string;
  active: boolean;
  username: string;
  displayName: string;
  displayPhotoUrl: string;
};
export type AccountListItemProps = {
  account: AccountItem;
};
export type AccountListProps = {
  data?: AccountItem[];
};
