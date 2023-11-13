import "./dox.css";

import * as XLSX from "xlsx";

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

  const [load, setLoad] = useState(true);

  const [load2, setLoad2] = useState(false);

  const [load3, setLoad3] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);

  const [totalPages, setTotalPages] = useState(() => {
    return 0;
  });

  const [arrayOfPages, setArrPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    getTheExcelData();
  }, []);

  const getTheExcelData = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/getimported?page=${pageNumber}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setTotalPages(data.totalPages);

      let updatedArr = [];

      const today = new Date();

      for (let each of data.importedData) {
        if (
          (each.microscopy === "" && each.gros === "") ||
          each.microscopy === "" ||
          each.gros === ""
        ) {
          var inputDate = new Date(each.createdAt);

          // Add 5 days to the input date
          inputDate.setDate(inputDate.getDate() + 5);

          if (inputDate < today) {
            updatedArr.push({ ...each, highlight: true });
          } else {
            {
              updatedArr.push({ ...each, highlight: false });
            }
          }
        } else {
          updatedArr.push({ ...each, highlight: false });
        }
      }

      setTheData(updatedArr);
      setLoad(true);
    }
  };

  const fileInputRef = useRef("");

  const handleFileChange = async (event) => {
    setLoad3(true);
    let xlsxFile = event.target.files[0];

    if (xlsxFile) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming you want to convert the first sheet in the workbook to CSV
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const csvData = XLSX.utils.sheet_to_csv(firstSheet);

        // Create a Blob from the CSV data
        const csvBlob = new Blob([csvData], { type: "text/csv" });

        let fd = new FormData();
        fd.append("file", csvBlob, "file.csv"); // 'file.csv' is the filename you want on the server

        const url = `${process.env.REACT_APP_ROOT_URL}/importUser`;

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

      reader.readAsArrayBuffer(xlsxFile);
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

  const changeToPrevPage = () => {
    setTheData([]);

    if (arrayOfPages[9] === totalPages) {
      let roundOfNumber = totalPages.toString();
      let secondRoundOffNumber = parseInt(
        roundOfNumber.slice(0, roundOfNumber.length - 1) + "0"
      );

      let PrevArr = [];
      for (let i = secondRoundOffNumber - 9; i <= secondRoundOffNumber; i++) {
        PrevArr.push(i);
      }
      console.log(PrevArr);
      setArrPages(PrevArr);
      setPageNumber(PrevArr[0]);
    } else {
      if (arrayOfPages[9] <= 10) {
        let PrevArr = [];
        for (let i = 1; i <= 10; i++) {
          PrevArr.push(i);
        }
        console.log(PrevArr);
        setArrPages(PrevArr);
        setPageNumber(PrevArr[0]);
      } else {
        let PrevArr = [];

        for (let i = arrayOfPages[0] - 10; i <= arrayOfPages[0] - 1; i++) {
          PrevArr.push(i);
        }
        console.log(PrevArr);
        setArrPages(PrevArr);
        setPageNumber(PrevArr[0]);
      }
    }
    getTheExcelData();
  };

  const changeToNextPage = () => {
    setTheData([]);

    if (arrayOfPages[9] + 10 > totalPages) {
      let nextArr = [];

      for (let i = totalPages - 9; i <= totalPages; i++) {
        nextArr.push(i);
      }
      setArrPages(nextArr);
      console.log(nextArr);
      setPageNumber(nextArr[0]);
    } else {
      let nextArr = [];

      for (let i = arrayOfPages[9] + 1; i <= arrayOfPages[9] + 10; i++) {
        nextArr.push(i);
      }

      setArrPages(nextArr);
      console.log(nextArr);
      setPageNumber(nextArr[0]);
    }
    getTheExcelData();
  };

  const openPdf = (e) => {
    const fileName = e.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = e;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
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
        {getTheData.length > 0 ? (
          <table>
            <tr>
              <th className="heads-table">Regd Date</th>
              <th className="heads-table">Sample Id</th>
              <th className="heads-table">Patient Name</th>
              <th className="heads-table">Test Name</th>
              <th className="heads-table">Accession No</th>
              <th className="heads-table">Doctor</th>
              <th style={{ textAlign: "center" }} className="heads-table">
                Gross Date
              </th>
              <th style={{ textAlign: "center" }} className="heads-table">
                Microscopy Data
              </th>
            </tr>
            {getTheData.map((each) =>
              each.highlight ? (
                <tr
                  style={{ backgroundColor: "#05C3DD50" }}
                  className="row"
                  id={each._id}
                >
                  <td className="description-table">{each.regd_date}</td>
                  <td className="description-table">{each.sample_id}</td>
                  <td className="description-table">{each.patient_name}</td>
                  <td className="description-table">{each.test_name}</td>
                  <td className="description-table">{each.accession_no}</td>
                  <td className="description-table">{each.doctor}</td>
                  <td className="description-table">
                    {each.gros === "" ? (
                      <Link
                        style={{ textDecoration: "none", paddingLeft: "45%" }}
                        to={`/gorss/${each.sample_id}`}
                      >
                        <BsCloudUploadFill color="red" />
                      </Link>
                    ) : (
                      <p
                        download={"Gross Report"}
                        style={{ paddingLeft: "45%" }}
                        onClick={() => {
                          openPdf(each.gros);
                        }}
                      >
                        <BsCloudDownloadFill color="green" />
                      </p>
                    )}
                  </td>
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
                      <p
                        onClick={() => {
                          openPdf(each.microscopy);
                        }}
                        style={{ paddingLeft: "45%" }}
                        download={"Microscopy Report"}
                      >
                        <BsCloudDownloadFill color="green" />
                      </p>
                    )}
                  </td>
                </tr>
              ) : (
                <tr className="row" id={each._id}>
                  <td className="description-table">{each.regd_date}</td>
                  <td className="description-table">{each.sample_id}</td>
                  <td className="description-table">{each.patient_name}</td>
                  <td className="description-table">{each.test_name}</td>
                  <td className="description-table">{each.accession_no}</td>
                  <td className="description-table">{each.doctor}</td>
                  <td className="description-table">
                    {each.gros === "" ? (
                      <Link
                        style={{ textDecoration: "none", paddingLeft: "45%" }}
                        to={`/gorss/${each.sample_id}`}
                      >
                        <BsCloudUploadFill color="red" />
                      </Link>
                    ) : (
                      <p
                        download={"Gross Report"}
                        style={{ paddingLeft: "45%" }}
                        onClick={() => {
                          openPdf(each.gros);
                        }}
                      >
                        <BsCloudDownloadFill color="green" />
                      </p>
                    )}
                  </td>
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
                      <p
                        onClick={() => {
                          openPdf(each.microscopy);
                        }}
                        style={{ paddingLeft: "45%" }}
                        download={"Microscopy Report"}
                      >
                        <BsCloudDownloadFill color="green" />
                      </p>
                    )}
                  </td>
                </tr>
              )
            )}
          </table>
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
      <div className="pagenataion">
        {arrayOfPages[9] === 10 || getTheData.length === 0 ? (
          <button type="button" className="greybutton">
            Prev
          </button>
        ) : (
          <button
            onClick={changeToPrevPage}
            className="pageNotSelected"
            type="button"
          >
            Prev
          </button>
        )}
        {arrayOfPages.map((each) => (
          <button
            onClick={() => {
              setPageNumber(each);
              setTheData([]);
              getTheExcelData();
            }}
            type="button"
            className={each === pageNumber ? "pageSelected" : "pageNotSelected"}
          >
            {each}
          </button>
        ))}
        {arrayOfPages[0] === totalPages - 9 || getTheData.length === 0 ? (
          <button type="button" className="greybutton">
            Next
          </button>
        ) : (
          <button
            onClick={changeToNextPage}
            className="pageNotSelected"
            type="button"
          >
            Next
          </button>
        )}
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
