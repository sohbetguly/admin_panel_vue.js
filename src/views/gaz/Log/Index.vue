<template>
  <div>
    <ul v-for="result in results" :key="result.id">
      <p class="deviceUser">{{ result.deviceUser }}</p>
      <li><b>Enjam ID: </b>{{ result.deviceId }}</li>
      <li><b>Enjam Ulanyjysy: </b>{{ result.deviceUser }}</li>
      <li><b>Enjam Ady: </b>{{ result.deviceName }}</li>
      <li><b>Telefon nomeri: </b>{{ result.phoneNum }}</li>
      <li><b>Paroly: </b>{{ result.password }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  mounted() {
    this.deviceList();
  },
  data() {
    return {
      device: null,
      results: []
    };
  },
  methods: {
    deviceList() {
      fetch(
        "https://vue-test-5f99c-default-rtdb.firebaseio.com/device_informations.json"
      )
        .then(res => res.json())
        .then(data => {
          const results = [];
          for (const id in data) {
            results.push({
              id: id,
              deviceId: data[id].deviceId,
              deviceUser: data[id].deviceUser,
              deviceName: data[id].deviceName,
              phoneNum: data[id].phoneNum,
              password: data[id].password
            });
          }
          this.results = results;
        });
    }
  }
};
</script>
<style scoped>
input[type="text"] {
  display: block;
  width: 20rem;
  margin-top: 0.5rem;
}
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 0.7rem;
}

h3,
p {
  font-size: 1rem;
  margin: 0.5rem 0;
}

.highlight {
  font-weight: bold;
}

.rating--poor {
  color: #b80056;
}

.rating--average {
  color: #330075;
}

.rating--great {
  color: #008327;
}
ul {
  max-width: 50rem;
  list-style: none;
  margin: 1rem auto;
  padding: 0;
}
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}
.deviceUser {
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
}
body {
  margin: 0;
}
</style>
