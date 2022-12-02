import axios from "axios";
//import { Buffer } from 'buffer';
//const BASE_URL = process.env.REACT_APP_BASE_URL;
//const PATH_URL = 'https://localhost:44375/';
//const BASE_URL = 'https://localhost:44375/OCR_Annotation.asmx';
const PATH_URL = 'http://10.3.228.224:8080/FPGProcessService/OCRAnnotation/';
const BASE_URL = 'http://10.3.228.224:8080/FPGProcessService/OCRAnnotation/OCR_Annotation.asmx';

const apiSettings = {
  //取得spec辨識規格列表
  getSpecList: async () => {
    const url = `${BASE_URL}/GetSpecList`;
    // const result =
    //   [{
    //     SpecID: "spid001",
    //     SpecName: "一號專案"
    //   },
    //   {
    //     SpecID: "spid002",
    //     SpecName: "二號專案"
    //   },
    //   {
    //     SpecID: "spid003",
    //     SpecName: "三號專案"
    //   },
    //   {
    //     SpecID: "spid004",
    //     SpecName: "四號專案"
    //   },
    //   {
    //     SpecID: "spid005",
    //     SpecName: "五號專案"
    //   },
    //   {
    //     SpecID: "spid006",
    //     SpecName: "六號專案"
    //   },
    //   {
    //     SpecID: "spid007",
    //     SpecName: "七號專案"
    //   },
    //   {
    //     SpecID: "spid008",
    //     SpecName: "eight"
    //   },
    //   ];
    // const result=  await axios.post(url);
    // return result;

    const response=  await axios.post(url, {
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
    console.log(`GetSpecList`+JSON.stringify(response))
    const result = response.data.d
    return result;
  },
  //取得rpa服務列表
  getRpaAPList: async () => {
    const url = `${BASE_URL}/GetRpaAPList`;
    // const result =
    //   [{
    //     RpaAPID: "rpaap001",
    //     RpaAPName: "銀行水單"
    //   },
    //   {
    //     RpaAPID: "rpaap002",
    //     RpaAPName: "現金券申請單"
    //   },
    //   ];
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
    // const result = {
    //   SpecID: "Test001",
    //   SpecName: "測試1",
    //   SpecDesc: "這是測試用",
    //   OCRModel: "OCR01EN",
    //   RpaAPID: "AP001",
    //   PageSet: [
    //     {
    //       FileContent: "https://picsum.photos/200/300?random=1",
    //       PageNum: 1,
    //       SpecTitleSet: [],
    //       SpecAreaSet: [],
    //     },
    //     {
    //       FileContent: "https://picsum.photos/200/300?random=2",
    //       PageNum: 2,
    //       SpecTitleSet: [
    //         {
    //           TempID: "specTitleInitId01",
    //           TitleID: "specTitleId01",
    //           AreaName: "specTitleAreaName01",
    //           AreaDesc: "specTitleAreaDesc01",
    //           Title: "specTitle01",
    //           TitleContent: "specTitleContent01",
    //           PageNum: 1,
    //           x: 0,
    //           y: 0,
    //           width: 40,
    //           height: 40,
    //           type: "title",
    //           UX: 0,
    //           UY: 0,
    //           LX: 40,
    //           LY: 40,
    //           WordCount: 0,
    //           IsOneLine: true,
    //           IsEng: false,
    //         }
    //       ],
    //       SpecAreaSet: [
    //         {
    //           TempID: "specAreaInitId01",
    //           AreaID: "specAreaId01",
    //           AreaName: "specAreaName01",
    //           AreaDesc: "specAreaDesc01",
    //           Title: "specAreaTitle01",
    //           TitleContent: "specAreaTitleContent01",
    //           PageNum: 1,
    //           x: 50,
    //           y: 50,
    //           width: 100,
    //           height: 100,
    //           type: "area",
    //           UX: 50,
    //           UY: 50,
    //           LX: 100,
    //           LY: 100,
    //           WordCount: 0,
    //           IsOneLine: true,
    //           IsEng: true,
    //         }
    //       ],
    //     }
    //   ]
    // };
    const response=  await axios.post(url,bodyData)
    // .then(res =>{
    //   if (res.includes('OCR_ANNOTATION_ERR')){
    //     alert(`GetSpecSet:::${res}`);
    //     return null;
    //   }
    // })

    console.log(`GetSpecSet:::`+response)
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
    const result=  response.data.map(i=>i.ImageStr).join(',');
    console.log(result);
    return result;
  },
  //儲存所有已編輯的標註內容
  saveAnnotations: async (annotations) => {
    const url = `${BASE_URL}/SaveAnnotations`;
    const bodyData = { szSpec: JSON.stringify(annotations) };
    console.log(`SaveAnnotations:::`+bodyData);
    const response= await axios.post(url,bodyData)
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
  getProc: async (p_szSCrateDTime, p_szECrateDTime) => {
    const url = `${BASE_URL}/FindCase`;
    const bodyData = {
      'p_szSCreateDTime': p_szSCrateDTime,
      'p_szECreateDTime': p_szECrateDTime
    };
    //const result=  await axios.post(url,bodyData);
    //return result.data;
    let data1 = [
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,},
      { "ProcID": 2, "SpecID": "Case01", "TitleID": "title001","TxDTime": "20210924093816035" , "ResultData": "台塑購物網_福委會商品券訂購單", "DocID": "Docid000001","ProcStatus":20,}
  ];
  return data1;
    
  },
  getPageList: async (caseNo) => {
    const url = `${BASE_URL}/GetAllPage`;
    const bodyData = {
      'p_szCaseNo': caseNo,
    };
    let data = [
      {
          "Page": 0,
          "FilePathSets": [
              "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
              "http://upload.wikimedia.org/wikipedia/commons/3/32/EVD_Document1.jpg",
              "https://web-tuts.com/abc_content/uploads/2021/01/jQuery-Get-Image-Src-and-Set-Image-Src.fw-min-750x445.png",
              "https://c0.wallpaperflare.com/preview/104/979/585/india-sikkim-lake-mountent-thumbnail.jpg",
              "https://w0.peakpx.com/wallpaper/370/878/HD-wallpaper-hogwarts-express-potter-harry-viaduct-glenfinnan.jpg",
          ],
          "Sets": [
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 28, "Y": 50, "Width": 232, "Height": 54 }, "Page": 0, "BoxIndex": 1, "OcrSSIM": 1.0, "SrcText": "MeDiPro", "RefText": "MeDiPro", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 570, "Y": 52, "Width": 132, "Height": 30 }, "Page": 0, "BoxIndex": 2, "OcrSSIM": 0.375, "SrcText": "保存侏什2-8C", "RefText": "(保存條件2-", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 481, "Y": 59, "Width": 76, "Height": 42 }, "Page": 0, "BoxIndex": 3, "OcrSSIM": 0.0, "SrcText": "WD", "RefText": "IL", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 280, "Y": 66, "Width": 194, "Height": 36 }, "Page": 0, "BoxIndex": 4, "OcrSSIM": 1.0, "SrcText": "AC-00013-05", "RefText": "AC-00013-05", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 576, "Y": 76, "Width": 76, "Height": 36 }, "Page": 0, "BoxIndex": 5, "OcrSSIM": 0.4, "SrcText": "10 ml", "RefText": " 10 n", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 130, "Y": 98, "Width": 40, "Height": 12 }, "Page": 0, "BoxIndex": 6, "OcrSSIM": "-Infinity", "SrcText": "", "RefText": "Diagno", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 9, "Y": 116, "Width": 392, "Height": 66 }, "Page": 0, "BoxIndex": 7, "OcrSSIM": 0.95652173913043481, "SrcText": "Antibody screening cell", "RefText": "Anfibody screening cell", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 0, "Y": 162, "Width": 142, "Height": 115 }, "Page": 0, "BoxIndex": 8, "OcrSSIM": -1.0, "SrcText": "I", "RefText": "III", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 127, "Y": 187, "Width": 236, "Height": 42 }, "Page": 0, "BoxIndex": 9, "OcrSSIM": 0.84615384615384615, "SrcText": "血球濃度 : 3i0.5%", "RefText": "血球濃度 : 3+0. 5%", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 379, "Y": 205, "Width": 72, "Height": 40 }, "Page": 0, "BoxIndex": 10, "OcrSSIM": 0.25, "SrcText": "Lot:", "RefText": "L", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 379, "Y": 255, "Width": 63, "Height": 45 }, "Page": 0, "BoxIndex": 11, "OcrSSIM": 0.0, "SrcText": "Exp", "RefText": "臼", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 315, "Y": 318, "Width": 439, "Height": 53 }, "Page": 0, "BoxIndex": 12, "OcrSSIM": -1.5833333333333335, "SrcText": "日里土醫科枝服份有呎公司", "RefText": "oawosk Ho MebicAt fedhNotosyfo昂", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 318, "Y": 356, "Width": 436, "Height": 32 }, "Page": 0, "BoxIndex": 13, "OcrSSIM": 0.0, "SrcText": "FORMU5A BloMtDICAL TEGHHotn6y CORI", "RefText": "", "Pass": false }
          ],
          "PassSets": [
              {
                  "Page": 0,
                  "BoxIndex": 2,
                  "Pass": true,
              },
              {
                  "Page": 0,
                  "BoxIndex": 5,
                  "Pass": true,
              },
          ]
      }, {
          "Page": 1,
          "FilePathSets": [
              "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
              "http://upload.wikimedia.org/wikipedia/commons/3/32/EVD_Document1.jpg",
              "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
              "http://upload.wikimedia.org/wikipedia/commons/3/32/EVD_Document1.jpg",
              "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
          ],
          "Sets": [
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 28, "Y": 50, "Width": 232, "Height": 54 }, "Page": 0, "BoxIndex": 1, "OcrSSIM": 1.0, "SrcText": "MeDiPro", "RefText": "MeDiPro", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 570, "Y": 52, "Width": 132, "Height": 30 }, "Page": 0, "BoxIndex": 2, "OcrSSIM": 0.375, "SrcText": "保存侏什2-8C", "RefText": "(保存條件2-", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 481, "Y": 59, "Width": 76, "Height": 42 }, "Page": 0, "BoxIndex": 3, "OcrSSIM": 0.0, "SrcText": "WD", "RefText": "IL", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 280, "Y": 66, "Width": 194, "Height": 36 }, "Page": 0, "BoxIndex": 4, "OcrSSIM": 1.0, "SrcText": "AC-00013-05", "RefText": "AC-00013-05", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 576, "Y": 76, "Width": 76, "Height": 36 }, "Page": 0, "BoxIndex": 5, "OcrSSIM": 0.4, "SrcText": "10 ml", "RefText": " 10 n", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 130, "Y": 98, "Width": 40, "Height": 12 }, "Page": 0, "BoxIndex": 6, "OcrSSIM": "-Infinity", "SrcText": "", "RefText": "Diagno", "Pass": false },
              { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 9, "Y": 116, "Width": 392, "Height": 66 }, "Page": 0, "BoxIndex": 7, "OcrSSIM": 0.95652173913043481, "SrcText": "Antibody screening cell", "RefText": "Anfibody screening cell", "Pass": false },
          ],
          "PassSets": [
              {
                  "Page": 0,
                  "BoxIndex": 2,
                  "Pass": true,
              },
              {
                  "Page": 0,
                  "BoxIndex": 5,
                  "Pass": true,
              },
              {
                  "Page": 0,
                  "BoxIndex": 6,
                  "Pass": true,
              },
              {
                  "Page": 0,
                  "BoxIndex": 7,
                  "Pass": true,
              },
          ]
      }
  ];
    //const result=  await axios.post(url,bodyData);
    //return result.data;
    return data;
  },
  modifiedBoxPass: async (caseNo, createDTime, page, boxIndex) => {
    const url = `${BASE_URL}/ModifiedBoxPass`;
    const bodyData = {
      'p_szCaseNo': caseNo,
      'p_szCreateDTime': createDTime,
      'p_iPage': page,
      'p_iBox': boxIndex,
    };
    const result=  await axios.post(url,bodyData);
    return result.data;
  },
};

export default apiSettings;
