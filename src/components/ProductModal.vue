<script>
import * as bootstrap from 'bootstrap';
import apiStore from '@/store/apiStore';
import { mapState } from 'pinia';

import Swal from 'sweetalert2';

export default {
  props: {
    getProducts: Function,
    product: Object,
    isNew: Boolean,
  },
  data() {
    return {
      productModal: null,
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    submitHandler() {
      if (this.isNew) {
        const url = `${this.VITE_API}v2/api/${this.VITE_PATH}/admin/product`;
        const data = { data: { ...this.tempProduct } };
        console.log(url);

        this.$http
          .post(url, data)
          .then(() => {
            this.getProducts();
            Swal.fire({
              title: '完成!',
              text: '編輯成功',
              icon: 'success',
              confirmButtonText: '確定',
            }).then(() => {
              this.productModal.hide();
            });
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      } else {
        const url = `${this.VITE_API}v2/api/${this.VITE_PATH}/admin/product/${this.tempProduct.id}`;
        const data = { data: { ...this.tempProduct } };

        this.$http
          .put(url, data)
          .then(() => {
            this.getProducts();
            Swal.fire({
              title: '完成!',
              text: '編輯成功',
              icon: 'success',
              confirmButtonText: '確定',
            }).then(() => {
              this.productModal.hide();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    createModal() {
      const { modal } = this.$refs;
      this.productModal = new bootstrap.Modal(modal);
    },
  },
  watch: {
    product: {
      handler(newVal) {
        this.tempProduct = newVal;
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(apiStore, ['VITE_API', 'VITE_PATH']),
  },
  mounted() {
    this.createModal();
  },
};
</script>

<template>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <div class="col-sm-4">
              <div class="form-group mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                />
                <img class="img-fluid" :src="tempProduct.imageUrl" />
              </div>
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <div
                  class="mb-1"
                  v-for="(image, index) in tempProduct.imagesUrl"
                  :key="image"
                >
                  <div class="form-group">
                    <label for="imageUrl" class="form-label">圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="tempProduct.imagesUrl[index]"
                    />
                  </div>
                  <img class="img-fluid" :src="image" />
                </div>
                <div
                  v-if="
                    !tempProduct.imagesUrl.length ||
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="tempProduct.imagesUrl.push(123)"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="form-group mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model.trim="tempProduct.title"
                />
              </div>

              <div class="row mb-3">
                <div class="form-group col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model.trim="tempProduct.category"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model.trim="tempProduct.unit"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="form-group col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                  />
                </div>
              </div>
              <hr />

              <div class="form-group mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model.trim="tempProduct.description"
                >
                </textarea>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model.trim="tempProduct.content"
                >
                </textarea>
              </div>
              <div class="form-group mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="submitHandler">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
