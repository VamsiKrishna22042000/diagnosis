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
  const [clockPositions, setClockPositions] = useState([]);
  const [distanceFromNipple, setDistanceFromNipple] = useState("");

  const [histologicType, setHistologicType] = useState("");
  const [otherHistologicType, setOtherHistologicType] = useState("");

  const [histologicGrade, setHistologicGrade] = useState("");
  const [glandularDifferentiation, setGlandularDifferentiation] = useState("");
  const [nuclearPleomorphism, setNuclearPleomorphism] = useState("");
  const [mitoticRate, setMitoticRate] = useState("");
  const [overallGrade, setOverallGrade] = useState("");

  const [selectedOption, setSelectedOption] = useState("");
  const [customSize, setCustomSize] = useState({
    length: "",
    width: "",
    height: "",
  });

  const handleProcedureChange = (e) => {
    const selectedProcedure = e.target.value;
    setSpecimenProcedure(selectedProcedure);
    if (selectedProcedure !== "Other") {
      setOtherProcedure("");
    }
  };

  const handleClockPositionChange = (e) => {
    const value = e.target.value;
    if (clockPositions.includes(value)) {
      setClockPositions(clockPositions.filter((pos) => pos !== value));
    } else {
      setClockPositions([...clockPositions, value]);
    }
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);

    if (option === "Other") {
      // Clear the customSize object when "Other" is selected
      setCustomSize({
        length: "",
        width: "",
        height: "",
      });
    }
  };

  const handleCustomSizeChange = (e) => {
    const { name, value } = e.target;
    // Update the customSize object based on the input name (length, width, or height)
    setCustomSize((prevSize) => ({
      ...prevSize,
      [name]: value,
    }));
  };

  const handleNextPageClick = () => {
    if (specimenProcedure === "") {
      alert("Select Procedure");
    } else if (specimenProcedure === "Other" && otherProcedure === "") {
      alert("Enter Other Procedure");
    } else if (specimenLaterality === "") {
      alert("Select Specimen Laterality");
    } else if (tumorSite === "") {
      alert("Select Tumor Site");
    } else if (tumorSite !== "" && tumorSite === "Clock position") {
      clockPositions.length <= 0 && alert("Select Clock Positions");
    }

    if (
      tumorSite !== "" &&
      tumorSite === "Distance from Nipple Areola Complex"
    ) {
      distanceFromNipple === "" &&
        alert("Enter Distance from Nipple Areola Complex");
    }

    if (tumorSite !== "" && selectedOption === "") {
      if (tumorSite === "Clock position") {
        if (clockPositions.length > 0) {
          alert("Select Tumor Size");
        }
      } else if (tumorSite === "Distance from Nipple Areola Complex") {
        if (distanceFromNipple !== "") {
          alert("Select Tumor Size");
        }
      } else {
        alert("Select Tumor Size");
      }
    } else if (selectedOption !== "" && selectedOption === "Other") {
      customSize.length === ""
        ? alert("Enter Length")
        : customSize.width === ""
        ? alert("Enter Width")
        : customSize.height === "" && alert("Enter Height");
    }

    if (selectedOption !== "" && histologicType === "") {
      if (selectedOption === "Other") {
        if (
          customSize.length !== "" &&
          customSize.height !== "" &&
          customSize.width !== ""
        ) {
          alert("Select HistologicType");
        }
      } else if (selectedOption !== "Other") {
        alert("Select HistologicType");
      }
    } else if (histologicType !== "" && histologicType === "Other") {
      otherHistologicType === "" && alert("Enter Other Histologic Type");
    }

    if (histologicType !== "" && histologicGrade === "") {
      if (histologicType === "Other") {
        if (otherHistologicType !== "") {
          alert("Select Histologic Grade");
        }
      } else if (histologicType !== "Other") {
        alert("Select Histologic Grade");
      }
    } else if (histologicGrade !== "" && histologicGrade === "Applicable") {
      glandularDifferentiation === ""
        ? alert("Select Glandular / Tubular Differentiation")
        : nuclearPleomorphism === ""
        ? alert("Select Nuclear Pleomorphism")
        : mitoticRate === ""
        ? alert("Select MitoticRate")
        : overallGrade === "" && alert("Select Overall Grade");
    }
    if (histologicGrade !== "") {
      if (histologicGrade === "Applicable") {
        if (
          glandularDifferentiation !== "" &&
          nuclearPleomorphism !== "" &&
          mitoticRate !== "" &&
          overallGrade !== ""
        ) {
          setMoveToSecondPage(true);
        }
      } else if (histologicType === "Not  applicble") {
        setMoveToSecondPage(true);
      }
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
            {tumorSite === "Clock position" && clockPositions.length > 0 && (
              <li>
                <strong>Clock Positions :</strong> {clockPositions.join(", ")}
              </li>
            )}
            {distanceFromNipple && (
              <li>
                <strong>Distance from Nipple Areola Complex :</strong>{" "}
                {distanceFromNipple} cm
              </li>
            )}
          </ul>
          <ul>
            <li>
              <strong>Tumor Size :</strong>
              {selectedOption === "Other"
                ? `${customSize.length} x ${customSize.width} x ${customSize.height}`
                : selectedOption}
            </li>{" "}
          </ul>
        </li>
        <li>
          <h2>Histologic Type</h2>
          <ul>
            {histologicType && (
              <li>
                <strong>Histologic Type:</strong>{" "}
                {histologicType === "Other"
                  ? otherHistologicType
                  : histologicType}
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
              <>
                <li>
                  <strong>Glandular (Acinar) / Tubular Differentiation:</strong>{" "}
                  {glandularDifferentiation}
                </li>
                <li>
                  <strong>Nuclear Pleomorphism :</strong> {nuclearPleomorphism}
                </li>
                <li>
                  <strong>MitoticRate :</strong> {mitoticRate}
                </li>
                <li>
                  <strong>OverallGrade :</strong> {overallGrade}
                </li>
              </>
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
                    required // Make it required
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
                      required // Make it required
                    />
                  </label>
                )}
                <label>
                  Specimen Laterality:
                  <select
                    value={specimenLaterality}
                    onChange={(e) => setSpecimenLaterality(e.target.value)}
                    required // Make it required
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
                      required // Make it required
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
                      <option value="Distance from Nipple Areola Complex">
                        Distance from Nipple Areola Complex
                      </option>
                    </select>
                  </label>
                  {tumorSite === "Clock position" && (
                    <div className="clock-postion">
                      <h3>Clock Position:</h3>
                      <div className="clocks">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour) => (
                          <div className="clock-box">
                            <label key={hour}>{hour} o'clock</label>
                            <input
                              className="box"
                              type="checkbox"
                              value={`${hour} o'clock`}
                              checked={clockPositions.includes(
                                `${hour} o'clock`
                              )}
                              onChange={handleClockPositionChange}
                              required // Make it required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {tumorSite === "Distance from Nipple Areola Complex" && (
                    <label>
                      Distance from Nipple Areola Complex (cm):
                      <input
                        type="text"
                        value={distanceFromNipple}
                        onChange={(e) => setDistanceFromNipple(e.target.value)}
                        required // Make it required
                      />
                    </label>
                  )}
                </div>
              </div>
              <div>
                <label>
                  Tumor Size:
                  <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="">Select</option>
                    <option value="No residual invasive carcinoma">
                      No residual invasive carcinoma
                    </option>
                    <option value="Microinvasion only (less than or equal to 1 mm)">
                      Microinvasion only (less than or equal to 1 mm)
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                {selectedOption === "Other" && (
                  <div>
                    <input
                      type="text"
                      name="length"
                      placeholder="Length (cm)"
                      value={customSize.length}
                      onChange={handleCustomSizeChange}
                    />
                    <input
                      type="text"
                      name="width"
                      placeholder="Width (cm)"
                      value={customSize.width}
                      onChange={handleCustomSizeChange}
                    />
                    <input
                      type="text"
                      name="height"
                      placeholder="Height (cm)"
                      value={customSize.height}
                      onChange={handleCustomSizeChange}
                    />
                  </div>
                )}
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
                    required // Make it required
                  >
                    <option value="">Select</option>
                    <option value="No residual invasive carcinoma">
                      No residual invasive carcinoma
                    </option>
                    <option value="Invasive carcinoma of no special type (ductal)">
                      Invasive carcinoma of no special type (ductal)
                    </option>
                    <option value="Micro-invasive carcinoma">
                      Micro-invasive carcinoma
                    </option>
                    <option value="Invasive lobular carcinoma">
                      Invasive lobular carcinoma
                    </option>
                    <option value="Invasive carcinoma with mixed ductal and lobular features">
                      Invasive carcinoma with mixed ductal and lobular features
                    </option>
                    <option value="Tubular carcinoma">Tubular carcinoma</option>
                    <option value="Invasive cribriform carcinoma">
                      Invasive cribriform carcinoma
                    </option>
                    <option value="Mucinous carcinoma">
                      Mucinous carcinoma
                    </option>
                    <option value="Invasive micropapillary carcinoma">
                      Invasive micropapillary carcinoma
                    </option>
                    <option value="Apocrine adenocarcinoma">
                      Apocrine adenocarcinoma
                    </option>
                    <option value="Metaplastic carcinoma">
                      Metaplastic carcinoma
                    </option>
                    <option value="Encapsulated papillary carcinoma with invasion">
                      Encapsulated papillary carcinoma with invasion
                    </option>
                    <option value="Solid papillary carcinoma with invasion">
                      Solid papillary carcinoma with invasion
                    </option>
                    <option value="Intraductal papillary adenocarcinoma with invasion">
                      Intraductal papillary adenocarcinoma with invasion
                    </option>
                    <option value="Adenoid cystic carcinoma">
                      Adenoid cystic carcinoma
                    </option>
                    <option value="Neuroendocrine tumor">
                      Neuroendocrine tumor
                    </option>
                    <option value="Neuroendocrine carcinoma">
                      Neuroendocrine carcinoma
                    </option>
                    <option value="Invasive carcinoma, type cannot be determined">
                      Invasive carcinoma, type cannot be determined
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                {histologicType === "Other" && (
                  <input
                    type="text"
                    placeholder="Enter Other Histologic Type"
                    value={otherHistologicType}
                    onChange={(e) => setOtherHistologicType(e.target.value)}
                    required // Make it required
                  />
                )}
              </div>
              <div>
                <h2>Histologic Grade (Nottingham Histologic Score)</h2>
                <div className="applicable-box">
                  <div>
                    <label>Not applicable</label>
                    <input
                      type="radio"
                      name="histologicGrade"
                      value="Not applicable"
                      checked={histologicGrade === "Not applicable"}
                      onChange={() => setHistologicGrade("Not applicable")}
                      required // Make it required
                    />
                  </div>
                  <div>
                    <label>Applicable</label>
                    <input
                      type="radio"
                      name="histologicGrade"
                      value="Applicable"
                      checked={histologicGrade === "Applicable"}
                      onChange={() => setHistologicGrade("Applicable")}
                      required // Make it required
                    />
                  </div>
                </div>
                {histologicGrade === "Applicable" && (
                  <div>
                    <label>Glandular (Acinar) / Tubular Differentiation:</label>
                    <select
                      value={glandularDifferentiation}
                      onChange={(e) =>
                        setGlandularDifferentiation(e.target.value)
                      }
                      required // Make it required
                    >
                      <option value="">Select</option>
                      <option value="Score 1">
                        Score 1 (greater than 75% of tumor area forming
                        glandular / tubular structures)
                      </option>
                      <option value="Score 2">
                        Score 2 (10 to 75% of tumor area forming glandular /
                        tubular structures)
                      </option>
                      <option value="Score 3">
                        Score 3 (less than 10% of tumor area forming glandular /
                        tubular structures)
                      </option>
                      <option value="Only microinvasion present (not graded)">
                        Only microinvasion present (not graded)
                      </option>
                      <option value="Score cannot be determined">
                        Score cannot be determined
                      </option>
                    </select>
                    <label>Nuclear Pleomorphism:</label>
                    <select
                      value={nuclearPleomorphism}
                      onChange={(e) => setNuclearPleomorphism(e.target.value)}
                      required // Make it required
                    >
                      <option value="">Select</option>
                      <option value="Score 1">
                        Score 1 (Nuclei small with little increase in size in
                        comparison with normal breast epithelial cells, regular
                        outlines, uniform nuclear chromatin, little variation in
                        size)
                      </option>
                      <option value="Score 2">
                        Score 2 (Cells larger than normal with open vesicular
                        nuclei, visible nucleoli, and moderate variability in
                        both size and shape)
                      </option>
                      <option value="Score 3">
                        Score 3 (Vesicular nuclei, often with prominent
                        nucleoli, exhibiting marked variation in size and shape,
                        occasionally with very large and bizarre forms)
                      </option>
                      <option value="Only microinvasion present (not graded)">
                        Only microinvasion present (not graded)
                      </option>
                      <option value="Score cannot be determined">
                        Score cannot be determined
                      </option>
                    </select>
                    <label>Mitotic Rate:</label>
                    <select
                      value={mitoticRate}
                      onChange={(e) => setMitoticRate(e.target.value)}
                      required // Make it required
                    >
                      <option value="">Select</option>
                      <option value="Score 1">
                        Score 1 (&lt;=7 mitoses per 10 HPFs)
                      </option>
                      <option value="Score 2">
                        Score 2 (8-16 mitoses per 10 HPFs)
                      </option>
                      <option value="Score 3">
                        Score 3 (&gt;16 mitoses per 10 HPFs)
                      </option>
                      <option value="Only microinvasion present (not graded)">
                        Only microinvasion present (not graded)
                      </option>
                      <option value="Score cannot be determined">
                        Score cannot be determined
                      </option>
                    </select>
                    <label>Overall Grade:</label>
                    <select
                      value={overallGrade}
                      onChange={(e) => setOverallGrade(e.target.value)}
                      required // Make it required
                    >
                      <option value="">Select</option>
                      <option value="Grade 1">
                        Grade 1 (well-differentiated)
                      </option>
                      <option value="Grade 2">
                        Grade 2 (moderately differentiated)
                      </option>
                      <option value="Grade 3">
                        Grade 3 (poorly differentiated)
                      </option>
                      <option value="Only microinvasion present (not graded)">
                        Only microinvasion present (not graded)
                      </option>
                      <option value="Grade cannot be determined">
                        Grade cannot be determined
                      </option>
                    </select>
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
