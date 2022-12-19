const SpecList =
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

const RpaAPList =
  [{
    RpaAPID: "rpaap001",
    RpaAPName: "銀行水單"
  },
  {
    RpaAPID: "rpaap002",
    RpaAPName: "現金券申請單"
  },
  ];

const PreProcOptions =
  [{
    ParmName: "ImgProcType.UnderLine",
    ParmValue: "底線"
  },
  {
    ParmName: "ImgProcType.Normal",
    ParmValue: "正常"
  },
  ];

const SpecSet = {
  SpecID: "Test001",
  SpecName: "測試1",
  SpecDesc: "這是測試用",
  OCRModel: "OCR01EN",
  RpaAPID: "AP001",
  PageSet: [
    {
      FileContent: "https://picsum.photos/200/300?random=1",
      PageNum: 1,
      SpecTitleSet: [],
      SpecAreaSet: [],
    },
    {
      FileContent: "https://picsum.photos/200/300?random=2",
      PageNum: 2,
      SpecTitleSet: [
        {
          TempID: "specTitleInitId01",
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
          TempID: "specAreaInitId01",
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

const ProcList = [
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 10 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 51 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
  { ProcID: "P20221020-164539-328", SpecID: "S221007002", TitleID: "A01Anchor", ResultData: "台塑購物網_福委會商品券訂購單", RpaAPID: "OCR.Voucher", InsertDTime: "20221020-164536", ProcSource: "eMail", ProcSourceDetail: "shochiou@yahoo.com.tw", ProcSourceDetail2: "shochiou", ResultSpecID: "S221007002", ProcStatus: 20 },
];

const ProcSet = {
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


