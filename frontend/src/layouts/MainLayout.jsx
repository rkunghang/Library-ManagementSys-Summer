import Sidebar from "../components/Sidebar.jsx";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-paper">
            <Sidebar />
            <main className="ml-60 min-h-screen">{children}</main>
        </div>
    );
};

export default MainLayout;