import emailjs from "@emailjs/browser";

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;

export function isEmailJsConfigured() {
  return Boolean(publicKey && serviceId);
}

function configError() {
  if (!serviceId) {
    return "Missing VITE_EMAILJS_SERVICE_ID in .env";
  }
  if (!publicKey) {
    return "Missing VITE_EMAILJS_PUBLIC_KEY in .env (EmailJS → Account → API Keys)";
  }
  return "EmailJS is not configured. Check .env.example";
}

/** @param {string} templateId @param {Record<string, string>} templateParams */
export function sendEmail(templateId, templateParams) {
  if (!isEmailJsConfigured()) {
    return Promise.reject(new Error(configError()));
  }
  if (!templateId) {
    return Promise.reject(new Error("Email template ID is missing in .env"));
  }

  return emailjs.send(serviceId, templateId, templateParams, { publicKey }).catch((err) => {
    const detail =
      typeof err?.text === "string"
        ? err.text
        : err instanceof Error
          ? err.message
          : "Email send failed";
    return Promise.reject(new Error(detail));
  });
}
