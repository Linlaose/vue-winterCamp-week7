<script>
import apiStore from '@/store/apiStore';
import { mapState } from 'pinia';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

export default {
  props: {
    id: {
      types: [String, Number],
    },
    title: {
      types: [String, Number],
    },
    getProducts: {
      type: Function,
    },
  },
  data() {
    return {
      delProductModal: null,
    };
  },
  mounted() {
    this.delProductModal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
  methods: {
    delProductHandler() {
      const url = `${this.VITE_API}v2/api/${this.VITE_PATH}/admin/product/${this.id}`;
      this.$http
        .delete(url)
        .then(() => {
          this.getProducts();
          Swal.fire({
            title: '完成!',
            text: '編輯成功',
            icon: 'success',
            confirmButtonText: '確定',
          }).then(() => {
            this.delProductModal.hide();
          });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  computed: {
    ...mapState(apiStore, ['VITE_API', 'VITE_PATH']),
  },
};
</script>

<template>
  <div
    id="delProductModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="delProductHandler"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
