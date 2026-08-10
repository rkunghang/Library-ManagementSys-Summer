import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiTrash2, FiBookOpen, FiEdit2 } from "react-icons/fi";

const spineShades = ["#111111", "#3a3a3a", "#6b6b6b", "#9a9890", "#c9c7bd"];
const LOW_STOCK_THRESHOLD = 5;

const BookCatalogCard = ({ book, index, onDelete, onBorrow }) => {
    const { user } = useSelector((state) => state.auth);
    const shade = spineShades[index % spineShades.length];
    const callNumber = `LB.${(index + 1).toString().padStart(3, "0")}`;
    const lowStock = book.quantity < LOW_STOCK_THRESHOLD; // core requirement — flags low inventory

    return (
        <div className={`group bg-paper border transition-colors duration-300 ${lowStock ? "border-red-600" : "border-line hover:border-ink"}`}>
            <div className="h-2 w-full" style={{ backgroundColor: shade }} />

            {book.coverImage?.url && (
                <Link to={`/book/${book._id}`}>
                    <img src={book.coverImage.url} alt={book.title} className="w-full h-48 object-cover border-b border-line" />
                </Link>
            )}

            <div className="p-5">
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                    <span className="font-mono text-[10px] tracking-[0.15em] text-ink-soft">{callNumber}</span>
                    {book.genre?.name && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border border-line text-ink-soft">
                            {book.genre.name}
                        </span>
                    )}
                    <span
                        className={`font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border ${
                            lowStock ? "border-red-600 text-red-600" : "border-ink text-ink"
                        }`}
                    >
                        {lowStock ? `Low stock · ${book.quantity}` : `${book.quantity} in stock`}
                    </span>
                </div>

                <Link to={`/book/${book._id}`}>
                    <h3 className="font-display text-xl leading-snug mb-1 group-hover:italic transition-all">
                        {book.title}
                    </h3>
                </Link>
                <p className="font-body text-sm text-ink-soft italic mb-4">by {book.author?.name || "Unknown"}</p>

                <div className="flex items-center justify-between font-mono text-xs text-ink-soft border-t border-line pt-3 mb-4">
                    <span>${book.price}</span>
                    <span>{book.availableCopies}/{book.quantity} copies</span>
                </div>

                {user?.role === "Admin" && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onBorrow(book)}
                            className="flex-1 flex items-center justify-center gap-2 border border-ink py-2 font-mono text-[11px] uppercase tracking-[0.15em] hover:bg-ink hover:text-paper transition-colors"
                        >
                            <FiBookOpen size={12} /> Borrow
                        </button>
                        <Link
                            to={`/admin/edit-book/${book._id}`}
                            className="border border-line text-ink-soft hover:border-ink hover:text-ink px-3 flex items-center transition-colors"
                        >
                            <FiEdit2 size={14} />
                        </Link>
                        <button
                            onClick={() => onDelete(book._id)}
                            className="border border-line text-ink-soft hover:border-ink hover:text-ink px-3 transition-colors"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookCatalogCard;