import {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  timeout,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  DiamondPlugin,
  FrameFadePlugin,
  GLTFAnimationPlugin,
  GroundPlugin,
  BloomPlugin,
  TemporalAAPlugin,
  AnisotropyPlugin,
  GammaCorrectionPlugin,
  mobileAndTabletCheck,
  CanvasSnipper,
  addBasePlugins,
  TweakpaneUiPlugin,
  AssetManagerBasicPopupPlugin,
  CanvasSnipperPlugin,

  // Color, // Import THREE.js internals
  // Texture, // Import THREE.js internals
} from "webgi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrolAnimation } from "../lib/scroll-animation";

gsap.registerPlugin(ScrollTrigger);

// const WebgrViewer = forwardRef((props, ref) => {}

const WebgrViewer = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [viewerRef, setViewerRef] = useState(null);
  const [targetRef, setTargetRef] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [possitionRef, setPossitionRef] = useState(null);
  const canvasContainerRef = useRef(null);
  const [previewMood, setPreviewMood] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  const memoizedScrollAnimation = useCallback((possition, target,isMobile, onUpdate) => {
    if ((possition && target, onUpdate)) {
      scrolAnimation(possition, target,isMobile, onUpdate);
    }
  }, []);

  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    setViewerRef(viewer);
    const isMoblieOrTabletCheck = mobileAndTabletCheck();
    setIsMobile(isMoblieOrTabletCheck);
    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin);

    const camera = viewer.scene.activeCamera;
    const possition = camera.position;
    const target = camera.target;

    setCameraRef(camera);
    setPossitionRef(possition);
    setTargetRef(target);

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(true));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    await viewer.addPlugin(BloomPlugin);
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)
    // and many more...

    // or use this to add all main ones at once.
    // await addBasePlugins(viewer);

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin);

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline();

    // Import and add a GLB file.
    await manager.addFromPath("scene-black.glb");

    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });


    if (isMoblieOrTabletCheck) {
      possition.set(-16.7,1.17,11.7)
      target.set(0,1.37,0)
      props.contentRef.current.className = 'mobile-or-tablet'
    }

    window.scrollTo(0, 0);

    let needsupdate = true;

    const onUpdate = () => {
      needsupdate = true;
      viewer.setDirty();
    };

    viewer.addEventListener("preFrame", () => {
      if (needsupdate) {
        camera.positionTargetUpdated(true);
        needsupdate = false;
      }
    });

    memoizedScrollAnimation(possition, target,isMoblieOrTabletCheck, onUpdate);

    // Load an environment map if not set in the glb file
    // await viewer.setEnvironmentMap((await manager.importer!.importSinglePath<ITexture>("./assets/environment.hdr"))!);

    // Add some UI for tweak and testing.
    // const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin);
    // // Add plugins to the UI to see their settings.
    // uiPlugin.setupPlugins <
    //   IViewerPlugin >
    //   (TonemapPlugin, CanvasSnipperPlugin);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      triggerPreview() {
        setPreviewMood(true);
        canvasContainerRef.current.style.pointerEvents = "all";
        props.contentRef.current.style.opacity = "0";
        gsap.to(possitionRef, {
          x: 13.04,
          y: -2.01,
          z: 2.29,
          duration: 2,
          onUpdate: () => {
            viewerRef.setDirty();
            cameraRef.positionTargetUpdated(true);
          },
        });
        gsap.to(targetRef, {
          x: 0.11,
          y: 0.0,
          z: 0.0,
          duration: 2,
        });

        viewerRef.scene.activeCamera.setCameraOptions({
          controlsEnabled: true,
        });
      },
    }),
    [viewerRef]
  );

  useEffect(() => {
    setupViewer();
  }, []);

  const handleExit = useCallback(() => {
    canvasContainerRef.current.style.pointerEvents = "none";
    props.contentRef.current.style.opacity = "1";
    viewerRef.scene.activeCamera.setCameraOptions({
      controlsEnabled: false,
    });
    setPreviewMood(false);

    gsap.to(possitionRef, {
      x: 1.56,
      y: 5.0,
      z: 0.01,
      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
      onUpdate: () => {
        viewerRef.setDirty();
        cameraRef.positionTargetUpdated(true);
      },
    });
    gsap.to(targetRef, {
      x: -0.55,
      y: 0.32,
      z: 0.0,

      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    });
    gsap.to(".display-section", {
      opacity: 1,

      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    });
  }, [
    previewMood,
    canvasContainerRef,
    viewerRef,
    possitionRef,
    targetRef,
    cameraRef,
  ]);

  return (
    <div ref={canvasContainerRef} id="webgi-canvas-container">
      <canvas id="webgi-canvas" ref={canvasRef} />
      {previewMood && (
        <button className="button" onClick={handleExit}>
          Exit
        </button>
      )}
    </div>
  );
});

export default WebgrViewer;
