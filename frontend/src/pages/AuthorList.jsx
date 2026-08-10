import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAuthors, deleteAuthor } from "../store/slices/authorSlice.js";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

const AuthorList = () => {
    const dispatch = useDispatch();
    const { authors, loading } = useSelector((state) => state.author);

    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Delete this author?")) dispatch(deleteAuthor(id));
    };

    return (
        <div className="px-10 py-14">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">Registry</p>
                    <h1 className="font-display text-4xl">Authors</h1>
                </div>
                <Link
                    to="/admin/authors/add"
                    className="flex items-center gap-2 border border-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] hover:bg-ink hover:text-paper transition-colors"
                >
                    <FiPlus size={14} /> Add author
                </Link>
            </div>

            {loading && <p className="font-mono text-sm text-ink-soft">Loading...</p>}
            {!loading && authors.length === 0 && <p className="font-mono text-sm text-ink-soft">No authors yet.</p>}

            <div className="divide-y divide-line border-t border-b border-line">
                {authors.map((author) => (
                    <div key={author._id} className="py-4 flex items-center gap-4">
                        <div className="flex-1">
                            <h3 className="font-display text-lg">{author.name}</h3>
                            {author.biography && (
                                <p className="font-body text-sm text-ink-soft mt-1 line-clamp-2">{author.biography}</p>
                            )}
                        </div>
                        <Link
                            to={`/admin/authors/edit/${author._id}`}
                            className="border border-line text-ink-soft hover:border-ink hover:text-ink p-2 transition-colors"
                        >
                            <FiEdit2 size={14} />
                        </Link>
                        <button
                            onClick={() => handleDelete(author._id)}
                            className="border border-line text-ink-soft hover:border-ink hover:text-ink p-2 transition-colors"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuthorList;