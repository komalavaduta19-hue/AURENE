import React from 'react'

const sections = [
  {
    title: "HELP",
    links: ["Returns", "Track my order", "F.A.Q.s", "Email", "WhatsApp", "Messenger"],
  },
  {
    title: "FOLLOW US",
    links: ["Instagram", "TikTok", "Youtube", "Facebook", "Pinterest"],
  },
  {
    title: "ABOUT US",
    links: ["Who are we?", "Care instructions", "Join us", "Our addresses", "Our commitments"],
  },
  {
    title: "LEGAL NOTICES",
    links: ["Privacy Policy", "Legal Notices", "Accessibility Statement", "Terms and Conditions"],
  },
]

const Footer = () => {
  return (
    <footer className="w-full bg-[#fffcf8] px-6 md:px-16 pt-12 pb-10">

     
      <h1 className="font-playfair text-4xl md:text-5xl text-center tracking-wide text-black">
        AURÈNE
      </h1>

  
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-12 mt-16 md:mt-24">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col items-center text-center">
            <h3 className="font-josefin font-semibold text-sm tracking-widest text-black mb-6">
              {section.title}
            </h3>

            <div className="flex flex-col gap-1.5">
              {section.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-playfair text-gray-600 tracking-wider hover:text-black transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="font-playfair text-xl md:text-2xl text-center text-black mt-16 md:mt-24">
        Dress well. Overthink everything else.
      </p>

    </footer>
  )
}

export default Footer