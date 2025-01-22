(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue2MokeUploadUI = factory());
})(this, (function () { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //


  var script = {
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
            };
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
            console.log('拖曳離開');
        },
        async submit () {
            if (!this.upload.selectedFile) return;
            this.upload.isUploading = true;
            try {
                const response = await this.uploadAPI(this.upload.selectedFile);
                this.$emit('uploadComplete', response);
                this.init();
            } catch (error) {
                this.$emit('uploadError', error);
            }
        }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
      }
      // scopedId
      {
          options._scopeId = scopeId;
      }
      let hook;
      {
          hook = function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "file-uploader" }, [
      _c("div", { staticClass: "bg-gray p-12 h-full mb-20 w-100" }, [
        _c(
          "div",
          {
            staticClass: "upload-box",
            class: { disabled: _vm.upload.isUploading },
            attrs: { role: "button" },
            on: {
              dragover: function ($event) {
                $event.preventDefault();
                return _vm.onDragOver.apply(null, arguments)
              },
              dragleave: _vm.onDragLeave,
              drop: function ($event) {
                $event.preventDefault();
                return _vm.onDrop.apply(null, arguments)
              },
              click: _vm.triggerFileSelect,
            },
          },
          [
            _c("div", { staticClass: "w-100" }, [
              _c("div", [
                !_vm.upload.isUploading && _vm.icon.upload.type == "string"
                  ? _c("span", {
                      staticClass: "icon",
                      class: _vm.icon.upload.path,
                      attrs: { "aria-hidden": "true" },
                    })
                  : _vm._e(),
                _vm._v(" "),
                _vm.upload.isUploading && _vm.icon.spinner.type == "string"
                  ? _c("span", {
                      staticClass: "icon",
                      class: _vm.icon.spinner.path,
                      attrs: { "aria-hidden": "true" },
                    })
                  : _vm._e(),
                _vm._v(" "),
                !_vm.upload.isUploading && _vm.icon.upload.type == "image"
                  ? _c("img", {
                      staticClass: "icon",
                      attrs: { src: _vm.icon.upload.path, alt: "" },
                    })
                  : _vm._e(),
                _vm._v(" "),
                !_vm.upload.isUploading && _vm.icon.spinner.type == "image"
                  ? _c("img", {
                      staticClass: "icon",
                      attrs: { src: _vm.icon.spinner.path, alt: "" },
                    })
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _c("div", [
                _c("span", [
                  _vm._v(
                    "\n                        " +
                      _vm._s(_vm.upload.fileName || "匯入檔案") +
                      "\n                    "
                  ),
                ]),
              ]),
            ]),
          ]
        ),
        _vm._v(" "),
        _c("input", {
          ref: "fileInput",
          staticStyle: { display: "none" },
          attrs: { type: "file" },
          on: { change: _vm.onFileSelect },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "text-center mt-10" }, [
        _c(
          "button",
          {
            staticClass: "btn",
            attrs: {
              disabled: !_vm.upload.selectedFile || _vm.upload.isUploading,
            },
            on: { click: _vm.submit },
          },
          [
            _vm._v(
              "\n            " +
                _vm._s(_vm.upload.isUploading ? "上傳中..." : "確定上傳") +
                "\n        "
            ),
          ]
        ),
      ]),
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-4211f89c_0", { source: ".w-100[data-v-4211f89c] {\n  width: 100%;\n}\n.mt-10[data-v-4211f89c] {\n  margin-top: 10px;\n}\n.icon[data-v-4211f89c] {\n  width: 50px;\n}\n.btn[data-v-4211f89c] {\n  background: #0095cf;\n  border-radius: 5px;\n  border: 0px;\n  padding: 4px 12px;\n  color: white;\n}\n.btn[data-v-4211f89c]:disabled {\n  opacity: 0.3;\n}\n.file-uploader[data-v-4211f89c] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n  border: 2px dashed #ccc;\n  border-radius: 10px;\n  width: 300px;\n}\n.upload-box[data-v-4211f89c] {\n  width: 100%;\n  height: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #f9f9f9;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.upload-trigger[data-v-4211f89c] {\n  text-align: center;\n}\n.selected-file[data-v-4211f89c] {\n  font-weight: bold;\n  color: green;\n}\n\n/*# sourceMappingURL=MokeUploadUI.vue.map */", map: {"version":3,"sources":["/Volumes/SP-PX10/projects/code/Tools/vue2/vue2-moke-upload-ui/src/components/MokeUploadUI.vue","MokeUploadUI.vue"],"names":[],"mappings":"AA4HA;EACA,WAAA;AC3HA;AD6HA;EACA,gBAAA;AC1HA;AD4HA;EACA,WAAA;ACzHA;AD2HA;EACA,mBAAA;EACA,kBAAA;EACA,WAAA;EACA,iBAAA;EACA,YAAA;ACxHA;ADyHA;EACA,YAAA;ACvHA;AD0HA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,YAAA;ACvHA;ADyHA;EACA,WAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,sBAAA;EACA,kBAAA;EACA,eAAA;ACtHA;ADwHA;EACA,kBAAA;ACrHA;ADuHA;EACA,iBAAA;EACA,YAAA;ACpHA;;AAEA,2CAA2C","file":"MokeUploadUI.vue","sourcesContent":["<template>\n  <div class=\"file-uploader\">\n      <div class=\"bg-gray p-12 h-full mb-20 w-100\">\n          <!-- 檔案選擇區 -->\n          <div role=\"button\" class=\"upload-box\"\n                  :class=\"{ disabled: upload.isUploading }\"\n                  @dragover.prevent=\"onDragOver\"\n                  @dragleave=\"onDragLeave\"\n                  @drop.prevent=\"onDrop\"\n                  @click=\"triggerFileSelect\">\n                  <div class=\"w-100\">\n                  <div>\n                      <span class=\"icon\" :class=\"icon.upload.path\" aria-hidden=\"true\" v-if=\"!upload.isUploading && icon.upload.type == 'string'\"></span>\n                      <span class=\"icon\" :class=\"icon.spinner.path\" aria-hidden=\"true\" v-if=\"upload.isUploading && icon.spinner.type == 'string'\"></span>\n                      <img class=\"icon\" :src=\"icon.upload.path\" alt=\"\" v-if=\"!upload.isUploading && icon.upload.type == 'image'\"/>\n                      <img class=\"icon\" :src=\"icon.spinner.path\" alt=\"\" v-if=\"!upload.isUploading && icon.spinner.type == 'image'\"/>\n                  </div>\n                  <div>\n                      <span>\n                          {{ upload.fileName || \"匯入檔案\" }}\n                      </span>\n                  </div>\n              </div>\n          </div>\n\n          <!-- 文件選擇 -->\n          <input type=\"file\" ref=\"fileInput\" @change=\"onFileSelect\" style=\"display: none\" />\n      </div>\n\n      <!-- 上傳進度條\n      <div v-if=\"upload.isUploading\" class=\"progress-bar\">\n          <div class=\"progress-bar-inner\" :style=\"{ width: progress + '%' }\"></div>\n      </div> -->\n\n      <!-- 匯入按鈕 -->\n      <div class=\"text-center mt-10\">\n          <button class=\"btn\" :disabled=\"!upload.selectedFile || upload.isUploading\" @click=\"submit\">\n              {{ upload.isUploading ? \"上傳中...\" : \"確定上傳\" }}\n          </button>\n      </div>\n  </div>\n</template>\n\n<script>\n\nexport default {\n  props: {\n      icon: {\n          type: Object\n      },\n      maxFileSize: {\n          type: Number,\n          default: 5 * 1024 * 1024 // 預設大小：5MB\n      },\n      uploadAPI: {\n          type: Function,\n          required: true\n      }\n  },\n  data () {\n      return {\n          upload: {\n              errMsg: '',\n              fileName: '',\n              selectedFile: null,\n              isUploading: false,\n              isComplete: false,\n              isProgress: 0\n          }\n      };\n  },\n  methods: {\n      init () {\n          this.upload = {\n              errMsg: '',\n              fileName: '',\n              selectedFile: null,\n              isUploading: false,\n              isComplete: false,\n              isProgress: 0\n          }\n      },\n      triggerFileSelect () {\n          this.$refs.fileInput.click();\n      },\n      onFileSelect (event) {\n          const file = event.target.files[0];\n          if (!file) return;\n\n          // 檔案大小檢查\n          if (file.size > this.maxFileSize) {\n              alert('檔案超過大小限制！');\n              return;\n          }\n\n          this.upload.fileName = file.name;\n          this.upload.selectedFile = file;\n\n          // 通知父頁面檔案已選擇\n          this.$emit('file-selected', file);\n      },\n      onDrop (event) {\n          const file = event.dataTransfer.files[0];\n          if (file) this.onFileSelect({ target: { files: [file] } });\n      },\n      onDragLeave () {\n          console.log('拖曳離開')\n      },\n      async submit () {\n          if (!this.upload.selectedFile) return;\n          this.upload.isUploading = true\n          try {\n              const response = await this.uploadAPI(this.upload.selectedFile);\n              this.$emit('uploadComplete', response);\n              this.init()\n          } catch (error) {\n              this.$emit('uploadError', error);\n          }\n      }\n  }\n};\n</script>\n\n<style lang='scss' scoped>\n.w-100 {\n  width: 100%;\n}\n.mt-10 {\n  margin-top: 10px;\n}\n.icon {\n  width: 50px;\n}\n.btn {\n  background: #0095cf;\n  border-radius: 5px;\n  border: 0px;\n  padding: 4px 12px;\n  color: white;\n  &:disabled {\n      opacity: .3;\n  }\n}\n.file-uploader {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n  border: 2px dashed #ccc;\n  border-radius: 10px;\n  width: 300px;\n}\n.upload-box {\n  width: 100%;\n  height: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #f9f9f9;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.upload-trigger {\n  text-align: center;\n}\n.selected-file {\n  font-weight: bold;\n  color: green;\n}\n</style>\n",".w-100 {\n  width: 100%;\n}\n\n.mt-10 {\n  margin-top: 10px;\n}\n\n.icon {\n  width: 50px;\n}\n\n.btn {\n  background: #0095cf;\n  border-radius: 5px;\n  border: 0px;\n  padding: 4px 12px;\n  color: white;\n}\n.btn:disabled {\n  opacity: 0.3;\n}\n\n.file-uploader {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n  border: 2px dashed #ccc;\n  border-radius: 10px;\n  width: 300px;\n}\n\n.upload-box {\n  width: 100%;\n  height: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #f9f9f9;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  cursor: pointer;\n}\n\n.upload-trigger {\n  text-align: center;\n}\n\n.selected-file {\n  font-weight: bold;\n  color: green;\n}\n\n/*# sourceMappingURL=MokeUploadUI.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-4211f89c";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector);

  return __vue_component__;

}));
