import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-3">Error 404</p>
        <h1 className="font-display text-6xl mb-4">Not on the shelf</h1>
        <p className="font-body text-ink-soft mb-8 max-w-sm">
            The page you're looking for isn't in this catalog.
        </p>
        <Link
            to="/"
            className="bg-ink text-paper py-3 px-8 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors"
        >
            Back to the catalog
        </Link>
    </div>
);

export default NotFound;