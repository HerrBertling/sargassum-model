import { useState } from "preact/hooks";
import bgImage from "./sargassum-bg.jpg";

export function App() {
  const userLanguage = window?.navigator?.language || "en-US";
  const [thickness, setThickness] = useState(7);
  const [weight, setWeight] = useState(1.7);
  const [size, setSize] = useState(20);
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(userLanguage, {}).format(num);
  };
  const handleThicknessChange = (e: any) => {
    setThickness(e.target.value);
  };
  const handleWeightChange = (e: any) => {
    setWeight(e.target.value);
  };
  const handleSizeChange = (e: any) => {
    setSize(e.target.value);
  };
  const volumeInCubicMeters = Math.round((thickness / 100) * size * 1000000);
  const totalMassInTonnes = Math.round(weight * volumeInCubicMeters) / 1000;
  const totalCo2Sequestered = Math.round(totalMassInTonnes * 0.14);
  const formattedTotalMassInTonnes = formatNumber(totalMassInTonnes);
  const formattedTotalCo2Sequestered = formatNumber(totalCo2Sequestered);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white md:bg-left-bottom"
      style={{ backgroundImage: `url("${bgImage}")` }}
    >
      <div className="grid min-h-screen grid-cols-1 gap-8 bg-sky-900/70 bg-cover py-4 px-2  md:py-16 md:px-12">
        <div className="max-w-3xl">
          <h1 className="mt-6 mb-4 text-3xl font-semibold md:mt-0 md:text-5xl">
            A Sargassum farm model
          </h1>
          <p className="my-12 flex flex-col gap-2">
            <span className="text-4xl font-bold tabular-nums md:text-8xl">
              {formattedTotalCo2Sequestered}{" "}
              {totalCo2Sequestered > 100000000 && "🥳"}
            </span>
            <span className="text-2xl text-white/80 md:text-3xl">
              tons of CO<sub>2</sub> sequestered
            </span>
            <span className="text-base text-white/80 md:text-lg">
              from {formattedTotalMassInTonnes} tons of Sargassum (0.14 tonnes
              CO<sub>2</sub>/wet tonne Sargassum)
            </span>
          </p>
          <p className="mb-4 text-white/80">
            Use the inputs to get an idea of how much CO2 an open ocean
            sargassum farm (as imagined by{" "}
            <a className="text-sky-200 underline" href="https://seafields.eco">
              seafields.eco
            </a>
            ) could potentially sequester.
          </p>
          <form className="mt-6 grid grid-cols-1 gap-8 accent-sky-100">
            <label className="w-full max-w-lg">
              <span className="block text-lg font-semibold">
                <span className="text-white/80">
                  Average mat thickness in cm:
                </span>{" "}
                {thickness} cm
              </span>
              <input
                className="h-2 w-full appearance-none rounded-full bg-sky-600"
                type="range"
                min={7}
                max={80}
                value={thickness}
                onChange={handleThicknessChange}
              />
            </label>
            <label className="w-full max-w-lg">
              <span className="block text-lg font-semibold">
                <span className="text-white/80">
                  Average wet weight per m<sup>2</sup> in kg:
                </span>{" "}
                {weight} kg
              </span>
              <input
                className="h-2 w-full appearance-none rounded-full bg-sky-600"
                type="range"
                min={1.7}
                max={14}
                step={0.1}
                value={weight}
                onChange={handleWeightChange}
              />
            </label>
            <label className="w-full max-w-lg">
              <span className="block text-lg font-semibold">
                <span className="text-white/80">
                  Farm size in km<sup>2</sup>:
                </span>{" "}
                {size}km<sup>2</sup>
              </span>
              <input
                className="h-2 w-full appearance-none rounded-full bg-sky-600"
                type="range"
                min={1}
                max={100000}
                step={1}
                value={size}
                onChange={handleSizeChange}
              />
            </label>
          </form>
        </div>
        <footer className="mx-auto grid max-w-5xl grid-cols-1 gap-4 self-end justify-self-end text-right text-sm text-white">
          <p>
            😬 This is pretending to have one fixed point in time where the
            Sargassum is harvested, baled and sunk into the ocean.
            <br /> Also, the inputs are only averages, so in the end this is
            just a very rough and totally not accurate approximation.
          </p>
          <p>
            Idea + quick code by{" "}
            <a
              className="text-sky-200 underline transition-colors hover:text-sky-300"
              href="https://herrsiering.de"
            >
              Markus Siering
            </a>{" "}
            | Data + concept by{" "}
            <a
              className="text-sky-200 underline transition-colors hover:text-sky-300"
              href="https://seafields.eco"
            >
              Seafields
            </a>{" "}
            and{" "}
            <a
              className="text-sky-200 underline transition-colors hover:text-sky-300"
              href="https://www.youtube.com/watch?v=wOJmRSRlhi4"
            >
              this talk by Dr. Mar Fernández-Méndez
            </a>{" "}
            |{" "}
            <a
              className="text-sky-200 underline transition-colors hover:text-sky-300"
              href="https://github.com/HerrBertling/sargassum-model"
            >
              Code on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
