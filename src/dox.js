import React, { useState, useRef, useEffect } from "react";

import { Dna } from "react-loader-spinner";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import { FiArrowLeftCircle } from "react-icons/fi";

import { MdOutlineContentCopy } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./dox.css";

import { LuImagePlus } from "react-icons/lu";

const Dox = () => {
  const { sample_id } = useParams();

  const navigate = useNavigate();

  const [load, setLoad] = useState(false);

  const [upload, setUpload] = useState(false);

  const fileInputRef = useRef("");

  const handleFileChange = async (event) => {
    setLoad(true);
    let img = event.target.files[0];

    let fd = new FormData();
    fd.append("microscopy", img);
    fd.append("sample_id", sample_id);

    const url = `${process.env.REACT_APP_ROOT_URL}/addmicroscopyassets`;

    console.log(Object.fromEntries(fd.entries()));

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

  const Export2Doc = (element, filename = "") => {
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

  const handleNextPageClick = () => {
    if (specimenProcedure === "") {
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
    } else if (specimenProcedure === "Other" && otherProcedure === "") {
      toast.error("Enter Other Procedure", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (specimenLaterality === "") {
      toast.error("Select Specimen Laterality", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorSite === "") {
      toast.error("Select Tumor Site", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorSite === "Clock position" && !clockPositions.length > 0) {
      toast.error("Select Atleast One Clock Position", {
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
      tumorSite === "Distance from Nipple Areola Complex" &&
      distanceFromNipple === ""
    ) {
      toast.error("Enter Distance from Nipple Areola Complex", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedOption === "") {
      toast.error("Select Tumor Size", {
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
      selectedOption === "Other" &&
      (customSize.height === "" ||
        customSize.length === "" ||
        customSize.width === "")
    ) {
      toast.error("Enter the Tumor Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorFocality === "") {
      toast.error("Select Tumor Focality", {
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
      tumorFocality === "Multiple foci of invasive carcinoma" &&
      numFoci === ""
    ) {
      toast.error("Select Specific number of Foci", {
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
      tumorFocality === "Multiple foci of  invasive carcinoma" &&
      numFoci === "Specific number" &&
      specificNumber === ""
    ) {
      toast.error("Enter Specific number", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorExtent === "") {
      toast.error("Select Tumor Extent", {
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
      tumorExtent === "Skin is present and involved" &&
      skinInvolvement === ""
    ) {
      toast.error("Select Skin Involvment", {
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
      tumorExtent === "Skeletal muscle is present and involved" &&
      skeletalMuscleInvolvement === ""
    ) {
      toast.error("Select Skeletal Muscle Involvment", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphovascularInvasion === "") {
      toast.error("Select Lymphovascular Invasion", {
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
      lymphovascularInvasion === "Present" &&
      lymphovascularInvasionExtent === ""
    ) {
      toast.error("Select Lymphovascular Invasion Extent", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (breastTreatmentEffect === "") {
      toast.error("Select Treatment Effect in the Breast", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphNodeTreatmentEffect === "") {
      toast.error("Select Treatment Effect in the Lymph Nodes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (totalLymphNodesExamined === "") {
      toast.error("Enter Total Number of Lymph Nodes Examined", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (totalSentinelNodesExamined === "") {
      toast.error("Enter Total Number of Sentinel Nodes Examined", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphNodesInvolved === "") {
      toast.error("Select Lymphnodes Involved", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphNodesInvolved === "Yes" && selectedMetastasisType === "") {
      toast.error("Select Select Metastasis Type", {
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
      lymphNodesInvolved === "Yes" &&
      selectedMetastasisType === "Size of Largest Nodal Metastatic Deposit" &&
      largestMetastaticDepositSize === ""
    ) {
      toast.error("Enter Size of Largest Nodal Metastatic Deposit", {
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
      lymphNodesInvolved === "Yes" &&
      selectedMetastasisType === "Extranodal Extension" &&
      extranodalExtension === ""
    ) {
      toast.error("Select Extranodal Extension", {
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
      lymphNodesInvolved === "Yes" &&
      selectedMetastasisType === "Extranodal Extension" &&
      extranodalExtension === "Present" &&
      extranodalExtensionSize === ""
    ) {
      toast.error("Select Extranodal Extension Size", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (distantSite === "") {
      toast.error("Select Distant Site", {
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
      distantSite === "Present" &&
      distantSiteOptions.Liver === false &&
      distantSiteOptions.Bone === false &&
      distantSiteOptions.Brain === false &&
      distantSiteOptions.Lung === false &&
      distantSiteOptions.Other === false
    ) {
      toast.error("Select Atleast Distant Site Options", {
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
      distantSite === "Present" &&
      distantSiteOptions.Other === true &&
      otherDistantSiteInput === ""
    ) {
      toast.error("Enter Other Distant Site", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicType === "") {
      toast.error("Select Histologic Type", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicType === "Other" && otherHistologicType === "") {
      toast.error("Enter Other Histologic Type", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "") {
      toast.error("Select Histologic Grade", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "Applicable" && nuclearPleomorphism === "") {
      toast.error("Select Nuclear Pleomorphism", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "Applicable" && mitoticRate === "") {
      toast.error("Select Mitotic Rate", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "Applicable" && overallGrade === "") {
      toast.error("Select Overall Grade", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "") {
      toast.error("Select DCIS Presence", {
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
      dcisPresence === "Present" &&
      (dcisSize.x === "" || dcisSize.y === "")
    ) {
      toast.error("Enter DCIS Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && architecturalPattern === "") {
      toast.error("Select Architectural Patterns", {
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
      dcisPresence === "Present" &&
      architecturalPattern === "Other" &&
      architecturalPatternOther === ""
    ) {
      toast.error("Select Architectural Other Pattern", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && necrosis === "") {
      toast.error("Select Necrosis", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && numBlocksDCIS === "") {
      toast.error("Enter Number of Blocks with DCIS", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && numBlocksExamined === "") {
      toast.error("Enter Number of Blocks Examined", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lcisPresence === "") {
      toast.error("Select LCIS Presence", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (microcalcifications === "") {
      toast.error("Select Microcalcifications", {
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
      microcalcifications === "Other" &&
      otherMicrocalcifications === ""
    ) {
      toast.error("Enter Other Microcalcifications", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (invasiveCarcinomaMarginStatus === "") {
      toast.error("Select Margin Status for Invasive Carcinoma", {
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
      invasiveCarcinomaMarginStatus ===
        "Margin involved by invasive carcinoma." &&
      involvedMargin === ""
    ) {
      toast.error("Select Specify Involved Margin", {
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
      invasiveCarcinomaMarginStatus ===
        "Distance of Invasive Carcinoma from deep resected margin" &&
      distanceFromMargin === ""
    ) {
      toast.error(
        "Enter Distance of Invasive Carcinoma from deep resected margin ",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } else if (dcisPresence === "Present" && dcisStatus === "") {
      toast.error("Select Margin Status for DCIS", {
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
      dcisPresence === "Present" &&
      dcisStatus === "Margin Involved by DCIS" &&
      dcisInvolvedMargin === ""
    ) {
      toast.error("Enter Specific Involved Margin for DCIS", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (pT === "") {
      toast.error("Select pT", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (pN === "") {
      toast.error("Select pN", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (pM === "") {
      toast.error("Select pM", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (additionalFindings === "") {
      toast.error("Enter Additional Findings", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (result === "") {
      toast.error("Enter Result", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      setMoveToSecondPage(true);
    }
  };

  const [notes, setNotes] = useState("");

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

  const [tumorFocality, setTumorFocality] = useState("");
  const [numFoci, setNumFoci] = useState("");
  const [specificNumber, setSpecificNumber] = useState("");

  const [dcisPresence, setDcisPresence] = useState(""); // State for DCIS presence
  const [dcisSize, setDcisSize] = useState({ x: "", y: "" }); // State for DCIS size
  const [architecturalPattern, setArchitecturalPattern] = useState(""); // State for architectural pattern
  const [architecturalPatternOther, setArchitecturalPatternOther] =
    useState(""); // State for other architectural pattern
  const [nuclearGrade, setNuclearGrade] = useState(""); // State for nuclear grade
  const [necrosis, setNecrosis] = useState(""); // State for necrosis
  const [numBlocksDCIS, setNumBlocksDCIS] = useState(""); // State for number of blocks with DCIS
  const [numBlocksExamined, setNumBlocksExamined] = useState(""); // State for number of blocks examined

  const [lcisPresence, setLcisPresence] = useState(""); // State for LCIS presence

  const [tumorExtent, setTumorExtent] = useState(""); // State for Tumor Extent
  const [skinInvolvement, setSkinInvolvement] = useState(""); // State for Skin Involvement
  const [skeletalMuscleInvolvement, setSkeletalMuscleInvolvement] =
    useState(""); // State for Skeletal Muscle Involvement

  const [lymphovascularInvasion, setLymphovascularInvasion] = useState(""); // State for Lymphovascular Invasion
  const [lymphovascularInvasionExtent, setLymphovascularInvasionExtent] =
    useState(""); // State for Lymphovascular Invasion Extent

  const [microcalcifications, setMicrocalcifications] = useState(""); // State for Microcalcifications
  const [otherMicrocalcifications, setOtherMicrocalcifications] = useState(""); // State for Other Microcalcifications

  const [breastTreatmentEffect, setBreastTreatmentEffect] = useState(""); // State for Treatment Effect in the Breast
  const [lymphNodeTreatmentEffect, setLymphNodeTreatmentEffect] = useState(""); // State for Treatment Effect in the Lymph Nodes

  const [invasiveCarcinomaMarginStatus, setInvasiveCarcinomaMarginStatus] =
    useState(""); // State for Margin Status for Invasive Carcinoma
  const [involvedMargin, setInvolvedMargin] = useState(""); // State for Specifying Involved Margin
  const [distanceFromMargin, setDistanceFromMargin] = useState(""); // State for Distance of Invasive Carcinoma from deep resected margin

  const [dcisStatus, setDcisStatus] = useState(""); // State for Margin Status for DCIS
  const [dcisInvolvedMargin, setDcisInvolvedMargin] = useState(""); // State for Specifying Involved Margin for DCIS

  const [totalLymphNodesExamined, setTotalLymphNodesExamined] = useState(""); // State for Total Number of Lymph Nodes Examined
  const [totalSentinelNodesExamined, setTotalSentinelNodesExamined] =
    useState(""); // State for Total Number of Sentinel Nodes Examined

  const [lymphNodesInvolved, setLymphNodesInvolved] = useState(""); // State for Total Number of Lymph Nodes Involved
  const [selectedMetastasisType, setSelectedMetastasisType] = useState(""); // State for selected metastasis type
  const [largestMetastaticDepositSize, setLargestMetastaticDepositSize] =
    useState(""); // State for Size of Largest Nodal Metastatic Deposit
  const [extranodalExtension, setExtranodalExtension] = useState(""); // State for Extranodal Extension
  const [extranodalExtensionSize, setExtranodalExtensionSize] = useState(""); // State for Extranodal Extension Size

  const [distantSite, setDistantSite] = useState(""); // State for Distant Site
  const [distantSiteOptions, setDistantSiteOptions] = useState({
    Lung: false,
    Liver: false,
    Bone: false,
    Brain: false,
    Other: false,
  }); // State for individual distant site options
  const [otherDistantSiteInput, setOtherDistantSiteInput] = useState(""); // State for Other Distant Site input

  const [pT, setPT] = useState(""); // State for pT
  const [pN, setPN] = useState(""); // State for pN
  const [pM, setPM] = useState(""); // State for pM

  const [additionalFindings, setAdditionalFindings] = useState(""); // State for Additional Findings
  const [result, setResult] = useState(""); // State for Result

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

  const handleTumorFocalityChange = (e) => {
    setTumorFocality(e.target.value);
  };

  const handleNumFociChange = (e) => {
    setNumFoci(e.target.value);
  };

  const handleSpecificNumberChange = (e) => {
    setSpecificNumber(e.target.value);
  };

  const handleMetastasisTypeChange = (e) => {
    setSelectedMetastasisType(e.target.value);
  };

  const handleExtranodalExtensionChange = (e) => {
    setExtranodalExtension(e.target.value);
  };

  const handleDistantSiteChange = (e) => {
    setDistantSite(e.target.value);
  };

  const handleDistantSiteOptionChange = (option) => {
    const updatedOptions = { ...distantSiteOptions };
    updatedOptions[option] = !updatedOptions[option];
    setDistantSiteOptions(updatedOptions);
  };

  const handleOtherDistantSiteInputChange = (e) => {
    setOtherDistantSiteInput(e.target.value);
  };

  const selectedData = !upload ? (
    <div className="final-report">
      <h1>Final Report</h1>
      <ul className="selected-data-list">
        <li>
          <h2>SPECIMEN</h2>
          <ul>
            {specimenProcedure && (
              <li>
                <strong>Procedure :</strong>{" "}
                <span>
                  {specimenProcedure === "Other"
                    ? otherProcedure
                    : specimenProcedure}
                </span>
              </li>
            )}

            {specimenLaterality && (
              <li>
                <strong>Specimen Laterality :</strong> {specimenLaterality}
              </li>
            )}
          </ul>
        </li>
        <li>
          <h2>TUMOR</h2>

          <ul>
            {tumorSite && (
              <li>
                <strong>Tumor Site :</strong> {tumorSite}
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
                ? ` Length :${customSize.length} x Width: ${customSize.width} x Height : ${customSize.height} cm`
                : ` ${selectedOption}`}
            </li>
          </ul>
          <ul>
            <li>
              <strong>Tumor Focality (Note F) : </strong>
              <span>
                {tumorFocality === "Multiple foci of invasive carcinoma"
                  ? numFoci === "Specfic Number"
                    ? `Multiple foci of invasive carcinoma - ${numFoci}`
                    : `Multiple foci of invasive carcinoma - ${numFoci} - ${specificNumber}`
                  : tumorFocality}
              </span>
            </li>
          </ul>
        </li>
        <li>
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
                <strong>Selected Grade :</strong> {histologicGrade}
              </li>
            )}
            {histologicGrade === "Applicable" && (
              <>
                <li>
                  <strong>
                    Glandular (Acinar) / Tubular Differentiation :
                  </strong>{" "}
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
        <li>
          <h2>Ductal Carcinoma In Situ (DCIS)</h2>
          <ul>
            <strong>DCIS Presence : </strong> {dcisPresence}
          </ul>
          {dcisPresence === "Present" && (
            <ul>
              <strong>Size of DCIS : </strong>{" "}
              {`${dcisSize.x} - ${dcisSize.y} mm`}
            </ul>
          )}
          {dcisPresence === "Present" && (
            <ul>
              <strong>Architectural Patterns : </strong>{" "}
              {architecturalPattern === "Other"
                ? architecturalPatternOther
                : architecturalPattern}
            </ul>
          )}
          {dcisPresence === "Present" && (
            <ul>
              <strong>Nuclear Grade : </strong> {nuclearGrade}
            </ul>
          )}
          {dcisPresence === "Present" && (
            <ul>
              <strong>Necrosis : </strong> {necrosis}
            </ul>
          )}
          {dcisPresence === "Present" && (
            <ul>
              <strong>Number of Blocks with DCIS : </strong> {numBlocksDCIS}
            </ul>
          )}
          {dcisPresence === "Present" && (
            <ul>
              <strong>Number of Blocks Examined : </strong> {numBlocksExamined}
            </ul>
          )}
        </li>
        <li>
          <h2>Lobular Carcinoma In Situ (LCIS)</h2>
          <ul>
            <li>
              <strong>LCIS Presence : </strong> {lcisPresence}
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              <strong>Tumor Extent : </strong> {tumorExtent}
              <li>
                {tumorExtent === "Skin is present and involved" && (
                  <>
                    {" "}
                    <strong>Skin is present and involved : </strong>
                    {skinInvolvement}
                  </>
                )}
              </li>
              <li>
                {tumorExtent === "Skeletal muscle is present and involved" && (
                  <>
                    <strong>Skeletal muscle is present and involved : </strong>
                    {skeletalMuscleInvolvement}
                  </>
                )}
              </li>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <strong>Lymphovascular Invasion : </strong>{" "}
            {lymphovascularInvasion === "Present"
              ? lymphovascularInvasionExtent
              : lymphovascularInvasion}
          </ul>
        </li>
        <li>
          <ul>
            <strong>Microcalcifications : </strong>{" "}
            {microcalcifications === "Other"
              ? otherMicrocalcifications
              : microcalcifications}
          </ul>
        </li>
        {breastTreatmentEffect !== "NA" && (
          <li>
            <ul>
              <strong>Treatment Effect in the Breast : </strong>{" "}
              {breastTreatmentEffect}
            </ul>
          </li>
        )}
        {lymphNodeTreatmentEffect !== "NA" && (
          <li>
            <ul>
              <strong>Treatment Effect in the Lymph Nodes : </strong>{" "}
              {lymphNodeTreatmentEffect}
            </ul>
          </li>
        )}
        <li>
          <h2>Margins</h2>
          <ul>
            <strong>Margin Status for Invasive Carcinoma : </strong>{" "}
            {invasiveCarcinomaMarginStatus}
          </ul>
          {invasiveCarcinomaMarginStatus ===
            "Margin involved by invasive carcinoma." && (
            <>
              <strong>Specify Involved Margin : </strong> {involvedMargin}
            </>
          )}
          {invasiveCarcinomaMarginStatus ===
            "Distance of Invasive Carcinoma from deep resected margin" && (
            <>
              <strong>{invasiveCarcinomaMarginStatus} : </strong>{" "}
              {distanceFromMargin}
            </>
          )}
          {dcisPresence === "Present" && (
            <>
              <strong>Margin Status for DCIS :</strong>{" "}
              {dcisStatus === "Margin Involved by DCIS"
                ? `Specify Involved Margin - ${dcisInvolvedMargin}`
                : dcisStatus}
            </>
          )}
        </li>
        <li>
          <h2>REGIONAL LYMPH NODES</h2>
          <ul>
            {" "}
            <strong>
              Total Number of Lymph Nodes Examined (sentinel and non-sentinel) :{" "}
            </strong>{" "}
            {totalLymphNodesExamined}
          </ul>
          <ul>
            {" "}
            <strong>Total Number of Sentinel Nodes Examined : </strong>{" "}
            {totalSentinelNodesExamined}
          </ul>
          <strong>Lymphnodes Involved : </strong>{" "}
          {lymphNodesInvolved === "Yes" ? (
            <>
              {lymphNodesInvolved}
              <br />
              <strong>Select Metastasis Type - </strong>{" "}
              {selectedMetastasisType}
            </>
          ) : (
            lymphNodesInvolved
          )}
          {selectedMetastasisType ===
          "Size of Largest Nodal Metastatic Deposit" ? (
            <> - {largestMetastaticDepositSize} mm</>
          ) : (
            selectedMetastasisType === "Extranodal Extension" && (
              <>
                {extranodalExtension === "Present" ? (
                  <>
                    {" "}
                    - {extranodalExtension} - {extranodalExtensionSize}{" "}
                  </>
                ) : (
                  <> - {extranodalExtension}</>
                )}
              </>
            )
          )}
        </li>
        {distantSite !== "NA" && (
          <li>
            <h2>DISTANT METASTASIS</h2>
            <ul>
              <strong>Distant Site : </strong>{" "}
              <>
                {distantSite !== "NA" && (
                  <>
                    {" "}
                    - {distantSite} - {distantSiteOptions.Lung && "Lung ,"}{" "}
                    {distantSiteOptions.Liver && "Liver ,"}{" "}
                    {distantSiteOptions.Bone && "Bone , "}{" "}
                    {distantSiteOptions.Brain && "Brain ,"}{" "}
                    {distantSiteOptions.Other && (
                      <>- Other Distant Site : {otherDistantSiteInput}</>
                    )}{" "}
                  </>
                )}
              </>
            </ul>
          </li>
        )}
        <li>
          <h2>pTNM CLASSIFICATION</h2>
          <ul>
            <strong>pT :</strong> - {pT}
          </ul>
          <ul>
            <strong>pN :</strong> - {pN}
          </ul>
          <ul>
            <strong>pM :</strong> - {pM}
          </ul>
        </li>
        <li>
          <h2>Additional Findings</h2>
          <br />
          <>
            <strong>AdditionalFindings : </strong> {additionalFindings}
          </>
        </li>
        <li>
          <h2>Result</h2>
          <br />
          <>
            <strong>Result : </strong> {result}
          </>
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

  const [moveToSecondPage, setMoveToSecondPage] = useState(false);

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

  const [saveLoad, setSaveLoad] = useState(false);

  const saveData = async () => {
    if (specimenProcedure === "") {
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
    } else if (specimenProcedure === "Other" && otherProcedure === "") {
      toast.error("Enter Other Procedure", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (specimenLaterality === "") {
      toast.error("Select Specimen Laterality", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorSite === "") {
      toast.error("Select Tumor Site", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorSite === "Clock position" && !clockPositions.length > 0) {
      toast.error("Select Atleast One Clock Position", {
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
      tumorSite === "Distance from Nipple Areola Complex" &&
      distanceFromNipple === ""
    ) {
      toast.error("Enter Distance from Nipple Areola Complex", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedOption === "") {
      toast.error("Select Tumor Size", {
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
      selectedOption === "Other" &&
      (customSize.height === "" ||
        customSize.length === "" ||
        customSize.width === "")
    ) {
      toast.error("Enter the Tumor Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorFocality === "") {
      toast.error("Select Tumor Focality", {
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
      tumorFocality === "Multiple foci of invasive carcinoma" &&
      numFoci === ""
    ) {
      toast.error("Select Specific number of Foci", {
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
      tumorFocality === "Multiple foci of  invasive carcinoma" &&
      numFoci === "Specific number" &&
      specificNumber === ""
    ) {
      toast.error("Enter Specific number", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorExtent === "") {
      toast.error("Select Tumor Extent", {
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
      tumorExtent === "Skin is present and involved" &&
      skinInvolvement === ""
    ) {
      toast.error("Select Skin Involvment", {
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
      tumorExtent === "Skeletal muscle is present and involved" &&
      skeletalMuscleInvolvement === ""
    ) {
      toast.error("Select Skeletal Muscle Involvment", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphovascularInvasion === "") {
      toast.error("Select Lymphovascular Invasion", {
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
      lymphovascularInvasion === "Present" &&
      lymphovascularInvasionExtent === ""
    ) {
      toast.error("Select Lymphovascular Invasion Extent", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (breastTreatmentEffect === "") {
      toast.error("Select Treatment Effect in the Breast", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphNodeTreatmentEffect === "") {
      toast.error("Select Treatment Effect in the Lymph Nodes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (totalLymphNodesExamined === "") {
      toast.error("Enter Total Number of Lymph Nodes Examined", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (totalSentinelNodesExamined === "") {
      toast.error("Enter Total Number of Sentinel Nodes Examined", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphNodesInvolved === "") {
      toast.error("Select Lymphnodes Involved", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphNodesInvolved === "Yes" && selectedMetastasisType === "") {
      toast.error("Select Select Metastasis Type", {
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
      lymphNodesInvolved === "Yes" &&
      selectedMetastasisType === "Size of Largest Nodal Metastatic Deposit" &&
      largestMetastaticDepositSize === ""
    ) {
      toast.error("Enter Size of Largest Nodal Metastatic Deposit", {
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
      lymphNodesInvolved === "Yes" &&
      selectedMetastasisType === "Extranodal Extension" &&
      extranodalExtension === ""
    ) {
      toast.error("Select Extranodal Extension", {
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
      lymphNodesInvolved === "Yes" &&
      selectedMetastasisType === "Extranodal Extension" &&
      extranodalExtension === "Present" &&
      extranodalExtensionSize === ""
    ) {
      toast.error("Select Extranodal Extension Size", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (distantSite === "") {
      toast.error("Select Distant Site", {
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
      distantSite === "Present" &&
      distantSiteOptions.Liver === false &&
      distantSiteOptions.Bone === false &&
      distantSiteOptions.Brain === false &&
      distantSiteOptions.Lung === false &&
      distantSiteOptions.Other === false
    ) {
      toast.error("Select Atleast Distant Site Options", {
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
      distantSite === "Present" &&
      distantSiteOptions.Other === true &&
      otherDistantSiteInput === ""
    ) {
      toast.error("Enter Other Distant Site", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicType === "") {
      toast.error("Select Histologic Type", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicType === "Other" && otherHistologicType === "") {
      toast.error("Enter Other Histologic Type", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "") {
      toast.error("Select Histologic Grade", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "Applicable" && nuclearPleomorphism === "") {
      toast.error("Select Nuclear Pleomorphism", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "Applicable" && mitoticRate === "") {
      toast.error("Select Mitotic Rate", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "Applicable" && overallGrade === "") {
      toast.error("Select Overall Grade", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "") {
      toast.error("Select DCIS Presence", {
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
      dcisPresence === "Present" &&
      (dcisSize.x === "" || dcisSize.y === "")
    ) {
      toast.error("Enter DCIS Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && architecturalPattern === "") {
      toast.error("Select Architectural Patterns", {
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
      dcisPresence === "Present" &&
      architecturalPattern === "Other" &&
      architecturalPatternOther === ""
    ) {
      toast.error("Select Architectural Other Pattern", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && necrosis === "") {
      toast.error("Select Necrosis", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && numBlocksDCIS === "") {
      toast.error("Enter Number of Blocks with DCIS", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && numBlocksExamined === "") {
      toast.error("Enter Number of Blocks Examined", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lcisPresence === "") {
      toast.error("Select LCIS Presence", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (microcalcifications === "") {
      toast.error("Select Microcalcifications", {
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
      microcalcifications === "Other" &&
      otherMicrocalcifications === ""
    ) {
      toast.error("Enter Other Microcalcifications", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (invasiveCarcinomaMarginStatus === "") {
      toast.error("Select Margin Status for Invasive Carcinoma", {
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
      invasiveCarcinomaMarginStatus ===
        "Margin involved by invasive carcinoma." &&
      involvedMargin === ""
    ) {
      toast.error("Select Specify Involved Margin", {
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
      invasiveCarcinomaMarginStatus ===
        "Distance of Invasive Carcinoma from deep resected margin" &&
      distanceFromMargin === ""
    ) {
      toast.error(
        "Enter Distance of Invasive Carcinoma from deep resected margin ",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } else if (dcisPresence === "Present" && dcisStatus === "") {
      toast.error("Select Margin Status for DCIS", {
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
      dcisPresence === "Present" &&
      dcisStatus === "Margin Involved by DCIS" &&
      dcisInvolvedMargin === ""
    ) {
      toast.error("Enter Specific Involved Margin for DCIS", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (pT === "") {
      toast.error("Select pT", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (pN === "") {
      toast.error("Select pN", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (pM === "") {
      toast.error("Select pM", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (additionalFindings === "") {
      toast.error("Enter Additional Findings", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (result === "") {
      toast.error("Enter Result", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        setSaveLoad(true);
        const url = `${process.env.REACT_APP_ROOT_URL}/adddetails`;

        const reqConfigure = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sample_id,
            specimenProcedure,
            otherProcedure,
            specimenLaterality,
            tumorSite,
            clockPositions,
            distanceFromNipple,
            histologicType,
            otherHistologicType,
            histologicGrade,
            glandularDifferentiation,
            nuclearPleomorphism,
            mitoticRate,
            overallGrade,
            selectedOption,
            customSize,
            tumorFocality,
            numFoci,
            specificNumber,
            dcisPresence,
            dcisSize,
            architecturalPattern,
            architecturalPatternOther,
            nuclearGrade,
            necrosis,
            numBlocksDCIS,
            numBlocksExamined,
            lcisPresence,
            tumorExtent,
            skinInvolvement,
            skeletalMuscleInvolvement,
            lymphovascularInvasion,
            lymphovascularInvasionExtent,
            microcalcifications,
            otherMicrocalcifications,
            breastTreatmentEffect,
            lymphNodeTreatmentEffect,
            invasiveCarcinomaMarginStatus,
            involvedMargin,
            distanceFromMargin,
            dcisStatus,
            dcisInvolvedMargin,
            totalLymphNodesExamined,
            totalSentinelNodesExamined,
            lymphNodesInvolved,
            selectedMetastasisType,
            largestMetastaticDepositSize,
            extranodalExtension,
            extranodalExtensionSize,
            distantSite,
            distantSiteOptions,
            otherDistantSiteInput,
            pT,
            pN,
            pM,
            additionalFindings,
            result,
            notes,
          }),
        };
        const response = await fetch(url, reqConfigure);

        if (response.ok) {
          setSaveLoad(false);
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
  };

  const editData = async () => {
    if (specimenProcedure === "") {
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
    } else if (specimenProcedure === "Other" && otherProcedure === "") {
      toast.error("Enter Other Procedure", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (specimenLaterality === "") {
      toast.error("Select Specimen Laterality", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorSite === "") {
      toast.error("Select Tumor Site", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorSite === "Clock position" && !clockPositions.length > 0) {
      toast.error("Select Atleast One Clock Position", {
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
      tumorSite === "Distance from Nipple Areola Complex" &&
      distanceFromNipple === ""
    ) {
      toast.error("Enter Distance from Nipple Areola Complex", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedOption === "") {
      toast.error("Select Tumor Size", {
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
      selectedOption === "Other" &&
      (customSize.height === "" ||
        customSize.length === "" ||
        customSize.width === "")
    ) {
      toast.error("Enter the Tumor Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorFocality === "") {
      toast.error("Select Tumor Focality", {
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
      tumorFocality === "Multiple foci of invasive carcinoma" &&
      numFoci === ""
    ) {
      toast.error("Select Specific number of Foci", {
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
      tumorFocality === "Multiple foci of  invasive carcinoma" &&
      numFoci === "Specific number" &&
      specificNumber === ""
    ) {
      toast.error("Enter Specific number", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (tumorExtent === "") {
      toast.error("Select Tumor Extent", {
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
      tumorExtent === "Skin is present and involved" &&
      skinInvolvement === ""
    ) {
      toast.error("Select Skin Involvment", {
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
      tumorExtent === "Skeletal muscle is present and involved" &&
      skeletalMuscleInvolvement === ""
    ) {
      toast.error("Select Skeletal Muscle Involvment", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphovascularInvasion === "") {
      toast.error("Select Lymphovascular Invasion", {
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
      lymphovascularInvasion === "Present" &&
      lymphovascularInvasionExtent === ""
    ) {
      toast.error("Select Lymphovascular Invasion Extent", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (breastTreatmentEffect === "") {
      toast.error("Select Treatment Effect in the Breast", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphNodeTreatmentEffect === "") {
      toast.error("Select Treatment Effect in the Lymph Nodes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (totalLymphNodesExamined === "") {
      toast.error("Enter Total Number of Lymph Nodes Examined", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (totalSentinelNodesExamined === "") {
      toast.error("Enter Total Number of Sentinel Nodes Examined", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphNodesInvolved === "") {
      toast.error("Select Lymphnodes Involved", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lymphNodesInvolved === "Yes" && selectedMetastasisType === "") {
      toast.error("Select Select Metastasis Type", {
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
      lymphNodesInvolved === "Yes" &&
      selectedMetastasisType === "Size of Largest Nodal Metastatic Deposit" &&
      largestMetastaticDepositSize === ""
    ) {
      toast.error("Enter Size of Largest Nodal Metastatic Deposit", {
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
      lymphNodesInvolved === "Yes" &&
      selectedMetastasisType === "Extranodal Extension" &&
      extranodalExtension === ""
    ) {
      toast.error("Select Extranodal Extension", {
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
      lymphNodesInvolved === "Yes" &&
      selectedMetastasisType === "Extranodal Extension" &&
      extranodalExtension === "Present" &&
      extranodalExtensionSize === ""
    ) {
      toast.error("Select Extranodal Extension Size", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (distantSite === "") {
      toast.error("Select Distant Site", {
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
      distantSite === "Present" &&
      distantSiteOptions.Liver === false &&
      distantSiteOptions.Bone === false &&
      distantSiteOptions.Brain === false &&
      distantSiteOptions.Lung === false &&
      distantSiteOptions.Other === false
    ) {
      toast.error("Select Atleast Distant Site Options", {
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
      distantSite === "Present" &&
      distantSiteOptions.Other === true &&
      otherDistantSiteInput === ""
    ) {
      toast.error("Enter Other Distant Site", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicType === "") {
      toast.error("Select Histologic Type", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicType === "Other" && otherHistologicType === "") {
      toast.error("Enter Other Histologic Type", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "") {
      toast.error("Select Histologic Grade", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "Applicable" && nuclearPleomorphism === "") {
      toast.error("Select Nuclear Pleomorphism", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "Applicable" && mitoticRate === "") {
      toast.error("Select Mitotic Rate", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (histologicGrade === "Applicable" && overallGrade === "") {
      toast.error("Select Overall Grade", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "") {
      toast.error("Select DCIS Presence", {
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
      dcisPresence === "Present" &&
      (dcisSize.x === "" || dcisSize.y === "")
    ) {
      toast.error("Enter DCIS Sizes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && architecturalPattern === "") {
      toast.error("Select Architectural Patterns", {
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
      dcisPresence === "Present" &&
      architecturalPattern === "Other" &&
      architecturalPatternOther === ""
    ) {
      toast.error("Select Architectural Other Pattern", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && necrosis === "") {
      toast.error("Select Necrosis", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && numBlocksDCIS === "") {
      toast.error("Enter Number of Blocks with DCIS", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (dcisPresence === "Present" && numBlocksExamined === "") {
      toast.error("Enter Number of Blocks Examined", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (lcisPresence === "") {
      toast.error("Select LCIS Presence", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (microcalcifications === "") {
      toast.error("Select Microcalcifications", {
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
      microcalcifications === "Other" &&
      otherMicrocalcifications === ""
    ) {
      toast.error("Enter Other Microcalcifications", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (invasiveCarcinomaMarginStatus === "") {
      toast.error("Select Margin Status for Invasive Carcinoma", {
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
      invasiveCarcinomaMarginStatus ===
        "Margin involved by invasive carcinoma." &&
      involvedMargin === ""
    ) {
      toast.error("Select Specify Involved Margin", {
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
      invasiveCarcinomaMarginStatus ===
        "Distance of Invasive Carcinoma from deep resected margin" &&
      distanceFromMargin === ""
    ) {
      toast.error(
        "Enter Distance of Invasive Carcinoma from deep resected margin ",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } else if (dcisPresence === "Present" && dcisStatus === "") {
      toast.error("Select Margin Status for DCIS", {
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
      dcisPresence === "Present" &&
      dcisStatus === "Margin Involved by DCIS" &&
      dcisInvolvedMargin === ""
    ) {
      toast.error("Enter Specific Involved Margin for DCIS", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (pT === "") {
      toast.error("Select pT", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (pN === "") {
      toast.error("Select pN", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (pM === "") {
      toast.error("Select pM", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (additionalFindings === "") {
      toast.error("Enter Additional Findings", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (result === "") {
      toast.error("Enter Result", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        setSaveLoad(true);
        const url = `${process.env.REACT_APP_ROOT_URL}/updatedetails/${sample_id}`;

        const reqConfigure = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sample_id,
            specimenProcedure,
            otherProcedure,
            specimenLaterality,
            tumorSite,
            clockPositions,
            distanceFromNipple,
            histologicType,
            otherHistologicType,
            histologicGrade,
            glandularDifferentiation,
            nuclearPleomorphism,
            mitoticRate,
            overallGrade,
            selectedOption,
            customSize,
            tumorFocality,
            numFoci,
            specificNumber,
            dcisPresence,
            dcisSize,
            architecturalPattern,
            architecturalPatternOther,
            nuclearGrade,
            necrosis,
            numBlocksDCIS,
            numBlocksExamined,
            lcisPresence,
            tumorExtent,
            skinInvolvement,
            skeletalMuscleInvolvement,
            lymphovascularInvasion,
            lymphovascularInvasionExtent,
            microcalcifications,
            otherMicrocalcifications,
            breastTreatmentEffect,
            lymphNodeTreatmentEffect,
            invasiveCarcinomaMarginStatus,
            involvedMargin,
            distanceFromMargin,
            dcisStatus,
            dcisInvolvedMargin,
            totalLymphNodesExamined,
            totalSentinelNodesExamined,
            lymphNodesInvolved,
            selectedMetastasisType,
            largestMetastaticDepositSize,
            extranodalExtension,
            extranodalExtensionSize,
            distantSite,
            distantSiteOptions,
            otherDistantSiteInput,
            pT,
            pN,
            pM,
            additionalFindings,
            result,
            notes,
          }),
        };
        const response = await fetch(url, reqConfigure);

        if (response.ok) {
          setSaveLoad(false);

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
  };

  useEffect(() => {
    getData();
  }, []);

  const [showEdit, setShowEdit] = useState(false);

  const getData = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/getalldetails?sample_id=${sample_id}`;

    const res = await axios.get(url);

    if (res.status === 200) {
      res.data.length === 0 ? setShowEdit(true) : setShowEdit(false);
    }

    if (res.data.length !== 0) {
      if (res.status === 200) {
        res.data[0].specimenProcedure !== undefined &&
          setSpecimenProcedure(res.data[0].specimenProcedure);

        res.data[0].otherProcedure !== undefined &&
          setOtherProcedure(res.data[0].otherProcedure);
        res.data[0].specimenLaterality !== undefined &&
          setSpecimenLaterality(res.data[0].specimenLaterality);
        res.data[0].tumorSite !== undefined &&
          setTumorSite(res.data[0].tumorSite);

        res.data[0].clockPositions !== undefined &&
          setClockPositions(res.data[0].clockPositions);
        res.data[0].distanceFromNipple !== undefined &&
          setDistanceFromNipple(res.data[0].distanceFromNipple);
        res.data[0].histologicType !== undefined &&
          setHistologicType(res.data[0].histologicType);
        res.data[0].otherHistologicType !== undefined &&
          setOtherHistologicType(res.data[0].otherHistologicType);
        res.data[0].histologicGrade !== undefined &&
          setHistologicGrade(res.data[0].histologicGrade);
        res.data[0].glandularDifferentiation !== undefined &&
          setGlandularDifferentiation(res.data[0].glandularDifferentiation);
        res.data[0].nuclearPleomorphism !== undefined &&
          setNuclearPleomorphism(res.data[0].nuclearP);
        res.data[0].mitoticRate !== undefined &&
          setMitoticRate(res.data[0].mitoticRate);
        res.overallGrade !== undefined &&
          setOverallGrade(res.data[0].overallGrade);
        res.data[0].selectedOption !== undefined &&
          setSelectedOption(res.data[0].selectedOption);
        res.data[0].customSize !== undefined &&
          setCustomSize(res.data[0].customSize);
        res.data[0].tumorFocality !== undefined &&
          setTumorFocality(res.data[0].tumorFocality);
        res.data[0].numFoci !== undefined && setNumFoci(res.data[0].numFoci);
        res.data[0].specificNumber !== undefined &&
          setSpecificNumber(res.data[0].specificNumber);
        res.data[0].dcisPresence !== undefined &&
          setDcisPresence(res.data[0].dcisPresence);
        res.data[0].dcisSize !== undefined && setDcisSize(res.data[0].dcisSize);
        res.data[0].architecturalPattern !== undefined &&
          setArchitecturalPattern(res.data[0].architecturalPattern);
        res.data[0].architecturalPatternOther !== undefined &&
          setArchitecturalPatternOther(res.data[0].architecturalPatternOther);
        res.data[0].nuclearGrade !== undefined &&
          setNuclearGrade(res.data[0].nuclearGrade);
        res.data[0].necrosis !== undefined && setNecrosis(res.data[0].necrosis);
        res.data[0].numBlocksDCIS !== undefined &&
          setNumBlocksDCIS(res.data[0].numBlocksDCIS);
        res.data[0].numBlocksExamined !== undefined &&
          setNumBlocksExamined(res.data[0].numBlocksExamined);
        res.data[0].lcisPresence !== undefined &&
          setLcisPresence(res.data[0].licsPresence);
        res.data[0].tumorExtent !== undefined &&
          setTumorExtent(res.data[0].tumorExtent);
        res.data[0].skinInvolvement !== undefined &&
          setSkinInvolvement(res.data[0].skinInvolvement);
        res.data[0].skeletalMuscleInvolvement !== undefined &&
          setSkeletalMuscleInvolvement(res.data[0].skeletalMuscleInvolvement);
        res.data[0].lymphovascularInvasion !== undefined &&
          setLymphovascularInvasion(res.data[0].lymphovascularInvasion);
        res.data[0].lymphovascularInvasionExtent !== undefined &&
          setLymphovascularInvasionExtent(
            res.data[0].lymphovascularInvasionExtent
          );
        res.data[0].microcalcifications !== undefined &&
          setMicrocalcifications(res.data[0].microcalcifications);
        res.data[0].otherMicrocalcifications !== undefined &&
          setOtherMicrocalcifications(res.data[0].otherMicrocalcifications);
        res.data[0].breastTreatmentEffect !== undefined &&
          setBreastTreatmentEffect(res.data[0].breastTreatmentEffect);
        res.data[0].lymphNodeTreatmentEffect !== undefined &&
          setLymphNodeTreatmentEffect(res.data[0].lymphNodeTreatmentEffect);
        res.data[0].invasiveCarcinomaMarginStatus !== undefined &&
          setInvasiveCarcinomaMarginStatus(
            res.data[0].invasiveCarcinomaMarginStatus
          );
        res.data[0].involvedMargin !== undefined &&
          setInvolvedMargin(res.data[0].involvedMargin);
        res.data[0].distanceFromMargin !== undefined &&
          setDistanceFromMargin(res.data[0].distanceFromMargin);
        res.data[0].dcisStatus !== undefined &&
          setDcisStatus(res.data[0].dcisStatus);
        res.data[0].dcisInvolvedMargin !== undefined &&
          setDcisInvolvedMargin(res.data[0].dcisInvolvedMargin);
        res.data[0].totalLymphNodesExamined !== undefined &&
          setTotalLymphNodesExamined(res.data[0].totalLymphNodesExamined);
        res.data[0].totalSentinelNodesExamined !== undefined &&
          setTotalSentinelNodesExamined(res.data[0].totalSentinelNodesExamined);
        res.data[0].lymphNodesInvolved !== undefined &&
          setLymphNodesInvolved(res.data[0].lymphNodesInvolved);
        res.data[0].selectedMetastasisType !== undefined &&
          setSelectedMetastasisType(res.data[0].selectedMetastasisType);
        res.data[0].largestMetastaticDepositSize !== undefined &&
          setLargestMetastaticDepositSize(
            res.data[0].setLargestMetastaticDepositSize
          );
        res.data[0].extranodalExtension !== undefined &&
          setExtranodalExtension(res.data[0].extranodalExtension);
        res.data[0].extranodalExtensionSize !== undefined &&
          setExtranodalExtensionSize(res.data[0].extranodalExtensionSize);
        res.data[0].distantSite !== undefined &&
          setDistantSite(res.data[0].distantSite);
        res.data[0].distantSiteOptions !== undefined &&
          setDistantSiteOptions(res.data[0].distantSiteOptions);
        res.data[0].otherDistantSiteInput !== undefined &&
          setOtherDistantSiteInput(res.data[0].otherDistantSiteInput);
        res.data[0].pT !== undefined && setPT(res.data[0].pT);
        res.data[0].pN !== undefined && setPN(res.data[0].pN);
        res.data[0].pM !== undefined && setPM(res.data[0].pM);
        res.data[0].additionalFindings !== undefined &&
          setAdditionalFindings(res.data[0].additionalFindings);
        res.data[0].result !== undefined && setResult(res.data[0].result);
        res.data[0].notes !== undefined && setNotes(res.data[0].notes);
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
                onClick={() => Export2Doc("exportContent", "test")}
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
          <h1 style={{ marginLeft: "5%" }}>Microscopy Template</h1>
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
              <div className="tumorsize">
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
                  <lable>
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
                  </lable>
                )}
              </div>
              <div className="tumorfoci">
                <label>
                  Tumor Focality (Note F):
                  <select
                    id="tumorFocality"
                    value={tumorFocality}
                    onChange={handleTumorFocalityChange}
                  >
                    <option value="">Select</option>
                    <option value="Single focus of invasive carcinoma">
                      Single focus of invasive carcinoma
                    </option>
                    <option value="Multiple foci of invasive carcinoma">
                      Multiple foci of invasive carcinoma
                    </option>
                  </select>
                </label>
                {tumorFocality === "Multiple foci of invasive carcinoma" && (
                  <lable className="foci">
                    <label htmlFor="numFoci">Specify the number of Foci:</label>
                    <select
                      id="numFoci"
                      value={numFoci}
                      onChange={handleNumFociChange}
                    >
                      <option value="">Select</option>
                      <option value="Exact number cannot be determined">
                        Exact number cannot be determined
                      </option>
                      <option value="Specific number">Specific number</option>
                    </select>
                  </lable>
                )}
                {numFoci === "Specific number" &&
                  tumorFocality === "Multiple foci of invasive carcinoma" && (
                    <lable className="foci">
                      <label htmlFor="specificNumberInput">
                        Enter the specific number:
                      </label>
                      <input
                        type="text"
                        id="specificNumberInput"
                        value={specificNumber}
                        onChange={handleSpecificNumberChange}
                        min="1"
                        name="specificNumberInput"
                        placeholder="Enter Specific Number"
                      />
                    </lable>
                  )}
              </div>
              <div className="tumorExtent">
                <h2>Tumor Extent</h2>
                <label>Tumor Extent:</label>
                <select
                  value={tumorExtent}
                  onChange={(e) => setTumorExtent(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Not applicable (skin, nipple, and skeletal muscle are absent)">
                    Not applicable (skin, nipple, and skeletal muscle are
                    absent)
                  </option>
                  <option value="Not applicable (skin, nipple, and skeletal muscle are uninvolved)">
                    Not applicable (skin, nipple, and skeletal muscle are
                    uninvolved)
                  </option>
                  <option value="Skin is present and involved">
                    Skin is present and involved
                  </option>
                  <option value="DCIS involves nipple epidermis (Paget disease of the nipple)#">
                    DCIS involves nipple epidermis (Paget disease of the
                    nipple)#
                  </option>
                  <option value="Skeletal muscle is present and involved">
                    Skeletal muscle is present and involved
                  </option>
                </select>

                {tumorExtent === "Skin is present and involved" && (
                  <div className="tumorExtent">
                    <label>Skin Involvement:</label>
                    <select
                      value={skinInvolvement}
                      onChange={(e) => setSkinInvolvement(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Carcinoma directly invades into the dermis or epidermis without skin ulceration">
                        Carcinoma directly invades into the dermis or epidermis
                        without skin ulceration
                      </option>
                      <option value="Carcinoma directly invades into the dermis or epidermis with skin ulceration (T4b)">
                        Carcinoma directly invades into the dermis or epidermis
                        with skin ulceration (T4b)
                      </option>
                      <option value="Carcinoma does not directly invade into the dermis or epidermis">
                        Carcinoma does not directly invade into the dermis or
                        epidermis
                      </option>
                      <option value="Satellite skin foci of invasive carcinoma are present (i.e., not contiguous with the invasive carcinoma in the breast) (classified as T4b)">
                        Satellite skin foci of invasive carcinoma are present
                        (i.e., not contiguous with the invasive carcinoma in the
                        breast) (classified as T4b)
                      </option>
                    </select>
                  </div>
                )}

                {tumorExtent === "Skeletal muscle is present and involved" && (
                  <div className="tumorExtent">
                    <label>Skeletal Muscle Involvement:</label>
                    <select
                      value={skeletalMuscleInvolvement}
                      onChange={(e) =>
                        setSkeletalMuscleInvolvement(e.target.value)
                      }
                      required
                    >
                      <option value="">Select</option>
                      <option value="Carcinoma invades skeletal muscle">
                        Carcinoma invades skeletal muscle
                      </option>
                      <option value="Carcinoma invades into skeletal muscle and into the chest wall (classified as T4a)">
                        Carcinoma invades into skeletal muscle and into the
                        chest wall (classified as T4a)
                      </option>
                    </select>
                  </div>
                )}
              </div>
              <div className="tumorExtent">
                <h2>Lymphovascular Invasion</h2>
                <label>Lymphovascular Invasion:</label>
                <select
                  value={lymphovascularInvasion}
                  onChange={(e) => setLymphovascularInvasion(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Not identified">Not identified</option>
                  <option value="Present">Present</option>
                  <option value="Cannot be determined">
                    Cannot be determined
                  </option>
                </select>

                {lymphovascularInvasion === "Present" && (
                  <div className="tumorExtent">
                    <label>LVI Extent:</label>
                    <select
                      value={lymphovascularInvasionExtent}
                      onChange={(e) =>
                        setLymphovascularInvasionExtent(e.target.value)
                      }
                      required
                    >
                      <option value="">Select</option>
                      <option value="Focal (LVI in one block only)">
                        Focal (LVI in one block only)
                      </option>
                      <option value="Extensive (LVI in two or more blocks)">
                        Extensive (LVI in two or more blocks)
                      </option>
                    </select>
                  </div>
                )}
              </div>
              <div className="tumorExtent">
                <h2>Treatment Effect in the Breast</h2>
                <label>Treatment Effect in the Breast :</label>
                <select
                  value={breastTreatmentEffect}
                  onChange={(e) => setBreastTreatmentEffect(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="NA">NA</option>
                  <option value="No known presurgical therapy">
                    No known presurgical therapy
                  </option>
                  <option value="No definite response to presurgical therapy in the invasive carcinoma">
                    No definite response to presurgical therapy in the invasive
                    carcinoma
                  </option>
                  <option value="Probable or definite response to presurgical therapy in the invasive carcinoma">
                    Probable or definite response to presurgical therapy in the
                    invasive carcinoma
                  </option>
                  <option value="No residual invasive carcinoma is present in the breast after presurgical therapy">
                    No residual invasive carcinoma is present in the breast
                    after presurgical therapy
                  </option>
                </select>

                <h2>Treatment Effect in the Lymph Nodes</h2>
                <label>Treatment Effect in the Lymph Nodes:</label>
                <select
                  value={lymphNodeTreatmentEffect}
                  onChange={(e) => setLymphNodeTreatmentEffect(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="NA">NA</option>
                  <option value="No definite response to presurgical therapy in metastatic carcinoma">
                    No definite response to presurgical therapy in metastatic
                    carcinoma
                  </option>
                  <option value="Probable or definite response to presurgical therapy in metastatic carcinoma">
                    Probable or definite response to presurgical therapy in
                    metastatic carcinoma
                  </option>
                  <option value="No lymph node metastases. Fibrous scarring or histiocytic aggregates, possibly related to prior lymph node metastases with pathologic complete response">
                    No lymph node metastases. Fibrous scarring or histiocytic
                    aggregates, possibly related to prior lymph node metastases
                    with pathologic complete response
                  </option>
                  <option value="No lymph node metastases and no fibrous scarring or histiocytic aggregates in the nodes">
                    No lymph node metastases and no fibrous scarring or
                    histiocytic aggregates in the nodes
                  </option>
                </select>
              </div>
              <div className="tumorExtent">
                <h2>REGIONAL LYMPH NODES</h2>
                <label>
                  Total Number of Lymph Nodes Examined (sentinel and
                  non-sentinel):
                </label>
                <input
                  type="text"
                  value={totalLymphNodesExamined}
                  onChange={(e) => setTotalLymphNodesExamined(e.target.value)}
                  required
                />

                <label>Total Number of Sentinel Nodes Examined:</label>
                <input
                  type="text"
                  value={totalSentinelNodesExamined}
                  onChange={(e) =>
                    setTotalSentinelNodesExamined(e.target.value)
                  }
                  required
                />
              </div>
              <div className="tumorExtent">
                <label>Lymphnodes Involved</label>
                <select
                  value={lymphNodesInvolved}
                  onChange={(e) => setLymphNodesInvolved(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                {lymphNodesInvolved === "Yes" && (
                  <div className="tumorExtent">
                    <label>Select Metastasis Type:</label>
                    <select
                      value={selectedMetastasisType}
                      onChange={handleMetastasisTypeChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Number of Lymph Nodes with Macro metastases (greater than 2 mm)">
                        Number of Lymph Nodes with Macro metastases (greater
                        than 2 mm)
                      </option>
                      <option value="Number of Lymph Nodes with Micro metastases (> 0.2 - 2 mm or > 200 cells)">
                        Number of Lymph Nodes with Micro metastases &#62; 2 0.2
                        - 2 mm or &#62; 200 cells
                      </option>
                      <option value="Number of Lymph Nodes with Isolated Tumor Cells (<0.2 mm OR 200 cells or less)">
                        Number of Lymph Nodes with Isolated Tumor Cells (&#8804;
                        20.2 mm OR 200 cells or less)
                      </option>
                      <option value="Size of Largest Nodal Metastatic Deposit">
                        Size of Largest Nodal Metastatic Deposit
                      </option>
                      <option value="Extranodal Extension">
                        Extranodal Extension
                      </option>
                    </select>

                    {selectedMetastasisType ===
                      "Size of Largest Nodal Metastatic Deposit" && (
                      <div className="tumorExtent">
                        <label>
                          Size of Largest Nodal Metastatic Deposit (mm):
                        </label>
                        <input
                          type="text"
                          value={largestMetastaticDepositSize}
                          onChange={(e) =>
                            setLargestMetastaticDepositSize(e.target.value)
                          }
                          required
                        />
                      </div>
                    )}

                    {selectedMetastasisType === "Extranodal Extension" && (
                      <div className="tumorExtent">
                        <label>Extranodal Extension:</label>
                        <select
                          value={extranodalExtension}
                          onChange={handleExtranodalExtensionChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Not identified">Not identified</option>
                          <option value="Present">Present</option>
                        </select>

                        {extranodalExtension === "Present" && (
                          <div className="tumorExtent">
                            <label>Extranodal Extension Size:</label>
                            <div className="extrasize">
                              <label className="extrasize">
                                <input
                                  type="radio"
                                  name="extranodalExtensionSize"
                                  value="<2"
                                  checked={extranodalExtensionSize === "<2"}
                                  onChange={() =>
                                    setExtranodalExtensionSize("<2")
                                  }
                                />{" "}
                                &#8804;2
                              </label>
                              <label className="extrasize">
                                <input
                                  type="radio"
                                  name="extranodalExtensionSize"
                                  value=">2"
                                  checked={extranodalExtensionSize === ">2"}
                                  onChange={() =>
                                    setExtranodalExtensionSize(">2")
                                  }
                                />{" "}
                                &#62; 2
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="tumorExtent">
                <h2>DISTANT METASTASIS</h2>
                <label>Distant Site:</label>
                <select
                  value={distantSite}
                  onChange={handleDistantSiteChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="NA">NA</option>
                  <option value="Present">Present</option>
                </select>

                {distantSite === "Present" && (
                  <div className="check-box-size">
                    <label>Distant Site Options:</label>

                    <div className="check-boxs">
                      <label>Lung</label>
                      <input
                        type="checkbox"
                        checked={distantSiteOptions.Lung}
                        onChange={() => handleDistantSiteOptionChange("Lung")}
                      />
                    </div>
                    <div className="check-boxs">
                      <label>Liver</label>
                      <input
                        type="checkbox"
                        checked={distantSiteOptions.Liver}
                        onChange={() => handleDistantSiteOptionChange("Liver")}
                      />
                    </div>
                    <div className="check-boxs">
                      <label>Bone</label>
                      <input
                        type="checkbox"
                        checked={distantSiteOptions.Bone}
                        onChange={() => handleDistantSiteOptionChange("Bone")}
                      />
                    </div>
                    <div className="check-boxs">
                      <label>Brain</label>
                      <input
                        type="checkbox"
                        checked={distantSiteOptions.Brain}
                        onChange={() => handleDistantSiteOptionChange("Brain")}
                      />
                    </div>
                    <div className="check-boxs">
                      <label>Other</label>
                      <input
                        type="checkbox"
                        checked={distantSiteOptions.Other}
                        onChange={() => handleDistantSiteOptionChange("Other")}
                      />
                    </div>

                    {distantSiteOptions.Other && (
                      <div className="tumorExtent">
                        <label>Other Distant Site :</label>
                        <input
                          type="text"
                          value={otherDistantSiteInput}
                          onChange={handleOtherDistantSiteInputChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                )}
                <h2>Notes</h2>
                <textarea
                  rows="10"
                  cols="5"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="form-column">
              <div className="historictype">
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
              <div className="historictype">
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
              <div>
                <h2>Ductal Carcinoma In Situ (DCIS)</h2>
                <div className="dcis">
                  <label>DCIS Presence:</label>
                  <select
                    value={dcisPresence}
                    onChange={(e) => setDcisPresence(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Not identified">Not identified</option>
                    <option value="Only DCIS is present after presurgical (neoadjuvant) therapy">
                      Only DCIS is present after presurgical (neoadjuvant)
                      therapy
                    </option>
                    <option value="Present">Present</option>
                  </select>
                </div>
                {dcisPresence === "Present" && (
                  <div className="dcis">
                    <label>Size of DCIS:</label>
                    <div className="dcis-3">
                      <input
                        type="text"
                        placeholder="_"
                        value={dcisSize.x}
                        onChange={(e) =>
                          setDcisSize({ ...dcisSize, x: e.target.value })
                        }
                        required
                      />
                      x
                      <input
                        type="text"
                        placeholder="_"
                        value={dcisSize.y}
                        onChange={(e) =>
                          setDcisSize({ ...dcisSize, y: e.target.value })
                        }
                        required
                      />
                      mm
                    </div>
                    <label>Architectural Patterns:</label>
                    <select
                      value={architecturalPattern}
                      onChange={(e) => setArchitecturalPattern(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Comedo">Comedo</option>
                      <option value="Paget disease (DCIS involving nipple skin)">
                        Paget disease (DCIS involving nipple skin)
                      </option>
                      <option value="Cribriform">Cribriform</option>
                      <option value="Micropapillary">Micropapillary</option>
                      <option value="Papillary">Papillary</option>
                      <option value="Solid">Solid</option>
                      <option value="Other">Other</option>
                    </select>
                    {architecturalPattern === "Other" && (
                      <input
                        type="text"
                        placeholder="Type here"
                        value={architecturalPatternOther}
                        onChange={(e) =>
                          setArchitecturalPatternOther(e.target.value)
                        }
                        required
                      />
                    )}
                    <label>Nuclear Grade:</label>
                    <select
                      value={nuclearGrade}
                      onChange={(e) => setNuclearGrade(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Grade I (low)">Grade I (low)</option>
                      <option value="Grade II (intermediate)">
                        Grade II (intermediate)
                      </option>
                      <option value="Grade III (high)">Grade III (high)</option>
                    </select>
                    <label>Necrosis:</label>
                    <select
                      value={necrosis}
                      onChange={(e) => setNecrosis(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Not identified">Not identified</option>
                      <option value="Present, focal (small foci or single cell necrosis)">
                        Present, focal (small foci or single cell necrosis)
                      </option>
                      <option value="Present, central (expansive 'comedo' necrosis)">
                        Present, central (expansive 'comedo' necrosis)
                      </option>
                    </select>
                    <label>Number of Blocks with DCIS:</label>
                    <input
                      type="text"
                      value={numBlocksDCIS}
                      onChange={(e) => setNumBlocksDCIS(e.target.value)}
                      required
                    />
                    <label>Number of Blocks Examined:</label>
                    <input
                      type="text"
                      value={numBlocksExamined}
                      onChange={(e) => setNumBlocksExamined(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>
              <div className="historictype">
                <h2>Lobular Carcinoma In Situ (LCIS)</h2>
                <label>LCIS Presence:</label>
                <select
                  value={lcisPresence}
                  onChange={(e) => setLcisPresence(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Not identified">Not identified</option>
                  <option value="Present">Present</option>
                </select>
              </div>
              <div className="historictype">
                <h2>Microcalcifications</h2>
                <label>Microcalcifications:</label>
                <select
                  value={microcalcifications}
                  onChange={(e) => setMicrocalcifications(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Not identified">Not identified</option>
                  <option value="Present in DCIS">Present in DCIS</option>
                  <option value="Present in invasive carcinoma">
                    Present in invasive carcinoma
                  </option>
                  <option value="Present in non-neoplastic tissue">
                    Present in non-neoplastic tissue
                  </option>
                  <option value="Other">Other</option>
                </select>

                {microcalcifications === "Other" && (
                  <div id="input-his">
                    <label>Specify Other Microcalcifications:</label>
                    <input
                      type="text"
                      value={otherMicrocalcifications}
                      onChange={(e) =>
                        setOtherMicrocalcifications(e.target.value)
                      }
                      required
                    />
                  </div>
                )}
              </div>
              <div className="tumorExtent">
                <h2>Margins</h2>
                <label>Margin Status for Invasive Carcinoma:</label>
                <select
                  value={invasiveCarcinomaMarginStatus}
                  onChange={(e) =>
                    setInvasiveCarcinomaMarginStatus(e.target.value)
                  }
                  required
                >
                  <option value="">Select</option>
                  <option value="Not applicable (residual invasive carcinoma in specimen is absent)">
                    Not applicable (residual invasive carcinoma in specimen is
                    absent)
                  </option>
                  <option value="All margins are negative for invasive carcinoma.">
                    All margins are negative for invasive carcinoma.
                  </option>
                  <option value="Margin involved by invasive carcinoma.">
                    Margin involved by invasive carcinoma.
                  </option>
                  <option value="Distance of Invasive Carcinoma from deep resected margin">
                    Distance of Invasive Carcinoma from deep resected margin
                  </option>
                </select>

                {invasiveCarcinomaMarginStatus ===
                  "Margin involved by invasive carcinoma." && (
                  <div className="tumorExtent">
                    <label>Specify Involved Margin:</label>
                    <select
                      value={involvedMargin}
                      onChange={(e) => setInvolvedMargin(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Deep Resected Margin">
                        Deep Resected Margin
                      </option>
                      <option value="Anterior Margin">Anterior Margin</option>
                      <option value="Posterior Margin">Posterior Margin</option>
                      <option value="Superior Margin">Superior Margin</option>
                      <option value="Inferior Margin">Inferior Margin</option>
                      <option value="Medial Margin">Medial Margin</option>
                      <option value="Lateral Margin">Lateral Margin</option>
                    </select>
                  </div>
                )}

                {invasiveCarcinomaMarginStatus ===
                  "Distance of Invasive Carcinoma from deep resected margin" && (
                  <div className="tumorExtent">
                    <label>
                      Distance of Invasive Carcinoma from deep resected margin:
                    </label>
                    <input
                      type="text"
                      value={distanceFromMargin}
                      onChange={(e) => setDistanceFromMargin(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>
              {dcisPresence === "Present" && (
                <div className="tumorExtent">
                  <label>Margin Status for DCIS:</label>
                  <select
                    value={dcisStatus}
                    onChange={(e) => setDcisStatus(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Not applicable (no DCIS in specimen)">
                      Not applicable (no DCIS in specimen)
                    </option>
                    <option value="All margins negative for DCIS">
                      All margins negative for DCIS
                    </option>
                    <option value="Margin Involved by DCIS">
                      Margin Involved by DCIS
                    </option>
                  </select>

                  {dcisStatus === "Margin Involved by DCIS" && (
                    <div className="tumorExtent">
                      <label>Specify Involved Margin for DCIS:</label>
                      <select
                        value={dcisInvolvedMargin}
                        onChange={(e) => setDcisInvolvedMargin(e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Deep Resected Margin">
                          Deep Resected Margin
                        </option>
                        <option value="Anterior Margin">Anterior Margin</option>
                        <option value="Posterior Margin">
                          Posterior Margin
                        </option>
                        <option value="Superior Margin">Superior Margin</option>
                        <option value="Inferior Margin">Inferior Margin</option>
                        <option value="Medial Margin">Medial Margin</option>
                        <option value="Lateral Margin">Lateral Margin</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
              <div className="tumorExtent">
                <h2>pTNM CLASSIFICATION</h2>
                <label>pT:</label>
                <select
                  value={pT}
                  onChange={(e) => setPT(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="pT not assigned">
                    pT not assigned (cannot be determined based on available
                    pathological information)
                  </option>
                  <option value="pT0: No evidence of primary tumor">
                    pT0: No evidence of primary tumor
                  </option>
                  <option value="pTis (DCIS): Ductal carcinoma in situ">
                    pTis (DCIS): Ductal carcinoma in situ
                  </option>
                  <option value="pTis (Paget): Paget disease of the nipple NOT associated with invasive carcinoma and/or carcinoma in situ (DCIS) in the underlying breast parenchyma.">
                    pTis (Paget): Paget disease of the nipple NOT associated
                    with invasive carcinoma and/or carcinoma in situ (DCIS) in
                    the underlying breast parenchyma.
                  </option>
                  <option value="pT1mi: Tumor less than or equal to 1 mm in greatest dimension">
                    pT1mi: Tumor less than or equal to 1 mm in greatest
                    dimension
                  </option>
                  <option value="pT1a: Tumor greater than 1 mm but less than or equal to 5 mm in greatest dimension">
                    pT1a: Tumor greater than 1 mm but less than or equal to 5 mm
                    in greatest dimension
                  </option>
                  <option value="pT1b: Tumor greater than 5 mm but less than or equal to 10 mm in greatest dimension">
                    pT1b: Tumor greater than 5 mm but less than or equal to 10
                    mm in greatest dimension
                  </option>
                  <option value="pT1c: Tumor greater than 10 mm but less than or equal to 20 mm in greatest dimension">
                    pT1c: Tumor greater than 10 mm but less than or equal to 20
                    mm in greatest dimension
                  </option>
                  <option value="pT1 (subcategory cannot be determined)">
                    pT1 (subcategory cannot be determined)
                  </option>
                  <option value="pT2: Tumor greater than 20 mm but less than or equal to 50 mm in greatest dimension">
                    pT2: Tumor greater than 20 mm but less than or equal to 50
                    mm in greatest dimension
                  </option>
                  <option value="pT3: Tumor greater than 50 mm in greatest dimension">
                    pT3: Tumor greater than 50 mm in greatest dimension
                  </option>
                  <option value="pT4a: Extension to the chest wall; invasion or adherence to pectoralis muscle in the absence of invasion of chest wall structures does not qualify as T4">
                    pT4a: Extension to the chest wall; invasion or adherence to
                    pectoralis muscle in the absence of invasion of chest wall
                    structures does not qualify as T4
                  </option>
                  <option value="pT4b: Ulceration and/or ipsilateral satellite nodules and/or edema (including peau d'orange) of the skin which do not meet the criteria for inflammatory carcinoma">
                    pT4b: Ulceration and/or ipsilateral satellite nodules and/or
                    edema (including peau d'orange) of the skin which do not
                    meet the criteria for inflammatory carcinoma
                  </option>
                  <option value="pT4c: Both T4a and T4b are present">
                    pT4c: Both T4a and T4b are present
                  </option>
                  <option value="pT4d: Inflammatory carcinoma">
                    pT4d: Inflammatory carcinoma
                  </option>
                  <option value="pT4 (subcategory cannot be determined)">
                    pT4 (subcategory cannot be determined)
                  </option>
                </select>

                <label>pN:</label>
                <select
                  value={pN}
                  onChange={(e) => setPN(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="pN not assigned">
                    pN not assigned (no nodes submitted or found)
                  </option>
                  <option value="pN not assigned (cannot be determined based on available pathological information)">
                    pN not assigned (cannot be determined based on available
                    pathological information)
                  </option>
                  <option value="pN0: No regional lymph node metastasis identified or ITCs only#">
                    pN0: No regional lymph node metastasis identified or ITCs
                    only#
                  </option>
                  <option value="pN0 (i+): ITCs only (malignant cell clusters no larger than 0.2 mm) in regional lymph node(s)">
                    pN0 (i+): ITCs only (malignant cell clusters no larger than
                    0.2 mm) in regional lymph node(s)
                  </option>
                  <option value="pN0 (mol+): Positive molecular findings by reverse transcriptase polymerase chain reaction (RT-PCR); no ITCs detected">
                    pN0 (mol+): Positive molecular findings by reverse
                    transcriptase polymerase chain reaction (RT-PCR); no ITCs
                    detected
                  </option>
                  <option value="pN1mi: Micrometastases (approximately 200 cells, larger than 0.2 mm, but none larger than 2.0 mm)">
                    pN1mi: Micrometastases (approximately 200 cells, larger than
                    0.2 mm, but none larger than 2.0 mm)
                  </option>
                  <option value="pN1a: Metastases in 1-3 axillary lymph nodes, at least one metastasis larger than 2.0 mm##">
                    pN1a: Metastases in 1-3 axillary lymph nodes, at least one
                    metastasis larger than 2.0 mm##
                  </option>
                  <option value="pN1b: Metastases in ipsilateral internal mammary sentinel nodes, excluding ITCs">
                    pN1b: Metastases in ipsilateral internal mammary sentinel
                    nodes, excluding ITCs
                  </option>
                  <option value="pN1c: pN1a and pN1b combined">
                    pN1c: pN1a and pN1b combined
                  </option>
                  <option value="pN2a: Metastases in 4-9 axillary lymph nodes (at least one tumor deposit larger than 2.0 mm)">
                    pN2a: Metastases in 4-9 axillary lymph nodes (at least one
                    tumor deposit larger than 2.0 mm)
                  </option>
                  <option value="pN2b: Metastases in clinically detected internal mammary lymph nodes with or without microscopic confirmation; with pathologically negative axillary nodes">
                    pN2b: Metastases in clinically detected internal mammary
                    lymph nodes with or without microscopic confirmation; with
                    pathologically negative axillary nodes
                  </option>
                  <option value="pN3a: Metastases in 10 or more axillary lymph nodes (at least one tumor deposit larger than 2.0 mm) or metastases to the infraclavicular (Level III axillary lymph) nodes">
                    pN3a: Metastases in 10 or more axillary lymph nodes (at
                    least one tumor deposit larger than 2.0 mm) or metastases to
                    the infraclavicular (Level III axillary lymph) nodes
                  </option>
                  <option value="pN3b: pN1a or pN2a in the presence of cN2b (positive internal mammary nodes by imaging); or pN2a in the presence of pN1b">
                    pN3b: pN1a or pN2a in the presence of cN2b (positive
                    internal mammary nodes by imaging); or pN2a in the presence
                    of pN1b
                  </option>
                  <option value="pN3c: Metastases in ipsilateral supraclavicular lymph nodes">
                    pN3c: Metastases in ipsilateral supraclavicular lymph nodes
                  </option>
                </select>

                <label>pM:</label>
                <select
                  value={pM}
                  onChange={(e) => setPM(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Not applicable">Not applicable</option>
                  <option value="pM1: Histologically proven metastases larger than 0.2 mm">
                    pM1: Histologically proven metastases larger than 0.2 mm
                  </option>
                </select>
              </div>
              <div className="tumorExtent">
                <h2>ADDITIONAL FINDINGS</h2>
                <label>Additional Findings:</label>
                <textarea
                  rows="10"
                  cols="5"
                  value={additionalFindings}
                  onChange={(e) => setAdditionalFindings(e.target.value)}
                  required
                />

                <h2>Result</h2>
                <label>Result:</label>
                <textarea
                  rows="10"
                  cols="5"
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <button className="next-button" onClick={handleNextPageClick}>
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

export default Dox;
