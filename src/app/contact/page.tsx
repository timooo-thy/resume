import { Github, Linkedin, MailIcon } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Contact Me
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Let's connect! Feel free to reach out through any of the following
          channels.
        </p>

        <div className="flex justify-center space-x-8 mb-12 ">
          <a
            href="https://github.com/timooo-thy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Github className="text-4xl mb-2 w-6 h-6" />
            <span>GitHub</span>
          </a>

          <a
            href="https://sg.linkedin.com/in/timooothy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Linkedin className="text-4xl mb-2 w-6 h-6" />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:timothylhy@hotmail.com"
            className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <MailIcon className="text-4xl mb-2 w-6 h-6" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </main>
  );
}
