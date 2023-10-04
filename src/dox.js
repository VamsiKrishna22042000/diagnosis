import React, { useState } from "react";
import "./dox.css";

const Dox = () => {
  function Export2Doc(element, filename = "") {
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(element).innerHTML + postHtml;

    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    var url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    filename = filename ? filename + ".doc" : "document.doc";

    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadLink.href = url;

      downloadLink.download = filename;

      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }

  const [specimenProcedure, setSpecimenProcedure] = useState("");
  const [otherProcedure, setOtherProcedure] = useState("");
  const [specimenLaterality, setSpecimenLaterality] = useState("");
  const [tumorSite, setTumorSite] = useState("");
  const [clockPosition, setClockPosition] = useState("");
  const [distanceFromNipple, setDistanceFromNipple] = useState("");
  const [histologicType, setHistologicType] = useState("");
  const [histologicGrade, setHistologicGrade] = useState("");
  const [glandularDifferentiation, setGlandularDifferentiation] = useState("");
  const [nuclearPleomorphism, setNuclearPleomorphism] = useState("");

  const handleProcedureChange = (e) => {
    const selectedProcedure = e.target.value;
    setSpecimenProcedure(selectedProcedure);
    if (selectedProcedure !== "Other") {
      setOtherProcedure("");
    }
  };

  const handleClockPositionChange = (e) => {
    setClockPosition(e.target.value);
  };

  const handleNextPageClick = () => {
    if (
      specimenProcedure &&
      (specimenProcedure !== "Other" || otherProcedure) &&
      specimenLaterality &&
      tumorSite &&
      (tumorSite !== "Clock position" ||
        (clockPosition && distanceFromNipple)) &&
      histologicType &&
      histologicGrade &&
      ((histologicGrade === "Applicable" &&
        glandularDifferentiation &&
        nuclearPleomorphism) ||
        histologicGrade === "Not applicable")
    ) {
      setMoveToSecondPage(true);
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  };

  const selectedData = (
    <div style={{ marginTop: "2rem" }}>
      <h1>Report</h1>
      <ul className="selected-data-list">
        <li>
          <h2>SPECIMEN</h2>
          <ul>
            {specimenProcedure && (
              <li>
                <strong>Procedure:</strong> {specimenProcedure}
              </li>
            )}
            {specimenProcedure === "Other" && otherProcedure && (
              <li>
                <strong>Other Procedure:</strong> {otherProcedure}
              </li>
            )}
            {specimenLaterality && (
              <li>
                <strong>Specimen Laterality:</strong> {specimenLaterality}
              </li>
            )}
          </ul>
        </li>
        <li>
          <h2>TUMOR</h2>
          <ul>
            {tumorSite && (
              <li>
                <strong>Tumor Site:</strong> {tumorSite}
              </li>
            )}
            {tumorSite === "Clock position" && clockPosition && (
              <li>
                <strong>Clock Position:</strong> {clockPosition}
              </li>
            )}
            {distanceFromNipple && (
              <li>
                <strong>Distance from Nipple Areola Complex:</strong>{" "}
                {distanceFromNipple} cm
              </li>
            )}
          </ul>
        </li>
        <li>
          <h2>Histologic Type</h2>
          <ul>
            {histologicType && (
              <li>
                <strong>Histologic Type:</strong> {histologicType}
              </li>
            )}
          </ul>
        </li>
        <li>
          <h2>Histologic Grade (Nottingham Histologic Score)</h2>
          <ul>
            {histologicGrade && (
              <li>
                <strong>Selected Grade:</strong> {histologicGrade}
              </li>
            )}
            {histologicGrade === "Applicable" && (
              <li>
                <strong>Glandular (Acinar) / Tubular Differentiation:</strong>{" "}
                {glandularDifferentiation}
              </li>
            )}
            {nuclearPleomorphism && (
              <li>
                <strong>Nuclear Pleomorphism:</strong> {nuclearPleomorphism}
              </li>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );

  const [moveToSecondPage, setMoveToSecondPage] = useState(false);

  return (
    <div className="container">
      {moveToSecondPage ? (
        <>
          <div id="exportContent" className="export-content">
            {selectedData}
          </div>{" "}
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5%",
            }}
          >
            <button
              className="next-button"
              onClick={() => setMoveToSecondPage(false)}
            >
              Go Back
            </button>
            <button
              className="next-button"
              onClick={() => Export2Doc("exportContent", "test")}
            >
              Export as Doc
            </button>
          </div>
        </>
      ) : (
        <div className="form-container">
          <h1>Microscopy Template</h1>
          <div className="form-row">
            <div className="form-column">
              <div>
                <h2>SPECIMEN</h2>
                <label>
                  Procedure:
                  <select
                    value={specimenProcedure}
                    onChange={handleProcedureChange}
                  >
                    <option value="">Select</option>
                    <option value="Excision">Excision</option>
                    <option value="Total mastectomy">Total mastectomy</option>
                    <option value="Modified Radical Mastectomy">
                      Modified Radical Mastectomy
                    </option>
                    <option value="Not specified">Not specified</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                {specimenProcedure === "Other" && (
                  <label>
                    Other Procedure:
                    <input
                      type="text"
                      value={otherProcedure}
                      onChange={(e) => setOtherProcedure(e.target.value)}
                    />
                  </label>
                )}
                <label>
                  Specimen Laterality:
                  <select
                    value={specimenLaterality}
                    onChange={(e) => setSpecimenLaterality(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                    <option value="Not specified">Not specified</option>
                  </select>
                </label>
                <div>
                  <h2>TUMOR</h2>
                  <label>
                    Tumor Site:
                    <select
                      value={tumorSite}
                      onChange={(e) => setTumorSite(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Upper outer quadrant">
                        Upper outer quadrant
                      </option>
                      <option value="Lower outer quadrant">
                        Lower outer quadrant
                      </option>
                      <option value="Upper inner quadrant">
                        Upper inner quadrant
                      </option>
                      <option value="Lower inner quadrant">
                        Lower inner quadrant
                      </option>
                      <option value="Central">Central</option>
                      <option value="Nipple">Nipple</option>
                      <option value="Clock position">Clock position</option>
                    </select>
                  </label>
                  {tumorSite === "Clock position" && (
                    <label>
                      Clock Position:
                      <select
                        value={clockPosition}
                        onChange={handleClockPositionChange}
                      >
                        <option value="">Select</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour) => (
                          <option key={hour} value={`${hour} o'clock`}>
                            {`${hour} o'clock`}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  {tumorSite === "Clock position" && clockPosition && (
                    <label>
                      Distance from Nipple Areola Complex (cm):
                      <input
                        type="text"
                        value={distanceFromNipple}
                        onChange={(e) => setDistanceFromNipple(e.target.value)}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="form-column">
              <div>
                <h2>Histologic Type</h2>
                <label>
                  Histologic Type:
                  <select
                    value={histologicType}
                    onChange={(e) => setHistologicType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="No residual invasive carcinoma">
                      No residual invasive carcinoma
                    </option>
                    <option value="Invasive carcinoma of no special type (ductal)">
                      Invasive carcinoma of no special type (ductal)
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>
              <div>
                <h2>Histologic Grade (Nottingham Histologic Score)</h2>
                <label>
                  Not applicable:
                  <input
                    type="radio"
                    name="histologicGrade"
                    value="Not applicable"
                    checked={histologicGrade === "Not applicable"}
                    onChange={() => setHistologicGrade("Not applicable")}
                  />
                </label>
                <label>
                  Applicable:
                  <input
                    type="radio"
                    name="histologicGrade"
                    value="Applicable"
                    checked={histologicGrade === "Applicable"}
                    onChange={() => setHistologicGrade("Applicable")}
                  />
                </label>
                {histologicGrade === "Applicable" && (
                  <div>
                    <label>
                      Glandular (Acinar) / Tubular Differentiation:
                      <select
                        value={glandularDifferentiation}
                        onChange={(e) =>
                          setGlandularDifferentiation(e.target.value)
                        }
                      >
                        <option value="Score 1">Score 1</option>
                        <option value="Score 2">Score 2</option>
                        <option value="Score 3">Score 3</option>
                        <option value="Only microinvasion present (not graded)">
                          Only microinvasion present (not graded)
                        </option>
                        <option value="Score cannot be determined">
                          Score cannot be determined
                        </option>
                      </select>
                    </label>
                    <label>
                      Nuclear Pleomorphism:
                      <select
                        value={nuclearPleomorphism}
                        onChange={(e) => setNuclearPleomorphism(e.target.value)}
                      >
                        <option value="Score 1">Score 1</option>
                        <option value="Score 2">Score 2</option>
                        <option value="Score 3">Score 3</option>
                        <option value="Only microinvasion present (not graded)">
                          Only microinvasion present (not graded)
                        </option>
                        <option value="Score cannot be determined">
                          Score cannot be determined
                        </option>
                      </select>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="next-button" onClick={handleNextPageClick}>
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default Dox;
