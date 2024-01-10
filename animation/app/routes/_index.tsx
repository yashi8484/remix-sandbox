import { Player, PlayerEvent } from "@lottiefiles/react-lottie-player";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <Player
        autoplay
        keepLastFrame
        // src="https://lottie.host/c404786e-2d84-4239-a092-5fa55366d5a7/DRPRrsgJH4.json"
        src="/animation-test.json" // public 配下がホスティングされるのは @remix-run/serve の仕様
        style={{ height: "300px", width: "300px", border: "1px solid #000" }}
        onEvent={(event) => {
          if (event === PlayerEvent.Error) {
            console.log({ event });
            console.log("lottie-player error event");
          } else if (event === PlayerEvent.Load) {
            console.log("lottie-player load event");
          } else if (event === PlayerEvent.Play) {
            console.log("lottie-player play event");
          }
        }}
      ></Player>
      <div>
        <span>This is test application.</span>
      </div>
    </>
  );
}
