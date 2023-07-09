import { useRef } from "react";
import DisplaySection from "./components/DisplaySection";
import Jumbutron from "./components/Jumbutron";
import Nav from "./components/Nav";
import SoundSection from "./components/SoundSection";
import WebgrViewer from "./components/WebgrViewer";

function App() {

  const webgiViewerRef = useRef(null)
  const contentRef = useRef(null)
  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview()
  }

  return (
    <div className="App">
      <div ref={contentRef} id="content">
      <Nav />
      <Jumbutron />
      <SoundSection />
      <DisplaySection triggerPreview={handlePreview} />

      </div>
      <WebgrViewer  contentRef={contentRef} ref={webgiViewerRef} />

    </div>
  );
}

export default App;
