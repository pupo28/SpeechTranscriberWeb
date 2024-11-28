import React, { useState, useEffect, useRef } from 'react';
import Clipboard from './ClipBoard.jsx';
import { CountriesSelect } from './CountriesSelect.jsx';

export default function Home({ setAudioStream, setFile, setTranscriptionProp }) {
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);

  const mediaRecorder = useRef(null);
  const speechRecognition = useRef(null);

  const mimeType = 'audio/webm';

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      speechRecognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      speechRecognition.current.continuous = true;
      speechRecognition.current.interimResults = true;
      speechRecognition.current.lang = 'it-IT';

      speechRecognition.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        setTranscription((prevTranscription) => prevTranscription + transcript);
      };

      speechRecognition.current.onerror = (err) => {
        console.error('SpeechRecognition Error:', err); // not supported in this browser
      };
    } else {
      console.log('SpeechRecognition API not supported in this browser');
    }
  }, []);

  async function startRecording() {
    let tempStream;
    console.log('Start recording');

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }
    setRecordingStatus('recording');

    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') { return; }
      if (event.data.size === 0) { return; }
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);

    if (speechRecognition.current) {
      speechRecognition.current.start();
    }
  }

  async function stopRecording() {
    setRecordingStatus('inactive');
    setShowTranslation(true); 
    console.log('Stop recording');

    if (mediaRecorder.current) {
      mediaRecorder.current.onstop = () => {
        console.log('fine registrazione');
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        setAudioStream(audioBlob);
        setAudioChunks([]);
        setDuration(0);
        setTranscriptionProp(transcription);
      };

      mediaRecorder.current.stop();
    }

    if (speechRecognition.current) {
      speechRecognition.current.stop();
    }
  }

  useEffect(() => {
    if (recordingStatus === 'inactive') { return; }

    const interval = setInterval(() => {
      setDuration(curr => curr + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [recordingStatus]);

  return (
    <>
      <div className={`home-first-step-translation ${showTranslation ? 'show' : ''}`}>
        <div className={`home-first-step-container`}>
          <h3 className='font-medium md:text-lg'>Record <span className='text-green-400'>&rarr;</span> Transcribe <span className='text-green-400'>&rarr;</span> Translate</h3>
          <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
            <p className='text-green-400'>{recordingStatus === 'inactive' ? 'Record' : `Stop recording`}</p>
            <div className='flex items-center gap-2'>
              <i className={"fa-solid duration-200 fa-microphone " + (recordingStatus === 'recording' ? ' text-rose-300' : "")}></i>
            </div>
          </button>
          <p className='text-base'>Or <label className='text-green-400 cursor-pointer hover:text-green-600 duration-200'>upload <input onChange={(e) => {
            const tempFile = e.target.files[0];
            setFile(tempFile);
          }} className='hidden' type='file' accept='.mp3,.wave' /></label> a mp3 file</p>

          {recordingStatus === 'recording' && (
            <div className="transcription">
              <h4>Transcription:</h4>
              <p>{transcription}</p>
            </div>
          )}

          {recordingStatus === 'recording' && (
            <div className="duration">
              <h4>Duration:</h4>
              <p>{duration} seconds</p>
            </div>
          )}
        </div>
      </div>

      {showTranslation && (
        <div className={`clipboard-translation ${showTranslation ? 'show' : ''}`}>
          <div className="clipboard">
            <Clipboard text={transcription} />
          </div>
        </div>
      )}
    </>
  );
}
