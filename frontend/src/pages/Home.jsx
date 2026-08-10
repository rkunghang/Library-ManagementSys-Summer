import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../store/slices/bookSlice.js";
import { fetchGenres } from "../store/slices/genreSlice.js";
import { recordBorrow } from "../store/slices/borrowSlice.js";
import FadeInSection from "../components/FadeInSection.jsx";
import BookCatalogCard from "../components/BookCatalogCard.jsx";
import BorrowModal from "../components/BorrowModal.jsx";

const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { books, loading } = useSelector((state) => state.book);
    const { genres } = useSelector((state) => state.genre);
    const [activeBook, setActiveBook] = useState(null);
    const [recording, setRecording] = useState(false);
    const [search, setSearch] = useState("");
    const [genreFilter, setGenreFilter] = useState("");

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchGenres());
    }, [dispatch]);

    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
            const matchesGenre = !genreFilter || book.genre?._id === genreFilter;
            return matchesSearch && matchesGenre;
        });
    }, [books, search, genreFilter]);

    const handleDelete = (id) => {
        if (window.confirm("Remove this title from the catalog?")) dispatch(deleteBook(id));
    };

    const handleConfirmBorrow = async (email) => {
        setRecording(true);
        const result = await dispatch(recordBorrow({ bookId: activeBook._id, email }));
        setRecording(false);
        if (recordBorrow.fulfilled.match(result)) {
            setActiveBook(null);
            dispatch(fetchBooks());
        }
    };

    return (
        <div>
            <header className="px-10 pt-14 pb-10 border-b border-line">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-3">
                    Reading room / {user?.name}
                </p>
                <h1 className="font-display text-5xl mb-6">The Catalog</h1>

                <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title..."
                        className="flex-1 border-b border-line focus:border-ink outline-none py-2 font-body bg-transparent"
                    />
                    <select
                        value={genreFilter}
                        onChange={(e) => setGenreFilter(e.target.value)}
                        className="border-b border-line focus:border-ink outline-none py-2 font-mono text-xs uppercase tracking-[0.15em] bg-transparent"
                    >
                        <option value="">All genres</option>
                        {genres.map((g) => (
                            <option key={g._id} value={g._id}>{g.name}</option>
                        ))}
                    </select>
                </div>
            </header>

            <div className="px-10 py-10">
                {loading && <p className="font-mono text-sm text-ink-soft">Loading catalog...</p>}
                {!loading && filteredBooks.length === 0 && (
                    <p className="font-mono text-sm text-ink-soft">No titles match your search.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBooks.map((book, index) => (
                        <FadeInSection key={book._id} delay={(index % 6) * 60}>
                            <BookCatalogCard book={book} index={index} onDelete={handleDelete} onBorrow={setActiveBook} />
                        </FadeInSection>
                    ))}
                </div>
            </div>

            {activeBook && (
                <BorrowModal book={activeBook} loading={recording} onClose={() => setActiveBook(null)} onConfirm={handleConfirmBorrow} />
            )}
        </div>
    );
};

export default Home;