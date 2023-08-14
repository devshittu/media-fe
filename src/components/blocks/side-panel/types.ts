export type PaneProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  linkHref?: string;            // New prop for link URL
  linkText?: string;            // New prop for link text
  showLink?: boolean;
};

export type PaneConfig = {
  id: string;
  title: string;
  component: React.ReactNode;
};
