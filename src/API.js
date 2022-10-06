import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;


const apiSettings = {
  turnPdf2Jpeg: async () => {
  },
  getSpecList: async () => {
    const result =
      [{
        SpecID:"spid001",
        SpecName:"一號專案"
      },
      {
        SpecID:"spid002",
        SpecName:"二號專案"
      },
      {
        SpecID:"spid003",
        SpecName:"三號專案"
      },
      {
        SpecID:"spid004",
        SpecName:"四號專案"
      },
      {
        SpecID:"spid005",
        SpecName:"五號專案"
      },
      {
        SpecID:"spid006",
        SpecName:"六號專案"
      },
      {
        SpecID:"spid007",
        SpecName:"七號專案"
      },
      {
        SpecID:"spid008",
        SpecName:"eight"
      },
      ];
    //const result=  await axios.post(url);
    return result;
  },
  getRpaAPList: async () => {
    const result =
      [{
        RpaAPID:"rpaap001",
        RpaAPName:"銀行水單"
      },
      {
        RpaAPID:"rpaap002",
        RpaAPName:"現金券申請單"
      },
      ];
    //const result=  await axios.post(url);
    return result;
  },
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
                      id: "specTitleInitId01",
                      TitleID: "specTitleId01",
                      AreaName: "specAreaName01",
                      AreaDesc: "specAreaDesc01",
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
                      IsOneLine: "N",
                      IsEng: "N",
                  }
              ],
              SpecAreaSet: [
                  {
                      id: "specAreaInitId01",
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
                      IsOneLine: "N",
                      IsEng: "Y",
                  }
              ],
          }
      ]
  };
    //const result=  await axios.post(url,bodyData);
    return result;
  },
  createSpec: async (formData) => {
    const url = `${BASE_URL}/CreateSpec`;
    // const bodyData = {
    // };
    const result=  await axios.post(url,formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
    return result.SpecID;
  },
};

export default apiSettings;
