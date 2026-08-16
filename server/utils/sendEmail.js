import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, subject, message }) => {
    const { error } = await resend.emails.send({
        from: "Library System <onboarding@resend.dev>", // Resend's default test sender — swap for your own verified domain later if you want
        to: email,
        subject,
        html: message,
    });

    if (error) {
        throw new Error(error.message || "Failed to send email");
    }
};

export default sendEmail;