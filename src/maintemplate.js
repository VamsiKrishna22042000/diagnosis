import "./dox.css";

import { useRef, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { LuImagePlus } from "react-icons/lu";

import { BsCloudDownloadFill, BsCloudUploadFill } from "react-icons/bs";

import { Dna } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainTemplate = () => {
  const [getTheData, setTheData] = useState(() => {
    return [];
  });

  const [load, setLoad] = useState(false);

  const [load2, setLoad2] = useState(false);

  const [load3, setLoad3] = useState(false);

  useEffect(() => {
    getTheExcelData();
  }, []);

  const getTheExcelData = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/getimported`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      /**console.log(data.importedData);*/
      setTheData(data.importedData);
      setLoad(true);
    }
  };

  const fileInputRef = useRef("");

  const handleFileChange = async (event) => {
    setLoad3(true);
    let img = event.target.files[0];

    let fd = new FormData();
    fd.append("file", img);

    const url = `${process.env.REACT_APP_ROOT_URL}/importUser`;

    console.log(Object.fromEntries(fd.entries()));

    const reqConfigure = {
      method: "POST",
      body: fd,
    };

    const response = await fetch(url, reqConfigure);

    if (response.ok) {
      getTheExcelData();
      toast.success("Added New File", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoad3(false);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const [newWord, setNewWord] = useState("");

  const addNewWord = async () => {
    setLoad2(true);
    const url = `${process.env.REACT_APP_ROOT_URL}/addwords`;

    const reqConfigure = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newWord }),
    };

    const response = await fetch(url, reqConfigure);

    if (response.ok) {
      toast.success("Added New Word", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoad2(false);
      setNewWord("");
    }
  };

  return load ? (
    <div className="home-page">
      <div className="uploadfiles">
        <div className="microscopic">
          {!load3 ? (
            <>
              <LuImagePlus
                className="upload-file"
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
              <p style={{ color: "#141e61" }}>Upload ExcelFile</p>
            </>
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
        <div class="microscopic-data">
          {!load2 ? (
            <>
              <h4>Hover to Add New Word</h4>
              <div class="input-container">
                <input
                  value={newWord}
                  type="text"
                  id="newWordInput"
                  placeholder="Enter a new word"
                  onChange={(e) => {
                    setNewWord(e.target.value);
                  }}
                />
                <button
                  style={{ cursor: "pointer" }}
                  onClick={addNewWord}
                  id="addButton"
                >
                  Add
                </button>
              </div>
            </>
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
      </div>
      <div className="table-data">
        <ToastContainer />
        <table>
          <tr>
            <th className="heads-table">Regd Date</th>
            <th className="heads-table">Sample Id</th>
            <th className="heads-table">Patient Name</th>
            <th className="heads-table">Test Name</th>
            <th className="heads-table">Accession No</th>
            <th className="heads-table">Doctor</th>
            <th style={{ textAlign: "center" }} className="heads-table">
              Microscopy Data
            </th>
            <th style={{ textAlign: "center" }} className="heads-table">
              Gross Date
            </th>
          </tr>
          {getTheData.map((each) => (
            <tr className="row" id={each._id}>
              <td className="description-table">{each.regd_date}</td>
              <td className="description-table">{each.sample_id}</td>
              <td className="description-table">{each.patient_name}</td>
              <td className="description-table">{each.test_name}</td>
              <td className="description-table">{each.accession_no}</td>
              <td className="description-table">{each.doctor}</td>
              <td className="description-table">
                {each.microscopy === "" ? (
                  <Link
                    style={{
                      textDecoration: "none",
                      paddingLeft: "45%",
                    }}
                    to={`/microscopy/${each.sample_id}`}
                  >
                    <BsCloudUploadFill color="red" />
                  </Link>
                ) : (
                  <a style={{ paddingLeft: "45%" }} href={each.microscopy}>
                    <BsCloudDownloadFill color="green" />
                  </a>
                )}
              </td>
              <td className="description-table">
                {each.gros === "" ? (
                  <Link
                    style={{ textDecoration: "none", paddingLeft: "45%" }}
                    to={`/gorss/${each.sample_id}`}
                  >
                    <BsCloudUploadFill color="red" />
                  </Link>
                ) : (
                  <a style={{ paddingLeft: "45%" }} href={each.gros}>
                    <BsCloudDownloadFill color="green" />
                  </a>
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
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
export default MainTemplate;
