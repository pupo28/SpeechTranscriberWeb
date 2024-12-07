import React, { useRef, useState, useEffect } from "react";

export default function Clipboard({ text }) {
  const [copySuccess, setCopySuccess] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [editableText, setEditableText] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (text !== editableText) {
      setEditableText(text);
    }
    adjustTextareaHeight();
  }, [text]);

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleTextChange = (e) => {
    setEditableText(e.target.value);
    adjustTextareaHeight();
  };

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <section className="bg-white dark:bg-dark">
      <div className="container-clip-board">
        <div className="mx-auto w-full max-w-[500px]">
          <div className="relative flex justify-between items-center border border-stroke rounded-t-lg bg-gray-1 p-2 dark:border-dark-3 dark:bg-dark-2 w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px]">
            <span className="font-semibold">Textarea</span>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleEdit}
                className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-stroke bg-white px-2.5 py-1.5 text-sm font-medium text-dark duration-200 hover:bg-black hover:text-white dark:border-dark-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 010 2.828L7.414 15.414a2 2 0 01-.768.512l-4 1.5a1 1 0 01-1.3-1.3l1.5-4a2 2 0 01.512-.768l10-10a2 2 0 012.828 0zM15.707 4L16 4.293 15.707 4zM4.707 15.707l-1.147 3.065 3.065-1.147 9.5-9.5-2.918-2.918-9.5 9.5z" />
                </svg>
                Edit
              </button>
              <button
                onClick={copyToClipboard}
                className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-stroke bg-white px-2.5 py-1.5 text-sm font-medium text-dark duration-200 hover:bg-black hover:text-white dark:border-dark-3"
              >
                <span>
                  {copySuccess ? (
                    <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.0394 6.0293L8.03936 15.0293L3.68359 10.6736" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.6875 4.125L14.4062 0.875C14.1875 0.65625 13.875 0.53125 13.5625 0.53125H7.875C6.96875 0.53125 6.21875 1.28125 6.21875 2.1875V13.5937C6.21875 14.5 6.96875 15.25 7.875 15.25H16.375C17.2812 15.25 18.0312 14.5 18.0312 13.5937V4.96875C18.0312 4.65625 17.9062 4.34375 17.6875 4.125ZM14.4687 2.9375L15.6562 4.125H14.4687V2.9375ZM16.375 13.8437H7.875C7.75 13.8437 7.625 13.7187 7.625 13.5937V2.1875C7.625 2.0625 7.75 1.9375 7.875 1.9375H13.0625V4.8125C13.0625 5.1875 13.375 5.53125 13.7812 5.53125H16.625V13.625C16.625 13.75 16.5 13.8437 16.375 13.8437Z" fill="currentColor" />
                    </svg>
                  )}
                </span>
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <textarea
            rows="6"
            ref={inputRef}
            value={editableText}
            onChange={handleTextChange}
            className="w-full rounded-b-lg border border-t-0 border-stroke bg-gray-1 p-5 leading-relaxed text-body-color outline-none duration-200 selection:bg-transparent focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 no-scrollbar"
            style={{ overflow: "hidden", resize: "none" }}
            readOnly={!isEditable}
          />
        </div>
      </div>
    </section>
  );
}
