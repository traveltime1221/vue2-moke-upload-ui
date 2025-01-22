# vue2-moke-upload-ui

這是一個非常簡易的模擬上傳介面．

![範例](https://github.com/traveltime1221/vue2-moke-upload-ui/raw/main/src/assets/image/example.gif)

## 安裝

### 環境
```
vue: ">=2.6.0 <2.7.16"
vue-template-compiler: ">=2.6.0 <2.7.16"
node: ">=12.0.0"
```

### 安裝方式
```
npm install vue2-moke-upload-ui
```

### 解決安裝衝突
如果專案包含 ESLint，安裝本套件時可能會遇到依賴衝突。
可使用以下方法進行安裝處理：
```
npm install vue2-moke-upload-ui --legacy-peer-deps
```


## 使用方式

### 全域
於 main.js 註冊設定
```
import Vue from "vue";
import App from "./App.vue";
import MokeUploadUI from "vue2-moke-upload-ui"; // 引用

Vue.config.productionTip = false;
Vue.component("MokeUploadUI", MokeUploadUI); // 註冊

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

前往 page.vue 引用
```
<template>
  <div id="app">
    <MokeUploadUI
      :icon="icon"
      :maxFileSize="maxFileSize"
      :uploadAPI="uploadAPI"
      @uploadComplete="uploadComplete"
      @uploadError="uploadError"
    />
  </div>
</template>

<script>
export default {
  components: {
    MokeUploadUI
  },
  data () {
    return {
      maxFileSize: 10 * 1024 * 1024,
      icon: {
            upload: {
                type: '', // 圖片類型
                path: '' // 圖片路徑
            },
            spinner: {
                type: '',
                path: ''
            }
        },
    }
  },
  methods: {
    // 模擬事件
    uploadComplete () {
        alert('上傳完成！')
    },
    uploadError () {
        alert('上傳失敗！請重新選擇檔案！')
    },
    uploadAPI (file) {
        console.log('-- uploadAPI --')
        return new Promise((resolve, reject) => {
            console.log('模擬上傳檔案：', file.name);
            setTimeout(() => {
                Math.random() > 0.2 ? resolve('模擬上傳成功') : reject(new Error('模擬上傳失敗'));
            }, 2000); // 模擬 2 秒延遲
        });
    }
  }
}
</script>
```

### 局部
```
<template>
    <div class="container">
        <div class="file-uploader-content">
            <MokeUploadUI
                :icon="icon"
                :maxFileSize="maxFileSize"
                :uploadAPI="uploadAPI"
                @uploadComplete="uploadComplete"
                @uploadError="uploadError"
            />
        </div>
    </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'; // 如果是引用外部Icon套件
import MokeUploadUI from '@/components/MokeUploadUI'
export default {
    components: {
        MokeUploadUI
    },
    data () {
        return {
            icon: {
                upload: {
                    type: 'string',
                    path: 'fa fa-cloud-upload'
                },
                spinner: {
                    type: 'string',
                    path: 'fa fa-spinner fa-spin'
                }
            },
            maxFileSize: 10 * 1024 * 1024
        }
    },
    methods: {
        uploadComplete () {
            alert('上傳完成！')
        },
        uploadError () {
            alert('上傳失敗！請重新選擇檔案！')
        },
        uploadAPI (file) {
            // 此處為模擬上傳檔案, 可實際串接 API
            return new Promise((resolve, reject) => {
                console.log('模擬上傳檔案：', file.name);
                setTimeout(() => {
                    Math.random() > 0.2 ? resolve('模擬上傳成功') : reject(new Error('模擬上傳失敗'));
                }, 2000); // 模擬 2 秒延遲
            });
        }
    }
}


```

## 屬性
|  參數 | 類型 | 描述 | 
| -------- | -------- | -------- | 
| icon    | Json     |  顯示上傳 Icon 及 Loading 畫面, 預設不顯示   | 
| maxFileSize | Number | 上傳檔案限制大小 |
| uploadAPI | Function | 上傳API function |
| uploadComplete | Function | 上傳完成回應 ｜
| uploadError | Function | 上傳錯誤回應 ｜


## 版本歷程

* 0.1.0 第一次發布

## License
MIT
