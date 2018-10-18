<template>
  <div id="app">
    <News></News>
    <Form></Form>
  </div>
</template>

<script>
import News from './components/News.vue';
import Form from './components/Form.vue';

export default {
  name: 'app',
  components: {
    News,
    Form
  }
}
</script>
