import { createApp } from 'vue';

const App = createApp({
  data() {
    return {
      labelName: 'Ім`я',
      labelEmail: 'Ел. пошта',
      labelPhone: 'Номер телефону',
      placeholderName: 'Ваше Ім`я',
      placeholderEmail: 'Ваша ел. пошта',
      placeholderPhone: 'Ваш номер телефону',
      loading: false,
      form: {
        name: '',
        email: '',
        phone: '',
      },
      contacts: [],
    };
  },
  computed: {
    canAdd() {
      return (
        this.form.name.trim() &&
        this.form.email.trim() &&
        this.form.phone.trim()
      );
    },
  },
  methods: {
    async addContact() {
      const { ...contact } = this.form;

      // const newContact = await req('/api/contacts', 'POST', contact);

      // this.contacts.push(newContact);

      const id = parseInt(this.contacts[this.contacts.length - 1].id) + 1;
      this.contacts.push({
        ...contact,
        id: `${id}`,
        // id: Date.now(),
        marked: false,
      });

      this.form.name = this.form.email = this.form.phone = '';
    },
    markContact(id) {
      const contact = this.contacts.find((contact) => contact.id === id);
      contact.marked = true;
    },
    deleteContact(id) {
      this.contacts = this.contacts.filter((contact) => contact.id !== id);
    },
  },
  async mounted() {
    this.loading = true;
    this.contacts = await req('/api/contacts');
    this.loading = false;
  },
});

App.component('loader', {
  template: `
  <div class="loader d-flex justify-content-center align-items-center">
    <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div> `,
});

App.mount('#app');

async function req(url, method = 'GET', data = null) {
  try {
    const headers = {};
    let body;
    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }
    const res = await fetch(url, {
      method,
      headers,
      body,
    });
    return await res.json();
  } catch (e) {
    console.warn('Error:', e.message);
  }
}
