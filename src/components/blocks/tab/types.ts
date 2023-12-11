export type TabConfig = {
  content: JSX.Element;
  fetchData?: () => Promise<void>;
};

export type TabsConfig = Record<string, TabConfig>;
