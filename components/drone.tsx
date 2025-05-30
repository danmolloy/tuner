import { colors } from '@/lib/themes';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function DroneSynth({ note, playDrone }: { note: string, playDrone: boolean }) {
  const webviewRef = useRef<any>(null);

  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://unpkg.com/tone/build/Tone.js"></script>
      </head>
      <body style="margin:0;padding:0;background:#000;">
        <script>
         let synth;

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      console.log("Tone.js initializing...");
      await Tone.start();
      console.log("Tone.js started.");
      synth = new Tone.Oscillator("${note}", "sine").toDestination();
      synth.start();
      console.log("Oscillator started");

      window.addEventListener("message", (event) => {
        const newNote = event.data;
        console.log("Received note update:", newNote);
        if (synth && typeof newNote === 'string') {
          synth.frequency.value = newNote;
        }
      });
    } catch (err) {
      console.error("Tone init error:", err);
    }
  });
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    if (webviewRef.current && note) {
      webviewRef.current.postMessage(note);
    }
  }, [note]);

  return (
    <View style={{ width: 1, height: 1, backgroundColor: colors.primary, zIndex: -10, position: 'fixed' }}>
    {playDrone && <WebView
      ref={webviewRef}
      style={{ width: 1, height: 1, backgroundColor: colors.primary, zIndex: -10, position: 'fixed' }}
      originWhitelist={['*']}
      source={{ html }}
      javaScriptEnabled
      domStorageEnabled
      mediaPlaybackRequiresUserAction={false}
      allowsInlineMediaPlayback={true}
  useWebKit={true} 
    />}
    </View>
  );
}