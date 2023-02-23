<script>
import ProductModal from '@/components/ProductModal.vue';
import DelProductModal from '@/components/DelProductModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

import apiStore from '@/store/apiStore';
import { mapState } from 'pinia';

import _ from 'lodash';

export default {
  components: {
    ProductModal,
    DelProductModal,
    PaginationComponent,
  },
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
      delItem: null,
      editItem: null,
      isNew: true,
    };
  },
  methods: {
    getProducts() {
      const url = `${this.VITE_API}v2/api/${this.VITE_PATH}/admin/products?page=${this.$route.params.id}`;

      this.$http
        .get(url)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          alert(err);
        });
    },
    changePage(page) {
      const url = `${this.VITE_API}v2/api/${this.VITE_PATH}/admin/products?page=${page}`;

      this.$http
        .get(url)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          alert(err);
        });
    },
    openModal(modalName, item) {
      if (modalName === 'delProductModal') {
        this.delItem = item;
        const { delProductModal } = this.$refs.delProduct;
        delProductModal.show();
      } else if (modalName === 'productModal') {
        if (this.editItem) {
          this.isNew = true;
          this.editItem = _.cloneDeep(this.tempProduct);
        }
        const { productModal } = this.$refs.product;
        productModal.show();
      } else if (modalName === 'edit') {
        if (!item.imagesUrl) {
          // eslint-disable-next-line no-param-reassign
          item.imagesUrl = [];
        }
        this.isNew = false;
        this.editItem = _.cloneDeep(item);
        const { productModal } = this.$refs.product;
        productModal.show();
      }
    },
  },
  computed: {
    ...mapState(apiStore, ['VITE_API', 'VITE_PATH']),
  },
  mounted() {
    this.getProducts();
    this.openModal();
  },
};
</script>

<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('productModal')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delProductModal', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :pagination="pagination" @changePage="changePage" />
  </div>
  <product-modal
    ref="product"
    :product="editItem"
    :getProducts="getProducts"
    :isNew="isNew"
  />
  <del-product-modal
    ref="delProduct"
    v-bind="delItem"
    :getProducts="getProducts"
  />
</template>
