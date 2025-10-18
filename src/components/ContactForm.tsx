"use client";
import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "651104ef-c4c5-4608-8de1-030859a0e3b3");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        form.reset();
      } else {
        setResult(data.message || "Something went wrong");
      }
    } catch (err) {
      setResult("Network error");
    }
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <input type="hidden" name="access_key" value="651104ef-c4c5-4608-8de1-030859a0e3b3" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2 tracking-wider">FULL NAME</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="enter full name"
            className="w-full bg-transparent border-b border-primary/40 pb-2 text-primary placeholder-primary/70 focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2 tracking-wider">LOCATION</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="enter city"
            className="w-full bg-transparent border-b border-primary/40 pb-2 text-primary placeholder-primary/70 focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 tracking-wider">EMAIL ADDRESS</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="enter address"
            className="w-full bg-transparent border-b border-primary/40 pb-2 text-primary placeholder-primary/70 focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2 tracking-wider">PHONE NUMBER</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="enter number"
            className="w-full bg-transparent border-b border-primary/40 pb-2 text-primary placeholder-primary/70 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="md:w-1/2 md:pr-3">
        <label htmlFor="message" className="block text-sm font-medium mb-1 tracking-wider">ANY MESSAGE</label>
        <textarea
          id="message"
          name="message"
          rows={1}
          placeholder="enter a message"
          className="w-full bg-transparent border-b border-primary/40 pb-2 text-primary placeholder-primary/70 focus:border-primary focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="pt-1">
        <button type="submit" className="bg-primary text-background px-8 py-1 rounded-full font-medium hover:bg-primary/90 transition-colors font-serif">
          {result ? <span className="text-sm font-normal">{result}</span> : <span className="text-lg font-medium">Submit</span>}
        </button>
      </div>
    </form>
  );
}
