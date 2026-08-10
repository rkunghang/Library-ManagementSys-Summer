import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/slices/bookSlice.js";
import { fetchAllUsers } from "../store/slices/userSlice.js";
import { fetchAllBorrowRecords } from "../store/slices/borrowSlice.js";
import Loader from "../components/Loader.jsx";

const StatTile = ({ label, value }) => (
    <div className="border border-line p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft mb-3">{label}</p>
        <p className="font-display text-4xl">{value}</p>
    </div>
);

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { books, loading: booksLoading } = useSelector((state) => state.book);
    const { users, loading: usersLoading } = useSelector((state) => state.user);
    const { allBorrowRecords, loading: borrowLoading } = useSelector((state) => state.borrow);

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchAllUsers());
        dispatch(fetchAllBorrowRecords());
    }, [dispatch]);

    const loading = booksLoading || usersLoading || borrowLoading;

    const totalTitles = books.length;
    const totalCopies = books.reduce((sum, b) => sum + b.quantity, 0);
    const availableCopies = books.reduce((sum, b) => sum + b.availableCopies, 0);
    const totalMembers = users.length;
    const activeBorrows = allBorrowRecords.filter((r) => !r.returnDate).length;
    const overdue = allBorrowRecords.filter(
        (r) => !r.returnDate && new Date(r.dueDate) < new Date()
    ).length; // still out AND past due — separate from just "active", since active alone doesn't tell you who's late
    const totalFines = allBorrowRecords.reduce((sum, r) => sum + (r.fine || 0), 0);

    return (
        <div className="px-10 py-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                Overview
            </p>
            <h1 className="font-display text-4xl mb-10">Dashboard</h1>

            {loading ? (
                <Loader label="Gathering figures" />
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <StatTile label="Titles in catalog" value={totalTitles} />
                    <StatTile label="Total copies" value={totalCopies} />
                    <StatTile label="Copies available" value={availableCopies} />
                    <StatTile label="Verified members" value={totalMembers} />
                    <StatTile label="Active borrows" value={activeBorrows} />
                    <StatTile label="Overdue" value={overdue} />
                    <StatTile label="Fines owed" value={`$${totalFines.toFixed(2)}`} />
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;