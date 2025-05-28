import { WebView } from 'react-native-webview';

export default function DroneSynth({note }:{note: string}) {
  const html = `
    <html>
    <head>
      <script src="https://unpkg.com/tone/build/Tone.js"></script>
    </head>
    <body>
      <script>
        (async () => {
          await Tone.start();
          const synth = new Tone.Oscillator('${note}', 'sine').toDestination();
          synth.start();

          window.document.addEventListener('message', (event) => {
            const newNote = event.data;
            synth.frequency.value = newNote;
          });
          // Also listen to window message events, just in case
          window.addEventListener('message', (event) => {
            const newNote = event.data;
            synth.frequency.value = newNote;
          });
        })();
      </script>
    </body>
    </html>
  `;


  return (
    <WebView
        mediaPlaybackRequiresUserAction={false}

    style={{ width: 300, height: 200, zIndex: -20, position: "absolute", }}
      originWhitelist={['*']}
      source={{ html }}
      javaScriptEnabled
      domStorageEnabled
    />
  );
}