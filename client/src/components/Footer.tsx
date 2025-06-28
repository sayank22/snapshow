import Link from "next/link";
import about from "../app/about"

export default function Footer() {
  return (
    <>
      {/* Extended Footer Section */}
      <section className="bg-slate-300 border-t mt-20 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-indigo-800 text-center mb-4">
            One Platform. Endless Product Demos.
          </h2>
          <p className="text-center text-gray-600 text-lg mb-10">
            SnapShows helps teams create, share, and showcase product workflows with ease.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-gray-700">
            {/* Product Column */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">Platform Features</h3>
              <ul className="space-y-2">
                <li>• Interactive Tour Editor</li>
                <li>• Screen Recorder</li>
                <li>• Step-by-Step Demos</li>
                <li>• Public & Private Sharing</li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">About SnapShows</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="relative font-bold text-purple-700 transition-all duration-300 hover:text-purple-900 hover:scale-105 inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-900 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Who I am
                  </Link>
                </li>
                <li className="text-gray-700 font-medium">Plans:</li>
                <li>- Free Tier: Limited features</li>
                <li>- Pro: ₹399/month for full access</li>
                <li>- Teams: Custom pricing</li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">Connect With Me</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/sayank22/SnapShows"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02] hover:shadow-md"
                  >
                    🐱 GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:sayank10023@gmail.com"
                    className="flex items-center gap-2 p-3 border rounded-lg transition-all duration-300 hover:bg-red-50 hover:scale-[1.02] hover:shadow-md"
                  >
                    📧 Email: sayank10023@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/sayan-kundu-70b5442b6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border rounded-lg transition-all duration-300 hover:bg-blue-50 hover:scale-[1.02] hover:shadow-md"
                  >
                    🔗 LinkedIn – Sayan Kundu
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <footer className="text-center py-10 text-sm text-gray-500 border-t mt-20">
        <p>
          © {new Date().getFullYear()}{" "}
          <strong className="text-indigo-700 font-semibold">SnapShows</strong> • Crafted with passion by Sayan Kundu
        </p>
      </footer>
    </>
  );
}
