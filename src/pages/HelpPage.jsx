import { useState } from "react";
import { sendEmail } from "../lib/emailjs";

const initial = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function HelpPage() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      await sendEmail(import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID, {
        from_name: form.name,
        reply_to: form.email,
        subject: form.subject,
        message: form.message,
      });
      setStatus("success");
      setForm(initial);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Could not send message. Check .env EmailJS keys.",
      );
    }
  };

  return (
    <div className="help-page">
      <header className="help-page__intro">
        <h1 className="help-page__title">Help &amp; contact</h1>
        <p className="help-page__lede">
          Questions about Cookpal, your account, or recipes? Send us a message and we will get back to you.
        </p>
      </header>

      <section className="help-page__panel" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="help-page__panel-title">
          Contact form
        </h2>

        {status === "success" ? (
          <div className="help-page__success-block">
            <p className="help-page__success" role="status">
              Thanks — your message has been sent. We will reply by email soon.
            </p>
            <button
              type="button"
              className="contact-form__secondary"
              onClick={() => setStatus("idle")}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            {status === "error" && (
              <p className="help-page__error" role="alert">
                {errorMessage}
              </p>
            )}
            <div className="contact-form__row">
              <label className="contact-form__label" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="contact-form__input"
                autoComplete="name"
                required
                value={form.name}
                onChange={update("name")}
              />
            </div>
            <div className="contact-form__row">
              <label className="contact-form__label" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="contact-form__input"
                autoComplete="email"
                required
                value={form.email}
                onChange={update("email")}
              />
            </div>
            <div className="contact-form__row">
              <label className="contact-form__label" htmlFor="contact-subject">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                className="contact-form__input"
                required
                value={form.subject}
                onChange={update("subject")}
              />
            </div>
            <div className="contact-form__row">
              <label className="contact-form__label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                className="contact-form__textarea"
                rows={6}
                required
                value={form.message}
                onChange={update("message")}
              />
            </div>
            <div className="contact-form__actions">
              <button
                type="submit"
                className="contact-form__submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default HelpPage;
