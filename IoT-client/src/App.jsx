import { useEffect, useState } from "react";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [temperature, setTemperature] = useState(0);
  const [dissolvedOxygen, setDissolvedOxygen] = useState(0);
  const [pH, setPH] = useState(0);
  const [turbidity, setTurbidity] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/data");
        const data = await response.json();
        setTemperature(data.temperature);
        setDissolvedOxygen(data.dissolvedOxygen);
        setPH(data.pH);
        setTurbidity(data.turbidity);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const getStatus = () => {
    if (
      temperature >= 28 &&
      temperature <= 31 &&
      turbidity >= 1 &&
      turbidity <= 5 &&
      pH >= 6.5 &&
      pH <= 8.5 &&
      dissolvedOxygen >= 5
    ) {
      return "Bagus";
    } else {
      return "Jelek";
    }
  };

  return (
    <>
      <section className="flex justify-center">
        <div className="bg-white w-96 p-4 border">
          <header className="bg-slate-300 bg-[url('https://s3-alpha-sig.figma.com/img/1f8d/9342/415b8d5c31db66e89f9d7f4a244d755f?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qxbVO9-2LthrLc1fibRi-9mLyBtEhy6IeE~uOt~c~hJaMzGwOgxIX9w4INFakxU0zDwW99YG8~U29GOGMdzm-qNcAkswm5N75B3CRTz4hrfMPBElrgO6ocoqYgz-AbgRRvkeaxURoHaDGH5HZx3pEhpyoPSPkJGa8RsmpoRPlRnQZRrY03BGsY6wWFodoQZdYF6AuFJeyNeSiglY0wLf8eRKsJqtj520N8CfVdFU6GGZkj~pWtFQCuZBOSZsd-aGviyGsruKdJpyyPiIM1WL3WGQsJydL5MSJnlEOiDbdUBZU6hYGpbiz6gwolKIIuqjOq2vo-Japsku5RjnSNEuRA__')] w-full rounded-3xl px-6 py-2 h-44 flex flex-col justify-between bg-cover ">
            <div className="flex justify-between items-center text-white ">
              <p className="text-sm">12 may 2025</p>
              <p className="text-2xl font-semibold">Welcome</p>
              <p className="text-sm">10:23 AM</p>
            </div>
            <div className="font-semibold text-white">
              <p>
                Status Air Hari ini: {' '}
                <span
                  className={`px-2 py-0.5 rounded-md text-white ${
                    getStatus() === "Bagus" ? "bg-green-400" : "bg-red-500"
                  }`}
                >
                  {getStatus()}
                </span>
              </p>
              <p>Pemantaun Kualitas Air Sungai</p>
            </div>
          </header>

          <main className="mt-4 space-y-5">
            <div className="text-center">
              <p className="font-semibold text-xl">Status</p>
              <div className="space-x-4 mt-2">
                <span className="bg-green-400 px-2 py-0.5 rounded-md text-white">
                  Bagus
                </span>
                <span className="bg-red-500 px-2 py-0.5 rounded-md text-white">
                  Jelek
                </span>
              </div>
            </div>

            <div className="bg-[#F7F1FF] rounded-xl px-4 py-2">
              <p className="font-semibold text-xl text-[#616161]">Suhu Air</p>
              <div className="flex justify-center items-center">
                <div className="w-36 h-36 rounded-full bg-[#EFEFEF] flex justify-center items-center shadow-xl overflow-hidden">
                  <p className="text-xl font-semibold text-[#616161]">
                    {temperature} C
                  </p>
                </div>
              </div>
              <div
                className={`size-2 rounded-md p-3 mt-2 ml-auto ${
                  temperature < 31 && temperature > 28
                    ? "bg-green-400"
                    : "bg-red-500"
                }`}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#F7F1FF] rounded-xl px-4 py-2">
                <p className="font-semibold text-lg text-[#616161]">
                  {" "}
                  Kekeruhan
                </p>
                <div className="flex justify-center items-center py-6">
                  <p className="text-xl font-semibold text-[#616161]">
                    {turbidity}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div>NTU</div>
                  <div
                    className={`size-2 rounded-md p-3 mt-2 ml-auto ${
                      turbidity >= 1 && turbidity <= 5
                        ? "bg-green-400"
                        : "bg-red-500"
                    }`}
                  ></div>
                </div>
              </div>

              <div className="bg-[#F7F1FF] rounded-xl px-4 py-2">
                <p className="font-semibold text-lg text-[#616161]"> pH Air</p>
                <div className="flex justify-center items-center py-6">
                  <p className="text-xl font-semibold text-[#616161]">{pH}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>pH</div>
                  <div
                    className={`size-2 rounded-md p-3 mt-2 ml-auto ${
                      pH >= 6.5 && pH <= 8.5 ? "bg-green-400" : "bg-red-500"
                    }`}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-[#F7F1FF] rounded-xl px-4 py-2">
              <p className="font-semibold text-lg text-[#616161]">
                Kadar Oksigen Air
              </p>
              <div className="flex justify-center items-center py-6">
                <p className="text-xl font-semibold text-[#616161]">
                  {dissolvedOxygen}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div>mg/L</div>
                <div
                  className={`size-2 rounded-md p-3 mt-2 ml-auto ${
                    dissolvedOxygen >= 5 ? "bg-green-400" : "bg-red-500"
                  }`}
                ></div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default App;
