function Footer() {
    return (
      <footer className="bg-white dark:bg-gray-800">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/#" className="flex items-center">
                <img src="../../public/img/lips_icon.png" className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-1xl font-bold whitespace-nowrap text-gray-800 dark:text-white">SpeechTranscriber</span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow me</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://github.com/pupo28" className="hover:text-green-600">Github</a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/michele-pucci-6b6a31247/" className="hover:text-green-600">LinkedIn</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="/#" className="hover:text-green-600">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/#" className="hover:text-green-600">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/#" className="hover:text-green-600">SpeechTranscriber™</a>. All Rights Reserved.</span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="https://github.com/pupo28" className="text-gray-500 hover:text-gray-900 dark:hover:text-green-600 ms-5">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
              <a href="https://portfolio-michele-pucci.vercel.app/" className="text-gray-500 hover:text-gray-900 dark:hover:text-green-600 ms-5">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" clipRule="evenodd"/>
                </svg>
                <span className="sr-only">Personal Website</span>
              </a>
              <a href="https://www.linkedin.com/in/michele-pucci-6b6a31247/" className="text-gray-500 hover:text-gray-900 dark:hover:text-green-600 ms-5">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16 3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12zm-6 12h-2v-4h2v4zm-1-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 5H7v-6h2v6zm-1-7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd"/>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  