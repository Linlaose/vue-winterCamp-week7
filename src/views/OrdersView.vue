<script>
import apiStore from '@/store/apiStore';
import { mapState } from 'pinia';

import { fromUnixTime, format } from 'date-fns';

import DelOrderModal from '@/components/DelOrderModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import OrderModal from '@/components/OrderModal.vue';

export default {
  components: {
    DelOrderModal,
    PaginationComponent,
    OrderModal,
  },
  data() {
    return {
      orders: [],
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      const url = `${this.VITE_API}v2/api/${this.VITE_PATH}/admin/orders?page=${page}`;

      this.$http
        .get(url)
        .then((res) => {
          const { orders, pagination } = res.data;
          this.orders = orders;
          this.pagination = pagination;

          this.orders.forEach((order) => {
            const date = fromUnixTime(order.create_at);
            const finalDate = format(date, 'yyyy/MM/dd');

            // eslint-disable-next-line no-param-reassign
            order.formatted_create_at = finalDate;
          });
        })
        .catch((err) => {
          alert(err);
        });
    },
    delOrder() {
      const url = `${this.VITE_API}v2/api/${this.VITE_PATH}/admin/order/${this.tempOrder.id}`;

      this.$http
        .delete(url)
        .then(() => {
          this.getOrders();
          this.closeModal('delModal');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updatePaid(item, orderId) {
      const url = `${this.VITE_API}v2/api/${this.VITE_PATH}/admin/order/${orderId}`;
      const data = item;

      if (data.is_paid) {
        const timestamp = Date.now();
        const paidTimestamp = new Date(timestamp);

        data.paid_time = paidTimestamp;
      } else {
        data.paid_time = null;
      }

      this.$http
        .put(url, { data })
        .then((res) => {
          this.closeModal('orderModal');
          this.getOrders();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openModal(modalName, item) {
      this.tempOrder = { ...item };

      if (modalName === 'delModal') {
        const { delModal } = this.$refs;
        delModal.show();
      } else if (modalName === 'orderModal') {
        const { orderModal } = this.$refs;
        orderModal.show();
      }
    },
    closeModal(modalName) {
      const { delModal, orderModal } = this.$refs;
      if (modalName === 'delModal') {
        delModal.hide();
      } else if (modalName === 'orderModal') {
        orderModal.hide();
      }
    },
  },
  computed: {
    ...mapState(apiStore, ['VITE_API', 'VITE_PATH']),
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<template>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.formatted_create_at }}</td>
          <td>
            <span>{{ order.user.email }}</span>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="product in order.products" :key="product.id">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ order.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="order.is_paid"
                @change="updatePaid(order, order.id)"
              />
              <label class="form-check-label">
                <span v-if="order.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal('orderModal', order)"
              >
                檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openModal('delModal', order)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :pagination="pagination" @changePage="getOrders" />
  </div>
  <del-order-modal
    ref="delModal"
    @del-item="delOrder(event)"
    :temp-order="tempOrder"
  />
  <order-modal ref="orderModal" :order="tempOrder" @update-paid="updatePaid" />
</template>
