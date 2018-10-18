<template>
    <div class="container news" id="news">
        <div class="title"></div>
        <NewsArticle id="1"></NewsArticle>
        <NewsVideo id="2"></NewsVideo>
    </div>
</template>
<script>
    import NewsArticle from './news/NewsArticle.vue';
    import NewsVideo from './news/NewsVideo.vue';

    export default {
        components:{
            NewsArticle,
            NewsVideo
        }
    }
</script>

