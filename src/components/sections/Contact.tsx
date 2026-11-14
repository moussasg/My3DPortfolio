import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CircleAlert, CircleCheck } from "lucide-react";
import emailjs from "@emailjs/browser";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import Earthcanvas from "../canvas/Earth";
import github from "../../assets/github.png"
import linckedin from "../../assets/in.png"

const INITIAL_STATE = Object.fromEntries(
  Object.keys(config.contact.form).map((input) => [input, ""])
);

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN,
};

/** Feedback shown under the "Send" button (instead of a browser pop-up). */
const CONTACT_MESSAGES = {
  missingFields: "Please fill in all the fields before submitting.",
  success: "Thank you! Your message has been sent. I will get back to you as soon as possible.",
  failure: "Sorry, your message could not be sent. Please try again later or contact me on LinkedIn.",
};

type TFormStatus = { type: "success" | "error"; text: string } | null;

const FormMessage = ({ type, text }: { type: "success" | "error"; text: string }) => {
  const Icon = type === "success" ? CircleCheck : CircleAlert;
  const colors =
    type === "success"
      ? "border-green-500/40 bg-green-500/10 text-green-300"
      : "border-red-500/40 bg-red-500/10 text-red-300";
  return (
    <p className={`mt-4 flex items-start gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${colors}`}>
      <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{text}</span>
    </p>
  );
};

const Contact = () => {
  const formRef = useRef<React.LegacyRef<HTMLFormElement> | undefined>();
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<TFormStatus>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  // On phones the message can appear below the bottom of the screen: bring it into view.
  useEffect(() => {
    if (!status) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    messagesRef.current?.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (e === undefined) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setStatus(null); // the old message no longer applies once the visitor edits the form
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (e === undefined) return;
    e.preventDefault();

    const isFormFilled = Object.values(form).every(value => value.trim() !== "");
    if (!isFormFilled) {
      setStatus({ type: "error", text: CONTACT_MESSAGES.missingFields });
      return;
    }

    setStatus(null);
    setLoading(true);
    try {
      // Inside try: emailjs.send() throws synchronously when a key is missing.
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          form_name: form.name,
          to_name: config.html.fullName,
          from_email: form.email,
          to_email: config.html.email,
          message: form.message,
        },
        emailjsConfig.accessToken
      );
      setStatus({ type: "success", text: CONTACT_MESSAGES.success });
      setForm(INITIAL_STATE);
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", text: CONTACT_MESSAGES.failure });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div
      className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 flex-[0.75] rounded-2xl p-8"
      >
        <Header useMotion={false} {...config.contact} />

        <form
          // @ts-expect-error
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {Object.keys(config.contact.form).map((input) => {
            const { span, placeholder } =
              config.contact.form[input as keyof typeof config.contact.form];
            const Component = input === "message" ? "textarea" : "input";

            return (
              <label key={input} className="flex flex-col">
                <span className="mb-4 font-medium text-white">{span}</span>
                <Component
                  type={input === "email" ? "email" : "text"}
                  name={input}
                  value={form[`${input}`]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
                  {...(input === "message" && { rows: 7 })}
                />
              </label>
            );
          })}
          <div className="flex flex-col items-start">
            <button
              type="submit"
              disabled={loading}
              className="bg-tertiary shadow-primary w-fit rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send"}
            </button>
            {/* Live regions stay in the page so screen readers announce new messages. */}
            <div ref={messagesRef} className="w-full scroll-mb-6">
              <div role="status">
                {status?.type === "success" && <FormMessage {...status} />}
              </div>
              <div role="alert">
                {status?.type === "error" && <FormMessage {...status} />}
              </div>
            </div>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <Earthcanvas />
      </motion.div>

    </div>
    <br></br>
    <div className="flex w-[100%] items-center justify-center mt-10 gap-x-4">
      <a href={config.social.github} target="_blank" rel="noopener noreferrer">
        <img src={github} alt="GitHub" className="w-10 h-10" />
      </a>
      <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">
        <img src={linckedin} alt="LinkedIn" className="w-10 h-10" />
      </a>
      <a
        href={config.html.cvUrl}
        download
        className="rounded-xl border-2 border-[#915eff] px-4 py-2 font-bold text-white transition-colors hover:bg-[#7c3aed]"
      >
        Download CV
      </a>
    </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
