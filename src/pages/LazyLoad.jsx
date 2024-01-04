import { useTransition, useState, lazy } from "react";

// Use React.lazy to create a new chunk.
const HeavyComponent = lazy(() => import("./ErrorPage"));

export default function LazyLoad() {
  // useTransition is used to let React know there will be a
  // rerender and component load when the button is pressed.
  const [, startTransition] = useTransition();

  const [load, setLoad] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            setLoad(true);
          });
        }}
      >
        Load Component
      </button>
      {load && <HeavyComponent />}
    </>
  );
}