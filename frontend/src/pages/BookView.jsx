import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSingleBook } from "../store/slices/bookSlice.js";

const BookView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { activeBook: book, loading } = useSelector((state) => state.book);

    useEffect(() => {
        dispatch(fetchSingleBook(id));
    }, [dispatch, id]);

    if (loading || !book) {
        return <p className="font-mono text-sm text-ink-soft px-10 py-14">Loading...</p>;
    }

    const lowStock = book.quantity < 5;

    return (
        <div className="px-10 py-14 max-w-3xl">
            <Link to="/" className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft hover:text-ink underline">
                &larr; Back to catalog
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
                {book.coverImage?.url && (
                    <img src={book.coverImage.url} alt={book.title} className="w-full border border-line object-cover" />
                )}

                <div>
                    {book.genre?.name && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border border-line text-ink-soft inline-block mb-4">
                            {book.genre.name}
                        </span>
                    )}
                    <h1 className="font-display text-4xl mb-2">{book.title}</h1>
                    <p className="font-body text-ink-soft italic mb-6">by {book.author?.name || "Unknown"}</p>

                    {book.description && (
                        <p className="font-body text-ink-soft leading-relaxed mb-6">{book.description}</p>
                    )}

                    <div className="border-t border-line pt-4 space-y-2 font-mono text-sm">
                        <div className="flex justify-between">
                            <span className="text-ink-soft">Stock quantity</span>
                            <span className={lowStock ? "text-red-600" : "text-ink"}>
                                {book.quantity} {lowStock && "(Low stock)"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-ink-soft">Available copies</span>
                            <span className="text-ink">{book.availableCopies}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-ink-soft">Price</span>
                            <span className="text-ink">${book.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookView;