<script>
import * as bootstrap from 'bootstrap';
import { fromUnixTime, format } from 'date-fns';
import _ from 'lodash';

export default {
  props: {
    order: Object,
  },
  data() {
    return {
      orderModal: null,
      orderTime: null,
      tempOrder: {},
    };
  },
  methods: {
    show() {
      this.orderModal.show();
    },
    hide() {
      this.orderModal.hide();
    },
    createModal() {
      const { modal } = this.$refs;
      this.orderModal = new bootstrap.Modal(modal);
    },
  },
  mounted() {
    this.createModal();
  },
  watch: {
    order(newVal) {
      this.tempOrder = _.cloneDeep(newVal);
      const date = fromUnixTime(this.tempOrder.create_at);
      const finalDate = format(date, 'yyyy/MM/dd');

      // eslint-disable-next-line no-param-reassign
      this.tempOrder.formatted_create_at = finalDate;

      if (this.tempOrder.paid_time) {
        const now = new Date(this.tempOrder.paid_time);
        const paidDate = format(now, 'yyyy/MM/dd HH:mm:ss');

        // eslint-disable-next-line no-param-reassign
        this.tempOrder.paid_time = paidDate;
      }
    },
  },
};
</script>

<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ tempOrder.user?.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user?.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user?.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user?.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ tempOrder.formatted_create_at }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_time">
                        {{ tempOrder.paid_time }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ tempOrder.total }}</td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="product in tempOrder.products" :key="product.id">
                    <th>{{ product.product.title }}</th>
                    <td>{{ product.qty }} / {{ product.product.unit }}</td>
                    <td class="text-end">{{ product.final_total }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempOrder.is_paid"
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="tempOrder.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
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
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('updatePaid', tempOrder, tempOrder.id)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
