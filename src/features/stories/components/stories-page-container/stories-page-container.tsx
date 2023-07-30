import { SidePanel } from '@/components/blocks/side-panel';

type StoriesPageContainerProps = {
  children: React.ReactNode;
};

const StoriesPageContainer: React.FC<StoriesPageContainerProps> = ({
  children,
}) => {

  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
      >
        {children}
      </div>
      <div
        className={`relative hidden lg:flex p-0 z-0 min-w-0 min-h-0 box-border my-0 ml-0 flex-shrink-0 basis-auto flex-col border-0 w-[350px] items-stretch`}
      >
        <SidePanel />
      </div>
    </div>
  );
};

export default StoriesPageContainer;
