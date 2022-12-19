import axios from "axios";
//import { Buffer } from 'buffer';
const PATH_URL = process.env.REACT_APP_PATH_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const apiSettings = {
  //取得spec辨識規格列表
  getSpecList: async () => {
    const url = `${BASE_URL}/GetSpecList`;
    const response = await axios.post(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // .then(res =>{
    //   if (res.includes('OCR_ANNOTATION_ERR')){
    //     alert(`GetSpecList:::${res}`);
    //     return null;
    //   }
    // })
    console.log(`GetSpecList` + JSON.stringify(response))
    const result = response.data.d
    return result;
  },
  //取得rpa服務列表
  getRpaAPList: async () => {
    const url = `${BASE_URL}/GetRpaAPList`;
    const response = await axios.post(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // .then(res =>{
    //   console.log(res.data.d)
    //   if (res.data.d.includes('OCR_ANNOTATION_ERR')){
    //     alert(`GetRpaAPList:::${res}`);
    //     return null;
    //   }
    // })

    console.log(response)
    const result = response.data.d
    return result;
  },
  //取得預處理選項列表
  getPreProcOptions: async () => {
    const url = `${BASE_URL}/GetPreProcOptions`;
    const response = await axios.post(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // .then(res =>{
    //   console.log(res.data.d)
    //   if (res.data.d.includes('OCR_ANNOTATION_ERR')){
    //     alert(`GetRpaAPList:::${res}`);
    //     return null;
    //   }
    // })

    console.log(response)
    const result = response.data.d
    return result;
  },
  //取得spec辨識規格內容
  getSpecSet: async (SpecID) => {
    const url = `${BASE_URL}/GetSpecSet`;
    const bodyData = {
      'p_szSpecID': SpecID,
    };
    const response = await axios.post(url, bodyData)
    // .then(res =>{
    //   if (res.includes('OCR_ANNOTATION_ERR')){
    //     alert(`GetSpecSet:::${res}`);
    //     return null;
    //   }
    // })

    console.log(`GetSpecSet:::` + response)
    const result = response.data.d;
    return result;
  },
  //新建spec辨識規格
  createSpec: async (submitData, base64Data) => {
    let formData = new FormData();
    formData.append("OCRModel", submitData['OCRModel']);
    formData.append("RpaAPID", submitData['RpaAPID']);
    formData.append("SpecName", submitData['SpecName']);
    formData.append("SpecDesc", submitData['SpecDesc']);
    formData.append("FileContent", base64Data);
    const url = `${PATH_URL}/CreateSpec.ashx`;
    const response = await axios.post(url, formData)
    // .then(res =>{
    //   if (res.includes('OCR_ANNOTATION_ERR')){
    //     alert(`CreateSpec:::${res}`);
    //     return null;
    //   }
    // })
    console.log(response.data);
    const result = response.data
    return result;
  },
  //pdf轉jpeg
  turnPdf2Jpeg: async (formData) => {
    // let formData = new FormData();
    // formData.append("Cfile", submitData['FormFile']);
    const url = `http://10.3.228.224:8888/api/v1/img/pdf2jpg2`;
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const result = response.data.map(i => i.ImageStr).join(',');
    console.log(result);
    return result;
  },
  //底圖切片
  splitImage: async (formData) => {
    // let formData = new FormData();
    // formData.append("Cfile", submitData['FormFile']);
    const url = `http://10.3.228.224:8888/api/v1/img/split`;
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const result = response.data.map(i => i.ImageStr).join(',');
    console.log(result);
    return result;
  },
  //儲存所有已編輯的標註內容
  saveAnnotations: async (annotations) => {
    const url = `${BASE_URL}/SaveAnnotations`;
    const bodyData = { szSpec: JSON.stringify(annotations) };
    console.log(`SaveAnnotations:::` + bodyData);
    const response = await axios.post(url, bodyData)
    // .then(res =>{
    //   if (res.includes('OCR_ANNOTATION_ERR')){
    //     alert(`SaveAnnotations:::${res}`);
    //     return null;
    //   }
    // })

    return response;
  },
  //更新spec辨識規格資訊
  updateSpec: async (editedItem) => {

    let formData = new FormData();
    formData.append("SpecName", editedItem['SpecName']);
    formData.append("SpecDesc", editedItem['SpecDesc']);
    formData.append("SpecID", editedItem['SpecID']);
    const url = `${PATH_URL}/UpdateSpec.ashx`;
    const response = await axios.post(url, formData)
    // .then(res =>{
    //   if (res.includes('OCR_ANNOTATION_ERR')){
    //     alert(`UpdateSpec:::${res}`);
    //     return null;
    //   }
    // })

    const result = response.data
    return result;
  },
  //取得辨識單號列表
  getProcList: async (p_szSearchTerm) => {
    const url = `${BASE_URL}/FindProcList`;
    const searchTerm = p_szSearchTerm.split('-');
    const bodyData = {
      'p_szYear': searchTerm[0],
      'p_szMonth': searchTerm[1],
    };
    const response = await axios.post(url, bodyData);
    console.log(`FindProcList` + JSON.stringify(response))
    const result = response.data.d
    return result;
  },
  //取得辨識單號列表 by date range
  getProcListR: async (p_szSearchTermS, p_szSearchTermE) => {
    const url = `${BASE_URL}/FindProcListR`;
    const bodyData = {
      'p_szSCreateDTime': p_szSearchTermS,
      'p_szECreateDTime': p_szSearchTermE
    };
    const response = await axios.post(url, bodyData);
    console.log(`FindProcList` + JSON.stringify(response))
    const result = response.data.d
    return result;

  },
  //取得辨識結果
  getResultPageSet: async (ProcID, dateRange) => {

    const url = `${BASE_URL}/GetResultPageSet`;
    const searchTerm = dateRange.split('-');
    const bodyData = {
      'p_szProcID': ProcID,
      'p_szYear': searchTerm[0],
      'p_szMonth': searchTerm[1],
    };
    const response = await axios.post(url, bodyData);
    const result = response.data.d
    return result;
  },
  //儲存辨識結果修改項
  saveResults: async (ProcID, dateRange, record) => {
    console.log(`SAVE RESULTS:::::::` + JSON.stringify(record));
    const url = `${BASE_URL}/SaveNewResults`;
    const searchTerm = dateRange.split('-');
    const bodyData = {
      'p_szProcID': ProcID,
      'p_szYear': searchTerm[0],
      'p_szMonth': searchTerm[1],
      'p_szResults': JSON.stringify(record.ResultRecord)
    };
    console.log(`SaveResults:::` + bodyData);
    const response = await axios.post(url, bodyData)
    // .then(res =>{
    //   if (res.includes('OCR_ANNOTATION_ERR')){
    //     alert(`SaveAnnotations:::${res}`);
    //     return null;
    //   }
    // })

    return response;
  },
};

export default apiSettings;
