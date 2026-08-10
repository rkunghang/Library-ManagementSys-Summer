import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBorrowRecords, returnBorrow } from "../store/slices/borrowSlice.js";
import { fetchBooks } from "../store/slices/bookSlice.js";

const AdminBorrowRecords = () => {
    const dispatch = useDispatch();
    const { allBorrowRecords, loading } = useSelector((state) => state.borrow);

    useEffect(() => {
        dispatch(fetchAllBorrowRecords());
    }, [dispatch]);

    const handleReturn = async (record) => {
        const result = await dispatch(returnBorrow({ bookId: record.book, email: record.user.email }));
        if (returnBorrow.fulfilled.match(result)) {
            dispatch(fetchAllBorrowRecords());
            dispatch(fetchBooks()); // availableCopies changed on return
        }
    };

    return (
        <div className="px-10 py-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                Ledger
            </p>
            <h1 className="font-display text-4xl mb-8">Borrow records</h1>

            {loading && <p className="font-mono text-sm text-ink-soft">Loading...</p>}

            <div className="divide-y divide-line border-t border-b border-line">
                {allBorrowRecords.map((record) => (
                    <div key={record._id} className="py-4 flex items-center justify-between gap-4">
                        <div>
                            <h3 className="font-display text-lg">{record.bookTitle}</h3>
                            <p className="font-mono text-xs text-ink-soft mt-1">
                                {record.user.name} · {record.user.email}
                            </p>
                            <p className="font-mono text-xs text-ink-soft">
                                Due {new Date(record.dueDate).toDateString()}
                                {record.fine > 0 && ` · Fine $${record.fine}`}
                            </p>
                        </div>

                        {record.returnDate ? (
                            <span className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border border-line text-paper-soft">
                                Returned
                            </span>
                        ) : (
                            <button
                                onClick={() => handleReturn(record)}
                                className="border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] hover:bg-ink hover:text-paper transition-colors"
                            >
                                Mark returned
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminBorrowRecords;