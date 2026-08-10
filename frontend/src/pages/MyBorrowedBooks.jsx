import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBorrowedBooks } from "../store/slices/borrowSlice.js";

const MyBorrowedBooks = () => {
    const dispatch = useDispatch();
    const { myBorrowedBooks, loading } = useSelector((state) => state.borrow);

    useEffect(() => {
        dispatch(fetchMyBorrowedBooks());
    }, [dispatch]);

    return (
        <div className="px-10 py-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                Your record
            </p>
            <h1 className="font-display text-4xl mb-8">Borrowed books</h1>

            {loading && <p className="font-mono text-sm text-ink-soft">Loading...</p>}
            {!loading && myBorrowedBooks.length === 0 && (
                <p className="font-mono text-sm text-ink-soft">You haven't borrowed anything yet.</p>
            )}

            <div className="divide-y divide-line border-t border-b border-line">
                {myBorrowedBooks.map((entry) => (
                    <div key={entry._id} className="py-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-display text-lg">{entry.bookTitle}</h3>
                            <p className="font-mono text-xs text-ink-soft mt-1">
                                Due {new Date(entry.dueDate).toDateString()}
                            </p>
                        </div>
                        <span
                            className={`font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border ${
                                entry.returned ? "border-line text-paper-soft" : "border-ink text-ink"
                            }`}
                        >
                            {entry.returned ? "Returned" : "With you"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBorrowedBooks;