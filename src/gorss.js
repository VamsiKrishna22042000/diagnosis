import { useState, useRef, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { LuImagePlus } from "react-icons/lu";

import { FiArrowLeftCircle } from "react-icons/fi";

import { Dna } from "react-loader-spinner";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdOutlineContentCopy } from "react-icons/md";

import "./dox.css";

const Gross = () => {
  const { sample_id } = useParams();

  const navigate = useNavigate();

  const [load, setLoad] = useState(false);

  const [upload, setUpload] = useState(false);

  const fileInputRef = useRef("");

  const handleFileChange = async (event) => {
    setLoad(true);
    let img = event.target.files[0];

    let fd = new FormData();
    fd.append("gros", img);
    fd.append("sample_id", sample_id);

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

  const handleNextPageClick = () => {
    if (procedure === "") {
      toast.error("Select Procedure", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (anatomicSite === "") {
      toast.error("Select Anatomic Site", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lesionLocation.length === 0) {
      toast.error("Select Atleast One Lesion Location", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (numOfLesions === "") {
      toast.error("Select Noof Lesion", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      numOfLesions === "Single" &&
      (sizeOfLargestLesion4 === "" ||
        sizeOfLargestLesion5 === "" ||
        sizeOfLargestLesion6 === "")
    ) {
      toast.error("Enter Lession Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (numOfLesions === "Multiple" && totalNumOfLesions === "") {
      toast.error("Enter Total number of lesions/foci identified ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      numOfLesions === "Multiple" &&
      totalNumOfLesions !== "" &&
      (sizeOfLargestLesion1 === "" ||
        sizeOfLargestLesion2 === "" ||
        sizeOfLargestLesion3 === "")
    ) {
      toast.error("Enter Lession Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedMargin === "") {
      toast.error("Select Margins", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedMargin === "Others" && selectedMarginOther === "") {
      toast.error("Enter Other Margin", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedNature === "") {
      toast.error("Select Nature", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedNature === "Others" && selectedNatureOther === "") {
      toast.error("Enter Other Nature", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedConsistency === "") {
      toast.error("Select Consistency", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedColor === "") {
      toast.error("Select Color", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedSecondaryFeatures === "") {
      toast.error("Select Secondary Features", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      selectedSecondaryFeatures === "Present" &&
      hemorrhagePercentage === ""
    ) {
      toast.error("Enter Hemorrhage %", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      selectedSecondaryFeatures === "Present" &&
      necrosisPercentage === ""
    ) {
      toast.error("Enter Necrosise %", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (specimenWeight === "") {
      toast.error("Enter Specimen Weight", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      specimenSize1 === "" ||
      specimenSize2 === "" ||
      specimenSize3 === ""
    ) {
      toast.error("Enter Specimen Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (skinOption === "") {
      toast.error("Select Skin Option", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      skinOption === "Size" &&
      (skinLength === "" || skinWidth === "")
    ) {
      toast.error("Enter Skin Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (skinOption === "Description" && skinDescription === "") {
      toast.error("Select Skin Description", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      skinOption === "Description" &&
      skinDescription === "Others" &&
      otherDescription === ""
    ) {
      toast.error("Enter Other Skin Description", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (distanceFromDeepMargin === "") {
      toast.error("Enter Distance from Deep Resected Margin", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (distanceFromSkinNipple === "") {
      toast.error("Enter Distance from Skin/Nipple Areola Complex", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (breastParenchyma === "") {
      toast.error("Select Rest of Breast Parenchyma", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (breastParenchyma === "Others" && otherBreastParenchyma === "") {
      toast.error("Enter Specify Other Breast Parenchyma", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      axillaryPadSize.length === "" ||
      axillaryPadSize.width === "" ||
      axillaryPadSize.height === ""
    ) {
      toast.error("Enter Axillary Pad of Fat Size", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (totalNodesIdentified === "") {
      toast.error("Enter Total Number of Nodes Identified ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      largestLymphNodeSize.length === "" ||
      largestLymphNodeSize.width === "" ||
      largestLymphNodeSize.height === ""
    ) {
      toast.error("Enter Lymphnode Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!selectedCassettes > 0) {
      toast.error("Select Cassettess", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedCassettes > 0) {
      let count = 0;

      for (let each of newArraySelected) {
        if (each[each.id] === "") {
          toast.error(`Enter ${each.id} Cassetess Value`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          count = count + 1;
          break;
        } else {
          count = 0;
        }
      }

      if (count === 0) {
        setMoveToSecondPage(true);
      }
    }
  };

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

  const [distanceFromDeepMargin, setDistanceFromDeepMargin] = useState("");
  const [distanceFromSkinNipple, setDistanceFromSkinNipple] = useState("");
  const [breastParenchyma, setBreastParenchyma] = useState("");
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

  const [cassettes, setCassettes] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26,
  ]);

  const [cassettesInputs, setCassettesInputs] = useState([
    { id: "N", N: "" },
    { id: "A", A: "" },
    { id: "B", B: "" },
    { id: "C", C: "" },
    { id: "D", D: "" },
    { id: "E", E: "" },
    { id: "F", F: "" },
    { id: "G", G: "" },
    { id: "H", H: "" },
    { id: "I", I: "" },
    { id: "J", J: "" },
    { id: "K", K: "" },
    { id: "L", L: "" },
    { id: "M", M: "" },
    { id: "O", O: "" },
    { id: "P", P: "" },
    { id: "Q", Q: "" },
    { id: "R", R: "" },
    { id: "S", S: "" },
    { id: "T", T: "" },
    { id: "U", U: "" },
    { id: "V", V: "" },
    { id: "W", W: "" },
    { id: "X", X: "" },
    { id: "Y", Y: "" },
    { id: "Z", Z: "" },
  ]);

  const [selectedCassettes, setselectedCassettes] = useState(0);

  const [newArraySelected, setSelectedNewArray] = useState([]);

  function handleLesionLocationChange(location) {
    const updatedLocations = [...lesionLocation];
    if (updatedLocations.includes(location)) {
      updatedLocations.splice(updatedLocations.indexOf(location), 1);
    } else {
      updatedLocations.push(location, ",");
    }
    setLesionLocation(updatedLocations);
  }

  const handleSkinOptionChange = (option) => {
    setSkinOption(option);
    setSkinDescription(""); // Reset skin description when the skin option changes
  };

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
          <ul>
            <strong>Anatomic Site : </strong> {anatomicSite}
          </ul>
        </li>
        <li>
          <ul>
            <strong>Specimen Weight : </strong> {specimenWeight} g
          </ul>
        </li>
        <li>
          <ul>
            <strong>Specimen Size : </strong> {specimenSize1} x {specimenSize2}{" "}
            x {specimenSize3} cm
          </ul>
        </li>
        <li>
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
        <li>
          <h2>Cassettes</h2>
          <ul>
            <strong> No of Cassettes Selected : {selectedCassettes} </strong>
          </ul>
          {newArraySelected.map((each) => (
            <ul>
              {each.id} : {each[each.id]}
            </ul>
          ))}
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

  const handelInputs = (value) => {
    const newArray = [];

    for (let i = 0; i < value; i++) {
      newArray.push(cassettesInputs[i]);
    }

    setSelectedNewArray(newArray);
  };

  useEffect(() => {
    getData();
  }, []);

  const [showEdit, setShowEdit] = useState(false);

  const getData = async () => {
    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/getallgrossdetails?sample_id=${sample_id}`;

      const response = await axios.get(url);

      if (response.status === 200) {
        response.data.length === 0 ? setShowEdit(true) : setShowEdit(false);
      }

      if (response.data.length !== 0) {
        if (response.status === 200) {
          console.log(response.data);
          response.data[0].procedure !== undefined &&
            setProcedure(response.data[0].procedure);

          response.data[0].anatomicSite !== undefined &&
            setAnatomicSite(response.data[0].anatomicSite);

          response.data[0].specimenWeight !== undefined &&
            setSpecimenWeight(response.data[0].specimenWeight);

          response.data[0].specimenSize1 !== undefined &&
            setSpecimenSize1(response.data[0].specimenSize1);

          response.data[0].specimenSize2 !== undefined &&
            setSpecimenSize2(response.data[0].specimenSize2);

          response.data[0].specimenSize3 !== undefined &&
            setSpecimenSize3(response.data[0].specimenSize3);

          response.data[0].skinOption !== undefined &&
            setSkinOption(response.data[0].skinOption);

          response.data[0].skinDescription !== undefined &&
            setSkinDescription(response.data[0].skinDescription);

          response.data[0].skinLength !== undefined &&
            setSkinLength(response.data[0].skinLength);

          response.data[0].skinWidth !== undefined &&
            setSkinWidth(response.data[0].skinWidth);

          response.data[0].otherDescription !== undefined &&
            setOtherDescription(response.data[0].otherDescription);

          response.data[0].lesionLocation !== undefined &&
            setLesionLocation(response.data[0].lesionLocation);

          response.data[0].numOfLesions !== undefined &&
            setNumOfLesions(response.data[0].numOfLesions);

          response.data[0].totalNumOfLesions !== undefined &&
            setTotalNumOfLesions(response.data[0].totalNumOfLesions);

          response.data[0].sizeOfLargestLesion1 !== undefined &&
            setSizeOfLargestLesion1(response.data[0].sizeOfLargestLesion1);

          response.data[0].sizeOfLargestLesion2 !== undefined &&
            setSizeOfLargestLesion2(response.data[0].sizeOfLargestLesion2);

          response.data[0].sizeOfLargestLesion3 !== undefined &&
            setSizeOfLargestLesion3(response.data[0].sizeOfLargestLesion3);

          response.data[0].sizeOfLargestLesion4 !== undefined &&
            setSizeOfLargestLesion4(response.data[0].sizeOfLargestLesion4);

          response.data[0].sizeOfLargestLesion5 !== undefined &&
            setSizeOfLargestLesion5(response.data[0].sizeOfLargestLesion5);

          response.data[0].sizeOfLargestLesion6 !== undefined &&
            setSizeOfLargestLesion6(response.data[0].sizeOfLargestLesion6);

          response.data[0].selectedMargin !== undefined &&
            setSelectedMargin(response.data[0].selectedMargin);

          response.data[0].selectedMarginOther !== undefined &&
            setSelectedMarginOther(response.data[0].selectedMarginOther);

          response.data[0].selectedNature !== undefined &&
            setSelectedNature(response.data[0].selectedNature);

          response.data[0].selectedNatureOther !== undefined &&
            setSelectedNatureOther(response.data[0].selectedNatureOther);

          response.data[0].selectedConsistency !== undefined &&
            setSelectedConsistency(response.data[0].selectedConsistency);

          response.data[0].selectedColor !== undefined &&
            setSelectedColor(response.data[0].selectedColor);

          response.data[0].selectedSecondaryFeatures !== undefined &&
            setSelectedSecondaryFeatures(
              response.data[0].selectedSecondaryFeatures
            );
          response.data[0].hemorrhagePercentage !== undefined &&
            setHemorrhagePercentage(response.data[0].hemorrhagePercentage);

          response.data[0].necrosisPercentage !== undefined &&
            setHemorrhagePercentage(response.data[0].necrosisPercentage);
          response.data[0].distanceFromDeepMargin !== undefined &&
            setDistanceFromDeepMargin(response.data[0].distanceFromDeepMargin);
          response.data[0].distanceFromSkinNipple !== undefined &&
            setDistanceFromSkinNipple(response.data[0].distanceFromSkinNipple);
          response.data[0].breastParenchyma !== undefined &&
            setBreastParenchyma(response.data[0].breastParenchyma);
          response.data[0].otherBreastParenchyma !== undefined &&
            setOtherBreastParenchyma(response.data[0].otherBreastParenchyma);
          response.data[0].axillaryPadSize !== undefined &&
            setAxillaryPadSize(response.data[0].axillaryPadSize);
          response.data[0].totalNodesIdentified !== undefined &&
            setTotalNodesIdentified(response.data[0].totalNodesIdentified);
          response.data[0].largestLymphNodeSize !== undefined &&
            setLargestLymphNodeSize(response.data[0].largestLymphNodeSize);
          response.data[0].selectedCassettes !== undefined &&
            setselectedCassettes(response.data[0].selectedCassettes);
          response.data[0].newArraySelected !== undefined &&
            setSelectedNewArray(response.data[0].newArraySelected);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [saveLoad, setSaveLoad] = useState(false);

  const saveData = async () => {
    if (procedure === "") {
      toast.error("Select Procedure", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (anatomicSite === "") {
      toast.error("Select Anatomic Site", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lesionLocation.length === 0) {
      toast.error("Select Atleast One Lesion Location", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (numOfLesions === "") {
      toast.error("Select Noof Lesion", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      numOfLesions === "Single" &&
      (sizeOfLargestLesion4 === "" ||
        sizeOfLargestLesion5 === "" ||
        sizeOfLargestLesion6 === "")
    ) {
      toast.error("Enter Lession Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (numOfLesions === "Multiple" && totalNumOfLesions === "") {
      toast.error("Enter Total number of lesions/foci identified ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      numOfLesions === "Multiple" &&
      totalNumOfLesions !== "" &&
      (sizeOfLargestLesion1 === "" ||
        sizeOfLargestLesion2 === "" ||
        sizeOfLargestLesion3 === "")
    ) {
      toast.error("Enter Lession Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedMargin === "") {
      toast.error("Select Margins", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedMargin === "Others" && selectedMarginOther === "") {
      toast.error("Enter Other Margin", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedNature === "") {
      toast.error("Select Nature", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedNature === "Others" && selectedNatureOther === "") {
      toast.error("Enter Other Nature", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedConsistency === "") {
      toast.error("Select Consistency", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedColor === "") {
      toast.error("Select Color", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedSecondaryFeatures === "") {
      toast.error("Select Secondary Features", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      selectedSecondaryFeatures === "Present" &&
      hemorrhagePercentage === ""
    ) {
      toast.error("Enter Hemorrhage %", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      selectedSecondaryFeatures === "Present" &&
      necrosisPercentage === ""
    ) {
      toast.error("Enter Necrosise %", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (specimenWeight === "") {
      toast.error("Enter Specimen Weight", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      specimenSize1 === "" ||
      specimenSize2 === "" ||
      specimenSize3 === ""
    ) {
      toast.error("Enter Specimen Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (skinOption === "") {
      toast.error("Select Skin Option", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      skinOption === "Size" &&
      (skinLength === "" || skinWidth === "")
    ) {
      toast.error("Enter Skin Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (skinOption === "Description" && skinDescription === "") {
      toast.error("Select Skin Description", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      skinOption === "Description" &&
      skinDescription === "Others" &&
      otherDescription === ""
    ) {
      toast.error("Enter Other Skin Description", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (distanceFromDeepMargin === "") {
      toast.error("Enter Distance from Deep Resected Margin", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (distanceFromSkinNipple === "") {
      toast.error("Enter Distance from Skin/Nipple Areola Complex", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (breastParenchyma === "") {
      toast.error("Select Rest of Breast Parenchyma", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (breastParenchyma === "Others" && otherBreastParenchyma === "") {
      toast.error("Enter Specify Other Breast Parenchyma", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      axillaryPadSize.length === "" ||
      axillaryPadSize.width === "" ||
      axillaryPadSize.height === ""
    ) {
      toast.error("Enter Axillary Pad of Fat Size", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (totalNodesIdentified === "") {
      toast.error("Enter Total Number of Nodes Identified ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      largestLymphNodeSize.length === "" ||
      largestLymphNodeSize.width === "" ||
      largestLymphNodeSize.height === ""
    ) {
      toast.error("Enter Lymphnode Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!selectedCassettes > 0) {
      toast.error("Select Cassettess", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedCassettes > 0) {
      let count = 0;

      for (let each of newArraySelected) {
        if (each[each.id] === "") {
          toast.error(`Enter ${each.id} Cassetess Value`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          count = count + 1;
          break;
        } else {
          count = 0;
        }
      }

      if (count === 0) {
        setSaveLoad(true);
        try {
          const url = `${process.env.REACT_APP_ROOT_URL}/addgrossdetails`;

          const reqConfigure = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sample_id,
              procedure,
              anatomicSite,
              specimenWeight,
              specimenSize1,
              specimenSize2,
              specimenSize3,
              skinOption,
              skinDescription,
              skinLength,
              skinWidth,
              otherDescription,
              lesionLocation,
              numOfLesions,
              totalNumOfLesions,
              sizeOfLargestLesion1,
              sizeOfLargestLesion2,
              sizeOfLargestLesion3,
              sizeOfLargestLesion4,
              sizeOfLargestLesion5,
              sizeOfLargestLesion6,
              selectedMargin,
              selectedMarginOther,
              selectedNature,
              selectedNatureOther,
              selectedConsistency,
              selectedColor,
              selectedSecondaryFeatures,
              hemorrhagePercentage,
              necrosisPercentage,
              distanceFromDeepMargin,
              distanceFromSkinNipple,
              breastParenchyma,
              otherBreastParenchyma,
              axillaryPadSize,
              totalNodesIdentified,
              largestLymphNodeSize,
              selectedCassettes,
              newArraySelected,
            }),
          };

          const response = await fetch(url, reqConfigure);

          if (response.ok) {
            toast.success("Saved Successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setSaveLoad(false);
            getData();
          }
        } catch (error) {
          toast.error(`${error}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    }
  };

  const editData = async () => {
    if (procedure === "") {
      toast.error("Select Procedure", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (anatomicSite === "") {
      toast.error("Select Anatomic Site", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lesionLocation.length === 0) {
      toast.error("Select Atleast One Lesion Location", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (numOfLesions === "") {
      toast.error("Select Noof Lesion", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      numOfLesions === "Single" &&
      (sizeOfLargestLesion4 === "" ||
        sizeOfLargestLesion5 === "" ||
        sizeOfLargestLesion6 === "")
    ) {
      toast.error("Enter Lession Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (numOfLesions === "Multiple" && totalNumOfLesions === "") {
      toast.error("Enter Total number of lesions/foci identified ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      numOfLesions === "Multiple" &&
      totalNumOfLesions !== "" &&
      (sizeOfLargestLesion1 === "" ||
        sizeOfLargestLesion2 === "" ||
        sizeOfLargestLesion3 === "")
    ) {
      toast.error("Enter Lession Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedMargin === "") {
      toast.error("Select Margins", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedMargin === "Others" && selectedMarginOther === "") {
      toast.error("Enter Other Margin", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedNature === "") {
      toast.error("Select Nature", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedNature === "Others" && selectedNatureOther === "") {
      toast.error("Enter Other Nature", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedConsistency === "") {
      toast.error("Select Consistency", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedColor === "") {
      toast.error("Select Color", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedSecondaryFeatures === "") {
      toast.error("Select Secondary Features", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      selectedSecondaryFeatures === "Present" &&
      hemorrhagePercentage === ""
    ) {
      toast.error("Enter Hemorrhage %", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      selectedSecondaryFeatures === "Present" &&
      necrosisPercentage === ""
    ) {
      toast.error("Enter Necrosise %", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (specimenWeight === "") {
      toast.error("Enter Specimen Weight", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      specimenSize1 === "" ||
      specimenSize2 === "" ||
      specimenSize3 === ""
    ) {
      toast.error("Enter Specimen Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (skinOption === "") {
      toast.error("Select Skin Option", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      skinOption === "Size" &&
      (skinLength === "" || skinWidth === "")
    ) {
      toast.error("Enter Skin Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (skinOption === "Description" && skinDescription === "") {
      toast.error("Select Skin Description", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      skinOption === "Description" &&
      skinDescription === "Others" &&
      otherDescription === ""
    ) {
      toast.error("Enter Other Skin Description", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (distanceFromDeepMargin === "") {
      toast.error("Enter Distance from Deep Resected Margin", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (distanceFromSkinNipple === "") {
      toast.error("Enter Distance from Skin/Nipple Areola Complex", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (breastParenchyma === "") {
      toast.error("Select Rest of Breast Parenchyma", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (breastParenchyma === "Others" && otherBreastParenchyma === "") {
      toast.error("Enter Specify Other Breast Parenchyma", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      axillaryPadSize.length === "" ||
      axillaryPadSize.width === "" ||
      axillaryPadSize.height === ""
    ) {
      toast.error("Enter Axillary Pad of Fat Size", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (totalNodesIdentified === "") {
      toast.error("Enter Total Number of Nodes Identified ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      largestLymphNodeSize.length === "" ||
      largestLymphNodeSize.width === "" ||
      largestLymphNodeSize.height === ""
    ) {
      toast.error("Enter Lymphnode Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!selectedCassettes > 0) {
      toast.error("Select Cassettess", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedCassettes > 0) {
      let count = 0;

      for (let each of newArraySelected) {
        if (each[each.id] === "") {
          toast.error(`Enter ${each.id} Cassetess Value`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          count = count + 1;
          break;
        } else {
          count = 0;
        }
      }

      if (count === 0) {
        setSaveLoad(true);
        try {
          const url = `${process.env.REACT_APP_ROOT_URL}/updategrossdetails/${sample_id}`;

          const reqConfigure = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sample_id,
              procedure,
              anatomicSite,
              specimenWeight,
              specimenSize1,
              specimenSize2,
              specimenSize3,
              skinOption,
              skinDescription,
              skinLength,
              skinWidth,
              otherDescription,
              lesionLocation,
              numOfLesions,
              totalNumOfLesions,
              sizeOfLargestLesion1,
              sizeOfLargestLesion2,
              sizeOfLargestLesion3,
              sizeOfLargestLesion4,
              sizeOfLargestLesion5,
              sizeOfLargestLesion6,
              selectedMargin,
              selectedMarginOther,
              selectedNature,
              selectedNatureOther,
              selectedConsistency,
              selectedColor,
              selectedSecondaryFeatures,
              hemorrhagePercentage,
              necrosisPercentage,
              distanceFromDeepMargin,
              distanceFromSkinNipple,
              breastParenchyma,
              otherBreastParenchyma,
              axillaryPadSize,
              totalNodesIdentified,
              largestLymphNodeSize,
              selectedCassettes,
              newArraySelected,
            }),
          };

          const response = await fetch(url, reqConfigure);

          if (response.ok) {
            toast.success("Updated Successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            setSaveLoad(false);
            getData();
          }
        } catch (error) {
          toast.error(`${error}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    }
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
                onClick={() => Export2Doc("exportContent", "test", sample_id)}
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
                      placeholder="Width"
                      value={sizeOfLargestLesion5}
                      onChange={(e) => setSizeOfLargestLesion5(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Height"
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
                  <option value="">Select</option>
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
              <div className="tumorExtent">
                <h2>Cassettes : </h2>
                <lable style={{ textAlign: "start" }}>Cassettes : </lable>
                <select
                  value={selectedCassettes}
                  onChange={(e) => {
                    setselectedCassettes(e.target.value);
                    handelInputs(e.target.value);
                  }}
                >
                  <option>Select</option>
                  {cassettes.map((each) => (
                    <option>{each}</option>
                  ))}
                </select>
              </div>
              {newArraySelected.length !== 0 && (
                <div className="tumorExtent">
                  {newArraySelected.map((each) => (
                    <>
                      <lable
                        style={{
                          textAlign: "start",
                          marginTop: "1%",
                          marginBottom: "1%",
                        }}
                        key={each.id}
                      >
                        {each.id} :
                      </lable>
                      <input
                        id={each.id}
                        value={each[each.id]}
                        onChange={(e) => {
                          const newarr = newArraySelected.map((ee) =>
                            ee.id === each.id
                              ? { id: ee.id, [ee.id]: e.target.value }
                              : ee
                          );
                          setSelectedNewArray(newarr);
                        }}
                        type="text"
                      />
                    </>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            style={{ position: "relative", left: "0" }}
            className="next-button"
            onClick={handleNextPageClick}
          >
            Next Page
          </button>

          {!saveLoad ? (
            showEdit ? (
              <button onClick={saveData} className="next-button">
                Save
              </button>
            ) : (
              <button onClick={editData} className="next-button">
                Edit
              </button>
            )
          ) : (
            <button className="next-button">.&nbsp;.&nbsp;.</button>
          )}
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
