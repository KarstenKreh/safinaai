import { useState } from "react";
import { SubmitPayload, useFormspark } from "@formspark/use-formspark";
import { useTranslation } from "react-i18next";

interface ContactFormProps {
  isDarkTheme: boolean;
}

export const ContactForm = ({ isDarkTheme }: ContactFormProps) => {
  const { t } = useTranslation();
  const [submit, submitting] = useFormspark({
    formId: "okkws8NG5",
  });

  const [formData, setFormData] = useState<SubmitPayload>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submit(formData);
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className={`${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        } shadow-lg rounded-lg p-8 w-full`}
      >
        <div className="space-y-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className={`block text-sm font-medium ${
                isDarkTheme ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {t("contact.form.firstName")}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName as string}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md shadow-sm border
                ${
                  isDarkTheme
                    ? "bg-gray-700 border-gray-600 text-white focus:border-teal-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:border-teal-500"
                }
                focus:ring-2 focus:ring-teal-500 px-4 py-2`}
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className={`block text-sm font-medium ${
                isDarkTheme ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {t("contact.form.lastName")}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName as string}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md shadow-sm border
                ${
                  isDarkTheme
                    ? "bg-gray-700 border-gray-600 text-white focus:border-teal-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:border-teal-500"
                }
                focus:ring-2 focus:ring-teal-500 px-4 py-2`}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                isDarkTheme ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {t("contact.form.email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email as string}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md shadow-sm border
                ${
                  isDarkTheme
                    ? "bg-gray-700 border-gray-600 text-white focus:border-teal-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:border-teal-500"
                }
                focus:ring-2 focus:ring-teal-500 px-4 py-2`}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className={`block text-sm font-medium ${
                isDarkTheme ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {t("contact.form.phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone as string}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm border
                ${
                  isDarkTheme
                    ? "bg-gray-700 border-gray-600 text-white focus:border-teal-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:border-teal-500"
                }
                focus:ring-2 focus:ring-teal-500 px-4 py-2`}
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className={`block text-sm font-medium ${
                isDarkTheme ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {t("contact.form.message")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message as string}
              onChange={handleChange}
              required
              rows={4}
              className={`mt-1 block w-full rounded-md shadow-sm border
                ${
                  isDarkTheme
                    ? "bg-gray-700 border-gray-600 text-white focus:border-teal-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:border-teal-500"
                }
                focus:ring-2 focus:ring-teal-500 px-4 py-2`}
            />
          </div>

          {/* Button - Updated styling */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                ${submitting ? "bg-teal-400" : "bg-teal-600 hover:bg-teal-700"}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                transition-colors duration-200`}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </div>

          {status === "success" && (
            <div className="relative w-full">
              <div
                className="absolute left-0 right-0 mx-auto bg-green-50 p-4 rounded-lg shadow-lg"
                style={{ height: "400px", width: "auto" }}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  <svg
                    className="h-20 w-20 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-2xl font-medium text-green-800">
                    Message sent successfully!
                  </p>
                </div>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="relative w-full">
              <div
                className="absolute left-0 right-0 mx-auto bg-red-50 p-4 rounded-lg shadow-lg"
                style={{ height: "400px", width: "auto" }}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  <svg
                    className="h-20 w-20 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-2xl font-medium text-red-800">
                    {t("contact.form.error")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
