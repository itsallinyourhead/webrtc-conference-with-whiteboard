// Global variables
const audio = {
  recording: {
    cache: {
      name: 'audio-cache',
    },
    chunks: [],
    config: {
      autoGainControl: false,
      echoCancellation: false,
      noiseSuppression: false,
    },
    context: null,
    converting: {
      counter: 0,
      names: {},
    },
    currentName: '',
    isConverting: false,
    isPausing: false,
    isStopping: false,
    media: [],
    mediaRecorder: null,
    mp3: {
      channels: 1, // mono
      kbps: 128,
      kHz: 16000, 
    },
    node: null,
    sampleRate: 16000,
    source: null,
    startedAt: null,
    startName: null,
    stream: null,
    type: 'mp3',
    volume: 0,
  },
};
const camera = {
  local: {
    deviceId: null,
    dimensions: {},
    isListeningOnChange: false,
    list: [],
    mirrored: {
      cleanUp: null,
    },
    on: true,
    permission: {},
    trackId: null,
  },
  remote: {
    on: true,
    onLast: new Map(), // Map<partnerId, MediaStream>
    streams: new Map(), // Map<partnerId, MediaStream>
    tracks: new Map(), // Map<partnerId, RTCRtpSender>
  },
};
window.camera = camera;
const chat = {
  all: document.getElementById('chatAll'),
  new: document.getElementById('chatNew'),
  newOuter: document.getElementById('chatNewOuter'),
  old: document.getElementById('chatOld'),
  oldOuter: document.getElementById('chatOldOuter'),
  outer: document.getElementById('chatOuter'),
  scrollLastElementIndex: -1,
  sendMessage: document.getElementById('chatSendMessage'),
};
const dataChannel = {
  receive: {
    chunks: new Map(), // Map<partnerId, chunks[]>
    incomingIdsByPartnerId: new Map(), // Map<partnerId, Set>
    largeMessageCounter: new Map(), // Map<partnerId, Integer>
    partnerIdByIncomingId: new Map(), // Map<incomingId, partnerId>
  },
  send: {
    bufferedAmountLowThreshold: 65536,
    chunks: new Map(), // Map<partnerId, boolean>
    chunkSize: 128 * 1024,
    largeMessageCounter: 0,
    maxMessages: 500,
    retryDelay: 100,
  },
};
let dataChannels = new Map(); // Map<partnerId, RTCDataChannel>
const fonts = [
  'Arial',
  'Cursive',
  'Monospace',
  'Serif',
  'System-UI',
];
const gallery = {
  video: {
    lastSrc: null,
    muted: null,
    playbackRate: null,
    playing: null,
    recordedTrackAdded: new Map(), // Map<partnerId, boolean>
    syncHeartBeat: null,
    syncHeartBeatInterval: 5E3,
    volume: null,
  },
};
const html2Canvas = {
  config: {
    allowTaint: true,
    useCORS: true,
  },
  isActive: false,
};
const internationalisation = {
  activatePencil: {
    de: 'Stift aktivieren',
    en: 'Activate pencil',
  },
  audioRecording: {
    de: 'Tonaufnahme',
    en: 'Audio recording',
  },
  back: {
    de: 'Zurück',
    en: 'Back',
  },
  camera: {
    de: 'Kamera',
    en: 'Camera',
  },
  cameraSettings: {
    de: 'Kameraeinstellungen',
    en: 'Camera settings',
  },
  colorPicker: {
    de: 'Farbauswahl',
    en: 'Color picker',
  },
  control: {
    de: 'Steuerung',
    en: 'Control',
  },
  copy: {
    de: 'Kopieren',
    en: 'Copy',
  },
  copyLink: {
    de: 'Link kopieren',
    en: 'Copy Link',
  },
  couldNotConvertPDFFile: {
    de: (args) => {return 'Fehler: "Die PDF-Datei ' + args.name + '" kann nicht konvertiert werden.';},
    en: (args) => {return 'Error: " The PDF file ' + args.name + '" could not be converted.';},
  },
  couldNotTakeAPhoto: {
    de: 'Foto konnte nicht generiert werden.',
    en: 'Could not take a photo.',
  },
  createMeeting: {
    de: 'Meeting erstellen',
    en: 'Create Meeting',
  },
  deactivatePencil: {
    de: 'Stift deaktivieren',
    en: 'Deactivate pencil',
  },
  'delete': {
    de: 'Löschen',
    en: 'Delete',
  },
  deleteAudioRecording: {
    de: 'Tonaufnahme löschen',
    en: 'Delete audio recording',
  },
  deletePhoto: {
    de: 'Foto löschen',
    en: 'Delete photo',
  },
  deleteVideoRecording: {
    de: 'Videoaufnahme löschen',
    en: 'Delete video recording',
  },
  draw: {
    de: 'Zeichnen',
    en: 'Draw',
  },
  endAudioRecording: {
    de: 'Tonufnahme beenden',
    en: 'End audio recording',
  },
  endVideoRecording: {
    de: 'Videoaufnahme beenden',
    en: 'End video recording',
  },
  fileNameIsNotAValidImageFile: {
    de: (args) => {return 'Fehler: "' + args.name + '" ist keine valide Bilddatei.';},
    en: (args) => {return 'Error: "' + args.name + '" is not a valid image.';},
  },
  fileNameIsNotAValidPDFFile: {
    de: (args) => {return 'Fehler: "' + args.name + '" ist keine valide PDF-Datei.';},
    en: (args) => {return 'Error: "' + args.name + '" is not a valid PDF file.';},
  },
  fileNameIsConverting: {
    de: (args) => {return '"' + args.name + '" wird konvertiert.';},
    en: (args) => {return '"' + args.name + '" is converting.';},
  },
  fileNotFound: {
    de: 'Fehler: Datei nicht gefunden.',
    en: 'Error: File not found.',
  },
  fontFamily: {
    de: 'Schriftart',
    en: 'Font family',
  },
  fontSize: {
    de: 'Schriftgröße',
    en: 'Font size',
  },
  forward: {
    de: 'Vorwärts',
    en: 'Forward',
  },
  hangUp: {
    de: 'Auflegen',
    en: 'Hang up',
  },
  image: {
    de: 'Bild',
    en: 'Image',
  },
  insert: {
    de: 'Einfügen',
    en: 'Insert',
  },
  lineWidth: {
    de: 'Strichstärke',
    en: 'Line width',
  },
  lock: {
    de: 'Fixieren',
    en: 'Lock',
  },
  microphone: {
    de: 'Mikrofon',
    en: 'Microphone',
  },
  microphoneSettings: {
    de: 'Mikrofoneinstellungen',
    en: 'Microphone settings',
  },
  mode: {
    de: 'Modus',
    en: 'Mode',
  },
  moveDown: {
    de: 'Nach unten schieben',
    en: 'Move down',
  },
  moveUp: {
    de: 'Nach oben schieben',
    en: 'Move up',
  },
  noMimeType: {
    de: 'Kein mime type',
    en: 'No mime type',
  },
  removeElement: {
    de: 'Element entfernen.',
    en: 'Remove element.',
  },
  removePDF: {
    de: 'PDF entfernen.',
    en: 'Remove PDF.',
  },
  options: {
    de: 'Optionen',
    en: 'Options',
  },
  pauseAudioRecording: {
    de: 'Tonaufnahme pausieren',
    en: 'Pause audio recording',
  },
  pauseVideoRecording: {
    de: 'Videoaufnahme pausieren',
    en: 'Pause video recording',
  },
  permissionDenied: {
    de: 'Zugriff verweigert',
    en: 'Permission denied',
  },
  photoOfWhiteboard: {
    de: 'Foto vom Whiteboard',
    en: 'Photo of whiteboard',
  },
  shareScreen: {
    de: 'Bildschirm teilen',
    en: 'Share screen',
  },
  sendMessage: {
    de: 'Nachricht senden',
    en: 'Send message',
  },
  showVideo: {
    de: 'Video anzeigen',
    en: 'Show video',
  },
  showWhiteboard: {
    de: 'Whiteboard anzeigen',
    en: 'Show whiteboard',
  },
  startAudioRecording: {
    de: 'Tonaufnahme starten',
    en: 'Start audio recording',
  },
  startVideoRecording: {
    de: 'Videoaufnahme starten',
    en: 'Start video recording',
  },
  stopScreenSharing: {
    de: 'Bildschirmfreigabe beenden',
    en: 'Stop screen sharing',
  },
  strongNoiseCancellation: {
    de: 'Starke Geräuschunterdrückung',
    en: 'Strong noise cancellation',
  },
  text: {
    de: 'Text',
    en: 'Text',
  },
  thumbnail: {
    de: 'Miniaturansicht',
    en: 'Thumbnail',
  },
  turnOnLocalCamera: {
    de: 'Lokale Kamera einschalten',
    en: 'Turn on local camera',
  },
  turnOnLocalMicrophone: {
    de: 'Lokales Mikrofon einschalten',
    en: 'Turn on local microphone',
  },
  turnOnRemoteCamera: {
    de: 'Remote Kamera einschalten',
    en: 'Turn on remote camera',
  },
  turnOnRemoteMicrophone: {
    de: 'Remote Mikrofon einschalten',
    en: 'Turn on remote microphone',
  },
  uploadImagesOrPDF: {
    de: 'Bilder oder PDF-Dateien hochladen.\nKlicke auf den Button oder ziehe Dateien drauf.',
    en: 'Upload images or PDF files.\nClick button or drop files.',
  },
  unnamedFile: {
    de: 'unbenannte Datei',
    en: 'unnamed file',
  },
  uploadPDF: {
    de: 'PDF-Datei hochladen',
    en: 'Upload PDF file',
  },
  userHasJoinedTheMeeting: {
    de: (args) => {return 'Nutzer ' + args.partnerId + ' ist dem Meeting beigetreten';},
    en: (args) => {return 'User ' + args.partnerId + ' has joined the meeting';},
  },
  userHasLeftTheMeeting: {
    de: (args) => {return 'Nutzer ' + args.partnerId + ' hat das Meeting verlassen';},
    en: (args) => {return 'User ' + args.partnerId + ' has left the meeting';},
  },
  videoRecording: {
    de: 'Videoaufnahme',
    en: 'Video recording',
  },
  volume: {
    de: 'Lautstärke',
    en: 'Volume',
  },
  weakNoiseCancellation: {
    de: 'Schwache Geräuschunterdrückung',
    en: 'Weak noise cancellation',
  },
  whiteboard: {
    de: 'Whiteboard',
    en: 'Whiteboard',
  },
  whiteboardNotFound: {
    de: 'Fehler: Whiteboard nicht gefunden.',
    en: 'Error: Whiteboard not found.',
  },
};
let isInitiator = false;
let localCameraStream = null;
let localStream = null; // sent to peers
const microphone = {
  local: {
    deviceId: null,
    isListeningOnChange: false,
    list: [],
    on: true,
    permission: {},
  },
  remote: {
    on: true,
    streams: new Map(), // Map<partnerId, MediaStream>
    tracks: new Map(), // Map<partnerId, RTCRtpSender>
  },
};
window.microphone = microphone;
const modal = {
  close: document.getElementById('modalClose'),
  inner: document.getElementById('modalInner'),
  outer: document.getElementById('modalOuter'),
  title: document.getElementById('modalTitle'),
};
const nav = {
  activeOptions: {
    className: 'navActiveOptions',
    connector: {
      height: parseInt(uiCSSRuleGet('--navActiveOptionsConnectorHeight', '.navActiveOptionsOuter'), 10) || 10,
      html:
        '<svg height="10" viewBox="0 0 18 10" width="18" xmlns="http://www.w3.org/2000/svg">'
          +'<path d="M18 0C15.7909 0 14 1.79086 14 4V6C14 8.20914 15.7909 10 18 10H0C2.20914 10 4 8.20914 4 6V4C4 1.79086 2.20914 0 0 0H18Z"/>'
        +'</svg>',
      width: parseInt(uiCSSRuleGet('--navActiveOptionsConnectorWidth', '.navActiveOptionsOuter'), 10) || 18,
    },
    currentOuter: null,
    keep: false,
    transitionDuration: .2,
    zIndex: 100,
    zIndexMax: 999,
  },
  draw: {
    colorPicker: document.getElementById('navDrawColorPicker'),
    lineWidth: document.getElementById('navDrawLineWidth'),
    pencil: document.getElementById('navDrawPencil'),
  },
  insert: {
    image: document.getElementById('navInsertImage'),
    pdf: document.getElementById('navInsertPDF'),
    text: document.getElementById('navInsertText'),
  },
  mode: {
    video: document.getElementById('navModeVideo'),
    whiteboard: document.getElementById('navModeWhiteboard'),
  },
  options: {
    audioRecording: document.getElementById('navOptionsAudioRecording'),
    shareScreen: document.getElementById('navOptionsShareScreen'),
    videoRecording: document.getElementById('navOptionsVideoRecording'),
    whiteboardRecording: document.getElementById('navOptionsWhiteboardRecording'),
  },
  text: {
    colorPicker: document.getElementById('navTextColorPicker'),
    family: document.getElementById('navTextFamily'),
    size: document.getElementById('navTextSize'),
    sizeCurrent: document.getElementById('navTextSizeCurrent'),
  },
  video: {
    camera: document.getElementById('navVideoCamera'),
    hangUp: document.getElementById('navVideoHangUp'),
    microphone: document.getElementById('navVideoMicrophone'),
  },
  whiteboard: document.getElementById('navWhiteboard'),
};
const notifications = {
  duration: 5E3,
  outer: document.getElementById('notificationsOuter'),
};
const png = {
  grab: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IB2cksfwAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAALxJREFUSMftVD0LAjEUSw4HEQVddXbz//8YQUG8wcXNPQ7Xk+ddP95BBxUztbzXNE3TAn98HOjsk3fdzEsidVMyr6HJ1E6SXkSRzS5hvPXacVVAJ/B9HEiPAO7eI5eNlfZDC5rat/xdhL3Rba1gS1KfsxuAuaR1ciEJ088YYStpZ8ObyOCIOEUoL0mO0Hp48DytCM6lR64pKkk+AKxSsdlMURn6lp5vyOXn0L9csFlSamoLj0KaoNf4oH8ZT8qIT8u+iQUQAAAAAElFTkSuQmCC',
};
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    // Skip if canvas (or any ancestor) is hidden with display: none
    if (null === entry.target.offsetParent) {
      continue;
    }
    if (wb.whiteboard === entry.target) {
      const {borderBoxSize} = entry;
      const newHeight = Math.round(borderBoxSize[0]?.blockSize || entry.target.clientHeight);
      const newWidth = Math.round(borderBoxSize[0]?.inlineSize || entry.target.clientWidth);
      if (newHeight !== wb.whiteboard.height || newWidth !== wb.whiteboard.width) {
        wb.whiteboard.height = newHeight;
        wb.whiteboard.width = newWidth;
        wbDraw();
        // Adjust position of any active text input if it exists
        const activeInput = document.querySelector('.wbTextInput');
        if (activeInput && wb.selected && 'text' === wb.selected?.type) {
          activeInput.style.height = `${wb.selected.height}px`;
          activeInput.style.left = `${wb.selected.x}px`;
          activeInput.style.top = `${wb.selected.y}px`;
          activeInput.style.width = `${wb.selected.width}px`;
        }
      }
    }
  }
});
const rtc = {
  answerQueues: new Map(), // Map<partnerId, Array>
  config: null,
  iceCandidatesQueues: new Map(), // Map<partnerId, Array>
  isCreatingPCs: new Map(), // Map<partnerId, boolean>
  makingOffers: new Map(), // Map<partnerId, boolean>
  media: {
    isAcquiring: false,
    polling: {
      duration: 5E3,
      interval: null,
    },
  },
  offerQueues: new Map(), // Map<partnerId, Array>
  peerConnections: new Map(), // Map<partnerId, RTCPeerConnection>
  politeStates: new Map(), // Map<partnerId, boolean>
  trackMeta: new Map(), // Map<partnerId, Map<trackId, type>>
};
const serverTime = parseInt(document.getElementsByTagName('html')[0].getAttribute('data-server-time'), 10);
const shareScreen = {
  local: {
    deviceId: null,
    dimensions: {},
    on: false,
    tracks: null,
  },
  remote: {
    tracks: new Map(), // Map<partnerId, RTCRtpSender>
  },
};
window.shareScreen = shareScreen;
const svg = {
  checkmark:
    '<svg height="15" viewBox="0 0 10 15" width="10" xmlns="http://www.w3.org/2000/svg">'
      +'<path d="M1 8 L4 11 L9 1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>'
    +'</svg>',
  copy:
    '<svg fill="none" height="15" viewBox="0 0 14 15" width="14" xmlns="http://www.w3.org/2000/svg">'
      +'<path d="M9.39556 1.8999V6.0999H13.5008L9.39556 1.8999ZM9.39556 1.8999H3.92188V14.4999H13.5008V6.0999" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/>'
      +'<path d="M10.0789 2.6V0.5H0.5V13.1H3.92105" stroke="currentColor"/>'
    +'</svg>',
  grabbing:
    '<svg height="20" viewBox="0 0 36 36" width="20" xmlns="http://www.w3.org/2000/svg">'
      +'<path d="M28.09,9.74a4,4,0,0,0-1.16.19c-.19-1.24-1.55-2.18-3.27-2.18A4,4,0,0,0,22.13,8,3.37,3.37,0,0,0,19,6.3a3.45,3.45,0,0,0-2.87,1.32,3.65,3.65,0,0,0-1.89-.51A3.05,3.05,0,0,0,11,9.89v.91c-1.06.4-4.11,1.8-4.91,4.84s.34,8,2.69,11.78a25.21,25.21,0,0,0,5.9,6.41.9.9,0,0,0,.53.17H25.55a.92.92,0,0,0,.55-.19,13.13,13.13,0,0,0,3.75-6.13A25.8,25.8,0,0,0,31.41,18v-5.5A3.08,3.08,0,0,0,28.09,9.74Z" fill="#fff" stroke="#000" stroke-linejoin="round" stroke-width="1.5"/>'
    +'</svg>',
  layerDown:
    '<svg fill="none" height="15" viewBox="0 0 14 15" width="14" xmlns="http://www.w3.org/2000/svg">'
      +'<path d="M10.0789 2.5V0.5H0.5V12.5H3.92105" stroke="currentColor"/>'
      +'<path d="M3.92188 2.5V14.5H13.5008V4.5V2.5H3.92188Z" stroke="currentColor"/>'
      +'<path d="M2.65865 6.27091L2.26389 6.65554L1.86914 6.27091L2.26389 5.88628L2.65865 6.27091ZM12.1492 10.6225C12.1492 10.923 11.8993 11.1665 11.591 11.1665C11.2826 11.1665 11.0327 10.923 11.0327 10.6225H12.1492ZM5.05524 9.37532L2.26389 6.65554L3.05341 5.88628L5.84475 8.60606L5.05524 9.37532ZM2.26389 5.88628L5.05524 3.1665L5.84475 3.93578L3.05341 6.65554L2.26389 5.88628ZM2.65865 5.72696H8.24134V6.81487H2.65865V5.72696ZM12.1492 9.53464V10.6225H11.0327V9.53464H12.1492ZM8.24134 5.72696C10.3996 5.72696 12.1492 7.43171 12.1492 9.53464H11.0327C11.0327 8.03256 9.78295 6.81487 8.24134 6.81487V5.72696Z" stroke="currentColor"/>'
    +'</svg>',
  layerUp:
    '<svg fill="none" height="15" viewBox="0 0 14 15" width="14" xmlns="http://www.w3.org/2000/svg">'
      +'<path d="M10.0789 2.5V0.5H0.5V12.5H3.92105" stroke="currentColor"/>'
      +'<path d="M3.92188 2.5V14.5H13.5008V4.5V2.5H3.92188Z" stroke="currentColor"/>'
      +'<path d="M11.3589 6.27091L11.7537 6.65554L12.1484 6.27091L11.7537 5.88628L11.3589 6.27091ZM1.86835 10.6225C1.86835 10.923 2.11829 11.1665 2.42662 11.1665C2.73495 11.1665 2.98489 10.923 2.98489 10.6225H1.86835ZM8.96234 9.37532L11.7537 6.65554L10.9642 5.88628L8.17282 8.60606L8.96234 9.37532ZM11.7537 5.88628L8.96234 3.1665L8.17282 3.93578L10.9642 6.65554L11.7537 5.88628ZM11.3589 5.72696H5.77624V6.81487H11.3589V5.72696ZM1.86835 9.53464V10.6225H2.98489V9.53464H1.86835ZM5.77624 5.72696C3.61797 5.72696 1.86835 7.43171 1.86835 9.53464H2.98489C2.98489 8.03256 4.23463 6.81487 5.77624 6.81487V5.72696Z" stroke="currentColor"/>'
    +'</svg>',
  lock:
    '<svg fill="none" height="15" viewBox="0 0 10 15" width="10" xmlns="http://www.w3.org/2000/svg">'
      +'<path d="M4.99902 0.5C5.48406 0.5 5.95307 0.592103 6.39453 0.773438C6.82106 0.948711 7.20335 1.19903 7.53125 1.51758C7.85906 1.83607 8.11509 2.20549 8.29395 2.61621C8.47904 3.04138 8.57324 3.49247 8.57324 3.95801V6.20996H7.94531V3.97949C7.94531 3.12763 7.68748 2.38641 7.15137 1.85938C6.61607 1.33336 5.86435 1.07998 4.99512 1.08105C4.13 1.08218 3.38032 1.32762 2.8457 1.84766C2.3091 2.3698 2.05273 3.10655 2.05273 3.95801V4.71875C2.04553 4.72508 2.0361 4.73558 2.01953 4.74609C1.98618 4.76721 1.94167 4.78729 1.8916 4.80176C1.84127 4.81627 1.79385 4.82227 1.75781 4.82227C1.72126 4.82222 1.67063 4.81642 1.61426 4.80078C1.55808 4.78518 1.50657 4.76299 1.4668 4.73926C1.44701 4.72742 1.43499 4.71487 1.42578 4.70703V3.95801C1.42578 3.49249 1.51999 3.04139 1.70508 2.61621C1.88392 2.20557 2.14 1.83604 2.46777 1.51758L2.4668 1.5166C2.79466 1.19816 3.17709 0.94867 3.60352 0.773438C4.04502 0.592019 4.51392 0.500031 4.99902 0.5Z" stroke="currentColor"/>'
      +'<path d="M9.5 7.00195V14.5H0.5V7.00195H9.5Z" stroke="currentColor"/>'
      +'<path d="M4.99902 9.87061C5.04662 9.87062 5.08266 9.88853 5.10645 9.91162C5.12973 9.93424 5.13672 9.95632 5.13672 9.97607C5.13669 9.99157 5.13283 10.005 5.12402 10.019C5.11414 10.0348 5.09751 10.0518 5.07422 10.064L4.99902 10.103L4.92383 10.064C4.90054 10.0518 4.8839 10.0347 4.87402 10.019C4.8652 10.005 4.86136 9.99159 4.86133 9.97607C4.86133 9.95632 4.86832 9.93424 4.8916 9.91162C4.9154 9.88855 4.95144 9.87061 4.99902 9.87061Z" stroke="currentColor" stroke-width="2"/>'
    +'</svg>',
  pause:
    '<svg fill="none" height="16" viewBox="0 0 8 16" width="8" xmlns="http://www.w3.org/2000/svg">'
      +'<path d="M1 1V14.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
      +'<path d="M7 1V14.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
    +'</svg>',
  recycleBin:
    '<svg class="svgFill" height="14" viewBox="0 0 12 14" width="12" xmlns="http://www.w3.org/2000/svg">'
      +'<path d="M11.9541 2.86536L11.5255 1.99044C11.4899 1.9183 11.4354 1.85763 11.368 1.81516C11.3007 1.77269 11.2231 1.75008 11.144 1.74984H8.14332V0.874919C8.14332 0.642876 8.05299 0.420337 7.89221 0.256258C7.73143 0.0921787 7.51337 0 7.28599 0L4.71401 0C4.48663 0 4.26857 0.0921787 4.10779 0.256258C3.94701 0.420337 3.85668 0.642876 3.85668 0.874919V1.74984H0.856031C0.776871 1.75008 0.699323 1.77269 0.631983 1.81516C0.564643 1.85763 0.510142 1.9183 0.47452 1.99044L0.0458558 2.86536C0.012973 2.93196 -0.0026826 3.00602 0.000375652 3.08053C0.0034339 3.15503 0.0251045 3.22751 0.0633295 3.29106C0.101555 3.35461 0.155065 3.40714 0.218779 3.44365C0.282493 3.48017 0.354295 3.49945 0.427367 3.49968H1.2847V13.1238C1.27172 13.3482 1.34386 13.569 1.48617 13.7406C1.57141 13.8285 1.67393 13.8969 1.78698 13.9414C1.90003 13.9859 2.02104 14.0054 2.14202 13.9987H9.85798C10.0854 13.9987 10.3034 13.9065 10.4642 13.7425C10.625 13.5784 10.7153 13.3558 10.7153 13.1238V3.49968H11.5726C11.6457 3.49945 11.7175 3.48017 11.7812 3.44365C11.8449 3.40714 11.8984 3.35461 11.9367 3.29106C11.9749 3.22751 11.9966 3.15503 11.9996 3.08053C12.0027 3.00602 11.987 2.93196 11.9541 2.86536ZM4.71401 0.874919H7.28599V1.74984H4.71401V0.874919ZM9.85798 13.1238H2.14202V3.49968H9.85798V13.1238Z"/>'
      +'<path d="M6.42862 11.3739V4.37451C6.20124 4.37451 5.98318 4.46669 5.82239 4.63077C5.66161 4.79485 5.57129 5.01739 5.57129 5.24943L5.59701 11.3739H5.57129V12.2488C5.79867 12.2488 6.01673 12.1566 6.17751 11.9925C6.33829 11.8284 6.42862 11.6059 6.42862 11.3739Z"/>'
      +'<path d="M8.57217 11.3739V4.37451C8.34479 4.37451 8.12673 4.46669 7.96595 4.63077C7.80517 4.79485 7.71484 5.01739 7.71484 5.24943L7.74056 11.3739H7.71484V12.2488C7.94222 12.2488 8.16029 12.1566 8.32107 11.9925C8.48185 11.8284 8.57217 11.6059 8.57217 11.3739Z"/>'
      +'<path d="M4.28506 11.3739V4.37451C4.05768 4.37451 3.83962 4.46669 3.67884 4.63077C3.51806 4.79485 3.42773 5.01739 3.42773 5.24943L3.45345 11.3739H3.42773V12.2488C3.65511 12.2488 3.87318 12.1566 4.03396 11.9925C4.19474 11.8284 4.28506 11.6059 4.28506 11.3739Z"/>'
    +'</svg>',
  stop:
    '<svg fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">'
      +'<rect fill="currentColor" height="14" rx="2" width="14"/>'
    +'</svg>',
};
let userId = null;
const userLanguage = navigator.language?.toLowerCase().startsWith('de-') ? 'de' : 'en';
const video = {
  local: {
    frameRate: 30,
    marginBottom: 5,
    playing: false,
    transitionDuration: .2,
  },
  recording: {
    cache: {
      name: 'video-cache',
    },
    collectInterval: 1E3, // Collect data every 1 second for efficiency
    current: null,
    currentName: '',
    frameRate: 24,
    maxSize: 1536,
    media: [],
    mediaRecorder: null,
    mimeType: null,
    startName: null,
    stream: null,
    type: 'webm',
  },
  remote: {
    dimensions: new Map(), // Map<partnerId, {height, width}>
  },
};
const videoLocal = document.getElementById('videoLocal');
const videoOthersOuter = document.getElementById('videoOthersOuter');
let videoRemote = document.getElementById('videoRemote');
const videoRemoteOuter = document.getElementById('videoRemoteOuter');
const wbDefault = {
  camera: {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
  },
  contextMenu: {
    copyDiff: 10,
    id: 'wbContextMenu',
  },
  control: {
    grab: document.getElementById('wbControlGrab'),
  },
  controlOld: {
    back: document.getElementById('wbControlOldBack'),
    forward: document.getElementById('wbControlOldForward'),
    'this': document.getElementById('wbControlOld'),
  },
  ctx: document.getElementById('whiteboard')?.getContext('2d'),
  draggingOffset: {x: 0, y: 0},
  dragStart: null,
  draw: {
    color: '#000000',
    colorIndex: 20,
    colorMax: 25,
    colorPassive: '',
    width: 5,
    widthMax: 20,
    widthMin: 1,
    widthPassive: '',
  },
  element: {
    counter: 0,
    index: new Map(), // Map<stackId, Map<elementId, index>>
    missing: {
      interval: 2E4,
      partnerIds: new Map(), // Map<stackId, partnerIds[]>
      timeout: new Map(), // Map<stackId, timeout>
    },
  },
  elements: [],
  hide: false,
  images: {
    defaultLeft: 50,
    defaultSize: 250,
    defaultTop: 50,
    img: new Map(), // Map<elementId, Image>
    minSize: 30,
    offsetX: 0,
    offsetY: 0,
    resizeCorner: null,
  },
  inner: document.getElementById('wbInner'),
  isHover: false,
  isPanning: false,
  isTextDragged: false, // Detect whether text field was dragged
  lineHeightMultiplier: 1.2, // Multiplier for line height in multi-line text
  lines: {
    current: [],
    currentPassive: new Map(), // Map<partnerId, positions[]>
    points: new Map(), // Map<elementId, points[]>
    pointsReferences: new Map(), // Map<elementId, elementId>
  },
  mode: 'default', // 'default', 'edit', 'grab', 'imageDragging', 'imageResizing', 'lineDragging', 'lineDrawing', 'textAdd', 'textDragging', 'textResizing'
  outer: document.getElementById('wbOuter'),
  partnerCursor: document.getElementById('wbPartnerCursor'),
  partnerCursorOffSent: true,
  placeHolderSrc: 'data:image/gif;base64,R0lGODdhAQABAIABANPj/f///ywAAAAAAQABAAACAkQBADs=',
  pointerDown: {
    duration: 500,
    timeout: null,
  },
  selected: null,
  stack: {
    byId: new Map(), // Map<stackId, stack>
    changed: wbStartTimeDifferenceGet(),
    changedPartner: new Map(), // Map<partnerId, timestamp>
    counter: 0,
    deleted: [],
    missing: {
      interval: 1E4,
      partnerIds: new Map(), // Map<stackId, partnerIds[]>
      timeout: new Map(), // Map<stackId, timeout>
    },
    redo: [],
    undo: [],
  },
  stateSend: {
    delay: 5E3,
    deletedElements: [],
    timeout: null,
  },
  text: {
    color: '#000000',
    colorIndex: 20,
    colorMax: 25,
    family: 'Arial',
    size: {
      current: parseInt(nav.text.sizeCurrent.textContent, 10),
      max: 50,
      min: 8,
    },
  },
  textInitialX: null, // Detect whether mouse was moved when releasing mouse button
  textInitialY: null, // Detect whether mouse was moved when releasing mouse button
  textOffsetX: 0, // Offset for dragging text fields
  textOffsetY: 0, // Offset for dragging text fields
  textPadding: 5, // Padding inside text area when drawing on canvas
  textResizeCorner: null, // Corner being dragged for resizing
  texts: [],
  whiteboard: document.getElementById('whiteboard'),
};
let wb = {...wbDefault};
const whiteboard = {
  recording: {
    cache: {
      name: 'whiteboard-cache',
    },
    currentName: '',
    media: [],
    startName: null,
    type: 'png',
  },
};
let ws = null;
let wsAbort = null;
// Function declarations
async function cacheDelete(media, url) {
  const cache = await caches.open(media.recording.cache.name);
  return await cache.delete(url);
}
async function cacheLoad(cacheName) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (!keys.length) {
    return [];
  }
  const entries = await Promise.all(
    keys.map(async (request) => {
      const response = await cache.match(request);
      if (!response) {
        return null;
      }
      return {
        headers: Object.fromEntries(response.headers.entries()),
        url: request.url,
      };
    })
  );
  return entries.filter(v => null !== v);
}
async function cacheSave(blob, createdAt, options, type) {
  if (!['audio', 'video', 'whiteboard'].includes(type)) {
    return;
  }
  try {
    const cache = await caches.open(type + '-cache');
    const headers = {
      'Content-Type': blob.type,
      'Content-Length': blob.size,
      name: options.name,
    };
    if (['whiteboard', 'video'].includes(type)) {
      headers.height = options.height;
      headers.thumbnail = options.thumbnail;
      headers.width = options.width;
    }
    const response = new Response(blob, {headers});
    const fileExt = blob.type.split('/')[1] || ('audio' === type ? audio : 'video' === type ? video : whiteboard).recording.type;
    const url = `/${type}-${createdAt}-${crypto.randomUUID().slice(0,8)}.${fileExt}`;
    await cache.put(url, response);
    return true;
  } catch (error) {
    console.error(`Failed to save ${type} to cache:`, error);
    return false;
  }
}
function chatAllOnTransitionEnd(event) {
  chatOldTextareaResize();
  uiTextareaRowsSet(chat.new);
}
function chatClose() {
  if (document.getElementById('chatAll')?.classList.contains('chatAllExpanded')) {
    document.getElementById('chatAll')?.classList.remove('chatAllExpanded');
    chatResize();
  }
}
function chatNewOnFocus(event) {
  if (!document.getElementById('chatAll')?.classList.contains('chatAllExpanded')) {
    document.getElementById('chatAll')?.classList.add('chatAllExpanded');
    chatResize();
  }
}
function chatNewOnInput(event) {
  uiTextareaRowsSet(this);
}
function chatNewOnKeyDown(event) {
  'Enter' === event.key && !event.shiftKey && chatSendMessage();
}
function chatOldTextareaResize() {
  if (!chat.oldOuter) {
    return;
  }
  for (let i = 0, textareas = chat.oldOuter.getElementsByTagName('textarea'); i < textareas.length; ++i) {
    uiTextareaRowsSet(textareas[i]);
  }
  if (0 <= chat.scrollLastElementIndex) {
    if (chat.old) {
      const lastElement = chat.old.getElementsByTagName('textarea')[chat.scrollLastElementIndex];
      // Scroll to element that was last visible element before resizing. Align its bottom to bottom of chat.old.
      lastElement && chat.old.scrollTo(0, lastElement.offsetTop + lastElement.offsetHeight - chat.old.offsetHeight - 1.5);
    }
  }
}
function chatResize() {
  chat.scrollLastElementIndex = -1;
  if (chat.old) {
    const index = generalLastVisibleElementIndexGet(chat.old.id);
    0 <= index && (chat.scrollLastElementIndex = index);
  }
}
function chatSendMessage() {
  document.activeElement?.blur();
  if (!chat.new || !chat.old) {
    return;
  }
  const message = chat.new.value.trimEnd();
  chat.new.value = '';
  if ('' === message) {
    return;
  }
  chat.new.dispatchEvent(new Event('input'));
  const createdOn = wbStartTimeDifferenceGet();
  const textarea = document.createElement('textarea');
  textarea.classList.add('chatOldOwn');
  textarea.disabled = 'disabled';
  textarea.name = 'chatOldOwn';
  textarea.rows = '1';
  textarea.setAttribute('data-created-on', createdOn);
  textarea.textContent = message;
  chat.old.appendChild(textarea);
  uiTextareaRowsSet(textarea);
  chat.old.scrollTop = chat.old.scrollHeight; // Scroll to bottom
  dataChannelSendLargeMessage({
    area: 'chat',
    createdOn,
    message,
  });
}
function dataChannelCreateInitiator(partnerId) {
  const pc = rtc.peerConnections.get(partnerId);
  if (!pc) {
    console.warn(`No PeerConnection for ${partnerId}`);
    return;
  }
  const channel = pc.createDataChannel('chat');
  dataChannelInitialize(channel, partnerId);
}
function dataChannelInitialize(channel, partnerId) {
  channel.bufferedAmountLowThreshold = dataChannel.send.bufferedAmountLowThreshold;
  dataChannels.set(partnerId, channel);
  channel._onBufferedLow = (event) => dataChannelOnBufferedAmountLow(event, partnerId);
  channel._onClose = (event) => dataChannelOnClose(event, partnerId);
  channel._onError = (event) => dataChannelOnError(event, partnerId);
  channel._onMessage = (event) => dataChannelOnMessage(event, partnerId);
  channel._onOpen = (event) => dataChannelOnOpen(event, partnerId);
  dataChannel.receive.largeMessageCounter.set(partnerId, 0);
  dataChannel.send.chunks.set(partnerId, []);
  channel.addEventListener('bufferedamountlow', channel._onBufferedLow);
  channel.addEventListener('close', channel._onClose, {once: true});
  channel.addEventListener('error', channel._onError);
  channel.addEventListener('message', channel._onMessage);
  channel.addEventListener('open', channel._onOpen, {once: true});
}
function dataChannelOnBufferedAmountLow(event, partnerId) {
  dataChannelSendQueue(partnerId);
}
function dataChannelOnClose(event, partnerId) {
  const channel = dataChannels.get(partnerId);
  if (channel) {
    if (channel._onBufferedLow) {
      channel.removeEventListener('bufferedamountlow', channel._onBufferedLow);
      delete channel._onBufferedLow;
    }
    if (channel._onClose) {
      channel.removeEventListener('close', channel._onClose);
      delete channel._onClose;
    }
    if (channel._onError) {
      channel.removeEventListener('error', channel._onError);
      delete channel._onError;
    }
    if (channel._onMessage) {
      channel.removeEventListener('message', channel._onMessage);
      delete channel._onMessage;
    }
    if (channel._onOpen) {
      channel.removeEventListener('open', channel._onOpen);
      delete channel._onOpen;
    }
  }
  dataChannel.receive.chunks.delete(partnerId);
  const incomingIds = dataChannel.receive.incomingIdsByPartnerId.get(partnerId);
  if (incomingIds) {
    for (const value of incomingIds) {
      dataChannel.receive.partnerIdByIncomingId.delete(value);
    }
    dataChannel.receive.incomingIdsByPartnerId.delete(partnerId);
  }
  dataChannel.receive.largeMessageCounter.delete(partnerId);
  dataChannel.send.chunks.delete(partnerId);
  dataChannel.send.largeMessageCounter = 0;
  dataChannels.delete(partnerId);
  wb.partnerCursorOffSent = false;
}
function dataChannelOnError(event, partnerId) {
  12 !== event.error?.sctpCauseCode && console.log(`partnerId: ${partnerId}`, event);
}
async function dataChannelOnMessage(event, partnerId) {
  let news;
  try {
    news = JSON.parse(event.data);
  } catch (error) {
    return console.error('Invalid JSON', error);
  }
  if (!isString(news.area)) {
    return;
  }
  if ('chunk' === news.area) {
    if (!isString(news.chunk)
    || !isInt(news.index)
    || !isInt(news.largeMessageCounter)
    || !isInt(news.total)
    || news.index >= news.total) {
      return;
    }
    if (dataChannel.receive.largeMessageCounter.get(partnerId) !== news.largeMessageCounter) {
      dataChannel.receive.chunks.delete(partnerId);
      dataChannel.receive.largeMessageCounter.set(partnerId, news.largeMessageCounter)
    }
    const chunks = dataChannel.receive.chunks.get(partnerId) || [];
    chunks[news.index] = news.chunk;
    dataChannel.receive.chunks.set(partnerId, chunks);
    const chunksClean = dataChannel.receive.chunks.get(partnerId).filter(Boolean);
    if (chunksClean.length !== news.total) {
      return;
    }
    const completeData = chunksClean.join('');
    dataChannel.receive.chunks.delete(partnerId);
    if (!isJsonString(completeData)) {
      return;
    }
    try {
      news = JSON.parse(completeData);
    } catch (error) {
      return console.error('Invalid JSON', error);
    }
    //console.log(news);
    if (!isString(news.area)) {
      return;
    }
    if ('chat' === news.area) {
      if (!isInt(news.createdOn) || 0 > news.createdOn
      || !isString(news.message) || '' === news.message) {
        return;
      }
      if (!chat.old) {
        return;
      }
      const textarea = document.createElement('textarea');
      textarea.classList.add(chat.old.id, 'chatOldPartner');
      textarea.setAttribute('data-created-on', news.createdOn);
      textarea.disabled = 'disabled';
      textarea.name = 'chat';
      textarea.rows = '1';
      textarea.value = news.message;
      const textareas = chat.old.getElementsByTagName('textarea');
      if (textareas.length) {
        let inserted = false;
        for (let i = textareas.length - 1; 0 <= i; --i) {
          const createdOn = parseInt(textareas[i].getAttribute('data-created-on'), 10);
          if (createdOn > news.createdOn
          || (createdOn === news.createdOn && !isAlphaUser(partnerId))) {
            chat.old.insertBefore(textarea, textareas[i]);
            inserted = true;
            break;
          }
        }
        !inserted && chat.old.appendChild(textarea);
      } else {
        chat.old.appendChild(textarea);
      }
      uiTextareaRowsSet(textarea);
    } else if ('whiteboard' === news.area) {
      if ('elementsProperty' === news.command) {
        if (!isArray(news.ids) || !news.ids.length) {
          return;
        }
        if (('image' === news.type && !isString(news.src))
        || ('line' === news.type && !isArray(news.points))) {
          return;
        }
        let redraw = false;
        // Common cleanup
        for (const id of news.ids) {
          wb.element.missing.timeout.delete(id);
          // Only continue if element is expected
          if (wb.element.missing.partnerIds.has(id)) {
            wb.element.missing.partnerIds.delete(id);
            redraw = true;
          }
        }
        // Already received meta data of an image
        if ('image' === news.type && 1 === news.ids.length) {
          const incomingIds = dataChannel.receive.incomingIdsByPartnerId.get(partnerId);
          incomingIds && incomingIds.has(news.ids[0]) && (redraw = true);
        }
        // No expected element received
        if (!redraw) {
          return;
        }
        // Type-specific processing
        if ('image' === news.type) {
          if (!isString(news.src)) {
            return;
          }
          let loadedCount = 0;
          const total = news.ids.length;
          for (const id of news.ids) {
            const img = new Image();
            img.onerror = () => {
              console.error(`Failed to load image: ${id}`);
              if (1 === news.ids.length) {
                const incomingIds = dataChannel.receive.incomingIdsByPartnerId.get(partnerId);
                if (incomingIds && incomingIds.has(news.ids[0])) {
                  incomingIds.delete(news.ids[0]);
                  if (incomingIds.size) {
                    dataChannel.receive.incomingIdsByPartnerId.set(partnerId, incomingIds);
                  } else {
                    dataChannel.receive.incomingIdsByPartnerId.delete(partnerId);
                  }
                  dataChannel.receive.partnerIdByIncomingId.delete(news.ids[0]);
                }
              }
              ++loadedCount >= total && wbDrawCheck(news.ids);
            };
            img.onload = () => {
              if (1 === news.ids.length) {
                const incomingIds = dataChannel.receive.incomingIdsByPartnerId.get(partnerId);
                if (incomingIds && incomingIds.has(news.ids[0])) {
                  incomingIds.delete(news.ids[0]);
                  if (incomingIds.size) {
                    dataChannel.receive.incomingIdsByPartnerId.set(partnerId, incomingIds);
                  } else {
                    dataChannel.receive.incomingIdsByPartnerId.delete(partnerId);
                  }
                  dataChannel.receive.partnerIdByIncomingId.delete(news.ids[0]);
                }
              }
              wb.images.img.set(id, img);
              ++loadedCount >= total && wbDrawCheck(news.ids);
            };
            img.src = news.src; // same src for all IDs in this batch
          }
        } else if ('line' === news.type) {
          if (!isArray(news.points)) {
            return;
          }
          for (const id of news.ids) {
            wbLinePointsSave(id, news.points);
          }
          wbDrawCheck(news.ids);
        }
      } else if ('elementsPropertyMissing' === news.command) {
        if (!isArray(news.ids) || !news.ids.length
        || !userId) {
          return;
        }
        const requestedIds = new Set(news.ids);
        // Fast lookup: element.id -> {element}
        const elementIndex = wbElementsGet(requestedIds);
        // Group by shared resource
        const imagesBySrc = new Map(); // Map<src, Set<id>>
        const linesByRef = new Map(); // Map<reference, Set<id>>
        // Collect minimal data
        for (const id of requestedIds) {
          const info = elementIndex.get(id);
          if (!info) {
            continue;
          }
          const element = info.element;
          if ('image' === element.type) {
            const img = wb.images.img.get(id);
            if (isString(img?.src)) {
              !imagesBySrc.has(img.src) && imagesBySrc.set(img.src, new Set());
              imagesBySrc.get(img.src).add(id);
            }
          } else if ('line' === element.type) {
            const ref = wb.lines.pointsReferences.get(id);
            if (isString(ref)) {
              const points = wb.lines.points.get(ref);
              if (isArray(points)) {
                !linesByRef.has(ref) && linesByRef.set(ref, new Set());
                linesByRef.get(ref).add(id);
              }
            }
          }
        }
        // Send grouped responses
        const sent = new Set();
        // Lines grouped by points reference
        for (const [ref, idSet] of linesByRef) {
          const ids = [...idSet];
          for (const id of ids) {
            sent.add(id);
          }
          const points = wb.lines.points.get(ref);
          if (isArray(points)) {
            dataChannelSendLargeMessage({
              area: 'whiteboard',
              command: 'elementsProperty',
              type: 'line',
              ids,
              points,
            }, {partnerId});
          }
        }
        // Images grouped by src
        for (const [src, idSet] of imagesBySrc) {
          const ids = [...idSet];
          for (const id of ids) {
            sent.add(id);
          }
          dataChannelSendLargeMessage({
            area: 'whiteboard',
            command: 'elementsProperty',
            type: 'image',
            ids,
            src,
          }, {partnerId});
        }
        // Remaining ids
        const missing = news.ids.filter(id => !sent.has(id));
        if (missing.length) {
          dataChannelSendLargeMessage({
            area: 'whiteboard',
            command: 'elementsProperty',
            type: null,
            ids: missing,
          }, {partnerId});
        }
      } else if ('stacks' === news.command) {
        if (!isArray(news.stacks) || !news.stacks.length) {
          return;
        }
        const elementsMissing = new Map(); // Map<partnerId, elementIds[]>
        let stackChanged = false;
        const isAlpha = !isAlphaUser(partnerId);
        // Fast lookup for current stack entries
        const redoById = new Map(wb.stack.redo.filter(item => item?.id).map(item => [item.id, item]));
        const undoById = new Map(wb.stack.undo.slice(1).filter(item => item?.id).map(item => [item.id, item]));
        let undoLowestIndex = wb.stack.undo.length;
        for (const received of [...news.stacks]) {
          const {id, elementDeletedId, elements, modified} = received;
          if (!isString(id) || !wb.stack.missing.partnerIds.get(id)?.includes(partnerId)) {
            continue;
          }
          // Cleanup tracking
          wb.stack.missing.partnerIds.delete(id);
          wb.stack.missing.timeout.delete(id);
          // Skip invalid or deleted stacks
          if (!isArray(elements)
          || !isInt(modified) || 0 > modified
          || wb.stack.deleted.includes(id)) {
            continue;
          }
          wbElementsValid(elements, partnerId, elementsMissing);
          // Update undo
          const undoEntry = undoById.get(id);
          if (undoEntry) {
            elementDeletedId && (undoEntry.elementDeletedId = elementDeletedId);
            undoEntry.elements = elements;
            wbElementIndexCreate(elements, id);
            undoEntry.modified = modified;
            stackChanged = true;
            const index = wb.stack.undo.findIndex((item, idx) => idx > 0 && item?.id === id);
            isInt(index) && index < undoLowestIndex && (undoLowestIndex = index);
            continue;
          }
          // Update redo 
          const redoEntry = redoById.get(id);
          if (redoEntry) {
            elementDeletedId && (redoEntry.elementDeletedId = elementDeletedId);
            redoEntry.elements = elements;
            wbElementIndexCreate(elements, id);
            redoEntry.modified = modified;
            stackChanged = true;
          }
        }
        wbElementsPlausibility(undoLowestIndex);
        if (stackChanged) {
          wbStateLoad(wbStackCurrentGet()?.elements);
          wbStackUndoChanged({noStateSend: true});
        }
        // Request missing element properties from relevant partners
        for (const [targetPartner, ids] of elementsMissing) {
          if (ids?.length) {
            dataChannelSendLargeMessage({
              area: 'whiteboard',
              command: 'elementsPropertyMissing',
              ids,
            }, {partnerId: targetPartner});
          }
        }
      } else if ('stacksMissing' === news.command) {
        if (!isArray(news.ids)
        || !userId) {
          return;
        }
        // Collect requested stacks in original requested order
        const foundStacks = [];
        for (const id of news.ids) {
          foundStacks.push(wb.stack.byId.get(id) ?? {id});
        }
        // Transform to minimal format
        const stacks = foundStacks.map(entry => {
          const value = {id: entry.id};
          if (isArray(entry.elements)) {
            isString(entry.elementDeletedId) && (value.elementDeletedId = entry.elementDeletedId);
            value.elements = wbElementsGetMinimal(entry.elements.map(element => {return 'image' === element.type ? wbImageMap(element) : 'text' === element.type ? wbTextMap(element) : {...element};}));
            value.modified = entry.modified;
          }
          return value;
        });
        dataChannelSendLargeMessage({
          area: 'whiteboard',
          command: 'stacks',
          stacks,
        }, {partnerId});
      } else if ('state' === news.command) {
        if (!isInt(news.stackChanged) || 0 >= news.stackChanged
        || !isArray(news.stackDeleted)
        || (!isUndefined(news.stackNew) && !isArray(news.stackNew.elements)) // optional
        || !isArray(news.stackRedo)
        || !isArray(news.stackUndo)) {
          return;
        }
        const stackChangedPartner = wb.stack.changedPartner.get(partnerId);
        if (stackChangedPartner && stackChangedPartner >= news.stackChanged) {
          return;
        }
        wb.stack.changedPartner.set(partnerId, news.stackChanged);
        for (let i = news.stackDeleted.length - 1; 0 <= i; --i) {
          isString(news.stackDeleted[i]) && !wb.stack.deleted.includes(news.stackDeleted[i]) && wb.stack.deleted.push(news.stackDeleted[i]);
        }
        if (news.stackNew) {
          for (let i = news.stackNew.elements.length - 1; 0 <= i; --i) {
            const element = news.stackNew.elements[i];
            if ('image' === element.type) {
              if (isString(element.idOld)) {
                const img = wb.images.img.get(element.idOld);
                img && wb.images.img.set(element.id, img);
                delete element.idOld;
              }
            } else if ('line' === element.type) {
              if (isString(element.idOld)) {
                const reference = wb.lines.pointsReferences.get(element.idOld);
                if (isString(reference)) {
                  const points = wb.lines.points.get(reference);
                  points && wb.lines.pointsReferences.set(element.id, reference);
                }
                delete element.idOld;
              } else if (isArray(element.points)) {
                wb.lines.pointsReferences.set(element.id, element.id);
                wb.lines.points.set(element.id, element.points);
                delete element.points;
              }
            }
          }
        }
        wbStateCompare(news, partnerId);
      }
    }
  } else if ('gallery' === news.area) {
    if ('videoSync' === news.command) {
      if (!isBoolean(news.muted)
      || !isNumber(news.playbackRate)
      || !isNumber(news.volume) || 0 > news.volume) {
        return;
      }
      const galleryVideo = document.getElementById('galleryVideo');
      if (!galleryVideo) {
        gallery.video.muted = news.muted,
        gallery.video.playbackRate = news.playbackRate;
        gallery.video.volume = news.volume;
        return;
      }
      if (galleryVideo.readyState) {
        galleryVideo.muted !== news.muted && (galleryVideo.muted = news.muted);
        galleryVideo.playbackRate !== news.playbackRate && (galleryVideo.playbackRate = news.playbackRate);
        galleryVideo.volume !== news.volume && (galleryVideo.volume = news.volume);
      } else {
        galleryVideo.addEventListener('loadedmetadata', () => {
          galleryVideo.muted !== news.muted && (galleryVideo.muted = news.muted);
          galleryVideo.playbackRate !== news.playbackRate && (galleryVideo.playbackRate = news.playbackRate);
          galleryVideo.volume !== news.volume && (galleryVideo.volume = news.volume);
        }, {once: true});
      }
    }
  } else if ('general' === news.area) {
    if ('showContent' === news.command) {
      ['video', 'whiteboard'].includes(news.showContent) && uiShowContent(news.showContent);
    }
  } else if ('video' === news.area) {
    if ('status' === news.command) {
      if ('off' === news.status) {
        if (!camera.remote.onLast.get(partnerId) || camera.remote.onLast.get(partnerId) < news.timestamp) {
          videoOthersOuter?.classList.add('none');
          videoRemoteOuter?.classList.add('none');
        }
      }
    }
  } else if ('whiteboard' === news.area) {
    if ('cursorPosition' === news.command) {
      if (!isNumber(news.x)
      || !isNumber(news.y)
      || !wb.whiteboard) {
        return;
      }
      wb.partnerCursor.style.left = (news.x  + wb.camera.x) + 'px';
      wb.partnerCursor.style.top = (news.y + wb.camera.y) + 'px';
      wb.partnerCursor.classList.remove('none');
    } else if ('cursorPositionOff' === news.command) {
      wb.partnerCursor.classList.add('none');
    } else if ('draw' === news.command) {
      if (!isString(news.fillStyle)
      || !isNumber(news.lineWidth) || 0 > news.lineWidth
      || !isString(news.strokeStyle)
      || !isNumber(news.x)
      || !isNumber(news.y)) {
        return;
      }
      const lineOld = wb.lines.currentPassive.get(partnerId) || [];
      const x = news.x + wb.camera.x;
      const y = news.y + wb.camera.y;
      wb.lines.currentPassive.set(partnerId, [...lineOld, {x, y}]);
      wb.ctx.lineCap = 'round'; // smooth line ends
      wb.ctx.lineJoin = 'round'; // smooth joints
      wb.ctx.lineWidth = wb.draw.widthPassive = news.lineWidth;
      wb.ctx.shadowBlur = 0;
      wb.ctx.strokeStyle = wb.draw.colorPassive = news.strokeStyle;
      wb.ctx.beginPath();
      const last = lineOld[lineOld.length - 2];
      if (last) {
        wb.ctx.moveTo(last.x, last.y);
        wb.ctx.lineTo(x, y);
        wb.ctx.stroke();
      }
    } else if ('drawStart' === news.command) {
      if (!isString(news.fillStyle)
      || !isNumber(news.lineWidth) || 0 > news.lineWidth
      || !isNumber(news.x)
      || !isNumber(news.y)) {
        return;
      }
      const x = news.x + wb.camera.x;
      const y = news.y + wb.camera.y;
      wb.lines.currentPassive.set(partnerId, [{x, y}]);
      wb.ctx.beginPath();
      wb.ctx.arc(x, y, news.lineWidth / 2, 0, Math.PI * 2);
      wb.ctx.fillStyle = wb.draw.colorPassive = news.fillStyle;
      wb.ctx.fill();
    } else if ('imageDragging' === news.command) {
      if (!isString(news.id)
      || !isNumber(news.x)
      || !isNumber(news.y)) {
        return;
      }
      for (let i = wb.elements.length - 1; 0 <= i; --i) {
        if ('image' === wb.elements[i]?.type && news.id === wb.elements[i].id) {
          const xOld = wb.elements[i].x;
          const yOld = wb.elements[i].y;
          wb.elements[i].x = news.x;
          wb.elements[i].y = news.y;
          wbDraw();
          // Reset to avoid accidental saving
          wb.elements[i].x = xOld;
          wb.elements[i].y = yOld;
          break;
        }
      }
    } else if ('imageResizing' === news.command) {
      if (!isNumber(news.height) || 0 > news.height
      || !isString(news.id)
      || !isNumber(news.width) || 0 > news.width
      || !isNumber(news.x)
      || !isNumber(news.y)) {
        return;
      }
      for (let i = wb.elements.length - 1; 0 <= i; --i) {
        if ('image' === wb.elements[i]?.type && news.id === wb.elements[i].id) {
          const heightOld = wb.elements[i].height;
          const widthOld = wb.elements[i].width;
          const xOld = wb.elements[i].x;
          const yOld = wb.elements[i].y;
          wb.elements[i].height = news.height;
          wb.elements[i].width = news.width;
          wb.elements[i].x = news.x;
          wb.elements[i].y = news.y;
          wbDraw();
          // Reset to avoid accidental saving
          wb.elements[i].height = heightOld;
          wb.elements[i].width = widthOld;
          wb.elements[i].x = xOld;
          wb.elements[i].y = yOld;
          break;
        }
      }
    } else if ('lineDragging' === news.command) {
      if (!isString(news.id)
      || !isNumber(news.dx)
      || !isNumber(news.dy)) {
        return;
      }
      for (let i = wb.elements.length - 1; 0 <= i; --i) {
        if ('line' === wb.elements[i]?.type && news.id === wb.elements[i].id) {
          const dxOld = wb.elements[i].dx;
          const dyOld = wb.elements[i].dy;
          wb.elements[i].dx = news.dx;
          wb.elements[i].dy = news.dy;
          wbDraw();
          // Reset to avoid accidental saving
          wb.elements[i].dx = dxOld;
          wb.elements[i].dy = dyOld;
          break;
        }
      }
    } else if ('textDragging' === news.command) {
      if (!isString(news.id)
      || !isNumber(news.x)
      || !isNumber(news.y)) {
        return;
      }
      for (let i = wb.elements.length - 1; 0 <= i; --i) {
        if ('text' === wb.elements[i]?.type && news.id === wb.elements[i].id) {
          const xOld = wb.elements[i].x;
          const yOld = wb.elements[i].y;
          wb.elements[i].x = news.x;
          wb.elements[i].y = news.y;
          wbDraw();
          // Reset to avoid accidental saving
          wb.elements[i].x = xOld;
          wb.elements[i].y = yOld;
          break;
        }
      }
    }
  }
}
function dataChannelOnOpen(event, partnerId) {
  //console.log(`[DATACHANNEL] Data channel opened for partner ${partnerId}.`);
  dataChannelSendQueue(partnerId);
  if (isInitiator) {
    uiShowContentSend();
    galleryVideoSyncSend();
  }
}
function dataChannelSend(message, params) {
  if (!isJsonPlain(message)) {
    return;
  }
  const messageStringified = JSON.stringify(message);
  if (params?.partnerId) {
    dataChannelSendPush(messageStringified, params);
    return;
  }
  for (const [partnerId] of dataChannels) {
    dataChannelSendPush(messageStringified, {partnerId});
  }
}
function dataChannelSendLargeMessage(message, params) {
  const messageStringified = JSON.stringify(message);
  const totalChunks = Math.ceil(messageStringified.length / dataChannel.send.chunkSize);
  for (let i = 0; i < totalChunks; ++i) {
    dataChannelSend({
      area: 'chunk',
      chunk: messageStringified.slice(i * dataChannel.send.chunkSize, (i + 1) * dataChannel.send.chunkSize),
      index: i,
      largeMessageCounter: dataChannel.send.largeMessageCounter,
      total: totalChunks,
    }, params);
  }
  dataChannel.send.largeMessageCounter + 1 < Number.MAX_SAFE_INTEGER ? ++dataChannel.send.largeMessageCounter : dataChannel.send.largeMessageCounter = 0;
}
function dataChannelSendPush(messageStringified, params) {
  const channel = dataChannels.get(params.partnerId);
  if (!channel || 'open' !== channel.readyState) {
    //console.warn(`Cannot send queue - channel not open for ${params.partnerId}`);
    return;
  }
  const chunks = dataChannel.send.chunks.get(params.partnerId);
  // abort if queue is not an array
  if (!isArray(chunks)) {
    return;
  }
  // avoid queueing the same message twice
  if (chunks.includes(messageStringified)) {
    return;
  }
  chunks.push(messageStringified);
  dataChannelSendQueue(params.partnerId);
}
function dataChannelSendQueue(partnerId) {
  const channel = dataChannels.get(partnerId);
  if (!channel || 'open' !== channel.readyState) {
    dataChannel.send.chunks.delete(partnerId);
    //console.warn(`Cannot send queue - channel not open for ${params.partnerId}`);
    return;
  }
  const chunks = dataChannel.send.chunks.get(partnerId);
  if (!isArray(chunks) || !chunks.length) {
    return;
  }
  while (chunks.length) {
    // Check buffer
    if (channel.bufferedAmount > dataChannel.send.bufferedAmountLowThreshold) {
      // Buffer is too full -> wait for low event
      return;
    }
    const message = chunks.shift();
    try {
      channel.send(message);
    } catch (error) {
      //console.warn(`[DataChannel ${partnerId}] Send failed:`, error);
      dataChannel.send.maxMessages > chunks.length && chunks.unshift(message);
      if (!chunks.timeoutScheduled) {
        chunks.timeoutScheduled = true;
        setTimeout(() => {
          chunks.timeoutScheduled = false;
          dataChannelSendQueue(partnerId);
        }, dataChannel.send.retryDelay);
      }
      return;
    }
  }
}
function documentOnClick(event) {
  !chat.outer?.contains(event.target) && chatClose();
  !document.getElementById('wbContextMenu')?.contains(event.target) && wbContextMenuRemove(event);
  const id = event.target?.id;
  isString(id) && (id.startsWith('nav') || id.startsWith('wbControl')) && 'button' === event.target?.tagName?.toLowerCase() && event.target?.blur();
  if (!nav.activeOptions.keep && nav.activeOptions.currentOuter && !nav.activeOptions.currentOuter.contains(event.target)) {
    const statusOld = event.target.getAttribute('data-status');
    navActiveOptionsClose();
    if (event.target.classList.contains('navButton') && event.target.hasAttribute('data-status') && 'closing' !== statusOld) {
      return;
    }
  }
  // Use event delegation to reduce number of event listeners
  if (chat.sendMessage === event.target) {
    chatSendMessage();
  } else if ('createMeeting' === id) {
    uiCreateMeetingOnClick(event);
  } else if (['galleryBackground', 'galleryClose'].includes(id)) {
    galleryCloseOnClick(event);
  } else if ('inviteCopy' === id) {
    uiInviteCopyOnClick(event);
  } else if (modal.close === event.target || modal.outer === event.target) {
    modalClose(event);
  } else if (nav.draw.colorPicker === event.target) {
    navDrawColorPickerOnClick(event);
  } else if (nav.draw.lineWidth === event.target) {
    navDrawLineWidthOnClick(event);
  } else if (nav.draw.pencil === event.target) {
    navDrawPencilOnClick(event);
  } else if (nav.insert.image === event.target) {
    navInsertImageOnClick(event);
  } else if (nav.insert.pdf === event.target) {
    navInsertPDFOnClick(event);
  } else if (nav.insert.text === event.target) {
    navInsertTextOnClick(event);
  } else if (nav.mode.video === event.target) {
    navModeVideo(event);
  } else if (nav.mode.whiteboard === event.target) {
    navModeWhiteboard(event);
  } else if (nav.options.audioRecording === event.target) {
    navOptionsAudioRecordingOnClick(event);
  } else if ('navOptionsAudioRecordingAbort' === id) {
    navOptionsAudioRecordingAbortOnClick(event);
  } else if ('navOptionsAudioRecordingDelete' === id) {
    navOptionsAudioRecordingDeleteOnClick(event);
  } else if (nav.options.whiteboardRecording === event.target) {
    navOptionsWhiteboardRecordingOnClick(event);
  } else if ('navOptionsWhiteboardRecordingStart' === id) {
    navOptionsWhiteboardRecordingStartOnClick(event);
  } else if (nav.options.shareScreen === event.target) {
    navOptionsShareScreenOnClick(event);
  } else if (nav.options.videoRecording === event.target) {
    navOptionsVideoRecordingOnClick(event);
  } else if (nav.text.colorPicker === event.target) {
    navTextColorPickerOnClick(event);
  } else if (nav.text.family === event.target) {
    navTextFamilyOnClick(event);
  } else if (nav.text.size === event.target) {
    navTextSizeOnClick(event);
  } else if (nav.video.camera === event.target) {
    navVideoCameraOnClick(event);
  } else if (nav.video.hangUp === event.target) {
    navHangUpOnClick(event);
  } else if (nav.video.microphone === event.target) {
    navVideoMicrophoneOnClick(event);
  } else if ('videoLocalCameraOn' === id) {
    videoLocalCameraOnClick(event);
  } else if ('videoLocalMicrophoneOn' === id) {
    videoLocalMicrophoneOnClick(event);
  } else if ('videoRemoteMicrophoneOn' === id) {
    videoRemoteMicrophoneOnOnClick(event);
  } else if ('wbContextMenuCopy' === id) {
    wbContextMenuCopyOnClick(event);
  } else if ('wbContextMenuDelete' === id) {
    wbContextMenuDeleteOnClick(event);
  } else if ('wbContextMenuLayerDown' === id) {
    wbContextMenuLayerDownOnClick(event);
  } else if ('wbContextMenuLayerUp' === id) {
    wbContextMenuLayerUpOnClick(event);
  } else if ('wbContextMenuLock' === id) {
    wbContextMenuLockOnClick(event);
  } else if (wb.control.grab === event.target) {
    wbControlGrabOnClick(event);
  } else if (wb.controlOld.back === event.target) {
    wbControlOldBackOnClick(event);
  } else if (wb.controlOld.forward === event.target) {
    wbControlOldForwardOnClick(event);
  } else if (id.startsWith('navDrawColorPickerColor-')) {
    navDrawColorPickerButtonOnClick(event);
  } else if (id.startsWith('navTextColorPickerColor-')) {
    navTextColorPickerButtonOnClick(event);
  } else if (event.target?.classList.contains('navTextFamilyButton')) {
    navTextFamilyButtonOnClick(event);
  } else if (event.target?.classList.contains('galleryThumbnail')) {
    galleryThumbnailOnClick(event);
  } else if (event.target?.classList.contains('generalRecycleBin')) {
    generalRecycleBinOnClick(event);
  } else if (event.target?.classList.contains('navOptionsVideoRecordingThumbnail')) {
    navOptionsVideoRecordingThumbnailOnClick(event);
  }
}
function documentOnMouseLeave(event) {
  wbOut();
}
function galleryCloseOnClick(event) {
  nav.activeOptions.keep = false;
  video.recording.current = null;
  galleryVideoEnd();
  const galleryVideo = document.getElementById('galleryVideo');
  galleryVideo?.src?.startsWith('blob:') && URL.revokeObjectURL(galleryVideo.src);
  document.getElementById('galleryBackground')?.remove();
  video.recording.media.forEach(videoObject => videoObject.blob && URL.revokeObjectURL(videoObject.blob));
  galleryVideoSyncHeartBeatClear();
}
async function galleryThumbnailOnClick(event) {
  event.target.disabled = true;
  const parent = document.getElementById('galleryThumbnails');
  const videoElem = document.getElementById('galleryVideo');
  if (!parent || !videoElem) {
    return;
  }
  for (let thumbnails = parent.getElementsByTagName('button'), i = 0; i < thumbnails.length; ++i) {
    if (event.target !== thumbnails[i]) {
      thumbnails[i].classList.remove('selected');
      thumbnails[i].disabled = false;
    }
  }
  await navOptionsVideoRecordingCurrentSet(event.target);
  if (!video.recording.current) {
    return;
  }
  videoElem.src?.startsWith('blob:') && URL.revokeObjectURL(videoElem.src);
  videoElem.style.aspectRatio = video.recording.current.width / video.recording.current.height;
  videoElem.style.width = video.recording.current.width;
  let blob;
  if (video.recording.current.isCached) {
    videoElem.setAttribute('data-cache-url', video.recording.current.url);
    videoElem.setAttribute('data-location', 'cache');
    const cache = await caches.open(video.recording.cache.name);
    const response = await cache.match(video.recording.current.url);
    blob = await response.blob();
  } else {
    videoElem.setAttribute('data-location', 'ram');
    videoElem.setAttribute('data-ram-index', video.recording.current.ramIndex);
    blob = video.recording.current.blob;
  }
  videoElem.src = URL.createObjectURL(blob);
  videoElem.type = blob.type;
  videoElem.load();
  event.target.classList.add('selected');
  document.getElementById('galleryTitle') && (document.getElementById('galleryTitle').textContent = video.recording.current.name);
}
async function galleryVideoCaptureWithCanvas(videoElem) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // Match video size
  const updateCanvasSize = () => {
    canvas.width = videoElem.videoWidth;
    canvas.height = videoElem.videoHeight;
  };
  // Wait for video metadata
  1 > videoElem.readyState && await new Promise(r => videoElem.addEventListener('loadedmetadata', r, {once: true}));
  updateCanvasSize();
  const stream = canvas.captureStream(video.recording.frameRate);
  const track = stream.getVideoTracks()[0];
  let isPlaying = false;
  const draw = () => {
    if (videoElem.ended || videoElem.paused) {
      if (isPlaying) {
        track.stop();
        isPlaying = false;
      }
      return;
    }
    if (!isPlaying) {
      track.enabled = true;
      isPlaying = true;
    }
    updateCanvasSize();
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(draw);
  };
  // Sync with video playback
  const sync = () => {
    !videoElem.paused && !videoElem.ended && draw();
  };
  videoElem.addEventListener('ended', () => {isPlaying = false; track.stop();});
  videoElem.addEventListener('pause', () => {isPlaying = false;});
  videoElem.addEventListener('play', sync);
  videoElem.addEventListener('seeked', sync);
  // Start if already playing
  !videoElem.paused && sync();
  return stream;
}
async function galleryVideoEnd() {
  localStream?.getTracks().forEach(t => t.stop());
  localStream = video.recording.current = null;
  await rtcLocalAcquire();
}
async function galleryVideoOnEnded() {
  galleryVideoSyncHeartBeatClear();
  gallery.video.lastSrc = null;
  gallery.video.recordedTrackAdded.clear();
  const galleryVideo = document.getElementById('galleryVideo');
  galleryVideo?.pause();
  await galleryVideoEnd();
  if (galleryVideo) {
    galleryVideo.currentTime = 0;
    galleryVideo.load(); // forces reload
  }
}
async function galleryVideoOnPlay(event) {
  3 > this.readyState && await new Promise(r => this.addEventListener('canplay', r, {once: true}));
  shareScreenClear();
  let videoStream;
  if (isFunction(this.captureStream)) { // Chrome + Edge
    videoStream = this.captureStream();
  } else { // Firefox
    videoStream = await galleryVideoCaptureWithCanvas(this);
  }
  const newVideoTrack = videoStream.getVideoTracks()[0];
  const currentAudioTrack = localStream?.getAudioTracks()[0] || null;
  const newStream = new MediaStream();
  newVideoTrack && newStream.addTrack(newVideoTrack);
  currentAudioTrack && newStream.addTrack(currentAudioTrack);
  localStream = newStream;
  const hasNewSrc = gallery.video.lastSrc !== this.src;
  // Update peer connections
  for (const [partnerId, pc] of rtc.peerConnections) {
    const senders = pc.getSenders();
    // VIDEO TRACK
    const oldVideoSender = senders.find(s => 'video' === s.track?.kind);
    let newVideoSender;
    if (hasNewSrc || !gallery.video.recordedTrackAdded.get(partnerId)) {
      // First time: addTrack
      oldVideoSender && pc.removeTrack(oldVideoSender);
      newVideoSender = pc.addTrack(newVideoTrack, newStream);
      gallery.video.recordedTrackAdded.set(partnerId, true);
    } else if (oldVideoSender) {
      // Reuse sender: replaceTrack
      await oldVideoSender.replaceTrack(newVideoTrack);
      newVideoSender = oldVideoSender;
    } else {
      // Fallback: addTrack
      newVideoSender = pc.addTrack(newVideoTrack, newStream);
      gallery.video.recordedTrackAdded.set(partnerId, true);
    }
    camera.remote.tracks.set(partnerId, newVideoSender);
    // AUDIO TRACK
    const oldAudioSender = senders.find(s => 'audio' === s.track?.kind);
    if (oldAudioSender) {
      await oldAudioSender.replaceTrack(currentAudioTrack);
    } else if (currentAudioTrack) {
      const newAudioSender = pc.addTrack(currentAudioTrack, newStream);
      microphone.remote.tracks.set(partnerId, newAudioSender);
    }
  }
  gallery.video.lastSrc = this.src;
  galleryVideoSyncSend();
}
function galleryVideoOnSeeking() {
  const galleryVideo = document.getElementById('galleryVideo');
  if (!galleryVideo) {
    return;
  }
  galleryVideo.paused && galleryVideoSyncSend();
}
function galleryVideoOnTimeUpdate() {
  const galleryVideo = document.getElementById('galleryVideo');
  if (!galleryVideo) {
    return;
  }
  !galleryVideo.seeking && galleryVideoSyncSend();
}
function galleryVideoSyncHeartBeatClear() {
  if (gallery.video.syncHeartBeat) {
    clearInterval(gallery.video.syncHeartBeat);
    gallery.video.syncHeartBeat = null;
  }
}
function galleryVideoSyncHeartBeatCreate() {
  gallery.video.syncHeartBeat = setInterval(galleryVideoSyncSend, gallery.video.syncHeartBeatInterval);
}
function galleryVideoSyncSend() {
  const galleryVideo = document.getElementById('galleryVideo');
  if (!galleryVideo) {
    return;
  }
  galleryVideoSyncHeartBeatClear();
  galleryVideoSyncHeartBeatCreate();
  dataChannelSend({
    area: 'gallery',
    command: 'videoSync',
    muted: galleryVideo.muted,
    volume: galleryVideo.volume,
    playbackRate: galleryVideo.playbackRate,
  });
}
function generalEscapeHTML(html) {
  return 'string' === typeof html ? html.replaceAll('<', '&lt;').replaceAll('>', '&gt;') : '';
}
function generalFileNameOfURL(url) {
  const urlWithQueryString = url.includes('?') ? url.substring(0, (url.indexOf('?'))) : url;
  return (urlWithQueryString.includes('/') ? urlWithQueryString.substring(urlWithQueryString.lastIndexOf('/') + 1) : urlWithQueryString);
}
function generalFileNameSanitize(name) {
  return isString(name) ? name.replace(/[<>:\"/\t\r\n\\|?*]+/g, '') : ''; // Remove invalid characters
}
function generalLastVisibleElementIndexGet(scrollableElementId) {
  const container = document.getElementById(scrollableElementId);
  let lastVisibleIndex = -1;
  if (!container) {
    return lastVisibleIndex;
  }
  const children = container.getElementsByTagName('textarea');
  if (!children.length) {
    return lastVisibleIndex;
  }
  const containerRect = container.getBoundingClientRect();
  const containerBottom = containerRect.bottom;
  const containerTop = containerRect.top;
  // Iterate from the last child to find the last visible element
  for (let i = children.length - 1; 0 <= i; --i) {
    const child = children[i];
    const childRect = child.getBoundingClientRect();
    const childBottom = childRect.bottom;
    const childTop = childRect.top;
    // Check if the element is at least partially visible
    // Visible if: child's top or bottom is within container's top and bottom
    if ((childTop >= containerTop && childTop < containerBottom) // Top is visible
    || (childBottom > containerTop && childBottom <= containerBottom) // Bottom is visible
    || (childTop <= containerTop && childBottom >= containerBottom)) { // Spans entire container
      lastVisibleIndex = i;
      break; // Found the last visible element
    }
  }
  return lastVisibleIndex;
}
function generalPageGet() {
  let page;
  if (nav.mode.video?.classList.contains('navActiveButton')) {
    page = 'video';
  } else if (nav.mode.whiteboard?.classList.contains('navActiveButton')) {
    page = 'whiteboard';
  }
  return page;
}
async function generalRecycleBinOnClick(event) {
  event.target.blur();
  const parent = event.target.parentElement?.hasAttribute('data-type') ? event.target.parentElement : event.target.parentElement?.parentElement;
  if (!parent) {
    return;
  }
  const mediaLocation = parent.getAttribute('data-location');
  const type = parent.getAttribute('data-type');
  if (!isString(mediaLocation) || !['audio', 'video', 'whiteboard'].includes(type)) {
    return;
  }
  const media = 'audio' === type ? audio : 'video' === type ? video : whiteboard;
  if ('cache' === mediaLocation) {
    const mediaUrl = parent.getAttribute('data-cache-url');
    mediaUrl && await cacheDelete(media, mediaUrl);
  } else if ('ram' === mediaLocation) {
    const mediaIndex = parseInt(parent.getAttribute('data-ram-index'), 10);
    isNumber(mediaIndex) && (media.recording.media[mediaIndex] = {});
  }
  const outer = document.getElementById('navActiveOptionsOuter-navOptions' + type.charAt(0).toUpperCase() + type.slice(1) + 'Recording');
  if (outer) {
    const outerRect = outer.getBoundingClientRect();
    parent.remove();
    outer.style.height = outerRect.height + 'px';
    outer.style.left = outerRect.left + 'px';
    outer.style.width = outerRect.width + 'px';
    navOptionsRecordingRepositioning(type, {outerRect});
  }
}
function generalRGBToHexGet(rgb) {
  if (!isString(rgb)) {
    return null;
  }
  // Extract RGB values
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) {
    return null;
  }
  // Convert each RGB value to hex
  let hex = '#';
  for (let i = 1; i < 4; ++i) {
    hex += parseInt(match[i], 10).toString(16).padStart(2, '0');
  }
  return hex;
}
function generalSVGToCursor(svgString, hotX = 10, hotY = 10) {
  const encoded = encodeURIComponent(svgString)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `url("data:image/svg+xml,${encoded}") ${hotX} ${hotY}`;
}
// Generate thumbnail from video Blob
async function generalVideoThumbnailGet(blob) {
  const videoElem = document.createElement('video');
  const url = URL.createObjectURL(blob);
  videoElem.src = url;
  videoElem.muted = true;
  videoElem.playsInline = true;
  return new Promise((resolve, reject) => {
    const cleanup = () => URL.revokeObjectURL(url);
    videoElem.addEventListener('error', () => {
      cleanup();
      reject(new Error('Video load failed'));
    });
    videoElem.addEventListener('loadedmetadata', () => {
      videoElem.currentTime = Math.min(1, videoElem.duration * .1 || 1);
    }, {once: true});
    const onSeeked = () => {
      if (videoElem.videoWidth === 0 || videoElem.videoHeight === 0) {
        reject(new Error('Invalid video dimensions'));
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = videoElem.videoWidth;
      canvas.height = videoElem.videoHeight;
      canvas.getContext('2d').drawImage(videoElem, 0, 0, canvas.width, canvas.height);
      cleanup();
      resolve(canvas.toDataURL('image/png'));
      videoElem.removeEventListener('seeked', onSeeked);
    };
    videoElem.addEventListener('seeked', onSeeked);
    videoElem.load();
  });
}
function i18n(key, args) {
  const value = internationalisation[key]?.[userLanguage];
  const type = typeof value;
  return 'function' === type ? value(args) : 'string' === type ? value : '';
}
function i18nConvert(elem) {
  let elems = elem.querySelectorAll('[data-i18n]');
  for (let i = 0; i < elems.length; ++i) {
    const text = i18n(elems[i].getAttribute('data-i18n'));
    elems[i].setAttribute('aria-label', text);
    elems[i].title = text;
    elems[i].removeAttribute('data-i18n');
  }
  elems = elem.querySelectorAll('[data-i18n-text-content]');
  for (let i = 0; i < elems.length; ++i) {
    elems[i].textContent = i18n(elems[i].getAttribute('data-i18n-text-content'));
    elems[i].removeAttribute('data-i18n-text-content');
  }
}
function isAlphaUser(userIdPartner) {
  return userId && userId < userIdPartner;
}
function isArray(input) {
  return Array.isArray(input);
}
function isBase64Image(input) {
  return /^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/]+={0,2}$/.test(input);
}
function isBoolean(input) {
  return 'boolean' === typeof input;
}
function isFileList(input) {
  return input instanceof FileList;
}
function isFunction(input) {
  return 'function' === typeof input;
}
function isInt(input) {
  return Number.isInteger(input);
}
function isJsonPlain(input) {
  if (!input || isArray(input) || 'object' !== typeof input || input instanceof ArrayBuffer || input instanceof Uint8Array || ('undefined' !== typeof Buffer && Buffer.isBuffer(input))) {
    return false;
  }
  try {
    JSON.stringify(input);
    return true;
  } catch (error) {
    return false;
  }
}
function isJsonString(input) {
  if (!isString(input)) {
    return false;
  }
  try {
    const parsed = JSON.parse(input);
    return 'object' === typeof parsed && null !== parsed;
  } catch (error) {
    return false;
  }
}
function isModalOpen () {
  return modal.outer?.open;
}
function isNumber(input) {
  return 'number' === typeof input && !Number.isNaN(input);
}
function isNumberGreaterZero(input) {
  return isNumber(input) && 0 < input;
}
function isPngDataUrl(input) {
  if (!isString(input)) {
    return false;
  }
  // Match the exact prefix
  const regex = /^data:image\/png;base64,[A-Za-z0-9+/=]+$/;
  if (!regex.test(input)) {
    return false;
  }
  // Extract Base64 part
  const base64 = input.split(',')[1];
  if (!base64) {
    return false;
  }
  // Validate Base64 length (must be multiple of 4)
  if (base64.length % 4) {
    return false;
  }
  // Decode and check PNG signature
  try {
    const binary = atob(base64);
    // PNG files start with: 89 50 4E 47 0D 0A 1A 0A
    return 8 < binary.length
      && binary.charCodeAt(0) === 0x89
      && binary.charCodeAt(1) === 0x50
      && binary.charCodeAt(2) === 0x4E
      && binary.charCodeAt(3) === 0x47
      && binary.charCodeAt(4) === 0x0D
      && binary.charCodeAt(5) === 0x0A
      && binary.charCodeAt(6) === 0x1A
      && binary.charCodeAt(7) === 0x0A;
  } catch (error) {
    return false; // Invalid Base64
  }
}
function isString(input) {
  return 'string' === typeof input;
}
function isUndefined(input) {
  return 'undefined' === typeof input;
}
function modalClose(event) {
  if (!modal.outer || !isModalOpen()) {
    return;
  }
  modal.outer?.classList.add('closing');
  modal.outer?.addEventListener('transitionend', () => {
    modal.outer?.classList.remove('closing');
    modal.outer?.close();
  }, {once: true});
}
function modalOpen(event) {
  if (!modal.outer || isModalOpen()) {
    return;
  }
  // Store current scroll position
  modal.lastScrollPosition = {
    x: window.scrollX || window.pageXOffset,
    y: window.scrollY || window.pageYOffset,
  };
  // Prevent body scrolling
  document.body.addEventListener('scroll', modalPreventDefault, {passive: false});
  document.body.addEventListener('touchmove', modalPreventDefault, {passive: false});
  document.body.addEventListener('wheel', modalPreventDefault, {passive: false});
  document.body.style.left = `-${modal.lastScrollPosition.x}px`;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${modal.lastScrollPosition.y}px`;
  //modal.openingElement = event.target;
  modal.outer?.classList.add('opening');
  modal.outer?.showModal();
  requestAnimationFrame(() => {
    modal.outer?.classList.remove('opening');
  });
}
function modalOuterOnClose(event) {
  modal.inner && (modal.inner.textContent = '');
  modal.title && (modal.title.textContent = '');
  // Restore body scrolling
  document.body.removeEventListener('scroll', modalPreventDefault, {passive: false});
  document.body.removeEventListener('touchmove', modalPreventDefault, {passive: false});
  document.body.removeEventListener('wheel', modalPreventDefault, {passive: false});
  document.body.style.left = document.body.style.position = document.body.style.top = '';
  // Restore scroll position
  if (modal.lastScrollPosition) {
    window.scrollTo(modal.lastScrollPosition.x, modal.lastScrollPosition.y);
    delete modal.lastScrollPosition;
  }
}
function modalPreventDefault(event) {
  if (!modal.outer) {
    return;
  }
  const modalOuterRect = modal.outer.getBoundingClientRect();
  // Abort in case cursor hovers modal
  if (modalOuterRect.left <= event.clientX && modalOuterRect.right >= event.clientX
  && modalOuterRect.top <= event.clientY && modalOuterRect.bottom >= event.clientY) {
    return;
  }
  event.preventDefault();
}
function navActiveButton(className, event, innerHTML, targetClassName) {
  const targetId = event?.target?.id;
  const targetRect = event?.target?.getBoundingClientRect();
  if (!isString(targetId) || '' === targetId || !targetRect || !event.target.parentElement) {
    return;
  }
  event.target.classList.add(targetClassName);
  event.target.setAttribute('data-class-name', targetClassName);
  event.target.setAttribute('data-status', 'opening');
  const outerId = className + 'Outer-' + targetId;
  let outer = document.getElementById(outerId);
  outer?.removeEventListener('transitionend', navActiveOptionsOuterOnTransitionEnd);
  if (!outer) {
    outer = document.createElement('div');
    outer.classList.add(className, className + 'Outer');
    outer.id = outerId;
    const connectorOuter = document.createElement('div');
    connectorOuter.classList.add(className, className + 'ConnectorOuter');
    const connector = document.createElement('div');
    connector.classList.add(className, className + 'Connector');
    connector.innerHTML = nav.activeOptions.connector.html;
    connector.style.height = nav.activeOptions.connector.height + 'px';
    connector.style.width = nav.activeOptions.connector.width + 'px';
    connectorOuter.appendChild(connector);
    outer.appendChild(connectorOuter);
    const inner = document.createElement('div');
    inner.classList.add(className, className + 'Inner');
    inner.innerHTML = innerHTML;
    outer.appendChild(inner);
    outer.setAttribute('data-initiator-id', targetId);
    outer.style.top = (targetRect.height + targetRect.top + (window.pageYOffset || document.documentElement.scrollTop)) + 'px';
    nav.activeOptions.zIndex = outer.style.zIndex = nav.activeOptions.zIndex + 1 <= nav.activeOptions.zIndexMax ? ++nav.activeOptions.zIndex : 101;
    if (event.target === event.target.parentElement.lastElementChild) {
      event.target.parentElement.appendChild(outer);
    } else {
      event.target.parentElement.insertBefore(outer, event.target.nextElementSibling);
    }
    const outerRect = outer.getBoundingClientRect();
    const bodyRect = document.documentElement.getBoundingClientRect();
    let outerLeft = targetRect.left + targetRect.width - targetRect.width / 2 - outer.getBoundingClientRect().width / 2;
    outerLeft + outerRect.width > bodyRect.width && (outerLeft -= outerLeft + outerRect.width - bodyRect.width);
    outerLeft = Math.max(outerLeft, 0);
    outer.style.left = outerLeft + 'px';
    connector.style.left = (targetRect.left + targetRect.width / 2 - nav.activeOptions.connector.width / 2 - outerLeft) + 'px';
  }
  nav.activeOptions.currentOuter = outer;
  const outerRectCurrent = outer.getBoundingClientRect();
  let heightMax = parseFloat(outer.getAttribute('data-height-max'));
  if (!isNumber(heightMax)) {
    outer.style.height = 'unset';
    heightMax = outer.getBoundingClientRect().height;
    outer.setAttribute('data-height-max', heightMax);
  }
  outer.style.height = outerRectCurrent.height + 'px';
  outer.style.width = outerRectCurrent.width + 'px';
  outer.offsetHeight; // Force reflow to ensure new properties are applied
  outer.style.transition = `height ${(heightMax - outerRectCurrent.height) / Math.max(heightMax, 1) * nav.activeOptions.transitionDuration}s linear`;
  outer.style.height = heightMax + 'px';
}
function navActiveOptionsClose(event) {
  for (let elems = document.querySelectorAll('.navActiveOptionsOuter'), i = elems.length - 1; 0 <= i; --i) {
    const elem = elems[i];
    if (!isString(elem.id) || '' === elem.id) {
      continue;
    }
    const initiatorId = elem.id.split('-')[1];
    if (!initiatorId) {
      continue;
    }
    const elemById = document.getElementById(initiatorId);
    if ('closing' === elemById?.getAttribute('data-status')) {
      continue;
    }
    elemById?.setAttribute('data-status', 'closing');
    const heightCurrent = elem.getBoundingClientRect().height;
    let heightMax = parseFloat(elem.getAttribute('data-height-max'));
    if (!isNumber(heightMax)) {
      elem.style.height = 'unset';
      heightMax = elem.getBoundingClientRect().height;
      elem.setAttribute('data-height-max', heightMax);
    }
    elem.style.height = heightCurrent + 'px';
    elem.offsetHeight; // Force reflow to ensure new properties are applied
    elem.style.transition = `height ${heightCurrent / Math.max(heightMax, 1) * nav.activeOptions.transitionDuration}s linear`;
    elem.style.height = 0;
    elem.addEventListener('transitionend', navActiveOptionsOuterOnTransitionEnd, {once: true});
  }
}
function navActiveOptionsOuterOnTransitionEnd(event) {
  const initiator = document.getElementById(event.target.getAttribute('data-initiator-id'));
  if (event.target.offsetHeight) {
    initiator?.setAttribute('data-status', 'open');
    return;
  }
  const initiatorClassName = initiator?.getAttribute('data-class-name');
  initiatorClassName && initiator?.classList.remove(initiatorClassName);
  initiator?.removeAttribute('data-status');
  nav.activeOptions.currentOuter === event.target && (nav.activeOptions.currentOuter = null);
  event.target.remove();
}
function navActiveOptionsOuterRepositioning(event) {
  const bodyRect = document.documentElement.getBoundingClientRect();
  for (let elems = document.querySelectorAll('.navActiveOptionsOuter:not(#navActiveOptionsOuter-navOptionsVideoRecording)'), i = 0; i < elems.length; ++i) {
    const elemId = elems[i].id;
    if (!isString(elemId)) {
      continue;
    }
    const targetRect = document.getElementById(elemId.split('-')[1])?.getBoundingClientRect();
    if (!targetRect) {
      continue;
    }
    const outerRect = elems[i].getBoundingClientRect();
    let outerLeft = targetRect.left + targetRect.width - targetRect.width / 2 - outerRect.width / 2;
    outerLeft + outerRect.width > bodyRect.width && (outerLeft -= outerLeft + outerRect.width - bodyRect.width);
    outerLeft = Math.max(outerLeft, 0);
    if (outerLeft !== outerRect.left) {
      elems[i].style.left = outerLeft + 'px';
      const connector = elems[i].querySelector('.navActiveOptionsConnector');
      connector && (connector.style.left = (targetRect.left + targetRect.width / 2 - nav.activeOptions.connector.width / 2 - outerLeft) + 'px');
    }
    const outerTop = targetRect.height + targetRect.top + (window.pageYOffset || document.documentElement.scrollTop);
    outerTop !== outerRect.top && (elems[i].style.top = outerTop + 'px');
  }
}
function navDrawColorPickerButtonOnClick(event) {
  navActiveOptionsClose();
  wbModeChange('default');
  const classActive = 'navDrawColorPickerColorActive';
  if (event.target?.classList.contains(classActive)) {
    return;
  }
  for (let elems = document.querySelectorAll('.' + classActive), i = 0; i < elems.length; ++i) {
    elems[i].classList.remove(classActive);
  }
  event.target?.classList.add(classActive);
  const colorIndex = parseInt(event.target?.id?.split('-')[1], 10);
  isNumber(colorIndex) && (wb.draw.colorIndex = colorIndex);
  const rgb = getComputedStyle(event.target).backgroundColor;
  if (!rgb) {
    return;
  }
  const hex = generalRGBToHexGet(rgb);
  hex && (wb.draw.color = hex);
}
function navDrawColorPickerOnClick(event) {
  const targetId = event.target?.id;
  if (!isString(targetId)) {
    return;
  }
  let innerHTML = '';
  if (!document.getElementById(nav.activeOptions.className + 'Outer-' + targetId)) {
    innerHTML = '<div id="navDrawColorPickerColorOuter">';
    for (let i = 0; i < wb.draw.colorMax; ++i) {
      innerHTML += '<button' + (wb.draw.colorIndex === i ? ' class="navDrawColorPickerColorActive"' : '') + ' id="navDrawColorPickerColor-' + i + '"></button>';
    }
    innerHTML += '</div>';
  }
  navActiveButton(nav.activeOptions.className, event, innerHTML, 'navActiveButton');
}
function navDrawLineWidthOnClick(event) {
  const targetId = event.target?.id;
  if (!isString(targetId)) {
    return;
  }
  const hasOuter = document.getElementById(nav.activeOptions.className + 'Outer-' + targetId);
  let innerHTML = '';
  if (!hasOuter) {
    innerHTML =
      '<div id="navDrawLineWidthOuter">'
        +'<div id="navDrawLineWidthRangeWrap">'
          +'<div id="navDrawLineWidthTrack" style="background-color: ' + wb.draw.color + ';"></div>'
            +'<input aria-valuemax="' + wb.draw.widthMax + '" aria-valuemin="' + wb.draw.widthMin + '" aria-valuenow="' + wb.draw.width + '" id="navDrawLineWidthSlider" max="' + wb.draw.widthMax + '" min="' + wb.draw.widthMin + '" type="range" value="' + wb.draw.width + '">'
          +'</div>'
        +'</div>'
      +'</div>';
  }
  navActiveButton(nav.activeOptions.className, event, innerHTML, 'navActiveButton');
  !hasOuter && document.getElementById('navDrawLineWidthSlider')?.addEventListener('change', navDrawLineWidthSliderOnChange);
}
function navDrawPencilOnClick(event) {
  event.target.blur();
  wbModeChange(event.target.classList.contains('navActiveButton') ? 'edit' : 'default')
}
function navDrawLineWidthSliderOnChange(event) {
  navActiveOptionsClose();
  wbModeChange('default');
  const width = parseInt(this.value, 10);
  wb.draw.width = width;
  this.setAttribute('aria-valuenow', width);
}
function navHangUpOnClick(event) {
  document.getElementById('inviteOuter')?.classList.add('none');
  wb.partnerCursor?.classList.add('none');
  wbClear();
  if (!['', 'index'].includes(generalFileNameOfURL(location.href))) {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  }
}
function navInsertImageOnClick(event) {
  document.getElementById('navInsertImageInput')?.click();
}
function navInsertPDFOnClick(event) {
  document.getElementById('navInsertPDFInput')?.click();
}
function navInsertTextOnClick(event) {
  wbModeChange('textAdd' === wb.mode ? 'edit' : 'textAdd');
}
function navModeVideo(event) {
  !event.target.classList.contains('navActiveButton') && uiShowContent('video', true);
}
function navModeWhiteboard(event) {
  !event.target.classList.contains('navActiveButton') && uiShowContent('whiteboard', true);
}
function navOptionsAudioRecordingAbortOnClick(event) {
  event.target.disabled = true;
  audio.recording.currentName = null;
  navOptionsAudioRecordingStop(event);
}
async function navOptionsAudioRecordingGetAndSort() {
  const audios = [];
  const cache = await cacheLoad(audio.recording.cache.name);
  for (let i = 0; i < cache.length; ++i) {
    if (cache[i].headers && isString(cache[i].url)) {
      const parts = cache[i].url.split('-');
      if (3 > parts.length) {
        continue;
      }
      audios.push({
        createdAt: parts[parts.length - 2],
        isCached: true,
        name: cache[i].headers.name,
        url: cache[i].url,
      });
    }
  }
  for (let i = 0; i < audio.recording.media.length; ++i) {
    audios.push({
      createdAt: audio.recording.media[i].createdAt,
      isCached: false,
      name: audio.recording.media[i].name,
      ramIndex: i,
    });
  }
  return audios.sort((a, b) => a.createdAt - b.createdAt);
}
function navOptionsAudioRecordingDeleteOnClick(event) {
  event.target.disabled = true;
  audio.recording.chunks = [];
  audio.recording.currentName = null;
  navOptionsAudioRecordingStop(event);
}
async function navOptionsAudioRecordingOnClick(event) {
  const targetId = event.target?.id;
  if (!isString(targetId)) {
    return;
  }
  let innerHTML = '';
  const outerId = 'navOptionsAudioRecordingActiveOptions';
  const pauseId = 'navOptionsAudioRecordingPause';
  const startId = 'navOptionsAudioRecordingStart';
  const stopId = 'navOptionsAudioRecordingStop';
  if (!document.getElementById(nav.activeOptions.className + 'Outer-' + targetId)) {
    const audios = await navOptionsAudioRecordingGetAndSort();
    const cache = await caches.open(audio.recording.cache.name);
    const deleteTitle = i18n('deleteAudioRecording');
    const pauseTitle = i18n('pauseAudioRecording');
    const startTitle = i18n('startAudioRecording');
    const stopTitle = i18n('endAudioRecording');
    innerHTML =
      '<div id="' + outerId + '">'
        +'<div id="navOptionsAudioRecordingStartOuter">'
          +'<input id="navOptionsAudioRecordingStartName" name="audio" type="text" value="' + (audio.recording.startName ?? await navOptionsRecordingStartNameDefaultGet(audio)) + '">'
          +'<div' + (audio.recording.stream ? ' class="none"' : '') + ' id="navOptionsAudioRecordingStartInner">'
            +'<button aria-label="' + startTitle + '" id="' + startId + '" title="' + startTitle + '">'
              +'<p></p>'
              +'<span>' + startTitle + '</span>'
            +'</button>'
          +'</div>'
          +'<div' + (audio.recording.stream ? '' : ' class="none"') + ' id="navOptionsAudioRecordingStopInner">'
            +'<button class="generalRecycleBin" id="navOptionsAudioRecordingDelete" title="' + deleteTitle + '">'
              +svg.recycleBin
            +'</button>'
            +'<meter id="navOptionsAudioRecordingVolume" max="100" min="0" title="' + i18n('volume') + '" value="' + audio.recording.volume + '"></meter>'
            +'<button aria-label="' + pauseTitle + '" id="' + pauseId + '" title="' + pauseTitle + '">'
              +svg.pause
            +'</button>'
            +'<button aria-label="' + stopTitle + '" id="' + stopId + '" title="' + stopTitle + '">'
              +svg.stop
            +'</button>'
          +'</div>'
          +'<div class="' + (audio.recording.isConverting && audio.recording.stream ? '' : 'none') + '" id="navOptionsAudioRecordingStartSpinnerOuter">'
            +'<button class="generalRecycleBin" id="navOptionsAudioRecordingAbort" title="' + deleteTitle + '">'
              +svg.recycleBin
            +'</button>'
            +'<div id="navOptionsAudioRecordingStartSpinnerInner">'
              +'<div class="spinner spinnerSmall"></div>'
            +'</div>'
          +'</div>'
        +'</div>';
    for (let names = Object.keys(audio.recording.converting.names), i = names.length - 1; 0 <= i; --i) {
      innerHTML +=
        '<div data-audio-index="' + names[i] + '" data-type="audio">'
          +'<input disabled name="audio" type="text" value="' + generalEscapeHTML(audio.recording.converting.names[names[i]]) + '">'
          +'<div class="navOptionsAudioRecordingPlaybackOuter">'
            +'<div class="spinner spinnerSmall"></div>'
          +'</div>'
        +'</div>';
    }
    for (let i = audios.length - 1; 0 <= i ; --i) {
      let blob;
      if (audios[i].isCached) {
        const response = await cache.match(audios[i].url);
        blob = await response.blob();
      } else {
        blob = audio.recording.media[audios[i].ramIndex];
      }
      if (!blob) {
        continue;
      }
      innerHTML +=
        '<div' + (audios[i].isCached ? ' data-cache-url="' + audios[i].url + '"' : '') + ' data-location="' + (audios[i].isCached ? 'cache' : 'ram') + '"' + (audios[i].isCached ? '' : ' data-ram-index="' + audios[i].ramIndex + '"') + ' data-type="audio">'
          +'<input name="audio" type="text" value="' + generalEscapeHTML(audios[i].name) + '">'
          +'<div class="navOptionsAudioRecordingPlaybackOuter">'
            +'<button class="generalRecycleBin" title="' + deleteTitle + '">'
              +svg.recycleBin
            +'</button>'
            +'<audio controls="controls" controlsList="nodownload noplaybackrate">'
              +'<source src="' + URL.createObjectURL(blob) + '" type="' + blob.type + '">'
            +'</audio>'
          +'</div>'
        +'</div>';
    }
    innerHTML += '</div>';
  }
  navActiveButton(nav.activeOptions.className, event, innerHTML, 'navActiveButton');
  if (!innerHTML) {
    return;
  }
  document.getElementById(pauseId)?.addEventListener('click', navOptionsAudioRecordingPauseOnClick);
  document.getElementById(startId)?.addEventListener('click', navOptionsAudioRecordingStartOnClick);
  document.getElementById(stopId)?.addEventListener('click', navOptionsAudioRecordingStopOnClick);
  document.getElementById(startId)?.setAttribute('data-outer-id', outerId);
  const outer = document.getElementById(outerId);
  if (outer) {
    for (let elems = outer.getElementsByTagName('input'), i = elems.length - 1; 0 <= i; --i) {
      elems[i].addEventListener('change', navOptionsRecordingNameOnChange);
      elems[i].addEventListener('input', navOptionsRecordingNameOnInput);
      elems[i].addEventListener('keydown', navOptionsRecordingNameOnKeyDown);
    }
  }
}
function navOptionsAudioRecordingPauseOnClick(event) {
  event.target.blur();
  audio.recording.isPausing = !audio.recording.isPausing;
  navOptionsAudioRecordingSend('isPausing', audio.recording.isPausing);
}
function navOptionsAudioRecordingSend(key, value) {
  audio.recording.context && audio.recording.node && audio.recording.node.parameters.get(key).setValueAtTime(value, audio.recording.context.currentTime);
}
async function navOptionsAudioRecordingStartOnClick(event) {
  event.target.blur();
  if (audio.recording.stream) {
    return;
  }
  event.target?.parentElement?.classList.add('none');
  document.getElementById('navOptionsAudioRecordingStartSpinnerOuter')?.classList.remove('none');
  audio.recording.currentName = generalFileNameSanitize(document.getElementById('navOptionsAudioRecordingStartName')?.value) ?? await navOptionsRecordingStartNameDefaultGet(audio);
  audio.recording.isConverting = audio.recording.isPausing = audio.recording.isStopping = false;
  audio.recording.stream = true;
  navigator.mediaDevices.getUserMedia({audio: audio.recording.config}).then(stream => {
    if (audio.recording.isStopping) {
      return navOptionsAudioRecordingStop();
    }
    audio.recording.stream = stream;
    audio.recording.context = new AudioContext();
    /*
      To do: If the longstanding Firefox limitation (see Mozilla Bugzilla bugs like 1725336, 1674892) ever gets fixed
      use sampleRate option and remove function _downSample and parameter recordedSampleRate in /js/recorder.js.
    */
    //audio.recording.context = new AudioContext({sampleRate: audio.recording.sampleRate});
    audio.recording.context?.resume().then(() => {
      if (audio.recording.isStopping || !audio.recording.context) {
        return navOptionsAudioRecordingStop();
      }
      audio.recording.context.audioWorklet.addModule('/js/recorder.js').then(() => {
        if (audio.recording.isStopping || !audio.recording.context) {
          return navOptionsAudioRecordingStop();
        }
        document.getElementById('navOptionsAudioRecordingStartSpinnerOuter')?.classList.add('none');
        document.getElementById('navOptionsAudioRecordingStopInner')?.classList.remove('none');
        audio.recording.node = new AudioWorkletNode(audio.recording.context, 'recorder-worklet');
        audio.recording.startedAt = Date.now();
        audio.recording.chunks = [];
        audio.recording.node.port.onmessage = async (event2) => {
          if ('data' === event2.data?.eventType) {
            event2.data.audioBuffer && audio.recording.chunks.push(event2.data.audioBuffer);
          } else if ('paused' === event2.data?.eventType) {
            document.getElementById('navOptionsAudioRecordingVolume')?.setAttribute('value', audio.recording.volume = 0);
          } else if ('stop' === event2.data?.eventType) {
            audio.recording.source?.disconnect?.();
            audio.recording.node?.disconnect?.();
            audio.recording.node = null;
            navOptionsAudioRecordingStop();
            let chunksTotalLength = 0;
            for (let i = 0; i < audio.recording.chunks.length; ++i) {
              chunksTotalLength += audio.recording.chunks[i].length;
            }
            if (!chunksTotalLength) {
              audio.recording.currentName = null;
              return;
            }
            audio.recording.isConverting = true;
            document.getElementById('navOptionsAudioRecordingStartName')?.setAttribute('value', await navOptionsRecordingStartNameDefaultGet(audio, 1));
            const audioConvertingCounter = audio.recording.converting.counter + 1 < Number.MAX_SAFE_INTEGER ? audio.recording.converting.counter++ : audio.recording.converting.counter = 0;
            const lastName = audio.recording.currentName;
            audio.recording.converting.names[audioConvertingCounter] = audio.recording.currentName;
            audio.recording.currentName = null;
            const optionsOuter = document.getElementById('navOptionsAudioRecordingActiveOptions');
            if (optionsOuter) {
              const newOuter = document.createElement('div');
              newOuter.setAttribute('data-audio-index', audioConvertingCounter);
              newOuter.setAttribute('data-type', 'audio');
              const audioName = document.createElement('input');
              audioName.addEventListener('change', navOptionsRecordingNameOnChange);
              audioName.addEventListener('input', navOptionsRecordingNameOnInput);
              audioName.addEventListener('keydown', navOptionsRecordingNameOnKeyDown);
              audioName.disabled = 'disabled';
              audioName.name = 'audio';
              audioName.type = 'text';
              audioName.value = audio.recording.converting.names[audioConvertingCounter];
              newOuter.appendChild(audioName);
              const playbackOuter = document.createElement('div');
              playbackOuter.classList.add('navOptionsAudioRecordingPlaybackOuter');
              const spinner = document.createElement('div');
              spinner.classList.add('spinner', 'spinnerSmall');
              playbackOuter.appendChild(spinner);
              newOuter.appendChild(playbackOuter);
              1 < optionsOuter.children.length ? optionsOuter.insertBefore(newOuter, optionsOuter.children[1]) : optionsOuter.appendChild(newOuter);
              navOptionsRecordingRepositioning('audio');
            }
            const worker = new Worker('/js/mp3.worker.min.js');
            worker.onerror = (event3) => {
              document.querySelector('[data-audio-index="' + audioConvertingCounter + '"]')?.remove();
              navOptionsRecordingRepositioning('audio');
              document.getElementById('navOptionsAudioRecordingStartName')?.setAttribute('value', lastName);
              audio.recording.converting.names[audioConvertingCounter] && delete audio.recording.converting.names[audioConvertingCounter];
              audio.recording.isConverting = false;
            };
            worker.onmessage = async (event3) => {
              const blob = new Blob(event3.data, {type: 'audio/mpeg'});
              const createdAt = Date.now();
              const name = audio.recording.converting.names[audioConvertingCounter] ?? await navOptionsRecordingStartNameDefaultGet(audio);
              const cacheSaved = await cacheSave(blob, createdAt, {name}, 'audio');
              !cacheSaved && audio.recording.media.push({
                blob,
                createdAt,
                name,
              });
              audio.recording.converting.names[audioConvertingCounter] && delete audio.recording.converting.names[audioConvertingCounter];
              document.getElementById('navOptionsAudioRecordingStartName')?.setAttribute('value', await navOptionsRecordingStartNameDefaultGet(audio));
              const cache = cacheSaved ? await cacheLoad(audio.recording.cache.name) : [];
              const audioIndex = (cacheSaved ? cache : audio.recording.media).length - 1;
              const audioNew = cacheSaved ? cache[audioIndex]?.headers : audio.recording.media[audioIndex];
              if (audioNew) {
                const audioOuter = document.querySelector('[data-audio-index="' + audioConvertingCounter + '"]');
                if (audioOuter) {
                  cacheSaved && audioOuter.setAttribute('data-cache-url', cache[audioIndex].url);
                  audioOuter.setAttribute('data-location', cacheSaved ? 'cache' : 'ram');
                  !cacheSaved && audioOuter.setAttribute('data-ram-index', audioIndex);
                  audioOuter.getElementsByTagName('input')[0]?.removeAttribute('disabled');
                  const playbackOuter = audioOuter.querySelector('.navOptionsAudioRecordingPlaybackOuter');
                  if (playbackOuter) {
                    playbackOuter.textContent = '';
                    const audioDelete = document.createElement('button');
                    const deleteTitle = i18n('deleteAudioRecording');
                    audioDelete.setAttribute('aria-label', deleteTitle);
                    audioDelete.classList.add('generalRecycleBin');
                    audioDelete.innerHTML = svg.recycleBin;
                    audioDelete.title = deleteTitle;
                    playbackOuter.appendChild(audioDelete);
                    const audioElem = document.createElement('audio');
                    audioElem.controls = 'controls';
                    audioElem.controlsList = 'nodownload noplaybackrate';
                    const audioSource = document.createElement('source');
                    audioSource.src = URL.createObjectURL(blob);
                    audioSource.type = blob.type;
                    audioElem.appendChild(audioSource);
                    playbackOuter.appendChild(audioElem);
                  }
                }
              }
              worker.terminate();
              audio.recording.isConverting = false;
            };
            worker.postMessage([audio.recording.chunks, chunksTotalLength]);
            audio.recording.chunks = [];
          } else if ('volume' === event2.data?.eventType) {
            isNumber(event2.data.volume) && document.getElementById('navOptionsAudioRecordingVolume')?.setAttribute('value', audio.recording.volume = event2.data.volume + 100);
          }
        };
        audio.recording.source = audio.recording.context.createMediaStreamSource(stream);
        nav.options.audioRecording?.classList.add('navButtonRecording');
        audio.recording.source.connect(audio.recording.node);
        audio.recording.node.connect(audio.recording.context.destination);
      }).catch((event2) => {
        navOptionsAudioRecordingStop();
      });
    }).catch((event2) => {
      navOptionsAudioRecordingStop();
    });
  }).catch((event2) => {
    navOptionsAudioRecordingStop();
  });
}
function navOptionsAudioRecordingStop() {
  audio.recording.context?.close?.();
  audio.recording.stream?.getTracks?.().forEach(track => track.stop());
  audio.recording.context = audio.recording.stream = null;
  audio.recording.isStopping = true;
  nav.options.audioRecording?.classList.remove('navButtonRecording');
  document.getElementById('navOptionsAudioRecordingStartSpinnerOuter')?.classList.add('none');
  document.getElementById('navOptionsAudioRecordingStopInner')?.classList.add('none');
  document.getElementById('navOptionsAudioRecordingStartInner')?.classList.remove('none');
  document.getElementById('navOptionsAudioRecordingAbort')?.removeAttribute('disabled');
  document.getElementById('navOptionsAudioRecordingDelete')?.removeAttribute('disabled');
  document.getElementById('navOptionsAudioRecordingStop')?.removeAttribute('disabled');
}
function navOptionsAudioRecordingStopOnClick(event) {
  event.target.disabled = true;
  if ('running' === audio.recording.node?.context?.state) {
    navOptionsAudioRecordingSend('isRecording', false);
    audio.recording.isStopping = true;
  } else {
    navOptionsAudioRecordingStop();
  }
}
async function navOptionsRecordingAdd(blob, event, height, thumbnail, type, width) {
  let media, type2;
  if ('video' === type) {
    media = video;
    type2 = 'Video';
  } else if ('whiteboard' === type) {
    media = whiteboard;
    type2 = 'Whiteboard';
  } else {
    return;
  }
  const createdAt = Date.now();
  const name = media.recording.currentName;
  media.recording.currentName = null;
  const cacheSaved = await cacheSave(blob, createdAt, {height, name, thumbnail, width}, type);
  !cacheSaved && media.recording.media.push({
    blob,
    createdAt,
    height,
    name,
    ramIndex: media.recording.media.length,
    thumbnail,
    width,
  });
  const outer = document.getElementById(event.target.getAttribute('data-outer-id'));
  if (outer) {
    document.getElementById('navOptions' + type2 + 'RecordingStartName')?.setAttribute('value', await navOptionsRecordingStartNameDefaultGet(media));
    const cache = cacheSaved ? await cacheLoad(media.recording.cache.name) : [];
    const mediaIndex = (cacheSaved ? cache : media.recording.media).length - 1;
    const mediaNew = cacheSaved ? cache[mediaIndex]?.headers : media.recording.media[mediaIndex];
    if (mediaNew) {
      const div = document.createElement('div');
      cacheSaved && div.setAttribute('data-cache-url', cache[mediaIndex].url);
      div.setAttribute('data-location', cacheSaved ? 'cache' : 'ram');
      !cacheSaved && div.setAttribute('data-ram-index', mediaIndex);
      div.setAttribute('data-type', type);
      const mediaName = document.createElement('input');
      mediaName.addEventListener('change', navOptionsRecordingNameOnChange);
      mediaName.addEventListener('input', navOptionsRecordingNameOnInput);
      mediaName.addEventListener('keydown', navOptionsRecordingNameOnKeyDown);
      mediaName.name = type;
      mediaName.type = 'text';
      mediaName.value = mediaNew.name;
      div.appendChild(mediaName);
      const buttonThumbnail = document.createElement('button');
      buttonThumbnail.classList.add('navOptions' + type2 + 'RecordingThumbnail');
      buttonThumbnail.style.backgroundImage = 'url(' + mediaNew.thumbnail + ')';
      div.appendChild(buttonThumbnail);
      const buttonRecycleBin = document.createElement('button');
      const deleteTitle = i18n('video' === type ? 'deleteVideoRecording' : 'deletePhoto');
      buttonRecycleBin.setAttribute('aria-label', deleteTitle);
      buttonRecycleBin.classList.add('generalRecycleBin', 'generalRecycleBinToTop');
      buttonRecycleBin.innerHTML = svg.recycleBin;
      buttonRecycleBin.title = deleteTitle;
      div.appendChild(buttonRecycleBin);
      1 < outer.children.length ? outer.insertBefore(div, outer.children[1]) : outer.appendChild(div);
      navOptionsRecordingRepositioning(type);
    }
  }
}
async function navOptionsRecordingGetAndSort(type) {
  const cache = await cacheLoad(type.recording.cache.name);
  const media = [];
  for (let i = 0; i < cache.length; ++i) {
    if (cache[i].headers && isString(cache[i].url)) {
      const parts = cache[i].url.split('-');
      if (3 > parts.length) {
        continue;
      }
      media.push({
        createdAt: parts[parts.length - 2],
        height: cache[i].headers.height,
        isCached: true,
        name: cache[i].headers.name,
        thumbnail: cache[i].headers.thumbnail,
        url: cache[i].url,
        width: cache[i].headers.width,
      });
    }
  }
  for (let i = 0; i < type.recording.media.length; ++i) {
    media.push({
      createdAt: type.recording.media[i].createdAt,
      height: type.recording.media[i].height,
      isCached: false,
      name: type.recording.media[i].name,
      ramIndex: i,
      thumbnail: type.recording.media[i].thumbnail,
      width: type.recording.media[i].width,
    });
  }
  return media.sort((a, b) => a.createdAt - b.createdAt);
}
async function navOptionsRecordingNameOnChange(event) {
  let media, type;
  if ('audio' === event.target.name) {
    media = audio;
    type = 'Audio';
  } else if ('whiteboard' === event.target.name) {
    media = whiteboard;
    type = 'Whiteboard';
  } else if ('video' === event.target.name) {
    media = video;
    type = 'Video';
  } else {
    return;
  }
  event.target.value = generalFileNameSanitize(event.target.value);
  if ('navOptions' + type + 'RecordingStartName' === event.target.id) {
    ((whiteboard === media && html2Canvas.isActive) || media.recording.stream) && (media.recording.currentName = event.target.value);
    media.recording.startName = event.target.value;
  } else {
    const newName = event.target.value;
    const mediaLocation = event.target.parentElement?.getAttribute('data-location');
    if ('cache' === mediaLocation) {
      const url = event.target.parentElement?.getAttribute('data-cache-url');
      if (isString(url) && '' !== url) {
        const cache = await caches.open(media.recording.cache.name);
        const oldResponse = await cache.match(url);
        if (!oldResponse) {
          console.error(type + ' not found:', url);
          return false;
        }
        const blob = await oldResponse.blob();
        const newHeaders = new Headers(oldResponse.headers);
        newHeaders.set('name', newName);
        const newResponse = new Response(blob, {
          headers: newHeaders,
        });
        await cache.delete(url);
        await cache.put(url, newResponse);
      }
    } else if ('ram' === mediaLocation) {
      const index = parseInt(event.target.parentElement?.getAttribute('data-ram-index'), 10);
      isInt(index) && media.recording.media[index] && (media.recording.media[index].name = newName);
    }
  }
}
function navOptionsRecordingNameOnInput(event) {
  event.target.value = generalFileNameSanitize(event.target.value);
}
function navOptionsRecordingNameOnKeyDown(event) {
  'Enter' === event.key && event.target.blur();
}
async function navOptionsRecordingRepositioning(type, options = {}) {
  const connectorClassName = 'navActiveOptionsConnector';
  const type2 = type.charAt(0).toUpperCase() + type.slice(1);
  const outerId = 'navActiveOptionsOuter-navOptions' + type2 + 'Recording';
  const outer = document.getElementById(outerId);
  const connector = outer?.querySelector('.' + connectorClassName);
  if (!connector || !outer) {
    return;
  }
  outer?.removeEventListener('transitionend', navActiveOptionsOuterOnTransitionEnd);
  const targetRect = document.getElementById(outerId.split('-')[1])?.getBoundingClientRect();
  if (!targetRect) {
    return;
  }
  const inputLength = outer.getElementsByTagName('input').length;
  const bodyRect = document.documentElement.getBoundingClientRect();
  const connectorLeftOld = connector.offsetLeft;
  const outerRect = options.outerRect ?? outer.getBoundingClientRect();
  const heightStart = outerRect.height;
  const leftStart = outerRect.left;
  const widthStart = outerRect.width;
  outer.style.height = outer.style.width = 'unset';
  ['whiteboard', 'video'].includes(type) && document.getElementById('navOptions' + type2 + 'RecordingActiveOptions')?.classList.remove('hasMedia');
  const outerRectMin = outer.getBoundingClientRect();
  ['whiteboard', 'video'].includes(type) && 1 < inputLength && document.getElementById('navOptions' + type2 + 'RecordingActiveOptions')?.classList.add('hasMedia');
  const outerRectMax = outer.getBoundingClientRect();
  const heightEnd = outerRectMax.height;
  const widthEnd = outerRectMax.width;
  let leftEnd = targetRect.left + targetRect.width - targetRect.width / 2 - outerRectMax.width / 2;
  leftEnd + outerRectMax.width > bodyRect.width && (leftEnd -= leftEnd + outerRectMax.width - bodyRect.width);
  leftEnd = Math.max(leftEnd, 0);
  const leftChanged = leftEnd !== outerRectMax.left;
  const connectorLeftEnd = targetRect.left + targetRect.width / 2 - nav.activeOptions.connector.width / 2 - leftEnd;
  const connectorLeftChanged = connectorLeftEnd !== connectorLeftOld;
  if (connectorLeftChanged) {
    connector.style.left = connectorLeftOld + 'px';
    connector.offsetHeight; // Force reflow to ensure new properties are applied
  }
  outer.style.height = heightStart + 'px';
  leftChanged && (outer.style.left = leftStart + 'px');
  outer.style.width = widthStart + 'px';
  outer.offsetHeight; // Force reflow to ensure new properties are applied
  const tooWidth = leftStart + widthStart > bodyRect.width;
  let transitionDuration;
  if (!tooWidth || 'audio' === type) {
    let transitionDurationHeight;
    let transitionDurationWidth;
    if (1 < inputLength || 'audio' === type) {
      const heightMax = Math.max(heightEnd, heightStart);
      const heightDiff = heightMax - outerRectMin.height;
      const heightMin = Math.min(heightEnd, heightStart);
      transitionDurationHeight = 0 < heightDiff ? (heightMax - heightMin) / heightDiff * nav.activeOptions.transitionDuration : nav.activeOptions.transitionDuration;
      const widthMax = Math.max(widthEnd, widthStart);
      const widthDiff = widthMax - outerRectMin.width;
      const widthMin = Math.min(widthEnd, widthStart);
      transitionDurationWidth = 0 < widthDiff ? (widthMax - widthMin) / widthDiff * nav.activeOptions.transitionDuration : nav.activeOptions.transitionDuration;
    } else {
      transitionDurationHeight = heightEnd ? heightStart / heightEnd * nav.activeOptions.transitionDuration : nav.activeOptions.transitionDuration;
      transitionDurationWidth = widthEnd ? widthStart / widthEnd * nav.activeOptions.transitionDuration : nav.activeOptions.transitionDuration;
    }
    transitionDuration = Math.min(Math.max(transitionDurationHeight, transitionDurationWidth), nav.activeOptions.transitionDuration);
  }
  if (connectorLeftChanged) {
    connector.style.transition = tooWidth ? 'unset' : `left ${transitionDuration}s linear`;
    connector.style.left = connectorLeftEnd + 'px';
  }
  outer.style.transition = tooWidth ? 'unset' : `height ${transitionDuration}s linear, left ${transitionDuration}s linear, width ${transitionDuration}s linear`;
  outer.style.height = heightEnd + 'px';
  leftChanged && (outer.style.left = leftEnd + 'px');
  outer.style.width = widthEnd + 'px';
}
async function navOptionsRecordingStartNameDefaultGet(type, increment = 0) {
  const cache = await cacheLoad(type.recording.cache.name);
  return i18n(audio === type ? 'audioRecording' : whiteboard === type ? 'whiteboard' : 'videoRecording') + ' ' + (cache.length + type.recording.media.length + increment + 1);
}
function navOptionsShareScreenOnClick(event) {
  if (event.target.classList.contains('navActiveButton')) {
    navOptionsShareScreenUpdate(false);
    shareScreenStop();
  } else {
    navOptionsShareScreenUpdate(true);
    shareScreenStart();
  }
}
function navOptionsShareScreenUpdate(setActive) {
  if (!nav.options.shareScreen) {
    return;
  }
  let title;
  if (setActive) {
    nav.options.shareScreen.classList.add('navActiveButton');
    title = i18n('stopScreenSharing');
  } else {
    nav.options.shareScreen.classList.remove('navActiveButton');
    title = i18n('shareScreen');
  }
  nav.options.shareScreen.setAttribute('aria-label', title);
  nav.options.shareScreen.title = title;
}
async function navOptionsVideoRecordingCurrentSet(elem) {
  const videoLocation = elem?.getAttribute('data-location');
  if ('cache' === videoLocation) {
    const url = elem?.getAttribute('data-cache-url');
    if (isString(url) && '' !== url) {
      const cache = await caches.open(video.recording.cache.name);
      const oldResponse = await cache.match(url);
      if (!oldResponse) {
        console.error('Video not found:', url);
        video.recording.current = null;
        return;
      }
      video.recording.current = {
        height: parseFloat(oldResponse.headers.get('height')),
        isCached: true,
        name: oldResponse.headers.get('name'),
        thumbnail: oldResponse.headers.get('thumbnail'),
        url,
        width: parseFloat(oldResponse.headers.get('width')),
      };
    }
  } else if ('ram' === videoLocation) {
    const index = parseInt(elem?.getAttribute('data-ram-index'), 10);
    if (!isInt(index) || !video.recording.media[index]) {
      console.error('Video not found:', index);
      video.recording.current = null;
      return;
    }
    const {height, name, width} = video.recording.media[index];
    video.recording.current = {height, isCached: false, name, thumbnail, width};
  }
}
async function navOptionsVideoRecordingOnClick(event) {
  const targetId = event.target.id;
  if (!isString(targetId)) {
    return;
  }
  let innerHTML = '';
  const outerId = 'navOptionsVideoRecordingActiveOptions';
  const pauseId = 'navOptionsVideoRecordingPause';
  const startId = 'navOptionsVideoRecordingStart';
  const stopId = 'navOptionsVideoRecordingStop';
  if (!document.getElementById(nav.activeOptions.className + 'Outer-' + targetId)) {
    let disabled = false;
    const mimeTypes = {
      mp4: 'video/mp4',
      webm: 'video/webm',
    };
    let pauseTitle = i18n('pauseVideoRecording');
    let startTitle = i18n('startVideoRecording');
    let stopTitle = i18n('endVideoRecording');
    if (null === video.recording.mimeType) {
      if (MediaRecorder.isTypeSupported(mimeTypes.webm)) {
        video.recording.mimeType = mimeTypes.webm;
      } else if (MediaRecorder.isTypeSupported(mimeTypes.mp4)) {
        video.recording.mimeType = mimeTypes.mp4;
      } else {
        disabled = true;
        pauseTitle = startTitle = stopTitle = i18n('noMimeType');
      }
    }
    const videos = await navOptionsRecordingGetAndSort(video);
    innerHTML =
      '<div class="' + (videos.length ? ' hasMedia' : '') + '" id="' + outerId + '">'
        +'<div id="navOptionsVideoRecordingStartOuter">'
          +'<input' + (disabled ? ' disabled' : '') + ' id="navOptionsVideoRecordingStartName" name="video" type="text" value="' + (video.recording.startName ?? await navOptionsRecordingStartNameDefaultGet(video)) + '">'
          +'<div' + (video.recording.stream ? ' class="none"': '') + ' id="navOptionsVideoRecordingStartInner">'
            +'<button aria-label="' + startTitle + '"' + (disabled ? ' disabled' : '') + ' id="' + startId + '" title="' + startTitle + '">'
              +'<p>' + startTitle + '</p>'
            +'</button>'
          +'</div>'
          +'<div' + (video.recording.stream ? '': ' class="none"') + ' id="navOptionsVideoRecordingStopInner">'
            +'<button aria-label="' + stopTitle + '" id="' + stopId + '" title="' + stopTitle + '">'
              +svg.stop
            +'</button>'
            +'<button aria-label="' + pauseTitle + '" id="' + pauseId + '" title="' + pauseTitle + '">'
              +svg.pause
            +'</button>'
          +'</div>'
        +'</div>';
    if (video.recording.mimeType) {
      const deleteTitle = i18n('deleteVideoRecording');
      for (let i = videos.length - 1; 0 <= i; --i) {
        const thumbnailUrl = isPngDataUrl(videos[i].thumbnail) ? generalEscapeHTML(videos[i].thumbnail).replace(/[()"'\s]/g, '') : '';
        innerHTML +=
          '<div' + (videos[i].isCached ? ' data-cache-url="' + videos[i].url + '"' : '') + ' data-location="' + (videos[i].isCached ? 'cache' : 'ram') + '"' + (videos[i].isCached ? '' : ' data-ram-index="' + videos[i].ramIndex + '"') + ' data-type="video">'
            +'<input name="video" type="text" value="' + generalEscapeHTML(videos[i].name) + '">'
            +'<button class="navOptionsVideoRecordingThumbnail" style="background-image: url(' + thumbnailUrl + ');"></button>'
            +'<button aria-label="' + deleteTitle + '" class="generalRecycleBin generalRecycleBinToTop" title="' + deleteTitle + '">'
              +svg.recycleBin
            +'</button>'
          +'</div>';
      }
    }
    innerHTML += '</div>';
  }
  navActiveButton(nav.activeOptions.className, event, innerHTML, 'navActiveButton');
  if (!innerHTML) {
    return;
  }
  if (video.recording.mimeType) {
    document.getElementById(pauseId)?.addEventListener('click', navOptionsVideoRecordingPauseOnClick);
    document.getElementById(startId)?.addEventListener('click', navOptionsVideoRecordingStartOnClick);
    document.getElementById(stopId)?.addEventListener('click', navOptionsVideoRecordingStopOnClick);
  }
  document.getElementById(startId)?.setAttribute('data-outer-id', outerId);
  const outer = document.getElementById(outerId);
  if (outer) {
    for (let elems = outer.getElementsByTagName('input'), i = elems.length - 1; 0 <= i; --i) {
      elems[i].addEventListener('change', navOptionsRecordingNameOnChange);
      elems[i].addEventListener('input', navOptionsRecordingNameOnInput);
      elems[i].addEventListener('keydown', navOptionsRecordingNameOnKeyDown);
    }
  }
}
function navOptionsVideoRecordingPauseOnClick(event) {
  event.target.blur();
  if ('paused' === video.recording.mediaRecorder.state) {
    video.recording.mediaRecorder?.resume();
  } else if ('recording' === video.recording.mediaRecorder.state) {
    video.recording.mediaRecorder?.pause();
  }
}
async function navOptionsVideoRecordingStartOnClick(event) {
  event.target.blur();
  const chunks = [];
  video.recording.currentName = generalFileNameSanitize(document.getElementById('navOptionsVideoRecordingStartName')?.value) ?? await navOptionsRecordingStartNameDefaultGet(video);
  try {
    let height;
    const ratio = window.screen.height / window.screen.width;
    let width;
    if (1 > ratio) {
      width = video.recording.maxSize < window.screen.width ? video.recording.maxSize : window.screen.width;
      height = width * ratio;
    } else  {
      height = video.recording.maxSize < window.screen.height ? video.recording.maxSize : window.screen.height;
      width = height * ratio;
    }
    // Prompt user to select tab/window/screen
    video.recording.stream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: {
        frameRate: {ideal: video.recording.frameRate},
        height: {ideal: Math.round(height)},
        width: {ideal: Math.round(width)},
      },
    });
    nav.options.videoRecording?.classList.add('navButtonRecording');
    const videoTrack = video.recording.stream.getVideoTracks()[0];
    const settings = videoTrack.getSettings();
    const actualHeight = settings.height;
    const actualWidth = settings.width;
    // Set up MediaRecorder
    video.recording.mediaRecorder = new MediaRecorder(video.recording.stream, {
      mimeType: video.recording.mimeType,
    });
    video.recording.mediaRecorder.ondataavailable = (event) => {
      event.data.size && chunks.push(event.data);
    };
    video.recording.mediaRecorder.onstop = async () => {
      nav.options.videoRecording?.classList.remove('navButtonRecording');
      video.recording.mediaRecorder = video.recording.startName = video.recording.stream = null;
      const blob = new Blob(chunks, {type: video.recording.mimeType});
      chunks.length = 0;
      let thumbnail = '';
      try {
        thumbnail = await generalVideoThumbnailGet(blob);
      } catch (error) {
        console.error('Failed to generate thumbnail:', error);
      }
      navOptionsRecordingAdd(blob, event, actualHeight, thumbnail, 'video', actualWidth);
      document.getElementById('navOptionsVideoRecordingStartInner')?.classList.remove('none');
      document.getElementById('navOptionsVideoRecordingStopInner')?.classList.add('none');
    };
    video.recording.mediaRecorder.start(video.recording.collectInterval);
    document.getElementById('navOptionsVideoRecordingStartInner')?.classList.add('none');
    document.getElementById('navOptionsVideoRecordingStopInner')?.classList.remove('none');
  } catch (error) {
    'Permission denied by user' !== error.message && console.error('Error starting recording:', error);
  }
}
async function navOptionsVideoRecordingStopOnClick(event) {
  event.target.blur();
  video.recording.mediaRecorder && 'inactive' !== video.recording.mediaRecorder.state && video.recording.mediaRecorder.stop();
  video.recording.stream?.getTracks().forEach(track => track.stop()); // End the stream
  document.getElementById('navOptionsVideoRecordingStartName')?.setAttribute('value', await navOptionsRecordingStartNameDefaultGet(video, 1));
}
async function navOptionsVideoRecordingThumbnailOnClick(event) {
  event.target.blur();
  const parent = document.getElementById('navOptionsVideoRecordingActiveOptions');
  if (!parent) {
    return;
  }
  await navOptionsVideoRecordingCurrentSet(event.target.parentElement);
  if (!video.recording.current) {
    return;
  }
  nav.activeOptions.keep = true;
  const backgroundId = 'galleryBackground';
  let background = document.getElementById(backgroundId);
  if (background) {
    background.textContent = '';
  } else {
    background = document.createElement('div');
    background.id = backgroundId;
  }
  const outer = document.createElement('div');
  outer.id = 'galleryOuter';
  const top = document.createElement('div');
  top.id = 'galleryTop';
  const title = document.createElement('h3');
  title.id = 'galleryTitle';
  title.textContent = video.recording.current.name;
  top.appendChild(title);
  const close = document.createElement('button');
  close.id = 'galleryClose';
  top.appendChild(close);
  outer.appendChild(top);
  const inner = document.createElement('div');
  inner.id = 'galleryInner';
  const videoOuter = document.createElement('div');
  videoOuter.id = 'galleryVideoOuter';
  const videoElem = document.createElement('video');
  videoElem.addEventListener('ended', galleryVideoOnEnded);
  videoElem.addEventListener('pause', galleryVideoSyncSend);
  videoElem.addEventListener('play', galleryVideoOnPlay);
  videoElem.addEventListener('seeking', galleryVideoOnSeeking);
  videoElem.addEventListener('ratechange', galleryVideoSyncSend);
  videoElem.addEventListener('timeupdate', galleryVideoOnTimeUpdate);
  videoElem.addEventListener('volumechange', galleryVideoSyncSend);
  galleryVideoSyncHeartBeatCreate();
  videoElem.controls = true;
  videoElem.controlsList = 'nodownload';
  videoElem.id = 'galleryVideo';
  videoElem.playsInline = true;
  videoElem.style.aspectRatio = video.recording.current.width / video.recording.current.height;
  videoElem.style.width = video.recording.current.width;
  let blob;
  if (video.recording.current.isCached) {
    videoElem.setAttribute('data-cache-url', video.recording.current.url);
    videoElem.setAttribute('data-location', 'cache');
    const cache = await caches.open(video.recording.cache.name);
    const response = await cache.match(video.recording.current.url);
    blob = await response.blob();
  } else {
    videoElem.setAttribute('data-location', 'ram');
    videoElem.setAttribute('data-ram-index', video.recording.current.ramIndex);
    blob = video.recording.current.blob;
  }
  videoElem.src = URL.createObjectURL(blob);
  videoElem.type = blob.type;
  videoElem.load();
  videoOuter.appendChild(videoElem);
  inner.appendChild(videoOuter);
  const thumbnails = document.createElement('div');
  thumbnails.id = 'galleryThumbnails';
  const videos = await navOptionsRecordingGetAndSort(video);
  for (let i = 0, ramIndex = 0; i < videos.length; ++i) {
    const thumbnail = document.createElement('button');
    thumbnail.classList.add('galleryThumbnail');
    if (videos[i].isCached) {
      if (video.recording.current.url === videos[i].url) {
        thumbnail.classList.add('selected');
        thumbnail.disabled = true;
      }
      thumbnail.setAttribute('data-cache-url', videos[i].url);
      thumbnail.setAttribute('data-location', 'cache');
    } else {
      if (ramIndex === videos[i].ramIndex) {
        thumbnail.classList.add('selected');
        thumbnail.disabled = true;
      }
      thumbnail.setAttribute('data-location', 'ram');
      thumbnail.setAttribute('data-ram-index', ramIndex++);
    }
    thumbnail.style.backgroundImage = 'url(' + videos[i].thumbnail + ')';
    thumbnails.appendChild(thumbnail);
  }
  inner.appendChild(thumbnails);
  outer.appendChild(inner);
  background.appendChild(outer);
  document.body.appendChild(background);
}
async function navOptionsWhiteboardRecordingOnClick(event) {
  const targetId = event.target.id;
  if (!isString(targetId)) {
    return;
  }
  let innerHTML = '';
  const outerId = 'navOptionsWhiteboardRecordingActiveOptions';
  const startId = 'navOptionsWhiteboardRecordingStart';
  if (!document.getElementById(nav.activeOptions.className + 'Outer-' + targetId)) {
    const deleteTitle = i18n('deletePhoto');
    const photos = await navOptionsRecordingGetAndSort(whiteboard);
    const startTitle = i18n('photoOfWhiteboard');
    innerHTML =
      '<div' + (photos.length ? ' class="hasMedia"' : '') + ' id="' + outerId + '">'
        +'<div id="navOptionsWhiteboardRecordingStartOuter">'
          +'<input id="navOptionsWhiteboardRecordingStartName" name="whiteboard" type="text" value="' + (whiteboard.recording.startName ?? await navOptionsRecordingStartNameDefaultGet(whiteboard)) + '">'
          +'<div id="navOptionsWhiteboardRecordingStartInner">'
            +'<button aria-label="' + startTitle + '" id="' + startId + '" title="' + startTitle + '">'
              +'<p>' + startTitle + '</p>'
            +'</button>'
          +'</div>'
        +'</div>';
    for (let i = photos.length - 1; 0 <= i; --i) {
      const thumbnailUrl = isPngDataUrl(photos[i].thumbnail) ? generalEscapeHTML(photos[i].thumbnail).replace(/[()"'\s]/g, '') : '';
      innerHTML +=
        '<div' + (photos[i].isCached ? ' data-cache-url="' + photos[i].url + '"' : '') + ' data-location="' + (photos[i].isCached ? 'cache' : 'ram') + '"' + (photos[i].isCached ? '' : ' data-ram-index="' + photos[i].ramIndex + '"') + ' data-type="whiteboard">'
          +'<input name="whiteboard" type="text" value="' + generalEscapeHTML(photos[i].name) + '">'
          +'<button class="navOptionsWhiteboardRecordingThumbnail" style="background-image: url(' + thumbnailUrl + ');"></button>'
          +'<button aria-label="' + deleteTitle + '" class="generalRecycleBin generalRecycleBinToTop" title="' + deleteTitle + '">'
            +svg.recycleBin
          +'</button>'
        +'</div>';
    }
    innerHTML += '</div>';
  }
  navActiveButton(nav.activeOptions.className, event, innerHTML, 'navActiveButton');
  if (!innerHTML) {
    return;
  }
  document.getElementById(startId)?.setAttribute('data-outer-id', outerId);
  const outer = document.getElementById(outerId);
  if (outer) {
    for (let elems = outer.getElementsByTagName('input'), i = elems.length - 1; 0 <= i; --i) {
      elems[i].addEventListener('change', navOptionsRecordingNameOnChange);
      elems[i].addEventListener('input', navOptionsRecordingNameOnInput);
      elems[i].addEventListener('keydown', navOptionsRecordingNameOnKeyDown);
    }
  }
}
async function navOptionsWhiteboardRecordingStartOnClick(event) {
  event.target.blur();
  if (!wb.inner) {
    notificationsShow(i18n('couldNotTakeAPhoto'));
    return;
  }
  event.target.disabled = html2Canvas.isActive = true;
  if (wb.outer?.classList.contains('none')) {
    wb.outer.classList.add('hideBelow');
    wb.outer.classList.remove('none');
  }
  whiteboard.recording.currentName = generalFileNameSanitize(document.getElementById('navOptionsWhiteboardRecordingStartName')?.value) ?? await navOptionsRecordingStartNameDefaultGet(whiteboard);
  html2canvas(wb.inner, html2Canvas.config).then(async (canvas) => {
    !videoRemoteOuter?.classList.contains('none') && wb.outer?.classList.add('none');
    wb.outer?.classList.remove('hideBelow');
    event.target.disabled = html2Canvas.isActive = false;
    document.getElementById('navOptionsWhiteboardRecordingStartName')?.setAttribute('value', await navOptionsRecordingStartNameDefaultGet(whiteboard, 1));
    //const downloadLink = document.createElement('a');
    //downloadLink.download = (whiteboard.recording.currentName ?? await navOptionsRecordingStartNameDefaultGet(whiteboard)) + '.' + whiteboard.recording.type;
    //downloadLink.href = canvas.toDataURL('image/' + whiteboard.recording.type);
    //downloadLink.click();
    canvas.toBlob(blob => {
      let thumbnail = '';
      try {
        thumbnail = canvas.toDataURL('image/' + whiteboard.recording.type);
      } catch (error) {
        console.error('Failed to generate thumbnail:', error);
      }
      navOptionsRecordingAdd(blob, event, canvas.height, thumbnail, 'whiteboard', canvas.width);
    }, 'image/' + whiteboard.recording.type);
  })
  .catch(error => {
    notificationsShow(i18n('couldNotTakeAPhoto'));
  });
}
function navTextColorPickerButtonOnClick(event) {
  navActiveOptionsClose();
  wbModeChange('textAdd');
  const classActive = 'navTextColorPickerColorActive';
  if (event.target?.classList.contains(classActive)) {
    return;
  }
  for (let elems = document.querySelectorAll('.' + classActive), i = 0; i < elems.length; ++i) {
    elems[i].classList.remove(classActive);
  }
  event.target?.classList.add(classActive);
  const colorIndex = parseInt(event.target?.id?.split('-')[1], 10);
  isNumber(colorIndex) && (wb.text.colorIndex = colorIndex);
  const rgb = getComputedStyle(event.target).backgroundColor;
  if (!rgb) {
    return;
  }
  const hex = generalRGBToHexGet(rgb);
  hex && (wb.text.color = hex);
}
function navTextColorPickerOnClick(event) {
  const targetId = event.target?.id;
  if (!isString(targetId)) {
    return;
  }
  let innerHTML = '';
  if (!document.getElementById(nav.activeOptions.className + 'Outer-' + targetId)) {
    innerHTML = '<div id="navTextColorPickerColorOuter">';
    for (let i = 0; i < wb.text.colorMax; ++i) {
      innerHTML += '<button' + (wb.text.colorIndex === i ? ' class="navTextColorPickerColorActive"' : '') + ' id="navTextColorPickerColor-' + i + '"></button>';
    }
    innerHTML += '</div>';
  }
  navActiveButton(nav.activeOptions.className, event, innerHTML, 'navActiveButton');
}
function navTextFamilyButtonOnClick(event) {
  navActiveOptionsClose();
  wbModeChange('textAdd');
  for (let buttons = event.target.parentElement.querySelectorAll('.navTextFamilyButton'), i = 0; i < buttons.length; ++i) {
    buttons[i].classList.remove('navTextFamilyButtonActive');
    nav.text.family.classList.remove('family' + buttons[i].textContent.replaceAll(' ', '').replaceAll('-', ''));
  }
  event.target.classList.add('navTextFamilyButtonActive');
  nav.text.family.classList.add('family' + event.target.textContent.replaceAll(' ', '').replaceAll('-', ''));
  const span = document.createElement('span');
  span.textContent = event.target.textContent;
  nav.text.family.textContent = '';
  nav.text.family.appendChild(span);
  wb.text.family = event.target.textContent.includes(' ') ? "'" + event.target.textContent + "'" : event.target.textContent;
  navTextSizeFamily();
}
function navTextFamilyOnClick(event) {
  if (event.target.querySelector('.spinner')) {
    return;
  }
  const targetId = event.target?.id;
  if (!isString(targetId)) {
    return;
  }
  let innerHTML = '';
  if (!document.getElementById(nav.activeOptions.className + 'Outer-' + targetId)) {
    innerHTML = '<div id="navTextFamilyOuter">';
    for (let i = 0; i < fonts.length; ++i) {
      innerHTML += '<button class="family' + fonts[i].replaceAll(' ', '').replaceAll('-', '') + ' navTextFamilyButton' + (wb.text.family.replaceAll("'", '') === fonts[i] ? ' navTextFamilyButtonActive' : '') + '">' + generalEscapeHTML(fonts[i]) + '</button>';
    }
    innerHTML += '</div>';
  }
  navActiveButton(nav.activeOptions.className, event, innerHTML, 'navActiveButton');
}
function navTextSizeFamily() {
  nav.text.sizeCurrent?.classList.forEach(className => {
    className.startsWith('family') && nav.text.sizeCurrent.classList.remove(className);
  });
  nav.text.sizeCurrent?.classList.add('family' + wb.text.family.replaceAll("'", '').replaceAll(' ', '').replaceAll('-', ''));
}
function navTextSizeInputChanged(event) {
  const value = event.target.value;
  if ('' === value) {
    return;
  }
  if (['-', '+'].includes(event.data)) {
    event.target.value = event.target.defaultValue;
    return;
  }
  const size = parseInt(value, 10);
  if (!isInt(size)) {
    event.target.value = event.target.defaultValue;
    return;
  }
  if (size < 1) {
    event.target.style.fontSize = wb.text.size.min + 'px';
    event.target.value = '' + wb.text.size.min;
    return;
  }
  if (size > wb.text.size.max) {
    event.target.style.fontSize = wb.text.size.max + 'px';
    event.target.value = '' + wb.text.size.max;
    return;
  }
  if (size < wb.text.size.min) {
    event.target.style.fontSize = wb.text.size.min + 'px';
    return;
  }
  event.target.style.fontSize = value + 'px';
  event.target.defaultValue = value;
  nav.text.sizeCurrent.textContent = wb.text.size.current = size;
  wbModeChange('textAdd');
}
function navTextSizeInputOnChange(event) {
  const value = event.target.value;
  if ('' === event.target.value) {
    wb.text.size.current = parseInt(event.target.defaultValue, 10);
    return;
  }
  nav.text.sizeCurrent.textContent = wb.text.size.current = Math.min(Math.max(parseInt(value, 10), wb.text.size.min), wb.text.size.max);
  wbModeChange('textAdd');
}
function navTextSizeInputOnInput(event) {
  navTextSizeInputChanged(event);
}
function navTextSizeInputOnKeyDown(event) {
  if ('Enter' === event.key) {
    event.target.blur();
    navTextSizeInputChanged(event);
    navActiveOptionsClose();
  }
}
function navTextSizeOnClick(event) {
  const targetId = event.target?.id;
  if (!isString(targetId)) {
    return;
  }
  let innerHTML = '';
  if (!document.getElementById(nav.activeOptions.className + 'Outer-' + targetId)) {
    innerHTML =
      '<div id="navTextSizeOuter">'
        +'<input class="family' + wb.text.family.replaceAll("'", '').replaceAll(' ', '').replaceAll('-', '') + '" id="navTextSizeInput" max="' + wb.text.size.max + '" min="' + wb.text.size.min + '" style="font-size: ' + wb.text.size.current + 'px; line-height: ' + (wb.text.size.max + 15) + 'px;" type="number" value="' + wb.text.size.current + '">'
      +'</div>';
  }
  navActiveButton(nav.activeOptions.className, event, innerHTML, 'navActiveButton');
  document.getElementById('navTextSizeInput')?.addEventListener('change', navTextSizeInputOnChange);
  document.getElementById('navTextSizeInput')?.addEventListener('input', navTextSizeInputOnInput);
  document.getElementById('navTextSizeInput')?.addEventListener('keydown', navTextSizeInputOnKeyDown);
}
async function navVideoCameraOnClick(event) {
  if (!modal.inner) {
    return;
  }
  modal.title && (modal.title.textContent = i18n('cameraSettings'));
  modal.inner.innerHTML =
    '<label class="pointer" for="videoLocalCameraOn">'
      +'<input' + (camera.local.on ? ' checked="checked"' : '') + ' id="videoLocalCameraOn" type="checkbox">'
      +'<span>' + i18n('turnOnLocalCamera') + '</span>'
    +'</label>'
    +'<br><br>'
    +'<select class="hidden" data-device="camera" id="videoLocalCameraList"></select>'
    +'<br><br>';
  modalOpen(event);
  await rtcMediaDevicesPermissionCheck();
  await rtcMediaDevicesAvailable('camera');
  navVideoLocalList('camera');
}
function navVideoLocalList(deviceType) {
  const list = document.getElementById('videoLocal' + deviceType.charAt(0).toUpperCase() + deviceType.substring(1) + 'List');
  if (!list) {
    return;
  }
  const local = window[deviceType].local;
  if ('granted' === local.permission.state) {
    list.textContent = '';
    local.list.forEach(device => {
      const option = document.createElement('option');
      (local.deviceId === device.deviceId || ('default' === device.deviceId && null === local.deviceId)) && (option.selected = 'selected');
      option.text = device.label || `${i18n(deviceType)} ${list.options.length}`;
      option.value = device.deviceId;
      list.appendChild(option);
    });
    list.addEventListener('change', videoLocalListOnChange);
    list.classList.remove('hidden');
  } else {
    list.classList.add('hidden');
    list.textContent = '';
  }
}
function navVideoPartnerList(deviceId, devices, deviceType) {
  const list = document.getElementById('videoPartner' + deviceType.charAt(0).toUpperCase() + deviceType.substring(1) + 'List');
  if (!list) {
    return;
  }
  if (devices.length) {
    list.textContent = '';
    devices.forEach(device => {
      const option = document.createElement('option');
      (deviceId === device.deviceId || ('default' === device.deviceId && null === deviceId)) && (option.selected = 'selected');
      option.text = device.label || `${i18n(deviceType)} ${list.options.length}`;
      option.value = device.deviceId;
      list.appendChild(option);
    });
    list.addEventListener('change', videoPartnerListOnChange);
    list.classList.remove('hidden');
  } else {
    list.classList.add('hidden');
    list.textContent = '';
  }
}
async function navVideoMicrophoneOnClick(event) {
  if (!modal.inner) {
    return;
  }
  modal.title && (modal.title.textContent = i18n('microphoneSettings'));
  modal.inner.innerHTML =
    '<label class="pointer" for="videoLocalMicrophoneOn">'
      +'<input' + (microphone.local.on ? ' checked="checked"' : '') + ' id="videoLocalMicrophoneOn" type="checkbox">'
      +'<span>' + i18n('turnOnLocalMicrophone') + '</span>'
    +'</label>'
    +'<br>'
    +'<label class="pointer" for="videoRemoteMicrophoneOn">'
      +'<input' + (microphone.remote.on ? ' checked="checked"' : '') + ' id="videoRemoteMicrophoneOn" type="checkbox">'
      +'<span>' + i18n('turnOnRemoteMicrophone') + '</span>'
    +'</label>'
    +'<br><br>'
    +'<select class="hidden" data-device="microphone" id="videoLocalMicrophoneList"></select>'
    +'<br><br>';
  modalOpen(event);
  await rtcMediaDevicesPermissionCheck();
  await rtcMediaDevicesAvailable('microphone');
  navVideoLocalList('microphone');
}
function notificationsShow(text, stay) {
  if (!notifications.outer) {
    return;
  }
  const notification = document.createElement('div');
  notification.id = 'notification' + (notifications.currentId + 1 < Number.MAX_SAFE_INTEGER ? notifications.currentId++ : notifications.currentId = 0);
  notification.textContent = text;
  notifications.outer.appendChild(notification);
  notifications.outer.scrollTop = notifications.outer.scrollHeight; // Scroll to bottom
  !stay && setTimeout(() => {document.getElementById(notification.id)?.remove();}, notifications.duration);
  return notification.id;
}
// Called once the peerConnection is created and ready
async function rtcAddQueuedCandidates(partnerId) {
  const queue = rtc.iceCandidatesQueues.get(partnerId) || [];
  //console.log(`[CANDIDATE-HANDLER] Processing queued candidates for partner ${partnerId}:`, queue);
  const peerConnection = rtc.peerConnections.get(partnerId);
  while (queue.length) {
    const candidateData = queue.shift();
    try {
      if (peerConnection && peerConnection.remoteDescription) {
        const iceCandidate = new RTCIceCandidate(candidateData);
        await peerConnection.addIceCandidate(iceCandidate);
      } else {
        console.warn(`[CANDIDATE-HANDLER] PeerConnection or remoteDescription not ready for partner ${partnerId}. Re-queuing candidate.`);
        queue.unshift(candidateData);
        break;
      }
    } catch (error) {
      console.error(`[CANDIDATE-HANDLER] Error adding ICE candidate for partner ${partnerId}:`, error);
    }
  }
  rtc.iceCandidatesQueues.set(partnerId, queue);
}
function rtcClear() {
  rtc.answerQueues.clear();
  rtc.iceCandidatesQueues.clear();
  rtc.isCreatingPCs.clear();
  rtc.makingOffers.clear();
  rtc.offerQueues.clear();
  rtc.peerConnections.clear();
  rtc.politeStates.clear();
  rtc.trackMeta.clear();
}
async function rtcConfigSet() {
  try {
    const response = await fetch('/api/get-turn-credentials');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Always include a public STUN server as fallback
    const iceServers = [...data.iceServers];
    rtc.config = {
      iceServers,
      //iceTransportPolicy: 'relay', // force TURN
    };
    // console.log('[CONFIG] ICE servers fetched successfully:', rtc.config);
  } catch (error) {
    console.error('[CONFIG] Failed to fetch ICE servers:', error);
    throw error; // stop PeerConnection creation if fetch fails
  }
}
async function rtcCreatePeerConnectionInstance(partnerId) {
  if (rtc.peerConnections.has(partnerId)) {
    console.log(`[PC-CREATE] PeerConnection for partner ${partnerId} already exists. Closing it.`);
    rtc.peerConnections.get(partnerId).close();
    rtc.peerConnections.delete(partnerId);
  }
  camera.remote.tracks.delete(partnerId);
  dataChannels.delete(partnerId);
  gallery.video.recordedTrackAdded.delete(partnerId);
  microphone.remote.tracks.delete(partnerId);
  shareScreen.remote.tracks.delete(partnerId);
  await rtcConfigSet();
  if (!rtc.config || !Array.isArray(rtc.config.iceServers) || !rtc.config.iceServers.length) {
    console.error('[PC-CREATE] Critical: Invalid RTCPeerConnection rtc.config. Cannot create PC.');
    throw new Error('Invalid RTCPeerConnection configuration.');
  }
  const peerConnection = new RTCPeerConnection(rtc.config);
  peerConnection.custom = {partnerId};
  rtc.peerConnections.set(partnerId, peerConnection);
  peerConnection.addEventListener('datachannel', (event) => rtcHandleDataChannelEvent(event, partnerId));
  peerConnection.onicecandidate = (event) => {
    event.candidate && wsSend({candidate: event.candidate, type: 'candidate', targetId: partnerId});
  };
  peerConnection.onnegotiationneeded = async () => {
    if (rtc.makingOffers.get(partnerId)) return;
    rtc.makingOffers.set(partnerId, true);
    try {
      await peerConnection.setLocalDescription(); // Auto-creates offer if stable
      const trackMeta = rtcLocalTrackMetaGet();
      wsSend({
        sdp: peerConnection.localDescription.sdp,
        targetId: partnerId,
        trackMeta,
        type: 'offer',
      });
    } catch (error) {
      console.error(`[PC-EVENT] Negotiation error for partner ${partnerId}:`, error);
    } finally {
      rtc.makingOffers.set(partnerId, false);
    }
  };
  peerConnection.onsignalingstatechange = async () => {
    if ('have-local-offer' === peerConnection.signalingState && rtc.answerQueues.get(partnerId)?.length) {
      const nextAnswer = rtc.answerQueues.get(partnerId).shift();
      await ws.onmessage({data: JSON.stringify(nextAnswer)});
    } else if ('stable' === peerConnection.signalingState && rtc.offerQueues.get(partnerId)?.length) {
      const nextOffer = rtc.offerQueues.get(partnerId).shift();
      await rtcHandleOffer(nextOffer, partnerId);
    }
  };
  peerConnection.ontrack = (event) => {
    rtcHandleTrackEvent(event, partnerId);
    event.track.onended = () => {
      const remoteStream = camera.remote.streams.get(partnerId) || microphone.remote.streams.get(partnerId);
      remoteStream?.removeTrack(event.track);
    };
  };
  await rtcLocalAcquireMediaAndAddTracks();
  return peerConnection;
}
function rtcHandleDataChannelEvent(event, partnerId) {
  //console.log(`[PC-EVENT] datachannel event received for partner ${partnerId}. Channel label:`, event.channel.label);
  dataChannelInitialize(event.channel, partnerId);
}
async function rtcHandleOffer(message, partnerId) {
  const {sdp} = message;
  if (!sdp || !isString(sdp) || !sdp.trim().startsWith('v=')) {
    console.warn(`[OFFER-HANDLER] Invalid SDP for partner ${partnerId}`);
    return;
  }
  !rtc.peerConnections.has(partnerId) && await rtcCreatePeerConnectionInstance(partnerId);
  const peerConnection = rtc.peerConnections.get(partnerId);
  // Detect glare/collision
  const isMakingOffer = rtc.makingOffers.get(partnerId);
  const collision = isMakingOffer || 'stable' !== peerConnection.signalingState;
  // Impolite peer ignores colliding offers; polite peer accepts them
  if (!rtc.politeStates.get(partnerId) && collision) {
    //console.log(`[OFFER-HANDLER] Ignoring colliding offer from partner ${partnerId} (impolite)`);
    return;
  }
  try {
    const remoteDesc = new RTCSessionDescription({ type: 'offer', sdp });
    await peerConnection.setRemoteDescription(remoteDesc);
    await rtcAddQueuedCandidates(partnerId);
    await peerConnection.setLocalDescription(); // Auto-creates answer
    const trackMeta = rtcLocalTrackMetaGet();
    wsSend({
      sdp: peerConnection.localDescription.sdp,
      targetId: partnerId,
      trackMeta,
      type: 'answer',
    });
  } catch (error) {
    console.error(`[OFFER-HANDLER] Error for partner ${partnerId}:`, error);
    // Optional: restart connection on fatal errors
    setTimeout(() => videoEnd(partnerId), 1E3);
  }
}
function rtcHandleOfferQueue(message, partnerId) {
  !rtc.offerQueues.has(partnerId) && rtc.offerQueues.set(partnerId, []);
  rtc.offerQueues.get(partnerId).push(message);
  setTimeout(() => {
    const queue = rtc.offerQueues.get(partnerId) || [];
    const index = queue.indexOf(message);
    if (index !== -1) {
      console.warn(`[OFFER-HANDLER] Offer timed out for partner ${partnerId}, removing from queue.`);
      queue.splice(index, 1);
      rtc.offerQueues.set(partnerId, queue);
    }
  }, 1E4);
}
function rtcHandleTrackEvent(event, partnerId) {
  if (!event.streams?.length) {
    console.log('[PC-EVENT] no stream in event');
    return;
  }
  // Determine type from previously-received metadata if available
  const partnerMeta = rtc.trackMeta.get(partnerId) || new Map();
  const metaType = partnerMeta.get(event.streams[0].id);
  // Ensure remote stream containers exist
  if ('video' === event.track.kind) {
    !camera.remote.streams.has(partnerId) && camera.remote.streams.set(partnerId, new MediaStream());
  } else if ('audio' === event.track.kind) {
    !microphone.remote.streams.has(partnerId) && microphone.remote.streams.set(partnerId, new MediaStream());
  }
  if ('video' === event.track.kind) {
    if (!metaType) {
      console.log('[PC-EVENT] no metaType for video track');
      return;
    }
    if (!['camera', 'recording', 'screen'].includes(metaType.type)) {
      console.log('[PC-EVENT] metaType.type is invalid for video:', metaType.type);
      return;
    }
    //console.log(`[PC-EVENT] Video track received. Type: ${metaType.type}, Dimensions: ${metaType.width}x${metaType.height}`);
    const clonedStream = new MediaStream([event.track]);
    if (['camera', 'screen'].includes(metaType.type)) {
      document.getElementById('top')?.removeAttribute('inert');
      document.getElementsByTagName('main')[0]?.removeAttribute('inert');
      // Store video track in dedicated video stream
      const remoteVideoStream = camera.remote.streams.get(partnerId);
      const existingVideoTrack = remoteVideoStream.getVideoTracks()[0];
      existingVideoTrack && remoteVideoStream.removeTrack(existingVideoTrack);
      remoteVideoStream.addTrack(event.track);
      video.recording.media.forEach(videoObject => videoObject.blob && URL.revokeObjectURL(videoObject.blob));
      'video' === generalPageGet() && videoRemoteOuter?.classList.remove('none');
    } else if ('recording' === metaType.type) {
      videoOthersOuter.classList.add('none');
      videoRemote.srcObject = null;
      videoRemote.pause();
      document.getElementById('top') && (document.getElementById('top').inert = true);
      document.getElementsByTagName('main')[0] && (document.getElementsByTagName('main')[0].inert = true);
      let background = document.getElementById('galleryBackgroundBeta');
      if (background) {
        background.textContent = '';
      } else {
        background = document.createElement('div');
        background.id = 'galleryBackgroundBeta';
      }
      const outer = document.createElement('div');
      outer.id = 'galleryOuter';
      const videoElem = document.createElement('video');
      videoElem.addEventListener('loadedmetadata', () => videoElem && (videoElem.style.height = ''), {once: true});
      videoElem.controlsList = 'nodownload';
      videoElem.id = 'galleryVideo';
      videoElem.playsInline = true;
      videoElem.style.height = metaType.height + 'px';
      videoElem.style.width = metaType.width + 'px';
      videoElem.srcObject = clonedStream;
      if (null !== gallery.video.muted) {
        videoElem.muted = gallery.video.muted;
        gallery.video.muted = null;
      }
      if (null !== gallery.video.playbackRate) {
        videoElem.playbackRate = gallery.video.playbackRate;
        gallery.video.playbackRate = null;
      }
      if (null !== gallery.video.volume) {
        videoElem.volume = gallery.video.volume;
        gallery.video.volume = null;
      }
      videoElem.play().catch(error => {});
      outer.appendChild(videoElem);
      background.appendChild(outer);
      document.body.appendChild(background);
      return;
    }
  } else if ('audio' === event.track.kind) {
    const remoteStream = microphone.remote.streams.get(partnerId);
    const existingTrack = remoteStream.getTrackById(event.track.id);
    if (!existingTrack) {
      remoteStream.addTrack(event.track);
    } else if (existingTrack.enabled !== event.track.enabled) {
      remoteStream.removeTrack(existingTrack);
      remoteStream.addTrack(event.track);
    }
    videoOthersOuter.classList.add('none');
  }
  metaType && ['camera', 'screen'].includes(metaType.type) && rtcHandleTrackEventCombineMedia(partnerId);
  // Track ended cleanup
  event.track.onended = () => {
    const remoteStream = camera.remote.streams.get(partnerId) || microphone.remote.streams.get(partnerId);
    remoteStream?.removeTrack(event.track);
    // If this was the last track, optionally re-combine
    metaType && ['camera', 'screen'].includes(metaType.type) && rtcHandleTrackEventCombineMedia(partnerId);
  };
}
function rtcHandleTrackEventCombineMedia(partnerId) {
  const audioStream = microphone.remote.streams.get(partnerId);
  const videoStream = camera.remote.streams.get(partnerId);
  const combined = new MediaStream();
  if (audioStream) {
    const at = audioStream.getAudioTracks()[0];
    at && combined.addTrack(at);
  }
  if (videoStream) {
    const videoTrack = videoStream.getVideoTracks()[0];
    videoTrack && combined.addTrack(videoTrack);
  }
  if (combined.getVideoTracks().length) {
    videoRemote.srcObject = combined;
    videoOthersOuter.classList.remove('none');
  } else if (combined.getTracks().length) {
    videoOthersOuter.classList.add('none');
    videoRemote.srcObject = combined;
  } else {
    videoOthersOuter.classList.add('none');
    videoRemote.srcObject = null;
  }
}
async function rtcLocalAcquire() {
  if (rtc.media.isAcquiring) {
    return;
  }
  rtc.media.isAcquiring = true;
  try {
    await rtcLocalMediaGet();
    if (camera.local.on && videoLocalHasVideo()) {
      videoLocal.srcObject = localCameraStream;
      videoLocal.play().catch(() => {});
    } else {
      videoLocalTransition();
    }
    await rtcLocalAcquireMediaAndAddTracks();
  } finally {
    rtc.media.isAcquiring = false;
  }
}
async function rtcLocalAcquireMediaAndAddTracks() {
  try {
    for (const [partnerId, pc] of rtc.peerConnections) {
      // Add new tracks in order: audio -> video (camera or screen)
      const audioTrack = localStream?.getAudioTracks()[0];
      const videoTrack = localStream?.getVideoTracks()[0];
      // Add audio
      if (audioTrack) {
        let sender = microphone.remote.tracks.get(partnerId);
        if (!sender) {
          sender = pc.addTrack(audioTrack, localStream);
          microphone.remote.tracks.set(partnerId, sender);
        } else {
          await sender.replaceTrack(audioTrack);
        }
      }
      // Add video
      if (videoTrack) {
        let sender = camera.remote.tracks.get(partnerId);
        if (!sender) {
          // Audio-only -> now video available
          sender = pc.addTrack(videoTrack, localStream);
          camera.remote.tracks.set(partnerId, sender);
        } else if (sender.track !== videoTrack) {
          // Replace existing (stale) video track
          await sender.replaceTrack(videoTrack);
        }
        if (shareScreen.local.on) {
          shareScreen.remote.tracks.set(partnerId, sender);
        } else {
          camera.remote.tracks.set(partnerId, sender);
          video.recording.current && gallery.video.recordedTrackAdded.set(partnerId, true);
        }
      }
    }
    // Polling
    camera.local.on ? rtcMediaPollingStart() : rtcMediaPollingStop();
    return true;
  } catch (error) {
    console.error('[MEDIA-ACQ] Failed:', error);
    camera.local.on && !shareScreen.local.on ? rtcMediaPollingStart() : rtcMediaPollingStop();
    return false;
  }
}
async function rtcLocalMediaGet() {
  const audioConstraints = microphone.local.on
    ? (microphone.local.deviceId ? {deviceId: {exact: microphone.local.deviceId}} : true)
    : false;
  try {
    if (!camera.local.on && !microphone.local.on) {
      return;
    }
    const videoConstraints = camera.local.on
      ? (camera.local.deviceId ? {deviceId: {exact: camera.local.deviceId}, frameRate: {ideal: video.local.frameRate}} : true)
      : false;
    const originalStream = await navigator.mediaDevices.getUserMedia({
      audio: audioConstraints,
      video: videoConstraints,
    });
    // Ensure only one video track
    const videoTracks = originalStream.getVideoTracks();
    // Update dimensions from original track
    if (videoTracks.length) {
      const settings = videoTracks[0].getSettings();
      camera.local.dimensions = {height: settings.height, width: settings.width};
      if (1 < videoTracks.length) {
        console.log(`[GETMEDIA] Multiple video tracks detected (${videoTracks.length}). Keeping only the first.`);
        for (let i = 1; i < videoTracks.length; i++) {
          originalStream.removeTrack(videoTracks[i]);
          videoTracks[i].stop();
        }
      }
    }
    // Store original stream for sending and local video
    localCameraStream = localStream = originalStream;
  } catch (error) { 
    if (camera.local.on && ['AbortError', 'NotFoundError', 'NotReadableError'].includes(error.name)) {
      if (error.toString().includes('Starting videoinput failed')) { // if videoLocal is stalled (Firefox)
        !video.local.playing && videoLocalPause();
      }
      if (microphone.local.on) {
        const reason = {AbortError: 'Camera failed', NotFoundError: 'No camera', NotReadableError: 'Camera in use'}[error.name];
        //console.warn(`[GETMEDIA] ${reason}, trying audio only.`);
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: audioConstraints,
            video: false,
          });
          localCameraStream = localStream = audioStream;
          return;
        } catch (error2) {
          throw error2;
        }
      }
    } else if ('NotAllowedError' === error.name) {
      notificationShow(i18n('permissionDenied'));
      throw error;
    } else {
      console.error('[GETMEDIA] getUserMedia failed:', error);
    }
    throw error;
  }
}
// Build list of local tracks and their settings for sending with answer and offer
function rtcLocalTrackMetaGet() {
  const list = [];
  if (localStream
  && isString(localStream.id) && '' !== localStream.id) {
    if (video.recording.current) {
      if (isNumberGreaterZero(video.recording.current.height)
      && isNumberGreaterZero(video.recording.current.width)) {
        list.push({
          height: video.recording.current.height,
          id: localStream.id,
          type: 'recording',
          width: video.recording.current.width,
        });
      }
    } else if (shareScreen.local.on) {
      if (isNumberGreaterZero(shareScreen.local.dimensions.height)
      && isNumberGreaterZero(shareScreen.local.dimensions.width)) {
        list.push({
          height: shareScreen.local.dimensions.height,
          id: localStream.id,
          timestamp: wbStartTimeDifferenceGet(),
          type: 'screen',
          width: shareScreen.local.dimensions.width,
        });
      }
    } else if (camera.local.on) {
      if (isNumberGreaterZero(camera.local.dimensions.height)
      && isNumberGreaterZero(camera.local.dimensions.width)) {
        list.push({
          height: camera.local.dimensions.height,
          id: localStream.id,
          timestamp: wbStartTimeDifferenceGet(),
          type: 'camera',
          width: camera.local.dimensions.width,
        });
      }
    }
  }
  return list;
}
async function rtcMediaDevicesAvailable(deviceType) {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    'camera' === deviceType && (camera.local.list = devices.filter(device => 'videoinput' === device.kind));
    'microphone' === deviceType && (microphone.local.list = devices.filter(device => 'audioinput' === device.kind));
    navigator.mediaDevices.addEventListener('devicechange', rtcMediaDevicesOnDeviceChange);
  } catch (error) {
    console.error('[MEDIA DEVICES] Error enumerating devices:', error);
  }
}
async function rtcMediaDevicesOnDeviceChange() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameraOld = [...camera.local.list];
    const microphoneOld = [...microphone.local.list];
    camera.local.list = devices.filter(device => 'videoinput' === device.kind);
    microphone.local.list = devices.filter(device => 'audioinput' === device.kind);
    navVideoLocalList('camera');
    navVideoLocalList('microphone');
    if (cameraOld !== camera.local.list) {
      if (null !== camera.local.deviceId) {
        let found = false;
        for (let i = 0; i < camera.local.list.length; ++i) {
          if (camera.local.deviceId === camera.local.list[i].deviceId) {
            found = true;
            break;
          }
        }
        if (!found) {
          camera.local.deviceId = null;
          document.getElementById('videoLocalCameraList')?.setAttribute('value', 'default');
        }
      }
    }
    if (microphoneOld !== microphone.local.list) {
      if (null !== microphone.local.deviceId) {
        let found = false;
        for (let i = 0; i < microphone.local.list.length; ++i) {
          if (microphone.local.deviceId === microphone.local.list[i].deviceId) {
            found = true;
            break;
          }
        }
        if (!found) {
          microphone.local.deviceId = null;
          document.getElementById('videoLocalMicrophoneList')?.setAttribute('value', 'default');
        }
      }
    }
  } catch (error) {
    console.error('[MEDIA DEVICES] Error enumerating devices:', error);
  }
}
async function rtcMediaDevicesPermissionCheck() {
  if (!camera.local.isListeningOnChange) {
    camera.local.permission = await navigator.permissions.query({name: 'camera'});
    camera.local.permission?.addEventListener('change', rtcMediaDevicesPermissionOnChange);
    camera.local.isListeningOnChange = true;
  }
  if (!microphone.local.isListeningOnChange) {
    microphone.local.permission = await navigator.permissions.query({name: 'microphone'});
    microphone.local.permission?.addEventListener('change', rtcMediaDevicesPermissionOnChange);
    microphone.local.isListeningOnChange = true;
  }
  ('prompt' === camera.local.permission.state || 'prompt' === microphone.local.permission.state) && await rtcMediaDevicesPermissionGet();
}
async function rtcMediaDevicesPermissionGet() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { // Minimal resolution
        height: {ideal: 1},
        width: {ideal: 1},
      },
    });
    stream.getTracks().forEach(track => track.stop());
  } catch (error) {
    console.error('Error:', error);
  }
}
async function rtcMediaDevicesPermissionOnChange(event) {
  const permissionStatus = event.target;
  let deviceType;
  // Determine the related device
  if (permissionStatus === camera.local.permission) {
    deviceType = 'camera';
    await rtcMediaDevicesAvailable(deviceType);
    navVideoLocalList(deviceType);
  } else if (permissionStatus === microphone.local.permission) {
    deviceType = 'microphone';
    await rtcMediaDevicesAvailable(deviceType);
    navVideoLocalList(deviceType);
  } else {
    console.warn('Unknown permission status object in rtcMediaDevicesPermissionOnChange');
    return;
  }
  console.log(deviceType + ' state changed to "' + permissionStatus.state + '"');
}
function rtcMediaPollingStart() {
  if (null !== rtc.media.polling.interval) {
    //console.log('[POLLING] Polling already active.');
    return;
  }
  const poll = async () => {
    try {
      //console.log(`[POLLING] Check: stream=${!!localCameraStream}, video=${videoLocalHasVideo()}, audio=${videoLocalHasAudio()}`);
      if (!localCameraStream || (camera.local.on && !video.local.playing)) {
        //console.log('[POLLING] Acquiring media...');
        await rtcLocalAcquire();
      } else {
        //console.log('[POLLING] Stream OK. Stopping polling.');
        rtcMediaPollingStop();
        return; // Exit recursion
      }
    } catch (error) {
      console.error('[POLLING] Error in poll:', error);
    }
    // Schedule next poll only if still needed
    rtc.media.polling.interval = setTimeout(poll, rtc.media.polling.duration);
  };
  poll();
}
function rtcMediaPollingStop() {
  if (null !== rtc.media.polling.interval) {
    clearTimeout(rtc.media.polling.interval);
    rtc.media.polling.interval = null;
    //console.log('[POLLING] Stopped.');
  }
}
function rtcPoliteSet(partnerId) {
  rtc.politeStates.set(partnerId, partnerId > userId);
}
function rtcQueueAnswerWithTimeout(message, partnerId) {
  if (!rtc.answerQueues.has(partnerId)) rtc.answerQueues.set(partnerId, []);
  rtc.answerQueues.get(partnerId).push(message);
  setTimeout(() => {
    const queue = rtc.answerQueues.get(partnerId) || [];
    const index = queue.indexOf(message);
    if (index !== -1) {
      console.warn(`[ANSWER-HANDLER] Answer timed out for partner ${partnerId}, removing from queue.`);
      queue.splice(index, 1);
      rtc.answerQueues.set(partnerId, queue);
    }
  }, 1E4);
}
function rtcRemoteTrackMetaCreate(partnerId, trackMeta) {
  // Store track metadata up-front to prevent race with ontrack events.
  const metaMap = new Map();
  if (isArray(trackMeta) && trackMeta.length) {
    trackMeta.forEach(info => {
      if (isString(info?.id)) {
        const value = {type: info.type};
        if (['camera', 'recording', 'screen'].includes(info.type)) {
          if (!isNumberGreaterZero(info.height) || !isNumberGreaterZero(info.width)) {
            return;
          }
          isNumberGreaterZero(info.timestamp) && camera.remote.onLast.set(partnerId, info.timestamp);
          value.height = info.height;
          value.width = info.width;
        }
        metaMap.set(info.id, value);
      }
    });
  }
  rtc.trackMeta.set(partnerId, metaMap);
}
function shareScreenClear() {
  localStream?.getTracks().forEach(track => track.stop());
  shareScreen.local.deviceId = null;
  shareScreen.local.on = false;
  shareScreen.local.tracks = null;
}
async function shareScreenStart() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });
    localStream = stream;
    shareScreen.local.on = true;
    shareScreen.local.tracks = stream.getTracks();
    stream.getVideoTracks()[0].onended = () => {
      shareScreenStop();
      navOptionsShareScreenUpdate(shareScreen.local.on);
    };
    shareScreen.remote.tracks.clear();
    if (shareScreen.local.tracks.length) {
      const settings = shareScreen.local.tracks[0].getSettings();
      shareScreen.local.deviceId = settings.deviceId;
      shareScreen.local.dimensions = {height: settings.height, width: settings.width};
    }
    await rtcLocalAcquireMediaAndAddTracks();
  } catch (error) {
    'Permission denied by user' !== error.message && console.error('Failed to start screen sharing:', error);
    shareScreenClear();
    navOptionsShareScreenUpdate(shareScreen.local.on);
  }
}
async function shareScreenStop() {
  shareScreenClear();
  await rtcLocalAcquire();
}
function uiAddNone() {
  this?.classList.add('none');
}
function uiCreateMeetingOnClick(event) {
  event.target.blur();
  const randomId = Math.random().toString(36).substring(2, 10);
  const href = location.href;
  const urlWithQueryString = href.includes('?') ? href.substring(0, (href.indexOf('?'))) : href;
  const url = (urlWithQueryString.includes('/') ? urlWithQueryString.substring(0, urlWithQueryString.lastIndexOf('/')) : urlWithQueryString) + `/room?room=${randomId}`;
  uiInviteLinkShow(url);
  isInitiator = true;
  window.history.pushState({}, '', url.substring(url.lastIndexOf('/') + 1));
  window.dispatchEvent(new Event('popstate'));
}
function uiCSSRuleGet(property, selector) {
  const isCustomProp = property.startsWith('--');
  const cleanProp = isCustomProp ? property : property.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules || sheet.rules;
      if (!rules) {
        continue;
      }
    } catch (error) {
      continue; // Cross-origin stylesheet
    }
    for (const rule of rules) {
      if (!rule.selectorText) {
        continue;
      }
      const selectors = rule.selectorText.split(',').map(s => s.trim());
      if (!selectors.includes(selector)) {
        continue;
      }
      if (isCustomProp) {
        // Method for custom properties (--var)
        const value = rule.style.getPropertyValue(property)?.trim();
        if (value) {
          return value;
          }
      } else {
        // Regular properties
        const value = rule.style.getPropertyValue(cleanProp)?.trim();
        if (value) {
          return value;
        }
        // Fallback: parse cssText (less reliable)
        const cssText = rule.style.cssText || rule.cssText;
        const regex = new RegExp(`${cleanProp}\\s*:\\s*([^;]+)`, 'i');
        const match = cssText.match(regex);
        if (match) {
          return match[1].trim();
        }
      }
    }
  }
  // Final fallback: computed style on an actual element
  const elem = document.querySelector(selector);
  if (elem) {
    const computed = getComputedStyle(elem).getPropertyValue(cleanProp)?.trim();
    if (computed && '' !== computed) {
      return computed;
    }
  }
  return null;
}
function uiInviteCopyOnClick() {
  event.target.blur();
  const linkInput = document.getElementById('inviteLink');
  linkInput.select();
  document.execCommand('copy');
}
function uiInviteLinkShow(url) {
  document.getElementById('inviteOuter')?.classList.remove('none');
  document.getElementById('inviteLink')?.setAttribute('value', url);
  const qrDiv = document.getElementById('inviteQR');
  qrDiv.innerHTML = '';
  const qr = qrcode(0, 'M');
  qr.addData(url);
  qr.make();
  qrDiv.innerHTML = qr.createImgTag(4);
}
function uiPopState(event) {
  const fileName = generalFileNameOfURL(location.href);
  if (['', 'index'].includes(fileName)) {
    !event.detail?.keepVideo && videoEnd();
    isInitiator = true;
    document.getElementById('createMeeting')?.classList.remove('none');
  } else if ('room' === fileName) {
    wsCreate();
  }
}
async function uiShowContent(content, send) {
  if (content === generalPageGet()) {
    return;
  }
  if ('whiteboard' === content) {
    nav.mode.video?.classList.remove('navActiveButton');
    nav.mode.whiteboard?.classList.add('navActiveButton');
    nav.whiteboard?.removeEventListener('transitionend', uiAddNone);
    !wb.hide && nav.whiteboard?.classList.remove('none');
    nav.whiteboard?.offsetHeight; // Force reflow to ensure new properties are applied
    nav.whiteboard?.classList.add('show');
    videoRemoteOuter?.classList.add('none');
    wb.outer?.classList.remove('hideBelow' ,'none');
    send && uiShowContentSend();
    videoRemotePlace();
  } else if ('video' === content) {
    nav.mode.video?.classList.add('navActiveButton');
    nav.mode.whiteboard?.classList.remove('navActiveButton');
    nav.whiteboard?.addEventListener('transitionend', uiAddNone, {once: true});
    nav.whiteboard?.classList.remove('show');
    videoRemoteOuter?.classList.remove('none');
    !html2Canvas.isActive && wb.outer?.classList.add('none');
    //videoRemoteTransition(content);
    send && uiShowContentSend();
    videoRemotePlace();
  }
}
function uiShowContentSend() {
  dataChannelSend({
    area: 'general',
    command: 'showContent',
    showContent: generalPageGet(),
  });
}
function uiTextareaRowsSet(textarea) {
  if (!textarea) {
    return;
  }
  textarea.style.height = 'auto'; // Reset to auto
  textarea.style.height = (parseFloat(getComputedStyle(textarea).borderBottomWidth) + parseFloat(getComputedStyle(textarea).borderTopWidth) + textarea.scrollHeight) + 'px'; // Set to content height
}
function videoEnd(partnerId = null) {
  if (partnerId) {
    if (rtc.peerConnections.has(partnerId)) {
      rtc.peerConnections.get(partnerId).close();
      rtc.peerConnections.delete(partnerId);
    }
    if (microphone.remote.streams.has(partnerId)) {
      microphone.remote.streams.get(partnerId).getTracks().forEach(track => track.stop());
      microphone.remote.streams.delete(partnerId);
    }
    if (camera.remote.streams.has(partnerId)) {
      camera.remote.streams.get(partnerId).getTracks().forEach(track => track.stop());
      camera.remote.streams.delete(partnerId);
    }
    camera.remote.tracks.delete(partnerId);
    gallery.video.recordedTrackAdded.delete(partnerId);
    microphone.remote.tracks.delete(partnerId);
    rtc.answerQueues.delete(partnerId);
    rtc.iceCandidatesQueues.delete(partnerId);
    rtc.isCreatingPCs.delete(partnerId);
    rtc.makingOffers.delete(partnerId);
    rtc.offerQueues.delete(partnerId);
    rtc.politeStates.delete(partnerId);
    rtc.trackMeta.delete(partnerId);
    shareScreen.remote.tracks.delete(partnerId);
    videoRemote.srcObject = null;
    videoRemote.pause();
    wb.element.missing.partnerIds.delete(partnerId);
    wb.stack.changedPartner.delete(partnerId);
    //console.log(`[VIDEO-END] Ended connection with partner ${partnerId}.`);
  } else {
    nav.video.hangUp?.setAttribute('disabled', 'disabled');
    rtcMediaPollingStop();
    if (shareScreen.local.on) {
      localStream.getTracks().forEach(track => track.stop());
      shareScreen.local.on = false;
      navOptionsShareScreenUpdate(shareScreen.local.on);
    }
    camera.remote.streams.forEach(stream => stream.getTracks().forEach(track => track.stop()));
    camera.remote.streams.clear();
    camera.remote.tracks.clear();
    dataChannels.clear();
    gallery.video.recordedTrackAdded.clear();
    microphone.remote.streams.forEach(stream => stream.getTracks().forEach(track => track.stop()));
    microphone.remote.streams.clear();
    microphone.remote.tracks.clear();
    rtcClear();
    shareScreen.remote.tracks.clear();
    wb.stack.changedPartner.clear();
    wsSend({type: 'bye'});
    wsClose();
  }
  !rtc.peerConnections.size && videoOthersOuter.classList.add('none');
}
async function videoEndLocalStream(isCameraOff) {
  if (isCameraOff && camera.local.on) {
    return;
  }
  localCameraStream?.getVideoTracks().forEach(t => t.stop());
  localStream?.getVideoTracks().forEach(t => t.stop());
  videoLocalMirrorEnd();
  !microphone.local.on && (localCameraStream = localStream = null);
  videoLocal.srcObject = null;
  await rtcLocalAcquire();
  dataChannelSend({
    area: 'video',
    command: 'status',
    status: 'off',
    timestamp: wbStartTimeDifferenceGet(),
  });
}
async function videoLocalCameraOnClick(event) {
  event.target.blur();
  camera.local.on = event.target.checked;
  if (!video.recording.stream) {
    await rtcLocalAcquire();
  }
}
function videoLocalHasAudio() {
  return localCameraStream?.getAudioTracks().length;
}
function videoLocalHasVideo() {
  return localCameraStream?.getVideoTracks().length;
}
async function videoLocalListOnChange(event) {
  if (!isString(event.target.value)) {
    return;
  }
  window[event.target.getAttribute('data-device')].local.deviceId = event.target.value;
  await rtcLocalAcquire();
}
function videoLocalMirrorEnd() {
  if (isFunction(camera.local.mirrored.cleanUp)) {
    camera.local.mirrored.cleanUp();
    camera.local.mirrored.cleanUp = null;
  }
}
async function videoLocalMicrophoneOnClick(event) {
  event.target.blur();
  microphone.local.on = event.target.checked;
  !microphone.local.on && localStream?.getAudioTracks().forEach(t => t.stop());
  await rtcLocalAcquire();
}
function videoLocalOnLoadedData(event) {
  video.local.playing = true;
  videoLocalTransition();
}
function videoLocalOnPause(event) {
  video.local.playing = false;
}
function videoLocalOnTransitionEnd(event) {
  if (!videoLocalOuter.offsetHeight) {
    video.local.playing = false;
    videoLocalPause();
    videoEndLocalStream(true);
    document.getElementById(this.getAttribute('data-style-id'))?.remove();
  }
}
function videoLocalOuterHeightMaxGet() {
  let heightMax;
  const videoLocalOuterRectCurrent = videoLocalOuter.getBoundingClientRect();
  if (!isNumber(camera.local.dimensions.height) || !isNumber(camera.local.dimensions.width)) {
    heightMax = videoLocalOuterRectCurrent.height;
  } else {
    heightMax = camera.local.dimensions.height / camera.local.dimensions.width * videoLocalOuterRectCurrent.width;
  }
  heightMax += video.local.marginBottom;
  return heightMax;
}
function videoLocalPause() {
  videoLocal.pause();
  if (videoLocal.srcObject) {
    const tracks = videoLocal.srcObject?.getTracks();
    tracks.forEach(track => track.stop());
    videoLocal.srcObject = null;
  }
}
function videoLocalTransition() {
  let heightMax = 0;
  const videoLocalOuterRectCurrent = videoLocalOuter.getBoundingClientRect();
  if (camera.local.on && isNumber(camera.local.dimensions.height) && isNumber(camera.local.dimensions.width)) {
    heightMax = camera.local.dimensions.height / camera.local.dimensions.width * videoLocalOuterRectCurrent.width + video.local.marginBottom;
  }
  videoLocalOuter.removeEventListener('transitionend', videoLocalOnTransitionEnd);
  let heightEnd;
  const heightStart = videoLocalOuterRectCurrent.height;
  let transitionDuration;
  if (heightMax && videoLocalHasVideo()) {
    heightEnd = heightMax;
    const max = Math.max(heightMax, heightStart);
    const min = Math.min(heightMax, heightStart);
    transitionDuration = max ? (max - min) / max * video.local.transitionDuration : video.local.transitionDuration;
  } else {
    heightEnd = 0;
    transitionDuration = heightMax ? heightStart / heightMax * video.local.transitionDuration : video.local.transitionDuration;
  }
  if (!heightEnd && !heightStart) {
    videoEndLocalStream(true);
    return;
  }
  videoLocalOuter.offsetHeight; // Force reflow to ensure new properties are applied
  videoLocalOuter.style.height = heightStart + 'px';
  videoLocalOuter.offsetHeight; // Force reflow to ensure new properties are applied
  videoLocalOuter.style.transition = `height ${transitionDuration}s linear`;
  videoLocalOuter.style.height = heightEnd + 'px';
  videoLocalOuter.offsetHeight; // Force reflow to ensure new properties are applied
  videoLocalOuter.addEventListener('transitionend', videoLocalOnTransitionEnd, {once: true});
}
function videoRemoteMicrophoneOnOnClick(event) {
  event.target.blur();
  microphone.remote.on = event?.target?.checked ? true : false;
  videoRemote && (videoRemote.muted = !microphone.remote.on);
}
function videoRemotePlace() {
  if ('video' === generalPageGet()) {
    videoRemoteOuter.appendChild(videoRemote);
  } else {
    videoOthersOuter.appendChild(videoRemote);
  }
}
function videoRemoteTransition(content, videoLocalOuterRectMax) {
console.log('videoRemoteTransition');
  if (!videoRemote.srcObject) {
console.log('etn');
    return;
  }
  videoRemoteOuter?.classList.remove('none');
  let videoRemoteRect = videoRemote.getBoundingClientRect();
  let videoTarget;
  let videoTargetRect;
  videoRemote.removeEventListener('transitionend', videoRemoteOnTransitionEnd);
  wb.outer?.classList.remove('none');
  if ('video' === content) {
    videoLocal?.classList.remove('none');
    videoRemoteOuter.appendChild(videoRemote);
    videoTarget = videoRemoteOuter;
    videoTargetRect = videoTarget.getBoundingClientRect();
  } else {
    videoTarget = videoLocalOuter;
    videoTargetRect = videoLocalOuterRectMax;
  }
  videoRemote.setAttribute('data-video-target-id', videoTarget.id);
console.log(videoRemoteRect);
console.log(videoTargetRect);
  videoRemote.style.height = videoRemoteRect.height + 'px';
  videoRemote.style.left = videoRemoteRect.left + 'px';
  videoRemote.style.position = 'absolute';
  videoRemote.style.top = videoRemoteRect.top + 'px';
  videoRemote.style.width = videoRemoteRect.width + 'px';
  videoRemote.style.zIndex = '20';
  videoRemote.offsetHeight; // Force reflow to ensure new properties are applied
  videoRemote.style.transition = `height .${video.remote.transitionDuration}s linear, left .${video.remote.transitionDuration}s linear, top .${video.remote.transitionDuration}s linear, width .${video.remote.transitionDuration}s linear`;
  videoRemote.style.height = videoTargetRect.height + 'px';
  videoRemote.style.left = videoTargetRect.left + 'px';
  videoRemote.style.position = 'absolute';
  videoRemote.style.top = videoTargetRect.top + 'px';
  videoRemote.style.width = videoTargetRect.width + 'px';
  videoRemote.style.zIndex =  '20';
  videoRemote.addEventListener('transitionend', videoRemoteOnTransitionEnd, {once: true});
}
function videoRemoteOnTransitionEnd(event) {
  const targetId = this.getAttribute('data-video-target-id');
  const target = document.getElementById(targetId);
  if (!target || !videoRemote) {
    return;
  }
  'videoLocalOuter' === targetId ? videoLocal.classList.add('none') : wb.outer?.classList.add('none');
  target.appendChild(videoRemote);
  videoRemote.classList.remove('videoRemoteTransitionEnd', 'videoRemoteTransitionStart');
  'video' !== generalPageGet() && videoRemoteOuter?.classList.add('none');
}
function wbClear() {
  // Clear timeouts
  for (const timeoutId of wb.element.missing.timeout.values()) {
    clearTimeout(timeoutId);
  }
  for (const timeoutId of wb.stack.missing.timeout.values()) {
    clearTimeout(timeoutId);
  }
  clearTimeout(wb.stateSend.timeout);
  // Reset HTML elements
  document.getElementById(wb.contextMenu.id)?.remove();
  wb.partnerCursor?.classList.add('none');
  wb.ctx && wb.whiteboard && wb.ctx.clearRect(0, 0, wb.whiteboard.width, wb.whiteboard.height);
  wbStackUndoReset();
  wbStackUndoChanged({noStateSend: true});
  // Clear Maps
  wb.element.index.clear();
  wb.element.missing.partnerIds.clear();
  wb.element.missing.timeout.clear();
  wb.images.img.clear();
  wb.lines.points.clear();
  wb.lines.pointsReferences.clear();
  wb.stack.byId.clear();
  wb.stack.changedPartner.clear();
  wb.stack.missing.partnerIds.clear();
  wb.stack.missing.timeout.clear();
  // Reset wb object
  wb = {...wbDefault};
  wb.stack.changed = wbStartTimeDifferenceGet();
}
function wbContextMenuCopyOnClick(event) {
  const index = parseInt(event.target.parentElement?.getAttribute('data-elements-index'), 10);
  if (isInt(index) && wb.elements[index]) {
    const copy = 'image' === wb.elements[index].type ? {...wb.elements[index]} : structuredClone(wb.elements[index]);
    const idOld = copy.id;
    copy.id = wbElementIdSet();
    if (['image', 'text'].includes(copy.type)) {
      if ('image' === copy.type) {
        const img = wb.images.img.get(idOld);
        if (!img) {
          return;
        }
        wb.images.img.set(copy.id, img);
      }
      // Add small positionional offset to make copy easily visible
      isNumber(copy.x) && (copy.x += wb.contextMenu.copyDiff > copy.x ? wb.contextMenu.copyDiff : -wb.contextMenu.copyDiff);
      isNumber(copy.y) && (copy.y += wb.contextMenu.copyDiff > copy.y ? wb.contextMenu.copyDiff : -wb.contextMenu.copyDiff);
    } else if ('line' === copy.type) {
      const reference = wb.lines.pointsReferences.get(idOld);
      if (!isString(reference)) {
        return;
      }
      const points = wb.lines.points.get(reference);
      if (!isArray(points)) {
        return;
      }
      wb.lines.pointsReferences.set(copy.id, reference);
      // Add small positionional offset to make copy easily visible
      let smallestX = Infinity;
      let smallestY = Infinity;
      for (let i = 0; i < points.length; ++i) {
        isNumber(points[i]?.x) && points[i].x < smallestX && (smallestX = points[i].x);
        isNumber(points[i]?.y) && points[i].y < smallestY && (smallestY = points[i].y);
      }
      const diff = copy.width / 2 + wb.contextMenu.copyDiff;
      copy.dx += 0 > smallestX - diff + copy.dx ? diff : -diff;
      copy.dy += 0 > smallestY - diff + copy.dy ? diff : -diff;
    }
    wb.elements.push(copy);
    if (['image', 'line'].includes(copy.type)) {
      wbStateSave({elementId: copy.id, idOld});
    } else {
      wbStateSave();
    }
    wbDraw();
  }
  wbContextMenuRemove(event);
}
function wbContextMenuDeleteOnClick(event) {
  const index = parseInt(event.target.parentElement?.getAttribute('data-elements-index'), 10);
  if (!isInt(index) || !wb.elements[index]) {
    return;
  }
  const elementId = wb.elements[index].id;
  wb.elements.splice(index, 1);
  wb.selected = null;
  wbStateSave({elementDeletedId: elementId});
  wbDraw();
  wbContextMenuRemove(event);
}
function wbContextMenuLayerDownOnClick(event) {
  const index = parseInt(event.target.parentElement?.getAttribute('data-elements-index'), 10);
  if (!isInt(index) || !wb.elements[index] || !wb.elements[index - 1]) {
    return;
  }
  [wb.elements[index - 1], wb.elements[index]] = [wb.elements[index], wb.elements[index - 1]];
  event.target.parentElement?.setAttribute('data-elements-index', index - 1);
  wbStateSave();
  wbDraw();
}
function wbContextMenuLayerUpOnClick(event) {
  const index = parseInt(event.target.parentElement?.getAttribute('data-elements-index'), 10);
  if (!isInt(index) || !wb.elements[index] || !wb.elements[index + 1]) {
    return;
  }
  [wb.elements[index + 1], wb.elements[index]] = [wb.elements[index], wb.elements[index + 1]];
  event.target.parentElement?.setAttribute('data-elements-index', index + 1);
  wbStateSave();
  wbDraw();
}
function wbContextMenuOnPointerMove(event) {
  const index = parseInt(document.getElementById('wbContextMenu')?.getAttribute('data-elements-index'), 10);
  if (!isInt(index) || !isString(wb.elements[index]?.id)) {
    return;
  }
  if (wb.selected?.id !== wb.elements[index].id) {
    wb.selected = wb.elements[index];
    wbDraw();
  }
}
function wbContextMenuLockOnClick(event) {
  const index = parseInt(event.target.parentElement?.getAttribute('data-elements-index'), 10);
  if (!isInt(index) || !wb.elements[index]) {
    return;
  }
  if (wb.elements[index].isLocked) {
    delete wb.elements[index].isLocked;
  } else {
    wb.elements[index].isLocked = true;
  }
  wbContextMenuRemove(event);
  wbStateSave();
}
function wbContextMenuOnMouseLeave(event) {
  if (isString(wb.selected?.id)) { // do not deselect and reselect the same wb element
    const screen = wbPositionScreenGet(event);
    const world = wbPositionWorldGet(screen.x, screen.y);
    const index = wbElementHoverGetIndex(world.x, world.y);
    if (isInt(index) && wb.selected.id === wb.elements[index]?.id) {
      return;
    }
  }
  wbDeselect() && wbDraw();
}
function wbContextMenuOnWheel(event) {
  event.preventDefault();
}
function wbContextMenuRemove(event) {
  const contextMenu = document.getElementById(wb.contextMenu.id);
  if (contextMenu) {
    contextMenu.remove();
    if (!wb.whiteboard) {
      return;
    }
    //const screen = wbPositionScreenGet(event);
    //const world = wbPositionWorldGet(screen.x, screen.y);
    //const index = wbElementHoverGetIndex(world.x, world.y);
    const whiteboardRect = wb.whiteboard.getBoundingClientRect();
    const index = wbElementHoverGetIndex(event.clientX - whiteboardRect.left, event.clientY - whiteboardRect.top);
    // highlight hovered element
    if (0 <= index && wb.elements[index]) {
      if (wb.elements[index].id !== wb.selected?.id) {
        wb.selected = wb.elements[index];
        wbDraw();
      }
    // unhighlight element
    } else {
      wbDeselect() && wbDraw();
    }
  }
}
function wbControlGrabOnClick(event) {
  wbModeChange(event.target.classList.contains('activeButton') ? 'edit' : 'grab');
}
function wbControlOldBackOnClick(event) {
  if (2 > wb.stack.undo.length) { // Need at least current state and one previous to undo
    return;
  }
  const prevElements = wb.stack.undo[wb.stack.undo.length - 2].elements || [];
  const elements = prevElements.map(element => 'image' === element.type ? wbImageMap(element) : 'text' === element.type ? wbTextMap(element) : {...element});
  const stackCurrent = wbStackCurrentGet();
  stackCurrent && (stackCurrent.modified = wbStartTimeDifferenceGet());
  wb.stack.byId.set(stackCurrent.id, stackCurrent);
  wb.stack.redo.push(wb.stack.undo.pop()); // Remove current state before loading
  wbStateLoad(elements);
  wbStackUndoChanged();
}
function wbControlOldForwardOnClick(event) {
  if (!wb.stack.redo.length) {
    return;
  }
  const nextState = wb.stack.redo.pop();
  nextState.modified = wbStartTimeDifferenceGet();
  wb.stack.byId.set(nextState.id, nextState);
  wb.stack.undo.push(nextState); // Push to undo stack before loading
  wbStateLoad(nextState?.elements);
  wbStackUndoChanged();
}
function wbCursorResizeGet(text) {
  const handleSize = 10; // Size of the interactive resize handle area
  return {
    ne: {x: text.x + text.width, y: text.y},
    nw: {x: text.x, y: text.y},
    se: {x: text.x + text.width, y: text.y + text.height},
    sw: {x: text.x, y: text.y + text.height}
  };
}
function wbDeselect() {
  if (isString(wb.selected?.id)) {
    wb.selected = null;
    return true;
  }
  return false;
}
function wbDraw() {
  if (!wb.ctx || !wb.whiteboard) {
    notificationsShow(i18n('whiteboardNotFound'));
    return;
  }
  const ctx = wb.ctx;
  // Reset transform and clear screen
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, wb.whiteboard.width, wb.whiteboard.height);
  // Apply camera transform
  ctx.setTransform(1, 0, 0, 1, wb.camera.x, wb.camera.y);
  for (let i = 0; i < wb.elements.length; ++i) {
    ctx.save();
    const element = wb.elements[i];
    if (!element) {
      ctx.restore();
      continue;
    }
    // Selection glow
    if (wb.selected?.id === element.id
    && ['edit', 'imageDragging', 'imageResizing', 'lineDragging', 'textDragging', 'textResizing'].includes(wb.mode)) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'red';
    } else {
      ctx.shadowBlur = 0;
    }
    if (element.type === 'image') {
      const img = wb.images.img.get(element.id) || wbPlaceHolder;
      img && ctx.drawImage(img, element.x, element.y, element.width, element.height);
    } else if (element.type === 'line') {
      if (!isNumber(element.dx) || !isNumber(element.dy)) {
        ctx.restore();
        continue;
      }
      const reference = wb.lines.pointsReferences.get(element.id);
      if (!isString(reference)) {
        ctx.restore();
        continue;
      }
      const basePoints = wb.lines.points.get(reference);
      if (!isArray(basePoints) || !basePoints.length) {
        ctx.restore();
        continue;
      }
      const points = basePoints.map(pt => ({
        x: pt.x + element.dx,
        y: pt.y + element.dy
      }));
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = element.width;
      ctx.strokeStyle = element.color;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let j = points.length === 1 ? 0 : 1; j < points.length; ++j) {
        ctx.lineTo(points[j].x, points[j].y);
      }
      ctx.stroke();
    } else if (element.type === 'text') {
      if (!element.display) {
        ctx.restore();
        continue;
      }
      const activeInput = document.querySelector(
        `.wbTextInput[data-text-id="${element.id}"]`
      );
      if (activeInput && document.activeElement === activeInput) {
        ctx.restore();
        continue;
      }
      ctx.font = `${element.size}px ${element.family}`;
      ctx.fillStyle = element.color;
      ctx.textBaseline = 'top';
      const lines = element.value.split('\n');
      let currentY = element.y + wb.textPadding;
      for (const line of lines) {
        ctx.fillText(
          line,
          element.x + wb.textPadding,
          currentY + 3
        );
        currentY += element.size * wb.lineHeightMultiplier;
      }
    }
    ctx.restore();
  }
  // Reset transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function wbDrawCheck(elementIds) {
  const elements = wbStackCurrentGet()?.elements;
  if (!isArray(elements)) {
    return;
  }
  const ids = new Set(elementIds);
  for (const element of elements) {
    if (ids.has(element?.id)) {
      wbStateLoad(elements);
      return;
    }
  }
}
function wbElementAtPositionGet(x, y) {
  for (let i = wb.elements.length - 1; 0 <= i; --i) {
    const element = wb.elements[i];
    if (['image', 'text'].includes(element?.type)) {
      if (x >= element.x && x <= element.x + element.width
      && y >= element.y && y <= element.y + element.height) {
        return null;
      }
    } else if ('line' === element?.type) {
      if (!isNumber(element.dx) || !isNumber(element.dy)) {
        continue;
      }
      const reference = wb.lines.pointsReferences.get(element.id);
      if (!isString(reference)) {
        continue;
      }
      const basePoints = wb.lines.points.get(reference);
      if (!isArray(basePoints) || !basePoints.length) {
        continue;
      }
      const points = [...basePoints].map(pt => ({
        x: pt.x + element.dx,
        y: pt.y + element.dy,
      }));
      // Special case: single point (dot)
      if (1 === points.length) {
        const p = points[0];
        const dx = x - p.x;
        const dy = y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const hitRadius = element.width / 2;
        if (distance <= hitRadius) {
          return element;
        }
        continue;
      }
      // Multiple points: normal polyline
      const path = new Path2D();
      path.reset?.(); // Optional: needed in some cases to clear Path2D
      path.moveTo(points[0].x, points[0].y);
      for (let j = 1; j < points.length; ++j) {
        path.lineTo(points[j].x, points[j].y);
      }
      wb.ctx.lineWidth = element.width;
      wb.ctx.strokeStyle = element.color;
      if (wb.ctx.isPointInStroke(path, x, y)) {
        return element;
      }
    }
  }
  return null; // no match
}
function wbElementIdSet() {
  return (userId ? `${userId}` : 'initiator') + '-' + (wb.element.counter + 1 < Number.MAX_SAFE_INTEGER ? wb.element.counter++ : wb.element.counter = 0);
}
function wbElementsValid(elements, partnerId, elementsMissing) {
  if (!isArray(elements)) {
    return;
  }
  for (let i = elements.length - 1; 0 <= i; --i) {
    if (!wbElementValid(elements[i])) {
      elements.splice(i, 1);
      continue;
    }
    let missing = false;
    if ('image' === elements[i].type) {
      !wb.images.img.get(elements[i].id) && (missing = true);
    } else if ('line' === elements[i].type) {
      const reference = wb.lines.pointsReferences.get(elements[i].id);
      (!isString(reference) || !isArray(wb.lines.points.get(reference))) && (missing = true);
    }
    if (missing) {
      const partnerIds = wb.element.missing.partnerIds.get(elements[i].id) || [];
      if (partnerIds.includes(partnerId)) {
        continue;
      }
      wb.element.missing.partnerIds.set(elements[i].id, [partnerId].concat(partnerIds));
      wbElementMissing(elements[i].id, elementsMissing);
    }
  }
}
function wbElementHoverGetIndex(x, y) {
  let index = -1;
  for (let i = wb.elements.length - 1; 0 <= i; --i) {
    if (['image', 'text'].includes(wb.elements[i]?.type)
    && x >= wb.elements[i].x && x <= wb.elements[i].x + wb.elements[i].width
    && y >= wb.elements[i].y && y <= wb.elements[i].y + wb.elements[i].height) {
      index = i;
      break;
    }
  }
  const hoveredLine = wbElementAtPositionGet(x, y); // Try to select a line
  if (hoveredLine) {
    for (let i = wb.elements.length - 1; 0 <= i; --i) {
      if (hoveredLine.id === wb.elements[i]?.id && 'line' === wb.elements[i].type) {
        i > index && (index = i);
        break;
      }
    }
  }
  return index;
}
function wbElementIndexCreate(elements, stackId) {
  const elementIndex = new Map();
  wb.element.index.set(stackId, elementIndex);
  for (let elementsLength = elements.length, i = 0; i < elementsLength; ++i) {
    elementIndex.set(elements[i].id, i);
  }
  return elementIndex;
}
function wbElementMissing(elementId, elementsMissing) {
  if (dataChannel.receive.partnerIdByIncomingId.has(elementId)) { // Skip because a partner is already sending this element
    return;
  }
  const partnerIds = wb.element.missing.partnerIds.get(elementId);
  if (!isArray(partnerIds)) {
    return;
  }
  clearTimeout(wb.element.missing.timeout.get(elementId));
  if (!partnerIds.length) {
    wb.element.missing.partnerIds.delete(elementId);
    wb.element.missing.timeout.delete(elementId);
    return;
  }
  for (let i = 0; i < partnerIds.length; ++i) {
    if (dataChannels.get(partnerIds[i])) {
      break;
    }
    partnerIds.shift();
    --i;
  }
  if (!partnerIds.length) {
    wb.element.missing.partnerIds.delete(elementId);
    wb.element.missing.timeout.delete(elementId);
    return;
  }
  wb.element.missing.partnerIds.set(elementId, partnerIds);
  if (elementsMissing) {
    const ids = elementsMissing.get(partnerIds[0]) || [];
    !ids.includes(elementId) && elementsMissing.set(partnerIds[0], ids.concat(elementId));
  } else { // due to timeout
    // Send request to the first partner in the list
    dataChannelSendLargeMessage({
      area: 'whiteboard',
      command: 'elementsPropertyMissing',
      ids: [elementId],
    }, {partnerId: partnerIds[0]});
  }
  // Rotate: move first partner to the end
  wb.element.missing.partnerIds.set(elementId, [...partnerIds.slice(1), partnerIds[0]]);
  wb.element.missing.timeout.set(elementId, setTimeout(wbElementMissing, wb.element.missing.interval, elementId));
}
function wbElementsGet(requestedSet) {
  const result = new Map();
  if (!requestedSet?.size) {
    return result;
  }
  const elementIndex = wb.element.index;
  // undo
  for (let i = wb.stack.undo.length - 1; 0 < i; --i) {
    const stack = wb.stack.undo[i];
    const index = elementIndex.get(stack.id);
    if (!index) {
      continue;
    }
    for (const elementId of requestedSet) {
      if (result.has(elementId)) {
        continue;
      }
      const elementPos = index.get(elementId);
      if (elementPos === undefined) {
        continue;
      }
      const element = stack.elements?.[elementPos];
      if (!element) {
        continue;
      }
      result.set(elementId, {element});
    }
  }
  // redo
  for (let i = wb.stack.redo.length - 1; i >= 0; --i) {
    const stack = wb.stack.redo[i];
    const index = elementIndex.get(stack.id);
    if (!index) {
      continue;
    }
    for (const elementId of requestedSet) {
      if (result.has(elementId)) {
        continue;
      }
      const elementPos = index.get(elementId);
      if (elementPos === undefined) {
        continue;
      }
      const element = stack.elements?.[elementPos];
      if (!element) {
        continue;
      }
      result.set(elementId, {element});
    }
  }
  return result;
}
function wbElementsGetMinimal(elements, params = {}) {
  if (!isArray(elements)) {
    return [];
  }
  const result = [];
  for (const element of elements) {
    if (!element) {
      continue;
    }
    // Create a clean copy without unwanted properties
    const clean = {...element};
    delete clean.selected;
    // Special handling only for requested element
    if (params.elementId === clean.id) {
      if (params.idOld) {
        clean.idOld = params.idOld;
      } else if ('image' === clean.type) {
        const img = wb.images.img.get(clean.id);
        isString(img?.src) && (clean.src = img.src);
      } else if ('line' === clean.type) {
        const ref = wb.lines.pointsReferences.get(clean.id);
        if (isString(ref)) {
          const points = wb.lines.points.get(ref);
          isArray(points) && (clean.points = points);
        }
      }
    }
    result.push(clean);
  }
  return result;
}
function wbElementsMaximalAll(stack) {
  const elementIndexByStack = wb.element.index;
  for (let i = stack.length - 1; 0 <= i; --i) {
    const elements = stack[i].elements;
    if (!isArray(elements)) {
      continue;
    }
    for (let j = elements.length - 1; j >= 0; --j) {
      const element = elements[j];
      if (!element || 'image' !== element.type) {
        continue;
      }
      const elementId = element.id;
      // Look up this element ID in all indexed stacks
      for (const [stackId, indexMap] of elementIndexByStack) {
        const idx = indexMap.get(elementId);
        if (idx === undefined) {
          continue;
        }
        // Determine which stack this stackId refers to
        let sourceStack = null;
        // Check undo stacks
        for (let k = wb.stack.undo.length - 1; k >= 0; --k) {
          if (wb.stack.undo[k].id === stackId) {
            sourceStack = wb.stack.undo[k];
            break;
          }
        }
        // Check redo stacks if not found
        if (!sourceStack) {
          for (let k = wb.stack.redo.length - 1; k >= 0; --k) {
            if (wb.stack.redo[k].id === stackId) {
              sourceStack = wb.stack.redo[k];
              break;
            }
          }
        }
        if (!isArray(sourceStack?.elements)) {
          break;
        }
        const sourceElement = sourceStack.elements[idx];
        if (sourceElement?.img) {
          element.img = sourceElement.img;
        }
        break; // element IDs are unique -> stop after first hit
      }
    }
  }
}
// Restore disappeared elements
function wbElementsPlausibility(stackIndex) {
  const deletedElementIds = new Set();
  const stackUsedIds = new Map(); // Map<stackId, Set<elementId>>
  wbElementsPlausibilityStack(deletedElementIds, wb.stack.undo, Math.max(stackIndex, 2), stackUsedIds);
  wbElementsPlausibilityStack(deletedElementIds, wb.stack.redo, 1, stackUsedIds);
}
function wbElementsPlausibilityStack(deletedElementIds, stack, stackIndex, stackUsedIds) {
  const stackLen = stack.length;
  for (let i = stackIndex - 1; i < stackLen; ++i) {
    const previousElements = stack[i]?.elements;
    if (!Array.isArray(previousElements) || !previousElements.length) {
      continue;
    }
    for (let j = i + 1; j < stackLen; ++j) {
      const stackCurrent = stack[j];
      if (stackCurrent.elementsCleared) {
        continue;
      }
      let elements = stackCurrent.elements;
      if (!Array.isArray(elements)) {
        elements = stackCurrent.elements = [];
      }
      let elementIndex = wb.element.index.get(stackCurrent.id);
      if (!elementIndex) {
        elementIndex = wbElementIndexCreate(elements, stackCurrent.id);
      }
      const deletedId = stackCurrent.elementDeletedId;
      let hasDeletedElement = false;
      let usedIds = stackUsedIds.get(stackCurrent.id);
      for (let k = 0, prevLen = previousElements.length; k < prevLen; ++k) {
        const prevEl = previousElements[k];
        const prevId = prevEl.id;
        // Deleted marker shortcut
        if (deletedElementIds.has(prevId)) {
          continue;
        } else if (prevId === deletedId) {
          deletedElementIds.add(prevId);
          hasDeletedElement = true;
          continue;
        } else {
          // Deleted-at check
          const idx = elementIndex.get(prevId);
          if (idx !== undefined) {
            if (usedIds && usedIds.has(prevId)) {
              // direct replacement, no splice
              elements[idx] = prevEl;
            }
            continue;
          }
        }
        const insertPos = hasDeletedElement ? (k ? k - 1 : 0) : k;
        elements.splice(insertPos, 0, prevEl);
        // update index from insertion point
        for (let elementsLength = elements.length, l = insertPos; l < elementsLength; ++l) {
          elementIndex.set(elements[l].id, l);
        }
        if (!usedIds) {
          usedIds = new Set();
          stackUsedIds.set(stackCurrent.id, usedIds);
        }
        usedIds.add(prevId);
      }
    }
  }
}
function wbElementValid(element) {
  if (!isString(element.id) || '' === element.id) {
    return false;
  }
  let additionalKeys = 0;
  if (element.isLocked) {
    ++additionalKeys;
  }
  if ('image' === element.type) {
    if (!isNumber(element.defaultHeightPx) || 0 > element.defaultHeightPx
    || !isNumber(element.defaultWidthPx) || 0 > element.defaultWidthPx
    || !isNumber(element.height) || 0 > element.height
    || !isString(element.name) || '' === element.name
    || !isNumber(element.width) || 0 > element.width
    || !isNumber(element.x)
    || !isNumber(element.y)
    || 9 + additionalKeys !== Object.keys(element).length) {
      return false;
    } 
  } else if ('line' === element.type) {
    if (!isString(element.color)
    || !isNumber(element.dx)
    || !isNumber(element.dy)
    || !isNumber(element.width) || 0 > element.width
    || 6 + additionalKeys !== Object.keys(element).length) {
      return false;
    } 
  } else if ('text' === element.type) {
    if (!isString(element.color)
    || !isBoolean(element.display)
    || !isString(element.family)
    || !isNumber(element.height) || 0 > element.height
    || !isInt(element.rows) || 1 > element.rows
    || !isNumber(element.size) || 0 > element.size
    || !isString(element.value)
    || !isNumber(element.width) || 0 > element.width
    || !isNumber(element.x)
    || !isNumber(element.y)
    || 12 + additionalKeys !== Object.keys(element).length) {
      return false;
    }
  } else { // unknown type
    return false;
  }
  return true;
}
function wbEventListenerAdd() {
  wb.whiteboard.addEventListener('contextmenu', wbOnContextMenu);
  wb.whiteboard.addEventListener('mousedown', wbOnMouseDown, {passive: false});
  wb.whiteboard.addEventListener('mouseleave', wbOnMouseLeave);
  wb.whiteboard.addEventListener('mouseup', wbOnMouseUp, {passive: false});
  wb.whiteboard.addEventListener('pointerdown', wbOnPointerDown);
  wb.whiteboard.addEventListener('pointermove', wbOnPointerMove, {passive: false});
  wb.whiteboard.addEventListener('touchend', wbOnMouseUp, {passive: false});
  wb.whiteboard.addEventListener('touchstart', wbOnMouseDown, {passive: false});
}
function wbEventListenerRemove() {
  wb.whiteboard.removeEventListener('contextmenu', wbOnContextMenu);
  wb.whiteboard.removeEventListener('mousedown', wbOnMouseDown);
  wb.whiteboard.removeEventListener('mouseleave', wbOnMouseLeave);
  wb.whiteboard.removeEventListener('mouseup', wbOnMouseUp);
  wb.whiteboard.removeEventListener('pointerdown', wbOnPointerDown);
  wb.whiteboard.removeEventListener('pointermove', wbOnPointerMove);
  wb.whiteboard.removeEventListener('touchend', wbOnMouseUp);
  wb.whiteboard.removeEventListener('touchstart', wbOnMouseDown);
}
function wbFinishCurrentJob() {
  wb.whiteboard.dispatchEvent(new Event('mouseup'));
}
function wbImageAdd(name, notificationId, srcBase64) {
  const id = wbElementIdSet();
  const img = new Image();
  img.onerror = function() {
    document.getElementById(notificationId)?.remove();
    notificationsShow(i18n('fileNameIsNotAValidImageFile', {name}));
  };
  img.onload = function() {
    const ratio = wb.images.defaultSize / this[this.naturalHeight > this.naturalWidth ? 'height' : 'width'];
    const defaultHeightPx = Math.round(ratio * this.naturalHeight * 100) / 100;
    const defaultWidthPx = Math.round(ratio * this.naturalWidth * 100) / 100;
    const newImage = {
      defaultHeightPx,
      defaultWidthPx,
      height: defaultHeightPx,
      id,
      name,
      type: 'image',
      width: defaultWidthPx,
      x: wb.images.defaultLeft - wb.camera.x,
      y: wb.images.defaultTop - wb.camera.y,
    };
    wb.images.img.set(id, img);
    wb.elements.push(newImage);
    wbStateSave({elementId: id});
    wbDraw();
    document.getElementById(notificationId)?.remove();
  };
  img.src = srcBase64;
}
function wbImageMap(image) {
  const keys = {
    defaultHeightPx: image.defaultHeightPx,
    defaultWidthPx: image.defaultWidthPx,
    height: image.height,
    id: image.id,
  };
  image.isLocked && (keys.isLocked = image.isLocked);
  keys.name = image.name;
  keys.type = image.type;
  keys.width = image.width;
  keys.x = image.x;
  keys.y = image.y;
  return keys;
}
function wbInsertImageConvert(event, files) {
  for (let i = 0; i < files.length; ++i) {
    const isLastFile = i + 1 >= files.length;
    const name = files[i].name || i18n('unnamedFile');
    if (!isString(files[i].type)) {
      notificationsShow(i18n('fileNameIsNotAValidImageFile', {name}));
      isLastFile && wbInsertReset(event);
      continue;
    }
    const notificationId = notificationsShow(i18n('fileNameIsConverting', {name: files[i].name}), true);
    const reader = new FileReader();
    reader.onloadend = (function(i) {
      return function(e) {
        const srcBase64 = reader.result;
        if (!srcBase64.startsWith('data:image/')) {
          document.getElementById(notificationId)?.remove();
          notificationsShow(i18n('fileNameIsNotAValidImageFile', {name}));
          isLastFile && wbInsertReset(event);
          return;
        }
        wbImageAdd(name, notificationId, srcBase64);
        isLastFile && wbInsertReset(event);
      };
    })(i);
    reader.readAsDataURL(files[i]);
  }
}
function wbInsertImageInputOnChange(event) {
  nav.insert.image?.classList.contains('navActiveButton') && nav.insert.image.click();
  const files = event?.dataTransfer?.files || event?.target?.files;
  if (!isFileList(files) || !files.length) {
    notificationsShow(i18n('fileNotFound'));
    return;
  }
  wbModeChange('edit');
  wbInsertImageConvert(event, files);
}
function wbInsertPDFConvert(event, files, notificationId) {
  for (let i = 0; i < files.length; ++i) {
    const isLastFile = i + 1 >= files.length;
    const name = files[i].name || i18n('unnamedFile');
    if (!isString(files[i].type) || (!files[i].type?.toLowerCase().startsWith('application/pdf') && !files[i].type?.toLowerCase().startsWith('image/'))) {
      notificationsShow(i18n('fileNameIsNotAValidPDFFile', {name}));
      isLastFile && wbInsertReset(event);
      continue;
    }
    const notificationId = notificationsShow(i18n('fileNameIsConverting', {name: files[i].name}), true);
    const reader = new FileReader();
    reader.onloadend = (function(i) {
      return function(e) {
        const srcBase64 = reader.result;
        const isPDF = srcBase64.startsWith('data:application/pdf;base64,');
        if (!isPDF) {
          document.getElementById(notificationId)?.remove();
          notificationsShow(i18n('fileNameIsNotAValidPDFFile', {name}));
          isLastFile && wbInsertReset(event);
          return;
        }
        wbInsertPDFToImage(name, notificationId, srcBase64);
        isLastFile && wbInsertReset(event);
      };
    })(i);
    reader.readAsDataURL(files[i]);
  }
}
function wbInsertPDFInputOnChange(event) {
  nav.insert.pdf.click();
  const files = event?.dataTransfer?.files || event?.target?.files;
  if (!isFileList(files) || !files.length) {
    notificationsShow(i18n('fileNotFound'));
    return;
  }
  wbModeChange('edit');
  for (let i = 0; i < files.length; ++i) {
    if (isString(files[i].type) && files[i].type.toLowerCase().startsWith('application/pdf')) {
      const script = document.createElement('script');
      script.onerror = () => {
        notificationsShow(i18n('couldNotConvertPDFFile', {name: files[i].name}));
      };
      script.onload = () => {
        wbInsertPDFConvert(event, files);
      };
      script.src = '/js/pdf.mjs';
      script.type = 'module';
      document.head.appendChild(script);
      return;
    }
  }
  wbInsertPDFConvert(event, files);
}
async function wbInsertPDFToImage(name, notificationId, srcBase64) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.mjs';
  const pdfData = atob(srcBase64.substring(28));
  const uint8ArrayPdf = new Uint8Array(pdfData.length);
  for (let i = 0; i < pdfData.length; ++i) {
    uint8ArrayPdf[i] = pdfData.charCodeAt(i);
  }
  const pdf = await pdfjsLib.getDocument({
    cMapPacked: true,
    cMapUrl: '/js/pdfjs/cmaps/',
    data: uint8ArrayPdf,
  }).promise;
  const canvas = document.createElement('canvas');
  const canvasContext = canvas.getContext('2d');
  const page = await pdf.getPage(1);
  const scale = 1.5;
  const viewport = page.getViewport({scale});
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  await page.render({canvasContext, viewport}).promise;
  wbImageAdd(name, notificationId, canvas.toDataURL('image/png'));
}
function wbInsertReset(event) {
  // Reset input value to allow re-upload of same file
  event.target.value = '';
}
function wbInsertTextInput(newText) {
  if (!wb.outer) {
    return;
  }
  // Create an actual HTML textarea element
  const textarea = document.createElement('textarea');
  textarea.className = 'wbTextInput';
  textarea.id = newText.id;
  textarea.rows = newText.rows;
  textarea.style.color = newText.color;
  textarea.style.fontFamily = newText.family;
  textarea.style.fontSize = `${newText.size}px`;
  textarea.style.left = `${newText.x + (wb.whiteboard.getBoundingClientRect().left ?? 0) + (window.scrollX || window.pageXOffset) + wb.camera.x}px`;
  textarea.style.padding = `${wb.textPadding}px`;
  textarea.style.top = `${newText.y + (wb.whiteboard.getBoundingClientRect().top ?? 0) + (window.scrollY || window.pageYOffset) + wb.camera.y}px`;
  textarea.style.width = `${newText.width}px`;
  textarea.value = newText.value;
  wb.outer?.appendChild(textarea);
  textarea.addEventListener('blur', (event) => {
    for (let i = 0; i < wb.elements.length; ++i) {
      if (newText.id === wb.elements[i]?.id && 'text' === wb.elements[i].type) {
        if ('' === newText.value.trim()) {
          wb.elements.splice(i, 1);
          event.target?.remove();
        } else {
          wb.elements[i].height = parseFloat(document.getElementById(wb.elements[i].id)?.getBoundingClientRect()?.height ?? 0);
          event.target?.remove();
          newText.display = true;
          wbStateSave();
          wbDraw();
        }
        break;
      }
    }
  });
  textarea.addEventListener('input', (event) => {
    newText.value = event.target.value;
    // Auto-adjust height
    event.target.rows = newText.rows = (newText.value.match(/\n/g) || []).length + 1;
    // Auto-adjust width
    let width = 30;
    for ( ; ; width += 10) {
      event.target.style.width = width + 'px';
      if (event.target.scrollHeight <= event.target.clientHeight) {
        break;
      }
    }
    newText.width = width + wb.textPadding * 2;
  });
  textarea.addEventListener('keydown', (event) => {
    'Enter' === event.key && !event.shiftKey && event.target.blur(); // Trigger blur event to finalize the text
  });
  textarea.addEventListener('mouseup', (event) => {
    wb.whiteboard.dispatchEvent(new CustomEvent('mouseup', event));
  });
}
function wbLinePassiveStop(partnerId) {
  wb.lines.currentPassive.delete(partnerId);
}
function wbLinePointsSave(elementId, points) {
  // Check whether points exist already
  for (const [key, value] of wb.lines.points) {
    if (points.length === value.length && points.every((p, i) => p.x === value[i].x && p.y === value[i].y)) {
      wb.lines.pointsReferences.set(elementId, key);
      return;
    }
  }
  // points not found -> create new entry
  wb.lines.points.set(elementId, points);
  wb.lines.pointsReferences.set(elementId, elementId);
}
function wbLinePush() {
  if (wb.lines.current.length) {
    const id = wbElementIdSet();
    wb.elements.push({
      color: wb.draw.color,
      dx: 0 - wb.camera.x,
      dy: 0 - wb.camera.y,
      id,
      type: 'line',
      width: wb.draw.width,
    });
    wbLinePointsSave(id, [...wb.lines.current]);
  }
}
function wbModeChange(mode) {
  wb.mode = mode;
  let pencilTitle = i18n('activatePencil');
  let whiteboardCursor = 'default';
  if ('default' === mode) {
    nav.draw.pencil?.classList.add('navActiveButton')
    nav.insert.text?.classList.remove('navActiveButton');
    pencilTitle = i18n('deactivatePencil');
    wb.control.grab.classList.remove('activeButton');
  } else if ('edit' === mode) {
    nav.draw.pencil?.classList.remove('navActiveButton');
    nav.insert.text?.classList.remove('navActiveButton');
    wb.control.grab.classList.remove('activeButton');
  } else if ('grab' === mode) {
    nav.draw.pencil?.classList.remove('navActiveButton');
    nav.insert.text?.classList.remove('navActiveButton');
    wb.control.grab.classList.add('activeButton');
    whiteboardCursor = 'url("' + png.grab + '") 10 10, grab';
  } else if ('textAdd' === mode) {
    nav.draw.pencil?.classList.remove('navActiveButton');
    nav.insert.text?.classList.add('navActiveButton');
    wb.control.grab.classList.remove('activeButton');
    whiteboardCursor = 'text';
  }
  nav.draw.pencil?.setAttribute('aria-label', pencilTitle);
  nav.draw.pencil && (nav.draw.pencil.title = pencilTitle);
  wb.whiteboard.style.cursor = whiteboardCursor;
}
function wbOnContextMenu(event) {
  event.preventDefault();
  wbContextMenuRemove(event);
  navActiveOptionsClose();
  const screen = wbPositionScreenGet(event);
  const world = wbPositionWorldGet(screen.x, screen.y);
  const index = wbElementHoverGetIndex(world.x, world.y);
  if (0 > index) {
    return;
  }
  const contextMenu = document.createElement('div');
  contextMenu.addEventListener('mouseleave', wbContextMenuOnMouseLeave);
  contextMenu.addEventListener('pointermove', wbContextMenuOnPointerMove);
  contextMenu.addEventListener('wheel', wbContextMenuOnWheel);
  contextMenu.classList.add('hidden');
  contextMenu.id = wb.contextMenu.id;
  contextMenu.innerHTML =
    '<button id="wbContextMenuCopy">'
      +svg.copy
      +'<p>' + i18n('copy') + '</p>'
    +'</button>'
    +'<button' + (wb.elements[index + 1] ? '' : ' disabled') + ' id="wbContextMenuLayerUp">'
      +svg.layerUp
      +'<p>' + i18n('moveUp') + '</p>'
    +'</button>'
    +'<button' + (wb.elements[index - 1] ? '' : ' disabled') + ' id="wbContextMenuLayerDown">'
      +svg.layerDown
      +'<p>' + i18n('moveDown') + '</p>'
    +'</button>'
    +'<button id="wbContextMenuDelete">'
      +svg.recycleBin
      +'<p>' + i18n('delete') + '</p>'
    +'</button>'
    +'<button id="wbContextMenuLock">'
      +svg.lock
      +'<p>' + i18n('lock') + '</p>'
      +'<div class="checkmark' + (wb.elements[index]?.isLocked ? '' : ' hidden') + '">'
        +svg.checkmark
      +'</div>'
    +'</button>';
  contextMenu.setAttribute('data-elements-index', index);
  document.body.appendChild(contextMenu);
  const contextMenuRect = contextMenu.getBoundingClientRect();
  contextMenu.style.left = (event.pageX - (event.clientX + contextMenuRect.width >= window.innerWidth ? contextMenuRect.width : 0)) + 'px';
  contextMenu.style.top = (event.pageY - (event.clientY + contextMenuRect.height >= window.innerHeight ? contextMenuRect.height : 0)) + 'px';
  contextMenu.classList.remove('hidden');
}
function wbOnMouseDown(event) {
  if (event.isTrusted && 0 !== event.button && 'mousedown' === event.type) {
    return;
  }
  'touchstart' === event.type && event.preventDefault();
  wbContextMenuRemove(event);
  let redraw = false;
  const screen = wbPositionScreenGet(event);
  const world = wbPositionWorldGet(screen.x, screen.y);
  // Deselect any previously selected element
  wb.selected && (redraw = true);
  const selectedIdOld = wb.selected?.id;
  wb.selected = null;
  // Start line drawing
  if ('default' === wb.mode) {
    wb.mode = 'lineDrawing';
    this.style.cursor = 'crosshair';
    wb.lines.current = [{x: screen.x, y: screen.y}];
    wb.ctx.beginPath();
    wb.ctx.arc(screen.x, screen.y, wb.draw.width / 2, 0, Math.PI * 2);
    wb.ctx.fillStyle = wb.draw.color;
    wb.ctx.fill();
    dataChannelSend({
      area: 'whiteboard',
      command: 'drawStart',
      fillStyle: wb.draw.color,
      lineWidth: wb.draw.width,
      x: world.x,
      y: world.y,
    });
  // Handle dragging/resizing existing elements
  } else if ('edit' === wb.mode) {
    // Check for text resizing handles first (if a text is already selected)
    if (false) {
      const handles = wbCursorResizeGet(wb.selected);
      for (const corner in handles) {
        const handle = handles[corner];
        if (Math.abs(world.x - handle.x) < 10 && Math.abs(world.y - handle.y) < 10) {
          wb.mode = 'textResizing';
          wb.textResizeCorner = corner;
          redraw && wbDraw();
          return;
        }
      }
    }
    const index = wbElementHoverGetIndex(world.x, world.y);
    if (0 <= index && wb.elements[index]) {
      const element = wb.elements[index];
      if (element.isLocked) {
        return;
      }
      if ('image' === element.type) {
        const handles = wbResizeHandlesGet(element);
        let isCorner = false;
        for (const corner in handles) {
          const handle = handles[corner];
          if (Math.abs(world.x - handle.x) < 10 && Math.abs(world.y - handle.y) < 10) {
            isCorner = true;
            wb.mode = 'imageResizing';
            wb.images.resizeCorner = corner;
            wb.selected = element;
            break;
          }
        }
        if (!isCorner
        && world.x >= element.x && world.x <= element.x + element.width
        && world.y >= element.y && world.y <= element.y + element.height) {
          wb.images.offsetX = world.x - element.x;
          wb.images.offsetY = world.y - element.y;
          wb.mode = 'imageDragging';
          wb.selected = element;
          this.style.cursor = 'move';
        }
      } else if ('line' === element.type) {
        wb.dragStart = {
          dx: element.dx,
          dy: element.dy,
          mouseX: world.x,
          mouseY: world.y,
        };
        wb.mode = 'lineDragging';
        wb.selected = element;
        return;
      } else if ('text' === element.type) {
        if (world.x >= element.x && world.x <= element.x + element.width
        && world.y >= element.y && world.y <= element.y + element.height) {
          wb.selected = element;
          // Start dragging the text field if no resizing
          wb.textInitialX = world.x;
          wb.textInitialY = world.y;
          wb.isTextDragged = false;
          wb.mode = 'textDragging';
          wb.textOffsetX = world.x - element.x;
          wb.textOffsetY = world.y - element.y;
          this.style.cursor = 'move';
          event.stopPropagation(); // Prevent canvas dragging if text is clicked
        }
      }
    }
  // Change camera of whiteboard
  } else if ('grab' === wb.mode) {
    this.style.cursor = generalSVGToCursor(svg.grabbing, 10, 10) + ', grabbing';
    wb.camera.startX = screen.x - wb.camera.x;
    wb.camera.startY = screen.y - wb.camera.y;
    wb.isPanning = true;
  // Add textarea element
  } else if ('textAdd' === wb.mode) {
    nav.insert.text?.classList.remove('navActiveButton');
    const width = 30;
    const dummy = document.createElement('textarea');
    dummy.name = 'dummy';
    dummy.rows = '1';
    dummy.style.border = '1px solid blue';
    dummy.style.fontFamily = wb.text.family;
    dummy.style.fontSize = wb.text.size.current + 'px';
    dummy.style.padding = wb.textPadding + 'px';
    dummy.style.resize = 'none';
    dummy.style.visibility = 'hidden';
    dummy.style.width = width + 'px';
    document.body.appendChild(dummy);
    const height = parseFloat(dummy.getBoundingClientRect().height);
    dummy.remove();
    const newText = new WhiteboardText(true, wbElementIdSet(), world.x, world.y, width, height, '', wb.text.size.current, wb.text.family, wb.text.color, 1);
    wb.elements.push(newText);
    wb.selected = newText; // Select the newly created text
    wbInsertTextInput(newText);
    redraw && wbDraw();
    return;
  }
  selectedIdOld !== wb.selected?.id && (redraw = true);
  redraw && wbDraw();
}
function wbOnMouseLeave(event) {
  if (wb.contextMenu.id === event.relatedTarget?.parentElement?.id) {
    return;
  }
  wbOut();
}
function wbOnMouseUp(event) {
  'touchend' === event.type && event.preventDefault();
  clearTimeout(wb.pointerDown.timeout);
  wb.pointerDown.timeout = null;
  if (event.isTrusted && 0 !== event.button && 'mouseup' === event.type) {
    return;
  }
  if ('lineDrawing' === wb.mode) {
    wbLinePush();
  } else if ('textAdd' === wb.mode) {
    const textInputs = document.querySelectorAll('.wbTextInput');
    textInputs[textInputs.length - 1]?.focus();
    wbModeChange('edit');
    return;
  } else if ('textDragging' === wb.mode) {
    if (!wb.isTextDragged) { // Edit text
      for (let i = 0; i < wb.elements.length; ++i) {
        if ('text' !== wb.elements[i].type) {
          continue;
        }         
        if (wb.selected?.id === wb.elements[i].id) {
          const newText = new WhiteboardText(false, wb.elements[i].id, wb.elements[i].x, wb.elements[i].y, wb.elements[i].width, wb.elements[i].height, wb.elements[i].value, wb.elements[i].size, wb.elements[i].family, wb.elements[i].color, wb.elements[i].rows);
          wb.elements[i] = newText;
          wb.selected = newText;
          wbDraw();
          wbInsertTextInput(newText);
          document.getElementById(newText.id)?.focus();
          break;
        }
      }
    } else {
      wb.isTextDragged = false;
    }
  }
  const selectedId = wb.selected?.id;
  wbUp();
  if ('touchend' === event.type && isString(selectedId)) {
    wb.selected = null;
    wbDraw();
  }
}
function wbOnPointerDown(event) {
  if (!['pen', 'touch'].includes(event.pointerType)) {
    return;
  }
  clearTimeout(wb.pointerDown.timeout);
  wb.pointerDown.timeout = setTimeout(() => {
    wbOnContextMenu(event);
    wb.whiteboard.dispatchEvent(new Event('touchend'));
  }, wb.pointerDown.duration);
}
function wbOnPointerMove(event) {
  'touch' === event.pointerType && event.preventDefault();
  clearTimeout(wb.pointerDown.timeout);
  wb.pointerDown.timeout = null;
  const screen = wbPositionScreenGet(event);
  const world = wbPositionWorldGet(screen.x, screen.y);
  const currentElement = 'touch' === event.pointerType ? document.elementFromPoint(event.clientX, event.clientY) : event.target;
  if ('whiteboard' === currentElement?.id) {
    dataChannelSend({
      area: 'whiteboard',
      command: 'cursorPosition',
      x: world.x,
      y: world.y,
    });
    wb.partnerCursorOffSent = false;
  }
  let cursorSet = false;
  let redraw = false;
  if ('edit' === wb.mode) {
    const index = wbElementHoverGetIndex(world.x, world.y);
    if (0 <= index && wb.elements[index]) {
      wb.isHover = true;
      const element = wb.elements[index];
      const isLocked = element.isLocked;
      isString(element.id) && (wb.selected = element);
      if (isLocked) {
        this.style.cursor = 'not-allowed';
        cursorSet = true;
      } else if (['image', 'text'].includes(element.type)) {
        // Cursor for image corner resizing
        const handles = wbCursorResizeGet(element);
        for (const corner in handles) {
          const handle = handles[corner];
          if (Math.abs(world.x - handle.x) < 10 && Math.abs(world.y - handle.y) < 10) {
            this.style.cursor = corner + '-resize';
            cursorSet = true;
            break;
          }
        }
      }
      redraw = true;
      if (!cursorSet) {
        this.style.cursor = 'move';
        cursorSet = true;
      }
    } else { // does not hover an element
      if (wb.isHover) {
        !document.getElementById('wbContextMenu')?.contains(event.target) && wbDeselect() && (redraw = true); // unhighlight when leaving element
        wb.isHover = false;
      }
    }
  // Change camera of whiteboard
  } else if ('grab' === wb.mode) {
    if (wb.isPanning) {
      redraw = true;
      wb.camera.x = screen.x - wb.camera.startX;
      wb.camera.y = screen.y - wb.camera.startY;
    }
  // Existing image dragging
  } else if ('imageDragging' === wb.mode && wb.selected) {
    wb.selected.x = world.x - wb.images.offsetX;
    wb.selected.y = world.y - wb.images.offsetY;
    redraw = true;
    dataChannelSend({
      area: 'whiteboard',
      command: 'imageDragging',
      id: wb.selected.id,
      x: wb.selected.x,
      y: wb.selected.y,
    });
  // Existing image resizing
  } else if ('imageResizing' === wb.mode && wb.selected) {
    const ih = wb.selected.height;
    const iw = wb.selected.width;
    const ix = wb.selected.x;
    const iy = wb.selected.y;
    switch (wb.images.resizeCorner) {
      case 'ne':
        wb.selected.height = Math.max(wb.images.minSize, ih + (iy - world.y));
        wb.selected.width = Math.max(wb.images.minSize, world.x - ix);
        wb.selected.y = iy + ih - wb.selected.height;
        break;
      case 'nw':
        wb.selected.height = Math.max(wb.images.minSize, ih + (iy - world.y));
        wb.selected.width = Math.max(wb.images.minSize, iw + (ix - world.x));
        wb.selected.x = world.x;
        wb.selected.y = iy + ih - wb.selected.height;
        break;
      case 'se':
        wb.selected.height = Math.max(wb.images.minSize, world.y - iy);
        wb.selected.width = Math.max(wb.images.minSize, world.x - ix);
        break;
      case 'sw':
        wb.selected.height = Math.max(wb.images.minSize, world.y - iy);
        wb.selected.width = Math.max(wb.images.minSize, iw + (ix - world.x));
        wb.selected.x = ix + iw - wb.selected.width;
        break;
    }
    redraw = true;
    dataChannelSend({
      area: 'whiteboard',
      command: 'imageResizing',
      height: wb.selected.height,
      id: wb.selected.id,
      width: wb.selected.width,
      x: wb.selected.x,
      y: wb.selected.y,
    });
  // Existing line dragging
  } else if ('lineDragging' === wb.mode) {
    if (wb.selected) {
      if (wb.selected && wb.dragStart) {
        wb.selected.dx = wb.dragStart.dx + (world.x - wb.dragStart.mouseX);
        wb.selected.dy = wb.dragStart.dy + (world.y - wb.dragStart.mouseY);
      }
      redraw = true;
      dataChannelSend({
        area: 'whiteboard',
        command: 'lineDragging',
        dx: wb.selected.dx,
        dy: wb.selected.dy,
        id: wb.selected.id,
      });
    }
  // Existing line drawing
  } else if ('lineDrawing' === wb.mode) {
    const point = {x: screen.x, y: screen.y};
    wb.lines.current.push(point);
    wb.ctx.lineCap = 'round';
    wb.ctx.lineJoin = 'round';
    wb.ctx.lineWidth = wb.draw.width;
    wb.ctx.shadowBlur = 0;
    wb.ctx.strokeStyle = wb.draw.color;
    wb.ctx.beginPath();
    const last = wb.lines.current[wb.lines.current.length - 2];
    if (last) {
      wb.ctx.moveTo(last.x, last.y);
      wb.ctx.lineTo(point.x, point.y);
      wb.ctx.stroke();
    }
    dataChannelSend({
      area: 'whiteboard',
      command: 'draw',
      fillStyle: wb.ctx.fillStyle,
      lineWidth: wb.ctx.lineWidth,
      strokeStyle: wb.ctx.strokeStyle,
      x: world.x,
      y: world.y,
    });
  // Handle text dragging
  } else if ('textDragging' === wb.mode) {
    if (wb.selected) {
      if (world.x !== wb.textInitialX || world.y !== wb.textInitialY) {
        wb.isTextDragged = true;
        wb.selected.x = world.x - wb.textOffsetX;
        wb.selected.y = world.y - wb.textOffsetY;
        redraw = true;
        dataChannelSend({
          area: 'whiteboard',
          command: 'textDragging',
          id: wb.selected.id,
          x: wb.selected.x,
          y: wb.selected.y,
        });
      }
    }
  // Handle text resizing
  } else if ('textResizing' === wb.mode) {
    if (wb.selected) {
      const minSize = 20; // Minimum size for text field
      const tx = wb.selected.x;
      const ty = wb.selected.y;
      const tw = wb.selected.width;
      const th = wb.selected.height;
      switch (wb.textResizeCorner) {
        case 'ne':
          wb.selected.height = Math.max(minSize, th + (ty - world.y));
          wb.selected.width = Math.max(minSize, world.x - tx);
          wb.selected.y = ty + th - wb.selected.height; // Adjust world.y if resizing from top
          break;
        case 'nw':
          wb.selected.height = Math.max(minSize, th + (ty - world.y));
          wb.selected.width = Math.max(minSize, tw + (tx - world.x));
          wb.selected.x = world.x;
          wb.selected.y = ty + th - wb.selected.height;
          break;
        case 'se':
          wb.selected.height = Math.max(minSize, world.y - ty);
          wb.selected.width = Math.max(minSize, world.x - tx);
          break;
        case 'sw':
          wb.selected.height = Math.max(minSize, world.y - ty);
          wb.selected.width = Math.max(minSize, tw + (tx - world.x));
          wb.selected.x = tx + tw - wb.selected.width; // Adjust x if resizing from left
          break;
      }
      // Update HTML input dimensions if it's active
      const activeInput = document.querySelector(`.wbTextInput[data-text-id="${wb.selected.id}"]`);
      if (activeInput) {
        activeInput.style.left = `${wb.selected.x}px`;
        activeInput.style.top = `${wb.selected.y}px`;
        activeInput.style.width = `${wb.selected.width}px`;
        activeInput.style.height = `${wb.selected.height}px`;
      }
      redraw = true;
      dataChannelSend({
        area: 'whiteboard',
        command: 'textResizing',
        height: wb.selected.height,
        id: wb.selected.id,
        width: wb.selected.width,
        x: wb.selected.x,
        y: wb.selected.y,
      });
    }
  }
  if (!cursorSet && !['grab', 'imageDragging', 'imageResizing', 'lineDrawing', 'textAdd', 'textDragging', 'textResizing'].includes(wb.mode)) {
    this.style.cursor = 'default';
  }
  redraw && wbDraw();
}
function wbOut() {
  const redraw = wbDeselect();
  'lineDrawing' === wb.mode && wbLinePush();
  !wbUp() && redraw && wbDraw();
  wbPartnerCursorOffSend();
}
function wbPartnerCursorOffSend() {
  if (!wb.partnerCursorOffSent) {
    dataChannelSend({
      area: 'whiteboard',
      command: 'cursorPositionOff',
    });
    wb.partnerCursorOffSent = true;
  }
}
function wbPositionScreenGet(event) {
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const clientY = event.touches ? event.touches[0].clientY : event.clientY;
  const whiteboardRect = wb.whiteboard.getBoundingClientRect();
  return {
    x: clientX - whiteboardRect.left,
    y: clientY - whiteboardRect.top
  };
}
function wbPositionWorldGet(x, y) {
  return {
    x: x - wb.camera.x,
    y: y - wb.camera.y,
  };
}
function wbResizeHandlesGet(image) {
  return {
    ne: {x: image.x + image.width, y: image.y},
    nw: {x: image.x, y: image.y},
    se: {x: image.x + image.width, y: image.y + image.height},
    sw: {x: image.x, y: image.y + image.height},
  };
}
function wbStackContainsElement(elementId, elements) {
  if (!isArray(elements)) {
    return false;
  }
  for (let i = elements.length - 1; 0 <= i; --i) {
    if (elementId === elements[i].id) {
      return true;
    }
  }
  return false;
}
function wbStackCurrentGet() {
  return wb.stack.undo[wb.stack.undo.length - 1] ?? null;
}
function wbStackIdGet() {
  return (userId ? `${userId}` : 'initiator') + '-' + (wb.stack.counter + 1 < Number.MAX_SAFE_INTEGER ? wb.stack.counter++ : wb.stack.counter = 0);
}
function wbStackMissing(stackId, stacksIds) {
  const partnerIds = wb.stack.missing.partnerIds.get(stackId);
  if (!isArray(partnerIds)) {
    return;
  }
  clearTimeout(wb.stack.missing.timeout.get(stackId));
  if (!partnerIds.length) {
    wb.stack.missing.partnerIds.delete(stackId);
    wb.stack.missing.timeout.delete(stackId);
    return;
  }
  for (let i = 0; i < partnerIds.length; ++i) {
    if (dataChannels.get(partnerIds[i])) {
      break;
    }
    partnerIds.shift();
    --i;
  }
  if (!partnerIds.length) {
    wb.stack.missing.partnerIds.delete(stackId);
    wb.stack.missing.timeout.delete(stackId);
    return;
  }
  wb.stack.missing.partnerIds.set(stackId, partnerIds);
  if (stacksIds) {
    const ids = stacksIds.get(partnerIds[0]) || [];
    !ids.includes(stackId) && stacksIds.set(partnerIds[0], ids.concat(stackId));
  } else { // due to timeout
    dataChannelSendLargeMessage({
      area: 'whiteboard',
      command: 'stacksMissing',
      ids: [stackId],
    }, {partnerId: partnerIds[0]});
  }
  // Rotate: move first partner to the end
  wb.stack.missing.partnerIds.set(stackId, [...partnerIds.slice(1), partnerIds[0]]);
  wb.stack.missing.timeout.set(stackId, setTimeout(wbStackMissing, wb.stack.missing.interval, stackId));
}
function wbStackRedoClear() {
  if (!wb.stack.redo.length) {
    return;
  }
  // Collect element IDs still referenced by undo
  const keepIds = new Set();
  for (let i = wb.stack.undo.length - 1; 0 < i; --i) {
    const elements = wb.stack.undo[i].elements;
    if (!isArray(elements)) {
      continue;
    }
    for (let j = elements.length - 1; 0 <= j; --j) {
      const id = elements[j]?.id;
      isString(id) && keepIds.add(id);
    }
  }
  // Process redo stacks
  for (let i = wb.stack.redo.length - 1; 0 <= i; --i) {
    const stack = wb.stack.redo[i];
    !wb.stack.deleted.includes(stack.id) && wb.stack.deleted.push(stack.id);
    wb.stack.byId.delete(stack.id);
    wb.element.index.delete(stack.id);
    const elements = stack.elements;
    if (!isArray(elements)) {
      continue;
    }
    for (let j = elements.length - 1; 0 <= j; --j) {
      const element = elements[j];
      const id = element?.id;
      if (!isString(id) || keepIds.has(id)) {
        continue;
      }
      if ('image' === element.type) {
        wb.images.img.delete(id);
      } else if ('line' === element.type) {
        wb.lines.pointsReferences.delete(id);
      }
    }
  }
  // Clean up orphaned line points
  for (const [elementId] of wb.lines.points) {
    if (!keepIds.has(elementId)) {
      wb.lines.points.delete(elementId);
    }
  }
}
function wbStackRegister(stack) {
  wb.stack.byId.set(stack.id, stack);
  return stack;
}
function wbStackUndoChanged(params) {
  const index = parseInt(document.getElementById('wbContextMenu')?.getAttribute('data-elements-index'), 10);
  if (isInt(index)) {
    wb.elements[index + 1] ? document.getElementById('wbContextMenuLayerUp')?.removeAttribute('disabled') : document.getElementById('wbContextMenuLayerUp')?.setAttribute('disabled', 'disabled');
    wb.elements[index - 1] ? document.getElementById('wbContextMenuLayerDown')?.removeAttribute('disabled') : document.getElementById('wbContextMenuLayerDown')?.setAttribute('disabled', 'disabled');
  }
  wb.controlOld.back.disabled = 2 > wb.stack.undo.length;
  wb.controlOld.forward.disabled = !wb.stack.redo.length;
  if (!params?.noStateSend) {
    wb.stack.changed = wbStartTimeDifferenceGet();
    wbStateSend(params?.stackCopy);
  }
}
function wbStackUnregister(stackId) {
  wb.stack.byId.delete(stackId);
}
function wbStackUndoReset() {
  wb.stack.undo = [{elements: [], id: wbStackIdGet(), modified: wbStartTimeDifferenceGet()}];
}
function wbStackUpdateTest(modifiedCurrent, modifiedNew, isAlpha) {
  return modifiedCurrent < modifiedNew || (modifiedCurrent === modifiedNew && isAlpha);
}
function wbStartTimeDifferenceGet() {
  return Date.now() - performance.timing.navigationStart + serverTime;
}
function wbStateCompare(news, partnerId) {
  // Handle incomingId to avoid multiple downloads of the same element
  if (isString(news.incomingId) && '' !== news.incomingId
  && !dataChannel.receive.partnerIdByIncomingId.has(news.incomingId)) {
    const incomingIds = dataChannel.receive.incomingIdsByPartnerId.get(partnerId) || new Set();
    if (!incomingIds.has(news.incomingId)) {
      incomingIds.add(news.incomingId);
      dataChannel.receive.incomingIdsByPartnerId.set(partnerId, incomingIds);
    }
    dataChannel.receive.partnerIdByIncomingId.set(news.incomingId, partnerId);
  }
  const isAlpha = !isAlphaUser(partnerId);
  // Prepare clean local copies
  const newRedo = wb.stack.redo.filter(item => item?.id && !wb.stack.deleted.includes(item.id));
  const newUndo = wb.stack.undo.slice(1).filter(item => item?.id && !wb.stack.deleted.includes(item.id));
  // Fast lookups
  const myRedoIds = new Set(newRedo.map(item => item.id));
  const myUndoIds = new Set(newUndo.map(item => item.id));
  const elementsMissing = new Map(); // Map<partnerId, elementIds[]>
  const redoMissing = new Set();
  const undoMissing = new Set();
  let stateChanged = false;
  // Update or move item between redo/undo
  const tryUpdateItem = (collection, item, targetCollection, shouldMoveToTarget) => {
    const index = collection.findIndex(it => it.id === item.id);
    if (index === -1) {
      return false;
    }
    const existing = collection[index];
    if (!wbStackUpdateTest(existing.modified, item.modified, isAlpha)) {
      return false;
    }
    if (shouldMoveToTarget) {
      // Move to another stack
      collection.splice(index, 1);
      existing.modified = item.modified;
      targetCollection.push(existing);
    } else {
      // Update only
      existing.modified = item.modified;
    }
    stateChanged = true;
    return true;
  };
  // Process news.stackRedo
  for (const pItem of news.stackRedo) {
    const {id, modified} = pItem;
    if (!isString(id)
    || wb.stack.deleted.includes(id)
    || !isInt(modified) || 0 > modified) {
      continue;
    }
    const inRedo = myRedoIds.has(id);
    const inUndo = myUndoIds.has(id);
    if (!inRedo && !inUndo) {
      const stack = wbStackRegister({...pItem});
      newRedo.push(stack);
      redoMissing.add(id);
      stateChanged = true;
      continue;
    }
   if (inRedo) {
      tryUpdateItem(newRedo, pItem, null, false);
    } else {
      tryUpdateItem(newUndo, pItem, newRedo, true);
    }
  }
  // Process news.stackUndo
  for (const pItem of news.stackUndo) {
    const {id, modified} = pItem;
    if (!isString(id)
     || wb.stack.deleted.includes(id)
     || !isInt(modified) || 0 > modified) {
      continue;
    }
    if (news.stackNew?.id === id) {
      wbElementsValid(news.stackNew.elements, partnerId, elementsMissing);
      const stack = wbStackRegister({...news.stackNew});
      newUndo.push(stack);
      wbElementIndexCreate(news.stackNew.elements, id);
      stateChanged = true;
      continue;
    }
    const inRedo = myRedoIds.has(id);
    const inUndo = myUndoIds.has(id);
    if (!inRedo && !inUndo) {
      const stack = wbStackRegister({...pItem});
      newUndo.push(stack);
      undoMissing.add(id);
      stateChanged = true;
      continue;
    }
    if (inRedo) {
      tryUpdateItem(newRedo, pItem, newUndo, true);
    } else {
      tryUpdateItem(newUndo, pItem, null, false);
    }
  }
  // Sort
  const sortByModifiedThenId = (a, b) => {
    const diff = (a.modified ?? 0) - (b.modified ?? 0);
    return diff !== 0 ? diff : (a.id ?? '').localeCompare(b.id ?? '');
  };
  // Apply new state
  wbElementsMaximalAll(newRedo);
  wbElementsMaximalAll(newUndo);
  if (newRedo.length) {
    newRedo.sort(sortByModifiedThenId);
    wb.stack.redo = newRedo;
  } else {
    wb.stack.redo = [];
  }
  newUndo.sort(sortByModifiedThenId);
  const previousCurrent = wbStackCurrentGet();
  wb.stack.undo = [
    wb.stack.undo[0],
    ...newUndo,
  ];
  // Cleanup deleted stacks from byId
  for (const id of wb.stack.deleted) {
    wbStackUnregister(id);
  }
  // Plausibility check to add missing elements
  if (isString(news.stackNew?.id)) {
    const index = newUndo.findIndex((s, i) => i > 0 && s.id === news.stackNew.id);
    index && wbElementsPlausibility(index);
  }
  // Load correct state
  const stackCurrent = wbStackCurrentGet();
  if (stackCurrent) {
    if (news.stackNew?.id) {
      wbStateLoad(stackCurrent.elements, news.stackNew.id);
    } else if (!wbStateEqual(previousCurrent, stackCurrent)) {
      wbStateLoad(stackCurrent.elements);
    }
  }
  stateChanged && wbStackUndoChanged({noStateSend: true});
  news.stackNew && wbLinePassiveStop(partnerId);
  // Request missing elements
  for (const [targetPartnerId, ids] of elementsMissing) {
    if (ids?.length) {
      dataChannelSendLargeMessage({
        area: 'whiteboard',
        command: 'elementsPropertyMissing',
        ids,
      }, {partnerId: targetPartnerId});
    }
  }
  // Request missing undo stacks
  if (undoMissing.size) {
    const requests = new Map(); // Map<partnerId, stackIds[]>
    for (const stackId of Array.from(undoMissing).reverse()) {
      let partners = wb.stack.missing.partnerIds.get(stackId) || [];
      if (partners.includes(partnerId)) {
        continue;
      }
      partners = [partnerId, ...partners];
      wb.stack.missing.partnerIds.set(stackId, partners);
      wbStackMissing(stackId, requests);
    }
    for (const [targetPartnerId, ids] of requests) {
      if (ids?.length) {
        dataChannelSendLargeMessage({
          area: 'whiteboard',
          command: 'stacksMissing',
          ids,
        }, {partnerId: targetPartnerId});
      }
    }
  }
  // Request missing redo stacks
  if (redoMissing.size) {
    const requests = new Map(); // Map<partnerId, stackIds[]>
    for (const stackId of Array.from(redoMissing).reverse()) {
      let partners = wb.stack.missing.partnerIds.get(stackId) || [];
      if (partners.includes(partnerId)) {
        continue;
      }
      partners = [partnerId, ...partners];
      wb.stack.missing.partnerIds.set(stackId, partners);
      wbStackMissing(stackId, requests);
    }
    for (const [targetPartnerId, ids] of requests) {
      if (ids?.length) {
        dataChannelSendLargeMessage({
          area: 'whiteboard',
          command: 'stacksMissing',
          ids,
        }, {partnerId: targetPartnerId});
      }
    }
  }
}
function wbStateEqual(s1, s2) {
  // simple JSON string compare for deep equality of lines + images + texts
  return JSON.stringify(s1) === JSON.stringify(s2);
}
function wbStateInitialise() {
  1 < wb.stack.undo.length && wbStateSave();
}
function wbStateLoad(elements, stackId) {
  if (!isArray(elements)) {
    return;
  }
  let redraw = false;
  if (stackId) {
    let found = false;
    for (let i = wb.stack.undo.length - 1; 0 < i; --i) {
      if (stackId === wb.stack.undo[i].id) {
        found = true;
        wb.stack.undo.length - 1 === i && (redraw = true);
        wb.stack.undo[i].elements = elements;
        wbElementIndexCreate(elements, wb.stack.undo[i].id);
        break;
      }
    }
    if (!found) {
      for (let i = wb.stack.redo.length - 1; 0 <= i; --i) {
        if (stackId === wb.stack.redo[i].id) {
          wb.stack.redo[i].elements = elements;
          wbElementIndexCreate(elements, wb.stack.redo[i].id);
          break;
        }
      }
    }
  }
  if (!stackId || redraw) {
    wb.elements = elements.map(element => {
      if ('image' === element.type) {
        return {...element, img: element.img}; // keep same Image ref
      }
      return {...element}; // line + text
    });
    wbDraw();
  }
  // Abort dragging and resizing if related element disappeared
  if (['imageDragging', 'imageResizing', 'lineDragging', 'textDragging', 'textResizing'].includes(wb.mode)) {
    let found = false;
    for (let i = wb.elements.length - 1; 0 <= i; --i) {
      if (isString(wb.selected?.id) && wb.selected.id === wb.elements[i]?.id) {
        found = true;
        break;
      }
    }
    if (!found) {
      wbModeChange('edit');
      wbDeselect() && wbDraw();
    }
  }
}
function wbStateSave(params) {
  const elements = wb.elements.map(element => 'image' === element.type ? wbImageMap(element) : 'text' === element.type ? wbTextMap(element) : {...element});
  if (wbStateEqual(wbStackCurrentGet()?.elements, elements)) {
    return;
  }
  const stackNew = {elements, id: wbStackIdGet(), modified: wbStartTimeDifferenceGet()};
  isString(params?.elementDeletedId) && (stackNew.elementDeletedId = params.elementDeletedId);
  wbElementIndexCreate(elements, stackNew.id);
  wbStackRegister({...stackNew});
  wb.stack.undo.push(stackNew);
  wbStackRedoClear();
  wb.stack.redo = [];
  const stackCopy = {};
  isString(params?.elementDeletedId) && (stackCopy.elementDeletedId = params.elementDeletedId);
  stackCopy.elements = wbElementsGetMinimal(wb.elements.map(element => 'image' === element.type ? wbImageMap(element) : 'text' === element.type ? wbTextMap(element) : {...element}), params);
  stackCopy.id = stackNew.id;
  stackCopy.modified = stackNew.modified;
  wbStackUndoChanged({stackCopy});
}
function wbStateSend(stackNew) {
  clearTimeout(wb.stateSend.timeout);
  const message = {
    area: 'whiteboard',
    command: 'state',
    stackChanged: wb.stack.changed,
    stackDeleted: wb.stack.deleted,
  };
  let imageId = '';
  let imageSrc = '';
  if (stackNew) {
    if (isArray(stackNew.elements)) {
      for (let i = stackNew.elements.length - 1; 0 <= i; --i) {
        if ('image' === stackNew.elements[i].type
        && isString(stackNew.elements[i].src)) {
          imageId = message.incomingId = stackNew.elements[i].id;
          imageSrc = stackNew.elements[i].src;
          delete stackNew.elements[i].src;
          break;
        }
      }
    }
    message.stackNew = stackNew;
  }
  message.stackRedo = wb.stack.redo.map(({id, modified}) => ({id, modified}));
  message.stackUndo = wb.stack.undo.slice(1).map(({id, modified}) => ({id, modified}));
  userId && dataChannelSendLargeMessage(message);
  if (userId && imageId && imageSrc) {
    dataChannelSendLargeMessage({
      area: 'whiteboard',
      command: 'elementsProperty',
      type: 'image',
      ids: [imageId],
      src: imageSrc,
    });
  }
  wb.stateSend.timeout = setTimeout(wbStateSend, wb.stateSend.delay);
}
function wbTextMap(text) {
  const keys = {
    color: text.color,
    display: text.display,
    family: text.family,
    height: text.height,
    id: text.id,
  };
  text.isLocked && (keys.isLocked = text.isLocked);
  keys.rows = text.rows;
  keys.size = text.size;
  keys.type = text.type;
  keys.value = text.value;
  keys.width = text.width;
  keys.x = text.x;
  keys.y = text.y;
  return keys;
}
function wbUp() {
  const selectedId = wb.selected?.id;
  let redrawn = false;
  wb.dragStart = wb.images.resizeCorner = wb.selected = wb.textInitialX = wb.textInitialY = wb.textResizeCorner = null;
  wb.draggingOffset = {...wbDefault.draggingOffset};
  wb.isPanning = false;
  if ('grab' === wb.mode) {
    wb.whiteboard.style.cursor = 'url("' + png.grab + '") 10 10, grab';
  } else if (['imageDragging', 'imageResizing', 'lineDragging', 'textDragging', 'textResizing'].includes(wb.mode)) {
    const modeOld = wb.mode;
    wbModeChange('edit');
    if ('lineDragging' === modeOld && isString(selectedId)) {
      wbStateSave({elementId: selectedId});
    } else {
      wbStateSave();
    }
  } else if ('lineDrawing' === wb.mode) {
    redrawn = true;
    wbModeChange('default');
    if ('line' === wb.elements[wb.elements.length - 1]?.type
    && isString(wb.elements[wb.elements.length - 1]?.id) && '' !== wb.elements[wb.elements.length - 1].id) {
      wbStateSave({elementId: wb.elements[wb.elements.length - 1].id});
    } else {
      wbStateSave();
    }
    wbDraw();
  }
  return redrawn;
}
class WhiteboardText {
  constructor(display, id, x, y, width, height, value, size, family, color, rows) {
    this.color = color || wb.text.color;
    this.display = display;
    this.family = family || wb.text.family;
    this.height = height;
    this.id = id;
    this.rows = rows;
    this.size = size || wb.text.size.current;
    this.type = 'text';
    this.value = value;
    this.width = width;
    this.x = x - wb.textPadding;
    this.y = y - wb.textPadding - size / 2;
  }
}
function windowOnResize(event) {
  navActiveOptionsOuterRepositioning(event);
  videoLocalOuter.offsetHeight && videoLocalTransition();
}
function wsClose() {
  ws && (ws.onclose = ws.onerror = ws.onmessage = ws.onopen = null);
  if (ws?.readyState === WebSocket.CONNECTING) {
    wsAbort = true;
  } else {
    wsAbort = null;
    ws?.close();
    ws = null;
  }
}
function wsCreate() {
  const room = new URLSearchParams(location.search).get('room');
  if (!isString(room) || '' === room || 'room' !== generalFileNameOfURL(location.href)) {
    return;
  }
  document.getElementById('createMeeting')?.classList.add('none');
  nav.video.hangUp?.removeAttribute('disabled');
  uiInviteLinkShow(location.href);
  wsClose();
  wsInitialize();
}
function wsInitialize() {
  if (wsAbort || window.wsReconnectTimeout) {
    return;
  }
  const room = new URLSearchParams(location.search).get('room');
  if (!isString(room) || '' === room || 'room' !== generalFileNameOfURL(location.href)) {
    return;
  }
  ws = new WebSocket(`wss://${location.host}/ws/`);
  ws.binaryType = 'blob';
  let timeoutId = setTimeout(() => {
    if (ws?.readyState === WebSocket.CONNECTING) {
      ws.close(1006, 'Handshake timeout');
      wsAbort = ws.onclose = ws.onerror = ws.onmessage = ws.onopen = null;
      wsCreate();
    }
  }, 1E4);
  ws.onclose = (event) => {
    wsAbort = null;
    if (!event.wasClean) {
      console.log('[WS-ONCLOSE] WebSocket connection was not closed cleanly.');
      wsReconnect();
    }
  };
  ws.onerror = () => {
    wsAbort = null;
    wsReconnect();
  };
  ws.onmessage = async (event) => {
    const raw = event.data instanceof Blob ? await event.data.text() : event.data;
    let msg;
    try {
      msg = JSON.parse(raw);
      //console.log('[WS-ONMESSAGE] Received message:', msg);
    } catch (error) {
      return;
    }
    if ('partnerId' in msg) {
      if (!isInt(msg.partnerId) || userId === msg.partnerId) {
        console.warn('[WS-ONMESSAGE] "partnerId" is not an integer or equal to userId.');
        return;
      }
    }
    if ('answer' === msg.type) {
      if (!msg.partnerId) {
        console.warn('[WS-ONMESSAGE] "partnerId" missing in answer.');
        return;
      }
      if (!rtc.peerConnections.has(msg.partnerId)) {
        console.warn(`[WS-ONMESSAGE] No PeerConnection for partner ${msg.partnerId} to handle answer.`);
        return;
      }
      if (!isArray(msg.trackMeta)) {
        console.warn('[WS-ONMESSAGE] "trackMeta" missing in answer.');
        return;
      }
      const peerConnection = rtc.peerConnections.get(msg.partnerId);
      rtcRemoteTrackMetaCreate(msg.partnerId, msg.trackMeta)
      if ('have-local-offer' !== peerConnection.signalingState) {
        console.log(`[WS-ONMESSAGE] Queuing answer due to invalid signaling state for partner ${msg.partnerId}:`, peerConnection.signalingState);
        rtcQueueAnswerWithTimeout(msg, msg.partnerId);
        return;
      }
      try {
        //console.log(`[WS-ONMESSAGE] Processing answer for partner ${msg.partnerId}.`);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
        await rtcAddQueuedCandidates(msg.partnerId);
      } catch (error) {
        console.error(`[WS-ONMESSAGE] Error processing answer for partner ${msg.partnerId}:`, error);
        if ('InvalidStateError' === e.name) {
          console.log(`[WS-ONMESSAGE] Resetting PeerConnection for partner ${msg.partnerId} due to InvalidStateError.`);
          videoEnd(msg.partnerId);
          await rtcCreatePeerConnectionInstance(msg.partnerId);
          dataChannelCreateInitiator(msg.partnerId);
          rtcQueueAnswerWithTimeout(msg, msg.partnerId);
        }
      }
    } else if ('candidate' === msg.type) {
      if (!msg.partnerId) {
        console.warn('[WS-ONMESSAGE] "partnerId" missing in candidate.');
        return;
      }
      if (!rtc.iceCandidatesQueues.has(msg.partnerId)) rtc.iceCandidatesQueues.set(msg.partnerId, []);
      rtc.iceCandidatesQueues.get(msg.partnerId).push(msg.candidate);
      rtc.peerConnections.has(msg.partnerId) && rtc.peerConnections.get(msg.partnerId).remoteDescription?.type && rtcAddQueuedCandidates(msg.partnerId);
    } else if ('heartbeat' === msg.type) {
      return;
    } else if ('offer' === msg.type) {
      if (!msg.partnerId) {
        console.warn('[WS-ONMESSAGE] "partnerId" missing in offer.');
        return;
      }
      if (!isArray(msg.trackMeta)) {
        console.warn('[WS-ONMESSAGE] "trackMeta" missing in offer.');
        return;
      }
      if (rtc.isCreatingPCs.get(msg.partnerId)) {
        console.warn(`[WS-ONMESSAGE] Already processing an offer or creating a PC for partner ${msg.partnerId}. Queuing offer.`);
        rtcHandleOfferQueue(msg, msg.partnerId);
        return;
      }
      rtcRemoteTrackMetaCreate(msg.partnerId, msg.trackMeta);
      rtc.isCreatingPCs.set(msg.partnerId, true);
      await rtcHandleOffer(msg, msg.partnerId);
      rtc.isCreatingPCs.set(msg.partnerId, false);
    } else if ('peerDisconnected' === msg.type) {
      if (!msg.partnerId) {
        console.warn('[WS-ONMESSAGE] "partnerId" missing in peerDisconnected.');
        return;
      }
      if (!rtc.peerConnections.has(msg.partnerId)) {
        //console.log(`[WS-ONMESSAGE] Peer ${msg.partnerId} disconnected from the room but no peerConnection was established.`);
        return;
      }
      notificationsShow(i18n('userHasLeftTheMeeting', {partnerId: msg.partnerId}));
      videoRemotePlace();
      const setInitiator = !isInitiator && 1 === rtc.peerConnections.size;
      videoEnd(msg.partnerId);
      if (setInitiator) {
        isInitiator = true;
        //console.log('[RTC-FLOW] No peers left, set isInitiator to true.');
      }
    } else if ('peerJoined' === msg.type) {
      if (!msg.partnerId) {
        console.warn('[WS-ONMESSAGE] "partnerId" missing in peerJoined.');
        return;
      }
      notificationsShow(i18n('userHasJoinedTheMeeting', {partnerId: msg.partnerId}));
      videoRemotePlace();
      if (!rtc.peerConnections.has(msg.partnerId)) {
        //console.log(`[RTC-FLOW] Creating new PeerConnection for partner ${msg.partnerId}.`);
        await rtcCreatePeerConnectionInstance(msg.partnerId);
        dataChannelCreateInitiator(msg.partnerId);
      }
    } else if ('userId' === msg.type) {
      if (!isInt(msg.userId)) {
        return;
      }
      if (userId) {
        userId = msg.userId;
        return;
      }
      userId = msg.userId;
      const newPrefix = `${userId}-`;
      const prefix = 'initiator-';
      const rename = id => id.startsWith(prefix) ? newPrefix + id.slice(prefix.length) : id;
      const renameIdsOfElements = function(elements) {
        if (isArray(elements)) {
          for (const item of elements) {
            item.id?.startsWith(prefix) && (item.id = rename(item.id));
          }
        }
      };
      // Rename wb.elements
      renameIdsOfElements(wb.elements);
      // Rename stacks
      const renameStackCollection = stack => {
        for (const entry of stack) {
          if (!isString(entry?.id)) {
            continue;
          }
          const oldId = entry.id;
          const newId = rename(oldId);
          if (newId !== oldId) {
            entry.id = newId;
            wb.stack.byId.delete(oldId);
            wb.stack.byId.set(newId, entry);
          }
          if (isString(entry.elementDeletedId)) {
            entry.elementDeletedId = rename(entry.elementDeletedId);
          }
          renameIdsOfElements(entry.elements);
        }
      };
      renameStackCollection(wb.stack.undo);
      renameStackCollection(wb.stack.redo);
      // Rename deleted stack IDs
      for (let i = 0; i < wb.stack.deleted.length; ++i) {
        wb.stack.deleted[i] = rename(wb.stack.deleted[i]);
      }
      for (const [key, img] of [...wb.images.img.entries()]) {
        const newKey = rename(key);
        if (newKey !== key) {
          wb.images.img.delete(key);
          wb.images.img.set(newKey, img);
        }
      }
      // Rename line points + references
      for (const [key, points] of [...wb.lines.points.entries()]) {
        const newKey = rename(key);
        if (newKey !== key) {
          wb.lines.points.delete(key);
          wb.lines.points.set(newKey, points);
        }
      }
      for (const [key, value] of [...wb.lines.pointsReferences.entries()]) {
        const newKey = rename(key);
        const newValue = rename(value);
        if (newKey !== key || newValue !== value) {
          wb.lines.pointsReferences.delete(key);
          wb.lines.pointsReferences.set(newKey, newValue);
        }
      }
      // Rebuild element index
      wb.element.index.clear();
      const rebuildIndexFromStack = stack => {
        for (const entry of stack) {
          if (!entry?.id || !isArray(entry.elements)) {
            continue;
          }
          wbElementIndexCreate(entry.elements, entry.id);
        }
      };
      rebuildIndexFromStack(wb.stack.undo);
      rebuildIndexFromStack(wb.stack.redo);
    }
  };
  ws.onopen = async () => {
    dataChannels.clear();
    rtcClear();
    clearTimeout(timeoutId);
    wsAbort = null;
    wsSend({room, type: 'join'});
  };
}
function wsReconnect() {
  wsReconnectTimeout = setTimeout(() => {
    window.wsReconnectTimeout && delete window.wsReconnectTimeout;
    if (ws?.readyState === WebSocket.OPEN) {
      return;
    }
    console.log(`WebSocket connection error. Attempting to reconnect.`);
    wsCreate();
  }, 3E3);
}
function wsSend(message) {
  if (ws?.readyState === WebSocket.OPEN
  && isJsonPlain(message)) {
    //console.log('[WS-SEND] Sending message:', message.type, message);
    ws.send(JSON.stringify(message));
  }
}
i18nConvert(document);
wbStackUndoReset();
(async () => {
  await rtcLocalAcquire();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fontsDecode = [
    '16px Caveat',
    '16px Dancing Script',
    '16px Dosis',
    '16px Pacifico',
    '16px Poppins',
  ];
  for (const font of fontsDecode) {
    ctx.font = font;
    ctx.measureText(' '); // forces font load
  }
  await document.fonts.ready;
  for (const font of fontsDecode) {
    if (document.fonts.check(font)) {
      fonts.push(font.substring(font.indexOf(' ') + 1));
    } else {
      console.log(`Font not available: ${font}`);
    }
  }
  fonts.sort((a, b) => a.localeCompare(b, 'en', {sensitivity: 'base'}));
  nav.text.family.classList.add('family' + fonts[0].replaceAll(' ', ''));
  const span = document.createElement('span');
  span.textContent = fonts[0];
  nav.text.family.textContent = '';
  nav.text.family.appendChild(span);
  wb.text.family = fonts[0];
  navTextSizeFamily();
  const elements = wbStackCurrentGet()?.elements;
  if (isArray(elements)) {
    for (let i = 0; i < elements.length; ++i) {
      if ('text' === elements[i].type) {
        wbDraw();
        break;
      }
    }
  }
})();
// Assign event listeners
document.getElementById('chatAll')?.addEventListener('transitionend', chatAllOnTransitionEnd);
document.addEventListener('click', documentOnClick);
document.addEventListener('mouseleave', documentOnMouseLeave);
document.getElementById('navInsertImageInput')?.addEventListener('change', wbInsertImageInputOnChange);
document.getElementById('navInsertPDFInput')?.addEventListener('change', wbInsertPDFInputOnChange);
wbEventListenerAdd();
chat.new?.addEventListener('focus', chatNewOnFocus);
chat.new?.addEventListener('input', chatNewOnInput);
chat.new?.addEventListener('keydown', chatNewOnKeyDown);
modal.outer?.addEventListener('close', modalOuterOnClose);
videoLocal.addEventListener('loadeddata', videoLocalOnLoadedData);
videoLocal.addEventListener('pause', videoLocalOnPause);
window.addEventListener('load', wbStateInitialise);
window.addEventListener('popstate', uiPopState);
window.addEventListener('resize', windowOnResize);
// Start
const wbPlaceHolder = new Image();
wbPlaceHolder.onload = () => {
  window.dispatchEvent(new CustomEvent('popstate', {detail: {keepVideo: true}}));
  videoRemotePlace();
  if (wb.outer) {
    wbStackUndoChanged({noStateSend: true});
    const hasNone = wb.outer.classList.contains('none');
    hasNone && wb.outer.classList.remove('none');
    const whiteboardRect = wb.whiteboard.getBoundingClientRect();
    hasNone && wb.outer.classList.add('none');
    wb.whiteboard.height = whiteboardRect.height;
    wb.whiteboard.width = whiteboardRect.width;
  }
  resizeObserver.observe(wb.whiteboard);
};
wbPlaceHolder.src = wb.placeHolderSrc;