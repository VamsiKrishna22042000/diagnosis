import { useState, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { LuImagePlus } from "react-icons/lu";

import { FiArrowLeftCircle } from "react-icons/fi";

import { Dna } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdOutlineContentCopy } from "react-icons/md";

import "./dox.css";

const Gross = () => {
  const { sampleId } = useParams();

  const navigate = useNavigate();

  const [load, setLoad] = useState(false);

  const [upload, setUpload] = useState(false);

  const fileInputRef = useRef("");

  const handleFileChange = async (event) => {
    setLoad(true);
    let img = event.target.files[0];

    let fd = new FormData();
    fd.append("gros", img);
    fd.append("sample_id", sampleId);

    const url = `${process.env.REACT_APP_ROOT_URL}/addgrossassets`;

    const reqConfigure = {
      method: "POST",
      body: fd,
    };

    const response = await fetch(url, reqConfigure);

    if (response.ok) {
      navigate("/");
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const Export2Doc = async (element, filename = "") => {
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
    setUpload(true);
  };

  const [moveToSecondPage, setMoveToSecondPage] = useState(false);

  const [procedure, setProcedure] = useState(""); // State for Procedure
  const [anatomicSite, setAnatomicSite] = useState(""); // State for Anatomic site of the specimen

  const [specimenWeight, setSpecimenWeight] = useState(""); // State for Specimen weight
  const [specimenSize1, setSpecimenSize1] = useState(""); // State for Specimen size 1
  const [specimenSize2, setSpecimenSize2] = useState(""); // State for Specimen size 2
  const [specimenSize3, setSpecimenSize3] = useState(""); // State for Specimen size 3

  const [skinOption, setSkinOption] = useState(""); // State for Skin option
  const [skinDescription, setSkinDescription] = useState(""); // State for Skin description

  const [skinLength, setSkinLength] = useState("");
  const [skinWidth, setSkinWidth] = useState("");

  const [otherDescription, setOtherDescription] = useState("");

  const [lesionLocation, setLesionLocation] = useState([]); // State for Lesion Location
  const [numOfLesions, setNumOfLesions] = useState(""); // State for Number of Lesions
  const [totalNumOfLesions, setTotalNumOfLesions] = useState(""); // State for Total Number of Lesions
  const [sizeOfLargestLesion1, setSizeOfLargestLesion1] = useState(""); // State for Size of the Largest Lesion (Length)
  const [sizeOfLargestLesion2, setSizeOfLargestLesion2] = useState(""); // State for Size of the Largest Lesion (Width)
  const [sizeOfLargestLesion3, setSizeOfLargestLesion3] = useState(""); // State for Size of the Largest Lesion (Width)

  const [sizeOfLargestLesion4, setSizeOfLargestLesion4] = useState(""); // State for Size of the Largest Lesion (Length)
  const [sizeOfLargestLesion5, setSizeOfLargestLesion5] = useState(""); // State for Size of the Largest Lesion (Width)
  const [sizeOfLargestLesion6, setSizeOfLargestLesion6] = useState(""); // State for Size of the Largest Lesion (Width)

  const [selectedMargin, setSelectedMargin] = useState("");
  const [selectedMarginOther, setSelectedMarginOther] = useState("");
  const [selectedNature, setSelectedNature] = useState("");
  const [selectedNatureOther, setSelectedNatureOther] = useState("");
  const [selectedConsistency, setSelectedConsistency] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSecondaryFeatures, setSelectedSecondaryFeatures] =
    useState("");
  const [hemorrhagePercentage, setHemorrhagePercentage] = useState("");
  const [necrosisPercentage, setNecrosisPercentage] = useState("");

  const handleSkinOptionChange = (option) => {
    setSkinOption(option);
    setSkinDescription(""); // Reset skin description when the skin option changes
  };

  const [distanceFromDeepMargin, setDistanceFromDeepMargin] = useState("");
  const [distanceFromSkinNipple, setDistanceFromSkinNipple] = useState("");
  const [breastParenchyma, setBreastParenchyma] = useState("Unremarkable");
  const [otherBreastParenchyma, setOtherBreastParenchyma] = useState("");
  const [axillaryPadSize, setAxillaryPadSize] = useState({
    length: "",
    width: "",
    height: "",
  });
  const [totalNodesIdentified, setTotalNodesIdentified] = useState("");
  const [largestLymphNodeSize, setLargestLymphNodeSize] = useState({
    length: "",
    width: "",
    height: "",
  });

  function handleLesionLocationChange(location) {
    const updatedLocations = [...lesionLocation];
    if (updatedLocations.includes(location)) {
      updatedLocations.splice(updatedLocations.indexOf(location), 1);
    } else {
      updatedLocations.push(location, ",");
    }
    setLesionLocation(updatedLocations);
  }

  const selectedData = !upload ? (
    <div>
      <h1>Final Report</h1>
      <ul className="selected-data-list">
        <li>
          <h2>SPECIMEN</h2>
          <ul>
            <strong>Procedure : </strong> {procedure}
          </ul>
        </li>
        <li>
          <h2>Anatomy Site</h2>
          <ul>
            <strong>Anatomic site of the specimen : </strong> {anatomicSite}
          </ul>
        </li>
        <li>
          <h2>Specimen Weight</h2>
          <ul>
            <strong>Specimen Weight : </strong> {specimenWeight} g
          </ul>
        </li>
        <li>
          <h2>Specimen Size</h2>
          <ul>
            <strong>Specimen Size : </strong> {specimenSize1} x {specimenSize2}{" "}
            x {specimenSize3} cm
          </ul>
        </li>
        <li>
          <h2>Skin</h2>
          <ul>
            <strong>Skin : </strong>
            {skinOption}
          </ul>
          <ul>
            {skinOption === "Size" && `Size : ${skinLength} x ${skinWidth} cm`}
          </ul>
          <ul>
            {skinOption === "Description" && (
              <>
                {" "}
                Description :{" "}
                {skinDescription === "Others"
                  ? otherDescription
                  : skinDescription}
              </>
            )}
          </ul>
        </li>
        <li>
          <h2>Description of the lesion</h2>
          <ul>
            <strong>Location : </strong> {lesionLocation}
          </ul>
          <ul>
            <strong>No of lesion : </strong> {numOfLesions}
          </ul>
          {numOfLesions === "Single" && (
            <>
              <strong>Size of lesion :</strong> {sizeOfLargestLesion4} x{" "}
              {sizeOfLargestLesion5} x {sizeOfLargestLesion6} cm
            </>
          )}
          {numOfLesions === "Multiple" && (
            <>
              <strong>Total number of lesions/foci identified : </strong>
              {totalNumOfLesions} cm
              <br />
            </>
          )}

          {numOfLesions === "Multiple" && (
            <>
              <strong>Size of the largest lesion :</strong>{" "}
              {sizeOfLargestLesion1} x {sizeOfLargestLesion2} x{" "}
              {sizeOfLargestLesion3} cm
            </>
          )}
          <ul>
            <strong>Margins : </strong>{" "}
            {selectedMargin === "Others" ? selectedMarginOther : selectedMargin}
          </ul>
          <ul>
            <strong>Nature : </strong>
            {selectedNature === "Others" ? selectedNatureOther : selectedNature}
          </ul>
          <ul>
            <strong>Consistency : </strong> {selectedConsistency}
          </ul>
          <ul>
            <strong>Color : </strong>
            {selectedColor}
          </ul>
          <ul>
            <strong>Secondary Features : </strong>
            {selectedSecondaryFeatures === "Present"
              ? `${selectedSecondaryFeatures} - Hemorrhage ${hemorrhagePercentage} %  - Necrosis ${necrosisPercentage} %`
              : selectedSecondaryFeatures}
          </ul>
        </li>
        <li>
          <h2>Relation to Surgical Margins</h2>
          <ul>
            <strong>Distance from Deep Resected Margin : </strong>
            {distanceFromDeepMargin} cm
          </ul>
          <ul>
            <strong>Distance from Skin/Nipple Areola Complex : </strong>
            {distanceFromSkinNipple} cm
          </ul>
        </li>
        <li>
          <h2>Rest of Breast Parenchyma</h2>
          <ul>
            <strong>Rest of Breast Parenchyma : </strong>
            {breastParenchyma === "Others"
              ? otherBreastParenchyma
              : breastParenchyma}
          </ul>
        </li>

        <li>
          <h2>Regional Lymph Nodes</h2>
          <ul>
            <strong>Axillary Pad of Fat Size : </strong>
            {axillaryPadSize.length} x {axillaryPadSize.width} x{" "}
            {axillaryPadSize.height} cm
          </ul>
          <ul>
            <strong>Total Number of Nodes Identified :</strong>{" "}
            {totalNodesIdentified}
          </ul>
          <ul>
            <strong>Size of the Largest Lymph Node : </strong>
            {largestLymphNodeSize.length} x {largestLymphNodeSize.width} x{" "}
            {largestLymphNodeSize.height} cm
          </ul>
        </li>
      </ul>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100%",
      }}
    >
      <LuImagePlus
        transform="scale(10)"
        id="file-upload"
        onClick={handleIconClick}
        htmlFor="file-upload"
        color="#141e61"
      />
      <input
        type="file"
        id="file-upload"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <p>Click Here To Upload the Downloaded Docx file</p>
    </div>
  );

  const handleNextPageClick = () => {
    setMoveToSecondPage(true);
  };

  const [obtainedWords, setObtainedNewWords] = useState(() => {
    return [];
  });

  const [load4, setLoad4] = useState(false);

  const getRepetedWords = async () => {
    setLoad4(true);
    const url = `${process.env.REACT_APP_ROOT_URL}/allwords`;

    const respone = await fetch(url);

    const data = await respone.json();

    if (respone.ok) {
      setObtainedNewWords(data.allWords);
      setLoad4(false);
    }
  };

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setObtainedNewWords([]);
  };

  return !load ? (
    <div className="container">
      {moveToSecondPage ? (
        <>
          <div id="exportContent" className="export-content">
            {selectedData}
          </div>
          {!upload && (
            <div className="buttons-export">
              <button
                className="next-button"
                onClick={() => setMoveToSecondPage(false)}
              >
                Go Back
              </button>
              <button
                className="next-button"
                onClick={() => Export2Doc("exportContent", "test", sampleId)}
              >
                Export as Doc
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="form-container">
          <ToastContainer />
          <div className="copy-container">
            {obtainedWords.length > 0 ? (
              <div className="obtainer-data">
                {obtainedWords.map((each) => (
                  <div
                    onClick={() => handleCopyClick(each)}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <p style={{ cursor: "pointer" }}>{each}</p>{" "}
                    <MdOutlineContentCopy
                      style={{ marginLeft: ".5rem", cursor: "pointer" }}
                    />
                  </div>
                ))}
              </div>
            ) : !load4 ? (
              <button
                style={{ cursor: "pointer" }}
                onClick={getRepetedWords}
                type="button"
              >
                Repeted Words
              </button>
            ) : (
              <>
                <Dna
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              </>
            )}
          </div>

          <button
            onClick={() => {
              navigate("/");
            }}
            style={{
              position: "absolute",
              left: "1%",
              top: "5%",
              borderWidth: 0,
              background: "#ffffff",
              cursor: "pointer",
            }}
            type="button"
          >
            <FiArrowLeftCircle color={"#141e61"} fontSize={"1.5rem"} />
          </button>
          <h1 style={{ marginLeft: "5%" }}>Gross Template</h1>

          <div className="form-row">
            <div className="form-column">
              <h2>Specimen</h2>
              <div className="tumorExtent">
                <label>Procedure :</label>
                <select
                  value={procedure}
                  onChange={(e) => setProcedure(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Simple Mastectomy">Simple Mastectomy</option>
                  <option value="Modified Radical Mastectomy">
                    Modified Radical Mastectomy
                  </option>
                  <option value="Radical Mastectomy">Radical Mastectomy</option>
                </select>
              </div>
              <div className="tumorExtent">
                <h2>Anatomic Site of the Specimen</h2>
                <label>Anatomic Site :</label>
                <select
                  value={anatomicSite}
                  onChange={(e) => setAnatomicSite(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Right">Right</option>
                  <option value="Left">Left</option>
                </select>
              </div>
              <div className="tumorExtent">
                <h2>Description of the lesion </h2>

                <div className="tumorExtent ">
                  <label>Location :</label>
                  <div className="checks">
                    <input
                      type="checkbox"
                      value="Upper Outer Quadrant"
                      checked={lesionLocation.includes("Upper Outer Quadrant")}
                      onChange={(e) =>
                        handleLesionLocationChange(e.target.value)
                      }
                    />
                    <label>Upper Outer Quadrant</label>
                  </div>

                  <div className="checks">
                    <input
                      type="checkbox"
                      value="Upper Inner Quadrant"
                      checked={lesionLocation.includes("Upper Inner Quadrant")}
                      onChange={(e) =>
                        handleLesionLocationChange(e.target.value)
                      }
                    />
                    <label>Upper Inner Quadrant</label>
                  </div>
                  <div className="checks">
                    <input
                      type="checkbox"
                      value="Lower Outer Quadrant"
                      checked={lesionLocation.includes("Lower Outer Quadrant")}
                      onChange={(e) =>
                        handleLesionLocationChange(e.target.value)
                      }
                    />
                    <label>Lower Outer Quadrant</label>
                  </div>

                  <div className="checks">
                    <input
                      type="checkbox"
                      value="Lower Inner Quadrant"
                      checked={lesionLocation.includes("Lower Inner Quadrant")}
                      onChange={(e) =>
                        handleLesionLocationChange(e.target.value)
                      }
                    />
                    <label>Lower Inner Quadrant</label>
                  </div>

                  <div className="checks">
                    <input
                      type="checkbox"
                      value="Central, Below the nipple areola complex"
                      checked={lesionLocation.includes(
                        "Central, Below the nipple areola complex"
                      )}
                      onChange={(e) =>
                        handleLesionLocationChange(e.target.value)
                      }
                    />
                    <label>Central, Below the nipple areola complex</label>
                  </div>
                </div>
                <div className="tumorExtent">
                  <label>No of lesion :</label>
                  <select
                    value={numOfLesions}
                    onChange={(e) => setNumOfLesions(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Multiple">Multiple</option>
                  </select>
                </div>

                {numOfLesions === "Single" && (
                  <div className="tumorExtent">
                    <label>Size of lesion (in cm) :</label>
                    <input
                      type="text"
                      placeholder="Length"
                      value={sizeOfLargestLesion4}
                      onChange={(e) => setSizeOfLargestLesion4(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Length"
                      value={sizeOfLargestLesion5}
                      onChange={(e) => setSizeOfLargestLesion5(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Length"
                      value={sizeOfLargestLesion6}
                      onChange={(e) => setSizeOfLargestLesion6(e.target.value)}
                      required
                    />
                  </div>
                )}

                {numOfLesions === "Multiple" && (
                  <div className="tumorExtent">
                    <label>Total number of lesions/foci identified :</label>
                    <input
                      type="text"
                      value={totalNumOfLesions}
                      onChange={(e) => setTotalNumOfLesions(e.target.value)}
                      required
                    />

                    <label>Size of the largest lesion (in cm) :</label>
                    <input
                      type="text"
                      placeholder="Length"
                      value={sizeOfLargestLesion1}
                      onChange={(e) => setSizeOfLargestLesion1(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Width"
                      value={sizeOfLargestLesion2}
                      onChange={(e) => setSizeOfLargestLesion2(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Height"
                      value={sizeOfLargestLesion3}
                      onChange={(e) => setSizeOfLargestLesion3(e.target.value)}
                      required
                    />
                  </div>
                )}

                <label>Margins :</label>
                <select
                  value={selectedMargin}
                  onChange={(e) => setSelectedMargin(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Well Circumscribed">Well Circumscribed</option>
                  <option value="Ill defined">Ill defined</option>
                  <option value="Infiltrative">Infiltrative</option>
                  <option value="Others">Others</option>
                </select>
                {selectedMargin === "Others" && (
                  <div className="tumorExtent">
                    <label>Specify Margin:</label>
                    <input
                      type="text"
                      value={selectedMarginOther}
                      onChange={(e) => setSelectedMarginOther(e.target.value)}
                      required
                    />
                  </div>
                )}

                <label>Nature :</label>
                <select
                  value={selectedNature}
                  onChange={(e) => setSelectedNature(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Solid">Solid</option>
                  <option value="Cystic">Cystic</option>
                  <option value="Solid & cystic">Solid & cystic</option>
                  <option value="Papillary">Papillary</option>
                  <option value="Others">Others</option>
                </select>
                {selectedNature === "Others" && (
                  <div className="tumorExtent">
                    <label>Specify Nature:</label>
                    <input
                      type="text"
                      value={selectedNatureOther}
                      onChange={(e) => setSelectedNatureOther(e.target.value)}
                      required
                    />
                  </div>
                )}

                <label>Consistency :</label>
                <select
                  value={selectedConsistency}
                  onChange={(e) => setSelectedConsistency(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Soft">Soft</option>
                  <option value="Firm">Firm</option>
                  <option value="Hard">Hard</option>
                </select>

                <label>Color :</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Grey brown">Grey brown</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Tan brown">Tan brown</option>
                  <option value="Red, hemorrhagic">Red, hemorrhagic</option>
                </select>

                <label>Secondary features :</label>
                <select
                  value={selectedSecondaryFeatures}
                  onChange={(e) => setSelectedSecondaryFeatures(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Absent">Absent</option>
                  <option value="Present">Present</option>
                </select>
                {selectedSecondaryFeatures === "Present" && (
                  <div className="tumorExtent">
                    <label>Hemorrhage (%) :</label>
                    <input
                      type="text"
                      value={hemorrhagePercentage}
                      onChange={(e) => setHemorrhagePercentage(e.target.value)}
                      required
                    />

                    <label>Necrosis (%) :</label>
                    <input
                      type="text"
                      value={necrosisPercentage}
                      onChange={(e) => setNecrosisPercentage(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="form-column">
              <div className="tumorExtent">
                <label>Specimen Weight :</label>
                <input
                  type="text"
                  value={specimenWeight}
                  onChange={(e) => setSpecimenWeight(e.target.value)}
                  required
                />
              </div>
              <div className="tumorExtent">
                <label>Specimen Size:</label>
                <input
                  type="text"
                  placeholder="Length"
                  value={specimenSize1}
                  onChange={(e) => setSpecimenSize1(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Width"
                  value={specimenSize2}
                  onChange={(e) => setSpecimenSize2(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Height"
                  value={specimenSize3}
                  onChange={(e) => setSpecimenSize3(e.target.value)}
                  required
                />
              </div>
              <div className="tumorExtent">
                <h2>Skin</h2>
                <label>Skin :</label>
                <select
                  value={skinOption}
                  onChange={(e) => handleSkinOptionChange(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Size">Size</option>
                  <option value="Description">Description</option>
                </select>

                {skinOption === "Size" && (
                  <div className="tumorExtent">
                    <label>Size:</label>
                    <input
                      value={skinLength}
                      onChange={(e) => {
                        setSkinLength(e.target.value);
                      }}
                      type="text"
                      placeholder="Length"
                    />

                    <input
                      value={skinWidth}
                      onChange={(e) => {
                        setSkinWidth(e.target.value);
                      }}
                      type="text"
                      placeholder="Width"
                    />
                  </div>
                )}

                {skinOption === "Description" && (
                  <div className="tumorExtent">
                    <label>Description:</label>
                    <select
                      value={skinDescription}
                      onChange={(e) => setSkinDescription(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Unremarkable">Unremarkable</option>
                      <option value="Others">Others</option>
                    </select>

                    {skinDescription === "Others" && (
                      <div className="tumorExtent">
                        <label>Specify :</label>
                        <input
                          onChange={(e) => {
                            setOtherDescription(e.target.value);
                          }}
                          type="text"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="tumorExtent">
                <h2>Relation to Surgical Margins</h2>
                <label>Distance from Deep Resected Margin (cm) :</label>
                <input
                  type="text"
                  value={distanceFromDeepMargin}
                  onChange={(e) => setDistanceFromDeepMargin(e.target.value)}
                />

                <label>Distance from Skin/Nipple Areola Complex (cm) :</label>
                <input
                  type="text"
                  value={distanceFromSkinNipple}
                  onChange={(e) => setDistanceFromSkinNipple(e.target.value)}
                />

                <h2>Rest of Breast Parenchyma</h2>
                <select
                  value={breastParenchyma}
                  onChange={(e) => setBreastParenchyma(e.target.value)}
                >
                  <option value="Unremarkable">Unremarkable</option>
                  <option value="Others">Others</option>
                </select>
                {breastParenchyma === "Others" && (
                  <div className="tumorExtent">
                    <label>Specify Other Breast Parenchyma :</label>
                    <input
                      type="text"
                      value={otherBreastParenchyma}
                      onChange={(e) => setOtherBreastParenchyma(e.target.value)}
                    />
                  </div>
                )}

                <h2>Regional Lymph Nodes</h2>
                <label>Axillary Pad of Fat Size (cm):</label>
                <input
                  type="text"
                  placeholder="Length"
                  value={axillaryPadSize.length}
                  onChange={(e) =>
                    setAxillaryPadSize({
                      ...axillaryPadSize,
                      length: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Width"
                  value={axillaryPadSize.width}
                  onChange={(e) =>
                    setAxillaryPadSize({
                      ...axillaryPadSize,
                      width: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Height"
                  value={axillaryPadSize.height}
                  onChange={(e) =>
                    setAxillaryPadSize({
                      ...axillaryPadSize,
                      height: e.target.value,
                    })
                  }
                />

                <label>Total Number of Nodes Identified :</label>
                <input
                  type="text"
                  value={totalNodesIdentified}
                  onChange={(e) => setTotalNodesIdentified(e.target.value)}
                />

                <label>Size of the Largest Lymph Node (cm) :</label>
                <input
                  type="text"
                  placeholder="Length"
                  value={largestLymphNodeSize.length}
                  onChange={(e) =>
                    setLargestLymphNodeSize({
                      ...largestLymphNodeSize,
                      length: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Width"
                  value={largestLymphNodeSize.width}
                  onChange={(e) =>
                    setLargestLymphNodeSize({
                      ...largestLymphNodeSize,
                      width: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Height"
                  value={largestLymphNodeSize.height}
                  onChange={(e) =>
                    setLargestLymphNodeSize({
                      ...largestLymphNodeSize,
                      height: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <button className="next-button" onClick={handleNextPageClick}>
            Next Page
          </button>
        </div>
      )}
    </div>
  ) : (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Gross;
