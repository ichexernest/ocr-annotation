import axios from "axios";
//import { Buffer } from 'buffer';
//const BASE_URL = process.env.REACT_APP_BASE_URL;
const PATH_URL = 'https://localhost:44375/';
const BASE_URL = 'https://localhost:44375/OCR_Annotation.asmx';
//const PATH_URL = 'http://10.3.228.224:8080/FPGProcessService/OCRAnnotation/';
//const BASE_URL = 'http://10.3.228.224:8080/FPGProcessService/OCRAnnotation/OCR_Annotation.asmx';

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
  //取得預處理選項列表
  getPreProcOptions: async () => {
    const url = `${BASE_URL}/GetPreProcOptions`;
    // const result =
    //   [{
    //     ParmName: "ImgProcType.UnderLine",
    //     ParmValue: "底線"
    //   },
    //   {
    //     ParmName: "ImgProcType.Normal",
    //     ParmValue: "正常"
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
    const response=  await axios.post(url,bodyData);
    console.log(`FindProcList` + JSON.stringify(response))
    const result = response.data.d
    return result;
    // let data1 = [
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 10},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 51},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    //   { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher",InsertDTime:"20221020-164536",ProcSource:"eMail",ProcSourceDetail:"shochiou@yahoo.com.tw",ProcSourceDetail2:"shochiou",ResultSpecID:"S221007002", ProcStatus: 20},
    // ];
    // return JSON.stringify(data1);

  },
  //取得辨識結果
  getResultPageSet: async (ProcID,dateRange) => {

    const url = `${BASE_URL}/GetResultPageSet`;
    const searchTerm = dateRange.split('-');
    const bodyData = {
      'p_szProcID': ProcID,
      'p_szYear': searchTerm[0],
      'p_szMonth': searchTerm[1],
    };
    const response=  await axios.post(url,bodyData);
    const data = {
      ProcID: 'PPPProcID001',
      PageSet: [
        {
          PageNum: 1,
          ImageData: 'https://learn.microsoft.com/zh-tw/visualstudio/get-started/visual-basic/media/vs-2019/vb-create-new-project-search-winforms-filtered.png?view=vs-2022',
          ResultSet: [{
            AreaID: 'G01Item',
            RawData: 'https://learn.microsoft.com/zh-tw/visualstudio/ide/media/vs-2022/create-new-project-filters.png?view=vs-2022',
            ResultData: '1          家樂福           525          500         78                           89, 000',
            ProcStatus: 10,
            DocID: '93097399-FF56-4C5E-849A-0851575B37E3',
            UX: 0, UY: 0, LX: 50, LY: 50, Width: 50, Height: 50,
            IsEng: false,
            NewResult: '',
          },
          {
            AreaID: 'G02Item',
            RawData: 'https://learn.microsoft.com/zh-tw/visualstudio/ide/media/vs-2022/create-new-project-filters.png?view=vs-2022',
            ResultData: '1          家樂福           525          500         78                           89, 000',
            ProcStatus: 10,
            DocID: '93097399-FF56-4C5E-849A-0851575B37E3',
            UX: 0, UY: 0, LX: 50, LY: 50, Width: 50, Height: 50,
            IsEng: true,
            NewResult: '',
          },
          {
            AreaID: 'G03Item',
            RawData: 'https://learn.microsoft.com/zh-tw/visualstudio/ide/media/vs-2022/create-new-project-filters.png?view=vs-2022',
            ResultData: '1          家樂福           525          500         78                           89, 000',
            ProcStatus: 51,
            DocID: '93097399-FF56-4C5E-849A-0851575B37E3',
            UX: 0, UY: 0, LX: 50, LY: 50, Width: 50, Height: 50,
            IsEng: true,
            NewResult: '',
          },
          {
            AreaID: 'G04Item',
            RawData: 'https://learn.microsoft.com/zh-tw/visualstudio/ide/media/vs-2022/create-new-project-filters.png?view=vs-2022',
            ResultData: '1          家樂福           525          500         78                           89, 000',
            ProcStatus: 10,
            DocID: '93097399-FF56-4C5E-849A-0851575B37E3',
            UX: 0, UY: 0, LX: 50, LY: 50, Width: 50, Height: 50,
            IsEng: false,
            NewResult: 'ewqe',
          },

          ],
        },
      ]
    };

    const result = response.data.d
    return result;
  },
  //儲存辨識結果修改項
  saveResults: async (ProcID,dateRange,record) => {
    console.log(`SAVE RESULTS:::::::`+JSON.stringify(record));
    const url = `${BASE_URL}/SaveNewResults`;
    const searchTerm = dateRange.split('-');
    const bodyData = {       
    'p_szProcID': ProcID,
    'p_szYear': searchTerm[0],
    'p_szMonth': searchTerm[1],
    'p_szResults': JSON.stringify(record.ResultRecord) };
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
