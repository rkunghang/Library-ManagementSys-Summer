import { useState } from "react";

const BorrowModal = ({ book, onClose, onConfirm, loading }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(email);
    };

    return (
        <div className="fixed inset-0 bg-ink/60 flex items-center justify-center z-50 px-6">
            <div className="bg-paper w-full max-w-sm border border-ink">
                <div className="px-6 py-5 border-b border-line">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft mb-1">
                        Record borrow
                    </p>
                    <h2 className="font-display text-xl">{book.title}</h2>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-6">
                    <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                        Member email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                        className="w-full border-b border-line focus:border-ink outline-none py-2 mb-8 mt-1 font-body bg-transparent"
                    />

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-ink text-paper py-2.5 font-mono text-xs uppercase tracking-[0.15em] hover:bg-black disabled:opacity-50 transition-colors"
                        >
                            {loading ? "Recording..." : "Confirm"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-line py-2.5 font-mono text-xs uppercase tracking-[0.15em] hover:border-ink transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BorrowModal;