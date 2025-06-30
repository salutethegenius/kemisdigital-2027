import { useEffect, useRef } from "react";
import Hero from "@/components/shared/Hero";
import { Card } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface JitsiMeetAPI {
  dispose: () => void;
}

export default function Meet() {
  const apiRef = useRef<JitsiMeetAPI | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadJitsiScript = () => {
      const script = document.createElement("script");
      script.src = "https://8x8.vc/vpaas-magic-cookie-6d18fbb1663c44269329864622231363/external_api.js";
      script.async = true;
      script.onload = () => {
        if (isMounted && containerRef.current) {
          initJitsiMeet();
        }
      };
      document.body.appendChild(script);
      return script;
    };

    const initJitsiMeet = () => {
      try {
        apiRef.current = new window.JitsiMeetExternalAPI("8x8.vc", {
          roomName: "vpaas-magic-cookie-6d18fbb1663c44269329864622231363/SampleAppMartialSpendingsOutlinePotentially",
          parentNode: containerRef.current,
          height: '100%',
          width: '100%',
          configOverwrite: {
            disableDeepLinking: true,
            startWithVideoMuted: false,
            startWithAudioMuted: false
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_REMOTE_DISPLAY_NAME: 'KemisDigital User'
          }
        });
      } catch (error) {
        console.error("Error initializing Jitsi Meet:", error);
      }
    };

    const script = loadJitsiScript();

    return () => {
      isMounted = false;
      if (apiRef.current) {
        apiRef.current.dispose();
      }
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <Hero
        title="Virtual Meeting Room"
        description="Connect with our team through secure video conferencing"
        showCTA={false}
      />
      <div className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <div 
            ref={containerRef}
            className="w-full aspect-video bg-black"
          />
        </Card>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Having trouble connecting? Make sure your camera and microphone are enabled.</p>
          <p>For the best experience, use Chrome or Firefox browsers.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
