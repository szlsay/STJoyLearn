const componentProperties = new Map();

componentProperties.set("cxpicture", {
  component: "cxpicture",
  text: "CX图片",
  type: "1-3",
  active: true,
  style: "cxpicturestyle",
  setStyle: {
    text: "CX图片",
    path: "", // 小程序页面路径,
    url: "", // 手动上传地址
    link: "" // 配置链接
  },
});

componentProperties.set("cxgoods", {
  component: "cxgoods",
  text: "CX商品",
  type: "2-1",
  active: true,
  style: "cxgoodsstyle",
  setStyle: {
    text: "CX商品",
    textWeight: 400,
    positions: "left",
    categoryId: "",
    showPrice: true,
  },
});

export default componentProperties;
