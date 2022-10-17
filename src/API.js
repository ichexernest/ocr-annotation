import axios from "axios";
import { Buffer } from 'buffer';
const BASE_URL = process.env.REACT_APP_BASE_URL;


const apiSettings = {
  //取得spec辨識規格列表
  getSpecList: async () => {
    const url = `${BASE_URL}/GetSpecList`;
    const result =
      [{
        SpecID: "spid001",
        SpecName: "一號專案"
      },
      {
        SpecID: "spid002",
        SpecName: "二號專案"
      },
      {
        SpecID: "spid003",
        SpecName: "三號專案"
      },
      {
        SpecID: "spid004",
        SpecName: "四號專案"
      },
      {
        SpecID: "spid005",
        SpecName: "五號專案"
      },
      {
        SpecID: "spid006",
        SpecName: "六號專案"
      },
      {
        SpecID: "spid007",
        SpecName: "七號專案"
      },
      {
        SpecID: "spid008",
        SpecName: "eight"
      },
      ];
    //const result=  await axios.post(url);
    return result;
  },
  //取得rpa服務列表
  getRpaAPList: async () => {
    const url = `${BASE_URL}/GetRpaAPList`;
    const result =
      [{
        RpaAPID: "rpaap001",
        RpaAPName: "銀行水單"
      },
      {
        RpaAPID: "rpaap002",
        RpaAPName: "現金券申請單"
      },
      ];
    //const result=  await axios.post(url);
    return result;
  },
  //取得spec辨識規格內容
  getSpecSet: async (SpecID) => {
    const url = `${BASE_URL}/GetSpecSet`;
    const bodyData = {
      'p_szSpecID': SpecID,
    };
    const result = {
      SpecID: "Test001",
      SpecName: "測試1",
      SpecDesc: "這是測試用",
      OCRModel: "OCR01EN",
      RpaAPID: "AP001",
      PageSet: [
        {
          FilePath: "https://picsum.photos/200/300?random=1",
          PageNum: 1,
          SpecTitleSet: [],
          SpecAreaSet: [],
        },
        {
          FilePath: "https://picsum.photos/200/300?random=2",
          PageNum: 2,
          SpecTitleSet: [
            {
              tempID: "specTitleInitId01",
              TitleID: "specTitleId01",
              AreaName: "specTitleAreaName01",
              AreaDesc: "specTitleAreaDesc01",
              Title: "specTitle01",
              TitleContent: "specTitleContent01",
              PageNum: 1,
              x: 0,
              y: 0,
              width: 40,
              height: 40,
              type: "title",
              UX: 0,
              UY: 0,
              LX: 40,
              LY: 40,
              WordCount: 0,
              IsOneLine: true,
              IsEng: false,
            }
          ],
          SpecAreaSet: [
            {
              tempID: "specAreaInitId01",
              AreaID: "specAreaId01",
              AreaName: "specAreaName01",
              AreaDesc: "specAreaDesc01",
              Title: "specAreaTitle01",
              TitleContent: "specAreaTitleContent01",
              PageNum: 1,
              x: 50,
              y: 50,
              width: 100,
              height: 100,
              type: "area",
              UX: 50,
              UY: 50,
              LX: 100,
              LY: 100,
              WordCount: 0,
              IsOneLine: true,
              IsEng: true,
            }
          ],
        }
      ]
    };
    //const result=  await axios.post(url,bodyData);
    return result;
  },
  //新建spec辨識規格
  createSpec: async (submitData, base64Data) => {
    let formData = new FormData();
    formData.append("OCRModel", submitData['OCRModel']);
    formData.append("RpaAPID", submitData['RpaAPID']);
    formData.append("SpecName", submitData['SpecName']);
    formData.append("SpecDesc", submitData['SpecDesc']);
    formData.append("FilePath", base64Data);
    const url = `${BASE_URL}/CreateSpec`;
    alert(`FORM DATA: `+JSON.stringify(formData));
    alert(`FORM DATA: `+JSON.stringify(base64Data));
    // const result = await axios.post(url, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });
    return 0;
  },
  //pdf轉jpeg
  turnPdf2Jpeg: async (submitData) => {
    let formData = new FormData();
    formData.append("Cfile", submitData['FormFile']);
    const url = `http://10.3.228.224:8888/api/v1/img/pdf2jpg`;
    const result = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },responseType: 'arraybuffer'
    });
    alert(Buffer.from(result.data, 'binary').toString('base64'))
    return Buffer.from(result.data, 'binary').toString('base64');
  },
  //儲存所有已編輯的標註內容
  saveAnnotations: async (annotations) => {
    const url = `${BASE_URL}/SaveAnnotations`;
    const bodyData = { annotations };
    console.log(bodyData);
    //const result= await axios.post(url,bodyData);
    return 1;
  },
  //更新spec辨識規格資訊
  updateSpec: async (editedItem) => {
    const url = `${BASE_URL}/UpdateSpec`;
    const bodyData = { editedItem };
    //const result=  await axios.post(url,bodyData);
    //return result.SpecID;
    return "testId";
  },
};

export default apiSettings;
