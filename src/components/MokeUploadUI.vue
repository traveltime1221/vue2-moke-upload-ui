<template>
  <div class="file-uploader">
      <div class="bg-gray p-12 h-full mb-20 w-100">
          <!-- 檔案選擇區 -->
          <div role="button" class="upload-box"
                  :class="{ disabled: upload.isUploading }"
                  @dragover.prevent="onDragOver"
                  @dragleave="onDragLeave"
                  @drop.prevent="onDrop"
                  @click="triggerFileSelect">
                  <div class="w-100">
                  <div>
                      <span class="icon" :class="icon.upload.path" aria-hidden="true" v-if="!upload.isUploading && icon.upload.type == 'string'"></span>
                      <span class="icon" :class="icon.spinner.path" aria-hidden="true" v-if="upload.isUploading && icon.spinner.type == 'string'"></span>
                      <img class="icon" :src="icon.upload.path" alt="" v-if="!upload.isUploading && icon.upload.type == 'image'"/>
                      <img class="icon" :src="icon.spinner.path" alt="" v-if="!upload.isUploading && icon.spinner.type == 'image'"/>
                  </div>
                  <div>
                      <span>
                          {{ upload.fileName || "匯入檔案" }}
                      </span>
                  </div>
              </div>
          </div>

          <!-- 文件選擇 -->
          <input type="file" ref="fileInput" @change="onFileSelect" style="display: none" />
      </div>

      <!-- 上傳進度條
      <div v-if="upload.isUploading" class="progress-bar">
          <div class="progress-bar-inner" :style="{ width: progress + '%' }"></div>
      </div> -->

      <!-- 匯入按鈕 -->
      <div class="text-center mt-10">
          <button class="btn" :disabled="!upload.selectedFile || upload.isUploading" @click="submit">
              {{ upload.isUploading ? "上傳中..." : "確定上傳" }}
          </button>
      </div>
  </div>
</template>

<script>

export default {
  props: {
      icon: {
          type: Object
      },
      maxFileSize: {
          type: Number,
          default: 5 * 1024 * 1024 // 預設大小：5MB
      },
      uploadAPI: {
          type: Function,
          required: true
      }
  },
  data () {
      return {
          upload: {
              errMsg: '',
              fileName: '',
              selectedFile: null,
              isUploading: false,
              isComplete: false,
              isProgress: 0
          }
      };
  },
  methods: {
      init () {
          this.upload = {
              errMsg: '',
              fileName: '',
              selectedFile: null,
              isUploading: false,
              isComplete: false,
              isProgress: 0
          }
      },
      triggerFileSelect () {
          this.$refs.fileInput.click();
      },
      onFileSelect (event) {
          const file = event.target.files[0];
          if (!file) return;

          // 檔案大小檢查
          if (file.size > this.maxFileSize) {
              alert('檔案超過大小限制！');
              return;
          }

          this.upload.fileName = file.name;
          this.upload.selectedFile = file;

          // 通知父頁面檔案已選擇
          this.$emit('file-selected', file);
      },
      onDrop (event) {
          const file = event.dataTransfer.files[0];
          if (file) this.onFileSelect({ target: { files: [file] } });
      },
      onDragLeave () {
          console.log('拖曳離開')
      },
      async submit () {
          if (!this.upload.selectedFile) return;
          this.upload.isUploading = true
          try {
              const response = await this.uploadAPI(this.upload.selectedFile);
              this.$emit('uploadComplete', response);
              this.init()
          } catch (error) {
              this.$emit('uploadError', error);
          }
      }
  }
};
</script>

<style lang='scss' scoped>
.w-100 {
  width: 100%;
}
.mt-10 {
  margin-top: 10px;
}
.icon {
  width: 50px;
}
.btn {
  background: #0095cf;
  border-radius: 5px;
  border: 0px;
  padding: 4px 12px;
  color: white;
  &:disabled {
      opacity: .3;
  }
}
.file-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  width: 300px;
}
.upload-box {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}
.upload-trigger {
  text-align: center;
}
.selected-file {
  font-weight: bold;
  color: green;
}
</style>
