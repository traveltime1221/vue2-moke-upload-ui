# vue2-btn

這是一個 Vue.js 按鈕元件，內建載入中的旋轉圖示與可自訂的圖示設計。
透過 spinner 狀態自動在載入圖示與按鈕標籤/圖示之間切換，提供流暢的使用者體驗。
元件特色包括：

* 動態圖示：可設定預設圖示（icon）與載入圖示（iconSpinner），支援 FontAwesome 或其他圖示類別。
* 按鈕樣式：透過 btnClass 屬性輕鬆套用額外樣式，方便進行主題設計。
* 禁用狀態：按鈕在載入中（spinner）或設為禁用（disabled）時自動進入不可用狀態。
* 平滑過渡：內建 CSS 過渡效果，提供精緻的 UI 互動感受。
* 此元件非常適合用於需要載入回饋的操作，例如表單提交或 API 呼叫。

![範例](https://github.com/traveltime1221/vue2-btn/raw/main/src/assets/image/example.gif)

## 安裝

### 環境
```
vue: ">=2.6.0 <2.7.0"
vue-template-compiler: ">=2.6.0 <2.7.0"
node: ">=12.0.0"
```

### 安裝方式
```
npm install vue2-btn
```

### 解決安裝衝突
如果專案包含 ESLint，安裝本套件時可能會遇到依賴衝突。
可使用以下方法進行安裝處理：
```
npm install vue2-btn --legacy-peer-deps
```


## 使用方式

### 全域
於 main.js 註冊設定
```
import Vue from "vue";
import App from "./App.vue";
import Button from "vue2-btn"; // 引用

Vue.config.productionTip = false;
Vue.component("Button", Button); // 註冊

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

前往 page.vue 引用
```
<template>
  <div id="app">
    <Button
      btnClass='btn-primary'
      name="查詢"
      :spinner="spinner.search"
      :disabled="spinner.search"
      icon="fa fa-search mr-4"
      iconSpinner="fa fa-circle-o-notch fa-spin"
      @click="submit"
    />
  </div>
</template>

<script>
export default {
  components: {
    Button
  },
  data () {
    return {
      spinner: { // 模擬 loading
        search: false
      }
    }
  },
  methods: {
    // 模擬事件
    submit () {
      this.spinner.search = true
        setTimeout(() => {
          this.spinner.search = false
        }, 3000)
    }
  }
}
</script>
```

### 局部
```
<template>
  <div id="app">
    <Button
      btnClass='btn-primary'
      name="查詢"
      :spinner="spinner.search"
      :disabled="spinner.search"
      icon="fa fa-search mr-4"
      iconSpinner="fa fa-circle-o-notch fa-spin"
      @click="submit"
    />
  </div>
</template>

<script>
import Button from "vue2-btn"; // 引用
export default {
  name: "App",
  components: {
    Button, // 於此註冊
  },
  data () {
    return {
      spinner: { // 模擬 loading
        search: false
      }
    }
  },
  methods: {
    // 模擬事件
    submit () {
      this.spinner.search = true
        setTimeout(() => {
          this.spinner.search = false
        }, 3000)
    }
  }
};
</script>
```

## 屬性
|  參數 | 類型 | 描述 | 
| -------- | -------- | -------- | 
| disabled    | Boolean     |  禁用按鈕狀態, 預設：false   | 
| spinner    | Boolean     | 平滑過渡, 預設：false    |
| name    | String     | 按鈕名稱, 預設：空值  | 
| icon    | String     | 按鈕icon, 預設：空值 | 
| iconSpinner    | String     | 平滑過渡 class 名稱, 預設：使用fontawesome 的 fa fa-spinner fa-spin | 
| btnClass    | String     | 按鈕 class 名稱, 預設：空值|

## 版本歷程

* 0.1.0 第一次發布

## License
MIT
