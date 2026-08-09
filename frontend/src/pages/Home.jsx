import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/slices/bookSlice.js";
import FadeInSection from "../components/FadeInSection.jsx";
import BookCatalogCard from "../components/BookCatalogCard.jsx";

const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { books, loading } = useSelector((state) => state.book);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <div>
            <header className="px-10 pt-14 pb-10 border-b border-line">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-3">
                    Reading room / {user?.name}
                </p>
                <h1 className="font-display text-5xl">The Catalog</h1>
                <p className="font-body text-ink-soft mt-3 max-w-lg">
                    Every title currently held by the library, indexed and ready to borrow.
                </p>
            </header>

            <div className="px-10 py-10">
                {loading && <p className="font-mono text-sm text-ink-soft">Loading catalog...</p>}
                {!loading && books.length === 0 && (
                    <p className="font-mono text-sm text-ink-soft">No titles in the catalog yet.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book, index) => (
                        <FadeInSection key={book._id} delay={(index % 6) * 60}>
                            <BookCatalogCard book={book} index={index} />
                        </FadeInSection>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;