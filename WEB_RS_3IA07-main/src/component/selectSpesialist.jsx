import React, { useState, useEffect } from "react";

function DoctorSelector({ doctors, spesialists, spesialistSelected = "", doctorSelected = "", error = "" }) {
  const DATA_DOKTER = doctors || [];
  //   console.log(DATA_DOKTER);

  const [selectedSpesialis, setSelectedSpesialis] = useState(() => {
    return spesialistSelected !== "" ? spesialistSelected : "";
  });
  const [availableDokter, setAvailableDokter] = useState(() => {
    return [{ code: "00000", name: "Tidak ada dokter yang tersedia" }];
  });

  useEffect(() => {
    if (selectedSpesialis) {
      const findDokter = DATA_DOKTER.filter((dokter) => dokter.spesialis === selectedSpesialis);
      console.log(findDokter);

      setAvailableDokter(findDokter.length == 0 ? [{ code: "00000", name: "Tidak ada dokter yang tersedia" }] : findDokter);
    } else {
      setAvailableDokter([]);
    }
  }, [selectedSpesialis, DATA_DOKTER]);

  const handleSpesialisChange = (event) => {
    const value = event.target.value;
    setSelectedSpesialis(value);
    document.getElementById("doctor").value = "Pilih Dokter";
  };

  return (
    <div className="form">
      <div>
        <label htmlFor="spesialist" className="block mb-2 text-sm font-medium">
          Pilih Spesialis
        </label>
        <select name="spesialist" id="spesialist" className="form_input" required value={selectedSpesialis} onChange={handleSpesialisChange}>
          {spesialists.map((i) => (
            <option key={i.code} value={i.name}>
              {i.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="doctor" className="block mb-2 text-sm font-medium">
          Pilih Dokter
        </label>
        {availableDokter[0].code !== "00000" && (
          <select name="doctor" id="doctor" className="form_input" required disabled={!selectedSpesialis}>
            <option defaultValue="">{!selectedSpesialis ? "Pilih Spesialis terlebih dahulu" : availableDokter.length === 0 ? "Tidak ada dokter yang tersedia" : "Pilih Dokter"}</option>
            {availableDokter.map((i) => (
              <option key={i.code} value={i.code} selected={i.code == doctorSelected}>
                {i.name}
              </option>
            ))}
          </select>
        )}
        {availableDokter[0].code == "00000" && (
          <select name="doctor" id="doctor" className="form_input" required>
            <option defaultValue="00000">{availableDokter[0].name}</option>
          </select>
        )}
        {error == "doctor" && <p className="mt-2 text-sm text-red-500 font-semibold">Pilih Dokter Anda!</p>}
      </div>
    </div>
  );
}

export default DoctorSelector;
