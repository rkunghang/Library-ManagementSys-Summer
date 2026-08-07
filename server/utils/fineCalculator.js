export const FINE_PER_DAY = 0.5; // fine charged per day overdue — adjust to your currency/rate

export function calculateFine(dueDate) {
    const today = new Date();

    // whole days between today and the due date — negative/0 means not overdue
    const overdueDays = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));

    if (overdueDays <= 0) {
        return 0;
    }

    return overdueDays * FINE_PER_DAY; // total fine = days late × daily rate
}