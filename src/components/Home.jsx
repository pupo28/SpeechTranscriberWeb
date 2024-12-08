import React, { useState, useEffect, useRef } from 'react';   
import Clipboard from './ClipBoard.jsx';
import Notifications from './Notifications';

export default function Home({ selectedLanguage, setAudioStream, setFile, setTranscriptionProp }) {
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);  
  const [transcription, setTranscription] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [notificationType, setNotificationType] = useState('');

  const mediaRecorder = useRef(null);
  const speechRecognition = useRef(null);
  const mediaStream = useRef(null);  

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
        setNotificationType('danger'); 
      };
    } else {
      setNotificationType('danger'); 
    }
  }, []);

  useEffect(() => {
    if (speechRecognition.current) {
      switch (selectedLanguage.name) {
        case 'Francia':
          speechRecognition.current.lang = 'fr-FR';
          break;
        case 'Germania':
          speechRecognition.current.lang = 'de-DE';
          break;
        case 'Spagna':
          speechRecognition.current.lang = 'es-ES';
          break;
        case 'Regno Unito':
          speechRecognition.current.lang = 'en-GB';
          break;
        default:
          speechRecognition.current.lang = 'it-IT';
      }
    }
  }, [selectedLanguage]);

  async function startRecording() {
    let tempStream;
    console.log('Start recording');

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      tempStream = streamData;
      mediaStream.current = tempStream;  
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

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop());
      mediaStream.current = null;
    }
  }

  useEffect(() => {
    if (recordingStatus === 'inactive') { return; }

    const interval = setInterval(() => {
      setDuration(curr => curr + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [recordingStatus]);

  const formatDuration = (duration) => {
    if (duration < 60) {
      return `${duration} s`; 
    } else {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return `${minutes}m ${seconds}s`; 
    }
  };

  return (
    <>
      {notificationType && <Notifications type={notificationType} />}
      <div className={`home-first-step-translation ${showTranslation ? 'show' : ''}`}>
        <div className={`home-first-step-container`}>
          <h3 className='font-medium md:text-lg'>Record <span className='text-green-400'>&rarr;</span> Transcribe </h3>
          <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
            <p className='text-green-400'>{recordingStatus === 'inactive' ? 'Record' : `Stop recording`}</p>
            <div className='flex items-center gap-2'>
              {recordingStatus === 'recording' && (
                <div className='text-red-400'>
                  <p>{formatDuration(duration)}</p> 
                </div>
              )}
              <i className={"fa-solid duration-200 fa-microphone " + (recordingStatus === 'recording' ? ' text-rose-300' : "")}></i>
            </div>
          </button>
          <p className='text-base'>Or <label className='text-green-400 cursor-pointer hover:text-green-600 duration-200'>upload <input onChange={(e) => {
            const tempFile = e.target.files[0];
            setFile(tempFile);
          }} className='hidden' type='file' accept='.mp3,.wave' /></label> a mp3 file</p>
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
