import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      modal: null,
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
};
