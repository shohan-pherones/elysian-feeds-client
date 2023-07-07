import clsx from "clsx";

interface DashboardTabProps {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
  tabName: string;
  placeholder: string;
  children: React.ReactNode;
}

const DashboardTab: React.FC<DashboardTabProps> = ({
  activeTab,
  setActiveTab,
  tabName,
  children,
  placeholder,
}) => {
  return (
    <button
      onClick={() => setActiveTab(tabName)}
      className={clsx(
        "flex items-center gap-3 p-5 w-full h-full rounded-lg shadow-2xl hover:bg-accent duration-300 hover:text-black",
        activeTab === tabName ? "bg-accent text-black" : "bg-base-100"
      )}
    >
      <span>{children}</span> {placeholder}
    </button>
  );
};

export default DashboardTab;
