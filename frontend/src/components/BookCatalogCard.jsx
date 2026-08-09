const spineShades = ["#111111", "#3a3a3a", "#6b6b6b", "#9a9890", "#c9c7bd"];

const BookCatalogCard = ({ book, index }) => {
    const shade = spineShades[index % spineShades.length];
    const callNumber = `LB.${(index + 1).toString().padStart(3, "0")}`;

    return (
        <div className="group bg-paper border border-line hover:border-ink transition-colors duration-300">
            <div className="h-2 w-full" style={{ backgroundColor: shade }} />

            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] tracking-[0.15em] text-ink-soft">
                        {callNumber}
                    </span>
                    <span
                        className={`font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border ${
                            book.availableCopies > 0
                                ? "border-ink text-ink"
                                : "border-line text-paper-soft"
                        }`}
                    >
                        {book.availableCopies > 0 ? "Available" : "Checked out"}
                    </span>
                </div>

                <h3 className="font-display text-xl leading-snug mb-1 group-hover:italic transition-all">
                    {book.title}
                </h3>
                <p className="font-body text-sm text-ink-soft italic mb-4">by {book.author}</p>
                <p className="font-body text-sm text-ink-soft line-clamp-3 mb-4">
                    {book.description}
                </p>

                <div className="flex items-center justify-between font-mono text-xs text-ink-soft border-t border-line pt-3">
                    <span>${book.price}</span>
                    <span>{book.availableCopies}/{book.quantity} copies</span>
                </div>
            </div>
        </div>
    );
};

export default BookCatalogCard;